import { Router, Request, Response } from 'express';
import { eq, desc, sql, inArray } from 'drizzle-orm';
import { db } from '../database.js';
import { missions as missionsTable, bids, users, announcements } from '../../shared/schema.js';
import { MissionSyncService } from '../services/mission-sync.js';
import { DataConsistencyValidator } from '../services/data-consistency-validator.js';
import { randomUUID } from 'crypto';
import { z } from 'zod'; // Import z from zod
// Imports simplifiés après suppression de la route simple
import { mapMission, mapMissions, type MissionRow, type LocationData } from '../dto/mission-dto.js'; // Import DTO mapper

// Import the simplified schema for validation
import { createSimpleMissionSchema } from '../validation/mission-schemas.js';

// Error wrapper for async routes
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Utilitaire pour générer un excerpt à partir de la description
function generateExcerpt(description: string, maxLength: number = 200): string {
  if (!description) {
    return '';
  }

  if (description.length <= maxLength) {
    return description;
  }

  // Chercher la fin de phrase la plus proche avant maxLength
  const truncated = description.substring(0, maxLength);
  const lastSentenceEnd = Math.max(
    truncated.lastIndexOf('.'),
    truncated.lastIndexOf('!'),
    truncated.lastIndexOf('?')
  );

  if (lastSentenceEnd > maxLength * 0.6) {
    return truncated.substring(0, lastSentenceEnd + 1).trim();
  }

  // Sinon, couper au dernier espace pour éviter de couper un mot
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > maxLength * 0.6) {
    return truncated.substring(0, lastSpace).trim() + '...';
  }

  return truncated.trim() + '...';
}

const router = Router();

// Route simple supprimée pour éviter les conflits

// POST /api/missions - Create new mission (robuste avec transaction)
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const requestId = randomUUID();
  const startTime = Date.now();

  // Log structuré de début
  console.log(JSON.stringify({
    level: 'info',
    timestamp: new Date().toISOString(),
    request_id: requestId,
    action: 'mission_create_start',
    body_size: JSON.stringify(req.body).length,
    user_agent: req.headers['user-agent'],
    ip: req.ip
  }));

  // 1. Validation Zod centralisée
  const parseResult = createSimpleMissionSchema.safeParse(req.body);

  if (!parseResult.success) {
    const firstError = parseResult.error.errors[0];
    console.log(JSON.stringify({
      level: 'warn',
      timestamp: new Date().toISOString(),
      request_id: requestId,
      action: 'validation_failed',
      field: firstError.path.join('.'),
      message: firstError.message
    }));
    return res.status(400).json({
      ok: false,
      error: firstError.message,
      field: firstError.path.join('.'),
      request_id: requestId
    });
  }

  const { title, description, category, budget, location, userId } = parseResult.data;

  const userIdInt = userId ? parseInt(userId.toString()) : 1;
  if (isNaN(userIdInt) || userIdInt <= 0) {
    console.log(JSON.stringify({
      level: 'warn',
      timestamp: new Date().toISOString(),
      request_id: requestId,
      action: 'validation_failed',
      field: 'userId',
      value: userId
    }));
    return res.status(400).json({
      ok: false,
      error: 'User ID invalide',
      field: 'userId',
      request_id: requestId
    });
  }

  // Validation de sécurité : vérifier que l'utilisateur existe
  const existingUser = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, userIdInt))
    .limit(1);

  if (existingUser.length === 0) {
    console.log(JSON.stringify({
      level: 'warn',
      timestamp: new Date().toISOString(),
      request_id: requestId,
      action: 'security_validation_failed',
      field: 'userId',
      value: userIdInt,
      reason: 'user_not_found'
    }));
    return res.status(401).json({
      ok: false,
      error: 'Utilisateur non trouvé',
      field: 'userId',
      request_id: requestId
    });
  }

  // 2. Préparer les données avec valeurs par défaut
  const now = new Date();
  // Harmoniser la gestion des prix : utiliser 'price' et s'assurer que c'est un entier
  const priceValue = budget ? parseInt(budget.toString()) : 100; // Default to 100 if budget is not provided

  // Helper function to extract city from a location string
  const extractCity = (locationString: string | null | undefined): string | null => {
    if (!locationString) return null;
    // Basic extraction: assume city is the last part before a comma or the whole string
    const parts = locationString.split(',');
    return parts.length > 1 ? parts[parts.length - 1].trim() : locationString.trim();
  };

  // Créer l'objet location_data selon le schéma JSONB
  const locationData = {
    raw: location || 'Remote',
    address: req.body.postal_code || null,
    city: extractCity(location) || null,
    country: 'France',
    remote_allowed: req.body.remote_allowed !== false
  };

  const fullDescription = description.trim() +
    (req.body.requirements ? `\n\nExigences spécifiques: ${req.body.requirements}` : '');

  const newMission = {
    title: title.trim(),
    description: fullDescription,
    excerpt: generateExcerpt(fullDescription, 200),
    category: category || 'developpement',
    price: priceValue, // Utiliser 'price' harmonisé
    currency: 'EUR', // Assurer une devise unique
    location_data: locationData, // Utiliser le champ correct du schéma
    user_id: userIdInt,
    client_id: userIdInt,
    status: 'open' as const, // Utiliser un statut valide
    urgency: 'medium' as const,
    is_team_mission: false,
    team_size: 1
    // created_at et updated_at sont gérés automatiquement par la DB
  };

  console.log(JSON.stringify({
    level: 'info',
    timestamp: new Date().toISOString(),
    request_id: requestId,
    action: 'mission_data_prepared',
    title_length: newMission.title.length,
    description_length: newMission.description.length,
    price: newMission.price, // Log the harmonized price
    user_id: newMission.user_id,
    location_data: newMission.location_data,
    is_team_mission: newMission.is_team_mission
  }));

  // 3. Transaction robuste avec INSERT RETURNING
  console.log(JSON.stringify({
    level: 'info',
    timestamp: new Date().toISOString(),
    request_id: requestId,
    action: 'db_transaction_start'
  }));

  const insertResult = await db.insert(missionsTable).values(newMission).returning({
    id: missionsTable.id,
    title: missionsTable.title,
    status: missionsTable.status,
    user_id: missionsTable.user_id,
    created_at: missionsTable.created_at,
    description: missionsTable.description,
    category: missionsTable.category,
    price: missionsTable.price, // Récupérer le prix harmonisé
    location_data: missionsTable.location_data,
    urgency: missionsTable.urgency,
    deadline: missionsTable.deadline,
    tags: missionsTable.tags,
    currency: missionsTable.currency,
    is_team_mission: missionsTable.is_team_mission // Include team mission flag
  });

  if (!insertResult || insertResult.length === 0) {
    throw new Error('Insert failed - no result returned');
  }

  const insertedMission = insertResult[0];

  console.log(JSON.stringify({
    level: 'info',
    timestamp: new Date().toISOString(),
    request_id: requestId,
    action: 'db_insert_success',
    mission_id: insertedMission.id,
    execution_time_ms: Date.now() - startTime,
    inserted_data: {
      id: insertedMission.id,
      title: insertedMission.title,
      status: insertedMission.status,
      user_id: insertedMission.user_id,
      created_at: insertedMission.created_at,
      is_team_mission: insertedMission.is_team_mission
    }
  }));

  // 4. Récupérer la mission complète pour la réponse
  // Note: On récupère les données nécessaires pour le feed directement après l'insertion
  const mission = insertedMission; // Utiliser les données retournées par insert

  // 5. Utiliser le DTO mapper pour la réponse
  const mappedMission = mapMission({
    ...mission,
    currency: mission.currency ?? undefined,
    excerpt: mission.excerpt ?? undefined
  });
  const responsePayload = {
    ok: true,
    ...mappedMission,
    request_id: requestId
  };

  // Plus besoin de synchronisation : marketplace et feed lisent tous les deux depuis missions

  // 7. Réponse 201 avec ID garanti
  res.status(201).json(responsePayload);
}));

// GET /api/missions - Get all missions with bids (Phase 3 - Version ultra robuste)
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  const startTime = Date.now();

  console.log(JSON.stringify({
    level: 'info',
    timestamp: new Date().toISOString(),
    request_id: requestId,
    action: 'get_missions_start',
    user_agent: req.headers['user-agent']
  }));
  console.log('📋 GET /api/missions - Requête reçue');
  console.log('📋 Headers:', req.headers);
  console.log('📋 Query params:', req.query);

  try {
    // Phase 3.1 : Requête avec JOIN pour récupérer le nom du client
    const allMissions = await db
      .select({
        mission: missionsTable,
        user_name: users.name
      })
      .from(missionsTable)
      .leftJoin(users, eq(missionsTable.user_id, users.id))
      .orderBy(desc(missionsTable.created_at))
      .limit(100);

    console.log(JSON.stringify({
      level: 'info',
      timestamp: new Date().toISOString(),
      request_id: requestId,
      action: 'database_query_success',
      missions_count: allMissions.length,
      query_time_ms: Date.now() - startTime
    }));

    // Phase 3.2 : Validation préalable des données avant mapping
    const validMissions = allMissions.filter(row => {
      if (!row.mission.id || !row.mission.title) {
        console.warn(JSON.stringify({
          level: 'warn',
          timestamp: new Date().toISOString(),
          request_id: requestId,
          action: 'mission_validation_failed',
          mission_id: row.mission.id,
          reason: 'missing_required_fields'
        }));
        return false;
      }
      return true;
    });

    console.log(JSON.stringify({
      level: 'info',
      timestamp: new Date().toISOString(),
      request_id: requestId,
      action: 'missions_validation_complete',
      valid_missions: validMissions.length,
      filtered_out: allMissions.length - validMissions.length
    }));

    // Phase 3.3 : Mapping sécurisé avec gestion d'erreur par mission
    const missionsWithBids = [];
    let mappingErrors = 0;

    for (const row of validMissions) {
      try {
        const mappedMission = mapMission({
          ...row.mission,
          client_name: row.user_name,
          user_name: row.user_name,
          currency: row.mission.currency ?? undefined,
          excerpt: row.mission.excerpt ?? undefined
        });
        missionsWithBids.push(mappedMission);
      } catch (mappingError: any) {
        mappingErrors++;
        console.error(JSON.stringify({
          level: 'error',
          timestamp: new Date().toISOString(),
          request_id: requestId,
          action: 'mission_mapping_error',
          mission_id: row.mission.id,
          error: mappingError.message
        }));

        // Ajouter une version minimale de la mission en cas d'erreur
        missionsWithBids.push({
          id: row.mission.id,
          title: row.mission.title || 'Mission sans titre',
          description: row.mission.description || '',
          excerpt: 'Erreur lors du chargement des détails',
          category: row.mission.category || 'general',
          budget: '0',
          budget_value_cents: 0,
          currency: 'EUR',
          budget_display: 'Non disponible',
          location: 'Remote',
          status: row.mission.status || 'open',
          user_id: row.mission.user_id,
          userId: row.mission.user_id?.toString(),
          clientName: row.user_name || 'Client',
          createdAt: row.mission.created_at?.toISOString() || new Date().toISOString(),
          bids: []
        });
      }
    }

    console.log(JSON.stringify({
      level: 'info',
      timestamp: new Date().toISOString(),
      request_id: requestId,
      action: 'missions_mapping_complete',
      successful_mappings: missionsWithBids.length - mappingErrors,
      mapping_errors: mappingErrors,
      total_time_ms: Date.now() - startTime,
      sample_mission_ids: missionsWithBids.slice(0, 3).map(m => m.id),
      first_mission_sample: missionsWithBids[0] ? {
        id: missionsWithBids[0].id,
        title: missionsWithBids[0].title,
        status: missionsWithBids[0].status,
        budget_display: missionsWithBids[0].budget_display
      } : null
    }));

    // Phase 3.4 : Réponse structurée avec métadonnées
    res.json({
      missions: missionsWithBids,
      metadata: {
        total: missionsWithBids.length,
        request_id: requestId,
        query_time_ms: Date.now() - startTime,
        has_errors: mappingErrors > 0
      }
    });

  } catch (error: any) {
    // Phase 3.5 : Gestion d'erreur robuste avec logs structurés
    console.error(JSON.stringify({
      level: 'error',
      timestamp: new Date().toISOString(),
      request_id: requestId,
      action: 'get_missions_error',
      error_message: error.message,
      error_stack: error.stack,
      total_time_ms: Date.now() - startTime
    }));

    // Réponse d'erreur détaillée pour le debug
    res.status(500).json({
      ok: false,
      error: 'Internal server error',
      details: error.message,
      error_type: 'server_error',
      timestamp: new Date().toISOString(),
      request_id: requestId,
      debug_mode: process.env.NODE_ENV === 'development',
      suggestions: [
        'Vérifiez la connectivité à la base de données',
        'Contrôlez la structure de la table missions',
        'Validez que les colonnes requises existent'
      ]
    });
  }
}));

// GET /api/missions/health - Health check endpoint (must be before /:id route)
router.get('/health', asyncHandler(async (req: Request, res: Response) => {
  const startTime = Date.now();
  console.log('🏥 Mission health check endpoint called');

  try {
    // Test database connectivity
    const dbTest = await db.select({ count: sql`COUNT(*)` }).from(missionsTable).limit(1);
    const dbConnected = dbTest.length > 0;

    // Calculate response time
    const responseTime = Date.now() - startTime;

    const healthInfo = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'missions-api',
      environment: process.env.NODE_ENV || 'development',
      database: dbConnected ? 'connected' : 'disconnected',
      response_time_ms: responseTime,
      uptime_seconds: Math.floor(process.uptime()),
      memory_usage: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      }
    };

    console.log('🏥 Health check passed:', healthInfo);
    res.status(200).json(healthInfo);
  } catch (error: any) {
    console.error('🏥 Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'missions-api',
      environment: process.env.NODE_ENV || 'development',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      response_time_ms: Date.now() - startTime
    });
  }
}));

// GET /api/missions/debug - Diagnostic endpoint (must be before /:id route)
router.get('/debug', asyncHandler(async (req: Request, res: Response) => {
  console.log('🔍 Mission debug endpoint called');

  // Test database connection
  const testQuery = await db.select({ id: missionsTable.id }).from(missionsTable).limit(1);

  // Check database structure
  const dbInfo = {
    status: 'connected',
    sampleMissions: testQuery.length,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    databaseUrl: process.env.DATABASE_URL ? 'configured' : 'missing'
  };

  console.log('🔍 Database info:', dbInfo);
  res.json(dbInfo);
}));

// GET /api/missions/verify-sync - Vérifier la synchronisation missions/feed
router.get('/verify-sync', asyncHandler(async (req: Request, res: Response) => {
  console.log('🔍 Vérification de la synchronisation missions/feed');

  try {
    // Utiliser une requête simple similaire au debug endpoint qui fonctionne
    const missionCount = await db
      .select({ count: sql`COUNT(*)` })
      .from(missionsTable);

    const recentMissions = await db
      .select({
        id: missionsTable.id,
        title: missionsTable.title,
        status: missionsTable.status,
        created_at: missionsTable.created_at
      })
      .from(missionsTable)
      .orderBy(desc(missionsTable.created_at))
      .limit(5);

    // Compter les announcements sans problème de field mapping
    const announcementCount = await db
      .select({ count: sql`COUNT(*)` })
      .from(announcements);

    const syncStatus = {
      totalMissions: missionCount[0]?.count || 0,
      totalFeedItems: announcementCount[0]?.count || 0,
      recentMissions: recentMissions.map(m => ({
        id: m.id,
        title: m.title,
        status: m.status,
        created_at: m.created_at
      })),
      syncHealth: 'OK',
      message: 'Sync verification successful - using simplified queries'
    };

    console.log('🔍 Sync status:', syncStatus);
    res.json(syncStatus);
  } catch (error: any) {
    console.error('🔍 Verify sync error:', error);
    res.status(500).json({
      error: 'Erreur lors de la vérification de synchronisation',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}));

// GET /api/missions/:id - Get a specific mission with bids
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  let missionId: string | null = null;

  missionId = req.params.id;
  console.log('🔍 API: Récupération mission ID:', missionId);

  // Skip validation for special endpoints that should be handled elsewhere
  if (missionId === 'debug' || missionId === 'verify-sync' || missionId === 'health') {
    console.log('⚠️ API: Endpoint spécial détecté, ignoré dans cette route:', missionId);
    return res.status(404).json({ error: 'Endpoint non trouvé' });
  }

  if (!missionId || missionId === 'undefined' || missionId === 'null') {
    console.error('❌ API: Mission ID invalide:', missionId);
    return res.status(400).json({
      error: 'Mission ID invalide',
      details: 'L\'ID de mission est requis et ne peut pas être vide'
    });
  }

  // Convert missionId to integer for database query with better validation
  const missionIdInt = parseInt(missionId, 10);
  if (isNaN(missionIdInt) || missionIdInt <= 0 || !Number.isInteger(missionIdInt)) {
    console.error('❌ API: Mission ID n\'est pas un nombre valide:', missionId);
    return res.status(400).json({
      error: 'Mission ID doit être un nombre entier valide',
      received: missionId,
      details: 'L\'ID doit être un nombre entier positif'
    });
  }

  // Use select() + mapMission() pattern to avoid column mapping issues
  const missionRaw = await db
    .select()
    .from(missionsTable)
    .where(eq(missionsTable.id, missionIdInt))
    .limit(1);

  if (missionRaw.length === 0) {
    console.error('❌ API: Mission non trouvée:', missionId);
    return res.status(404).json({
      error: 'Mission non trouvée',
      missionId: missionIdInt,
      details: 'Aucune mission trouvée avec cet ID'
    });
  }

  // Log for debugging team missions
  if (missionRaw[0].is_team_mission) {
    console.log(`👥 Mission d'équipe détectée:`, {
      id: missionRaw[0].id,
      title: missionRaw[0].title,
      team_size: missionRaw[0].team_size,
      has_team_requirements: !!missionRaw[0].team_requirements,
      team_requirements_length: Array.isArray(missionRaw[0].team_requirements) ? missionRaw[0].team_requirements.length : 0
    });
  }

  // Map mission using DTO
  const mission = mapMission({
    ...missionRaw[0],
    currency: missionRaw[0].currency ?? undefined,
    excerpt: missionRaw[0].excerpt ?? undefined
  });

  // Get bids for this mission with error handling
  let missionBids: any[] = [];
  try {
    missionBids = await db
      .select({
        id: bids.id,
        amount: bids.price,
        timeline_days: bids.timeline_days,
        message: bids.message,
        status: bids.status,
        created_at: bids.created_at,
        provider_id: bids.provider_id,
        provider_name: users.name,
        provider_email: users.email,
        provider_rating: users.rating_mean
      })
      .from(bids)
      .leftJoin(users, eq(bids.provider_id, users.id))
      .where(eq(bids.mission_id, missionIdInt));

    console.log(`✅ Trouvé ${missionBids.length} candidatures pour la mission ${missionIdInt}`);
  } catch (error: any) {
    console.error('❌ Erreur lors de la récupération des bids:', error);
    missionBids = [];
  }

  // Return mapped mission with bids
  const result = {
    ...mission,
    bids: missionBids || []
  };

  console.log('✅ API: Mission trouvée:', result.title, 'avec', result.bids.length, 'offres');
  res.json(result);
}));

// GET /api/users/:userId/missions - Get missions with bids for a specific user (optimized JOIN)
router.get('/users/:userId/missions', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  console.log('👤 Fetching missions with bids for user:', userId);

  if (!userId || userId === 'undefined' || userId === 'null') {
    console.error('❌ Invalid user ID:', userId);
    return res.status(400).json({
      error: 'User ID invalide',
      details: 'L\'ID utilisateur est requis'
    });
  }

  const userIdInt = parseInt(userId, 10);
  if (isNaN(userIdInt) || userIdInt <= 0 || !Number.isInteger(userIdInt)) {
    console.error('❌ User ID is not a valid number:', userId);
    return res.status(400).json({
      error: 'User ID doit être un nombre entier valide',
      received: userId,
      details: 'L\'ID utilisateur doit être un nombre entier positif'
    });
  }

  console.log('🔍 Optimized query: Fetching missions with bids in single JOIN query');

  try {
    // OPTIMIZED: Single query with LEFT JOIN to get missions and bids together
    const missionsWithBidsData = await db
      .select({
        // Mission fields
        mission_id: missionsTable.id,
        title: missionsTable.title,
        description: missionsTable.description,
        category: missionsTable.category,
        budget_value_cents: missionsTable.budget_value_cents, // This will be removed or refactored later
        currency: missionsTable.currency,
        location_data: missionsTable.location_data,
        user_id: missionsTable.user_id,
        client_id: missionsTable.client_id,
        status: missionsTable.status,
        urgency: missionsTable.urgency,
        deadline: missionsTable.deadline,
        tags: missionsTable.tags,
        skills_required: missionsTable.skills_required,
        requirements: missionsTable.requirements,
        is_team_mission: missionsTable.is_team_mission,
        team_size: missionsTable.team_size,
        team_requirements: missionsTable.team_requirements, // Added team_requirements
        mission_created_at: missionsTable.created_at,
        mission_updated_at: missionsTable.updated_at,
        // Bid fields (null if no bids)
        bid_id: bids.id,
        bid_amount: bids.amount,
        bid_timeline_days: bids.timeline_days,
        bid_message: bids.message,
        bid_status: bids.status,
        bid_created_at: bids.created_at,
        provider_id: bids.provider_id
      })
      .from(missionsTable)
      .leftJoin(bids, eq(missionsTable.id, bids.mission_id))
      .where(eq(missionsTable.user_id, userIdInt))
      .orderBy(desc(missionsTable.created_at), desc(bids.created_at));

    console.log('📊 JOIN query result: Found', missionsWithBidsData.length, 'mission-bid combinations');

    // Group data by mission to structure the result properly
    const missionMap = new Map();

    missionsWithBidsData.forEach(row => {
      const missionId = row.mission_id;

      if (!missionMap.has(missionId)) {
        // Create mission entry
        missionMap.set(missionId, {
          // Core fields
          id: row.mission_id,
          title: row.title,
          description: row.description,
          excerpt: generateExcerpt(row.description || '', 200),
          category: row.category,
          // Budget - Use 'price' and ensure it's a string for display
          price: row.budget_value_cents?.toString() || '0', // Display price as string
          currency: row.currency,
          // Location
          location_data: row.location_data,
          location: ((row.location_data as any)?.raw || (row.location_data as any)?.city || 'Remote'),
          // Status
          status: row.status,
          urgency: row.urgency,
          // User relationships
          user_id: row.user_id,
          client_id: row.client_id,
          userId: row.user_id?.toString(),
          clientName: 'Moi',
          // Team
          is_team_mission: row.is_team_mission,
          team_size: row.team_size,
          team_requirements: row.team_requirements, // Include team_requirements
          // Timestamps
          created_at: row.mission_created_at,
          updated_at: row.mission_updated_at,
          createdAt: row.mission_created_at?.toISOString() || new Date().toISOString(),
          updatedAt: row.mission_updated_at?.toISOString(),
          deadline: row.deadline,
          // Arrays
          tags: row.tags || [],
          skills_required: row.skills_required || [],
          requirements: row.requirements,
          bids: []
        });
      }

      // Add bid if it exists
      if (row.bid_id) {
        missionMap.get(missionId).bids.push({
          id: row.bid_id,
          amount: row.bid_amount,
          timeline_days: row.bid_timeline_days,
          message: row.bid_message,
          status: row.bid_status,
          created_at: row.bid_created_at,
          provider_id: row.provider_id
        });
      }
    });

    const missionsWithBids = Array.from(missionMap.values());

    console.log(`✅ OPTIMIZED: Found ${missionsWithBids.length} missions for user ${userId}`);
    console.log(`✅ PERFORMANCE: Eliminated N+1 queries - used single JOIN instead of ${missionsWithBids.length + 1} separate queries`);

    res.json(missionsWithBids);
  } catch (error: any) {
    console.error('❌ Error in optimized missions+bids query:', error);
    // Fallback to simple missions without bids
    const userMissions = await db
      .select({
        id: missionsTable.id,
        title: missionsTable.title,
        description: missionsTable.description,
        category: missionsTable.category,
        budget_value_cents: missionsTable.budget_value_cents, // This will be removed or refactored later
        currency: missionsTable.currency,
        location_data: missionsTable.location_data,
        user_id: missionsTable.user_id,
        client_id: missionsTable.client_id,
        status: missionsTable.status,
        urgency: missionsTable.urgency,
        deadline: missionsTable.deadline,
        tags: missionsTable.tags,
        skills_required: missionsTable.skills_required,
        requirements: missionsTable.requirements,
        is_team_mission: missionsTable.is_team_mission,
        team_size: missionsTable.team_size,
        team_requirements: missionsTable.team_requirements, // Added team_requirements
        created_at: missionsTable.created_at,
        updated_at: missionsTable.updated_at
      })
      .from(missionsTable)
      .where(eq(missionsTable.user_id, userIdInt))
      .orderBy(desc(missionsTable.created_at));

    const fallbackMissions = userMissions.map(mission => ({
      id: mission.id,
      title: mission.title,
      description: mission.description,
      excerpt: generateExcerpt(mission.description || '', 200),
      category: mission.category,
      // Use 'price' harmonized field
      price: mission.budget_value_cents?.toString() || '0',
      currency: mission.currency,
      location_data: mission.location_data,
      location: ((mission.location_data as any)?.raw || (mission.location_data as any)?.city || 'Remote'),
      status: mission.status,
      urgency: mission.urgency,
      user_id: mission.user_id,
      client_id: mission.client_id,
      userId: mission.user_id?.toString(),
      clientName: 'Moi',
      is_team_mission: mission.is_team_mission,
      team_size: mission.team_size,
      team_requirements: mission.team_requirements, // Included team_requirements
      created_at: mission.created_at,
      updated_at: mission.updated_at,
      createdAt: mission.created_at?.toISOString() || new Date().toISOString(),
      updatedAt: mission.updated_at?.toISOString(),
      deadline: mission.deadline?.toISOString(),
      tags: mission.tags || [],
      skills_required: mission.skills_required || [],
      requirements: mission.requirements,
      bids: []
    }));

    res.json(fallbackMissions);
  }
}));

// GET /api/users/:userId/bids - Get bids for a specific user
router.get('/users/:userId/bids', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  console.log('👤 Fetching bids for user:', userId);

  if (!userId || userId === 'undefined' || userId === 'null') {
    console.error('❌ Invalid user ID:', userId);
    return res.status(400).json({ error: 'User ID invalide' });
  }

  // Convert userId to integer for database query
  const userIdInt = parseInt(userId, 10);
  if (isNaN(userIdInt)) {
    console.error('❌ User ID is not a valid number:', userId);
    return res.status(400).json({ error: 'User ID doit être un nombre' });
  }

  // TODO: Query user bids when bids table exists
  // const userBids = await db
  //   .select()
  //   .from(bidTable)
  //   .where(eq(bidTable.provider_id, userIdInt))
  //   .orderBy(desc(bidTable.created_at));
  const userBids: any[] = []; // Placeholder until bids table is created

  console.log('🔗 Mapping: userId =', userId, '-> provider_id filter:', userIdInt);

  console.log(`👤 Found ${userBids.length} bids for user ${userId}`);
  res.json(userBids);
}));

// PUT /api/missions/:id - Update a specific mission
router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
  const missionId = req.params.id;
  const updateData = req.body;
  console.log('✏️ API: Modification mission ID:', missionId);
  console.log('✏️ API: Données reçues:', JSON.stringify(updateData, null, 2));

  // Skip special endpoints
  if (missionId === 'debug' || missionId === 'verify-sync') {
    return res.status(404).json({ error: 'Endpoint non trouvé' });
  }

  if (!missionId || missionId === 'undefined' || missionId === 'null') {
    console.error('❌ API: Mission ID invalide:', missionId);
    return res.status(400).json({ error: 'Mission ID invalide' });
  }

  const missionIdInt = parseInt(missionId, 10);
  if (isNaN(missionIdInt) || missionIdInt <= 0) {
    console.error('❌ API: Mission ID n\'est pas un nombre valide:', missionId);
    return res.status(400).json({ error: 'Mission ID doit être un nombre valide' });
  }

  // Validate required fields
  if (!updateData.title || updateData.title.trim() === '') {
    return res.status(400).json({
      error: 'Le titre est requis',
      field: 'title'
    });
  }

  if (!updateData.description || updateData.description.trim() === '') {
    return res.status(400).json({
      error: 'La description est requise',
      field: 'description'
    });
  }

  // Check if mission exists - select only id for existence check
  const existingMission = await db
    .select({ id: missionsTable.id, category: missionsTable.category, deadline: missionsTable.deadline, tags: missionsTable.tags, requirements: missionsTable.requirements, currency: missionsTable.currency, location_data: missionsTable.location_data, is_team_mission: missionsTable.is_team_mission, team_size: missionsTable.team_size, team_requirements: missionsTable.team_requirements }) // Include team_requirements
    .from(missionsTable)
    .where(eq(missionsTable.id, missionIdInt))
    .limit(1);

  if (existingMission.length === 0) {
    console.error('❌ API: Mission non trouvée pour modification:', missionId);
    return res.status(404).json({ error: 'Mission non trouvée' });
  }

  // Helper function to extract city from a location string
  const extractCity = (locationString: string | null | undefined): string | null => {
    if (!locationString) return null;
    const parts = locationString.split(',');
    return parts.length > 1 ? parts[parts.length - 1].trim() : locationString.trim();
  };

  // Prepare update data
  const missionToUpdate = {
    title: updateData.title,
    description: updateData.description,
    excerpt: generateExcerpt(updateData.description, 200),
    category: updateData.category || existingMission[0].category,
    // Harmonize price: use updateData.price if provided, otherwise keep existing. Ensure it's an integer.
    price: updateData.price !== undefined ? parseInt(updateData.price) : existingMission[0].price,
    location_data: updateData.location ? {
      raw: updateData.location,
      city: updateData.city || null,
      country: updateData.country || 'France',
      remote_allowed: updateData.remote_allowed !== false
    } : existingMission[0].location_data,
    urgency: updateData.urgency || 'medium',
    status: updateData.status || 'published',
    updated_at: new Date(),
    deadline: updateData.deadline ? new Date(updateData.deadline) : existingMission[0].deadline,
    tags: updateData.tags || existingMission[0].tags,
    requirements: updateData.requirements || existingMission[0].requirements,
    currency: updateData.currency || existingMission[0].currency,
    is_team_mission: updateData.is_team_mission !== undefined ? updateData.is_team_mission : existingMission[0].is_team_mission, // Update team mission flag
    team_size: updateData.team_size !== undefined ? updateData.team_size : existingMission[0].team_size, // Update team size
    team_requirements: updateData.team_requirements || existingMission[0].team_requirements // Update team requirements
  };

  console.log('✏️ API: Données de mise à jour:', JSON.stringify(missionToUpdate, null, 2));

  // Update the mission
  const updatedMission = await db
    .update(missionsTable)
    .set(missionToUpdate)
    .where(eq(missionsTable.id, missionIdInt))
    .returning();

  if (updatedMission.length === 0) {
    throw new Error('Échec de la mise à jour de la mission');
  }

  console.log('✅ API: Mission modifiée avec succès:', missionId);
  res.json(updatedMission[0]);
}));

// DELETE /api/missions/:id - Delete a specific mission
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const missionId = req.params.id;
  console.log('🗑️ API: Suppression mission ID:', missionId);

  // Skip special endpoints
  if (missionId === 'debug' || missionId === 'verify-sync') {
    return res.status(404).json({ error: 'Endpoint non trouvé' });
  }

  if (!missionId || missionId === 'undefined' || missionId === 'null') {
    console.error('❌ API: Mission ID invalide:', missionId);
    return res.status(400).json({ error: 'Mission ID invalide' });
  }

  // Convert missionId to integer for database query
  const missionIdInt = parseInt(missionId, 10);
  if (isNaN(missionIdInt) || missionIdInt <= 0) {
    console.error('❌ API: Mission ID n\'est pas un nombre valide:', missionId);
    return res.status(400).json({ error: 'Mission ID doit être un nombre valide' });
  }

  // Check if mission exists - select only id for existence check
  const existingMission = await db
    .select({ id: missionsTable.id })
    .from(missionsTable)
    .where(eq(missionsTable.id, missionIdInt))
    .limit(1);

  if (existingMission.length === 0) {
    console.error('❌ API: Mission non trouvée pour suppression:', missionId);
    return res.status(404).json({ error: 'Mission non trouvée' });
  }

  // Delete associated bids first
  try {
    await db.delete(bids).where(eq(bids.mission_id, missionIdInt));
    console.log('✅ API: Offres supprimées pour mission:', missionId);
  } catch (error) {
    console.warn('⚠️ Impossible de supprimer les offres:', error);
  }

  // Delete the mission
  const deletedMission = await db
    .delete(missionsTable)
    .where(eq(missionsTable.id, missionIdInt))
    .returning();

  if (deletedMission.length === 0) {
    throw new Error('Échec de la suppression de la mission');
  }

  console.log('✅ API: Mission supprimée avec succès:', missionId);
  res.json({ message: 'Mission supprimée avec succès', mission: deletedMission[0] });
}));

export default router;
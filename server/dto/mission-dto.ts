// ============================================
// DTO MAPPER SÉCURISÉ POUR MISSIONS
// ============================================

export interface MissionRow {
  id: number;
  title: string;
  description?: string;
  excerpt?: string;
  category?: string;
  price?: number; // Renamed from budget_value_cents and assumed to be integer
  currency?: string;
  location_data?: any; // JSONB field - peut être null
  location_raw?: string;
  postal_code?: string;
  city?: string;
  country?: string;
  remote_allowed?: boolean;
  user_id?: number;
  client_id?: number;
  status?: string;
  urgency?: string;
  deadline?: Date;
  tags?: string[];
  skills_required?: string[];
  requirements?: string;
  is_team_mission?: boolean;
  team_size?: number;
  team_requirements?: any; // Added for team missions
  created_at?: Date;
  updated_at?: Date;
  client_name?: string; // Added to MissionRow for clarity
  user_name?: string;   // Added to MissionRow for clarity
  bids?: any[];         // Added to MissionRow for clarity
}

export interface LocationData {
  raw?: string;
  address?: string;
  city?: string;
  country?: string;
  remote_allowed?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

/**
 * Extrait location de manière simple (JSONB déjà validé par contrainte DB)
 */
function extractLocationSafely(mission: MissionRow) {
  const loc = mission.location_data || { country: 'France', remote_allowed: true };
  return {
    location: loc.city || loc.raw || 'Remote',
    location_raw: loc.raw || null,
    postal_code: mission.postal_code || null, // Use mission's postal_code directly
    city: mission.city || null,             // Use mission's city directly
    country: mission.country || loc.country || 'France', // Prefer mission's country
    remote_allowed: mission.remote_allowed !== false && loc.remote_allowed !== false, // Combine flags
    location_data: loc
  };
}

/**
 * Formate le budget de manière sécurisée
 * @param mission - Objet mission
 * @returns Budget formaté en string
 */
function extractBudgetSafely(mission: MissionRow): {
  price: number;
  budgetDisplay: string;
  currency: string;
} {
  const price = mission.price || 0;
  const currency = mission.currency || 'EUR';

  return {
    price: price,
    currency: currency,
    budgetDisplay: price > 0 ? `${price}€` : 'À négocier'
  };
}

/**
 * Extrait les métadonnées de manière sécurisée
 * @param mission - Objet mission
 * @returns Métadonnées normalisées
 */
function extractMetadataSafely(mission: MissionRow): {
  tags: string[];
  skills_required: string[];
  requirements: string | null;
} {
  return {
    tags: Array.isArray(mission.tags) ? mission.tags : [],
    skills_required: Array.isArray(mission.skills_required) ? mission.skills_required : [],
    requirements: mission.requirements || null
  };
}

/**
 * Mappe une mission de la DB vers le format API de manière sécurisée
 * @param mission - Ligne de mission depuis la DB
 * @returns Mission formatée pour l'API
 */
export function mapMission(mission: MissionRow): any {
  if (!mission || !mission.id) {
    console.error('❌ DTO Mapper: Mission invalide reçue:', mission);
    throw new Error('Mission data is invalid or missing required fields');
  }

  try {
    // Extraction sécurisée des différentes parties
    const location = extractLocationSafely(mission);
    const budget = extractBudgetSafely(mission);
    const metadata = extractMetadataSafely(mission);

    // Construction de l'objet final
    const mappedMission = {
      // Identifiants
      id: mission.id,

      // Contenu
      title: mission.title || 'Mission sans titre',
      description: mission.description || '',
      excerpt: mission.excerpt || (mission.description ?
        (mission.description.length > 200 ?
          mission.description.substring(0, 200) + '...' :
          mission.description
        ) :
        'Description non disponible'
      ),
      category: mission.category || 'developpement',

      // Budget
      ...budget,

      // Localisation
      ...location,

      // Relations utilisateur
      user_id: mission.user_id,
      client_id: mission.client_id || mission.user_id,
      userId: mission.user_id?.toString() || mission.client_id?.toString(),
      clientId: mission.client_id?.toString() || mission.user_id?.toString(),
      clientName: mission.client_name || mission.user_name || 'Client', // Use client_name, fallback to user_name, then 'Client'

      // Statut et timing
      status: mission.status || 'open',
      urgency: mission.urgency || 'medium',
      deadline: mission.deadline?.toISOString(),

      // Métadonnées
      ...metadata,

      // Team mission fields
      is_team_mission: mission.is_team_mission || false,
      isTeamMode: mission.is_team_mission || false,
      team_size: mission.team_size || 1,
      teamRequirements: mission.team_requirements && Array.isArray(mission.team_requirements) && mission.team_requirements.length > 0
        ? mission.team_requirements
        : (mission.is_team_mission ? [] : undefined),

      // Timestamps
      created_at: mission.created_at,
      updated_at: mission.updated_at,
      createdAt: mission.created_at?.toISOString() || new Date().toISOString(),
      updatedAt: mission.updated_at?.toISOString(),

      // Bids (si présents) - supporter les deux formats (amount et price)
      bids: mission.bids?.map((bid: any) => ({
        id: bid.id,
        amount: bid.price || bid.amount || 0, // ✅ Prioriser 'price' (nouveau format)
        timeline_days: bid.timeline_days,
        message: bid.message,
        providerId: bid.provider_id?.toString(),
        providerName: bid.provider_name || 'Anonyme',
        status: bid.status,
        bid_type: bid.bid_type || 'individual', // ✅ Type de candidature
        team_composition: bid.team_composition || null, // ✅ NULL pour individuel
        created_at: bid.created_at
      })) || [],
    };

    console.log('✅ DTO Mapper: Mission mappée avec succès:', mappedMission.id, mappedMission.title);
    return mappedMission;

  } catch (error) {
    console.error('❌ DTO Mapper: Erreur lors du mapping de la mission:', mission.id, error);
    console.error('❌ DTO Mapper: Données mission problématiques:', JSON.stringify(mission, null, 2));

    // Retourner un objet minimal en cas d'erreur pour éviter le crash
    return {
      id: mission.id,
      title: mission.title || 'Mission avec erreur',
      description: mission.description || '',
      excerpt: 'Erreur lors du chargement des détails',
      category: 'general',
      price: 0,
      currency: 'EUR',
      budgetDisplay: 'Non disponible',
      location: 'Remote',
      location_raw: null,
      postal_code: null,
      city: null,
      country: 'France',
      remote_allowed: true,
      location_data: { remote_allowed: true },
      user_id: mission.user_id,
      client_id: mission.client_id || mission.user_id,
      userId: mission.user_id?.toString(),
      clientId: (mission.client_id || mission.user_id)?.toString(),
      clientName: 'Client', // Fallback to 'Client' in case of error
      status: 'open',
      urgency: 'medium',
      deadline: null,
      tags: [],
      skills_required: [],
      requirements: null,
      is_team_mission: false,
      team_size: 1,
      created_at: mission.created_at,
      updated_at: mission.updated_at,
      createdAt: mission.created_at?.toISOString() || new Date().toISOString(),
      updatedAt: mission.updated_at?.toISOString(),
      bids: []
    };
  }
}

/**
 * Mappe plusieurs missions de manière sécurisée
 * @param rows - Tableau de missions depuis la DB
 * @returns Tableau de missions mappées
 */
export function mapMissions(rows: MissionRow[]): any[] {
  if (!Array.isArray(rows)) {
    console.warn('⚠️ DTO Mapper: Input n\'est pas un tableau, retour tableau vide');
    return [];
  }

  const mappedMissions = [];
  let errorCount = 0;

  for (const mission of rows) {
    try {
      const mapped = mapMission(mission);
      mappedMissions.push(mapped);
    } catch (error) {
      errorCount++;
      console.error('❌ DTO Mapper: Échec du mapping pour mission:', mission?.id, error);
      // Continuer avec les autres missions au lieu de tout arrêter
    }
  }

  if (errorCount > 0) {
    console.warn(`⚠️ DTO Mapper: ${errorCount} missions n'ont pas pu être mappées correctement sur ${rows.length}`);
  } else {
    console.log(`✅ DTO Mapper: ${mappedMissions.length} missions mappées avec succès`);
  }

  return mappedMissions;
}

/**
 * Valide qu'une mission a les champs requis avant mapping
 * @param mission - Mission à valider
 * @returns true si valide
 */
export function validateMissionData(mission: any): boolean {
  return !!(
    mission?.id &&
    mission?.title &&
    typeof mission.title === 'string' &&
    mission.title.trim().length > 0
  );
}

/**
 * Fonction utilitaire pour nettoyer les objets JSONB problématiques
 * @param obj - Objet potentiellement problématique
 * @returns Objet nettoyé ou null
 */
export function sanitizeJSONB(obj: any): any {
  if (obj === null || obj === undefined) {
    return null;
  }

  if (typeof obj === 'string') {
    try {
      return JSON.parse(obj);
    } catch {
      return null;
    }
  }

  if (typeof obj === 'object') {
    return obj;
  }

  return null;
}
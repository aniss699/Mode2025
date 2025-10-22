import express from 'express';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { users, bids } from '../shared/schema.js';

// Import routes
import missionsRoutes from './routes/missions.js';
import bidsRoutes from './routes/bids.js';
import teamsRoutes from './routes/open-teams.js';
import feedRoutes from './routes/feed-routes.js';
import favoritesRoutes from './routes/favorites-routes.js';
import reviewsRoutes from './routes/reviews.js';
import contractsRoutes from './routes/contracts.js';
import filesRoutes from './routes/files.js';
import messagingRoutes from './routes/messaging.js'; // Import messaging routes
import notificationsRoutes from './routes/notifications.js'; // Import notifications routes
import userSettingsRoutes from './routes/user-settings.js'; // Import user settings routes

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const db = drizzle(pool);

const router = express.Router();

// Placeholder for authMiddleware - replace with your actual authentication middleware
const authMiddleware = (req: any, res: any, next: any) => {
  // In a real application, you would verify the user's token here
  // For demo purposes, we'll assume the user is authenticated
  console.log('Authentication middleware placeholder passed.');
  next();
};

// Update user profile
router.put('/users/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, profile_data, role } = req.body;

    console.log(`📝 PUT /api/users/${userId} - Mise à jour du profil`, { 
      hasRole: !!role,
      newRole: role 
    });

    const updateData: any = {
      name: name,
      profile_data: profile_data,
      updated_at: new Date()
    };

    // Ajouter le rôle si fourni
    if (role && (role === 'CLIENT' || role === 'PRO')) {
      updateData.role = role;
      console.log(`✅ Mise à jour du rôle: ${role}`);
    }

    await db.update(users)
      .set(updateData)
      .where(eq(users.id, userId));

    res.json({ message: 'Profil mis à jour avec succès' });
  } catch (error) {
    console.error('❌ Erreur update user profile:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get available providers (PRO users with availability=true in profile_data)
router.get('/providers/available', async (req, res) => {
  try {
    console.log('📋 GET /api/providers/available - Récupération des prestataires disponibles');
    
    // Récupérer tous les PRO
    const allProviders = await db.select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      rating_mean: users.rating_mean,
      rating_count: users.rating_count,
      profile_data: users.profile_data,
      created_at: users.created_at
    })
    .from(users)
    .where(eq(users.role, 'PRO'));

    // Filtrer uniquement ceux avec availability=true dans profile_data
    const availableProviders = allProviders.filter(provider => {
      const profileData = provider.profile_data as any;
      // Gérer à la fois boolean et string pour compatibilité
      return profileData?.availability === true || profileData?.availability === 'true';
    });

    console.log(`✅ Providers disponibles: ${availableProviders.length}/${allProviders.length}`);
    
    // Récupérer les disponibilités de chaque prestataire depuis user_availability
    const formattedProviders = await Promise.all(availableProviders.map(async (provider) => {
      const profileData = (provider.profile_data as any) || {};
      
      // Récupérer les disponibilités réelles depuis la table user_availability
      const availabilityQuery = await pool.query(
        `SELECT date, start_time, end_time, rate 
         FROM user_availability 
         WHERE user_id = $1 AND date >= CURRENT_DATE
         ORDER BY date, start_time`,
        [provider.id]
      );

      // Grouper les créneaux par date
      const availabilityByDate: { [key: string]: Array<{ start: string; end: string; rate: number }> } = {};
      availabilityQuery.rows.forEach(row => {
        const dateKey = row.date.toISOString().split('T')[0];
        if (!availabilityByDate[dateKey]) {
          availabilityByDate[dateKey] = [];
        }
        availabilityByDate[dateKey].push({
          start: row.start_time,
          end: row.end_time,
          rate: parseFloat(row.rate || '0')
        });
      });

      // Formater les disponibilités
      const availability = Object.entries(availabilityByDate).map(([date, slots]) => ({
        date,
        timeSlots: slots.map(s => `${s.start}-${s.end}`),
        slots: slots // ✅ Ajouter les slots structurés avec rate
      }));

      return {
        id: provider.id.toString(),
        name: provider.name,
        category: profileData.category || 'development',
        location: profileData.location || 'Paris',
        rating: parseFloat(provider.rating_mean?.toString() || '0'),
        hourlyRate: profileData.hourlyRate || 50,
        skills: profileData.skills?.map((s: any) => s.name || s) || [],
        responseTime: '< 2h',
        completedProjects: provider.rating_count || 0,
        availability: availability.length > 0 ? availability : [],
        lastSeen: new Date().toISOString(),
        memberSince: provider.created_at?.toISOString() || new Date().toISOString()
      };
    }));

    res.json(formattedProviders);
  } catch (error) {
    console.error('❌ Erreur get providers available:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get all demo providers
router.get('/demo-providers', async (req, res) => {
  try {
    const providers = await db.select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      rating_mean: users.rating_mean,
      rating_count: users.rating_count,
      profile_data: users.profile_data,
      created_at: users.created_at
    })
    .from(users)
    .where(eq(users.role, 'PRO'));

    res.json({ providers });
  } catch (error) {
    console.error('Erreur get demo providers:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get all demo projects
router.get('/demo-projects', async (req, res) => {
  try {
    const projectsWithClients = await db
      .select({
        id: users.id,
        title: users.name,
        description: users.email,
        budget: users.role,
        category: users.rating_mean,
        quality_target: users.rating_count,
        status: users.profile_data,
        created_at: users.created_at,
        client_name: users.name,
        client_email: users.email
      })
      .from(users)
      .leftJoin(users, eq(users.id, users.id));

    res.json({ projects: projectsWithClients });
  } catch (error) {
    console.error('Erreur get demo projects:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get all demo bids with project and provider info
router.get('/demo-bids', async (req, res) => {
  try {
    const bidsWithInfo = await db
      .select({
        id: bids.id,
        amount: bids.amount,
        timeline_days: bids.timeline_days,
        message: bids.message,
        score_breakdown: bids.score_breakdown,
        is_leading: bids.is_leading,
        created_at: bids.created_at,
        project_title: users.name,
        project_budget: users.email,
        provider_name: users.name,
        provider_email: users.email,
        provider_profile: users.profile_data
      })
      .from(bids)
      .leftJoin(users, eq(bids.project_id, users.id))
      .leftJoin(users, eq(bids.provider_id, users.id));

    res.json({ bids: bidsWithInfo });
  } catch (error) {
    console.error('Erreur get demo bids:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get provider profile by ID
router.get('/provider/:id', async (req, res) => {
  try {
    const providerId = parseInt(req.params.id);

    const provider = await db.select().from(users).where(eq(users.id, providerId)).limit(1);

    if (provider.length === 0) {
      return res.status(404).json({ error: 'Prestataire non trouvé' });
    }

    const providerData = provider[0];

    // Get provider's bids
    const providerBids = await db
      .select({
        id: bids.id,
        amount: bids.amount,
        timeline_days: bids.timeline_days,
        message: bids.message,
        is_leading: bids.is_leading,
        created_at: bids.created_at,
        project_title: users.name,
        project_budget: users.email
      })
      .from(bids)
      .leftJoin(users, eq(bids.project_id, users.id))
      .where(eq(bids.provider_id, providerId));

    res.json({ 
      provider: {
        id: providerData.id,
        email: providerData.email,
        name: providerData.name,
        role: providerData.role,
        rating_mean: providerData.rating_mean,
        rating_count: providerData.rating_count,
        profile_data: providerData.profile_data,
        created_at: providerData.created_at,
        bids: providerBids
      }
    });

  } catch (error) {
    console.error('Erreur get provider:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get AI analysis demo data
router.get('/ai-analysis-demo', async (req, res) => {
  try {
    const recentProjects = await db.select({
      id: users.id,
      title: users.name,
      description: users.email,
      budget: users.role,
      category: users.rating_mean,
      created_at: users.created_at
    })
    .from(users)
    .limit(3);

    const recentBids = await db.select({
      id: bids.id,
      amount: bids.amount,
      timeline_days: bids.timeline_days,
      score_breakdown: bids.score_breakdown,
      created_at: bids.created_at
    })
    .from(bids)
    .limit(5);

    // Generate AI analysis data based on real projects
    const aiAnalysis = {
      totalProjects: recentProjects.length,
      totalBids: recentBids.length,
      averageProjectBudget: recentProjects.reduce((sum, p) => {
        const budgetRange = p.budget?.split('-') || ['0'];
        const avgBudget = budgetRange.length > 1 
          ? (parseInt(budgetRange[0]) + parseInt(budgetRange[1])) / 2
          : parseInt(budgetRange[0]) || 0;
        return sum + avgBudget;
      }, 0) / recentProjects.length || 0,
      popularCategories: Array.from(new Set(recentProjects.map(p => p.category))),
      averageBidAmount: recentBids.reduce((sum, b) => sum + parseFloat(b.amount || '0'), 0) / recentBids.length || 0,
      successRate: 0.87,
      timeToMatch: 2.3, // days
      projects: recentProjects,
      bids: recentBids
    };

    res.json({ analysis: aiAnalysis });

  } catch (error) {
    console.error('Erreur get AI analysis:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Mount routes with auth middleware where needed
  router.use('/missions', authMiddleware, missionsRoutes);
  router.use('/bids', authMiddleware, bidsRoutes);
  router.use('/teams', authMiddleware, teamsRoutes);
  router.use('/feed', feedRoutes);
  router.use('/favorites', authMiddleware, favoritesRoutes);
  router.use('/reviews', authMiddleware, reviewsRoutes);
  router.use('/contracts', authMiddleware, contractsRoutes);
  router.use('/files', authMiddleware, filesRoutes);

// Add new routes for messaging and notifications
router.use('/', messagingRoutes);
router.use('/', notificationsRoutes);
router.use('/', userSettingsRoutes);

export default router;
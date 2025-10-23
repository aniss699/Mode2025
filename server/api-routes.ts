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

// LEGACY ROUTES - Désactivées pour la transition vers réseau social mode
// Ces routes utilisent l'ancien schéma missions/bids qui n'existe plus

// Get all demo projects - DISABLED (legacy)
router.get('/demo-projects', async (req, res) => {
  try {
    res.json({ projects: [], message: 'Legacy route - use /api/feed for looks instead' });
  } catch (error) {
    console.error('Erreur get demo projects:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get all demo bids - DISABLED (legacy)
router.get('/demo-bids', async (req, res) => {
  try {
    res.json({ bids: [], message: 'Legacy route - use /api/social/comments for comments instead' });
  } catch (error) {
    console.error('Erreur get demo bids:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get provider profile - DISABLED (legacy)
router.get('/provider/:id', async (req, res) => {
  try {
    const providerId = parseInt(req.params.id);
    const provider = await db.select().from(users).where(eq(users.id, providerId)).limit(1);

    if (provider.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({ 
      provider: provider[0],
      message: 'Legacy route - use /api/profile/:id instead'
    });

  } catch (error) {
    console.error('Erreur get provider:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get AI analysis - DISABLED (legacy)
router.get('/ai-analysis-demo', async (req, res) => {
  try {
    res.json({ 
      analysis: {
        message: 'Legacy route disabled',
        totalProjects: 0,
        totalBids: 0
      } 
    });
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
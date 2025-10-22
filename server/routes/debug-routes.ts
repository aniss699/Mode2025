
import { Router } from 'express';
import { db } from '../database.js';
import { users } from '../../shared/schema.js';
import { eq } from 'drizzle-orm';

const router = Router();

// GET /api/debug/user/:id - Afficher toutes les données d'un utilisateur
router.get('/debug/user/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user.length) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const userData = user[0];
    const profileData = userData.profile_data as any || {};

    res.json({
      debug: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        profile_data_type: typeof userData.profile_data,
        profile_data_keys: Object.keys(profileData),
        profile_data_full: profileData,
        availability_value: profileData.availability,
        availability_type: typeof profileData.availability,
        created_at: userData.created_at,
        updated_at: userData.updated_at
      }
    });
  } catch (error) {
    console.error('Erreur debug:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;

import { Router, Request, Response, Express } from 'express';
import { socialService } from '../services/social-service';
import { db } from '../db';
import { users } from '../../shared/schema';
import { sql } from 'drizzle-orm';

const router = Router();

// Get popular users
router.get('/popular-users', async (req: Request, res: Response) => {
  try {
    const popularUsers = await db
      .select()
      .from(users)
      .orderBy(sql`followers_count DESC`)
      .limit(12);

    res.json(popularUsers);
  } catch (error) {
    console.error('Error fetching popular users:', error);
    res.status(500).json({ error: 'Failed to fetch popular users' });
  }
});


// POST /api/social/follow/:userId - Follow un utilisateur
router.post('/follow/:userId', async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const followingId = parseInt(req.params.userId);

    if (isNaN(followingId)) {
      return res.status(400).json({ error: 'ID utilisateur invalide' });
    }

    await socialService.followUser(req.user.id, followingId);
    res.json({ success: true, following: true });
  } catch (error) {
    console.error('Erreur follow:', error);
    if (error instanceof Error && error.message === 'Already following') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE /api/social/follow/:userId - Unfollow un utilisateur
router.delete('/follow/:userId', async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const followingId = parseInt(req.params.userId);

    if (isNaN(followingId)) {
      return res.status(400).json({ error: 'ID utilisateur invalide' });
    }

    await socialService.unfollowUser(req.user.id, followingId);
    res.json({ success: true, following: false });
  } catch (error) {
    console.error('Erreur unfollow:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/social/following/:userId - Check si on suit l'utilisateur
router.get('/following/:userId', async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const followingId = parseInt(req.params.userId);
    const isFollowing = await socialService.isFollowing(req.user.id, followingId);

    res.json({ following: isFollowing });
  } catch (error) {
    console.error('Erreur check following:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/social/followers/:userId - Liste followers
router.get('/followers/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const followers = await socialService.getFollowers(userId);

    res.json(followers);
  } catch (error) {
    console.error('Erreur récupération followers:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/social/following-list/:userId - Liste following
router.get('/following-list/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const following = await socialService.getFollowing(userId);

    res.json(following);
  } catch (error) {
    console.error('Erreur récupération following:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
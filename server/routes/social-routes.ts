
import { Router } from 'express';
import { socialService } from '../services/social-service';

const router = Router();

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


import { Router } from 'express';
import { userStatsService } from '../services/user-stats-service';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Statistiques de garde-robe
router.get('/wardrobe/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const requestingUserId = req.user?.id;

    // Seul l'utilisateur peut voir ses stats détaillées
    if (userId !== requestingUserId) {
      return res.status(403).json({ error: 'Non autorisé' });
    }

    const stats = await userStatsService.getWardrobeStats(userId);
    res.json(stats);
  } catch (error) {
    console.error('Erreur stats garde-robe:', error);
    res.status(500).json({ error: 'Erreur lors du calcul des statistiques' });
  }
});

// Statistiques d'engagement
router.get('/engagement/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const requestingUserId = req.user?.id;

    // Seul l'utilisateur peut voir ses stats détaillées
    if (userId !== requestingUserId) {
      return res.status(403).json({ error: 'Non autorisé' });
    }

    const stats = await userStatsService.getEngagementStats(userId);
    res.json(stats);
  } catch (error) {
    console.error('Erreur stats engagement:', error);
    res.status(500).json({ error: 'Erreur lors du calcul des statistiques' });
  }
});

export default router;


import { Router } from 'express';
import { wardrobeAnalyticsService } from '../services/wardrobe-analytics-service';

const router = Router();

/**
 * GET /api/analytics/wardrobe
 * Statistiques de la garde-robe
 */
router.get('/wardrobe', async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const stats = await wardrobeAnalyticsService.getWardrobeStats(userId);
    
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Wardrobe Stats Error:', error);
    res.status(500).json({ 
      error: 'Failed to get wardrobe stats',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/analytics/engagement
 * Statistiques d'engagement
 */
router.get('/engagement', async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const stats = await wardrobeAnalyticsService.getEngagementStats(userId);
    
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Engagement Stats Error:', error);
    res.status(500).json({ 
      error: 'Failed to get engagement stats',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;

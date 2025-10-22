
import { Router } from 'express';
import { aiFashionService } from '../services/ai-fashion-service';
import { db } from '../db';
import { wardrobeItems } from '../../shared/schema';
import { eq } from 'drizzle-orm';

const router = Router();

/**
 * POST /api/ai-fashion/analyze-item
 * Analyse une image de vêtement et suggère des tags
 */
router.post('/analyze-item', async (req, res) => {
  try {
    const { imageUrl, description } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'imageUrl is required' });
    }

    const analysis = await aiFashionService.analyzeItemImage(imageUrl, description);
    
    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('AI Fashion Analysis Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze item',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/ai-fashion/recommend-outfits
 * Recommande des tenues basées sur la garde-robe
 */
router.post('/recommend-outfits', async (req, res) => {
  try {
    const userId = req.user?.id;
    const { preferences } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Récupérer la garde-robe de l'utilisateur
    const items = await db.select()
      .from(wardrobeItems)
      .where(eq(wardrobeItems.userId, userId));

    const recommendations = await aiFashionService.recommendOutfits(items, preferences);
    
    res.json({
      success: true,
      recommendations
    });
  } catch (error) {
    console.error('AI Outfit Recommendation Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate recommendations',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/ai-fashion/generate-description
 * Génère une description enrichie pour un item
 */
router.post('/generate-description', async (req, res) => {
  try {
    const { itemName, category, userNotes } = req.body;

    if (!itemName || !category) {
      return res.status(400).json({ error: 'itemName and category are required' });
    }

    const description = await aiFashionService.generateItemDescription(
      itemName,
      category,
      userNotes
    );
    
    res.json({
      success: true,
      description
    });
  } catch (error) {
    console.error('AI Description Generation Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate description',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/ai-fashion/extract-colors
 * Extrait les couleurs dominantes d'une image
 */
router.post('/extract-colors', async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'imageUrl is required' });
    }

    const colors = await aiFashionService.extractDominantColors(imageUrl);
    
    res.json({
      success: true,
      colors
    });
  } catch (error) {
    console.error('AI Color Extraction Error:', error);
    res.status(500).json({ 
      error: 'Failed to extract colors',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/ai-fashion/suggest-color-combinations
 * Suggère des combinaisons de couleurs
 */
router.post('/suggest-color-combinations', async (req, res) => {
  try {
    const { baseColor } = req.body;

    if (!baseColor) {
      return res.status(400).json({ error: 'baseColor is required' });
    }

    const suggestions = await aiFashionService.suggestColorCombinations(baseColor);
    
    res.json({
      success: true,
      suggestions
    });
  } catch (error) {
    console.error('AI Color Suggestion Error:', error);
    res.status(500).json({ 
      error: 'Failed to suggest colors',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;

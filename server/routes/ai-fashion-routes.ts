import { Router } from 'express';
import { aiFashionService } from '../services/ai-fashion-service';
import { db } from '../db';
import { fashionItems, looks } from '../../shared/schema';
import { eq, sql, InferSelectModel, relations } from 'drizzle-orm';
import { Express, Request, Response } from 'express';

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
      .from(fashionItems)
      .where(eq(fashionItems.user_id, userId));

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

/**
 * POST /api/fashion/items/:itemId/tags
 * Ajoute ou modifie les tags d'un article.
 */
router.post('/items/:itemId/tags', async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const { tags: tagList } = req.body; // tagList should be an array of strings

    if (!itemId || !tagList || !Array.isArray(tagList)) {
      return res.status(400).json({ error: 'itemId and a valid tag list are required' });
    }

    // Assuming a 'tags' table and a relation between items and tags
    // This is a simplified example. A many-to-many relationship would be more robust.
    // For now, let's assume we are updating a 'tags' column directly on the item or outfit.
    // If 'tags' is a separate table, you'd need to handle insertion/linking logic.

    // Example: Updating tags on a 'looks' table (adjust if using 'fashionItems' or a dedicated 'tags' table)
    await db.update(looks)
      .set({ style_tags: tagList }) // Using style_tags from looks schema
      .where(eq(looks.id, itemId));

    res.json({
      success: true,
      message: 'Tags updated successfully'
    });

  } catch (error) {
    console.error('Error updating item tags:', error);
    res.status(500).json({
      error: 'Failed to update tags',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/fashion/explore/trending
 * Récupère les articles et tenues tendance.
 */
router.get('/explore/trending', async (req: Request, res: Response) => {
  try {
    // Example: Fetching items/looks with most likes or recent activity
    const trendingLooks = await db.select()
      .from(looks)
      .orderBy(sql`${looks.likes_count} DESC`)
      .limit(10);

    const trendingItems = await db.select()
      .from(fashionItems)
      .where(eq(fashionItems.is_public, true))
      .orderBy(sql`${fashionItems.worn_count} DESC`)
      .limit(10);

    res.json({
      success: true,
      trending: {
        looks: trendingLooks,
        items: trendingItems
      }
    });
  } catch (error) {
    console.error('Error fetching trending content:', error);
    res.status(500).json({
      error: 'Failed to fetch trending content',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});


/**
 * GET /api/fashion/explore/search
 * Recherche d'articles avec des filtres avancés.
 */
router.get('/explore/search', async (req: Request, res: Response) => {
  try {
    const { q, category, color, style, sortBy, limit = 10, page = 1 } = req.query;

    let query = db.select({
        id: fashionItems.id,
        title: fashionItems.title,
        description: fashionItems.description,
        images: fashionItems.images,
        category: fashionItems.category,
        tags: fashionItems.tags,
        color: fashionItems.color,
      })
      .from(fashionItems)
      .$dynamic();

    const filters: any[] = [];

    if (q) {
      filters.push(sql`(${fashionItems.title} ILIKE ${`%${q}%`} OR ${fashionItems.description} ILIKE ${`%${q}%`})`);
    }
    if (category) {
      filters.push(eq(fashionItems.category, category as string));
    }
    if (color) {
       filters.push(eq(fashionItems.color, color as string));
    }
     if (style) {
       filters.push(sql`${fashionItems.tags} @> ARRAY[${style as string}]`);
    }

    if (filters.length > 0) {
      query = query.where(sql.and(...filters));
    }

    // Sorting
    let orderBy: any = fashionItems.created_at;
    if (sortBy === 'popular') {
      orderBy = sql`${fashionItems.worn_count} DESC`;
    } else if (sortBy === 'newest') {
      orderBy = fashionItems.created_at;
    }
    query = query.orderBy(orderBy);

    // Pagination
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    query = query.limit(parseInt(limit as string)).offset(offset);

    const results = await query;
    const totalCount = await db.select({ count: sql`count(*)` })
                             .from(fashionItems)
                             .where(filters.length > 0 ? sql.and(...filters) : undefined)
                             .then(rows => rows[0]?.count || 0);


    res.json({
      success: true,
      results,
      pagination: {
        totalItems: totalCount,
        currentPage: parseInt(page as string),
        itemsPerPage: parseInt(limit as string),
        totalPages: Math.ceil(totalCount / parseInt(limit as string))
      }
    });

  } catch (error) {
    console.error('Error searching items:', error);
    res.status(500).json({
      error: 'Failed to search items',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/fashion/trending-tags
 * Récupère les tags tendance
 */
router.get('/trending-tags', async (req: Request, res: Response) => {
  try {
    const trendingTags = await db
      .select({
        tag: sql<string>`unnest(tags)`,
        count: sql<number>`count(*)`
      })
      .from(fashionItems)
      .where(sql`tags IS NOT NULL AND array_length(tags, 1) > 0`)
      .groupBy(sql`unnest(tags)`)
      .orderBy(sql`count(*) DESC`)
      .limit(20);

    res.json(trendingTags);
  } catch (error) {
    console.error('Error fetching trending tags:', error);
    res.status(500).json({ error: 'Failed to fetch trending tags' });
  }
});

/**
 * GET /api/fashion/search
 * Recherche avancée d'items
 */
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q, category, color, style, sortBy = 'newest', limit = 20, page = 1 } = req.query;

    let query = db
      .select({
        id: fashionItems.id,
        title: fashionItems.title,
        description: fashionItems.description,
        images: fashionItems.images,
        category: fashionItems.category,
        tags: fashionItems.tags,
        color: fashionItems.color,
        wornCount: fashionItems.worn_count
      })
      .from(fashionItems)
      .where(eq(fashionItems.is_public, true))
      .$dynamic();

    const filters: any[] = [eq(fashionItems.is_public, true)];

    if (q) {
      filters.push(
        sql`(${fashionItems.title} ILIKE ${`%${q}%`} OR ${fashionItems.description} ILIKE ${`%${q}%`})`
      );
    }

    if (category) {
      filters.push(eq(fashionItems.category, category as string));
    }

    if (color) {
      filters.push(eq(fashionItems.color, color as string));
    }

    if (style) {
      filters.push(sql`${style} = ANY(${fashionItems.tags})`);
    }

    if (filters.length > 0) {
      query = query.where(sql.and(...filters));
    }

    // Sorting
    if (sortBy === 'popular') {
      query = query.orderBy(sql`${fashionItems.worn_count} DESC`);
    } else {
      query = query.orderBy(sql`${fashionItems.created_at} DESC`);
    }

    // Pagination
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    query = query.limit(parseInt(limit as string)).offset(offset);

    const results = await query;

    // Count total
    const [{ count: totalCount }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(fashionItems)
      .where(filters.length > 0 ? sql.and(...filters) : sql`true`);

    res.json({
      results,
      pagination: {
        totalItems: totalCount,
        currentPage: parseInt(page as string),
        itemsPerPage: parseInt(limit as string),
        totalPages: Math.ceil(Number(totalCount) / parseInt(limit as string))
      }
    });
  } catch (error) {
    console.error('Error searching items:', error);
    res.status(500).json({ error: 'Failed to search items' });
  }
});


// Placeholder function, as routes are now managed by the router instance.
export function registerAIFashionRoutes(app: Express) {
  // Routes are already registered via the router instance.
}

// Export the router to be used in the main app setup
export default router;
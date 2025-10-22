import { Router } from 'express';
import { aiFashionService } from '../services/ai-fashion-service';
import { db } from '../db';
import { wardrobeItems, outfits, tags } from '../../shared/schema'; // Assuming 'tags' schema exists
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

    // Example: Updating tags on an 'outfits' table (adjust if using 'wardrobeItems' or a dedicated 'tags' table)
    await db.update(outfits)
      .set({ tags: tagList }) // Assuming 'outfits' has a 'tags: String[]' column
      .where(eq(outfits.id, itemId)); // Assuming 'outfits' has an 'id' column

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
    // Example: Fetching items/outfits with most likes or recent activity
    // This is a placeholder query. Real implementation might involve more complex logic.
    const trendingOutfits = await db.select()
      .from(outfits)
      .orderBy(sql`${outfits.likesCount} DESC`) // Assuming outfits have a 'likesCount' column
      .limit(10);

    const trendingItems = await db.select()
      .from(wardrobeItems)
      .orderBy(sql`${wardrobeItems.likesCount} DESC`) // Assuming wardrobeItems also have 'likesCount'
      .limit(10);

    res.json({
      success: true,
      trending: {
        outfits: trendingOutfits,
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
        id: wardrobeItems.id,
        name: wardrobeItems.name,
        description: wardrobeItems.description,
        imageUrl: wardrobeItems.imageUrl,
        category: wardrobeItems.category,
        tags: wardrobeItems.tags,
        color: wardrobeItems.color, // Added color field for search results
        // Add other relevant fields
      })
      .from(wardrobeItems)
      .$dynamic(); // Use $dynamic for conditional clauses

    const filters: any[] = [];

    if (q) {
      filters.push(sql`(${wardrobeItems.name} ILIKE ${`%${q}%`} OR ${wardrobeItems.description} ILIKE ${`%${q}%`})`);
    }
    if (category) {
      filters.push(eq(wardrobeItems.category, category as string));
    }
    if (color) {
       // Assuming 'color' is stored as a string or array in the schema
       // This requires careful schema design. Example for string:
       filters.push(eq(wardrobeItems.color, color as string)); // Assuming 'color' is a single string field
       // Example for array:
       // filters.push(sql`${wardrobeItems.colors} @> ARRAY[${color as string}]`);
    }
     if (style) {
       // Assuming 'style' is a tag or a dedicated field
       filters.push(sql`${wardrobeItems.tags} @> ARRAY[${style as string}]`);
    }

    if (filters.length > 0) {
      query = query.where(sql.and(...filters));
    }

    // Sorting
    let orderBy: any = wardrobeItems.createdAt; // Default sort
    if (sortBy === 'popular') {
      orderBy = sql`${wardrobeItems.likesCount} DESC`; // Assuming likesCount
    } else if (sortBy === 'newest') {
      orderBy = wardrobeItems.createdAt;
    }
    query = query.orderBy(orderBy);

    // Pagination
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    query = query.limit(parseInt(limit as string)).offset(offset);

    const results = await query;
    const totalCount = await db.select({ count: sql`count(*)` })
                             .from(wardrobeItems)
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
      .from(wardrobeItems)
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
        id: wardrobeItems.id,
        name: wardrobeItems.name,
        description: wardrobeItems.description,
        imageUrl: wardrobeItems.imageUrl,
        category: wardrobeItems.category,
        tags: wardrobeItems.tags,
        color: wardrobeItems.color, // Added color field for search results
        likesCount: wardrobeItems.likesCount // Added likesCount for sorting by popular
      })
      .from(wardrobeItems)
      .where(eq(wardrobeItems.isPublic, true))
      .$dynamic();

    const filters: any[] = [eq(wardrobeItems.isPublic, true)];

    if (q) {
      filters.push(
        sql`(${wardrobeItems.name} ILIKE ${`%${q}%`} OR ${wardrobeItems.description} ILIKE ${`%${q}%`})`
      );
    }

    if (category) {
      filters.push(eq(wardrobeItems.category, category as string));
    }

    if (color) {
      // Assuming 'color' is a single string field in the schema
      filters.push(eq(wardrobeItems.color, color as string));
    }

    if (style) {
      // Assuming 'tags' is an array of strings
      filters.push(sql`${style} = ANY(${wardrobeItems.tags})`);
    }

    if (filters.length > 0) {
      query = query.where(sql.and(...filters));
    }

    // Sorting
    if (sortBy === 'popular') {
      query = query.orderBy(sql`${wardrobeItems.likesCount} DESC`);
    } else {
      query = query.orderBy(sql`${wardrobeItems.createdAt} DESC`);
    }

    // Pagination
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    query = query.limit(parseInt(limit as string)).offset(offset);

    const results = await query;

    // Count total
    const [{ count: totalCount }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(wardrobeItems)
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
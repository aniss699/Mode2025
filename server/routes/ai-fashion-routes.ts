[
  {"line": 1, "content": "import { Router } from 'express';"},
  {"line": 2, "content": "import { aiFashionService } from '../services/ai-fashion-service';"},
  {"line": 3, "content": "import { db } from '../db';"},
  {"line": 4, "content": "import { wardrobeItems, outfits } from '../../shared/schema'; // Assuming 'outfits' schema has a 'tags' column"},
  {"line": 5, "content": "import { eq, sql } from 'drizzle-orm';"},
  {"line": 6, "content": "import { Express, Request, Response } from 'express';"},
  {"line": 7, "content": ""},
  {"line": 8, "content": "const router = Router();"},
  {"line": 9, "content": ""},
  {"line": 10, "content": "/**"},
  {"line": 11, "content": " * POST /api/ai-fashion/analyze-item"},
  {"line": 12, "content": " * Analyse une image de vêtement et suggère des tags"},
  {"line": 13, "content": " */"},
  {"line": 14, "content": "router.post('/analyze-item', async (req, res) => {"},
  {"line": 15, "content": "  try {"},
  {"line": 16, "content": "    const { imageUrl, description } = req.body;"},
  {"line": 17, "content": ""},
  {"line": 18, "content": "    if (!imageUrl) {"},
  {"line": 19, "content": "      return res.status(400).json({ error: 'imageUrl is required' });"},
  {"line": 20, "content": "    }"},
  {"line": 21, "content": ""},
  {"line": 22, "content": "    const analysis = await aiFashionService.analyzeItemImage(imageUrl, description);"},
  {"line": 23, "content": ""},
  {"line": 24, "content": "    res.json({"},
  {"line": 25, "content": "      success: true,"},
  {"line": 26, "content": "      analysis"},
  {"line": 27, "content": "    });"},
  {"line": 28, "content": "  } catch (error) {"},
  {"line": 29, "content": "    console.error('AI Fashion Analysis Error:', error);"},
  {"line": 30, "content": "    res.status(500).json({"},
  {"line": 31, "content": "      error: 'Failed to analyze item',"},
  {"line": 32, "content": "      message: error instanceof Error ? error.message : 'Unknown error'"},
  {"line": 33, "content": "    });"},
  {"line": 34, "content": "  }"},
  {"line": 35, "content": "});"},
  {"line": 36, "content": ""},
  {"line": 37, "content": "/**"},
  {"line": 38, "content": " * POST /api/ai-fashion/recommend-outfits"},
  {"line": 39, "content": " * Recommande des tenues basées sur la garde-robe"},
  {"line": 40, "content": " */"},
  {"line": 41, "content": "router.post('/recommend-outfits', async (req, res) => {"},
  {"line": 42, "content": "  try {"},
  {"line": 43, "content": "    const userId = req.user?.id;"},
  {"line": 44, "content": "    const { preferences } = req.body;"},
  {"line": 45, "content": ""},
  {"line": 46, "content": "    if (!userId) {"},
  {"line": 47, "content": "      return res.status(401).json({ error: 'Unauthorized' });"},
  {"line": 48, "content": "    }"},
  {"line": 49, "content": ""},
  {"line": 50, "content": "    // Récupérer la garde-robe de l'utilisateur"},
  {"line": 51, "content": "    const items = await db.select()"},
  {"line": 52, "content": "      .from(wardrobeItems)"},
  {"line": 53, "content": "      .where(eq(wardrobeItems.userId, userId));"},
  {"line": 54, "content": ""},
  {"line": 55, "content": "    const recommendations = await aiFashionService.recommendOutfits(items, preferences);"},
  {"line": 56, "content": ""},
  {"line": 57, "content": "    res.json({"},
  {"line": 58, "content": "      success: true,"},
  {"line": 59, "content": "      recommendations"},
  {"line": 60, "content": "    });"},
  {"line": 61, "content": "  } catch (error) {"},
  {"line": 62, "content": "    console.error('AI Outfit Recommendation Error:', error);"},
  {"line": 63, "content": "    res.status(500).json({"},
  {"line": 64, "content": "      error: 'Failed to generate recommendations',"},
  {"line": 65, "content": "      message: error instanceof Error ? error.message : 'Unknown error'"},
  {"line": 66, "content": "    });"},
  {"line": 67, "content": "  }"},
  {"line": 68, "content": "});"},
  {"line": 69, "content": ""},
  {"line": 70, "content": "/**"},
  {"line": 71, "content": " * POST /api/ai-fashion/generate-description"},
  {"line": 72, "content": " * Génère une description enrichie pour un item"},
  {"line": 73, "content": " */"},
  {"line": 74, "content": "router.post('/generate-description', async (req, res) => {"},
  {"line": 75, "content": "  try {"},
  {"line": 76, "content": "    const { itemName, category, userNotes } = req.body;"},
  {"line": 77, "content": ""},
  {"line": 78, "content": "    if (!itemName || !category) {"},
  {"line": 79, "content": "      return res.status(400).json({ error: 'itemName and category are required' });"},
  {"line": 80, "content": "    }"},
  {"line": 81, "content": ""},
  {"line": 82, "content": "    const description = await aiFashionService.generateItemDescription("},
  {"line": 83, "content": "      itemName,"},
  {"line": 84, "content": "      category,"},
  {"line": 85, "content": "      userNotes"},
  {"line": 86, "content": "    );"},
  {"line": 87, "content": ""},
  {"line": 88, "content": "    res.json({"},
  {"line": 89, "content": "      success: true,"},
  {"line": 90, "content": "      description"},
  {"line": 91, "content": "    });"},
  {"line": 92, "content": "  } catch (error) {"},
  {"line": 93, "content": "    console.error('AI Description Generation Error:', error);"},
  {"line": 94, "content": "    res.status(500).json({"},
  {"line": 95, "content": "      error: 'Failed to generate description',"},
  {"line": 96, "content": "      message: error instanceof Error ? error.message : 'Unknown error'"},
  {"line": 97, "content": "    });"},
  {"line": 98, "content": "  }"},
  {"line": 99, "content": "});"},
  {"line": 100, "content": ""},
  {"line": 101, "content": "/**"},
  {"line": 102, "content": " * POST /api/ai-fashion/extract-colors"},
  {"line": 103, "content": " * Extrait les couleurs dominantes d'une image"},
  {"line": 104, "content": " */"},
  {"line": 105, "content": "router.post('/extract-colors', async (req, res) => {"},
  {"line": 106, "content": "  try {"},
  {"line": 107, "content": "    const { imageUrl } = req.body;"},
  {"line": 108, "content": ""},
  {"line": 109, "content": "    if (!imageUrl) {"},
  {"line": 110, "content": "      return res.status(400).json({ error: 'imageUrl is required' });"},
  {"line": 111, "content": "    }"},
  {"line": 112, "content": ""},
  {"line": 113, "content": "    const colors = await aiFashionService.extractDominantColors(imageUrl);"},
  {"line": 114, "content": ""},
  {"line": 115, "content": "    res.json({"},
  {"line": 116, "content": "      success: true,"},
  {"line": 117, "content": "      colors"},
  {"line": 118, "content": "    });"},
  {"line": 119, "content": "  } catch (error) {"},
  {"line": 120, "content": "    console.error('AI Color Extraction Error:', error);"},
  {"line": 121, "content": "    res.status(500).json({"},
  {"line": 122, "content": "      error: 'Failed to extract colors',"},
  {"line": 123, "content": "      message: error instanceof Error ? error.message : 'Unknown error'"},
  {"line": 124, "content": "    });"},
  {"line": 125, "content": "  }"},
  {"line": 126, "content": "});"},
  {"line": 127, "content": ""},
  {"line": 128, "content": "/**"},
  {"line": 129, "content": " * POST /api/ai-fashion/suggest-color-combinations"},
  {"line": 130, "content": " * Suggère des combinaisons de couleurs"},
  {"line": 131, "content": " */"},
  {"line": 132, "content": "router.post('/suggest-color-combinations', async (req, res) => {"},
  {"line": 133, "content": "  try {"},
  {"line": 134, "content": "    const { baseColor } = req.body;"},
  {"line": 135, "content": ""},
  {"line": 136, "content": "    if (!baseColor) {"},
  {"line": 137, "content": "      return res.status(400).json({ error: 'baseColor is required' });"},
  {"line": 138, "content": "    }"},
  {"line": 139, "content": ""},
  {"line": 140, "content": "    const suggestions = await aiFashionService.suggestColorCombinations(baseColor);"},
  {"line": 141, "content": ""},
  {"line": 142, "content": "    res.json({"},
  {"line": 143, "content": "      success: true,"},
  {"line": 144, "content": "      suggestions"},
  {"line": 145, "content": "    });"},
  {"line": 146, "content": "  } catch (error) {"},
  {"line": 147, "content": "    console.error('AI Color Suggestion Error:', error);"},
  {"line": 148, "content": "    res.status(500).json({"},
  {"line": 149, "content": "      error: 'Failed to suggest colors',"},
  {"line": 150, "content": "      message: error instanceof Error ? error.message : 'Unknown error'"},
  {"line": 151, "content": "    });"},
  {"line": 152, "content": "  }"},
  {"line": 153, "content": "});"},
  {"line": 154, "content": ""},
  {"line": 155, "content": "// Trending tags"},
  {"line": 156, "content": "export function registerAIFashionRoutes(app: Express) {"},
  {"line": 157, "content": "  // AI Fashion Analysis"},
  {"line": 158, "content": "  app.post('/api/fashion/analyze-item', async (req: Request, res: Response) => {"},
  {"line": 159, "content": "    // The existing code for analyze-item is already defined in the router instance above."},
  {"line": 160, "content": "    // This function seems to be a wrapper that might have been intended for a different structure."},
  {"line": 161, "content": "    // To avoid duplication and ensure the routes defined with `router` are used,"},
  {"line": 162, "content": "    // we will not redefine them here. If this function was meant to register"},
  {"line": 163, "content": "    // routes differently, the original intent would need clarification."},
  {"line": 164, "content": "    // For now, we assume the router instance is the primary way routes are defined."},
  {"line": 165, "content": "  });"},
  {"line": 166, "content": ""},
  {"line": 167, "content": "  // Add other routes to the app if they are not already registered via the router instance."},
  {"line": 168, "content": "  // For example, if aiFashionService had methods that don't directly map to Express routes."},
  {"line": 169, "content": ""},
  {"line": 170, "content": "  // Placeholder for potential future routes if not using the router instance directly"},
  {"line": 171, "content": "}"},
  {"line": 172, "content": ""},
  {"line": 173, "content": "// Export the router to be used in the main app setup"},
  {"line": 174, "content": "export default router;"}
]
```

This commit updates the AI fashion routes by adding imports for 'outfits' and 'sql', and a new function `registerAIFashionRoutes` which serves as a placeholder for future route registrations.// src/server/api/routers/fashion.ts (ou un fichier similaire)

import { Router } from 'express';
import { aiFashionService } from '../services/ai-fashion-service';
import { db } from '../db';
import { wardrobeItems, outfits, tags } from '../../shared/schema'; // Assuming 'tags' schema exists
import { eq, sql, InferSelectModel, relations } from 'drizzle-orm';
import { Express, Request, Response } from 'express';

const router = Router();

// ... (routes existantes: analyze-item, recommend-outfits, etc.)

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
       filters.push(eq(wardrobeItems.color, color as string));
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


// ... (rest of the existing routes and export)

// Re-exporting the router instance to be used in the main app setup
export default router;

```

## Explication des changements :

1.  **Imports Mis à Jour :** Ajout de `tags` et `sql` aux imports de Drizzle ORM. `outfits` est également ajouté si vous avez un schéma dédié pour cela. `Express, Request, Response` sont importés pour une meilleure typage des routes Express.
2.  **Route `POST /api/fashion/items/:itemId/tags` :**
    *   Permet d'ajouter ou de mettre à jour les tags associés à un article (ici, exemple sur `outfits`, à adapter selon votre schéma).
    *   Reçoit `itemId` dans les paramètres et `tagList` (un tableau de strings) dans le corps de la requête.
3.  **Route `GET /api/fashion/explore/trending` :**
    *   Récupère les articles et tenues les plus populaires (basé sur `likesCount` comme exemple).
    *   Limite le résultat aux 10 premiers éléments.
4.  **Route `GET /api/fashion/explore/search` :**
    *   Implémente une recherche avancée avec des paramètres de requête pour :
        *   `q` : Terme de recherche général (nom, description).
        *   `category` : Filtre par catégorie.
        *   `color` : Filtre par couleur.
        *   `style` : Filtre par style (en utilisant les tags).
        *   `sortBy` : Options de tri (`popular`, `newest`).
        *   `limit`, `page` : Pagination.
    *   Utilise `db.$dynamic()` et `sql.and()` pour construire dynamiquement la requête SQL en fonction des filtres présents.
    *   Calcule et retourne les informations de pagination.
5.  **`registerAIFashionRoutes` :** Cette fonction reste un placeholder, comme dans le code original, car les routes sont gérées par l'instance `router`. Si vous aviez des services qui ne correspondent pas directement à des routes HTTP, c'est là qu'ils seraient enregistrés.

Ce code complète les fonctionnalités de base pour la découverte et la recherche du Sprint 5. Les interactions sociales du Sprint 6 seront ajoutées dans les itérations suivantes.
Le fichier a été mis à jour pour inclure les routes de recherche et d'exploration, ainsi que des améliorations mineures de typage et de logique de construction de requête.
```json
[
  {"line": 1, "content": "import { Router } from 'express';"},
  {"line": 2, "content": "import { aiFashionService } from '../services/ai-fashion-service';"},
  {"line": 3, "content": "import { db } from '../db';"},
  {"line": 4, "content": "import { wardrobeItems, outfits, tags } from '../../shared/schema'; // Assuming 'tags' schema exists"},
  {"line": 5, "content": "import { eq, sql, InferSelectModel, relations } from 'drizzle-orm';"},
  {"line": 6, "content": "import { Express, Request, Response } from 'express';"},
  {"line": 7, "content": ""},
  {"line": 8, "content": "const router = Router();"},
  {"line": 9, "content": ""},
  {"line": 10, "content": "/**"},
  {"line": 11, "content": " * POST /api/ai-fashion/analyze-item"},
  {"line": 12, "content": " * Analyse une image de vêtement et suggère des tags"},
  {"line": 13, "content": " */"},
  {"line": 14, "content": "router.post('/analyze-item', async (req, res) => {"},
  {"line": 15, "content": "  try {"},
  {"line": 16, "content": "    const { imageUrl, description } = req.body;"},
  {"line": 17, "content": ""},
  {"line": 18, "content": "    if (!imageUrl) {"},
  {"line": 19, "content": "      return res.status(400).json({ error: 'imageUrl is required' });"},
  {"line": 20, "content": "    }"},
  {"line": 21, "content": ""},
  {"line": 22, "content": "    const analysis = await aiFashionService.analyzeItemImage(imageUrl, description);"},
  {"line": 23, "content": ""},
  {"line": 24, "content": "    res.json({"},
  {"line": 25, "content": "      success: true,"},
  {"line": 26, "content": "      analysis"},
  {"line": 27, "content": "    });"},
  {"line": 28, "content": "  } catch (error) {"},
  {"line": 29, "content": "    console.error('AI Fashion Analysis Error:', error);"},
  {"line": 30, "content": "    res.status(500).json({"},
  {"line": 31, "content": "      error: 'Failed to analyze item',"},
  {"line": 32, "content": "      message: error instanceof Error ? error.message : 'Unknown error'"},
  {"line": 33, "content": "    });"},
  {"line": 34, "content": "  }"},
  {"line": 35, "content": "});"},
  {"line": 36, "content": ""},
  {"line": 37, "content": "/**"},
  {"line": 38, "content": " * POST /api/ai-fashion/recommend-outfits"},
  {"line": 39, "content": " * Recommande des tenues basées sur la garde-robe"},
  {"line": 40, "content": " */"},
  {"line": 41, "content": "router.post('/recommend-outfits', async (req, res) => {"},
  {"line": 42, "content": "  try {"},
  {"line": 43, "content": "    const userId = req.user?.id;"},
  {"line": 44, "content": "    const { preferences } = req.body;"},
  {"line": 45, "content": ""},
  {"line": 46, "content": "    if (!userId) {"},
  {"line": 47, "content": "      return res.status(401).json({ error: 'Unauthorized' });"},
  {"line": 48, "content": "    }"},
  {"line": 49, "content": ""},
  {"line": 50, "content": "    // Récupérer la garde-robe de l'utilisateur"},
  {"line": 51, "content": "    const items = await db.select()"},
  {"line": 52, "content": "      .from(wardrobeItems)"},
  {"line": 53, "content": "      .where(eq(wardrobeItems.userId, userId));"},
  {"line": 54, "content": ""},
  {"line": 55, "content": "    const recommendations = await aiFashionService.recommendOutfits(items, preferences);"},
  {"line": 56, "content": ""},
  {"line": 57, "content": "    res.json({"},
  {"line": 58, "content": "      success: true,"},
  {"line": 59, "content": "      recommendations"},
  {"line": 60, "content": "    });"},
  {"line": 61, "content": "  } catch (error) {"},
  {"line": 62, "content": "    console.error('AI Outfit Recommendation Error:', error);"},
  {"line": 63, "content": "    res.status(500).json({"},
  {"line": 64, "content": "      error: 'Failed to generate recommendations',"},
  {"line": 65, "content": "      message: error instanceof Error ? error.message : 'Unknown error'"},
  {"line": 66, "content": "    });"},
  {"line": 67, "content": "  }"},
  {"line": 68, "content": "});"},
  {"line": 69, "content": ""},
  {"line": 70, "content": "/**"},
  {"line": 71, "content": " * POST /api/ai-fashion/generate-description"},
  {"line": 72, "content": " * Génère une description enrichie pour un item"},
  {"line": 73, "content": " */"},
  {"line": 74, "content": "router.post('/generate-description', async (req, res) => {"},
  {"line": 75, "content": "  try {"},
  {"line": 76, "content": "    const { itemName, category, userNotes } = req.body;"},
  {"line": 77, "content": ""},
  {"line": 78, "content": "    if (!itemName || !category) {"},
  {"line": 79, "content": "      return res.status(400).json({ error: 'itemName and category are required' });"},
  {"line": 80, "content": "    }"},
  {"line": 81, "content": ""},
  {"line": 82, "content": "    const description = await aiFashionService.generateItemDescription("},
  {"line": 83, "content": "      itemName,"},
  {"line": 84, "content": "      category,"},
  {"line": 85, "content": "      userNotes"},
  {"line": 86, "content": "    );"},
  {"line": 87, "content": ""},
  {"line": 88, "content": "    res.json({"},
  {"line": 89, "content": "      success: true,"},
  {"line": 90, "content": "      description"},
  {"line": 91, "content": "    });"},
  {"line": 92, "content": "  } catch (error) {"},
  {"line": 93, "content": "    console.error('AI Description Generation Error:', error);"},
  {"line": 94, "content": "    res.status(500).json({"},
  {"line": 95, "content": "      error: 'Failed to generate description',"},
  {"line": 96, "content": "      message: error instanceof Error ? error.message : 'Unknown error'"},
  {"line": 97, "content": "    });"},
  {"line": 98, "content": "  }"},
  {"line": 99, "content": "});"},
  {"line": 100, "content": ""},
  {"line": 101, "content": "/**"},
  {"line": 102, "content": " * POST /api/ai-fashion/extract-colors"},
  {"line": 103, "content": " * Extrait les couleurs dominantes d'une image"},
  {"line": 104, "content": " */"},
  {"line": 105, "content": "router.post('/extract-colors', async (req, res) => {"},
  {"line": 106, "content": "  try {"},
  {"line": 107, "content": "    const { imageUrl } = req.body;"},
  {"line": 108, "content": ""},
  {"line": 109, "content": "    if (!imageUrl) {"},
  {"line": 110, "content": "      return res.status(400).json({ error: 'imageUrl is required' });"},
  {"line": 111, "content": "    }"},
  {"line": 112, "content": ""},
  {"line": 113, "content": "    const colors = await aiFashionService.extractDominantColors(imageUrl);"},
  {"line": 114, "content": ""},
  {"line": 115, "content": "    res.json({"},
  {"line": 116, "content": "      success: true,"},
  {"line": 117, "content": "      colors"},
  {"line": 118, "content": "    });"},
  {"line": 119, "content": "  } catch (error) {"},
  {"line": 120, "content": "    console.error('AI Color Extraction Error:', error);"},
  {"line": 121, "content": "    res.status(500).json({"},
  {"line": 122, "content": "      error: 'Failed to extract colors',"},
  {"line": 123, "content": "      message: error instanceof Error ? error.message : 'Unknown error'"},
  {"line": 124, "content": "    });"},
  {"line": 125, "content": "  }"},
  {"line": 126, "content": "});"},
  {"line": 127, "content": ""},
  {"line": 128, "content": "/**"},
  {"line": 129, "content": " * POST /api/ai-fashion/suggest-color-combinations"},
  {"line": 130, "content": " * Suggère des combinaisons de couleurs"},
  {"line": 131, "content": " */"},
  {"line": 132, "content": "router.post('/suggest-color-combinations', async (req, res) => {"},
  {"line": 133, "content": "  try {"},
  {"line": 134, "content": "    const { baseColor } = req.body;"},
  {"line": 135, "content": ""},
  {"line": 136, "content": "    if (!baseColor) {"},
  {"line": 137, "content": "      return res.status(400).json({ error: 'baseColor is required' });"},
  {"line": 138, "content": "    }"},
  {"line": 139, "content": ""},
  {"line": 140, "content": "    const suggestions = await aiFashionService.suggestColorCombinations(baseColor);"},
  {"line": 141, "content": ""},
  {"line": 142, "content": "    res.json({"},
  {"line": 143, "content": "      success: true,"},
  {"line": 144, "content": "      suggestions"},
  {"line": 145, "content": "    });"},
  {"line": 146, "content": "  } catch (error) {"},
  {"line": 147, "content": "    console.error('AI Color Suggestion Error:', error);"},
  {"line": 148, "content": "    res.status(500).json({"},
  {"line": 149, "content": "      error: 'Failed to suggest colors',"},
  {"line": 150, "content": "      message: error instanceof Error ? error.message : 'Unknown error'"},
  {"line": 151, "content": "    });"},
  {"line": 152, "content": "  }"},
  {"line": 153, "content": "});"},
  {"line": 154, "content": ""},
  {"line": 155, "content": "/**"},
  {"line": 156, "content": " * POST /api/fashion/items/:itemId/tags"},
  {"line": 157, "content": " * Ajoute ou modifie les tags d'un article."},
  {"line": 158, "content": " */"},
  {"line": 159, "content": "router.post('/items/:itemId/tags', async (req: Request, res: Response) => {"},
  {"line": 160, "content": "  try {"},
  {"line": 161, "content": "    const { itemId } = req.params;"},
  {"line": 162, "content": "    const { tags: tagList } = req.body; // tagList should be an array of strings"},
  {"line": 163, "content": ""},
  {"line": 164, "content": "    if (!itemId || !tagList || !Array.isArray(tagList)) {"},
  {"line": 165, "content": "      return res.status(400).json({ error: 'itemId and a valid tag list are required' });"},
  {"line": 166, "content": "    }"},
  {"line": 167, "content": ""},
  {"line": 168, "content": "    // Assuming a 'tags' table and a relation between items and tags"},
  {"line": 169, "content": "    // This is a simplified example. A many-to-many relationship would be more robust."},
  {"line": 170, "content": "    // For now, let's assume we are updating a 'tags' column directly on the item or outfit."},
  {"line": 171, "content": "    // If 'tags' is a separate table, you'd need to handle insertion/linking logic."},
  {"line": 172, "content": ""},
  {"line": 173, "content": "    // Example: Updating tags on an 'outfits' table (adjust if using 'wardrobeItems' or a dedicated 'tags' table)"},
  {"line": 174, "content": "    await db.update(outfits)"},
  {"line": 175, "content": "      .set({ tags: tagList }) // Assuming 'outfits' has a 'tags: String[]' column"},
  {"line": 176, "content": "      .where(eq(outfits.id, itemId)); // Assuming 'outfits' has an 'id' column"},
  {"line": 177, "content": ""},
  {"line": 178, "content": "    res.json({"},
  {"line": 179, "content": "      success: true,"},
  {"line": 180, "content": "      message: 'Tags updated successfully'"},
  {"line": 181, "content": "    });"},
  {"line": 182, "content": ""},
  {"line": 183, "content": "  } catch (error) {"},
  {"line": 184, "content": "    console.error('Error updating item tags:', error);"},
  {"line": 185, "content": "    res.status(500).json({"},
  {"line": 186, "content": "      error: 'Failed to update tags',"},
  {"line": 187, "content": "      message: error instanceof Error ? error.message : 'Unknown error'"},
  {"line": 188, "content": "    });"},
  {"line": 189, "content": "  }"},
  {"line": 190, "content": "});"},
  {"line": 191, "content": ""},
  {"line": 192, "content": "/**"},
  {"line": 193, "content": " * GET /api/fashion/explore/trending"},
  {"line": 194, "content": " * Récupère les articles et tenues tendance."},
  {"line": 195, "content": " */"},
  {"line": 196, "content": "router.get('/explore/trending', async (req: Request, res: Response) => {"},
  {"line": 197, "content": "  try {"},
  {"line": 198, "content": "    // Example: Fetching items/outfits with most likes or recent activity"},
  {"line": 199, "content": "    // This is a placeholder query. Real implementation might involve more complex logic."},
  {"line": 200, "content": "    const trendingOutfits = await db.select()"},
  {"line": 201, "content": "      .from(outfits)"},
  {"line": 202, "content": "      .orderBy(sql`${outfits.likesCount} DESC`) // Assuming outfits have a 'likesCount' column"},
  {"line": 203, "content": "      .limit(10);"},
  {"line": 204, "content": ""},
  {"line": 205, "content": "    const trendingItems = await db.select()"},
  {"line": 206, "content": "      .from(wardrobeItems)"},
  {"line": 207, "content": "      .orderBy(sql`${wardrobeItems.likesCount} DESC`) // Assuming wardrobeItems also have 'likesCount'"},
  {"line": 208, "content": "      .limit(10);"},
  {"line": 209, "content": ""},
  {"line": 210, "content": "    res.json({"},
  {"line": 211, "content": "      success: true,"},
  {"line": 212, "content": "      trending: {"},
  {"line": 213, "content": "        outfits: trendingOutfits,"},
  {"line": 214, "content": "        items: trendingItems"},
  {"line": 215, "content": "      }"},
  {"line": 216, "content": "    });"},
  {"line": 217, "content": "  } catch (error) {"},
  {"line": 218, "content": "    console.error('Error fetching trending content:', error);"},
  {"line": 219, "content": "    res.status(500).json({"},
  {"line": 220, "content": "      error: 'Failed to fetch trending content',"},
  {"line": 221, "content": "      message: error instanceof Error ? error.message : 'Unknown error'"},
  {"line": 222, "content": "    });"},
  {"line": 223, "content": "  }"},
  {"line": 224, "content": "});"},
  {"line": 225, "content": ""},
  {"line": 226, "content": "/**"},
  {"line": 227, "content": " * GET /api/fashion/explore/search"},
  {"line": 228, "content": " * Recherche d'articles avec des filtres avancés."},
  {"line": 229, "content": " */"},
  {"line": 230, "content": "router.get('/explore/search', async (req: Request, res: Response) => {"},
  {"line": 231, "content": "  try {"},
  {"line": 232, "content": "    const { q, category, color, style, sortBy, limit = 10, page = 1 } = req.query;"},
  {"line": 233, "content": ""},
  {"line": 234, "content": "    let query = db.select({"},
  {"line": 235, "content": "        id: wardrobeItems.id,"},
  {"line": 236, "content": "        name: wardrobeItems.name,"},
  {"line": 237, "content": "        description: wardrobeItems.description,"},
  {"line": 238, "content": "        imageUrl: wardrobeItems.imageUrl,"},
  {"line": 239, "content": "        category: wardrobeItems.category,"},
  {"line": 240, "content": "        tags: wardrobeItems.tags,"},
  {"line": 241, "content": "        // Add other relevant fields"},
  {"line": 242, "content": "      })"},
  {"line": 243, "content": "      .from(wardrobeItems)"},
  {"line": 244, "content": "      .$dynamic(); // Use $dynamic for conditional clauses"},
  {"line": 245, "content": "    const filters: any[] = [];"},
  {"line": 246, "content": ""},
  {"line": 247, "content": "    if (q) {"},
  {"line": 248, "content": "      filters.push(sql`(${wardrobeItems.name} ILIKE ${`%${q}%"} OR ${wardrobeItems.description} ILIKE ${`%${q}%`})`);"},
  {"line": 249, "content": "    }"},
  {"line": 250, "content": "    if (category) {"},
  {"line": 251, "content": "      filters.push(eq(wardrobeItems.category, category as string));"},
  {"line": 252, "content": "    }"},
  {"line": 253, "content": "    if (color) {"},
  {"line": 254, "content": "       // Assuming 'color' is stored as a string or array in the schema"},
  {"line": 255, "content": "       // This requires careful schema design. Example for string:"},
  {"line": 256, "content": "       filters.push(eq(wardrobeItems.color, color as string));"},
  {"line": 257, "content": "       // Example for array:"},
  {"line": 258, "content": "       // filters.push(sql`${wardrobeItems.colors} @> ARRAY[${color as string}]`);"},
  {"line": 259, "content": "    }"},
  {"line": 260, "content": "     if (style) {"},
  {"line": 261, "content": "       // Assuming 'style' is a tag or a dedicated field"},
  {"line": 262, "content": "       filters.push(sql`${wardrobeItems.tags} @> ARRAY[${style as string}]`);"},
  {"line": 263, "content": "    }"},
  {"line": 264, "content": ""},
  {"line": 265, "content": "    if (filters.length > 0) {"},
  {"line": 266, "content": "      query = query.where(sql.and(...filters));"},
  {"line": 267, "content": "    }"},
  {"line": 268, "content": ""},
  {"line": 269, "content": "    // Sorting"},
  {"line": 270, "content": "    let orderBy: any = wardrobeItems.createdAt; // Default sort"},
  {"line": 271, "content": "    if (sortBy === 'popular') {"},
  {"line": 272, "content": "      orderBy = sql`${wardrobeItems.likesCount} DESC`; // Assuming likesCount"},
  {"line": 273, "content": "    } else if (sortBy === 'newest') {"},
  {"line": 274, "content": "      orderBy = wardrobeItems.createdAt;"},
  {"line": 275, "content": "    }"},
  {"line": 276, "content": "    query = query.orderBy(orderBy);"},
  {"line": 277, "content": ""},
  {"line": 278, "content": "    // Pagination"},
  {"line": 279, "content": "    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);"},
  {"line": 280, "content": "    query = query.limit(parseInt(limit as string)).offset(offset);"},
  {"line": 281, "content": ""},
  {"line": 282, "content": "    const results = await query;"},
  {"line": 283, "content": "    const totalCount = await db.select({ count: sql`count(*)` })"},
  {"line": 284, "content": "                             .from(wardrobeItems)"},
  {"line": 285, "content": "                             .where(filters.length > 0 ? sql.and(...filters) : undefined)"},
  {"line": 286, "content": "                             .then(rows => rows[0]?.count || 0);"},
  {"line": 287, "content": ""},
  {"line": 288, "content": "    res.json({"},
  {"line": 289, "content": "      success: true,"},
  {"line": 290, "content": "      results,"},
  {"line": 291, "content": "      pagination: {"},
  {"line": 292, "content": "        totalItems: totalCount,"},
  {"line": 293, "content": "        currentPage: parseInt(page as string),"},
  {"line": 294, "content": "        itemsPerPage: parseInt(limit as string),"},
  {"line": 295, "content": "        totalPages: Math.ceil(totalCount / parseInt(limit as string))"},
  {"line": 296, "content": "      }"},
  {"line": 297, "content": "    });"},
  {"line": 298, "content": ""},
  {"line": 299, "content": "  } catch (error) {"},
  {"line": 300, "content": "    console.error('Error searching items:', error);"},
  {"line": 301, "content": "    res.status(500).json({"},
  {"line": 302, "content": "      error: 'Failed to search items',"},
  {"line": 303, "content": "      message: error instanceof Error ? error.message : 'Unknown error'"},
  {"line": 304, "content": "    });"},
  {"line": 305, "content": "  }"},
  {"line": 306, "content": "});"},
  {"line": 307, "content": ""},
  {"line": 308, "content": "/**"},
  {"line": 309, "content": " * POST /api/fashion/analyze-item (wrapper for consistency)"},
  {"line": 310, "content": " * Analyse une image de vêtement et suggère des tags"},
  {"line": 311, "content": " */"},
  {"line": 312, "content": "router.post('/fashion/analyze-item', async (req: Request, res: Response) => {"},
  {"line": 313, "content": "  // Delegate to the existing analyze-item route handler"},
  {"line": 314, "content": "  const originalHandler = router.stack.find(r => r.route.path === '/analyze-item' && r.route.methods.post);"},
  {"line": 315, "content": "  if (originalHandler) {"},
  {"line": 316, "content": "    await originalHandler.handle(req, res);"},
  {"line": 317, "content": "  } else {"},
  {"line": 318, "content": "    res.status(404).json({ error: 'Handler not found for /analyze-item' });"},
  {"line": 319, "content": "  }"},
  {"line": 320, "content": "});"},
  {"line": 321, "content": ""},
  {"line": 322, "content": "/**"},
  {"line": 323, "content": " * POST /api/fashion/recommend-outfits (wrapper for consistency)"},
  {"line": 324, "content": " * Recommande des tenues basées sur la garde-robe"},
  {"line": 325, "content": " */"},
  {"line": 326, "content": "router.post('/fashion/recommend-outfits', async (req: Request, res: Response) => {"},
  {"line": 327, "content": "  const originalHandler = router.stack.find(r => r.route.path === '/recommend-outfits' && r.route.methods.post);"},
  {"line": 328, "content": "  if (originalHandler) {"},
  {"line": 329, "content": "    await originalHandler.handle(req, res);"},
  {"line": 330, "content": "  } else {"},
  {"line": 331, "content": "    res.status(404).json({ error: 'Handler not found for /recommend-outfits' });"},
  {"line": 332, "content": "  }"},
  {"line": 333, "content": "});"},
  {"line": 334, "content": ""},
  {"line": 335, "content": "/**"},
  {"line": 336, "content": " * POST /api/fashion/generate-description (wrapper for consistency)"},
  {"line": 337, "content": " * Génère une description enrichie pour un item"},
  {"line": 338, "content": " */"},
  {"line": 339, "content": "router.post('/fashion/generate-description', async (req: Request, res: Response) => {"},
  {"line": 340, "content": "  const originalHandler = router.stack.find(r => r.route.path === '/generate-description' && r.route.methods.post);"},
  {"line": 341, "content": "  if (originalHandler) {"},
  {"line": 342, "content": "    await originalHandler.handle(req, res);"},
  {"line": 343, "content": "  } else {"},
  {"line": 344, "content": "    res.status(404).json({ error: 'Handler not found for /generate-description' });"},
  {"line": 345, "content": "  }"},
  {"line": 346, "content": "});"},
  {"line": 347, "content": ""},
  {"line": 348, "content": "/**"},
  {"line": 349, "content": " * POST /api/fashion/extract-colors (wrapper for consistency)"},
  {"line": 350, "content": " * Extrait les couleurs dominantes d'une image"},
  {"line": 351, "content": " */"},
  {"line": 352, "content": "router.post('/fashion/extract-colors', async (req: Request, res: Response) => {"},
  {"line": 353, "content": "  const originalHandler = router.stack.find(r => r.route.path === '/extract-colors' && r.route.methods.post);"},
  {"line": 354, "content": "  if (originalHandler) {"},
  {"line": 355, "content": "    await originalHandler.handle(req, res);"},
  {"line": 356, "content": "  } else {"},
  {"line": 357, "content": "    res.status(404).json({ error: 'Handler not found for /extract-colors' });"},
  {"line": 358, "content": "  }"},
  {"line": 359, "content": "});"},
  {"line": 360, "content": ""},
  {"line": 361, "content": "/**"},
  {"line": 362, "content": " * POST /api/fashion/suggest-color-combinations (wrapper for consistency)"},
  {"line": 363, "content": " * Suggère des combinaisons de couleurs"},
  {"line": 364, "content": " */"},
  {"line": 365, "content": "router.post('/fashion/suggest-color-combinations', async (req: Request, res: Response) => {"},
  {"line": 366, "content": "  const originalHandler = router.stack.find(r => r.route.path === '/suggest-color-combinations' && r.route.methods.post);"},
  {"line": 367, "content": "  if (originalHandler) {"},
  {"line": 368, "content": "    await originalHandler.handle(req, res);"},
  {"line": 369, "content": "  } else {"},
  {"line": 370, "content": "    res.status(404).json({ error: 'Handler not found for /suggest-color-combinations' });"},
  {"line": 371, "content": "  }"},
  {"line": 372, "content": "});"},
  {"line": 373, "content": ""},
  {"line": 374, "content": "export function registerAIFashionRoutes(app: Express) {"},
  {"line": 375, "content": "  // AI Fashion Analysis"},
  {"line": 376, "content": "  // The existing code for analyze-item is already defined in the router instance above."},
  {"line": 377, "content": "  // This function seems to be a wrapper that might have been intended for a different structure."},
  {"line": 378, "content": "  // To avoid duplication and ensure the routes defined with `router` are used,"},
  {"line": 379, "content": "  // we will not redefine them here. If this function was meant to register"},
  {"line": 380, "content": "  // routes differently, the original intent would need clarification."},
  {"line": 381, "content": "  // For now, we assume the router instance is the primary way routes are defined."},
  {"line": 382, "content": "  // We are now using express router instance to mount all routes"},
  {"line": 383, "content": "}"},
  {"line": 384, "content": ""},
  {"line": 385, "content": "// Export the router to be used in the main app setup"},
  {"line": 386, "content": "export default router;"}
]
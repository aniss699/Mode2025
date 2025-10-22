
import { Router } from 'express';
import { db } from '../db';
import { wardrobeItems, outfits, users, follows } from '../../shared/schema';
import { eq, and, or, like, ilike, sql, desc } from 'drizzle-orm';

const router = Router();

// Recherche globale (items, outfits, utilisateurs)
router.get('/global', async (req, res) => {
  try {
    const { q, type = 'all', limit = 20 } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Paramètre de recherche requis' });
    }

    const query = `%${q}%`;
    const limitNum = parseInt(limit as string);

    const results: any = {
      items: [],
      outfits: [],
      users: []
    };

    // Recherche dans les items de garde-robe
    if (type === 'all' || type === 'items') {
      results.items = await db
        .select()
        .from(wardrobeItems)
        .where(
          and(
            eq(wardrobeItems.isPublic, true),
            or(
              ilike(wardrobeItems.name, query),
              ilike(wardrobeItems.brand, query),
              ilike(wardrobeItems.category, query),
              sql`${wardrobeItems.tags}::text ILIKE ${query}`
            )
          )
        )
        .limit(limitNum);
    }

    // Recherche dans les outfits
    if (type === 'all' || type === 'outfits') {
      results.outfits = await db
        .select()
        .from(outfits)
        .where(
          and(
            eq(outfits.isPublic, true),
            or(
              ilike(outfits.title, query),
              ilike(outfits.description, query),
              sql`${outfits.tags}::text ILIKE ${query}`
            )
          )
        )
        .orderBy(desc(outfits.likesCount))
        .limit(limitNum);
    }

    // Recherche dans les utilisateurs
    if (type === 'all' || type === 'users') {
      results.users = await db
        .select({
          id: users.id,
          username: users.username,
          name: users.name,
          avatarUrl: users.avatarUrl,
          bio: users.bio,
          followersCount: users.followersCount,
          wardrobeItemsCount: users.wardrobeItemsCount
        })
        .from(users)
        .where(
          or(
            ilike(users.username, query),
            ilike(users.name, query),
            sql`${users.styleTags}::text ILIKE ${query}`,
            sql`${users.favoriteBrands}::text ILIKE ${query}`
          )
        )
        .limit(limitNum);
    }

    res.json(results);
  } catch (error) {
    console.error('Erreur recherche globale:', error);
    res.status(500).json({ error: 'Erreur lors de la recherche' });
  }
});

// Recherche avancée de garde-robe
router.get('/wardrobe', async (req, res) => {
  try {
    const {
      category,
      brand,
      color,
      season,
      minPrice,
      maxPrice,
      tags,
      userId,
      limit = 50
    } = req.query;

    let query = db
      .select()
      .from(wardrobeItems)
      .where(eq(wardrobeItems.isPublic, true));

    const conditions = [];

    if (userId) {
      conditions.push(eq(wardrobeItems.userId, parseInt(userId as string)));
    }

    if (category) {
      conditions.push(eq(wardrobeItems.category, category as string));
    }

    if (brand) {
      conditions.push(ilike(wardrobeItems.brand, `%${brand}%`));
    }

    if (color) {
      conditions.push(sql`${wardrobeItems.color}::text ILIKE ${`%${color}%`}`);
    }

    if (season) {
      conditions.push(eq(wardrobeItems.season, season as string));
    }

    if (minPrice) {
      conditions.push(sql`${wardrobeItems.purchasePrice} >= ${minPrice}`);
    }

    if (maxPrice) {
      conditions.push(sql`${wardrobeItems.purchasePrice} <= ${maxPrice}`);
    }

    if (tags && typeof tags === 'string') {
      conditions.push(sql`${wardrobeItems.tags}::text ILIKE ${`%${tags}%`}`);
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const items = await query.limit(parseInt(limit as string));

    res.json(items);
  } catch (error) {
    console.error('Erreur recherche garde-robe:', error);
    res.status(500).json({ error: 'Erreur lors de la recherche' });
  }
});

// Suggestions d'utilisateurs à suivre
router.get('/suggested-users', async (req, res) => {
  try {
    const userId = req.user?.id;
    const { limit = 10 } = req.query;

    // Trouver les utilisateurs que l'utilisateur ne suit pas encore
    let query = db
      .select({
        id: users.id,
        username: users.username,
        name: users.name,
        avatarUrl: users.avatarUrl,
        bio: users.bio,
        followersCount: users.followersCount,
        wardrobeItemsCount: users.wardrobeItemsCount,
        styleTags: users.styleTags
      })
      .from(users)
      .where(eq(users.isPublic, true))
      .orderBy(desc(users.followersCount))
      .limit(parseInt(limit as string));

    // Exclure l'utilisateur connecté
    if (userId) {
      query = query.where(sql`${users.id} != ${userId}`) as any;
    }

    const suggestedUsers = await query;

    res.json(suggestedUsers);
  } catch (error) {
    console.error('Erreur suggestions utilisateurs:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des suggestions' });
  }
});

// Tendances (hashtags populaires)
router.get('/trending-tags', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    // Agréger les tags les plus utilisés
    const trendingTags = await db.execute(sql`
      SELECT unnest(tags) as tag, COUNT(*) as count
      FROM wardrobe_items
      WHERE is_public = true
      GROUP BY tag
      ORDER BY count DESC
      LIMIT ${parseInt(limit as string)}
    `);

    res.json(trendingTags.rows);
  } catch (error) {
    console.error('Erreur tendances tags:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des tendances' });
  }
});

export default router;

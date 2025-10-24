import { Router } from 'express';
import { db } from '../db';
import { looks, likes, comments, users } from '../../shared/schema';
import { eq, desc, and, sql } from 'drizzle-orm';
import multer from 'multer';
import path from 'path';

const router = Router();

// Aliases pour compatibilité
const outfitsTable = looks;
const outfitLikesTable = likes;
const outfitCommentsTable = comments;

// Configuration upload
const storage = multer.diskStorage({
  destination: './uploads/outfits/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'outfit-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// GET /api/looks/my-looks - Get logged-in user's looks
router.get('/my-looks', async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const userLooks = await db.select()
      .from(outfitsTable)
      .where(eq(outfitsTable.user_id, req.user.id))
      .orderBy(desc(outfitsTable.created_at));

    res.json(userLooks);
  } catch (error) {
    console.error('Erreur récupération looks utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/outfits/trending - Tendance outfits
router.get('/trending', async (req, res) => {
  try {
    const trendingOutfits = await db
      .select()
      .from(outfitsTable)
      .where(sql`${outfitsTable.created_at} > NOW() - INTERVAL '7 days'`)
      .orderBy(desc(outfitsTable.engagement_score))
      .limit(12);

    res.json(trendingOutfits);
  } catch (error) {
    console.error('Erreur récupération outfits tendance:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// GET /api/outfits - Liste outfits (feed)
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;

    const outfitsList = await db.select()
      .from(outfitsTable)
      .where(eq(outfitsTable.isPublic, true))
      .orderBy(desc(outfitsTable.createdAt)) // Order by creation date for feed
      .limit(limit)
      .offset(offset);

    res.json(outfitsList);
  } catch (error) {
    console.error('Erreur récupération outfits:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/outfits/:id - Détails outfit
router.get('/:id', async (req, res) => {
  try {
    const outfitId = parseInt(req.params.id);

    const [outfit] = await db.select()
      .from(outfitsTable)
      .where(eq(outfitsTable.id, outfitId));

    if (!outfit) {
      return res.status(404).json({ error: 'Outfit non trouvé' });
    }

    // Check if the outfit is public or if the request user is the owner
    if (!outfit.isPublic && outfit.userId !== req.user?.id) {
      return res.status(403).json({ error: 'Accès interdit' });
    }

    // Increment views count
    await db.update(outfitsTable)
      .set({ viewsCount: (outfit.viewsCount || 0) + 1 }) // Ensure viewsCount is not null
      .where(eq(outfitsTable.id, outfitId));

    // Return the outfit data with the incremented view count
    res.json({ ...outfit, viewsCount: (outfit.viewsCount || 0) + 1 });
  } catch (error) {
    console.error('Erreur détails outfit:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/outfits - Créer outfit
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const {
      title,
      description,
      items,
      occasion,
      season,
      weather,
      location,
      tags,
      colorPalette,
      isPublic
    } = req.body;

    const photoUrl = req.file ? `/uploads/outfits/${req.file.filename}` : null;

    const [outfit] = await db.insert(outfitsTable).values({
      userId: req.user.id,
      title,
      description,
      photoUrl,
      items: items ? JSON.parse(items) : [],
      occasion,
      season,
      weather,
      location,
      tags: tags ? JSON.parse(tags) : null,
      colorPalette: colorPalette ? JSON.parse(colorPalette) : null,
      isPublic: isPublic !== 'false', // Default to true if not explicitly 'false'
      engagementScore: 0, // Initialize engagementScore
      viewsCount: 0, // Initialize viewsCount
      likesCount: 0, // Initialize likesCount
      commentsCount: 0, // Initialize commentsCount
    }).returning();

    // Increment postsCount for the user
    await db.update(users)
      .set({ postsCount: db.raw('posts_count + 1') })
      .where(eq(users.id, req.user.id));

    res.status(201).json(outfit);
  } catch (error) {
    console.error('Erreur création outfit:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/outfits/:id/like - Liker outfit
router.post('/:id/like', async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const outfitId = parseInt(req.params.id);

    // Check if the user has already liked this outfit
    const existingLike = await db.select()
      .from(outfitLikesTable)
      .where(
        and(
          eq(outfitLikesTable.outfitId, outfitId),
          eq(outfitLikesTable.userId, req.user.id)
        )
      );

    if (existingLike.length > 0) {
      // Unlike the outfit
      await db.delete(outfitLikesTable)
        .where(
          and(
            eq(outfitLikesTable.outfitId, outfitId),
            eq(outfitLikesTable.userId, req.user.id)
          )
        );

      // Decrement engagement score and likes count
      await db.update(outfitsTable)
        .set({ engagementScore: db.raw('engagement_score - 1'), likesCount: db.raw('likes_count - 1') })
        .where(eq(outfitsTable.id, outfitId));

      return res.json({ liked: false });
    } else {
      // Like the outfit
      await db.insert(outfitLikesTable).values({
        outfitId,
        userId: req.user.id,
      });

      // Increment engagement score and likes count
      await db.update(outfitsTable)
        .set({ engagementScore: db.raw('engagement_score + 1'), likesCount: db.raw('likes_count + 1') })
        .where(eq(outfitsTable.id, outfitId));

      return res.json({ liked: true });
    }
  } catch (error) {
    console.error('Erreur like outfit:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/outfits/:id/comments - Ajouter commentaire
router.post('/:id/comments', async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const outfitId = parseInt(req.params.id);
    const { content, parentCommentId } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Commentaire vide' });
    }

    const [comment] = await db.insert(outfitCommentsTable).values({
      outfitId,
      userId: req.user.id,
      parentCommentId: parentCommentId || null,
      content: content.trim(),
    }).returning();

    // Increment engagement score and comments count
    await db.update(outfitsTable)
      .set({ engagementScore: db.raw('engagement_score + 1'), commentsCount: db.raw('comments_count + 1') })
      .where(eq(outfitsTable.id, outfitId));

    res.status(201).json(comment);
  } catch (error) {
    console.error('Erreur ajout commentaire:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/outfits/:id/comments - Liste commentaires
router.get('/:id/comments', async (req, res) => {
  try {
    const outfitId = parseInt(req.params.id);

    const comments = await db.select()
      .from(outfitCommentsTable)
      .where(eq(outfitCommentsTable.outfitId, outfitId))
      .orderBy(desc(outfitCommentsTable.createdAt));

    res.json(comments);
  } catch (error) {
    console.error('Erreur récupération commentaires:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
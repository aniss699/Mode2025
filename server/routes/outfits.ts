
import { Router } from 'express';
import { db } from '../db';
import { outfits, outfitLikes, outfitComments, users } from '../../shared/schema';
import { eq, desc, and } from 'drizzle-orm';
import multer from 'multer';
import path from 'path';

const router = Router();

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

// GET /api/outfits - Liste outfits (feed)
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;

    const outfitsList = await db.select()
      .from(outfits)
      .where(eq(outfits.isPublic, true))
      .orderBy(desc(outfits.engagementScore), desc(outfits.createdAt))
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
      .from(outfits)
      .where(eq(outfits.id, outfitId));

    if (!outfit) {
      return res.status(404).json({ error: 'Outfit non trouvé' });
    }

    if (!outfit.isPublic && outfit.userId !== req.user?.id) {
      return res.status(403).json({ error: 'Accès interdit' });
    }

    // Incrémenter vues
    await db.update(outfits)
      .set({ viewsCount: outfit.viewsCount + 1 })
      .where(eq(outfits.id, outfitId));

    res.json({ ...outfit, viewsCount: outfit.viewsCount + 1 });
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

    const [outfit] = await db.insert(outfits).values({
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
      isPublic: isPublic !== 'false',
    }).returning();

    // Incrémenter compteur user
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

    // Vérifier si déjà liké
    const existing = await db.select()
      .from(outfitLikes)
      .where(
        and(
          eq(outfitLikes.outfitId, outfitId),
          eq(outfitLikes.userId, req.user.id)
        )
      );

    if (existing.length > 0) {
      // Unlike
      await db.delete(outfitLikes)
        .where(
          and(
            eq(outfitLikes.outfitId, outfitId),
            eq(outfitLikes.userId, req.user.id)
          )
        );
      
      return res.json({ liked: false });
    } else {
      // Like
      await db.insert(outfitLikes).values({
        outfitId,
        userId: req.user.id,
      });

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

    const [comment] = await db.insert(outfitComments).values({
      outfitId,
      userId: req.user.id,
      parentCommentId: parentCommentId || null,
      content: content.trim(),
    }).returning();

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
      .from(outfitComments)
      .where(eq(outfitComments.outfitId, outfitId))
      .orderBy(desc(outfitComments.createdAt));

    res.json(comments);
  } catch (error) {
    console.error('Erreur récupération commentaires:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;

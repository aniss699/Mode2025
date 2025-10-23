import { Router } from 'express';
import { db } from '../db';
import { fashionItems as wardrobeItems, users } from '../../shared/schema';
import { eq, and, desc } from 'drizzle-orm';
import multer from 'multer';
import path from 'path';

const router = Router();

// Configuration upload images
const storage = multer.diskStorage({
  destination: './uploads/wardrobe/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'wardrobe-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Images uniquement (jpeg, jpg, png, webp)'));
    }
  }
});

// GET /api/wardrobe/items - Liste items garde-robe user connecté
router.get('/items', async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const items = await db.select()
      .from(wardrobeItems)
      .where(eq(wardrobeItems.user_id, req.user.id))
      .orderBy(desc(wardrobeItems.created_at));

    res.json(items);
  } catch (error) {
    console.error('Erreur récupération garde-robe:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/wardrobe/items/:id - Détails item
router.get('/items/:id', async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);

    const [item] = await db.select()
      .from(wardrobeItems)
      .where(eq(wardrobeItems.id, itemId));

    if (!item) {
      return res.status(404).json({ error: 'Item non trouvé' });
    }

    // Vérifier visibilité
    if (!item.is_public && item.user_id !== req.user?.id) {
      return res.status(403).json({ error: 'Accès interdit' });
    }

    res.json(item);
  } catch (error) {
    console.error('Erreur détails item:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/wardrobe/items - Upload nouvel item
router.post('/items', upload.single('image'), async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Image requise' });
    }

    const {
      title,
      description,
      category,
      sub_category,
      brand,
      color,
      size,
      season,
      occasion,
      purchase_date,
      price,
      tags,
      is_public
    } = req.body;

    const imageUrl = `/uploads/wardrobe/${req.file.filename}`;

    const [item] = await db.insert(wardrobeItems).values({
      user_id: req.user.id,
      title: title || 'Nouvel article',
      description: description || null,
      images: [imageUrl],
      category,
      sub_category: sub_category || null,
      brand: brand || null,
      color: color || null,
      size: size || null,
      season: season || null,
      occasion: occasion || null,
      purchase_date: purchase_date ? new Date(purchase_date) : null,
      price: price ? parseInt(price) : null,
      tags: tags ? (typeof tags === 'string' ? JSON.parse(tags) : tags) : [],
      is_public: is_public !== 'false' && is_public !== false,
    }).returning();

    res.status(201).json(item);
  } catch (error) {
    console.error('Erreur création item:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PUT /api/wardrobe/items/:id - Modifier item
router.put('/items/:id', upload.single('image'), async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const itemId = parseInt(req.params.id);

    const [existingItem] = await db.select()
      .from(wardrobeItems)
      .where(eq(wardrobeItems.id, itemId));

    if (!existingItem) {
      return res.status(404).json({ error: 'Item non trouvé' });
    }

    if (existingItem.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Non autorisé' });
    }

    const updates: any = {
      updated_at: new Date(),
    };

    // Update fields if provided
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.description !== undefined) updates.description = req.body.description;
    if (req.body.category !== undefined) updates.category = req.body.category;
    if (req.body.sub_category !== undefined) updates.sub_category = req.body.sub_category;
    if (req.body.brand !== undefined) updates.brand = req.body.brand;
    if (req.body.color !== undefined) updates.color = req.body.color;
    if (req.body.size !== undefined) updates.size = req.body.size;
    if (req.body.season !== undefined) updates.season = req.body.season;
    if (req.body.occasion !== undefined) updates.occasion = req.body.occasion;
    if (req.body.is_public !== undefined) updates.is_public = req.body.is_public;
    if (req.body.tags !== undefined) {
      updates.tags = typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags;
    }

    if (req.file) {
      const imageUrl = `/uploads/wardrobe/${req.file.filename}`;
      updates.images = [...(existingItem.images || []), imageUrl];
    }

    const [updatedItem] = await db.update(wardrobeItems)
      .set(updates)
      .where(eq(wardrobeItems.id, itemId))
      .returning();

    res.json(updatedItem);
  } catch (error) {
    console.error('Erreur modification item:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE /api/wardrobe/items/:id - Supprimer item
router.delete('/items/:id', async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const itemId = parseInt(req.params.id);

    const [item] = await db.select()
      .from(wardrobeItems)
      .where(eq(wardrobeItems.id, itemId));

    if (!item) {
      return res.status(404).json({ error: 'Item non trouvé' });
    }

    if (item.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Non autorisé' });
    }

    await db.delete(wardrobeItems)
      .where(eq(wardrobeItems.id, itemId));

    res.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression item:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/wardrobe/users/:userId - Garde-robe publique d'un user
router.get('/users/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    // Récupérer l'utilisateur
    const [user] = await db.select()
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Récupérer les items publics
    const items = await db.select()
      .from(wardrobeItems)
      .where(
        and(
          eq(wardrobeItems.user_id, userId),
          eq(wardrobeItems.is_public, true)
        )
      )
      .orderBy(desc(wardrobeItems.created_at));

    // Récupérer les collections publiques
    const { collections } = await import('../../shared/schema');
    const userCollections = await db.select()
      .from(collections)
      .where(
        and(
          eq(collections.user_id, userId),
          eq(collections.is_public, true)
        )
      )
      .orderBy(desc(collections.created_at));

    res.json({
      user: {
        id: user.id,
        name: user.name,
        username: user.username || `@${user.name.toLowerCase().replace(/\s+/g, '')}`,
        avatar: user.avatar_url,
        bio: user.bio,
        location: user.location,
        styleTags: user.style_tags || [],
        followersCount: user.followers_count || 0,
        postsCount: user.posts_count || 0,
        rating: 4.8,
        isFollowing: false,
        isVerified: user.is_verified || false
      },
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        imageUrl: item.image_url,
        category: item.category,
        brand: item.brand,
        color: item.color,
        tags: item.tags
      })),
      collections: userCollections.map(col => ({
        id: col.id,
        title: col.title,
        coverImage: col.cover_image,
        itemsCount: col.items?.length || 0
      }))
    });
  } catch (error) {
    console.error('Erreur récupération garde-robe publique:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;

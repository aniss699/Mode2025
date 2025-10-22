
import { Router } from 'express';
import { db } from '../db';
import { wardrobeItems, users } from '../../shared/schema';
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
      .where(eq(wardrobeItems.userId, req.user.id))
      .orderBy(desc(wardrobeItems.createdAt));

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
    if (!item.isPublic && item.userId !== req.user?.id) {
      return res.status(403).json({ error: 'Accès interdit' });
    }

    // Incrémenter vues
    await db.update(wardrobeItems)
      .set({ viewsCount: item.viewsCount + 1 })
      .where(eq(wardrobeItems.id, itemId));

    res.json({ ...item, viewsCount: item.viewsCount + 1 });
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
      name,
      description,
      category,
      subcategory,
      brand,
      color,
      size,
      material,
      season,
      purchaseDate,
      purchasePrice,
      purchaseLocation,
      tags,
      condition,
      isPublic
    } = req.body;

    const imageUrl = `/uploads/wardrobe/${req.file.filename}`;

    const [item] = await db.insert(wardrobeItems).values({
      userId: req.user.id,
      name,
      description,
      category,
      subcategory,
      brand,
      color: color ? JSON.parse(color) : null,
      size,
      material,
      season,
      imageUrl,
      purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
      purchasePrice,
      purchaseLocation,
      tags: tags ? JSON.parse(tags) : null,
      condition: condition || 'good',
      isPublic: isPublic !== 'false',
    }).returning();

    // Incrémenter compteur user
    await db.update(users)
      .set({ wardrobeItemsCount: db.raw('wardrobe_items_count + 1') })
      .where(eq(users.id, req.user.id));

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

    if (existingItem.userId !== req.user.id) {
      return res.status(403).json({ error: 'Non autorisé' });
    }

    const updates: any = {
      ...req.body,
      updatedAt: new Date(),
    };

    if (req.file) {
      updates.imageUrl = `/uploads/wardrobe/${req.file.filename}`;
    }

    // Parser JSON fields
    if (updates.color) updates.color = JSON.parse(updates.color);
    if (updates.tags) updates.tags = JSON.parse(updates.tags);

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

    if (item.userId !== req.user.id) {
      return res.status(403).json({ error: 'Non autorisé' });
    }

    await db.delete(wardrobeItems)
      .where(eq(wardrobeItems.id, itemId));

    // Décrémenter compteur user
    await db.update(users)
      .set({ wardrobeItemsCount: db.raw('wardrobe_items_count - 1') })
      .where(eq(users.id, req.user.id));

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
    
    const items = await db.select()
      .from(wardrobeItems)
      .where(
        and(
          eq(wardrobeItems.userId, userId),
          eq(wardrobeItems.isPublic, true)
        )
      )
      .orderBy(desc(wardrobeItems.createdAt));

    res.json(items);
  } catch (error) {
    console.error('Erreur récupération garde-robe publique:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;

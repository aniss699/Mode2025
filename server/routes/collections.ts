
import { Router } from 'express';
import { db } from '../db';
import { wardrobeCollections, wardrobeItems } from '../../shared/schema';
import { eq, and, desc } from 'drizzle-orm';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Créer une nouvelle collection
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, coverImageUrl, items = [], isPublic = true } = req.body;
    const userId = req.user!.id;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Le nom de la collection est requis' });
    }

    const [collection] = await db.insert(wardrobeCollections).values({
      userId,
      name: name.trim(),
      description: description?.trim(),
      coverImageUrl,
      items: items.map(String),
      isPublic
    }).returning();

    res.json(collection);
  } catch (error) {
    console.error('Erreur création collection:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la collection' });
  }
});

// Récupérer les collections d'un utilisateur
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const requestingUserId = req.user?.id;

    // Si ce n'est pas l'utilisateur lui-même, ne montrer que les collections publiques
    const whereClause = userId === requestingUserId
      ? eq(wardrobeCollections.userId, userId)
      : and(
          eq(wardrobeCollections.userId, userId),
          eq(wardrobeCollections.isPublic, true)
        );

    const collections = await db
      .select()
      .from(wardrobeCollections)
      .where(whereClause)
      .orderBy(desc(wardrobeCollections.createdAt));

    res.json(collections);
  } catch (error) {
    console.error('Erreur récupération collections:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des collections' });
  }
});

// Récupérer une collection avec ses items
router.get('/:id', async (req, res) => {
  try {
    const collectionId = parseInt(req.params.id);
    const requestingUserId = req.user?.id;

    const [collection] = await db
      .select()
      .from(wardrobeCollections)
      .where(eq(wardrobeCollections.id, collectionId));

    if (!collection) {
      return res.status(404).json({ error: 'Collection non trouvée' });
    }

    // Vérifier la visibilité
    if (!collection.isPublic && collection.userId !== requestingUserId) {
      return res.status(403).json({ error: 'Collection privée' });
    }

    // Récupérer les items de la collection
    const items = collection.items && collection.items.length > 0
      ? await db
          .select()
          .from(wardrobeItems)
          .where(eq(wardrobeItems.id, parseInt(collection.items[0])))
      : [];

    res.json({ ...collection, wardrobeItems: items });
  } catch (error) {
    console.error('Erreur récupération collection:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la collection' });
  }
});

// Mettre à jour une collection
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const collectionId = parseInt(req.params.id);
    const userId = req.user!.id;
    const { name, description, coverImageUrl, isPublic } = req.body;

    const [collection] = await db
      .select()
      .from(wardrobeCollections)
      .where(eq(wardrobeCollections.id, collectionId));

    if (!collection) {
      return res.status(404).json({ error: 'Collection non trouvée' });
    }

    if (collection.userId !== userId) {
      return res.status(403).json({ error: 'Non autorisé' });
    }

    const [updated] = await db
      .update(wardrobeCollections)
      .set({
        name: name?.trim() || collection.name,
        description: description?.trim(),
        coverImageUrl: coverImageUrl || collection.coverImageUrl,
        isPublic: isPublic !== undefined ? isPublic : collection.isPublic,
        updatedAt: new Date()
      })
      .where(eq(wardrobeCollections.id, collectionId))
      .returning();

    res.json(updated);
  } catch (error) {
    console.error('Erreur mise à jour collection:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la collection' });
  }
});

// Ajouter/retirer des items dans une collection
router.put('/:id/items', authenticateToken, async (req, res) => {
  try {
    const collectionId = parseInt(req.params.id);
    const userId = req.user!.id;
    const { itemIds, action = 'add' } = req.body; // action: 'add' or 'remove'

    const [collection] = await db
      .select()
      .from(wardrobeCollections)
      .where(eq(wardrobeCollections.id, collectionId));

    if (!collection) {
      return res.status(404).json({ error: 'Collection non trouvée' });
    }

    if (collection.userId !== userId) {
      return res.status(403).json({ error: 'Non autorisé' });
    }

    let updatedItems = collection.items || [];

    if (action === 'add') {
      const newItems = itemIds.map(String).filter((id: string) => !updatedItems.includes(id));
      updatedItems = [...updatedItems, ...newItems];
    } else if (action === 'remove') {
      updatedItems = updatedItems.filter((id: string) => !itemIds.map(String).includes(id));
    }

    const [updated] = await db
      .update(wardrobeCollections)
      .set({
        items: updatedItems,
        updatedAt: new Date()
      })
      .where(eq(wardrobeCollections.id, collectionId))
      .returning();

    res.json(updated);
  } catch (error) {
    console.error('Erreur mise à jour items collection:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour des items' });
  }
});

// Supprimer une collection
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const collectionId = parseInt(req.params.id);
    const userId = req.user!.id;

    const [collection] = await db
      .select()
      .from(wardrobeCollections)
      .where(eq(wardrobeCollections.id, collectionId));

    if (!collection) {
      return res.status(404).json({ error: 'Collection non trouvée' });
    }

    if (collection.userId !== userId) {
      return res.status(403).json({ error: 'Non autorisé' });
    }

    await db.delete(wardrobeCollections).where(eq(wardrobeCollections.id, collectionId));

    res.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression collection:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la collection' });
  }
});

export default router;

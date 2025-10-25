import { Router } from 'express';
import { db } from '../db';
import { fashionItems, insertFashionItemSchema } from '../../shared/schema';
import { eq, desc } from 'drizzle-orm';

const router = Router();

// GET /api/fashion-items/my-items - Get logged-in user's fashion items
router.get('/my-items', async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const userItems = await db.select()
      .from(fashionItems)
      .where(eq(fashionItems.user_id, req.user.id))
      .orderBy(desc(fashionItems.created_at));

    res.json(userItems);
  } catch (error) {
    console.error('Erreur récupération items utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/fashion-items - Create a new fashion item
router.post('/', async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const validationResult = insertFashionItemSchema.safeParse({
      ...req.body,
      user_id: req.user.id,
    });

    if (!validationResult.success) {
      return res.status(400).json({ 
        error: 'Données invalides',
        details: validationResult.error.errors 
      });
    }

    const [newItem] = await db.insert(fashionItems)
      .values(validationResult.data)
      .returning();

    console.log('✅ Nouveau vêtement créé:', newItem.id);
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Erreur création vêtement:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE /api/fashion-items/:id - Delete a fashion item
router.delete('/:id', async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const itemId = parseInt(req.params.id);
    if (isNaN(itemId)) {
      return res.status(400).json({ error: 'ID invalide' });
    }

    // Verify ownership before deleting
    const [item] = await db.select()
      .from(fashionItems)
      .where(eq(fashionItems.id, itemId))
      .limit(1);

    if (!item) {
      return res.status(404).json({ error: 'Vêtement non trouvé' });
    }

    if (item.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Non autorisé' });
    }

    await db.delete(fashionItems)
      .where(eq(fashionItems.id, itemId));

    console.log('✅ Vêtement supprimé:', itemId);
    res.json({ success: true, message: 'Vêtement supprimé' });
  } catch (error) {
    console.error('Erreur suppression vêtement:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;

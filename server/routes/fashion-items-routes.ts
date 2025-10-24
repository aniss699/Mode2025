import { Router } from 'express';
import { db } from '../db';
import { fashionItems } from '../../shared/schema';
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

export default router;

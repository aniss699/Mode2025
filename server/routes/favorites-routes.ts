import { Router } from 'express';
import { db } from '../db';
import { eq, and } from 'drizzle-orm';
import { favorites, announcements, savedLooks, looks } from '../../shared/schema';

const router = Router();

// Récupérer les favoris d'un utilisateur (saved looks for fashion app)
router.get('/favorites', async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const userFavorites = await db
      .select({
        look: looks
      })
      .from(savedLooks)
      .innerJoin(looks, eq(savedLooks.look_id, looks.id))
      .where(eq(savedLooks.user_id, req.user.id));

    const favoriteLooks = userFavorites.map(f => f.look);

    res.json(favoriteLooks);

  } catch (error) {
    console.error('Erreur récupération favoris:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des favoris' });
  }
});

// Ajouter un look aux favoris
router.post('/favorites', async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const { look_id } = req.body;

    if (!look_id) {
      return res.status(400).json({ error: 'look_id requis' });
    }

    // Vérifier si déjà en favori
    const existing = await db
      .select()
      .from(savedLooks)
      .where(
        and(
          eq(savedLooks.user_id, req.user.id),
          eq(savedLooks.look_id, look_id)
        )
      );

    if (existing.length > 0) {
      return res.status(200).json({ message: 'Déjà en favori' });
    }

    // Ajouter aux favoris
    await db.insert(savedLooks).values({
      user_id: req.user.id,
      look_id,
      created_at: new Date()
    });

    res.status(201).json({ message: 'Ajouté aux favoris' });

  } catch (error) {
    console.error('Erreur ajout favori:', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout aux favoris' });
  }
});

// Supprimer un look des favoris
router.delete('/favorites/:lookId', async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const { lookId } = req.params;

    await db
      .delete(savedLooks)
      .where(
        and(
          eq(savedLooks.user_id, req.user.id),
          eq(savedLooks.look_id, parseInt(lookId))
        )
      );

    res.json({ message: 'Supprimé des favoris' });

  } catch (error) {
    console.error('Erreur suppression favori:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression des favoris' });
  }
});

export default router;
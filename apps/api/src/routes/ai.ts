
import { Router } from 'express';
import { getPricingSuggestion, enhanceBrief, logUserFeedback } from '../ai/AIOrchestrator.js';

const router = Router();

router.post('/pricing', async (req, res) => {
  try {
    const result = await getPricingSuggestion(req.body);
    res.json(result);
  } catch (error) {
    console.error('AI Pricing error:', error);
    res.status(500).json({ error: 'Erreur lors du calcul de prix' });
  }
});

router.post('/brief', async (req, res) => {
  try {
    const result = await enhanceBrief(req.body);
    res.json(result);
  } catch (error) {
    console.error('AI Brief enhancement error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'amélioration du brief' });
  }
});

router.post('/feedback', async (req, res) => {
  try {
    const { phase, prompt, feedback } = req.body;
    await logUserFeedback(phase, prompt, feedback);
    res.json({ ok: true });
  } catch (error) {
    console.error('AI Feedback error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement du feedback' });
  }
});

export default router;

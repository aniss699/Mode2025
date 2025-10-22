import { Router } from 'express';
import { z } from 'zod';

const router = Router();

const teamAnalysisSchema = z.object({
  description: z.string().min(10),
  title: z.string().min(3),
  category: z.string().min(2),
  budget: z.union([z.string(), z.number()])
});

const teamProjectSchema = z.object({
  projectData: z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    category: z.string().optional().default('developpement'),
    budget: z.union([z.string(), z.number()]).optional().default('1000'),
    location: z.string().optional(),
    isTeamMode: z.boolean()
  }),
  teamRequirements: z.array(z.object({
    profession: z.string(),
    description: z.string(),
    required_skills: z.array(z.string()),
    estimated_budget: z.number(),
    estimated_days: z.number(),
    min_experience: z.number(),
    is_lead_role: z.boolean(),
    importance: z.enum(['high', 'medium', 'low'])
  }))
});

router.post('/analyze', async (req, res) => {
  try {
    const parsed = teamAnalysisSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Données invalides', details: parsed.error.flatten() });
    }

    const { description, title, category, budget } = parsed.data;

    // Simulation d'analyse IA pour générer les professions
    const professions = [
      {
        profession: "Développeur Frontend",
        description: "Création de l'interface utilisateur et expérience utilisateur",
        required_skills: ["React", "TypeScript", "CSS", "HTML"],
        estimated_budget: Math.floor(Number(budget) * 0.4),
        estimated_days: 10,
        min_experience: 2,
        is_lead_role: false,
        importance: 'high' as const
      },
      {
        profession: "Développeur Backend",
        description: "Architecture serveur et APIs",
        required_skills: ["Node.js", "PostgreSQL", "REST API"],
        estimated_budget: Math.floor(Number(budget) * 0.4),
        estimated_days: 12,
        min_experience: 3,
        is_lead_role: true,
        importance: 'high' as const
      },
      {
        profession: "Designer UX/UI",
        description: "Conception de l'expérience et interface utilisateur",
        required_skills: ["Figma", "Design System", "Prototypage"],
        estimated_budget: Math.floor(Number(budget) * 0.2),
        estimated_days: 5,
        min_experience: 2,
        is_lead_role: false,
        importance: 'medium' as const
      }
    ];

    res.json({ professions });
  } catch (error) {
    console.error('Team analysis error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/create-project', async (req, res) => {
  try {
    console.log('📥 Requête reçue - body:', JSON.stringify(req.body, null, 2));

    const parsed = teamProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      console.error('❌ Validation échouée:', JSON.stringify(parsed.error.flatten(), null, 2));
      return res.status(400).json({ 
        error: 'Données invalides', 
        details: parsed.error.flatten(),
        received: req.body 
      });
    }

    const { projectData, teamRequirements } = parsed.data;
    console.log('📋 Création projet équipe - Données validées:', { projectData, teamRequirements });

    // Validation supplémentaire
    if (!projectData.title || projectData.title.trim().length === 0) {
      return res.status(400).json({ error: 'Le titre est requis' });
    }

    if (!teamRequirements || teamRequirements.length === 0) {
      return res.status(400).json({ error: 'Au moins une spécialité est requise pour un projet d\'équipe' });
    }

    // Calculer le budget total de l'équipe
    const totalBudget = teamRequirements.reduce((sum, req) => sum + (req.estimated_budget || 0), 0);
    console.log('💰 Budget total calculé:', totalBudget);

    // Créer la mission d'équipe avec team_requirements stocké en JSONB
    const teamMission = {
      title: projectData.title.trim(),
      description: projectData.description?.trim() || 'Description du projet d\'équipe',
      category: projectData.category || 'developpement',
      budget_value_cents: totalBudget * 100,
      currency: 'EUR',
      location_data: {
        raw: projectData.location || 'Remote',
        city: null,
        country: 'France',
        remote_allowed: true
      },
      user_id: req.user?.id || 1,
      client_id: req.user?.id || 1,
      status: 'open' as const,
      urgency: 'medium' as const,
      is_team_mission: true,
      team_size: teamRequirements.length,
      team_requirements: teamRequirements,
      tags: [],
      skills_required: []
    };

    console.log('📝 Mission d\'équipe à créer:', JSON.stringify(teamMission, null, 2));

    // Importer la DB et la table des missions
    const { db } = await import('../database.js');
    const { missions, announcements } = await import('../../shared/schema.js');

    const [createdTeamMission] = await db.insert(missions).values(teamMission).returning();
    console.log('✅ Mission d\'équipe créée avec ID:', createdTeamMission.id);

    // Synchroniser vers le feed (announcements)
    try {
      await db.insert(announcements).values({
        id: createdTeamMission.id,
        title: createdTeamMission.title,
        content: createdTeamMission.description,
        type: 'mission',
        category: createdTeamMission.category || 'general',
        budget: totalBudget,
        location: projectData.location || 'Remote',
        user_id: createdTeamMission.user_id,
        status: 'active',
        is_active: true,
        sponsored: false
      }).onConflictDoNothing();
      console.log('✅ Mission synchronisée dans announcements');
    } catch (syncError) {
      console.warn('⚠️ Erreur sync announcements (non-bloquant):', syncError);
    }

    console.log('✅ Projet équipe créé avec succès');
    res.status(201).json({
      success: true,
      project: createdTeamMission,
      team_requirements: teamRequirements
    });
  } catch (error) {
    console.error('❌ Erreur création projet équipe:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'N/A');
    res.status(500).json({
      error: 'Erreur lors de la création du projet équipe',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
    });
  }
});

export default router;
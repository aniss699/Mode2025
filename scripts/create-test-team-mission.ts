
import { db } from '../server/database.js';
import { missions } from '../shared/schema.js';

async function createTestTeamMission() {
  console.log('🚀 Création d\'une mission d\'équipe de test...');

  const teamRequirements = [
    {
      profession: 'Développeur Full-Stack Senior',
      description: 'Lead technique du projet, architecture et développement full-stack',
      required_skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
      estimated_budget: 8000,
      estimated_days: 20,
      min_experience: 5,
      is_lead_role: true,
      importance: 'high' as const
    },
    {
      profession: 'Designer UX/UI',
      description: 'Conception de l\'expérience utilisateur et interface moderne',
      required_skills: ['Figma', 'Design System', 'Prototypage', 'User Research'],
      estimated_budget: 4000,
      estimated_days: 15,
      min_experience: 3,
      is_lead_role: false,
      importance: 'high' as const
    },
    {
      profession: 'Expert DevOps',
      description: 'Configuration CI/CD, déploiement et monitoring',
      required_skills: ['Docker', 'Kubernetes', 'GitHub Actions', 'Monitoring'],
      estimated_budget: 3000,
      estimated_days: 10,
      min_experience: 4,
      is_lead_role: false,
      importance: 'medium' as const
    }
  ];

  const totalBudget = teamRequirements.reduce((sum, req) => sum + req.estimated_budget, 0);

  const teamMission = {
    title: 'Développement d\'une plateforme SaaS de gestion de projets',
    description: `Nous recherchons une équipe complète pour développer une plateforme SaaS moderne de gestion de projets.

**Objectifs du projet:**
- Interface utilisateur intuitive et responsive
- Gestion avancée des tâches et workflows
- Collaboration en temps réel
- Intégration d'API tierces (Slack, Google Calendar, etc.)
- Dashboard analytics et reporting

**Technologies souhaitées:**
- Frontend: React + TypeScript
- Backend: Node.js + Express
- Base de données: PostgreSQL
- Déploiement: Docker + Kubernetes

**Livrables attendus:**
- Code source complet et documenté
- Tests unitaires et d'intégration
- Documentation technique et utilisateur
- Formation de l'équipe client

Budget total: ${totalBudget}€ pour ${teamRequirements.reduce((sum, req) => sum + req.estimated_days, 0)} jours-homme`,
    category: 'developpement',
    budget_value_cents: totalBudget * 100,
    currency: 'EUR',
    location_data: {
      raw: 'Paris, France (télétravail possible)',
      city: 'Paris',
      country: 'France',
      remote_allowed: true
    },
    user_id: 1,
    client_id: 1,
    status: 'open' as const,
    urgency: 'high' as const,
    is_team_mission: true,
    team_size: teamRequirements.length,
    team_requirements: teamRequirements,
    tags: ['saas', 'react', 'nodejs', 'devops', 'ux-ui'],
    skills_required: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Figma']
  };

  try {
    const [createdMission] = await db.insert(missions).values(teamMission).returning();
    
    console.log('✅ Mission d\'équipe créée avec succès!');
    console.log('📋 ID:', createdMission.id);
    console.log('📝 Titre:', createdMission.title);
    console.log('👥 Nombre de spécialités:', teamRequirements.length);
    console.log('💰 Budget total:', totalBudget, '€');
    console.log('\n🔗 Accédez à la mission sur: /missions/' + createdMission.id);
    
    return createdMission;
  } catch (error) {
    console.error('❌ Erreur lors de la création:', error);
    throw error;
  }
}

createTestTeamMission()
  .then(() => {
    console.log('✅ Script terminé avec succès');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  });

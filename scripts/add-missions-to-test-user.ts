
import { db } from '../server/database.js';
import { missions, users } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function addMissionsToTestUser() {
  console.log('🚀 Ajout de missions au profil test@swideal.com...');

  try {
    // 1. Récupérer l'utilisateur test
    const [testUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, 'test@swideal.com'))
      .limit(1);

    if (!testUser) {
      console.error('❌ Utilisateur test@swideal.com non trouvé');
      console.log('💡 Exécutez d\'abord: npx tsx scripts/complete-test-user-profile.ts');
      process.exit(1);
    }

    console.log('✅ Utilisateur trouvé:', testUser.name, '(ID:', testUser.id, ')');

    // 2. Définir les nouvelles missions
    const newMissions = [
      {
        title: 'Développement d\'une plateforme SaaS de gestion RH',
        description: `Nous recherchons un développeur full-stack expérimenté pour créer une plateforme SaaS complète de gestion des ressources humaines.

**Fonctionnalités principales :**
- Gestion des employés (profils, contrats, documents)
- Suivi des congés et absences
- Gestion des notes de frais
- Tableau de bord analytics avec KPIs RH
- Système de notifications par email
- Interface admin et utilisateur

**Stack technique souhaité :**
- Frontend: React/Next.js avec TypeScript
- Backend: Node.js/Express ou NestJS
- Base de données: PostgreSQL
- Authentification: JWT + OAuth2
- Cloud: AWS ou Google Cloud

**Livrables :**
- Application web complète et responsive
- API REST documentée (OpenAPI/Swagger)
- Tests unitaires et d'intégration
- Documentation technique complète
- Déploiement en production

Le projet est prévu sur 3-4 mois avec des sprints de 2 semaines.`,
        excerpt: 'Développement d\'une plateforme SaaS de gestion RH complète avec React, Node.js et PostgreSQL.',
        category: 'developpement',
        budget_value_cents: 4500000, // 45 000€
        currency: 'EUR',
        location_data: {
          raw: 'Paris, France',
          city: 'Paris',
          country: 'France',
          remote_allowed: true
        },
        user_id: testUser.id,
        client_id: testUser.id,
        status: 'open' as const,
        urgency: 'high' as const,
        deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 120 jours
        tags: ['saas', 'rh', 'full-stack', 'react', 'nodejs'],
        skills_required: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
        requirements: 'Expérience confirmée en développement SaaS. Portfolio avec projets similaires requis.',
        is_team_mission: false,
        team_size: 1
      },
      {
        title: 'Création d\'une application mobile de livraison à domicile',
        description: `Développement d\'une application mobile native pour un service de livraison à domicile (nourriture, courses, produits locaux).

**Fonctionnalités clés :**
- Application client (iOS + Android)
- Application livreur (iOS + Android)
- Géolocalisation en temps réel
- Paiement intégré (Stripe, PayPal)
- Système de notation et avis
- Notifications push
- Chat client-livreur
- Tableau de bord admin web

**Technologies :**
- React Native pour les apps mobiles
- Backend Node.js/Express
- Base de données MongoDB ou PostgreSQL
- Firebase pour notifications push
- Google Maps API
- Stripe SDK

**Phase 1 (3 mois) :**
- MVP avec fonctionnalités essentielles
- Tests bêta avec utilisateurs pilotes

**Phase 2 (2 mois) :**
- Fonctionnalités avancées
- Optimisations performance
- Publication stores

Budget total pour les 2 phases.`,
        excerpt: 'Application mobile de livraison à domicile (client + livreur) en React Native avec géolocalisation temps réel.',
        category: 'developpement',
        budget_value_cents: 5500000, // 55 000€
        currency: 'EUR',
        location_data: {
          raw: 'Lyon, France',
          city: 'Lyon',
          country: 'France',
          remote_allowed: true
        },
        user_id: testUser.id,
        client_id: testUser.id,
        status: 'open' as const,
        urgency: 'medium' as const,
        deadline: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 150 jours
        tags: ['mobile', 'react-native', 'livraison', 'geolocalisation'],
        skills_required: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'Google Maps API', 'Stripe'],
        requirements: 'Expérience en développement d\'applications de livraison ou marketplace. Références obligatoires.',
        is_team_mission: true,
        team_size: 2
      },
      {
        title: 'Refonte complète d\'un site e-commerce Shopify',
        description: `Refonte totale de notre boutique en ligne Shopify avec un design moderne et des fonctionnalités avancées.

**Objectifs :**
- Nouveau design UI/UX moderne et professionnel
- Amélioration du taux de conversion
- Optimisation SEO et performance
- Intégration de nouvelles fonctionnalités

**Travaux à réaliser :**
- Maquettes Figma complètes
- Développement du thème Shopify custom
- Intégration de Klaviyo pour email marketing
- Configuration des collections et produits
- Mise en place de filtres avancés
- Page builder pour landing pages
- Optimisation mobile-first
- Tests A/B

**Livrables :**
- Maquettes validées (desktop + mobile + tablette)
- Thème Shopify développé et testé
- Documentation complète
- Formation à l'administration
- Support 1 mois post-livraison

Le site compte environ 200 produits répartis en 15 catégories.`,
        excerpt: 'Refonte complète d\'une boutique Shopify avec nouveau design, optimisation SEO et fonctionnalités avancées.',
        category: 'developpement',
        budget_value_cents: 1200000, // 12 000€
        currency: 'EUR',
        location_data: {
          raw: 'Remote',
          city: null,
          country: 'France',
          remote_allowed: true
        },
        user_id: testUser.id,
        client_id: testUser.id,
        status: 'open' as const,
        urgency: 'medium' as const,
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 jours
        tags: ['shopify', 'e-commerce', 'design', 'seo'],
        skills_required: ['Shopify', 'Liquid', 'JavaScript', 'Figma', 'SEO', 'UX/UI Design'],
        requirements: 'Expert Shopify avec portfolio de boutiques réalisées. Maîtrise du SEO e-commerce.',
        is_team_mission: false,
        team_size: 1
      },
      {
        title: 'Développement d\'un dashboard analytics temps réel',
        description: `Création d\'un tableau de bord analytics avancé pour visualiser les données de notre plateforme en temps réel.

**Caractéristiques :**
- Visualisations interactives (graphiques, tableaux, cartes)
- Mise à jour en temps réel (WebSocket)
- Filtres dynamiques et drill-down
- Export de données (CSV, Excel, PDF)
- Alertes personnalisables
- Responsive design

**Données à visualiser :**
- Métriques business (CA, conversions, utilisateurs)
- Données de performance technique
- Analytics comportementales
- Prédictions et tendances

**Stack technique :**
- Frontend: React + D3.js ou Chart.js
- Backend: Node.js avec WebSocket
- Base de données: PostgreSQL + Redis
- Déploiement: Docker + Kubernetes

**Délai :** 6-8 semaines

Le dashboard doit pouvoir gérer jusqu'à 10 000 points de données simultanés.`,
        excerpt: 'Dashboard analytics temps réel avec visualisations interactives, WebSocket et export de données.',
        category: 'developpement',
        budget_value_cents: 2800000, // 28 000€
        currency: 'EUR',
        location_data: {
          raw: 'Marseille, France',
          city: 'Marseille',
          country: 'France',
          remote_allowed: false
        },
        user_id: testUser.id,
        client_id: testUser.id,
        status: 'open' as const,
        urgency: 'high' as const,
        deadline: new Date(Date.now() + 56 * 24 * 60 * 60 * 1000), // 56 jours
        tags: ['dashboard', 'analytics', 'real-time', 'data-viz'],
        skills_required: ['React', 'D3.js', 'WebSocket', 'Node.js', 'PostgreSQL', 'Docker'],
        requirements: 'Expérience confirmée en data visualization et temps réel. Portfolio requis.',
        is_team_mission: false,
        team_size: 1
      },
      {
        title: 'Création d\'une identité visuelle complète + site vitrine',
        description: `Nous recherchons un designer créatif pour créer notre identité de marque et notre site vitrine corporate.

**Mission Design :**
- Logo professionnel (plusieurs propositions)
- Charte graphique complète
- Palette de couleurs
- Typographies
- Éléments graphiques (pictogrammes, patterns)
- Templates (carte de visite, papier à en-tête, PPT)
- Guide d'utilisation de la marque

**Mission Web :**
- Maquettes Figma du site (5-7 pages)
- Design système complet
- Animations et micro-interactions
- Version mobile + desktop

**Pages du site :**
- Accueil
- À propos
- Services
- Réalisations/Portfolio
- Blog
- Contact

Budget global incluant design + développement front-end du site (HTML/CSS/JS ou WordPress).`,
        excerpt: 'Création d\'identité visuelle complète (logo, charte graphique) + site vitrine corporate en Figma.',
        category: 'design',
        budget_value_cents: 850000, // 8 500€
        currency: 'EUR',
        location_data: {
          raw: 'Bordeaux, France',
          city: 'Bordeaux',
          country: 'France',
          remote_allowed: true
        },
        user_id: testUser.id,
        client_id: testUser.id,
        status: 'open' as const,
        urgency: 'low' as const,
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 jours
        tags: ['design', 'branding', 'logo', 'site-vitrine'],
        skills_required: ['Figma', 'Adobe Illustrator', 'Branding', 'UI/UX Design', 'HTML/CSS'],
        requirements: 'Portfolio créatif avec projets de branding corporate. Sensibilité design moderne.',
        is_team_mission: false,
        team_size: 1
      }
    ];

    // 3. Créer les missions
    console.log('\n📝 Création des missions...');
    let createdCount = 0;

    for (const missionData of newMissions) {
      try {
        const [createdMission] = await db
          .insert(missions)
          .values({
            ...missionData,
            created_at: new Date(),
            updated_at: new Date()
          })
          .returning();

        console.log(`✅ Mission créée: "${createdMission.title}" (ID: ${createdMission.id})`);
        console.log(`   Budget: ${(createdMission.budget_value_cents / 100).toLocaleString('fr-FR')}€`);
        console.log(`   Catégorie: ${createdMission.category}`);
        console.log(`   Urgence: ${createdMission.urgency}`);
        createdCount++;
      } catch (error) {
        console.error(`❌ Erreur création mission "${missionData.title}":`, error);
      }
    }

    // 4. Récapitulatif final
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 RÉCAPITULATIF');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`👤 Utilisateur: ${testUser.name} (${testUser.email})`);
    console.log(`✅ Missions créées: ${createdCount}/${newMissions.length}`);
    console.log(`💰 Budget total: ${newMissions.reduce((sum, m) => sum + m.budget_value_cents, 0) / 100} €`);
    console.log('\n🔗 Accès:');
    console.log('   Mes missions: https://swideal.com/missions');
    console.log('   Marketplace: https://swideal.com/marketplace');
    console.log('   Feed: https://swideal.com/');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des missions:', error);
    throw error;
  }
}

// Exécution du script
addMissionsToTestUser()
  .then(() => {
    console.log('\n✅ Script terminé avec succès !');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Échec du script:', error);
    process.exit(1);
  });

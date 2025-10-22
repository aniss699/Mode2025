
import { db } from '../server/database.js';
import { missions, users } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function createCompleteTestMissions() {
  console.log('🚀 Création de missions de test complètes...\n');

  try {
    // 1. Récupérer l'utilisateur test
    const [testUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, 'test@swideal.com'))
      .limit(1);

    if (!testUser) {
      console.error('❌ Utilisateur test@swideal.com non trouvé');
      console.log('💡 Créez d\'abord l\'utilisateur avec: npx tsx scripts/complete-test-user-profile.ts');
      process.exit(1);
    }

    console.log(`✅ Utilisateur trouvé: ${testUser.name} (ID: ${testUser.id})\n`);

    // 2. Supprimer les anciennes missions de test
    const deleted = await db
      .delete(missions)
      .where(eq(missions.user_id, testUser.id))
      .returning();

    if (deleted.length > 0) {
      console.log(`🗑️  ${deleted.length} anciennes missions supprimées\n`);
    }

    // 3. Définir les nouvelles missions complètes
    const testMissions = [
      {
        title: 'Développement application mobile e-commerce React Native',
        description: `Nous recherchons un développeur mobile expérimenté pour créer une application e-commerce complète.

**Fonctionnalités principales :**
- Catalogue produits avec recherche et filtres
- Panier et checkout avec Stripe
- Authentification (email, Google, Apple)
- Profil utilisateur et historique commandes
- Notifications push
- Mode hors ligne
- Tracking livraison en temps réel

**Stack technique :**
- React Native avec TypeScript
- Backend Node.js/Express
- PostgreSQL
- Firebase (notifications, analytics)
- Stripe (paiement)

**Livrables :**
- Applications iOS et Android
- Backend API REST
- Documentation technique
- Tests unitaires et d'intégration
- Déploiement sur stores

Délai : 3-4 mois en sprints agiles de 2 semaines.`,
        excerpt: 'Application mobile e-commerce en React Native avec paiement Stripe, notifications push et mode hors ligne.',
        category: 'developpement',
        budget_value_cents: 4500000,
        currency: 'EUR',
        location_data: {
          raw: 'Paris, France',
          city: 'Paris',
          country: 'France',
          remote_allowed: true
        },
        user_id: testUser.id,
        client_id: testUser.id,
        status: 'open',
        urgency: 'high',
        deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
        tags: ['react-native', 'mobile', 'e-commerce', 'stripe', 'typescript'],
        skills_required: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'Firebase', 'Stripe'],
        requirements: 'Minimum 3 ans d\'expérience en développement mobile. Portfolio avec apps e-commerce requis.',
        is_team_mission: false,
        team_size: 1,
        team_requirements: null
      },
      {
        title: 'Plateforme SaaS de gestion RH complète',
        description: `Création d'une plateforme SaaS B2B pour la gestion des ressources humaines des PME.

**Modules principaux :**
- Gestion employés (profils, contrats, documents)
- Suivi temps de travail et absences
- Notes de frais avec OCR
- Évaluations de performance
- Formation et onboarding
- Analytics et tableaux de bord
- Exports comptables

**Architecture :**
- Frontend : React/Next.js, TypeScript, TailwindCSS
- Backend : Node.js/NestJS
- Base de données : PostgreSQL
- Cache : Redis
- Storage : AWS S3
- Auth : Auth0 ou NextAuth
- Multi-tenant avec isolation des données

**Sécurité :**
- RGPD compliant
- Chiffrement des données sensibles
- Audit logs
- Backups automatiques

Budget incluant 6 mois de développement + 3 mois de support post-lancement.`,
        excerpt: 'Plateforme SaaS RH multi-tenant avec gestion employés, temps, notes de frais et analytics.',
        category: 'developpement',
        budget_value_cents: 8500000,
        currency: 'EUR',
        location_data: {
          raw: 'Lyon, France',
          city: 'Lyon',
          country: 'France',
          remote_allowed: true
        },
        user_id: testUser.id,
        client_id: testUser.id,
        status: 'open',
        urgency: 'medium',
        deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        tags: ['saas', 'rh', 'b2b', 'nextjs', 'nestjs', 'postgresql'],
        skills_required: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS'],
        requirements: 'Expérience SaaS B2B obligatoire. Architecture multi-tenant. Références vérifiables.',
        is_team_mission: true,
        team_size: 3,
        team_requirements: {
          roles: ['lead-developer', 'frontend-developer', 'backend-developer'],
          skills: ['Next.js', 'NestJS', 'PostgreSQL', 'Architecture SaaS'],
          experience_years: 5
        }
      },
      {
        title: 'Refonte UI/UX site e-commerce Shopify',
        description: `Refonte complète du design et de l'expérience utilisateur de notre boutique Shopify.

**Objectifs :**
- Augmenter le taux de conversion de 30%
- Réduire le taux d'abandon panier
- Améliorer la navigation mobile
- Optimiser le SEO

**Livrables design :**
- Audit UX actuel avec recommandations
- Wireframes basse fidélité
- Maquettes Figma haute fidélité (desktop, tablet, mobile)
- Design system complet
- Prototype interactif

**Développement Shopify :**
- Thème custom Liquid
- Animations et micro-interactions
- Optimisation performance (Lighthouse 90+)
- Intégrations : Klaviyo, Judge.me, Yotpo
- Configuration collections et filtres avancés
- Page builder personnalisé

**SEO :**
- Structure SEO optimisée
- Meta tags dynamiques
- Schema markup
- Sitemap XML

Environ 200 produits sur 12 catégories. Formation à l'administration incluse.`,
        excerpt: 'Refonte complète Shopify : audit UX, design Figma, développement thème custom et optimisation SEO.',
        category: 'design',
        budget_value_cents: 1800000,
        currency: 'EUR',
        location_data: {
          raw: 'Remote',
          city: null,
          country: 'France',
          remote_allowed: true
        },
        user_id: testUser.id,
        client_id: testUser.id,
        status: 'open',
        urgency: 'high',
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        tags: ['shopify', 'ui-ux', 'e-commerce', 'figma', 'seo'],
        skills_required: ['Shopify', 'Figma', 'UI/UX Design', 'Liquid', 'SEO'],
        requirements: 'Portfolio e-commerce obligatoire. Expertise Shopify Plus appréciée. Maîtrise Figma et principes UX.',
        is_team_mission: false,
        team_size: 1,
        team_requirements: null
      },
      {
        title: 'Dashboard analytics temps réel avec D3.js',
        description: `Création d'un tableau de bord analytics avancé pour visualiser nos données business en temps réel.

**Fonctionnalités :**
- Visualisations interactives (graphiques, cartes, heatmaps)
- Mise à jour temps réel via WebSocket
- Filtres dynamiques multi-critères
- Drill-down sur les données
- Exports (PDF, Excel, CSV)
- Alertes personnalisables
- Mode sombre/clair
- Responsive design

**Visualisations :**
- KPIs business (CA, conversions, utilisateurs)
- Graphiques temporels (séries, tendances)
- Cartes géographiques interactives
- Funnels de conversion
- Matrices de corrélation
- Prédictions ML

**Stack technique :**
- Frontend : React + TypeScript + D3.js/Recharts
- Backend : Node.js + Express
- Real-time : Socket.io
- Data : PostgreSQL + Redis
- Infrastructure : Docker + Kubernetes

**Performance :**
- Gestion 50k+ points de données
- Latence < 200ms
- Optimisation mémoire

Le système doit être scalable et maintenable.`,
        excerpt: 'Dashboard analytics temps réel avec D3.js, WebSocket, filtres dynamiques et exports multi-formats.',
        category: 'developpement',
        budget_value_cents: 3200000,
        currency: 'EUR',
        location_data: {
          raw: 'Marseille, France',
          city: 'Marseille',
          country: 'France',
          remote_allowed: false
        },
        user_id: testUser.id,
        client_id: testUser.id,
        status: 'open',
        urgency: 'medium',
        deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        tags: ['dashboard', 'analytics', 'd3js', 'real-time', 'data-viz'],
        skills_required: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Node.js', 'PostgreSQL'],
        requirements: 'Expertise data visualization obligatoire. Expérience temps réel. Portfolio avec dashboards complexes.',
        is_team_mission: false,
        team_size: 1,
        team_requirements: null
      },
      {
        title: 'Application livraison à domicile (client + livreur)',
        description: `Développement complet d'une application de livraison à domicile type Uber Eats.

**Applications mobiles :**
- App Client (iOS + Android)
  - Recherche restaurants/commerces
  - Panier et commande
  - Paiement (CB, Apple/Google Pay)
  - Tracking temps réel
  - Historique et favoris
  
- App Livreur (iOS + Android)
  - Acceptation courses
  - Navigation GPS
  - Scan QR codes
  - Gestion revenus

**Backend :**
- API REST Node.js/Express
- Géolocalisation temps réel
- Matching intelligent livreur-commande
- Gestion paiements (Stripe Connect)
- Notifications push (Firebase)
- Analytics

**Admin web :**
- Dashboard restaurateurs
- Gestion livreurs
- Statistiques temps réel
- Gestion litiges

**Technologies :**
- React Native + TypeScript
- Node.js + Express
- PostgreSQL + Redis
- Google Maps API
- Stripe Connect
- Firebase Cloud Messaging

Projet sur 5 mois avec releases progressives.`,
        excerpt: 'Application livraison complète : app client, app livreur, backend géolocalisation temps réel et paiements.',
        category: 'developpement',
        budget_value_cents: 6500000,
        currency: 'EUR',
        location_data: {
          raw: 'Bordeaux, France',
          city: 'Bordeaux',
          country: 'France',
          remote_allowed: true
        },
        user_id: testUser.id,
        client_id: testUser.id,
        status: 'open',
        urgency: 'high',
        deadline: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000),
        tags: ['mobile', 'livraison', 'react-native', 'geolocalisation', 'temps-reel'],
        skills_required: ['React Native', 'Node.js', 'PostgreSQL', 'Google Maps API', 'Stripe', 'Firebase'],
        requirements: 'Expérience marketplace ou livraison obligatoire. Apps publiées sur stores. Maîtrise géolocalisation.',
        is_team_mission: true,
        team_size: 4,
        team_requirements: {
          roles: ['tech-lead', 'mobile-developer', 'backend-developer', 'devops'],
          skills: ['React Native', 'Node.js', 'Architecture microservices'],
          experience_years: 4
        }
      },
      {
        title: 'Identité visuelle complète + site vitrine corporate',
        description: `Création de l'identité de marque complète et site vitrine pour startup tech B2B.

**Branding :**
- Audit de positionnement
- Naming (si besoin)
- Logo principal + déclinaisons
- Charte graphique complète
- Palette de couleurs
- Typographies corporate
- Iconographie personnalisée
- Patterns et textures
- Templates (PPT, docs, cartes visite)
- Brand guidelines (50+ pages)

**Design web :**
- Architecture de l'information
- Wireframes UX
- Maquettes Figma (6-8 pages)
- Design system complet
- Animations et micro-interactions
- Version mobile + desktop + tablet

**Pages site :**
- Home avec vidéo hero
- À propos / Notre histoire
- Services / Offres
- Cas clients / Portfolio
- Équipe
- Blog (template articles)
- Contact avec formulaire

**Développement :**
- Next.js + TypeScript
- TailwindCSS
- Animations Framer Motion
- SEO optimisé
- Lighthouse 95+
- CMS headless (Strapi ou Sanity)

Délai : 2 mois (1 mois branding + 1 mois web)`,
        excerpt: 'Identité visuelle corporate complète + site vitrine Next.js avec animations et CMS headless.',
        category: 'design',
        budget_value_cents: 2200000,
        currency: 'EUR',
        location_data: {
          raw: 'Toulouse, France',
          city: 'Toulouse',
          country: 'France',
          remote_allowed: true
        },
        user_id: testUser.id,
        client_id: testUser.id,
        status: 'open',
        urgency: 'low',
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        tags: ['branding', 'design', 'nextjs', 'site-vitrine', 'identite-visuelle'],
        skills_required: ['Branding', 'Figma', 'UI/UX Design', 'Next.js', 'TailwindCSS'],
        requirements: 'Portfolio branding B2B tech obligatoire. Expertise design corporate. Capacité à conceptualiser une identité forte.',
        is_team_mission: false,
        team_size: 1,
        team_requirements: null
      }
    ];

    // 4. Créer les missions
    console.log('📝 Création des missions...\n');
    const created = [];

    for (const missionData of testMissions) {
      try {
        const [mission] = await db
          .insert(missions)
          .values({
            ...missionData,
            created_at: new Date(),
            updated_at: new Date()
          })
          .returning();

        created.push(mission);
        
        const budget = (mission.budget_value_cents / 100).toLocaleString('fr-FR');
        console.log(`✅ Mission ${mission.id}: "${mission.title}"`);
        console.log(`   💰 Budget: ${budget}€`);
        console.log(`   📍 Lieu: ${mission.location_data.raw}`);
        console.log(`   ⏱️  Urgence: ${mission.urgency}`);
        console.log(`   👥 Équipe: ${mission.is_team_mission ? `Oui (${mission.team_size} membres)` : 'Non (solo)'}`);
        console.log('');
      } catch (error: any) {
        console.error(`❌ Erreur mission "${missionData.title}":`, error.message);
      }
    }

    // 5. Récapitulatif
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 RÉCAPITULATIF');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`👤 Utilisateur: ${testUser.name} (${testUser.email})`);
    console.log(`✅ Missions créées: ${created.length}/${testMissions.length}`);
    
    const totalBudget = created.reduce((sum, m) => sum + m.budget_value_cents, 0) / 100;
    console.log(`💰 Budget total: ${totalBudget.toLocaleString('fr-FR')}€`);
    
    const teamMissions = created.filter(m => m.is_team_mission).length;
    console.log(`👥 Missions équipe: ${teamMissions}`);
    console.log(`👤 Missions solo: ${created.length - teamMissions}`);
    
    console.log('\n🔗 Accès:');
    console.log(`   Login: https://swideal.com/login`);
    console.log(`   Email: test@swideal.com`);
    console.log(`   Password: test123`);
    console.log(`   Mes missions: https://swideal.com/missions`);
    console.log(`   Marketplace: https://swideal.com/marketplace`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error: any) {
    console.error('❌ Erreur:', error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

createCompleteTestMissions()
  .then(() => {
    console.log('✅ Missions de test créées avec succès !');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Échec:', error);
    process.exit(1);
  });

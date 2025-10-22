
import { db } from '../server/database.js';
import { users, missions } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function createTestProfileAndMissions() {
  console.log('🚀 Création du profil test@swideal.com...');

  try {
    // 1. Vérifier si l'utilisateur existe déjà
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, 'test@swideal.com'))
      .limit(1);

    let userId: number;

    if (existingUser.length > 0) {
      console.log('✅ Utilisateur test@swideal.com existe déjà (ID:', existingUser[0].id, ')');
      userId = existingUser[0].id;

      // Mettre à jour le profil avec des données complètes
      await db
        .update(users)
        .set({
          name: 'Jean Dupont',
          password: 'test123',
          role: 'CLIENT',
          profile_data: {
            phone: '+33 6 12 34 56 78',
            location: 'Paris, France',
            bio: 'Entrepreneur passionné par l\'innovation et la transformation digitale. Je recherche des prestataires de qualité pour accompagner mes projets.',
            company: 'TechStart Innovations',
            industry: 'Tech / SaaS',
            keywords: ['innovation', 'digital', 'startup', 'tech'],
            availability: true
          },
          updated_at: new Date()
        })
        .where(eq(users.id, userId));

      console.log('✅ Profil mis à jour avec des données complètes');
    } else {
      // Créer le nouvel utilisateur
      const [newUser] = await db
        .insert(users)
        .values({
          email: 'test@swideal.com',
          password: 'test123',
          name: 'Jean Dupont',
          role: 'CLIENT',
          rating_mean: '0',
          rating_count: 0,
          profile_data: {
            phone: '+33 6 12 34 56 78',
            location: 'Paris, France',
            bio: 'Entrepreneur passionné par l\'innovation et la transformation digitale. Je recherche des prestataires de qualité pour accompagner mes projets.',
            company: 'TechStart Innovations',
            industry: 'Tech / SaaS',
            keywords: ['innovation', 'digital', 'startup', 'tech'],
            availability: true
          },
          created_at: new Date(),
          updated_at: new Date()
        })
        .returning();

      userId = newUser.id;
      console.log('✅ Nouveau profil créé avec ID:', userId);
    }

    // 2. Créer la première mission - Application mobile e-commerce
    const mission1 = {
      title: 'Développement d\'une application mobile e-commerce iOS et Android',
      description: `Nous recherchons une équipe expérimentée pour développer une application mobile native pour notre plateforme e-commerce.

**Contexte du projet :**
Notre entreprise souhaite lancer une application mobile pour compléter notre site web existant. L'application doit offrir une expérience utilisateur fluide et moderne.

**Fonctionnalités principales :**
- Catalogue de produits avec recherche et filtres avancés
- Panier d'achat et gestion des commandes
- Paiement sécurisé (Stripe, PayPal)
- Système de notifications push
- Suivi de livraison en temps réel
- Espace client personnalisé
- Programme de fidélité intégré

**Spécifications techniques :**
- Applications natives iOS (Swift) et Android (Kotlin)
- Backend API REST (Node.js ou Python)
- Base de données PostgreSQL
- Intégration avec notre CMS existant
- Tests automatisés et CI/CD

**Livrables attendus :**
- Code source complet et documenté
- Applications déployées sur App Store et Google Play
- Documentation technique et d'utilisation
- Formation de l'équipe interne

**Profil recherché :**
- Développeurs mobile senior (iOS et Android)
- Développeur backend
- Designer UX/UI
- Chef de projet technique`,
      excerpt: 'Développement d\'une application mobile e-commerce native iOS et Android avec paiement sécurisé et suivi de livraison.',
      category: 'developpement',
      budget_value_cents: 3500000, // 35 000€
      currency: 'EUR',
      location_data: {
        raw: 'Paris, France',
        city: 'Paris',
        country: 'France',
        remote_allowed: true
      },
      user_id: userId,
      client_id: userId,
      status: 'open' as const,
      urgency: 'high' as const,
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 jours
      tags: ['mobile', 'e-commerce', 'iOS', 'Android', 'React Native'],
      skills_required: ['React Native', 'iOS', 'Android', 'Node.js', 'PostgreSQL', 'API REST', 'UX/UI'],
      requirements: 'Expérience avec des projets e-commerce similaires. Portfolio obligatoire.',
      is_team_mission: false,
      team_size: 1,
      created_at: new Date(),
      updated_at: new Date()
    };

    const [createdMission1] = await db.insert(missions).values(mission1).returning();
    console.log('✅ Mission 1 créée - Application mobile e-commerce (ID:', createdMission1.id, ')');

    // 3. Créer la deuxième mission - Site vitrine entreprise
    const mission2 = {
      title: 'Refonte complète du site vitrine corporate avec espace presse',
      description: `Refonte totale de notre site internet corporate pour moderniser notre image de marque et améliorer l'expérience utilisateur.

**Objectifs du projet :**
Notre site actuel est obsolète et ne reflète plus notre positionnement. Nous souhaitons une refonte complète avec une identité visuelle moderne et professionnelle.

**Pages et sections :**
- Page d'accueil dynamique avec animations
- Présentation de l'entreprise (histoire, valeurs, équipe)
- Nos services et solutions
- Portfolio de réalisations clients
- Espace presse avec communiqués et médias
- Blog / actualités
- Page carrières avec offres d'emploi
- Formulaires de contact et devis
- Espace client sécurisé

**Caractéristiques techniques :**
- Design responsive (mobile, tablette, desktop)
- Performance optimale (temps de chargement < 2s)
- SEO avancé et multilingue (FR/EN)
- CMS headless (Strapi ou Contentful)
- Frontend moderne (Next.js ou Nuxt.js)
- Animations fluides et interactives
- Accessibilité WCAG 2.1 niveau AA
- Intégration Google Analytics et tag manager

**Livrables :**
- Maquettes Figma validées
- Site web complet développé et testé
- CMS configuré et documenté
- Formation à la gestion du contenu
- Documentation technique complète
- Support 3 mois post-livraison

**Profil idéal :**
- Designer UX/UI expérimenté
- Développeur front-end senior (React/Vue)
- Développeur back-end
- Expert SEO`,
      excerpt: 'Refonte complète d\'un site corporate moderne avec CMS headless, multilingue et optimisé SEO.',
      category: 'developpement',
      budget_value_cents: 1800000, // 18 000€
      currency: 'EUR',
      location_data: {
        raw: 'Lyon, France',
        city: 'Lyon',
        country: 'France',
        remote_allowed: true
      },
      user_id: userId,
      client_id: userId,
      status: 'open' as const,
      urgency: 'medium' as const,
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 jours
      tags: ['web', 'design', 'SEO', 'CMS', 'corporate'],
      skills_required: ['Next.js', 'React', 'Strapi', 'Figma', 'SEO', 'TypeScript', 'Tailwind CSS'],
      requirements: 'Portfolio avec sites corporate similaires. Maîtrise du SEO et de l\'accessibilité.',
      is_team_mission: false,
      team_size: 1,
      created_at: new Date(),
      updated_at: new Date()
    };

    const [createdMission2] = await db.insert(missions).values(mission2).returning();
    console.log('✅ Mission 2 créée - Site vitrine corporate (ID:', createdMission2.id, ')');

    // 4. Récapitulatif
    console.log('\n📊 RÉCAPITULATIF :');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 Profil créé/mis à jour :');
    console.log('   Email: test@swideal.com');
    console.log('   Mot de passe: test123');
    console.log('   Nom: Jean Dupont');
    console.log('   Entreprise: TechStart Innovations');
    console.log('   Localisation: Paris, France');
    console.log('   ID utilisateur:', userId);
    console.log('\n📋 Missions créées :');
    console.log('   1. Application mobile e-commerce (ID:', createdMission1.id, ')');
    console.log('      Budget: 35 000€ | Urgence: Haute | Délai: 90 jours');
    console.log('   2. Site vitrine corporate (ID:', createdMission2.id, ')');
    console.log('      Budget: 18 000€ | Urgence: Moyenne | Délai: 60 jours');
    console.log('\n🔗 Accès :');
    console.log('   Connexion: https://swideal.com/login');
    console.log('   Missions: https://swideal.com/missions');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return { userId, missions: [createdMission1, createdMission2] };
  } catch (error) {
    console.error('❌ Erreur lors de la création:', error);
    throw error;
  }
}

// Exécution du script
createTestProfileAndMissions()
  .then(() => {
    console.log('\n✅ Script terminé avec succès !');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Échec du script:', error);
    process.exit(1);
  });

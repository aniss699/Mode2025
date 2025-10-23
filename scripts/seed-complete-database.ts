
import { db } from '../server/database.js';
import { 
  users, 
  missions, 
  bids, 
  announcements,
  wardrobeItems,
  outfits,
  outfitItems,
  outfitLikes,
  outfitComments,
  follows,
  wardrobeCollections,
  feedPosts,
  favorites,
  feedSeen,
  feedFeedback
} from '../shared/schema.js';
import bcrypt from 'bcryptjs';

async function seedCompleteDatabase() {
  console.log('🌱 Démarrage du peuplement complet de la base de données...\n');

  try {
    // 1. CRÉER DES UTILISATEURS VARIÉS
    console.log('👥 Création des utilisateurs...');
    const hashedPassword = await bcrypt.hash('demo123', 10);
    
    const testUsers = [
      {
        email: 'sophie.martin@test.com',
        name: 'Sophie Martin',
        password: hashedPassword,
        role: 'CLIENT',
        username: 'sophiestyle',
        avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        bio: 'Designer passionnée de mode minimaliste et durable 🌿',
        style_tags: ['minimalist', 'sustainable', 'elegant'],
        favorite_colors: ['beige', 'blanc', 'noir'],
        favorite_brands: ['COS', 'Arket', 'Everlane'],
        is_verified: true,
        profile_data: { company: 'StyleCo', sector: 'Fashion' }
      },
      {
        email: 'marc.dubois@test.com',
        name: 'Marc Dubois',
        password: hashedPassword,
        role: 'PRO',
        username: 'marcdev',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        bio: 'Développeur full-stack spécialisé en React & Node.js 💻',
        is_verified: true,
        profile_data: {
          specialties: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
          hourly_rate: 75,
          availability: true,
          experience_years: 6
        }
      },
      {
        email: 'julie.laurent@test.com',
        name: 'Julie Laurent',
        password: hashedPassword,
        role: 'PRO',
        username: 'juliedesign',
        avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
        bio: 'UI/UX Designer & Brand Strategist 🎨',
        style_tags: ['creative', 'colorful', 'bohemian'],
        favorite_colors: ['rose', 'bleu', 'jaune'],
        is_verified: true,
        profile_data: {
          specialties: ['Figma', 'UI/UX', 'Branding', 'Illustration'],
          hourly_rate: 65,
          availability: true,
          experience_years: 4
        }
      },
      {
        email: 'thomas.bernard@test.com',
        name: 'Thomas Bernard',
        password: hashedPassword,
        role: 'CLIENT',
        username: 'thomasbiz',
        avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
        bio: 'Entrepreneur tech & innovation 🚀',
        profile_data: { company: 'TechStart', sector: 'SaaS' }
      },
      {
        email: 'emma.rousseau@test.com',
        name: 'Emma Rousseau',
        password: hashedPassword,
        role: 'PRO',
        username: 'emmacode',
        avatar_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
        bio: 'Développeuse mobile React Native & Flutter 📱',
        style_tags: ['sporty', 'casual', 'streetwear'],
        is_verified: true,
        profile_data: {
          specialties: ['React Native', 'Flutter', 'Firebase', 'Mobile UX'],
          hourly_rate: 70,
          availability: true,
          experience_years: 5
        }
      },
      {
        email: 'lucas.petit@test.com',
        name: 'Lucas Petit',
        password: hashedPassword,
        role: 'CLIENT',
        username: 'lucasfashion',
        avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
        bio: 'Fashion enthusiast & trendsetter ✨',
        style_tags: ['streetwear', 'vintage', 'urban'],
        favorite_colors: ['noir', 'gris', 'kaki'],
        favorite_brands: ['Supreme', 'Stüssy', 'Nike'],
        followers_count: 2500,
        posts_count: 145
      },
      {
        email: 'chloe.moreau@test.com',
        name: 'Chloé Moreau',
        password: hashedPassword,
        role: 'PRO',
        username: 'chloemark',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
        bio: 'Marketing digital & Content Creator 📈',
        style_tags: ['elegant', 'classic', 'timeless'],
        is_verified: true,
        profile_data: {
          specialties: ['SEO', 'Content Marketing', 'Social Media', 'Analytics'],
          hourly_rate: 60,
          availability: true,
          experience_years: 3
        }
      }
    ];

    const createdUsers = await db.insert(users).values(testUsers).returning();
    console.log(`✅ ${createdUsers.length} utilisateurs créés\n`);

    // 2. CRÉER DES MISSIONS
    console.log('📝 Création des missions...');
    const testMissions = [
      {
        title: 'Application mobile de fitness avec tracking GPS',
        description: `Recherche développeur mobile pour créer une app de fitness complète.

**Fonctionnalités:**
- Tracking GPS des runs/vélo
- Programmes d'entraînement personnalisés
- Statistiques et graphiques de progression
- Synchronisation cloud
- Notifications de motivation

**Stack:** React Native, Firebase, Google Maps API

Délai: 3 mois`,
        excerpt: 'App mobile fitness avec GPS, stats et programmes personnalisés',
        category: 'mobile-development',
        budget_value_cents: 3500000,
        currency: 'EUR',
        location_data: { raw: 'Paris, France', city: 'Paris', country: 'France', remote_allowed: true },
        user_id: createdUsers[0].id,
        client_id: createdUsers[0].id,
        status: 'open',
        urgency: 'high',
        deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        tags: ['mobile', 'fitness', 'react-native', 'gps'],
        skills_required: ['React Native', 'Firebase', 'Google Maps API'],
        is_team_mission: false,
        team_size: 1
      },
      {
        title: 'Refonte site e-commerce Shopify + optimisation SEO',
        description: `Refonte complète boutique en ligne avec focus performance et conversion.

**Objectifs:**
- Nouveau design moderne et responsive
- Optimisation SEO technique
- Amélioration vitesse de chargement
- Intégration Klaviyo pour emails
- A/B testing setup

**Délai:** 6 semaines`,
        excerpt: 'Refonte Shopify complète avec SEO et performance',
        category: 'web-development',
        budget_value_cents: 1800000,
        currency: 'EUR',
        location_data: { raw: 'Lyon, France', city: 'Lyon', country: 'France', remote_allowed: true },
        user_id: createdUsers[3].id,
        client_id: createdUsers[3].id,
        status: 'open',
        urgency: 'medium',
        deadline: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000),
        tags: ['shopify', 'e-commerce', 'seo', 'web'],
        skills_required: ['Shopify', 'SEO', 'Liquid', 'JavaScript'],
        is_team_mission: false,
        team_size: 1
      },
      {
        title: 'Dashboard analytics temps réel avec D3.js',
        description: `Création tableau de bord analytics avancé pour data business.

**Features:**
- Graphiques interactifs temps réel
- Filtres dynamiques
- Export PDF/Excel
- WebSocket updates
- Responsive design

**Stack:** React, D3.js, Node.js, PostgreSQL`,
        excerpt: 'Dashboard analytics temps réel avec visualisations D3.js',
        category: 'web-development',
        budget_value_cents: 2800000,
        currency: 'EUR',
        location_data: { raw: 'Bordeaux, France', city: 'Bordeaux', country: 'France', remote_allowed: false },
        user_id: createdUsers[3].id,
        client_id: createdUsers[3].id,
        status: 'open',
        urgency: 'high',
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        tags: ['dashboard', 'analytics', 'd3js', 'real-time'],
        skills_required: ['React', 'D3.js', 'WebSocket', 'PostgreSQL'],
        is_team_mission: false,
        team_size: 1
      },
      {
        title: 'Identité visuelle complète + site vitrine',
        description: `Création identité de marque et site corporate pour startup B2B.

**Branding:**
- Logo + déclinaisons
- Charte graphique
- Templates (PPT, cartes visite)

**Site web:**
- Maquettes Figma (6 pages)
- Développement Next.js
- Animations Framer Motion
- SEO optimisé`,
        excerpt: 'Identité visuelle + site Next.js pour startup B2B',
        category: 'design',
        budget_value_cents: 2200000,
        currency: 'EUR',
        location_data: { raw: 'Remote', city: null, country: 'France', remote_allowed: true },
        user_id: createdUsers[0].id,
        client_id: createdUsers[0].id,
        status: 'open',
        urgency: 'low',
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        tags: ['branding', 'design', 'nextjs', 'figma'],
        skills_required: ['Branding', 'Figma', 'Next.js', 'UI/UX'],
        is_team_mission: false,
        team_size: 1
      },
      {
        title: 'Plateforme marketplace multi-vendeurs',
        description: `Développement marketplace B2C avec gestion vendeurs.

**Fonctionnalités:**
- Espace vendeur avec dashboard
- Gestion produits et stocks
- Paiements multi-vendeurs (Stripe Connect)
- Système de reviews
- Chat vendeur-acheteur
- Panel admin complet

**Stack:** Next.js, NestJS, PostgreSQL, Redis

Budget pour équipe de 3 développeurs sur 4 mois.`,
        excerpt: 'Marketplace multi-vendeurs avec Stripe Connect',
        category: 'web-development',
        budget_value_cents: 7500000,
        currency: 'EUR',
        location_data: { raw: 'Marseille, France', city: 'Marseille', country: 'France', remote_allowed: true },
        user_id: createdUsers[3].id,
        client_id: createdUsers[3].id,
        status: 'open',
        urgency: 'high',
        deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
        tags: ['marketplace', 'saas', 'nextjs', 'stripe'],
        skills_required: ['Next.js', 'NestJS', 'PostgreSQL', 'Stripe'],
        is_team_mission: true,
        team_size: 3
      }
    ];

    const createdMissions = await db.insert(missions).values(testMissions).returning();
    console.log(`✅ ${createdMissions.length} missions créées\n`);

    // 3. CRÉER DES BIDS
    console.log('💰 Création des offres (bids)...');
    const testBids = [
      {
        mission_id: createdMissions[0].id,
        provider_id: createdUsers[4].id, // Emma (mobile dev)
        amount: 3200,
        timeline_days: 75,
        message: 'Bonjour, j\'ai 5 ans d\'expérience en React Native et j\'ai déjà développé 3 applications de fitness similaires. Je peux livrer en 10-11 semaines avec un suivi régulier.',
        status: 'pending',
        bid_type: 'individual'
      },
      {
        mission_id: createdMissions[0].id,
        provider_id: createdUsers[1].id, // Marc (full-stack)
        amount: 3800,
        timeline_days: 90,
        message: 'Expert en développement mobile, je propose une architecture scalable avec tests automatisés inclus.',
        status: 'pending',
        bid_type: 'individual'
      },
      {
        mission_id: createdMissions[1].id,
        provider_id: createdUsers[1].id, // Marc
        amount: 1650,
        timeline_days: 35,
        message: 'Spécialiste Shopify avec 15+ boutiques refondues. Portfolio disponible sur demande.',
        status: 'pending',
        bid_type: 'individual'
      },
      {
        mission_id: createdMissions[2].id,
        provider_id: createdUsers[1].id, // Marc
        amount: 2600,
        timeline_days: 50,
        message: 'Expert D3.js et data visualization. Je peux créer un dashboard performant et évolutif.',
        status: 'pending',
        bid_type: 'individual'
      },
      {
        mission_id: createdMissions[3].id,
        provider_id: createdUsers[2].id, // Julie (designer)
        amount: 2100,
        timeline_days: 40,
        message: 'Designer expérimentée en branding B2B tech. Je livre un package complet incluant tous les assets.',
        status: 'pending',
        bid_type: 'individual'
      },
      {
        mission_id: createdMissions[4].id,
        provider_id: createdUsers[1].id, // Marc (lead)
        amount: 7000,
        timeline_days: 100,
        message: 'Je propose une équipe de 3 développeurs seniors (front, back, fullstack) pour ce projet ambitieux. Méthodologie agile avec sprints de 2 semaines.',
        status: 'pending',
        bid_type: 'team'
      }
    ];

    const createdBids = await db.insert(bids).values(testBids).returning();
    console.log(`✅ ${createdBids.length} offres créées\n`);

    // 4. CRÉER DES ITEMS DE GARDE-ROBE
    console.log('👗 Création des items de garde-robe...');
    const wardrobeItemsData = [
      {
        user_id: createdUsers[0].id, // Sophie
        name: 'Blazer beige oversize',
        description: 'Blazer en lin mélangé, coupe oversize, parfait pour un look minimaliste',
        category: 'top',
        brand: 'COS',
        color: ['beige', 'naturel'],
        tags: ['minimalist', 'casual-chic', 'versatile'],
        image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=600&fit=crop',
        is_public: true
      },
      {
        user_id: createdUsers[0].id,
        name: 'Jean mom fit noir',
        description: 'Jean taille haute coupe mom, denim bio',
        category: 'bottom',
        brand: 'Everlane',
        color: ['noir'],
        tags: ['sustainable', 'classic', 'everyday'],
        image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop',
        is_public: true
      },
      {
        user_id: createdUsers[5].id, // Lucas
        name: 'Hoodie Supreme Box Logo',
        description: 'Sweat à capuche édition limitée',
        category: 'top',
        brand: 'Supreme',
        color: ['noir', 'rouge'],
        tags: ['streetwear', 'limited-edition', 'hype'],
        image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=600&fit=crop',
        is_public: true
      },
      {
        user_id: createdUsers[5].id,
        name: 'Nike Air Max 90 OG',
        description: 'Sneakers iconiques coloris blanc/rouge',
        category: 'shoes',
        brand: 'Nike',
        color: ['blanc', 'rouge'],
        tags: ['sneakers', 'streetwear', 'classic'],
        image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop',
        is_public: true
      },
      {
        user_id: createdUsers[6].id, // Chloé
        name: 'Robe midi plissée',
        description: 'Robe élégante plissée, parfaite pour événements',
        category: 'dress',
        brand: 'Sandro',
        color: ['bleu marine'],
        tags: ['elegant', 'classic', 'evening'],
        image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop',
        is_public: true
      }
    ];

    const createdWardrobeItems = await db.insert(wardrobeItems).values(wardrobeItemsData).returning();
    console.log(`✅ ${createdWardrobeItems.length} items de garde-robe créés\n`);

    // 5. CRÉER DES OUTFITS
    console.log('✨ Création des tenues (outfits)...');
    const outfitsData = [
      {
        user_id: createdUsers[0].id,
        title: 'Look casual chic weekend',
        description: 'Tenue confortable et élégante pour un brunch entre amis',
        occasion: 'casual',
        season: 'spring',
        tags: ['minimalist', 'casual-chic', 'weekend'],
        is_public: true
      },
      {
        user_id: createdUsers[5].id,
        title: 'Streetwear essentials',
        description: 'Look urbain avec pièces iconiques',
        occasion: 'casual',
        season: 'all-season',
        tags: ['streetwear', 'urban', 'hype'],
        is_public: true
      },
      {
        user_id: createdUsers[6].id,
        title: 'Soirée élégante',
        description: 'Tenue sophistiquée pour événement professionnel',
        occasion: 'formal',
        season: 'fall',
        tags: ['elegant', 'professional', 'evening'],
        is_public: true
      }
    ];

    const createdOutfits = await db.insert(outfits).values(outfitsData).returning();
    console.log(`✅ ${createdOutfits.length} tenues créées\n`);

    // 6. CRÉER DES FOLLOWS
    console.log('👥 Création des relations de suivi...');
    const followsData = [
      { follower_id: createdUsers[0].id, following_id: createdUsers[5].id },
      { follower_id: createdUsers[0].id, following_id: createdUsers[6].id },
      { follower_id: createdUsers[5].id, following_id: createdUsers[0].id },
      { follower_id: createdUsers[5].id, following_id: createdUsers[6].id },
      { follower_id: createdUsers[6].id, following_id: createdUsers[0].id },
      { follower_id: createdUsers[3].id, following_id: createdUsers[1].id },
      { follower_id: createdUsers[3].id, following_id: createdUsers[2].id }
    ];

    await db.insert(follows).values(followsData);
    console.log(`✅ ${followsData.length} relations de suivi créées\n`);

    // 7. CRÉER DES LIKES ET COMMENTAIRES
    console.log('❤️ Création des likes et commentaires...');
    const likesData = [
      { user_id: createdUsers[5].id, outfit_id: createdOutfits[0].id },
      { user_id: createdUsers[6].id, outfit_id: createdOutfits[0].id },
      { user_id: createdUsers[0].id, outfit_id: createdOutfits[1].id },
      { user_id: createdUsers[6].id, outfit_id: createdOutfits[1].id },
      { user_id: createdUsers[0].id, outfit_id: createdOutfits[2].id },
      { user_id: createdUsers[5].id, outfit_id: createdOutfits[2].id }
    ];

    await db.insert(outfitLikes).values(likesData);

    const commentsData = [
      {
        user_id: createdUsers[5].id,
        outfit_id: createdOutfits[0].id,
        content: 'J\'adore ce style minimaliste ! Très inspirant 🤍',
        likes_count: 2
      },
      {
        user_id: createdUsers[6].id,
        outfit_id: createdOutfits[1].id,
        content: 'Ces sneakers sont 🔥🔥🔥',
        likes_count: 3
      },
      {
        user_id: createdUsers[0].id,
        outfit_id: createdOutfits[2].id,
        content: 'Superbe look ! Où as-tu trouvé cette robe ?',
        likes_count: 1
      }
    ];

    await db.insert(outfitComments).values(commentsData);
    console.log(`✅ Likes et commentaires créés\n`);

    // 8. CRÉER DES ANNOUNCEMENTS/FEED POSTS
    console.log('📢 Création des annonces et posts...');
    const announcementsData = [
      {
        title: 'Nouveau développeur React disponible',
        content: 'Développeur full-stack avec 6 ans d\'expérience, spécialisé React/Node.js, cherche nouvelles missions. Portfolio sur demande.',
        type: 'service',
        category: 'developpement',
        user_id: createdUsers[1].id,
        is_active: true,
        status: 'active'
      },
      {
        title: 'Designer UI/UX disponible pour projets web',
        content: 'Expertise Figma, Branding, Design Systems. Disponible immédiatement pour collaborations.',
        type: 'service',
        category: 'design',
        user_id: createdUsers[2].id,
        is_active: true,
        status: 'active'
      },
      {
        title: 'Développeuse mobile React Native disponible',
        content: '5 ans d\'expérience apps iOS/Android. Spécialisée Firebase, animations, performance.',
        type: 'service',
        category: 'developpement',
        user_id: createdUsers[4].id,
        is_active: true,
        status: 'active'
      }
    ];

    await db.insert(announcements).values(announcementsData);
    console.log(`✅ ${announcementsData.length} annonces créées\n`);

    // RÉCAPITULATIF FINAL
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ PEUPLEMENT DE LA BASE DE DONNÉES TERMINÉ');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`👥 Utilisateurs: ${createdUsers.length}`);
    console.log(`📝 Missions: ${createdMissions.length}`);
    console.log(`💰 Offres (bids): ${createdBids.length}`);
    console.log(`👗 Items garde-robe: ${createdWardrobeItems.length}`);
    console.log(`✨ Tenues (outfits): ${createdOutfits.length}`);
    console.log(`🔗 Relations de suivi: ${followsData.length}`);
    console.log(`❤️ Likes: ${likesData.length}`);
    console.log(`💬 Commentaires: ${commentsData.length}`);
    console.log(`📢 Annonces: ${announcementsData.length}`);
    console.log('\n🔐 Identifiants de connexion:');
    console.log('   Email: sophie.martin@test.com');
    console.log('   Email: marc.dubois@test.com');
    console.log('   Email: julie.laurent@test.com');
    console.log('   Password (tous): demo123');
    console.log('\n🌐 Accès:');
    console.log('   Dashboard: https://swideal.com/dashboard');
    console.log('   Marketplace: https://swideal.com/marketplace');
    console.log('   Explore: https://swideal.com/explore');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error: any) {
    console.error('❌ Erreur lors du peuplement:', error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

// Exécution
seedCompleteDatabase()
  .then(() => {
    console.log('✨ Script terminé avec succès !');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Échec du script:', error);
    process.exit(1);
  });

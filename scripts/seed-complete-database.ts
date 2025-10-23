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
  follows
} from '../shared/schema.js';
import bcrypt from 'bcryptjs';

async function seedCompleteDatabase() {
  console.log('🌱 Démarrage du peuplement complet de la base de données...\n');

  try {
    // Vérifier la connexion
    console.log('🔗 Vérification de la connexion à la base de données...');
    await db.execute('SELECT 1');
    console.log('✅ Connexion établie\n');

    // NETTOYER LES DONNÉES EXISTANTES (dans l'ordre inverse des dépendances)
    console.log('🧹 Nettoyage des données existantes...');
    try {
      await db.delete(outfitComments);
      await db.delete(outfitLikes);
      await db.delete(outfitItems);
      await db.delete(follows);
      await db.delete(outfits);
      await db.delete(wardrobeItems);
      await db.delete(bids);
      await db.delete(announcements);
      await db.delete(missions);
      await db.delete(users);
      console.log('✅ Données nettoyées\n');
    } catch (error) {
      console.log('⚠️ Certaines tables n\'existent peut-être pas encore, on continue...\n');
    }

    // 1. CRÉER DES UTILISATEURS
    console.log('👥 Création des utilisateurs...');
    const hashedPassword = await bcrypt.hash('demo123', 10);

    const testUsers = [
      {
        email: 'sophie.martin@test.com',
        name: 'Sophie Martin',
        password: hashedPassword,
        role: 'CLIENT',
        username: 'sophiestyle',
        avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
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
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
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
        avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
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
        avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
        bio: 'Entrepreneur tech & innovation 🚀',
        profile_data: { company: 'TechStart', sector: 'SaaS' }
      },
      {
        email: 'emma.rousseau@test.com',
        name: 'Emma Rousseau',
        password: hashedPassword,
        role: 'PRO',
        username: 'emmacode',
        avatar_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200',
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
        avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
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
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
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
        description: 'Recherche développeur mobile pour créer une app de fitness complète avec tracking GPS, programmes personnalisés et statistiques.',
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
        description: 'Refonte complète boutique en ligne avec focus performance et conversion.',
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
      }
    ];

    const createdMissions = await db.insert(missions).values(testMissions).returning();
    console.log(`✅ ${createdMissions.length} missions créées\n`);

    // 3. CRÉER DES BIDS
    console.log('💰 Création des offres (bids)...');
    const testBids = [
      {
        mission_id: createdMissions[0].id,
        provider_id: createdUsers[4].id,
        amount: 3200,
        timeline_days: 75,
        message: 'Bonjour, j\'ai 5 ans d\'expérience en React Native et j\'ai déjà développé 3 applications de fitness similaires.',
        status: 'pending',
        bid_type: 'individual'
      },
      {
        mission_id: createdMissions[1].id,
        provider_id: createdUsers[1].id,
        amount: 1650,
        timeline_days: 35,
        message: 'Spécialiste Shopify avec 15+ boutiques refondues. Portfolio disponible sur demande.',
        status: 'pending',
        bid_type: 'individual'
      }
    ];

    const createdBids = await db.insert(bids).values(testBids).returning();
    console.log(`✅ ${createdBids.length} offres créées\n`);

    // 4. CRÉER DES FOLLOWS
    console.log('👥 Création des relations de suivi...');
    const followsData = [
      { follower_id: createdUsers[0].id, following_id: createdUsers[5].id },
      { follower_id: createdUsers[5].id, following_id: createdUsers[0].id },
      { follower_id: createdUsers[3].id, following_id: createdUsers[1].id }
    ];

    await db.insert(follows).values(followsData);
    console.log(`✅ ${followsData.length} relations de suivi créées\n`);

    // 5. CRÉER DES ANNONCES
    console.log('📢 Création des annonces...');
    const announcementsData = [
      {
        title: 'Nouveau développeur React disponible',
        content: 'Développeur full-stack avec 6 ans d\'expérience, spécialisé React/Node.js, cherche nouvelles missions.',
        type: 'service',
        category: 'developpement',
        user_id: createdUsers[1].id,
        is_active: true,
        status: 'active'
      },
      {
        title: 'Designer UI/UX disponible pour projets web',
        content: 'Expertise Figma, Branding, Design Systems. Disponible immédiatement.',
        type: 'service',
        category: 'design',
        user_id: createdUsers[2].id,
        is_active: true,
        status: 'active'
      }
    ];

    await db.insert(announcements).values(announcementsData);
    console.log(`✅ ${announcementsData.length} annonces créées\n`);

    // RÉCAPITULATIF
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ PEUPLEMENT TERMINÉ AVEC SUCCÈS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`👥 Utilisateurs: ${createdUsers.length}`);
    console.log(`📝 Missions: ${createdMissions.length}`);
    console.log(`💰 Offres: ${createdBids.length}`);
    console.log(`🔗 Relations: ${followsData.length}`);
    console.log(`📢 Annonces: ${announcementsData.length}`);
    console.log('\n🔐 Identifiants de connexion:');
    console.log('   Email: sophie.martin@test.com');
    console.log('   Email: marc.dubois@test.com');
    console.log('   Password: demo123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error: any) {
    console.error('❌ Erreur lors du peuplement:');
    console.error('Message:', error.message);
    if (error.code) console.error('Code:', error.code);
    if (error.detail) console.error('Détail:', error.detail);
    console.error('\nStack:', error.stack);
    process.exit(1);
  }
}

seedCompleteDatabase()
  .then(() => {
    console.log('✨ Script terminé avec succès !');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Échec du script:', error);
    process.exit(1);
  });
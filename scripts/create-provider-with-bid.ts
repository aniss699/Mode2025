
import { db } from '../server/database.js';
import { users, missions, bids } from '../shared/schema.js';
import { eq, desc } from 'drizzle-orm';

async function createProviderWithBid() {
  console.log('🚀 Création d\'un profil prestataire avec candidature...\n');

  try {
    // 1. Récupérer l'utilisateur test@swideal.com
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

    console.log(`✅ Client trouvé: ${testUser.name} (ID: ${testUser.id})\n`);

    // 2. Récupérer une mission ouverte du client test
    const [openMission] = await db
      .select()
      .from(missions)
      .where(eq(missions.user_id, testUser.id))
      .orderBy(desc(missions.created_at))
      .limit(1);

    if (!openMission) {
      console.error('❌ Aucune mission trouvée pour test@swideal.com');
      console.log('💡 Créez d\'abord des missions avec: npx tsx scripts/create-complete-test-missions.ts');
      process.exit(1);
    }

    console.log(`✅ Mission trouvée: "${openMission.title}" (ID: ${openMission.id})\n`);

    // 3. Créer un profil prestataire
    const providerEmail = 'provider@swideal.com';
    
    // Vérifier si le prestataire existe déjà
    const [existingProvider] = await db
      .select()
      .from(users)
      .where(eq(users.email, providerEmail))
      .limit(1);

    let provider;
    if (existingProvider) {
      console.log(`✅ Prestataire existant: ${existingProvider.name} (ID: ${existingProvider.id})`);
      provider = existingProvider;
    } else {
      // Créer le nouveau prestataire
      const [newProvider] = await db
        .insert(users)
        .values({
          email: providerEmail,
          password: 'provider123',
          name: 'Marie Martin',
          role: 'PRO',
          rating_mean: '4.8',
          rating_count: 15,
          profile_data: {
            phone: '+33 6 98 76 54 32',
            location: 'Lyon, France',
            bio: 'Développeuse Full-Stack avec 6 ans d\'expérience en React, Node.js et TypeScript. Spécialisée dans les applications web modernes, les architectures microservices et l\'optimisation des performances. J\'ai livré plus de 30 projets avec un taux de satisfaction client de 95%. Passionnée par le code propre et les bonnes pratiques, je m\'engage à fournir des solutions de qualité dans les délais impartis.',
            company: 'Marie Martin Dev',
            industry: 'Développement Web',
            experience: 'Senior Full-Stack Developer avec expertise React/Node.js - 6 ans d\'expérience',
            hourlyRate: '65',
            skills: [
              { name: 'React', hourlyRate: 70, category: 'Frontend' },
              { name: 'TypeScript', hourlyRate: 65, category: 'Frontend' },
              { name: 'Node.js', hourlyRate: 70, category: 'Backend' },
              { name: 'PostgreSQL', hourlyRate: 60, category: 'Database' },
              { name: 'Next.js', hourlyRate: 75, category: 'Frontend' },
              { name: 'Express', hourlyRate: 60, category: 'Backend' },
              { name: 'TailwindCSS', hourlyRate: 55, category: 'Frontend' }
            ],
            portfolio: [
              {
                title: 'Plateforme SaaS B2B',
                description: 'Développement complet d\'une plateforme SaaS pour la gestion de projets avec React, Node.js et PostgreSQL. +5000 utilisateurs actifs.'
              },
              {
                title: 'Application mobile e-commerce',
                description: 'Application React Native avec backend Node.js, paiement Stripe et synchronisation temps réel. 50k+ téléchargements.'
              },
              {
                title: 'Dashboard Analytics',
                description: 'Tableau de bord temps réel avec visualisations D3.js, WebSocket et optimisation des performances.'
              }
            ],
            availability: true,
            keywords: ['react', 'nodejs', 'typescript', 'fullstack', 'saas', 'web', 'mobile'],
            calendarAvailability: []
          },
          created_at: new Date(),
          updated_at: new Date()
        })
        .returning();

      provider = newProvider;
      console.log(`✅ Nouveau prestataire créé: ${provider.name} (ID: ${provider.id})\n`);
    }

    // 4. Vérifier si une candidature existe déjà
    const [existingBid] = await db
      .select()
      .from(bids)
      .where(eq(bids.mission_id, openMission.id))
      .limit(1);

    if (existingBid) {
      console.log(`⚠️  Une candidature existe déjà pour cette mission (ID: ${existingBid.id})`);
      console.log('Détails de la candidature existante:');
      console.log(`   - Prix: ${existingBid.price}€`);
      console.log(`   - Délai: ${existingBid.timeline_days || 'Non spécifié'} jours`);
      console.log(`   - Message: ${existingBid.message?.substring(0, 100)}...`);
    } else {
      // 5. Créer une candidature
      const bidPrice = Math.round(parseInt(openMission.price || '1000') * 0.85); // 85% du prix demandé
      const bidMessage = `Bonjour,

Je suis très intéressée par votre projet "${openMission.title}". Avec mes 6 ans d'expérience en développement Full-Stack, je pense être la personne idéale pour réaliser cette mission.

**Mon approche :**
- Phase 1: Analyse détaillée des besoins et maquettes (1 semaine)
- Phase 2: Développement itératif avec livraisons hebdomadaires (3 semaines)
- Phase 3: Tests, optimisation et mise en production (1 semaine)

**Ce que je propose :**
✅ Code propre et documenté
✅ Tests unitaires et d'intégration
✅ Architecture scalable
✅ Support post-livraison de 30 jours
✅ Formation à l'utilisation

**Technologies :**
React, TypeScript, Node.js, PostgreSQL, TailwindCSS

Je suis disponible immédiatement et je m'engage à livrer un produit de qualité dans les délais impartis.

N'hésitez pas à consulter mon portfolio pour voir mes réalisations précédentes.

Cordialement,
Marie Martin`;

      const [newBid] = await db
        .insert(bids)
        .values({
          mission_id: openMission.id,
          provider_id: provider.id,
          price: bidPrice.toString(),
          timeline_days: 35,
          message: bidMessage,
          status: 'pending',
          bid_type: 'individual',
          created_at: new Date(),
          updated_at: new Date()
        })
        .returning();

      console.log('✅ Candidature créée avec succès!\n');
      console.log('📋 Détails de la candidature:');
      console.log(`   - ID: ${newBid.id}`);
      console.log(`   - Prix proposé: ${newBid.price}€`);
      console.log(`   - Prix demandé: ${openMission.price}€`);
      console.log(`   - Économie: ${parseInt(openMission.price || '0') - bidPrice}€`);
      console.log(`   - Délai: ${newBid.timeline_days} jours`);
      console.log(`   - Statut: ${newBid.status}`);
    }

    // 6. Récapitulatif final
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 RÉCAPITULATIF');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 CLIENT:');
    console.log(`   Nom: ${testUser.name}`);
    console.log(`   Email: ${testUser.email}`);
    console.log(`   ID: ${testUser.id}`);
    console.log('');
    console.log('👨‍💼 PRESTATAIRE:');
    console.log(`   Nom: ${provider.name}`);
    console.log(`   Email: ${provider.email}`);
    console.log(`   ID: ${provider.id}`);
    console.log(`   Rating: ${provider.rating_mean}⭐ (${provider.rating_count} avis)`);
    console.log('');
    console.log('📝 MISSION:');
    console.log(`   Titre: ${openMission.title}`);
    console.log(`   ID: ${openMission.id}`);
    console.log(`   Prix: ${openMission.price}€`);
    console.log(`   Catégorie: ${openMission.category}`);
    console.log('');
    console.log('🔗 ACCÈS:');
    console.log('   Client - Login: https://swideal.com/login');
    console.log(`   Email: ${testUser.email} | Password: test123`);
    console.log('');
    console.log('   Prestataire - Login: https://swideal.com/login');
    console.log(`   Email: ${provider.email} | Password: provider123`);
    console.log('');
    console.log('   Mission: https://swideal.com/missions/' + openMission.id);
    console.log('   Mes missions (client): https://swideal.com/missions');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  } catch (error: any) {
    console.error('❌ Erreur lors de la création:', error);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}

// Exécution du script
createProviderWithBid()
  .then(() => {
    console.log('\n✅ Script terminé avec succès !');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Échec du script:', error);
    process.exit(1);
  });

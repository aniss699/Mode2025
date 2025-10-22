
import { Pool } from 'pg';

async function checkProductionMissions() {
  console.log('🔍 Vérification des missions en production');
  console.log('==========================================\n');

  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL non configuré');
    process.exit(1);
  }

  console.log('📊 Connexion à:', databaseUrl.substring(0, 30) + '...');

  const pool = new Pool({
    connectionString: databaseUrl,
    connectionTimeoutMillis: 5000,
    ssl: databaseUrl.includes('neon.tech') ? { rejectUnauthorized: false } : undefined
  });

  try {
    // Test de connexion
    await pool.query('SELECT NOW()');
    console.log('✅ Connexion établie\n');

    // Compter le total de missions
    const countResult = await pool.query('SELECT COUNT(*) as total FROM missions');
    const totalMissions = parseInt(countResult.rows[0]?.total || '0');
    console.log(`📊 Total missions: ${totalMissions}\n`);

    if (totalMissions === 0) {
      console.log('⚠️  Aucune mission trouvée dans la base de données');
      return;
    }

    // Missions par statut
    const statusResult = await pool.query(`
      SELECT status, COUNT(*) as count 
      FROM missions 
      GROUP BY status 
      ORDER BY count DESC
    `);
    
    console.log('📈 Missions par statut:');
    statusResult.rows.forEach(row => {
      console.log(`   - ${row.status}: ${row.count}`);
    });
    console.log('');

    // Missions récentes (dernières 10)
    const recentResult = await pool.query(`
      SELECT 
        id, 
        title, 
        status, 
        budget_value_cents,
        user_id,
        created_at
      FROM missions 
      ORDER BY created_at DESC 
      LIMIT 10
    `);

    console.log('🕒 Dernières missions créées:');
    recentResult.rows.forEach((mission, index) => {
      const budget = mission.budget_value_cents 
        ? `${(mission.budget_value_cents / 100).toFixed(2)}€`
        : 'Non défini';
      const date = new Date(mission.created_at).toLocaleString('fr-FR');
      
      console.log(`\n   ${index + 1}. ID: ${mission.id}`);
      console.log(`      Titre: ${mission.title}`);
      console.log(`      Statut: ${mission.status}`);
      console.log(`      Budget: ${budget}`);
      console.log(`      User ID: ${mission.user_id}`);
      console.log(`      Créée le: ${date}`);
    });

    // Missions avec le plus d'offres
    const bidsResult = await pool.query(`
      SELECT 
        m.id, 
        m.title, 
        COUNT(b.id) as bid_count
      FROM missions m
      LEFT JOIN bids b ON m.id = b.mission_id
      GROUP BY m.id, m.title
      HAVING COUNT(b.id) > 0
      ORDER BY bid_count DESC
      LIMIT 5
    `);

    if (bidsResult.rows.length > 0) {
      console.log('\n\n💼 Missions avec des offres:');
      bidsResult.rows.forEach((mission, index) => {
        console.log(`   ${index + 1}. ${mission.title} - ${mission.bid_count} offre(s)`);
      });
    }

    // Vérifier la cohérence des données
    console.log('\n\n🔍 Vérification de cohérence:');
    
    const orphanCheck = await pool.query(`
      SELECT COUNT(*) as count 
      FROM missions m 
      LEFT JOIN users u ON m.user_id = u.id 
      WHERE u.id IS NULL
    `);
    
    const orphanCount = parseInt(orphanCheck.rows[0]?.count || '0');
    if (orphanCount > 0) {
      console.log(`   ⚠️  ${orphanCount} mission(s) avec user_id invalide`);
    } else {
      console.log('   ✅ Toutes les missions ont un user_id valide');
    }

    const budgetCheck = await pool.query(`
      SELECT COUNT(*) as count 
      FROM missions 
      WHERE budget_value_cents IS NULL OR budget_value_cents < 1000
    `);
    
    const invalidBudget = parseInt(budgetCheck.rows[0]?.count || '0');
    if (invalidBudget > 0) {
      console.log(`   ⚠️  ${invalidBudget} mission(s) avec budget invalide (< 10€)`);
    } else {
      console.log('   ✅ Tous les budgets sont valides');
    }

    console.log('\n✅ Vérification terminée');

  } catch (error: any) {
    console.error('\n❌ Erreur:', error.message);
    if (error.code) {
      console.error('   Code:', error.code);
    }
  } finally {
    await pool.end();
  }
}

checkProductionMissions().catch(console.error);

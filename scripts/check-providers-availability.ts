import { Pool } from 'pg';

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

async function checkProviders() {
  try {
    console.log('🔍 Vérification des prestataires disponibles...\n');

    // 1. Compter tous les PRO
    const totalPros = await pool.query(
      `SELECT COUNT(*) as count FROM users WHERE role = 'PRO'`
    );
    console.log(`📊 Total prestataires PRO: ${totalPros.rows[0].count}`);

    // 2. Compter ceux avec availability = true
    const availablePros = await pool.query(
      `SELECT COUNT(*) as count 
       FROM users 
       WHERE role = 'PRO' 
       AND (profile_data->>'availability')::boolean = true`
    );
    console.log(`✅ Prestataires disponibles: ${availablePros.rows[0].count}`);

    // 3. Lister les prestataires avec leurs infos
    const providersQuery = `
      SELECT 
        u.id,
        u.name,
        u.email,
        u.role,
        (u.profile_data->>'availability')::boolean as availability,
        u.profile_data->>'hourlyRate' as hourly_rate,
        u.profile_data->>'industry' as category,
        u.profile_data->>'location' as location
      FROM users u
      WHERE u.role = 'PRO'
      ORDER BY u.id
    `;
    const providers = await pool.query(providersQuery);

    console.log('\n📋 Liste des prestataires:');
    providers.rows.forEach((p, i) => {
      console.log(`\n${i + 1}. ${p.name} (ID: ${p.id})`);
      console.log(`   Email: ${p.email}`);
      console.log(`   Disponible: ${p.availability === true ? '✅' : '❌'}`);
      console.log(`   Tarif: ${p.hourly_rate || 'Non défini'}€/h`);
      console.log(`   Catégorie: ${p.category || 'Non définie'}`);
      console.log(`   Localisation: ${p.location || 'Non définie'}`);
    });

    // 4. Vérifier les créneaux de disponibilité
    const slots = await pool.query(
      `SELECT 
        ua.user_id,
        u.name,
        COUNT(*) as slot_count,
        MIN(ua.date) as first_date,
        MAX(ua.date) as last_date
       FROM user_availability ua
       JOIN users u ON u.id = ua.user_id
       WHERE ua.date >= CURRENT_DATE
       GROUP BY ua.user_id, u.name`
    );

    console.log('\n📅 Créneaux de disponibilité:');
    if (slots.rows.length === 0) {
      console.log('⚠️  Aucun créneau trouvé dans user_availability');
    } else {
      slots.rows.forEach(s => {
        console.log(`\n- ${s.name} (ID: ${s.user_id})`);
        console.log(`  ${s.slot_count} créneaux du ${s.first_date} au ${s.last_date}`);
      });
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await pool.end();
  }
}

checkProviders();
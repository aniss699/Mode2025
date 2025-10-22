
import { Pool } from 'pg';

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

async function activateProviderAvailability(userId: number) {
  try {
    console.log(`🔄 Activation de la disponibilité pour l'utilisateur ${userId}...`);

    // Récupérer l'utilisateur actuel
    const user = await pool.query(
      'SELECT id, name, email, role, profile_data FROM users WHERE id = $1',
      [userId]
    );

    if (user.rows.length === 0) {
      console.error(`❌ Utilisateur ${userId} non trouvé`);
      return;
    }

    const currentUser = user.rows[0];
    console.log(`📋 Utilisateur: ${currentUser.name} (${currentUser.email})`);
    console.log(`📋 Rôle actuel: ${currentUser.role}`);

    // Mise à jour du profil avec availability = true
    const profileData = currentUser.profile_data || {};
    profileData.availability = true;

    await pool.query(
      `UPDATE users 
       SET profile_data = $1, 
           role = 'PRO',
           updated_at = NOW() 
       WHERE id = $2`,
      [JSON.stringify(profileData), userId]
    );

    console.log('✅ Disponibilité activée avec succès !');
    console.log(`✅ Rôle mis à jour: PRO`);
    console.log(`✅ profile_data.availability = true`);

    // Vérification
    const verification = await pool.query(
      `SELECT 
        id, 
        name, 
        role,
        profile_data->>'availability' as availability
       FROM users 
       WHERE id = $1`,
      [userId]
    );

    console.log('\n🔍 Vérification:');
    console.log(verification.rows[0]);

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await pool.end();
  }
}

// Activer pour l'utilisateur ID 1
const userId = process.argv[2] ? parseInt(process.argv[2]) : 1;
activateProviderAvailability(userId);

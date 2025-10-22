
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('neon.tech') ? { rejectUnauthorized: false } : false
});

async function fixMissionCategories() {
  console.log('🔧 Correction des catégories des missions...');
  
  try {
    const result = await pool.query(`
      UPDATE missions 
      SET category = 'developpement'
      WHERE category IS NULL OR category = ''
      RETURNING id, title, category
    `);
    
    console.log(`✅ ${result.rowCount} missions mises à jour:`);
    result.rows.forEach(row => {
      console.log(`  - Mission ${row.id}: "${row.title}" → catégorie: ${row.category}`);
    });
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await pool.end();
  }
}

fixMissionCategories();


import { db } from '../server/database';
import { users } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function testProfileAPI() {
  console.log('🧪 Test API Profil');
  
  try {
    // 1. Vérifier qu'il y a des utilisateurs
    const allUsers = await db.select().from(users).limit(5);
    console.log(`✅ ${allUsers.length} utilisateurs trouvés`);
    
    if (allUsers.length > 0) {
      const testUser = allUsers[0];
      console.log('\n📋 Utilisateur test:', {
        id: testUser.id,
        email: testUser.email,
        name: testUser.name,
        avatar_url: testUser.avatar_url || 'non défini',
        username: testUser.username || 'non défini',
        bio: testUser.bio ? `${testUser.bio.substring(0, 50)}...` : 'non défini'
      });
      
      // 2. Test de récupération profil
      const profile = await db
        .select()
        .from(users)
        .where(eq(users.id, testUser.id))
        .limit(1);
      
      console.log('\n✅ Profil récupéré avec succès');
      console.log('Champs présents:', Object.keys(profile[0]));
    }
    
  } catch (error) {
    console.error('❌ Erreur test:', error);
  }
  
  process.exit(0);
}

testProfileAPI();

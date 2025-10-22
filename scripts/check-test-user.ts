
import { db } from '../server/database';
import { users } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function checkUser() {
  try {
    const user = await db.select().from(users).where(eq(users.email, 'test@swideal.com')).limit(1);
    
    if (user.length === 0) {
      console.log('❌ Utilisateur test@swideal.com NON TROUVÉ dans la base de données');
      
      // Lister tous les utilisateurs
      const allUsers = await db.select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role
      }).from(users);
      
      console.log('\n📋 Utilisateurs existants dans la base:');
      allUsers.forEach(u => {
        console.log(`   - ID: ${u.id}, Email: ${u.email}, Nom: ${u.name}, Role: ${u.role}`);
      });
    } else {
      console.log('✅ Utilisateur trouvé:');
      console.log('   ID:', user[0].id);
      console.log('   Email:', user[0].email);
      console.log('   Nom:', user[0].name);
      console.log('   Role:', user[0].role);
      console.log('   Mot de passe:', user[0].password);
      console.log('   Créé le:', user[0].created_at);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

checkUser();

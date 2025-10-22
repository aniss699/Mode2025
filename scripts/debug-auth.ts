
import { db } from '../server/database';
import { users } from '../shared/schema';
import { eq } from 'drizzle-orm';
import bcryptjs from 'bcryptjs';

async function debugAuth() {
  try {
    const email = 'test@swideal.com';
    const password = 'test123';
    
    console.log('🔍 Vérification de l\'authentification pour:', email);
    
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (user.length === 0) {
      console.log('❌ Utilisateur non trouvé');
      process.exit(1);
    }
    
    console.log('\n✅ Utilisateur trouvé:');
    console.log('   ID:', user[0].id);
    console.log('   Email:', user[0].email);
    console.log('   Mot de passe stocké:', user[0].password);
    console.log('   Mot de passe à vérifier:', password);
    
    // Vérifier si le mot de passe est haché
    const isHashed = user[0].password?.startsWith('$2') || false;
    console.log('\n🔐 Le mot de passe est-il haché (bcrypt)?', isHashed);
    
    if (isHashed) {
      // Tester la comparaison bcrypt
      const isValid = await bcryptjs.compare(password, user[0].password!);
      console.log('   ✓ Comparaison bcrypt:', isValid ? '✅ VALIDE' : '❌ INVALIDE');
    } else {
      // Mot de passe en clair
      const isValid = user[0].password === password;
      console.log('   ✓ Comparaison texte brut:', isValid ? '✅ VALIDE' : '❌ INVALIDE');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

debugAuth();

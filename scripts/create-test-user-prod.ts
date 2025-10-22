
import fetch from 'node-fetch';

async function createTestUser() {
  try {
    const userData = {
      email: 'test@swideal.com',
      password: 'test123',
      name: 'Test User',
      role: 'CLIENT'
    };

    console.log('🔧 Création du compte test en production...');
    console.log('Données:', userData);

    const response = await fetch('https://swideal.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    const responseText = await response.text();
    console.log('\n📡 Réponse du serveur:');
    console.log('Status:', response.status);
    console.log('Body:', responseText);

    if (response.ok) {
      const data = JSON.parse(responseText);
      console.log('\n✅ Compte créé avec succès!');
      console.log('Utilisateur:', data.user);
      
      // Test de connexion immédiat
      console.log('\n🔐 Test de connexion...');
      const loginResponse = await fetch('https://swideal.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password
        })
      });

      const loginData = await loginResponse.json();
      if (loginResponse.ok) {
        console.log('✅ Connexion réussie!', loginData.user);
      } else {
        console.log('❌ Échec de connexion:', loginData);
      }
    } else {
      console.log('\n❌ Échec de création');
      try {
        const error = JSON.parse(responseText);
        console.log('Erreur:', error);
      } catch {
        console.log('Erreur (raw):', responseText);
      }
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

createTestUser();

import fetch from 'node-fetch';

async function testLogin() {
  try {
    const loginData = {
      email: 'test@swideal.com',
      password: 'test123'
    };

    console.log('🔐 Test de connexion...');
    console.log('Données envoyées:', loginData);

    // Utiliser le domaine de production
    const baseUrl = 'https://swideal.com';
    
    console.log('URL utilisée:', baseUrl);
    
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });

    const responseText = await response.text();
    console.log('\n📡 Réponse du serveur:');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('Body:', responseText);

    if (response.ok) {
      const data = JSON.parse(responseText);
      console.log('\n✅ Connexion réussie!');
      console.log('Utilisateur:', data.user);
    } else {
      console.log('\n❌ Échec de connexion');
      try {
        const error = JSON.parse(responseText);
        console.log('Erreur:', error);
      } catch {
        console.log('Erreur (raw):', responseText);
      }
    }

  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  }
}

testLogin();
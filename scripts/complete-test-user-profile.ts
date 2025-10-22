
import fetch from 'node-fetch';

async function completeTestUserProfile() {
  try {
    const userId = 2; // ID de l'utilisateur test@swideal.com
    
    const completeProfileData = {
      // Informations de base
      displayName: 'Jean Dupont',
      email: 'test@swideal.com',
      
      // Informations de contact et localisation
      phone: '+33 6 12 34 56 78',
      location: 'Paris, France',
      
      // Description professionnelle
      bio: 'Développeur Full-Stack passionné avec plus de 8 ans d\'expérience dans la création d\'applications web modernes et performantes. Spécialisé en React, Node.js et TypeScript, j\'accompagne les entreprises dans leur transformation digitale en livrant des solutions innovantes et scalables. Expert en architecture microservices et en optimisation des performances. J\'ai réalisé plus de 50 projets avec un taux de satisfaction client de 98%. Je privilégie une approche collaborative et centrée sur l\'utilisateur pour garantir le succès de chaque projet.',
      
      headline: 'Développeur Full-Stack Expert React/Node.js - Spécialiste Architecture Web',
      
      // Informations professionnelles
      company: 'Freelance Tech Solutions',
      industry: 'Développement Web & Applications',
      experience: '8 ans d\'expérience en développement web, spécialisé dans les technologies JavaScript modernes (React, Vue.js, Angular) et backend Node.js. Expert en architecture cloud (AWS, Azure), bases de données SQL/NoSQL, et méthodologies Agile/Scrum. Formateur technique et mentor pour développeurs juniors.',
      
      // Tarification
      hourlyRate: 75,
      
      // Compétences détaillées
      skills: [
        { name: 'React', level: 5, hourlyRate: 80, category: 'Frontend' },
        { name: 'Node.js', level: 5, hourlyRate: 75, category: 'Backend' },
        { name: 'TypeScript', level: 5, hourlyRate: 85, category: 'Langages' },
        { name: 'JavaScript', level: 5, hourlyRate: 70, category: 'Langages' },
        { name: 'Vue.js', level: 4, hourlyRate: 75, category: 'Frontend' },
        { name: 'Angular', level: 4, hourlyRate: 75, category: 'Frontend' },
        { name: 'Express.js', level: 5, hourlyRate: 70, category: 'Backend' },
        { name: 'PostgreSQL', level: 4, hourlyRate: 65, category: 'Base de données' },
        { name: 'MongoDB', level: 4, hourlyRate: 65, category: 'Base de données' },
        { name: 'AWS', level: 4, hourlyRate: 80, category: 'Cloud' },
        { name: 'Docker', level: 4, hourlyRate: 70, category: 'DevOps' },
        { name: 'Git', level: 5, hourlyRate: 60, category: 'Outils' },
        { name: 'REST API', level: 5, hourlyRate: 70, category: 'Backend' },
        { name: 'GraphQL', level: 4, hourlyRate: 75, category: 'Backend' },
        { name: 'TailwindCSS', level: 5, hourlyRate: 65, category: 'Frontend' }
      ],
      
      // Mots-clés
      keywords: [
        'développement web',
        'react',
        'nodejs',
        'typescript',
        'fullstack',
        'api rest',
        'graphql',
        'postgresql',
        'mongodb',
        'aws',
        'docker',
        'microservices',
        'responsive design',
        'performance web',
        'seo technique',
        'tests unitaires',
        'ci/cd',
        'agile',
        'scrum',
        'e-commerce'
      ],
      
      // Portfolio
      portfolio: [
        {
          title: 'Plateforme E-commerce Multivendeurs',
          description: 'Développement complet d\'une marketplace avec système de paiement sécurisé, gestion des stocks en temps réel, et tableau de bord vendeur. Technologies: React, Node.js, PostgreSQL, Stripe. Plus de 10 000 utilisateurs actifs.',
          url: 'https://example-ecommerce.com',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS']
        },
        {
          title: 'Application SaaS de Gestion de Projet',
          description: 'Conception et développement d\'un outil collaboratif de gestion de projet avec fonctionnalités temps réel (WebSocket), système de notifications, et intégrations tierces (Slack, Jira). Architecture microservices avec Docker.',
          url: 'https://example-saas.com',
          technologies: ['Vue.js', 'Express.js', 'MongoDB', 'WebSocket', 'Docker']
        },
        {
          title: 'Dashboard Analytics Entreprise',
          description: 'Tableau de bord analytics temps réel pour entreprise, avec visualisations de données avancées (D3.js, Chart.js), export PDF/Excel, et système d\'alertes automatiques. Traitement de millions de données par jour.',
          url: 'https://example-analytics.com',
          technologies: ['React', 'TypeScript', 'D3.js', 'Node.js', 'Redis']
        },
        {
          title: 'API REST Scalable pour Mobile App',
          description: 'Architecture backend robuste pour application mobile avec 500k+ utilisateurs. Optimisation des performances, mise en cache Redis, CDN CloudFront, et monitoring Datadog. Temps de réponse moyen < 100ms.',
          url: 'https://api.example-mobile.com',
          technologies: ['Node.js', 'PostgreSQL', 'Redis', 'AWS', 'CloudFront']
        }
      ],
      
      // Certifications
      certifications: [
        {
          name: 'AWS Certified Solutions Architect',
          issuer: 'Amazon Web Services',
          year: 2023
        },
        {
          name: 'MongoDB Certified Developer',
          issuer: 'MongoDB University',
          year: 2022
        },
        {
          name: 'React Advanced Patterns',
          issuer: 'Frontend Masters',
          year: 2023
        },
        {
          name: 'Node.js Application Development',
          issuer: 'The Linux Foundation',
          year: 2021
        }
      ],
      
      // Disponibilité
      availability: true,
      
      // Créneaux de disponibilité pour les 2 prochaines semaines
      calendarAvailability: [
        // Semaine 1
        { date: getDateString(1), startTime: '09:00', endTime: '12:00', rate: 75 },
        { date: getDateString(1), startTime: '14:00', endTime: '18:00', rate: 75 },
        { date: getDateString(2), startTime: '09:00', endTime: '17:00', rate: 75 },
        { date: getDateString(3), startTime: '10:00', endTime: '16:00', rate: 75 },
        { date: getDateString(4), startTime: '09:00', endTime: '17:00', rate: 75 },
        { date: getDateString(5), startTime: '09:00', endTime: '13:00', rate: 80 },
        // Semaine 2
        { date: getDateString(8), startTime: '09:00', endTime: '17:00', rate: 75 },
        { date: getDateString(9), startTime: '09:00', endTime: '17:00', rate: 75 },
        { date: getDateString(10), startTime: '14:00', endTime: '18:00', rate: 75 },
        { date: getDateString(11), startTime: '09:00', endTime: '17:00', rate: 75 },
        { date: getDateString(12), startTime: '10:00', endTime: '14:00', rate: 80 }
      ],
      
      // Rôle
      role: 'PRO'
    };

    console.log('🔧 Mise à jour complète du profil test...\n');

    const response = await fetch(`https://swideal.com/api/profile/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(completeProfileData)
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Profil mis à jour avec succès!\n');
      console.log('📊 Résumé du profil:');
      console.log('- Nom:', completeProfileData.displayName);
      console.log('- Email:', completeProfileData.email);
      console.log('- Titre:', completeProfileData.headline);
      console.log('- Téléphone:', completeProfileData.phone);
      console.log('- Localisation:', completeProfileData.location);
      console.log('- Expérience:', completeProfileData.experience?.substring(0, 100) + '...');
      console.log('- Tarif horaire:', completeProfileData.hourlyRate + '€/h');
      console.log('- Compétences:', completeProfileData.skills.length);
      console.log('- Mots-clés:', completeProfileData.keywords.length);
      console.log('- Projets portfolio:', completeProfileData.portfolio.length);
      console.log('- Certifications:', completeProfileData.certifications.length);
      console.log('- Créneaux disponibles:', completeProfileData.calendarAvailability.length);
      console.log('- Disponibilité:', completeProfileData.availability ? 'OUI' : 'NON');
      console.log('- Rôle:', completeProfileData.role);
      
      console.log('\n🎯 Score de complétude estimé: 100%');
      console.log('\n🔗 Profil accessible sur: https://swideal.com/profile');
    } else {
      console.error('❌ Erreur lors de la mise à jour:', result);
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

// Fonction utilitaire pour générer les dates
function getDateString(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}

completeTestUserProfile();

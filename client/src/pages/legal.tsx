export default function Legal() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Mentions Légales & Politique de Confidentialité
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Éditeur du site</h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-2">
            <p><strong>Nom de l'entreprise :</strong> FashionHub</p>
            <p><strong>Adresse :</strong> À définir</p>
            <p><strong>Email :</strong> contact@fashionhub.fr</p>
            <p><strong>Directeur de la publication :</strong> À définir</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Hébergement</h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-2">
            <p><strong>Hébergeur :</strong> Replit</p>
            <p><strong>Adresse :</strong> San Francisco, CA, USA</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Collecte des données personnelles</h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Dans le cadre de l'utilisation de notre plateforme, nous collectons les données suivantes :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Photos de vêtements et looks que vous partagez</li>
              <li>Informations de profil (bio, tags de style)</li>
              <li>Données de navigation (cookies techniques)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Utilisation des données</h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-4">
            <p>Vos données personnelles sont utilisées pour :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Créer et gérer votre compte utilisateur</li>
              <li>Organiser votre dressing virtuel</li>
              <li>Partager vos looks avec la communauté</li>
              <li>Personnaliser vos recommandations de style</li>
              <li>Améliorer nos services</li>
              <li>Vous envoyer des notifications importantes</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vos droits</h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-4">
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous à l'adresse : 
              <a href="mailto:contact@fashionhub.fr" className="text-pink-600 hover:underline ml-1">
                contact@fashionhub.fr
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conditions Générales d'Utilisation</h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-4">
            <h3 className="text-lg font-semibold">Article 1 - Objet</h3>
            <p>
              FashionHub est un réseau social dédié à la mode et au style personnel. 
              La plateforme permet aux utilisateurs de créer leur dressing virtuel, 
              composer des looks et partager leur passion pour la mode.
            </p>

            <h3 className="text-lg font-semibold mt-6">Article 2 - Services</h3>
            <p>
              Nous proposons les services suivants :
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Création et gestion d'un dressing virtuel</li>
              <li>Création et partage de looks</li>
              <li>Interaction avec la communauté (likes, commentaires, abonnements)</li>
              <li>Collections thématiques personnalisées</li>
              <li>Suggestions de style par intelligence artificielle</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6">Article 3 - Responsabilités</h3>
            <p>
              FashionHub agit en tant que plateforme d'hébergement de contenu. 
              Les utilisateurs sont seuls responsables des contenus qu'ils publient 
              et doivent respecter les droits d'auteur et la propriété intellectuelle.
            </p>

            <h3 className="text-lg font-semibold mt-6">Article 4 - Tarifs</h3>
            <p>
              L'inscription et l'utilisation de FashionHub sont entièrement gratuites. 
              Aucun frais caché n'est appliqué aux utilisateurs.
            </p>

            <h3 className="text-lg font-semibold mt-6">Article 5 - Contenu</h3>
            <p>
              En publiant du contenu sur FashionHub, vous accordez à la plateforme 
              une licence non-exclusive pour afficher, distribuer et promouvoir votre contenu. 
              Vous conservez tous vos droits de propriété intellectuelle.
            </p>

            <h3 className="text-lg font-semibold mt-6">Article 6 - Modération</h3>
            <p>
              FashionHub se réserve le droit de modérer et supprimer tout contenu 
              inapproprié, offensant ou contraire à nos conditions d'utilisation.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookies</h2>
          <div className="text-gray-700 dark:text-gray-300">
            <p>
              Notre site utilise uniquement des cookies techniques nécessaires au fonctionnement 
              de la plateforme (authentification, préférences utilisateur). 
              Aucun cookie publicitaire ou de tracking n'est utilisé.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Propriété Intellectuelle</h2>
          <div className="text-gray-700 dark:text-gray-300">
            <p>
              Le design, le logo et tous les éléments graphiques de FashionHub 
              sont protégés par les droits d'auteur. Toute reproduction sans autorisation 
              est interdite.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
          <div className="text-gray-700 dark:text-gray-300">
            <p>
              Pour toute question concernant nos mentions légales ou notre politique de confidentialité, 
              contactez-nous à l'adresse : 
              <a href="mailto:contact@fashionhub.fr" className="text-pink-600 hover:underline ml-1">
                contact@fashionhub.fr
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

# FashionHub - Réseau Social de la Mode et Dressing Virtuel

## Overview
FashionHub est un réseau social moderne dédié à la mode et au style personnel. L'application permet aux utilisateurs de créer leur dressing virtuel, partager leurs looks, s'inspirer des tenues d'autres fashionistas, et construire une communauté autour de la passion pour la mode. Inspiré par TikTok et Pinterest, FashionHub offre un feed personnalisé de looks, un système de collection de tenues, et des fonctionnalités sociales engageantes.

## User Preferences
- Code style: TypeScript strict, imports organisés
- Database: Préférence pour PostgreSQL avec connexions directes
- Error handling: Logging détaillé avec gestion gracieuse des erreurs
- Architecture: Séparation claire frontend/backend, composants réutilisables
- UX: Interface inspirée d'Instagram et Pinterest pour une expérience visuelle immersive

## System Architecture

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL avec Drizzle ORM
- **AI Integration**: Google Gemini API (pour suggestions de style et analyses de tendances)
- **UI Components**: Radix UI, Lucide React
- **Storage**: LocalStorage pour MVP (mvpStore), PostgreSQL pour production

### Design Patterns & Decisions
- **UI/UX**: Interface visuelle moderne inspirée d'Instagram et Pinterest avec focus sur les images et le contenu visuel. Feed vertical façon TikTok pour une navigation fluide et addictive.
- **Backend Architecture**: Séparation claire entre les routes d'authentification, de gestion du dressing, des looks, et des interactions sociales (likes, commentaires, follows).
- **Database**: PostgreSQL géré avec Drizzle ORM. Schéma principal dans `shared/schema.ts` pour la cohérence frontend/backend.
- **Dressing Virtuel**: Chaque utilisateur possède son dressing personnel contenant ses articles de mode (vêtements, accessoires, chaussures). Les articles peuvent être combinés pour créer des "looks".
- **Système de Looks**: Les looks sont des combinaisons d'articles du dressing, partagés publiquement dans le feed pour inspirer la communauté.
- **Collections**: Les utilisateurs peuvent créer des collections thématiques (ex: "Looks d'été", "Tenues de soirée", "Style minimaliste").

### Key Features

#### Core Features
1. **Dressing Virtuel Personnel**
   - Ajout d'articles de mode avec photos
   - Catégorisation automatique (hauts, bas, chaussures, accessoires)
   - Tags et métadonnées (couleur, marque, saison, occasion)
   - Gestion des favoris dans le dressing

2. **Création et Partage de Looks**
   - Assemblage de looks à partir des articles du dressing
   - Partage public dans le feed communautaire
   - Descriptions et hashtags pour la découverte
   - Suggestions IA pour compléter les looks

3. **Feed Social Personnalisé**
   - Algorithme de recommandation basé sur les préférences style
   - Découverte de nouveaux looks et tendances
   - Navigation fluide type TikTok/Instagram
   - Filtres par style, couleur, saison, occasion

4. **Interactions Sociales**
   - Likes et favoris sur les looks
   - Commentaires et discussions
   - Système de follow/unfollow
   - Partage de looks entre utilisateurs
   - Messages privés pour échanger conseils style

5. **Collections et Organisation**
   - Création de boards Pinterest-style
   - Collections thématiques (saison, occasion, style)
   - Sauvegarde de looks inspirants d'autres utilisateurs
   - Organisation par couleur, marque, ou style

6. **Profil Utilisateur**
   - Dressing virtuel complet visible publiquement ou en privé
   - Statistiques (nombre d'articles, looks créés, followers)
   - Bio et style personnel
   - Badges et achievements (fashionista active, créateur de tendances, etc.)

#### Advanced Features
1. **IA Fashion Assistant**
   - Suggestions de combinaisons d'articles
   - Analyse de tendances personnalisées
   - Recommandations basées sur le style personnel
   - Détection automatique de couleurs et styles

2. **Tendances et Découverte**
   - Page Explore avec looks tendances
   - Hashtags populaires
   - Challenges mode communautaires
   - Calendrier des tendances saisonnières

3. **Shopping et Wishlist**
   - Wishlist d'articles à acquérir
   - Liens vers articles similaires en boutique
   - Suivi des prix et notifications
   - Inspiration shopping basée sur le style

4. **Analytics Personnelles**
   - Statistiques sur les articles les plus portés
   - Couleurs et styles favoris
   - Ratio articles portés/non portés
   - Suggestions pour optimiser le dressing

### Data Model

#### Utilisateurs (users)
- Profil avec bio, photo, style préféré
- Paramètres de confidentialité (dressing public/privé)
- Statistiques (followers, following, looks créés)

#### Articles de Mode (fashion_items)
- Photos multiples
- Métadonnées (catégorie, couleur, marque, taille, prix)
- Tags et descriptions
- Statut (possédé, wishlist, vendu)
- Nombre de fois utilisé dans des looks

#### Looks (outfits/looks)
- Composition d'articles du dressing
- Photo du look complet
- Description et hashtags
- Occasion et saison
- Statistiques d'engagement (likes, sauvegardes, partages)

#### Collections
- Nom et description
- Looks sauvegardés
- Visibilité (public/privé)
- Thématique (saison, occasion, style)

#### Interactions Sociales
- Likes sur looks
- Commentaires
- Follows
- Favoris/Sauvegardes
- Partages

### Deployment Configuration
- **Type**: Autoscale (for stateless web applications)
- **Build**: `npm run build` (compiles frontend with Vite + backend with esbuild)
- **Run**: `npm start` (starts in production mode)

## External Dependencies
- **Google Gemini API**: Utilisé pour les suggestions de style IA et analyse de tendances
- **PostgreSQL**: Base de données principale pour toutes les données
- **Vite**: Outil de build frontend
- **Express**: Framework web backend
- **Drizzle ORM**: ORM pour PostgreSQL
- **Radix UI**: Bibliothèque de composants UI
- **Lucide React**: Bibliothèque d'icônes

## Recent Changes
- **2025-10-22**: Transformation complète de l'application de plateforme de mise en relation professionnelle en réseau social de la mode
- Création du système mvpStore pour gérer articles, profils et follows en localStorage
- Ajout du composant ArticleFormMVP pour créer des articles de mode
- Refonte de la page profil pour afficher le dressing virtuel personnel
- Migration prévue vers base de données PostgreSQL pour données persistantes

## Next Steps
- Finaliser le schéma de base de données pour le système de mode
- Transformer toutes les pages existantes vers le nouveau concept
- Créer le feed de looks inspiré TikTok
- Implémenter les interactions sociales (likes, commentaires, follows)
- Ajouter le système de collections
- Intégrer l'IA pour suggestions de style

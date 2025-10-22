# SwipDEAL - Plateforme de mise en relation client-prestataire

## Overview
SwipDEAL is a modern platform connecting clients and service providers, leveraging AI to optimize matches. The application aims to streamline the process of finding and hiring talent, offering features like AI-powered mission matching, a personalized announcement feed, and a reputation system. Its core capabilities include authentication, mission matching with AI scoring, a TikTok-style personalized feed, a reputation and badge system, advanced analytics, and integrated chat. The business vision is to create a dynamic marketplace that efficiently connects demand and supply for professional services.

## User Preferences
- Code style: TypeScript strict, imports organisés
- Database: Préférence pour PostgreSQL avec connexions directes
- Error handling: Logging détaillé avec gestion gracieuse des erreurs
- Architecture: Séparation claire frontend/backend, composants réutilisables

## System Architecture

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL avec Drizzle ORM
- **AI Integration**: Google Gemini API
- **UI Components**: Radix UI, Lucide React

### Design Patterns & Decisions
- **UI/UX**: Utilizes a modern, component-based approach with Radix UI and Tailwind CSS for a consistent and responsive design. The personalized feed is inspired by TikTok for an engaging user experience.
- **Backend Architecture**: Clear separation of concerns with dedicated routes for authentication, missions, bids, feed, and specialized services.
- **Database**: PostgreSQL is the primary database, managed with Drizzle ORM for type-safe schema definition and interactions. A dedicated schema (`shared/schema.ts`) defines all database tables.
- **Mission Creation**: Unified flow for mission creation, including team missions, where team composition is integrated directly into the main form, automatically generating sub-missions for each role.
- **Availability System**: Calendar availability slots are synchronized across `profile_data` (JSON) and a dedicated `user_availability` table to ensure data consistency and proper tracking.

### Key Features
- Authentication system with roles (CLIENT, PRO, ADMIN).
- AI-powered mission matching and scoring.
- Personalized announcement feed.
- Reputation and badge system.
- Advanced analytics.
- Integrated chat interface.
- **Special Services**:
    - Flash Deals (limited time offers).
    - Reverse Subscriptions (recurring service requests).
    - Group Requests (collective purchasing).
    - Team Building (multi-role projects with sub-missions).
    - IA+Human Jobs (hybrid AI/human tasks).
    - Live Slots (real-time availability booking).

### Deployment Configuration
- **Type**: Autoscale (for stateless web applications).
- **Build**: `npm run build` (compiles frontend with Vite + backend with esbuild).
- **Run**: `npm start` (starts in production mode).

## External Dependencies
- **Google Gemini API**: Used for AI features and mission matching.
- **PostgreSQL**: Primary database for all application data.
- **Vite**: Frontend build tool.
- **Express**: Backend web framework.
- **Drizzle ORM**: Database ORM for PostgreSQL.
- **Radix UI**: UI component library.
- **Lucide React**: Icon library.
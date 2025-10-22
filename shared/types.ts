// Types de vue pour l'interface utilisateur
// Séparés du schéma de base pour éviter les conflits

export interface BidView {
  id: number;
  mission_id: number;
  provider_id: number;
  provider_name: string;
  provider_rating: number | null;
  amount: number; // Utilisation de number pour représenter le prix en entier
  timeline_days: number | null;
  message: string | null;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  bid_type: 'individual' | 'team' | 'open_team';
  created_at: string;
  updated_at: string | null;
}

export interface MissionView {
  id: number;
  title: string;
  description: string;
  excerpt?: string;
  category: string;
  budget: number;
  price: number; // Utilisation de number pour représenter le prix en entier
  budgetDisplay: string;
  location: string;
  status: string;
  user_id: number | null;
  userId?: string;
  clientId?: string;
  clientName?: string;
  createdAt?: string;
  bids: BidView[];
  is_team_mission?: boolean;
  isTeamMode?: boolean;
  teamRequirements?: any[];
  team_size?: number;
  urgency?: string;
  deadline?: string;
}

export interface AnnouncementView {
  id: number;
  title: string;
  description: string; // Mappé depuis 'content' en DB
  category: string;
  budgetMin?: number; // Si l'intention est de garder des min/max pour l'affichage, sinon à harmoniser avec price
  budgetMax?: number; // Si l'intention est de garder des min/max pour l'affichage, sinon à harmoniser avec price
  deadline?: Date;
  city?: string;
  userId: number; // Mappé depuis 'user_id'
  tags?: string[];
  sponsored?: boolean;
  qualityScore?: number;
}

// Ré-export du type existant pour compatibilité
export interface TeamRequirement {
  profession: string;
  description: string;
  required_skills: string[];
  estimated_budget: number; // Utilisation de number pour représenter le budget estimé en entier
  estimated_days: number;
  min_experience: number;
  is_lead_role: boolean;
  importance: 'high' | 'medium' | 'low';
}

// Types d'utilitaires pour les conversions
export interface MissionWithBids extends MissionView {
  // Alias pour la compatibilité existante
}

// Helper pour créer des objets de vue vides/par défaut
export const createEmptyMissionView = (): Partial<MissionView> => ({
  bids: [],
  createdAt: new Date().toISOString(),
  budgetDisplay: '0' // Assumant que budgetDisplay doit aussi être un entier
});

export const createEmptyAnnouncementView = (): Partial<AnnouncementView> => ({
  tags: [],
  sponsored: false,
  qualityScore: 0.8
});
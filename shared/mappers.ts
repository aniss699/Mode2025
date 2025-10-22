// Mappers pour convertir les données DB vers les types de vue UI
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { MissionView, AnnouncementView, BidView } from './types';

// Mapper pour les missions (depuis l'API/DB vers MissionView)
export function mapToMissionView(missionData: any): MissionView {
  const budgetValue = missionData.budget_value_cents 
    ? Math.round(missionData.budget_value_cents / 100)
    : missionData.budget 
    ? (typeof missionData.budget === 'string' ? parseInt(missionData.budget, 10) : missionData.budget)
    : 0;

  return {
    id: missionData.id,
    title: missionData.title || '',
    description: missionData.description || '',
    category: missionData.category || '',
    budget: budgetValue,
    price: budgetValue,
    budgetDisplay: `${budgetValue.toLocaleString()}€`,
    location: missionData.location || missionData.location_data?.city || '',
    clientId: String(missionData.client_id || missionData.user_id || ''),
    user_id: missionData.user_id || missionData.client_id || null,
    userId: String(missionData.user_id || missionData.client_id || ''),
    clientName: missionData.clientName || missionData.client_name || `Client #${missionData.user_id || missionData.client_id}`,
    createdAt: missionData.createdAt || missionData.created_at || new Date().toISOString(),
    status: missionData.status || 'draft',
    urgency: missionData.urgency,
    bids: missionData.bids ? missionData.bids.map(mapToBidView) : [],
    teamRequirements: missionData.teamRequirements || missionData.team_requirements,
    is_team_mission: missionData.is_team_mission || false,
    isTeamMode: missionData.isTeamMode || missionData.is_team_mission || false,
    team_size: missionData.team_size,
    deadline: missionData.deadline
  };
}

// Mapper pour les offres (bids)
export function mapToBidView(bidData: any): BidView {
  const amount = bidData.amount 
    ? (typeof bidData.amount === 'string' ? parseFloat(bidData.amount) : bidData.amount)
    : bidData.price 
    ? parseFloat(bidData.price)
    : 0;

  return {
    id: bidData.id,
    mission_id: bidData.mission_id,
    provider_id: bidData.provider_id || bidData.providerId,
    provider_name: bidData.provider_name || bidData.providerName || 'Prestataire',
    provider_rating: bidData.provider_rating || null,
    amount: amount,
    timeline_days: bidData.timeline_days || null,
    message: bidData.message || null,
    status: bidData.status || 'pending',
    bid_type: bidData.bid_type || 'individual',
    created_at: bidData.created_at || new Date().toISOString(),
    updated_at: bidData.updated_at || null
  };
}

// Mapper pour les annonces (depuis l'API/DB vers AnnouncementView)
export function mapToAnnouncementView(announcementData: any): AnnouncementView {
  return {
    id: announcementData.id,
    title: announcementData.title || '',
    description: announcementData.content || '',
    category: announcementData.category || '',
    budgetMin: announcementData.budgetMin || announcementData.budget_min,
    budgetMax: announcementData.budgetMax || announcementData.budget_max,
    deadline: announcementData.deadline ? new Date(announcementData.deadline) : undefined,
    city: announcementData.city || announcementData.location,
    userId: announcementData.userId || announcementData.user_id,
    tags: announcementData.tags || [],
    sponsored: announcementData.sponsored || false,
    qualityScore: announcementData.qualityScore || announcementData.quality_score || 0.8
  };
}

// Alias pour la compatibilité avec le service API
export const mapMissionFromApi = mapToMissionView;

// Utilitaires d'aide pour l'affichage
export function formatBudgetDisplay(min?: number, max?: number): string {
  if (min && max) {
    return `${min.toLocaleString()}€ - ${max.toLocaleString()}€`;
  }
  if (min) return `À partir de ${min.toLocaleString()}€`;
  if (max) return `Jusqu'à ${max.toLocaleString()}€`;
  return 'Budget à négocier';
}

export function formatTimeAgo(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
    locale: fr
  });
}
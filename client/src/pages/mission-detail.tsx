import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { useLocation, useParams } from 'wouter';
import type { MissionView, BidView } from '@shared/types';
import { dataApi } from '@/lib/api/services';
import { formatBudget, formatDate, getCategoryById } from '@/lib/categories';
import { BidForm } from '@/components/missions/bid-form';
import { BidTabs } from '@/components/missions/bid-tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MapPin,
  Calendar,
  Users,
  User,
  Star,
  Euro,
  Briefcase,
  MessageCircle,
  UserCheck,
  Clock,
  Target,
  Award,
  AlertCircle,
  ChevronLeft,
  TrendingUp,
  Eye,
  Zap,
  FileText,
  HandHeart,
  UsersRound,
  ArrowLeft
} from 'lucide-react';
import { ProviderProfileModal } from '@/components/missions/provider-profile-modal';
import { BidResponseModal } from '@/components/missions/bid-response-modal';
import SmartBidAnalyzer from '@/components/ai/smart-bid-analyzer';

export default function MissionDetailPage() {
  console.log('🔍 MissionDetailPage - Démarrage du composant');

  const { user } = useAuth();
  const params = useParams();
  const [, setLocation] = useLocation();
  const missionId = params.id;

  console.log('🔍 MissionDetailPage - Params reçus:', { missionId, user: user?.name });

  // États initialisés toujours (pas de hooks conditionnels)
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [selectedProviderName, setSelectedProviderName] = useState<string>('');
  const [selectedBidId, setSelectedBidId] = useState<string | null>(null);
  const [selectedBidderName, setSelectedBidderName] = useState<string>('');
  const [showBidForm, setShowBidForm] = useState(false);
  const [showAIAnalyzer, setShowAIAnalyzer] = useState(false);

  // Fetch mission data - toujours activé mais avec gestion d'erreur
  const { data: mission, isLoading, error } = useQuery<MissionView>({
    queryKey: ['mission-detail', missionId],
    queryFn: async () => {
      console.log('🔍 Chargement mission avec mappers ID:', missionId);

      // Validation dans la fonction query
      if (!missionId || missionId === 'undefined' || missionId === 'null') {
        throw new Error('ID de mission invalide');
      }

      try {
        const normalizedMission = await dataApi.feed.getMissionById(missionId);
        console.log('✅ Mission normalisée chargée:', normalizedMission.title);
        return normalizedMission;
      } catch (fetchError) {
        console.error('❌ Erreur lors du chargement de la mission:', fetchError);
        throw fetchError;
      }
    },
    enabled: !!missionId, // Activé seulement si missionId existe
    retry: 1,
    retryDelay: 2000,
    staleTime: 30000,
  });

  // SEO et métadonnées pour la page
  useEffect(() => {
    if (mission) {
      document.title = `${mission.title} - SwipDEAL`;

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `Mission: ${mission.title} - Budget: ${mission.budgetDisplay} - ${mission.description.slice(0, 150)}...`
        );
      }
    }
  }, [mission]);

  // Gestion intelligente de l'onglet par défaut
  const getDefaultTab = () => {
    if (!mission || !user) return 'overview';

    const missionBids = mission.bids || [];
    const sortedBids = [...missionBids].sort((a, b) => a.amount - b.amount);
    const isTeamMission = mission.teamRequirements && mission.teamRequirements.length > 0;

    if (user.type === 'client' && mission.clientName === user.name && sortedBids.length > 0) {
      return 'bids';
    }
    if (isTeamMission && user.type === 'provider' && mission.clientName !== user.name) {
      return 'team';
    }
    return 'overview';
  };

  // Réinitialiser l'onglet quand la mission change
  useEffect(() => {
    console.log('🔄 useEffect - Mission ou user changé:', { 
      missionId: mission?.id, 
      userId: user?.id, 
      missionExists: !!mission 
    });

    if (mission) {
      const defaultTab = getDefaultTab();
      console.log('📊 Onglet par défaut calculé:', defaultTab);
      setActiveTab(defaultTab);

      // Reset des états
      setSelectedProviderId(null);
      setSelectedProviderName('');
      setSelectedBidId(null);
      setSelectedBidderName('');
      setShowBidForm(false);
      setShowAIAnalyzer(false);
    }
  }, [mission?.id, user?.id, mission, user]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    console.log(`📊 Navigation vers l'onglet: ${newTab} pour mission ${mission?.id}`);
  };

  // Fonction de rendu des étoiles
  const renderStars = (rating: string | number) => {
    const numRating = typeof rating === 'string' ? parseFloat(rating) : rating;
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(numRating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  console.log('🔍 MissionDetailPage - État du rendu:', { 
    isLoading, 
    hasError: !!error, 
    hasMission: !!mission,
    missionId: mission?.id
  });

  // Loading state
  if (isLoading) {
    console.log('⏳ MissionDetailPage - Affichage du loading');
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Chargement de la mission</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Récupération des détails...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state avec debug amélioré
  if (error || !mission) {
    console.error('❌ MissionDetailPage - Erreur ou mission manquante:', { 
      error: error instanceof Error ? error.message : error, 
      mission, 
      missionId,
      hasError: !!error,
      hasMission: !!mission,
      stack: error instanceof Error ? error.stack : undefined
    });

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center mt-20">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Mission introuvable</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {error instanceof Error ? error.message : 'Cette mission n\'existe plus ou a été supprimée.'}
            </p>
            {process.env.NODE_ENV === 'development' && (
              <div className="text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 text-sm">
                <p><strong>Debug info:</strong></p>
                <p>Mission ID: {missionId}</p>
                <p>Has Error: {!!error ? 'Yes' : 'No'}</p>
                <p>Has Mission: {!!mission ? 'Yes' : 'No'}</p>
                {error && <p>Error: {error instanceof Error ? error.message : String(error)}</p>}
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
              >
                Recharger
              </Button>
              <Button 
                onClick={() => setLocation('/provider-profile')} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au marketplace
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log('✅ MissionDetailPage - Mission chargée, préparation du rendu:', mission.title);

  // Variables calculées de façon sécurisée avec valeurs par défaut
  const category = mission ? getCategoryById(mission.category) : null;
  const sortedBids = mission?.bids ? [...mission.bids].sort((a, b) => a.amount - b.amount) : [];
  const isTeamMission = mission?.teamRequirements && 
                        Array.isArray(mission.teamRequirements) && 
                        mission.teamRequirements.length > 0;

  console.log('🔍 Team Mission Check:', {
    hasTeamRequirements: !!mission?.teamRequirements,
    teamRequirementsLength: mission?.teamRequirements?.length,
    isTeamMission
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header avec navigation */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={() => setLocation('/provider-profile')}
              variant="ghost"
              className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              data-testid="button-back-marketplace"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au marketplace
            </Button>

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {sortedBids.length} candidature{sortedBids.length !== 1 ? 's' : ''}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {mission.createdAt ? formatDate(mission.createdAt) : 'Date non spécifiée'}
              </span>
            </div>
          </div>

          {/* Titre et informations principales */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3" data-testid="text-mission-title">
              {mission.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1" data-testid="text-client-name">
                <User className="w-4 h-4" />
                {mission.clientName}
              </span>
              <span className="flex items-center gap-1" data-testid="text-budget">
                <Euro className="w-4 h-4" />
                {mission.budgetDisplay}
              </span>
              {category && (
                <Badge variant="secondary" className="text-xs" data-testid="badge-category">
                  {category.name}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Navigation par onglets */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className={`w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-2 mb-8 ${isTeamMission ? 'grid' : 'flex'} gap-3`} style={isTeamMission && mission.teamRequirements ? { gridTemplateColumns: `repeat(${2 + mission.teamRequirements.length}, 1fr)` } : {}}>
            <TabsTrigger 
              value="overview"
              className="flex items-center justify-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400 text-sm px-4 py-3 font-medium"
              data-testid="tab-overview"
            >
              <FileText className="w-4 h-4" />
              <span>Détails</span>
            </TabsTrigger>

            {/* Onglets pour chaque spécialité (missions d'équipe) */}
            {isTeamMission && mission.teamRequirements?.map((req, index) => (
              <TabsTrigger 
                key={index}
                value={`specialty-${index}`}
                className="flex items-center justify-center gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 dark:data-[state=active]:bg-purple-900/30 dark:data-[state=active]:text-purple-400 text-sm px-4 py-3 font-medium"
                data-testid={`tab-specialty-${index}`}
              >
                <Briefcase className="w-4 h-4" />
                <span className="truncate max-w-[120px]" title={req.profession}>
                  {req.profession}
                </span>
                {req.is_lead_role && <Star className="w-3 h-3 text-yellow-500" />}
              </TabsTrigger>
            ))}

            <TabsTrigger 
              value="bids"
              className="flex items-center justify-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400 text-sm px-4 py-3 font-medium min-w-[120px]"
              data-testid="tab-bids"
            >
              <HandHeart className="w-4 h-4" />
              <span>Offres</span>
              <Badge variant="secondary" className="text-xs ml-1">
                {sortedBids.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6" data-testid="content-overview">
            {/* Description principale */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Description du projet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed" data-testid="text-description">
                  {mission.description}
                </p>
              </CardContent>
            </Card>

            {/* Informations en grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Euro className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400" data-testid="text-budget-amount">
                        {mission.budgetDisplay}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Localisation</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white" data-testid="text-location">
                        {mission.location || 'Non spécifié'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Candidatures</p>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400" data-testid="text-bids-count">
                        {sortedBids.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions pour prestataires */}
            {user && user.type === 'provider' && mission.clientName !== user.name && (
              <BidTabs 
                mission={mission}
                user={user}
                sortedBids={sortedBids}
                showAIAnalyzer={showAIAnalyzer}
                setShowAIAnalyzer={setShowAIAnalyzer}
                showBidForm={showBidForm}
                setShowBidForm={setShowBidForm}
              />
            )}

            {/* Message pour sa propre mission */}
            {user && user.type === 'provider' && mission.clientName === user.name && (
              <Card className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <UserCheck className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-blue-700 dark:text-blue-300 font-medium">Ceci est votre mission</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Bids Tab */}
          <TabsContent value="bids" className="space-y-6" data-testid="content-bids">
            {sortedBids.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Aucune candidature</h3>
                  <p className="text-gray-500 dark:text-gray-400">Cette mission n'a pas encore reçu d'offres de prestataires</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {sortedBids.map((bid: BidView, index: number) => (
                  <Card key={bid.id} className="hover:shadow-md transition-all duration-200" data-testid={`card-bid-${bid.id}`}>
                    <CardContent className="p-6">
                      {/* En-tête de l'offre */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            {bid.providerName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h4
                                className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                onClick={() => {
                                  setSelectedProviderId(bid.providerId);
                                  setSelectedProviderName(bid.providerName);
                                }}
                                data-testid={`text-provider-${bid.id}`}
                              >
                                {bid.providerName}
                              </h4>
                              {index === 0 && sortedBids.length > 1 && (
                                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                  Meilleure offre
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                {renderStars('5.0')}
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                5.0/5
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1" data-testid={`text-bid-amount-${bid.id}`}>
                            {typeof bid.amount === 'string' ? `${bid.amount}€` : formatBudget(bid.amount.toString())}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {bid.timeline_days ? `${bid.timeline_days} jours` : 'Non spécifié'}
                          </div>
                        </div>
                      </div>

                      {/* Message de la proposition */}
                      {bid.message && (
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed" data-testid={`text-bid-message-${bid.id}`}>
                            {bid.message}
                          </p>
                        </div>
                      )}

                      {/* Actions pour les clients */}
                      {user && (mission.clientName === user.name) && (
                        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <Button
                            onClick={() => {
                              setSelectedBidId(bid.id);
                              setSelectedBidderName(bid.providerName);
                            }}
                            variant="outline"
                            className="flex items-center gap-2"
                            data-testid={`button-contact-${bid.id}`}
                          >
                            <MessageCircle className="w-4 h-4" />
                            Contacter
                          </Button>
                          <Button
                            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                            data-testid={`button-accept-${bid.id}`}
                          >
                            <UserCheck className="w-4 h-4" />
                            Accepter l'offre
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Tabs pour chaque spécialité */}
          {isTeamMission && mission.teamRequirements?.map((req, index) => (
            <TabsContent key={index} value={`specialty-${index}`} className="space-y-6" data-testid={`content-specialty-${index}`}>
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-700">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-3 mb-3">
                        <div className="w-14 h-14 bg-purple-600 dark:bg-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{req.profession}</h2>
                          <div className="flex items-center gap-2 mt-2">
                            {req.is_lead_role && (
                              <Badge className="bg-purple-600 text-white">
                                <Star className="w-3 h-3 mr-1" />
                                Lead de l'équipe
                              </Badge>
                            )}
                            <Badge variant={req.importance === 'high' ? 'destructive' : req.importance === 'medium' ? 'default' : 'secondary'}>
                              {req.importance === 'high' ? '🔥 Prioritaire' : req.importance === 'medium' ? '📌 Important' : '💡 Optionnel'}
                            </Badge>
                          </div>
                        </div>
                      </CardTitle>
                    </div>
                  </div>

                  {/* Résumé du rôle */}
                  <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-700">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {req.estimated_budget.toLocaleString()}€
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Budget alloué</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {req.estimated_days}j
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Durée estimée</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {req.min_experience}+
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Années d'exp.</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Description du rôle */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-purple-600" />
                      Description du rôle
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      {req.description}
                    </p>
                  </div>

                  {/* Compétences requises */}
                  {req.required_skills && req.required_skills.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        Compétences requises
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {req.required_skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="bg-white dark:bg-gray-800 text-base py-2 px-3">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Informations détaillées */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      Détails de la mission
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-white dark:bg-gray-800">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                              <Euro className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget</p>
                              <p className="text-xl font-bold text-green-600 dark:text-green-400">{req.estimated_budget}€</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white dark:bg-gray-800">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Durée</p>
                              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{req.estimated_days} jours</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white dark:bg-gray-800">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                              <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Expérience min.</p>
                              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{req.min_experience} an{req.min_experience > 1 ? 's' : ''}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Action pour postuler */}
                  {user && user.type === 'provider' && mission.clientName !== user.name && (
                    <div className="pt-4 border-t border-purple-200 dark:border-purple-700">
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold text-lg py-6"
                        onClick={() => {
                          console.log('Candidature pour le rôle:', req.profession);
                          setShowBidForm(true);
                        }}
                        data-testid={`button-apply-specialty-${index}`}
                      >
                        <UserCheck className="w-5 h-5 mr-2" />
                        Postuler pour ce rôle
                      </Button>
                      <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-3">
                        💰 {req.estimated_budget}€ • ⏱️ {req.estimated_days} jours • 🎯 {req.min_experience} an{req.min_experience > 1 ? 's' : ''} d'expérience
                      </p>
                    </div>
                  )}

                  {/* Message pour le créateur de la mission */}
                  {user && mission.clientName === user.name && (
                    <div className="pt-4 border-t border-purple-200 dark:border-purple-700">
                      <div className="flex items-center gap-3 p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <div>
                          <p className="font-semibold text-purple-700 dark:text-purple-300">Vous avez créé cette mission</p>
                          <p className="text-sm text-purple-600 dark:text-purple-400">Les candidatures pour ce rôle apparaîtront dans l'onglet "Offres"</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Informations sur l'équipe complète */}
                  {mission.teamRequirements && mission.teamRequirements.length > 1 && (
                    <div className="pt-4 border-t border-purple-200 dark:border-purple-700">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <UsersRound className="w-4 h-4" />
                        Autres rôles de l'équipe ({mission.teamRequirements.length - 1})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {mission.teamRequirements.map((otherReq, otherIndex) => (
                          otherIndex !== index && (
                            <button
                              key={otherIndex}
                              onClick={() => setActiveTab(`specialty-${otherIndex}`)}
                              className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-400 hover:shadow-md transition-all text-left"
                              data-testid={`button-other-specialty-${otherIndex}`}
                            >
                              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                                {otherIndex + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                                  {otherReq.profession}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {otherReq.estimated_budget}€ • {otherReq.estimated_days}j
                                </p>
                              </div>
                              {otherReq.is_lead_role && (
                                <Star className="w-4 h-4 text-yellow-500 shrink-0" />
                              )}
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Modals */}
      <ProviderProfileModal
        providerId={selectedProviderId}
        providerName={selectedProviderName}
        isOpen={!!selectedProviderId}
        onClose={() => {
          setSelectedProviderId(null);
          setSelectedProviderName('');
        }}
      />

      <BidResponseModal
        bidId={selectedBidId}
        bidderName={selectedBidderName}
        isOpen={!!selectedBidId}
        onClose={() => {
          setSelectedBidId(null);
          setSelectedBidderName('');
        }}
      />

      {showBidForm && missionId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <BidForm
              missionId={missionId}
              onSuccess={() => {
                setShowBidForm(false);
                window.location.reload();
              }}
            />
          </div>
        </div>
      )}

      {showAIAnalyzer && mission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Analyse IA de la mission</h3>
                <Button
                  onClick={() => setShowAIAnalyzer(false)}
                  variant="ghost"
                  size="sm"
                >
                  ✕
                </Button>
              </div>
              <SmartBidAnalyzer
                missionTitle={mission.title}
                missionDescription={mission.description}
                missionBudget={mission.budget || 0}
                missionCategory={mission.category}
                currentBid={{
                  price: 0,
                  timeline: "À définir",
                  proposal: ""
                }}
                providerProfile={{
                  rating: 5,
                  completedProjects: 0,
                  skills: [],
                  portfolio: []
                }}
                onRecommendationApplied={() => {
                  setShowAIAnalyzer(false);
                  setShowBidForm(true);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
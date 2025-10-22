
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import type { MissionView } from '@shared/types';
import { formatDate } from '@/lib/categories';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Eye, Edit, Trash2, AlertCircle } from 'lucide-react';
import { useLocation } from 'wouter';
import { paths } from '../routes/paths';
import { useToast } from '@/hooks/use-toast';
import { dataApi } from '@/lib/api/services';

export default function MesDemandes() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: userMissions = [], isLoading, error } = useQuery<MissionView[]>({
    queryKey: ['userMissions', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error('User ID manquant');
      }

      console.log('🔍 Récupération des missions pour user.id:', user.id);
      
      try {
        // Utiliser le même principe que marketplace : récupérer toutes les missions puis filtrer
        const { missions } = await dataApi.feed.getMissions();
        
        console.log('📊 Total missions récupérées:', missions.length);
        
        // Filtrer les missions de l'utilisateur connecté
        const userMissionsFiltered = missions.filter((mission: MissionView) => {
          const missionUserId = mission.user_id || parseInt(mission.userId || '0') || parseInt(mission.clientId || '0');
          const currentUserId = parseInt(user.id.toString());
          
          const isUserMission = missionUserId === currentUserId;
          
          if (isUserMission) {
            console.log('✅ Mission de l\'utilisateur trouvée:', mission.id, mission.title);
          }
          
          return isUserMission;
        });
        
        console.log('✅ Missions utilisateur filtrées:', userMissionsFiltered.length);
        
        return userMissionsFiltered;
      } catch (error) {
        console.error('❌ Erreur récupération missions utilisateur:', error);
        throw error;
      }
    },
    enabled: !!user?.id,
    retry: 2,
    retryDelay: 1000,
  });

  const deleteMissionMutation = useMutation({
    mutationFn: async (missionId: number) => {
      const response = await fetch(`/api/missions/${missionId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete mission');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userMissions'] });
      toast({
        title: "Mission supprimée",
        description: "Votre mission a été supprimée avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la mission.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteMission = (missionId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette mission ?')) {
      deleteMissionMutation.mutate(missionId);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Brouillon', variant: 'secondary' as const },
      open: { label: 'Ouverte', variant: 'default' as const },
      published: { label: 'Publiée', variant: 'default' as const },
      in_progress: { label: 'En cours', variant: 'secondary' as const },
      completed: { label: 'Terminée', variant: 'outline' as const },
      cancelled: { label: 'Annulée', variant: 'destructive' as const },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.open;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  // Debug: Log user info  
  console.log('👤 User actuel:', { id: user?.id, role: user?.role, email: user?.email });

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connexion requise</h2>
          <p className="text-gray-600 mb-8">Veuillez vous connecter pour voir vos demandes</p>
          <Button onClick={() => setLocation('/')}>
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Mes Demandes
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Consultez et gérez vos projets publiés
          </p>
        </div>
        <Button
          onClick={() => setLocation(paths.createMission)}
          size="lg"
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Nouveau Projet
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
          <p className="text-red-500 text-lg mb-4">Erreur de chargement</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Réessayer
          </Button>
        </div>
      )}

      {/* Missions List */}
      {!isLoading && !error && (
        <div className="space-y-6">
          {userMissions.length > 0 ? (
            userMissions.map((mission) => (
              <Card key={mission.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{mission.title}</CardTitle>
                        {getStatusBadge(mission.status || 'open')}
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
                        {mission.description}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-xl font-bold text-primary">
                        {mission.budgetDisplay}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {formatDate(mission.createdAt!)}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                      <span>Catégorie: {mission.category}</span>
                      <span>Lieu: {mission.location || 'Non spécifié'}</span>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{mission.bids?.length || 0} offre{(mission.bids?.length || 0) !== 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setLocation(`/missions/${mission.id}`)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        Voir les offres
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setLocation(paths.editMission(mission.id?.toString() || ''))}
                        className="flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteMission(mission.id!)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                        disabled={deleteMissionMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </Button>
                    </div>
                  </div>

                  {/* Aperçu des offres reçues */}
                  {mission.bids && mission.bids.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">Dernières offres reçues :</p>
                      <div className="space-y-2">
                        {mission.bids.slice(0, 2).map((bid) => (
                          <div key={bid.id} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                            <span className="truncate flex-1">{bid.message || 'Candidature soumise'}</span>
                            <span className="font-medium text-primary ml-2">{bid.price || `${bid.amount}€`}</span>
                          </div>
                        ))}
                        {mission.bids.length > 2 && (
                          <p className="text-xs text-gray-500">
                            +{mission.bids.length - 2} autre{mission.bids.length - 2 > 1 ? 's' : ''} offre{mission.bids.length - 2 > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">Vous n'avez pas encore créé de missions</p>
              <Button
                onClick={() => setLocation(paths.createMission)}
                className="bg-primary hover:bg-primary-dark text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Créer ma première mission
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Mission Detail Modal */}
      {selectedMissionId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Détails de la mission</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMissionId(null)}
                >
                  ✕
                </Button>
              </div>
              <p className="text-gray-600">
                Détails de la mission #{selectedMissionId}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

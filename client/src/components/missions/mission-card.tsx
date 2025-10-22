import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Euro, Clock, Users, TrendingUp } from 'lucide-react';
import type { MissionView, BidView } from '@shared/types';
import { categories } from '@/lib/categories';

interface MissionCardProps {
  mission: MissionView;
  onClick?: () => void;
}

export function MissionCard({ mission, onClick }: MissionCardProps) {
  const category = categories.find(c => c.id === mission.category);
  const averageBid = mission.bids.length > 0
    ? mission.bids.reduce((sum: number, bid: BidView) => sum + bid.amount, 0) / mission.bids.length
    : 0;
  const isTeamMission = mission.is_team_mission || mission.isTeamMode;


  return (
    <Card
      className={`cursor-pointer hover:shadow-lg transition-shadow ${
        isTeamMission ? 'border-l-4 border-l-purple-500' : 'border-l-4 border-l-blue-500'
      } hover:scale-[1.02] bg-white h-fit`}
      onClick={onClick}
    >
      <CardHeader className="pb-2 pt-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-2 flex-1">
            <h3 className="font-semibold text-base line-clamp-2 flex-1 leading-tight">
              {mission.title}
            </h3>
            {isTeamMission && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300 shrink-0">
                <Users className="w-3 h-3 mr-1" />
                Équipe
              </Badge>
            )}
          </div>
          <Badge variant="secondary" className="shrink-0 text-xs px-2 py-1">
            {category?.name || mission.category}
          </Badge>
          {mission.bids.length > 0 && (
            <Badge variant="outline" className="text-xs px-2 py-1">
              🔥 {mission.bids.length}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="py-1">
        <p className="text-gray-600 line-clamp-2 mb-3 text-sm leading-relaxed">
          {mission.description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1 text-gray-600">
            <Euro className="w-3 h-3 text-green-600" />
            <span className="font-medium truncate">{mission.budgetDisplay}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <Users className="w-3 h-3 text-purple-600" />
            <span className="truncate">{mission.bids.length} offre{mission.bids.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="w-3 h-3 text-blue-600" />
            <span className="truncate">{mission.location || 'Non spécifié'}</span>
          </div>

          {averageBid > 0 && (
            <div className="flex items-center gap-1 text-gray-600">
              <TrendingUp className="w-3 h-3 text-orange-600" />
              <span className="font-medium truncate">{Math.round(averageBid)}€ moy</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-3 border-t bg-gray-50/50">
        <div className="flex items-center gap-2">
          {isTeamMission && mission.team_size && (
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              {mission.team_size} postes
            </Badge>
          )}
          {mission.bids.length > 0 && (
            <Badge variant="outline">
              {mission.bids.length} offre{mission.bids.length > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <Clock className="w-3 h-3" />
          <span className="truncate">
            {formatDistanceToNow(new Date(mission.createdAt), {
              addSuffix: true,
              locale: fr
            })}
          </span>
        </div>

        <div className="text-xs font-medium text-primary truncate ml-2">
          {mission.clientName || 'Client'}
        </div>
      </CardFooter>
    </Card>
  );
}
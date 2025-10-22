import React, { useRef, useState, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Calendar, 
  Euro, 
  Heart,
  Share2,
  Info,
  Star,
  User,
  Send,
  Sparkles
} from 'lucide-react';
import { AnnouncementView } from '@shared/types';
import { categories } from '@/lib/categories';

interface SwipeCardProps {
  announcement: AnnouncementView;
  onSwipeDown: () => void;
  onSwipeUp: () => void;
  onLike: () => void;
  onOffer: () => void;
  onShare: () => void;
  onDetails: () => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  announcement,
  onSwipeDown,
  onSwipeUp,
  onLike,
  onOffer,
  onShare,
  onDetails
}) => {
  const [isEntering, setIsEntering] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | 'up' | 'down' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const formatBudget = (min?: number, max?: number) => {
    if (min && max) {
      return `${min.toLocaleString()}€ - ${max.toLocaleString()}€`;
    }
    if (min) return `À partir de ${min.toLocaleString()}€`;
    if (max) return `Jusqu'à ${max.toLocaleString()}€`;
    return 'Budget à négocier';
  };

  const formatDeadline = (deadline?: Date) => {
    if (!deadline) return 'Date flexible';
    const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 'Urgent';
    if (days === 1) return 'Dans 1 jour';
    if (days <= 7) return `Dans ${days} jours`;
    if (days <= 30) return `Dans ${Math.ceil(days / 7)} semaines`;
    return `Dans ${Math.ceil(days / 30)} mois`;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'developpement': 'bg-blue-50 text-blue-700 border-blue-200',
      'design': 'bg-purple-50 text-purple-700 border-purple-200',
      'marketing': 'bg-green-50 text-green-700 border-green-200',
      'ia': 'bg-orange-50 text-orange-700 border-orange-200',
      'redaction': 'bg-pink-50 text-pink-700 border-pink-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  // Animation d'entrée
  useEffect(() => {
    setIsEntering(true);
    const timer = setTimeout(() => setIsEntering(false), 600);
    return () => clearTimeout(timer);
  }, [announcement.id]);

  // Fonction pour gérer les sorties avec animation
  const handleSwipeWithAnimation = (direction: 'left' | 'right' | 'up' | 'down', callback: () => void) => {
    setExitDirection(direction);
    setIsExiting(true);
    setTimeout(() => {
      callback();
      setIsExiting(false);
      setExitDirection(null);
    }, 400);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    const { offset, velocity } = info;

    if (Math.abs(offset.y) > threshold || Math.abs(velocity.y) > 300) {
      if (offset.y > 0) {
        handleSwipeWithAnimation('down', onSwipeDown);
      } else {
        handleSwipeWithAnimation('up', onSwipeUp);
      }
    }
  };

  // Calculer les classes d'animation
  const getAnimationClasses = () => {
    if (isExiting && exitDirection) {
      const directions = {
        left: 'animate-[slideOutLeft_0.4s_ease-in-out]',
        right: 'animate-[slideOutRight_0.4s_ease-in-out]',
        up: 'animate-[slideOutUp_0.4s_ease-in-out]',
        down: 'animate-[slideOutDown_0.4s_ease-in-out]'
      };
      return directions[exitDirection];
    }
    if (isEntering) {
      return 'animate-[slideInUp_0.6s_ease-out]';
    }
    return '';
  };

  const categoryData = categories.find(c => c.id === announcement.category);
  const isTeamMission = announcement.isTeamMode || announcement.is_team_mission;

  return (
    <div className="relative h-full">
      {/* Indicateur de nouvelle carte */}
      {isEntering && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 animate-[fadeInDown_0.5s_ease-out]">
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 shadow-lg">
            <Sparkles className="w-4 h-4 mr-2 inline" />
            Nouvelle mission
          </Badge>
        </div>
      )}

      {/* Overlay de transition */}
      {isExiting && (
        <div className="absolute inset-0 z-40 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none animate-[fadeIn_0.3s_ease-in]" />
      )}

      <motion.div
        className={`h-full ${getAnimationClasses()}`}
        ref={cardRef}
        drag="y"
        dragConstraints={{ top: -150, bottom: 150 }}
        dragElastic={0.15}
        whileDrag={{ 
          scale: 0.95,
          opacity: 0.9,
          transition: { duration: 0.15 }
        }}
        onDragStart={() => setIsEntering(false)}
        onDragEnd={handleDragEnd}
        animate={{ 
          y: 0,
          scale: 1,
          opacity: 1
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 35,
          mass: 0.6
        }}
        data-testid={`swipe-card-${announcement.id}`}
      >
        <Card className="h-full flex flex-col overflow-hidden shadow-2xl border-2 border-gray-100 bg-white transition-all duration-300">
        <CardContent className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between overflow-y-auto">
          <CardHeader className="pb-3 pt-4 px-4 sm:px-6 border-b bg-gradient-to-r from-blue-50 to-purple-50 relative overflow-hidden">
            {/* Effet de vague animé */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-[wave_3s_ease-in-out_infinite]" />
            </div>

            <div className="flex justify-between items-start gap-2 mb-2 relative z-10">
              <div className="flex flex-col gap-2">
                <Badge className={`${getCategoryColor(announcement.category)} px-3 py-1.5 text-xs font-semibold border`}>
                  {announcement.category}
                </Badge>
                {announcement.sponsored && (
                  <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 px-3 py-1.5 border border-amber-200">
                    <Star className="w-3 h-3 mr-1 fill-amber-500 text-amber-500" />
                    Sponsorisé
                  </Badge>
                )}
              </div>
              <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1.5 shadow-md border-0">
                ✨ {Math.round((announcement.qualityScore || 0.8) * 100)}%
              </Badge>
            </div>
          </CardHeader>

          <div className="flex-1 flex flex-col justify-center space-y-6 mt-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                {announcement.title}
              </h3>
            </div>

            <div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-4">
                {announcement.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-3 rounded-xl border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <Euro className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Budget</span>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {formatBudget(announcement.budgetMin, announcement.budgetMax)}
                </span>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-3 rounded-xl border border-orange-200">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  <span className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Délai</span>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {announcement.deadline ? formatDeadline(announcement.deadline) : 'Flexible'}
                </span>
              </div>

              {announcement.city && (
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Lieu</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {announcement.city}
                  </span>
                </div>
              )}

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-200">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">Client</span>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  Client #{announcement.userId}
                </span>
              </div>
            </div>

            {announcement.tags && announcement.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {announcement.tags.slice(0, 5).map((tag: string, index: number) => (
                  <Badge key={index} className="bg-gray-100 text-gray-700 px-3 py-1 text-xs font-medium border border-gray-200">
                    #{tag}
                  </Badge>
                ))}
                {announcement.tags.length > 5 && (
                  <Badge className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 px-3 py-1 text-xs border border-gray-200">
                    +{announcement.tags.length - 5}
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2 mt-6">
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleSwipeWithAnimation('right', onLike)}
              className="flex flex-col items-center justify-center h-20 bg-white hover:bg-red-50 border-2 border-gray-200 hover:border-red-300 hover:scale-105 transition-all duration-200 group"
              data-testid="button-like"
            >
              <Heart className="w-6 h-6 text-red-500 mb-1 group-hover:fill-red-500 group-hover:text-red-500 group-hover:animate-pulse transition-all" />
              <span className="text-xs font-medium text-gray-700">J'aime</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => handleSwipeWithAnimation('up', onOffer)}
              className="flex flex-col items-center justify-center h-20 bg-white hover:bg-green-50 border-2 border-gray-200 hover:border-green-300 hover:scale-105 transition-all duration-200 group"
              data-testid="button-offer"
            >
              <Send className="w-6 h-6 text-green-500 mb-1 group-hover:text-green-600 group-hover:animate-bounce transition-all" />
              <span className="text-xs font-medium text-gray-700">Offre</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onShare}
              className="flex flex-col items-center justify-center h-20 bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 hover:scale-105 transition-all duration-200 group"
              data-testid="button-share"
            >
              <Share2 className="w-6 h-6 text-blue-500 mb-1 group-hover:text-blue-600 transition-all" />
              <span className="text-xs font-medium text-gray-700">Partager</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onDetails}
              className="flex flex-col items-center justify-center h-20 bg-white hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-300 hover:scale-105 transition-all duration-200 group"
              data-testid="button-details"
            >
              <Info className="w-6 h-6 text-purple-500 mb-1 group-hover:text-purple-600 transition-all" />
              <span className="text-xs font-medium text-gray-700">Détails</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
};

export default SwipeCard;
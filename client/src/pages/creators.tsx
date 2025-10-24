import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Star, 
  MapPin, 
  Filter,
  Search,
  Heart,
  UserPlus,
  Sparkles,
  TrendingUp,
  Users,
  Shirt,
  Eye,
  Activity
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { mvpStore } from '@/lib/mvpStore';

interface FashionCreator {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  location: string;
  styleTags: string[];
  followersCount: number;
  postsCount: number;
  rating: number;
  isFollowing?: boolean;
  featuredLooks: string[];
  isVerified?: boolean;
}

export default function CreatorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    style: 'all',
    location: '',
    followers: 'all',
    activity: 'all'
  });
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const { data: creators = [], isLoading } = useQuery<FashionCreator[]>({
    queryKey: ['/api/creators'],
  });

  // Mock data for demonstration
  const mockCreators: FashionCreator[] = [
    {
      id: '1',
      name: 'Sophie Martin',
      username: '@sophiestyle',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
      bio: 'Passionnée de mode minimaliste et sustainable fashion 🌿',
      location: 'Paris, France',
      styleTags: ['Minimaliste', 'Sustainable', 'Chic'],
      followersCount: 12500,
      postsCount: 347,
      rating: 4.9,
      isFollowing: false,
      featuredLooks: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=400&fit=crop',
      ],
      isVerified: true
    },
    {
      id: '2',
      name: 'Emma Dubois',
      username: '@emmafashion',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      bio: 'Streetwear lover & vintage collector 🎨',
      location: 'Lyon, France',
      styleTags: ['Streetwear', 'Vintage', 'Urban'],
      followersCount: 8900,
      postsCount: 256,
      rating: 4.8,
      isFollowing: true,
      featuredLooks: [
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=400&fit=crop',
      ],
      isVerified: true
    },
    {
      id: '3',
      name: 'Marie Leroy',
      username: '@marieelegance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
      bio: 'Élégance classique et mode intemporelle ✨',
      location: 'Bordeaux, France',
      styleTags: ['Classique', 'Élégant', 'Timeless'],
      followersCount: 15600,
      postsCount: 412,
      rating: 4.9,
      isFollowing: false,
      featuredLooks: [
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=300&h=400&fit=crop',
      ],
      isVerified: true
    },
    {
      id: '4',
      name: 'Léa Bernard',
      username: '@leaboheme',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face',
      bio: 'Bohème chic & free spirit 🌸',
      location: 'Marseille, France',
      styleTags: ['Bohème', 'Colorful', 'Artistic'],
      followersCount: 6800,
      postsCount: 189,
      rating: 4.7,
      isFollowing: false,
      featuredLooks: [
        'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1523359346063-d879354b2db5?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=400&fit=crop',
      ],
      isVerified: false
    }
  ];

  const creatorsToUse = creators.length > 0 ? creators : mockCreators;

  const filteredCreators = creatorsToUse.filter(creator => {
    // Recherche textuelle
    if (searchTerm && !creator.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !creator.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !creator.styleTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    // Filtre de style
    if (filters.style !== 'all' && !creator.styleTags.some(tag => tag.toLowerCase() === filters.style.toLowerCase())) {
      return false;
    }
    
    // Filtre de localisation
    if (filters.location && !creator.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Filtre de popularité
    if (filters.followers === 'rising' && (creator.followersCount < 1000 || creator.followersCount >= 5000)) {
      return false;
    }
    if (filters.followers === 'established' && (creator.followersCount < 5000 || creator.followersCount >= 10000)) {
      return false;
    }
    if (filters.followers === 'popular' && creator.followersCount < 10000) {
      return false;
    }
    if (filters.followers === 'verified' && !creator.isVerified) {
      return false;
    }
    
    // Filtre d'activité
    if (filters.activity === 'active' && creator.postsCount < 50) {
      return false;
    }
    if (filters.activity === 'moderate' && (creator.postsCount < 10 || creator.postsCount >= 50)) {
      return false;
    }
    if (filters.activity === 'new' && creator.postsCount >= 10) {
      return false;
    }
    
    return true;
  });

  const handleFollow = async (creatorId: string) => {
    try {
      // For now, toggle follow status in localStorage (MVP approach)
      const following = mvpStore.getFollowing();
      if (following.includes(creatorId)) {
        mvpStore.unfollow(creatorId);
      } else {
        mvpStore.follow(creatorId);
      }
      
      // In production, this would call an API:
      // await apiRequest('POST', `/api/social/follow/${creatorId}`);
      
      // Re-fetch creators to update UI
      window.location.reload();
    } catch (error) {
      console.error('Error following creator:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-5 h-5 text-pink-600" />
              <span className="text-sm font-semibold text-purple-700">
                Découvre les fashionistas
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Créateurs Mode
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Suis les passionnés de mode, inspire-toi de leurs looks et construis ta communauté style
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                data-testid="input-search-creators"
                placeholder="Rechercher un créateur ou un style..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-pink-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Bouton Filtres et compte */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant={showFilters ? "default" : "outline"} 
                className="gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filtres
                {(filters.style !== 'all' || filters.location || filters.followers !== 'all' || filters.activity !== 'all') && (
                  <Badge variant="secondary" className="ml-1 bg-white text-pink-600">
                    {[
                      filters.style !== 'all',
                      filters.location,
                      filters.followers !== 'all',
                      filters.activity !== 'all'
                    ].filter(Boolean).length}
                  </Badge>
                )}
              </Button>

              {(filters.style !== 'all' || filters.location || filters.followers !== 'all' || filters.activity !== 'all') && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setFilters({style: 'all', location: '', followers: 'all', activity: 'all'})}
                  className="gap-1 text-muted-foreground hover:text-foreground"
                >
                  <Search className="h-3 w-3" />
                  Effacer
                </Button>
              )}
            </div>

            <h2 className="text-xl font-bold text-gray-700" data-testid="text-creators-count">
              {filteredCreators.length} créateur{filteredCreators.length > 1 ? 's' : ''}
            </h2>
          </div>

          {/* Panneau de filtres avec animation */}
          {showFilters && (
            <Card className="border-2 border-pink-200 shadow-xl animate-in slide-in-from-top-2 duration-300 bg-gradient-to-br from-pink-50 to-purple-50">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-pink-600 flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filtres de recherche
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowFilters(false)}
                    className="gap-1 text-muted-foreground hover:text-pink-600"
                  >
                    <Search className="h-4 w-4" />
                    Fermer
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Style */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold flex items-center gap-2 text-pink-600">
                      <Shirt className="h-4 w-4" />
                      Style vestimentaire
                    </label>
                    <Select value={filters.style} onValueChange={(value) => setFilters(prev => ({...prev, style: value}))}>
                      <SelectTrigger data-testid="select-style-filter" className="border-pink-200 focus:border-pink-400">
                        <SelectValue placeholder="Tous les styles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les styles</SelectItem>
                        <SelectItem value="minimaliste">🤍 Minimaliste</SelectItem>
                        <SelectItem value="streetwear">🏙️ Streetwear</SelectItem>
                        <SelectItem value="classique">👔 Classique</SelectItem>
                        <SelectItem value="bohème">🌸 Bohème</SelectItem>
                        <SelectItem value="vintage">📻 Vintage</SelectItem>
                        <SelectItem value="sustainable">🌿 Sustainable</SelectItem>
                        <SelectItem value="luxe">💎 Luxe</SelectItem>
                        <SelectItem value="casual">👟 Casual</SelectItem>
                        <SelectItem value="sportswear">⚡ Sportswear</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Localisation */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold flex items-center gap-2 text-pink-600">
                      <MapPin className="h-4 w-4" />
                      Localisation
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        data-testid="input-location-filter"
                        placeholder="Paris, Lyon, Marseille..."
                        value={filters.location}
                        onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
                        className="pl-10 border-pink-200 focus:border-pink-400"
                      />
                    </div>
                  </div>

                  {/* Popularité */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold flex items-center gap-2 text-pink-600">
                      <TrendingUp className="h-4 w-4" />
                      Popularité
                    </label>
                    <Select value={filters.followers} onValueChange={(value) => setFilters(prev => ({...prev, followers: value}))}>
                      <SelectTrigger data-testid="select-popularity-filter" className="border-pink-200 focus:border-pink-400">
                        <SelectValue placeholder="Tous" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les créateurs</SelectItem>
                        <SelectItem value="rising">🔥 En croissance (1k-5k)</SelectItem>
                        <SelectItem value="established">⭐ Établis (5k-10k)</SelectItem>
                        <SelectItem value="popular">👑 Populaires (10k+)</SelectItem>
                        <SelectItem value="verified">✓ Vérifiés uniquement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Activité */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold flex items-center gap-2 text-pink-600">
                      <Activity className="h-4 w-4" />
                      Activité
                    </label>
                    <Select value={filters.activity || 'all'} onValueChange={(value) => setFilters(prev => ({...prev, activity: value}))}>
                      <SelectTrigger data-testid="select-activity-filter" className="border-pink-200 focus:border-pink-400">
                        <SelectValue placeholder="Toutes activités" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes activités</SelectItem>
                        <SelectItem value="active">Très actifs (50+ looks)</SelectItem>
                        <SelectItem value="moderate">Modérés (10-50 looks)</SelectItem>
                        <SelectItem value="new">Nouveaux créateurs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Stats et Actions */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-pink-200">
                  <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-pink-500" />
                      <span className="font-semibold text-pink-600">{filteredCreators.length}</span>
                      <span className="text-gray-600">résultats</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-green-600">{filteredCreators.filter(c => c.followersCount > 5000).length}</span>
                      <span className="text-gray-600">tendance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold text-blue-600">{filteredCreators.filter(c => c.isVerified).length}</span>
                      <span className="text-gray-600">vérifiés</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      data-testid="button-reset-filters"
                      variant="outline" 
                      size="sm"
                      onClick={() => setFilters({style: 'all', location: '', followers: 'all', activity: 'all'})}
                      className="gap-1"
                    >
                      <Search className="h-3 w-3" />
                      Réinitialiser
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => setShowFilters(false)}
                      className="gap-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                    >
                      Appliquer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Creators Grid */}
          <div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
                <p className="text-gray-500 mt-4">Chargement...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredCreators.map((creator) => (
                  <Card key={creator.id} className="overflow-hidden hover:shadow-xl transition-shadow" data-testid={`card-creator-${creator.id}`}>
                    <CardContent className="p-0">
                      {/* Featured Looks Grid */}
                      <div className="grid grid-cols-3 gap-0.5 bg-gray-100">
                        {creator.featuredLooks.map((look, idx) => (
                          <div key={idx} className="aspect-square relative overflow-hidden group">
                            <img 
                              src={look} 
                              alt={`Look ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                          </div>
                        ))}
                      </div>

                      {/* Creator Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-16 h-16 ring-4 ring-pink-100">
                              <AvatarImage src={creator.avatar} alt={creator.name} />
                              <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-lg" data-testid={`text-creator-name-${creator.id}`}>{creator.name}</h3>
                                {creator.isVerified && (
                                  <div className="bg-blue-500 rounded-full p-0.5">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">{creator.username}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{creator.rating}</span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{creator.bio}</p>

                        {/* Location */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                          <MapPin className="w-4 h-4" />
                          <span>{creator.location}</span>
                        </div>

                        {/* Style Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {creator.styleTags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-pink-100 text-pink-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 mb-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold">{creator.followersCount.toLocaleString()}</span>
                            <span className="text-gray-500">followers</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Shirt className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold">{creator.postsCount}</span>
                            <span className="text-gray-500">looks</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button 
                            data-testid={`button-follow-${creator.id}`}
                            onClick={() => handleFollow(creator.id)}
                            className={`flex-1 ${creator.isFollowing 
                              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                              : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white'
                            }`}
                          >
                            {creator.isFollowing ? (
                              <>
                                <UserPlus className="w-4 h-4 mr-2" />
                                Abonné
                              </>
                            ) : (
                              <>
                                <UserPlus className="w-4 h-4 mr-2" />
                                Suivre
                              </>
                            )}
                          </Button>
                          <Button 
                            data-testid={`button-view-profile-${creator.id}`}
                            variant="outline"
                            onClick={() => setLocation(`/wardrobe/${creator.id}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredCreators.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">Aucun créateur trouvé</p>
                <p className="text-gray-400">Essayez d'ajuster vos filtres</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

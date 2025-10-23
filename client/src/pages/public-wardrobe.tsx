
import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  MapPin, 
  Star,
  Shirt,
  Heart,
  Eye,
  UserPlus
} from 'lucide-react';
import { useLocation } from 'wouter';
import { useState } from 'react';

interface PublicWardrobe {
  user: {
    id: number;
    name: string;
    username: string;
    avatar?: string;
    bio?: string;
    location?: string;
    styleTags: string[];
    followersCount: number;
    postsCount: number;
    rating: number;
    isFollowing?: boolean;
    isVerified?: boolean;
  };
  items: Array<{
    id: number;
    name: string;
    imageUrl: string;
    category: string;
    brand?: string;
    color?: string[];
    tags?: string[];
  }>;
  collections: Array<{
    id: number;
    title: string;
    coverImage?: string;
    itemsCount: number;
  }>;
}

export default function PublicWardrobePage() {
  const { userId } = useParams<{ userId: string }>();
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: wardrobe, isLoading } = useQuery<PublicWardrobe>({
    queryKey: [`/api/wardrobe/users/${userId}`],
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!wardrobe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Profil non trouvé</h2>
            <Button onClick={() => setLocation('/creators')}>
              Retour aux créateurs
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categories = ['all', 'top', 'bottom', 'shoes', 'accessory', 'outerwear'];
  const filteredItems = selectedCategory === 'all' 
    ? wardrobe.items 
    : wardrobe.items.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/creators')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-24 h-24">
              <AvatarImage src={wardrobe.user.avatar} />
              <AvatarFallback className="text-2xl">
                {wardrobe.user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{wardrobe.user.name}</h1>
                {wardrobe.user.isVerified && (
                  <div className="bg-blue-500 rounded-full p-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-gray-500 mb-2">{wardrobe.user.username}</p>
              
              {wardrobe.user.bio && (
                <p className="text-gray-600 mb-4">{wardrobe.user.bio}</p>
              )}

              {wardrobe.user.location && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{wardrobe.user.location}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {wardrobe.user.styleTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-pink-100 text-pink-700">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-6 text-sm mb-4">
                <div>
                  <span className="font-semibold">{wardrobe.user.followersCount}</span> followers
                </div>
                <div>
                  <span className="font-semibold">{wardrobe.user.postsCount}</span> posts
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{wardrobe.user.rating}</span>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                {wardrobe.user.isFollowing ? 'Abonné' : 'Suivre'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? "bg-pink-500 hover:bg-pink-600" : ""}
            >
              {cat === 'all' ? 'Tout' : cat}
            </Button>
          ))}
        </div>

        {/* Collections */}
        {wardrobe.collections.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Collections</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {wardrobe.collections.map((collection) => (
                <Card 
                  key={collection.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setLocation(`/collections/${collection.id}`)}
                >
                  <div className="aspect-square relative overflow-hidden">
                    {collection.coverImage ? (
                      <img 
                        src={collection.coverImage} 
                        alt={collection.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Shirt className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-semibold text-sm truncate">{collection.title}</h4>
                    <p className="text-xs text-gray-500">{collection.itemsCount} items</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Wardrobe Items */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Garde-robe ({filteredItems.length} items)
          </h2>
          
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-semibold text-sm mb-1 truncate">{item.name}</h4>
                    {item.brand && (
                      <p className="text-xs text-gray-500 mb-2">{item.brand}</p>
                    )}
                    <div className="flex gap-1 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      {item.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Shirt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun item dans cette catégorie</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

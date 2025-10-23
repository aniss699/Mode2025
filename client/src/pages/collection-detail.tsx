
import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Globe, 
  Lock, 
  Heart, 
  Eye,
  Shirt,
  MapPin
} from 'lucide-react';
import { useLocation } from 'wouter';

interface CollectionDetail {
  id: number;
  title: string;
  description: string;
  coverImage?: string;
  isPublic: boolean;
  user: {
    id: number;
    name: string;
    username: string;
    avatar?: string;
  };
  items: Array<{
    id: number;
    name: string;
    imageUrl: string;
    category: string;
    brand?: string;
  }>;
  followersCount: number;
  createdAt: string;
}

export default function CollectionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();

  const { data: collection, isLoading } = useQuery<CollectionDetail>({
    queryKey: [`/api/collections/${id}`],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Collection non trouvée</h2>
            <Button onClick={() => setLocation('/collections')}>
              Retour aux collections
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/collections')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

          <div className="flex items-start gap-6">
            {collection.coverImage && (
              <img 
                src={collection.coverImage} 
                alt={collection.title}
                className="w-32 h-32 object-cover rounded-lg"
              />
            )}
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{collection.title}</h1>
                {collection.isPublic ? (
                  <Badge className="bg-green-500 text-white">
                    <Globe className="w-3 h-3 mr-1" />
                    Public
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    <Lock className="w-3 h-3 mr-1" />
                    Privé
                  </Badge>
                )}
              </div>

              {collection.description && (
                <p className="text-gray-600 mb-4">{collection.description}</p>
              )}

              {/* Creator info */}
              <div 
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                onClick={() => setLocation(`/wardrobe/${collection.user.id}`)}
                data-testid="button-view-creator-wardrobe"
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={collection.user.avatar} />
                  <AvatarFallback>
                    {collection.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{collection.user.name}</p>
                  <p className="text-sm text-gray-500">{collection.user.username}</p>
                </div>
                <Eye className="w-4 h-4 text-gray-400 ml-auto" />
              </div>

              <div className="flex gap-4 mt-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Shirt className="w-4 h-4" />
                  <span>{collection.items?.length || 0} items</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{collection.followersCount} followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {collection.items && collection.items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {collection.items.map((item) => (
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
                    <p className="text-xs text-gray-500">{item.brand}</p>
                  )}
                  <Badge variant="outline" className="mt-2 text-xs">
                    {item.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Shirt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Cette collection est vide</p>
          </div>
        )}
      </div>
    </div>
  );
}

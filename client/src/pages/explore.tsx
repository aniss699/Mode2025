
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, TrendingUp, Users, Hash, Sparkles } from 'lucide-react';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('trends');

  // Trending tags
  const { data: trendingTags } = useQuery({
    queryKey: ['trending-tags'],
    queryFn: async () => {
      const res = await fetch('/api/fashion/trending-tags', {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to fetch trending tags');
      return res.json();
    }
  });

  // Popular users
  const { data: popularUsers } = useQuery({
    queryKey: ['popular-users'],
    queryFn: async () => {
      const res = await fetch('/api/social/popular-users', {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to fetch popular users');
      return res.json();
    }
  });

  // Trending outfits
  const { data: trendingOutfits } = useQuery({
    queryKey: ['trending-outfits'],
    queryFn: async () => {
      const res = await fetch('/api/outfits/trending', {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to fetch trending outfits');
      return res.json();
    }
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          <Sparkles className="inline-block w-8 h-8 mr-2 text-purple-600" />
          Explorer
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Découvrez les tendances, styles et fashionistas du moment
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Rechercher des looks, utilisateurs, marques..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 text-lg"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="trends">
            <TrendingUp className="w-4 h-4 mr-2" />
            Tendances
          </TabsTrigger>
          <TabsTrigger value="people">
            <Users className="w-4 h-4 mr-2" />
            Personnes
          </TabsTrigger>
          <TabsTrigger value="hashtags">
            <Hash className="w-4 h-4 mr-2" />
            Hashtags
          </TabsTrigger>
        </TabsList>

        {/* Trending Outfits */}
        <TabsContent value="trends">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingOutfits?.map((outfit: any) => (
              <Card key={outfit.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-square relative">
                  <img
                    src={outfit.photo_url}
                    alt={outfit.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {outfit.engagement_score}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{outfit.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>❤️ {outfit.likes_count}</span>
                    <span>💬 {outfit.comments_count}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Popular People */}
        <TabsContent value="people">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularUsers?.map((user: any) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                      {user.username?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{user.username}</h3>
                      <p className="text-sm text-gray-600">{user.followers_count} followers</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{user.bio}</p>
                  <div className="flex flex-wrap gap-1">
                    {user.style_tags?.slice(0, 3).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Trending Hashtags */}
        <TabsContent value="hashtags">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trendingTags?.map((tag: any) => (
              <Card key={tag.tag} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Hash className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold mb-1">#{tag.tag}</h3>
                  <p className="text-sm text-gray-600">{tag.count} posts</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

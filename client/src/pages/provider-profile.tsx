
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'wouter';
import { Heart, Bookmark, Eye, Users, Shirt, Sparkles, TrendingUp } from 'lucide-react';

/**
 * Page Créateurs & Stylistes : découverte de profils mode avec leurs garde-robes et looks
 */

interface Creator {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  styleTags: string[];
  followersCount: number;
  wardrobeCount: number;
  looksCount: number;
  featuredLooks: {
    id: string;
    title: string;
    image: string;
    likes: number;
    saves: number;
  }[];
  wardrobePreview: string[];
  isFollowing?: boolean;
}

const mockCreators: Creator[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces',
    bio: 'Styliste vintage & upcycling ♻️ Paris',
    styleTags: ['vintage', 'sustainable', 'parisian'],
    followersCount: 2834,
    wardrobeCount: 156,
    looksCount: 89,
    featuredLooks: [
      {
        id: '1',
        title: 'Look parisien chic',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
        likes: 234,
        saves: 89
      },
      {
        id: '2',
        title: 'Vintage minimalist',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop',
        likes: 189,
        saves: 67
      }
    ],
    wardrobePreview: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=150&h=150&fit=crop'
    ]
  },
  {
    id: '2',
    name: 'Marc Durand',
    avatar: 'https://images.unsplash.com/photo-1545996124-1b1b8c8b1f5d?w=200&h=200&fit=crop&crop=faces',
    bio: 'Streetwear & sneakers enthusiast 👟',
    styleTags: ['streetwear', 'sneakers', 'urban'],
    followersCount: 4521,
    wardrobeCount: 203,
    looksCount: 124,
    featuredLooks: [
      {
        id: '3',
        title: 'Urban street style',
        image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=400&h=500&fit=crop',
        likes: 456,
        saves: 178
      },
      {
        id: '4',
        title: 'Sneaker culture',
        image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=500&fit=crop',
        likes: 523,
        saves: 201
      }
    ],
    wardrobePreview: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=150&h=150&fit=crop'
    ]
  },
  {
    id: '3',
    name: 'Emma Lefebvre',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
    bio: 'Mode éthique & minimaliste 🌿',
    styleTags: ['sustainable', 'minimalist', 'ethical'],
    followersCount: 1923,
    wardrobeCount: 78,
    looksCount: 56,
    featuredLooks: [
      {
        id: '5',
        title: 'Capsule wardrobe essentials',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop',
        likes: 312,
        saves: 145
      },
      {
        id: '6',
        title: 'Neutral tones',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop',
        likes: 267,
        saves: 98
      }
    ],
    wardrobePreview: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150&h=150&fit=crop'
    ]
  }
];

export default function CreatorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [creators, setCreators] = useState(mockCreators);

  const filteredCreators = creators.filter(creator => 
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.styleTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleFollow = (creatorId: string) => {
    setCreators(prev => prev.map(c => 
      c.id === creatorId ? { ...c, isFollowing: !c.isFollowing } : c
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Créateurs & Stylistes
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Découvrez des garde-robes inspirantes et suivez vos créateurs préférés
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <Input 
              placeholder="Rechercher par nom, style, tags..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-4 w-full md:w-auto">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="trending">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Tendance
                </TabsTrigger>
                <TabsTrigger value="sustainable">♻️ Éthique</TabsTrigger>
                <TabsTrigger value="vintage">🕰️ Vintage</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Creators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map(creator => (
            <Card key={creator.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-16 h-16 ring-2 ring-purple-200">
                      <AvatarImage src={creator.avatar} alt={creator.name} />
                      <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">{creator.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {creator.followersCount.toLocaleString()} abonnés
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={creator.isFollowing ? "outline" : "default"}
                    size="sm"
                    onClick={() => handleFollow(creator.id)}
                    className={creator.isFollowing ? "" : "bg-gradient-to-r from-purple-600 to-pink-600"}
                  >
                    {creator.isFollowing ? 'Abonné' : 'Suivre'}
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Bio */}
                <p className="text-gray-700">{creator.bio}</p>

                {/* Style Tags */}
                <div className="flex flex-wrap gap-2">
                  {creator.styleTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-purple-100 text-purple-700">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-3 border-t border-b">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{creator.wardrobeCount}</p>
                    <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
                      <Shirt className="w-3 h-3" />
                      Articles
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-pink-600">{creator.looksCount}</p>
                    <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Looks
                    </p>
                  </div>
                </div>

                {/* Featured Looks */}
                <div>
                  <h4 className="font-semibold mb-3 text-sm text-gray-700">Looks à la une</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {creator.featuredLooks.map(look => (
                      <div key={look.id} className="relative group cursor-pointer rounded-lg overflow-hidden">
                        <img 
                          src={look.image} 
                          alt={look.title}
                          className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-white text-sm font-semibold mb-1">{look.title}</p>
                            <div className="flex gap-3 text-xs text-white/90">
                              <span className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {look.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <Bookmark className="w-3 h-3" />
                                {look.saves}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wardrobe Preview */}
                <div>
                  <h4 className="font-semibold mb-3 text-sm text-gray-700">Garde-robe</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {creator.wardrobePreview.map((img, i) => (
                      <img 
                        key={i}
                        src={img} 
                        alt={`wardrobe-${i}`}
                        className="w-full h-20 object-cover rounded-md hover:scale-105 transition-transform cursor-pointer"
                      />
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.location.href = `/profile?id=${creator.id}`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Voir le profil
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-pink-600 hover:bg-pink-50"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCreators.length === 0 && (
          <Card className="p-12 text-center">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucun créateur trouvé
            </h3>
            <p className="text-gray-500">
              Essayez d'autres critères de recherche
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

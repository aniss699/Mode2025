import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Camera, Settings, Heart, Grid3x3, Users, Sparkles, Edit, Check, MapPin, Link as LinkIcon, Calendar, Shirt, Image as ImageIcon } from 'lucide-react';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom'; // Assuming useLocation is from react-router-dom

interface UserProfile {
  id: number;
  name: string;
  username?: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  style_tags?: string[];
  posts_count: number;
  followers_count: number;
  following_count: number;
  is_verified: boolean;
}

interface FashionItem {
  id: number;
  title: string;
  description?: string;
  images?: string[];
  brand?: string;
  color?: string;
  category: string;
}

interface Look {
  id: number;
  title: string;
  description?: string;
  image_url?: string;
}

interface Favorite {
  id: number;
  look?: {
    id: number;
    title: string;
    image_url?: string;
    user?: {
      username?: string;
    };
  };
}

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('wardrobe');
  const [, setLocation] = useLocation(); // Correctly import and use useLocation

  // Formulaire d'édition
  const [editForm, setEditForm] = useState({
    name: '',
    username: '',
    bio: '',
    avatar_url: '',
    style_tags: [] as string[],
  });

  // Récupération du profil complet
  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery<UserProfile>({
    queryKey: ['/api/profile/me'],
    enabled: !!user, // Ne lance la requête que si l'utilisateur est connecté
  });

  // Mise à jour du formulaire quand le profil est chargé
  useEffect(() => {
    if (profile) {
      setEditForm({
        name: profile.name || '',
        username: profile.username || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
        style_tags: profile.style_tags || [],
      });
    }
  }, [profile]);

  // Récupération des articles de mode
  const { data: fashionItems = [], isLoading: itemsLoading } = useQuery<FashionItem[]>({
    queryKey: ['/api/fashion-items/my-items'],
  });

  // Récupération des looks
  const { data: looks = [], isLoading: looksLoading } = useQuery<Look[]>({
    queryKey: ['/api/looks/my-looks'],
  });

  // Récupération des favoris
  const { data: favorites = [], isLoading: favoritesLoading } = useQuery<Favorite[]>({
    queryKey: ['/api/favorites'],
  });

  // Mutation pour mettre à jour le profil
  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/profile/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/profile/me'] });
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès.",
      });
      setIsEditDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour.",
        variant: "destructive",
      });
    },
  });

  const handleUpdateProfile = () => {
    updateProfileMutation.mutate(editForm);
  };

  const handleAddStyleTag = (tag: string) => {
    if (tag && !editForm.style_tags.includes(tag)) {
      setEditForm({ ...editForm, style_tags: [...editForm.style_tags, tag] });
    }
  };

  const handleRemoveStyleTag = (tag: string) => {
    setEditForm({ ...editForm, style_tags: editForm.style_tags.filter(t => t !== tag) });
  };

  // Rediriger vers la page de connexion si non authentifié
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Non authentifié</h2>
          <p className="text-gray-600 mb-6">Vous devez vous connecter pour accéder à votre profil.</p>
          <button
            onClick={() => setLocation('/login')}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2">Erreur lors du chargement du profil</p>
          <p className="text-gray-500 mb-4">{profileError instanceof Error ? profileError.message : 'Erreur inconnue'}</p>
          <Button onClick={() => window.location.reload()}>
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Profil non trouvé</p>
          <p className="text-sm text-gray-400 mb-4">User ID: {user?.id}</p>
          <Button onClick={() => window.location.reload()}>
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  const initials = profile?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header du profil */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-48 sm:h-64"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card principale du profil */}
        <Card className="relative -mt-32 sm:-mt-40 bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Avatar et infos principales */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative group">
                <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-white shadow-xl ring-4 ring-pink-100">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.name} />
                  <AvatarFallback className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                {profile?.is_verified && (
                  <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg" data-testid="badge-verified">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* Informations du profil */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-3">
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent" data-testid="text-profile-name">
                    {profile?.name}
                  </h1>
                  {profile?.username && (
                    <span className="text-gray-500 text-lg" data-testid="text-username">@{profile.username}</span>
                  )}
                </div>

                {/* Bio */}
                {profile?.bio && (
                  <p className="text-gray-700 mb-4 max-w-2xl" data-testid="text-bio">
                    {profile.bio}
                  </p>
                )}

                {/* Tags de style */}
                {profile?.style_tags && profile.style_tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
                    {profile.style_tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 border-pink-200"
                        data-testid={`badge-style-${tag}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Statistiques */}
                <div className="flex gap-6 sm:gap-8 mb-6 justify-center sm:justify-start">
                  <div className="text-center" data-testid="stat-posts">
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      {profile?.posts_count || 0}
                    </div>
                    <div className="text-sm text-gray-600">Posts</div>
                  </div>
                  <div className="text-center" data-testid="stat-followers">
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      {profile?.followers_count || 0}
                    </div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center" data-testid="stat-following">
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      {profile?.following_count || 0}
                    </div>
                    <div className="text-sm text-gray-600">Suivis</div>
                  </div>
                </div>

                {/* Bouton d'édition */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                      data-testid="button-edit-profile"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier le profil
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Modifier mon profil</DialogTitle>
                      <DialogDescription>
                        Personnalisez votre profil FashionHub
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          placeholder="Votre nom"
                          data-testid="input-edit-name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="username">Nom d'utilisateur</Label>
                        <Input
                          id="username"
                          value={editForm.username}
                          onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                          placeholder="@username"
                          data-testid="input-edit-username"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={editForm.bio}
                          onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                          placeholder="Parlez-nous de votre style..."
                          rows={4}
                          data-testid="textarea-edit-bio"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="avatar_url">URL de l'avatar</Label>
                        <Input
                          id="avatar_url"
                          value={editForm.avatar_url}
                          onChange={(e) => setEditForm({ ...editForm, avatar_url: e.target.value })}
                          placeholder="https://..."
                          data-testid="input-edit-avatar"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Tags de style</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {editForm.style_tags.map((tag) => (
                            <Badge 
                              key={tag}
                              variant="secondary"
                              className="cursor-pointer hover:bg-red-100"
                              onClick={() => handleRemoveStyleTag(tag)}
                            >
                              {tag} ×
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            id="new-tag"
                            placeholder="Ajouter un tag (ex: streetwear)"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleAddStyleTag((e.target as HTMLInputElement).value);
                                (e.target as HTMLInputElement).value = '';
                              }
                            }}
                            data-testid="input-add-tag"
                          />
                        </div>
                        <p className="text-xs text-gray-500">Appuyez sur Entrée pour ajouter un tag</p>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditDialogOpen(false)}
                        data-testid="button-cancel-edit"
                      >
                        Annuler
                      </Button>
                      <Button 
                        onClick={handleUpdateProfile}
                        disabled={updateProfileMutation.isPending}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                        data-testid="button-save-profile"
                      >
                        {updateProfileMutation.isPending ? 'Enregistrement...' : 'Enregistrer'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Onglets */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-t border-gray-200">
              <TabsList className="w-full justify-start rounded-none bg-transparent h-auto p-0 gap-0">
                <TabsTrigger 
                  value="wardrobe" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-pink-50 px-6 py-4"
                  data-testid="tab-wardrobe"
                >
                  <Shirt className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Garde-robe</span>
                  <span className="sm:hidden">Vêtements</span>
                  <Badge variant="secondary" className="ml-2">{fashionItems.length}</Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="looks" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-pink-50 px-6 py-4"
                  data-testid="tab-looks"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Looks
                  <Badge variant="secondary" className="ml-2">{looks.length}</Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="favorites" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-pink-50 px-6 py-4"
                  data-testid="tab-favorites"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Favoris
                  <Badge variant="secondary" className="ml-2">{favorites.length}</Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Contenu - Garde-robe */}
            <TabsContent value="wardrobe" className="p-6">
              {itemsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
                </div>
              ) : fashionItems.length === 0 ? (
                <div className="text-center py-16">
                  <Shirt className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Votre garde-robe est vide</h3>
                  <p className="text-gray-500 mb-6">Commencez à ajouter vos vêtements pour créer votre dressing virtuel</p>
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600" data-testid="button-add-first-item">
                    <Camera className="w-4 h-4 mr-2" />
                    Ajouter mon premier vêtement
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {fashionItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group" data-testid={`card-item-${item.id}`}>
                      <div className="aspect-square relative bg-gray-100">
                        {item.images && item.images[0] ? (
                          <img 
                            src={item.images[0]} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                        {item.brand && (
                          <p className="text-xs text-gray-500 truncate">{item.brand}</p>
                        )}
                        {item.color && (
                          <div className="flex items-center gap-2 mt-1">
                            <div 
                              className="w-3 h-3 rounded-full border border-gray-300" 
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-xs text-gray-500">{item.category}</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Contenu - Looks */}
            <TabsContent value="looks" className="p-6">
              {looksLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
                </div>
              ) : looks.length === 0 ? (
                <div className="text-center py-16">
                  <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun look créé</h3>
                  <p className="text-gray-500 mb-6">Créez votre premier look en combinant vos vêtements</p>
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600" data-testid="button-create-first-look">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Créer mon premier look
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {looks.map((look) => (
                    <Card key={look.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer" data-testid={`card-look-${look.id}`}>
                      <div className="aspect-[3/4] relative bg-gray-100">
                        {look.image_url ? (
                          <img 
                            src={look.image_url} 
                            alt={look.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-16 h-16 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold mb-2">{look.title}</h4>
                        {look.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">{look.description}</p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Contenu - Favoris */}
            <TabsContent value="favorites" className="p-6">
              {favoritesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
                </div>
              ) : favorites.length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun favori</h3>
                  <p className="text-gray-500 mb-6">Likez des looks pour les retrouver ici</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((fav) => (
                    <Card key={fav.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer" data-testid={`card-favorite-${fav.id}`}>
                      <div className="aspect-square relative bg-gray-100">
                        <Heart className="absolute top-3 right-3 w-6 h-6 text-pink-500 fill-pink-500 z-10" />
                        {fav.look?.image_url && (
                          <img 
                            src={fav.look.image_url} 
                            alt={fav.look.title} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold">{fav.look?.title}</h4>
                        <p className="text-sm text-gray-500">@{fav.look?.user?.username}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
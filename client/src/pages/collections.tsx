import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Plus, 
  Heart, 
  Eye, 
  Edit, 
  Trash2, 
  Sparkles,
  Bookmark,
  Lock,
  Globe,
  Image as ImageIcon
} from 'lucide-react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';

interface Collection {
  id: number;
  title: string;
  description: string;
  coverImage?: string;
  looksCount: number;
  followersCount: number;
  isPublic: boolean;
  createdAt: string;
  looks?: any[];
}

export default function CollectionsPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'my-collections' | 'saved'>('my-collections');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [newCollection, setNewCollection] = useState({
    title: '',
    description: '',
    isPublic: true
  });
  const { toast } = useToast();

  const { data: myCollections = [], isLoading: collectionsLoading } = useQuery<Collection[]>({
    queryKey: ['/api/collections', user?.id],
    enabled: !!user?.id,
  });

  const { data: savedLooks = [], isLoading: savedLoading } = useQuery<any[]>({
    queryKey: ['/api/saved-looks', user?.id],
    enabled: !!user?.id,
  });

  // Mock data for demonstration
  const mockCollections: Collection[] = [
    {
      id: 1,
      title: 'Looks d\'été 2024',
      description: 'Ma collection de tenues estivales fraîches et colorées',
      coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
      looksCount: 24,
      followersCount: 156,
      isPublic: true,
      createdAt: '2024-01-15T00:00:00Z'
    },
    {
      id: 2,
      title: 'Style Minimaliste',
      description: 'Capsule wardrobe essentials et looks intemporels',
      coverImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop',
      looksCount: 18,
      followersCount: 234,
      isPublic: true,
      createdAt: '2024-02-20T00:00:00Z'
    },
    {
      id: 3,
      title: 'Soirées Chic',
      description: 'Tenues élégantes pour occasions spéciales',
      coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop',
      looksCount: 12,
      followersCount: 89,
      isPublic: false,
      createdAt: '2024-03-10T00:00:00Z'
    }
  ];

  const mockSavedLooks = [
    {
      id: 1,
      title: 'Street Style Parisien',
      coverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop',
      creator: { name: 'Sophie Martin', username: '@sophiestyle' },
      likesCount: 456,
      savedAt: '2024-03-15T00:00:00Z'
    },
    {
      id: 2,
      title: 'Casual Chic Automne',
      coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop',
      creator: { name: 'Emma Dubois', username: '@emmafashion' },
      likesCount: 892,
      savedAt: '2024-03-12T00:00:00Z'
    }
  ];

  const collectionsToUse = myCollections.length > 0 ? myCollections : mockCollections;
  const savedLooksToUse = savedLooks.length > 0 ? savedLooks : mockSavedLooks;

  const createCollectionMutation = useMutation({
    mutationFn: async (data: typeof newCollection) => {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create collection');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/collections'] });
      toast({
        title: "Collection créée",
        description: "Votre collection a été créée avec succès.",
      });
      setIsCreateDialogOpen(false);
      setNewCollection({ title: '', description: '', isPublic: true });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de créer la collection.",
        variant: "destructive",
      });
    },
  });

  const deleteCollectionMutation = useMutation({
    mutationFn: async (collectionId: number) => {
      const response = await fetch(`/api/collections/${collectionId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete collection');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/collections'] });
      toast({
        title: "Collection supprimée",
        description: "Votre collection a été supprimée avec succès.",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la collection.",
        variant: "destructive",
      });
    },
  });

  const updateCollectionMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: { title: string; description: string; isPublic: boolean } }) => {
      const response = await fetch(`/api/collections/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update collection');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/collections'] });
      toast({
        title: "Collection modifiée",
        description: "Votre collection a été mise à jour avec succès.",
      });
      setIsEditDialogOpen(false);
      setEditingCollection(null);
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de modifier la collection.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteCollection = (collectionId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette collection ?')) {
      deleteCollectionMutation.mutate(collectionId);
    }
  };

  const handleCreateCollection = () => {
    if (!newCollection.title.trim()) {
      toast({
        title: "Titre requis",
        description: "Veuillez entrer un titre pour votre collection.",
        variant: "destructive",
      });
      return;
    }
    createCollectionMutation.mutate(newCollection);
  };

  const handleEditCollection = (collection: Collection) => {
    setEditingCollection(collection);
    setIsEditDialogOpen(true);
  };

  const handleUpdateCollection = () => {
    if (!editingCollection || !editingCollection.title.trim()) {
      toast({
        title: "Titre requis",
        description: "Veuillez entrer un titre pour votre collection.",
        variant: "destructive",
      });
      return;
    }
    updateCollectionMutation.mutate({
      id: editingCollection.id,
      data: {
        title: editingCollection.title,
        description: editingCollection.description,
        isPublic: editingCollection.isPublic,
      },
    });
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connexion requise</h2>
          <p className="text-gray-600 mb-8">Veuillez vous connecter pour voir vos collections</p>
          <Button onClick={() => setLocation('/login')}>
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-950 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-stone-100 dark:bg-stone-800 rounded-full px-4 py-2 mb-3">
                <Bookmark className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                  Organisez votre inspiration
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2 text-stone-900 dark:text-stone-50">
                Mes Collections
              </h1>
              <p className="text-lg text-stone-600 dark:text-stone-400">
                Créez des collections thématiques et organisez vos looks préférés
              </p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  data-testid="button-create-collection"
                  size="lg"
                  className="bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Nouvelle Collection
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Créer une nouvelle collection</DialogTitle>
                  <DialogDescription>
                    Organisez vos looks favoris dans des collections thématiques
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Titre de la collection
                    </label>
                    <Input
                      data-testid="input-collection-title"
                      placeholder="Ex: Looks d'été, Style minimaliste..."
                      value={newCollection.title}
                      onChange={(e) => setNewCollection(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Description
                    </label>
                    <Textarea
                      data-testid="input-collection-description"
                      placeholder="Décrivez votre collection..."
                      value={newCollection.description}
                      onChange={(e) => setNewCollection(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      data-testid="checkbox-collection-public"
                      type="checkbox"
                      id="isPublic"
                      checked={newCollection.isPublic}
                      onChange={(e) => setNewCollection(prev => ({ ...prev, isPublic: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="isPublic" className="text-sm text-gray-700">
                      Rendre cette collection publique
                    </label>
                  </div>
                  <Button 
                    data-testid="button-submit-collection"
                    onClick={handleCreateCollection}
                    disabled={createCollectionMutation.isPending}
                    className="w-full bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900"
                  >
                    {createCollectionMutation.isPending ? 'Création...' : 'Créer la collection'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Edit Collection Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
        setIsEditDialogOpen(open);
        if (!open) setEditingCollection(null);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier la collection</DialogTitle>
            <DialogDescription>
              Modifiez les informations de votre collection
            </DialogDescription>
          </DialogHeader>
          {editingCollection && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Titre de la collection
                </label>
                <Input
                  data-testid="input-edit-collection-title"
                  placeholder="Ex: Looks d'été, Style minimaliste..."
                  value={editingCollection.title}
                  onChange={(e) => setEditingCollection({ ...editingCollection, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Description
                </label>
                <Textarea
                  data-testid="input-edit-collection-description"
                  placeholder="Décrivez votre collection..."
                  value={editingCollection.description}
                  onChange={(e) => setEditingCollection({ ...editingCollection, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  data-testid="checkbox-edit-collection-public"
                  type="checkbox"
                  id="editIsPublic"
                  checked={editingCollection.isPublic}
                  onChange={(e) => setEditingCollection({ ...editingCollection, isPublic: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="editIsPublic" className="text-sm text-gray-700">
                  Rendre cette collection publique
                </label>
              </div>
              <Button 
                data-testid="button-update-collection"
                onClick={handleUpdateCollection}
                disabled={updateCollectionMutation.isPending}
                className="w-full bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900"
              >
                {updateCollectionMutation.isPending ? 'Modification...' : 'Enregistrer les modifications'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              data-testid="tab-my-collections"
              onClick={() => setActiveTab('my-collections')}
              className={`py-3 px-1 border-b-2 font-medium text-sm sm:text-base ${
                activeTab === 'my-collections'
                  ? 'border-stone-900 dark:border-stone-100 text-stone-900 dark:text-stone-100'
                  : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
              }`}
            >
              Mes collections ({collectionsToUse.length})
            </button>
            <button
              data-testid="tab-saved-looks"
              onClick={() => setActiveTab('saved')}
              className={`py-3 px-1 border-b-2 font-medium text-sm sm:text-base ${
                activeTab === 'saved'
                  ? 'border-stone-900 dark:border-stone-100 text-stone-900 dark:text-stone-100'
                  : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
              }`}
            >
              Looks sauvegardés ({savedLooksToUse.length})
            </button>
          </nav>
        </div>

        {/* My Collections Tab */}
        {activeTab === 'my-collections' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectionsLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900 dark:border-stone-100 mx-auto"></div>
                <p className="text-stone-500 dark:text-stone-400 mt-4">Chargement...</p>
              </div>
            ) : collectionsToUse.length > 0 ? (
              collectionsToUse.map((collection) => (
                <Card key={collection.id} className="overflow-hidden hover:shadow-xl transition-shadow group" data-testid={`card-collection-${collection.id}`}>
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    {collection.coverImage ? (
                      <img 
                        src={collection.coverImage} 
                        alt={collection.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
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
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg mb-2" data-testid={`text-collection-title-${collection.id}`}>{collection.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{collection.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <ImageIcon className="w-4 h-4" />
                        <span>{collection.looksCount} looks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{collection.followersCount}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        data-testid={`button-view-collection-${collection.id}`}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setLocation(`/collections/${collection.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                      <Button 
                        data-testid={`button-edit-collection-${collection.id}`}
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCollection(collection)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        data-testid={`button-delete-collection-${collection.id}`}
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCollection(collection.id)}
                        className="text-red-600 hover:text-red-700"
                        disabled={deleteCollectionMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">Vous n'avez pas encore de collections</p>
                <Button
                  data-testid="button-create-first-collection"
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Créer ma première collection
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Saved Looks Tab */}
        {activeTab === 'saved' && (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900 dark:border-stone-100 mx-auto"></div>
                <p className="text-stone-500 dark:text-stone-400 mt-4">Chargement...</p>
              </div>
            ) : savedLooksToUse.length > 0 ? (
              savedLooksToUse.map((look) => (
                <Card key={look.id} className="overflow-hidden hover:shadow-xl transition-shadow group" data-testid={`card-saved-look-${look.id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img 
                      src={look.coverImage} 
                      alt={look.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-1" data-testid={`text-look-title-${look.id}`}>{look.title}</h4>
                    <p className="text-xs text-gray-500 mb-2">par {look.creator.username}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-current text-stone-700 dark:text-stone-300" />
                        <span>{look.likesCount}</span>
                      </div>
                      <Button 
                        data-testid={`button-view-look-${look.id}`}
                        variant="ghost" 
                        size="sm"
                        onClick={() => setLocation(`/looks/${look.id}`)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">Aucun look sauvegardé</p>
                <p className="text-gray-400 mb-6">Explorez le feed et sauvegardez vos looks préférés</p>
                <Button
                  data-testid="button-explore-feed"
                  onClick={() => setLocation('/feed')}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Explorer le feed
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Shirt, 
  Heart, 
  Users, 
  TrendingUp, 
  Plus, 
  Sparkles,
  Eye,
  MessageCircle,
  Bookmark,
  Crown,
  Activity
} from 'lucide-react';
import { mvpStore } from '@/lib/mvpStore';
import AddClothingForm from '@/components/fashion/AddClothingForm';

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [articles, setArticles] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    setArticles(mvpStore.getArticles().filter((a:any)=>a.userId==='me'));
  }

  const stats = useMemo(() => {
    const myArticles = articles;
    const publicArticles = myArticles.filter(a => a.isPublic);
    const totalLikes = myArticles.reduce((sum, a) => sum + (a.likes?.length || 0), 0);
    
    return {
      totalItems: myArticles.length,
      publicLooks: publicArticles.length,
      totalLikes: totalLikes,
      followers: 0,
      following: 0,
    };
  }, [articles]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 shadow-xl border-2 border-pink-200">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Connexion requise</h2>
            <p className="text-gray-600 mb-6">Connecte-toi pour accéder à ton dressing virtuel</p>
            <Button 
              onClick={() => setLocation('/login')}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
            >
              Se connecter
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold border-4 border-white/50">
                {user.name?.split(' ').map((n:any)=>n[0]).join('').toUpperCase() || 'U'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                <Crown className="w-4 h-4 text-yellow-900" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-white/80 mb-4">Passionné(e) de mode et de style</p>
              
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <div>
                  <div className="text-2xl font-bold">{stats.totalItems}</div>
                  <div className="text-sm text-white/80">Articles</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.publicLooks}</div>
                  <div className="text-sm text-white/80">Looks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.followers}</div>
                  <div className="text-sm text-white/80">Abonnés</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.following}</div>
                  <div className="text-sm text-white/80">Abonnements</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => setLocation('/profile')}
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/50"
              >
                Voir mon profil
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-pink-100 hover:border-pink-300 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Articles dans le dressing
              </CardTitle>
              <Shirt className="w-5 h-5 text-pink-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalItems}</div>
              <p className="text-xs text-gray-500 mt-1">
                Ton dressing virtuel
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                J'aime reçus
              </CardTitle>
              <Heart className="w-5 h-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalLikes}</div>
              <p className="text-xs text-gray-500 mt-1">
                Sur tous tes looks
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-pink-100 hover:border-pink-300 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Looks partagés
              </CardTitle>
              <TrendingUp className="w-5 h-5 text-pink-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.publicLooks}</div>
              <p className="text-xs text-gray-500 mt-1">
                Visibles par la communauté
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Abonnés
              </CardTitle>
              <Users className="w-5 h-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.followers}</div>
              <p className="text-xs text-gray-500 mt-1">
                Fashionistas qui te suivent
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="wardrobe" className="flex items-center gap-2">
              <Shirt className="w-4 h-4" />
              Mon dressing
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Statistiques
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-pink-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-pink-500" />
                    Actions rapides
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un article
                  </Button>
                  <Button 
                    onClick={() => setLocation('/feed')}
                    variant="outline"
                    className="w-full border-2 border-pink-200 hover:bg-pink-50"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Explorer le feed
                  </Button>
                  <Button 
                    onClick={() => setLocation('/profile')}
                    variant="outline"
                    className="w-full border-2 border-purple-200 hover:bg-purple-50"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Voir mon profil public
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-500" />
                    Activité récente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {articles.slice(0, 3).map(article => (
                      <div key={article.id} className="flex items-center gap-3">
                        <img 
                          src={article.images?.[0] || 'https://via.placeholder.com/100'} 
                          alt={article.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{article.title}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <Badge variant="outline">
                          <Heart className="w-3 h-3 mr-1" />
                          {article.likes?.length || 0}
                        </Badge>
                      </div>
                    ))}
                    {articles.length === 0 && (
                      <p className="text-center text-gray-500 py-8">
                        Aucun article pour le moment
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Ajouter un vêtement à ton dressing
                  </DialogTitle>
                </DialogHeader>
                <AddClothingForm 
                  onSaved={() => { refresh(); setShowAddForm(false); }} 
                  onCancel={() => setShowAddForm(false)}
                />
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="wardrobe" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Mon dressing ({articles.length} articles)</h2>
              <Button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
            </div>


            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {articles.map(article => (
                <Card key={article.id} className="group overflow-hidden hover:shadow-xl transition-all border-2 border-transparent hover:border-pink-200">
                  <div className="aspect-square relative overflow-hidden bg-gray-100">
                    <img 
                      src={article.images?.[0] || 'https://via.placeholder.com/300'} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-white/90 text-pink-600">
                        <Heart className="w-3 h-3 mr-1" />
                        {article.likes?.length || 0}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-sm truncate">{article.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {articles.length === 0 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                  <Shirt className="w-12 h-12 text-pink-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  Ton dressing est vide
                </h3>
                <p className="text-gray-500 mb-6">
                  Commence à ajouter tes vêtements pour créer ton dressing virtuel
                </p>
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter mon premier article
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques détaillées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Performance de tes looks</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-pink-50 rounded-lg">
                        <Eye className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">0</div>
                        <div className="text-xs text-gray-600">Vues totales</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Heart className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{stats.totalLikes}</div>
                        <div className="text-xs text-gray-600">J'aime</div>
                      </div>
                      <div className="text-center p-4 bg-pink-50 rounded-lg">
                        <MessageCircle className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">0</div>
                        <div className="text-xs text-gray-600">Commentaires</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Bookmark className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">0</div>
                        <div className="text-xs text-gray-600">Sauvegardes</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Ton dressing en chiffres</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-sm">Total d'articles</span>
                        <span className="font-bold">{stats.totalItems}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-sm">Looks créés</span>
                        <span className="font-bold">{stats.publicLooks}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-sm">Taux de publication</span>
                        <span className="font-bold">
                          {stats.totalItems > 0 
                            ? Math.round((stats.publicLooks / stats.totalItems) * 100) 
                            : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

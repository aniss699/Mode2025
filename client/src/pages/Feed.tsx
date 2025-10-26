import React, { useEffect, useState } from 'react';
import { mvpStore } from '@/lib/mvpStore';
import ArticleFormMVP from '@/components/ArticleFormMVP';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Bookmark, Share2, Search, Filter, TrendingUp, Sparkles, User } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { useLanguage } from '@/hooks/use-language';

/**
 * Feed de mode: affiche les looks et articles de la communauté
 * Style inspiré d'Instagram/Pinterest
 */

export default function FeedPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'trending' | 'following'>('all');
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  function refresh() {
    const publicArticles = mvpStore.getArticles().filter((a:any)=>a.isPublic);
    setArticles(publicArticles);
    setProfiles(mvpStore.getProfiles());
  }

  useEffect(()=>{ refresh(); },[]);

  const filteredArticles = articles.filter(a => {
    if (searchTerm) {
      return a.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const handleLike = (articleId: string) => {
    mvpStore.toggleLike(articleId, user?.id?.toString() || 'me');
    refresh();
  };

  const handleComment = (articleId: string) => {
    // Navigate to look detail page where comments can be added
    setLocation(`/feed/${articleId}`);
  };

  const handleBookmark = (articleId: string) => {
    mvpStore.toggleBookmark(articleId, user?.id?.toString() || 'me');
    refresh();
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-gray-950">
      {/* Header avec recherche et filtres */}
      <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-stone-600 dark:text-stone-400" />
              <h1 className="text-2xl font-display font-bold text-stone-900 dark:text-stone-50">
                {t('feed.title')}
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
                <Input 
                  placeholder={t('feed.searchPlaceholder')}
                  className="pl-10 bg-white dark:bg-gray-900 border-stone-300 dark:border-stone-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900"
              >
                + {t('feed.addLook')}
              </Button>
            </div>
          </div>

          {/* Filtres rapides */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            <Badge 
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setSelectedFilter('all')}
            >
              <Filter className="w-3 h-3 mr-1" />
              {t('feed.allLooks')}
            </Badge>
            <Badge 
              variant={selectedFilter === 'trending' ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setSelectedFilter('trending')}
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              {t('feed.trending')}
            </Badge>
            <Badge 
              variant={selectedFilter === 'following' ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setSelectedFilter('following')}
            >
              <User className="w-3 h-3 mr-1" />
              {t('feed.following')}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Formulaire d'ajout */}
        {showAddForm && (
          <div className="mb-8 animate-in fade-in slide-in-from-top duration-300">
            <Card className="p-6 border border-stone-200 dark:border-stone-800 bg-white dark:bg-gray-950 shadow-sm">
              <ArticleFormMVP onSaved={()=>{ refresh(); setShowAddForm(false); }} />
            </Card>
          </div>
        )}

        {/* Message si pas de looks */}
        {filteredArticles.length === 0 && !showAddForm && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-stone-600 dark:text-stone-400" />
            </div>
            <h3 className="text-2xl font-display font-bold text-stone-900 dark:text-stone-50 mb-2">
              Aucun look pour le moment
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mb-6">
              Sois le premier à partager ton style !
            </p>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900"
            >
              + Créer mon premier look
            </Button>
          </div>
        )}

        {/* Grille de looks (style Instagram/Pinterest) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArticles.map(article => {
            const author = profiles.find((p:any)=>p.id===article.userId) || { name: 'Utilisateur', avatar: '' };
            const isLiked = article.likes?.includes(user?.id?.toString() || 'me');
            const likesCount = article.likes?.length || 0;

            return (
              <Card 
                key={article.id} 
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 cursor-pointer bg-white dark:bg-gray-950"
              >
                {/* Image principale */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img 
                    src={article.images?.[0] || 'https://via.placeholder.com/400x600?text=Look'} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Overlay avec actions rapides */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        className="flex-1 bg-white/90 hover:bg-white"
                        onClick={(e) => { e.stopPropagation(); handleLike(article.id); }}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        className="flex-1 bg-white/90 hover:bg-white"
                        onClick={(e) => { e.stopPropagation(); handleComment(article.id); }}
                        data-testid={`button-comment-${article.id}`}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        className="flex-1 bg-white/90 hover:bg-white"
                        onClick={(e) => { e.stopPropagation(); handleBookmark(article.id); }}
                        data-testid={`button-bookmark-${article.id}`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Informations du look */}
                <div className="p-4">
                  {/* Auteur */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                      {author.name.split(' ').map((n:any)=>n[0]).join('').toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-900 truncate">{author.name}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>

                  {/* Titre */}
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                      <span className="font-medium">{likesCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>0</span>
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      <Bookmark className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Message de fin de feed */}
        {filteredArticles.length > 0 && (
          <div className="text-center py-12 text-gray-500">
            <Sparkles className="w-8 h-8 mx-auto mb-3 text-pink-300" />
            <p>Tu as tout vu ! Reviens plus tard pour plus d'inspiration.</p>
          </div>
        )}
      </div>
    </div>
  );
}

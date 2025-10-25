import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Heart, Users, Camera, Shirt, TrendingUp, Star } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function Home() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 glass rounded-full px-5 sm:px-7 py-3 sm:py-4 shadow-fashion-md mb-8 sm:mb-10 animate-fade-in-scale">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold fashion-gradient-pink-purple bg-clip-text text-transparent tracking-wide">
                TON RÉSEAU SOCIAL DE LA MODE
              </span>
            </div>
            
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl mb-6 sm:mb-8 fashion-gradient-pink-purple bg-clip-text text-transparent leading-tight animate-slide-in-bottom">
              FashionHub
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-gray-200 mb-4 sm:mb-5 max-w-3xl mx-auto px-2 font-medium animate-slide-in-bottom" style={{animationDelay: '0.1s'}}>
              Crée ton dressing virtuel, partage tes looks, inspire la communauté
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 sm:mb-14 max-w-2xl mx-auto px-2 animate-slide-in-bottom" style={{animationDelay: '0.2s'}}>
              Organise ta garde-robe, compose des tenues, découvre des styles inspirants et connecte avec des passionnés de mode du monde entier.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center px-4 animate-slide-in-bottom" style={{animationDelay: '0.3s'}}>
              {!user ? (
                <>
                  <button 
                    onClick={() => setLocation('/login')}
                    className="btn-fashion-primary text-base sm:text-lg px-8 py-4 sm:px-10 sm:py-5 micro-interaction"
                    data-testid="button-start-wardrobe"
                  >
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6 mr-2 inline" />
                    Commencer mon dressing
                  </button>
                  <button 
                    onClick={() => setLocation('/feed')}
                    className="btn-fashion-secondary text-base sm:text-lg px-8 py-4 sm:px-10 sm:py-5 micro-interaction"
                    data-testid="button-explore-trends"
                  >
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2 inline" />
                    Explorer les tendances
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setLocation('/dashboard')}
                    className="btn-fashion-primary text-base sm:text-lg px-8 py-4 sm:px-10 sm:py-5 micro-interaction"
                    data-testid="button-my-wardrobe"
                  >
                    <Shirt className="w-5 h-5 sm:w-6 sm:h-6 mr-2 inline" />
                    Mon dressing
                  </button>
                  <button 
                    onClick={() => setLocation('/feed')}
                    className="btn-fashion-secondary text-base sm:text-lg px-8 py-4 sm:px-10 sm:py-5 micro-interaction"
                    data-testid="button-view-feed"
                  >
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2 inline" />
                    Voir le feed
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-4 sm:mb-5">
            Pourquoi FashionHub ?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">
            Une plateforme complète pour gérer ton style et t'inspirer au quotidien
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1 */}
          <div className="instagram-card glass p-6 sm:p-8 shadow-fashion-lg group" data-testid="card-feature-wardrobe">
            <div className="w-14 h-14 sm:w-16 sm:h-16 fashion-gradient-pink-purple rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-fashion-md micro-interaction">
              <Shirt className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Dressing Virtuel
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Catalogue tous tes vêtements avec photos. Organise par catégorie, couleur, saison. 
              Ne perds plus jamais de vue ce que tu possèdes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="instagram-card glass p-6 sm:p-8 shadow-fashion-lg group" data-testid="card-feature-looks">
            <div className="w-14 h-14 sm:w-16 sm:h-16 fashion-gradient-pink-purple rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-fashion-md micro-interaction">
              <Camera className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Création de Looks
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Assemble tes articles pour créer des tenues complètes. 
              Partage tes looks préférés avec la communauté et inspire les autres.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="instagram-card glass p-6 sm:p-8 shadow-fashion-lg group" data-testid="card-feature-feed">
            <div className="w-14 h-14 sm:w-16 sm:h-16 fashion-gradient-pink-purple rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-fashion-md micro-interaction">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Feed Inspirant
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Découvre des looks tendance de la communauté. 
              Like, commente et sauvegarde tes tenues favorites pour t'en inspirer.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="instagram-card glass p-6 sm:p-8 shadow-fashion-lg group" data-testid="card-feature-community">
            <div className="w-14 h-14 sm:w-16 sm:h-16 fashion-gradient-pink-purple rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-fashion-md micro-interaction">
              <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Communauté Mode
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Connecte avec d'autres passionnés de mode. 
              Suis tes fashionistas préférés et partage ta passion pour le style.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="instagram-card glass p-6 sm:p-8 shadow-fashion-lg group" data-testid="card-feature-collections">
            <div className="w-14 h-14 sm:w-16 sm:h-16 fashion-gradient-pink-purple rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-fashion-md micro-interaction">
              <Star className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Collections Thématiques
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Crée des boards Pinterest-style pour organiser tes looks par occasion, saison ou style. 
              Planifie tes tenues à l'avance.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="instagram-card glass p-6 sm:p-8 shadow-fashion-lg group" data-testid="card-feature-ai">
            <div className="w-14 h-14 sm:w-16 sm:h-16 fashion-gradient-pink-purple rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-fashion-md micro-interaction">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Suggestions IA
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Reçois des suggestions de combinaisons basées sur tes articles. 
              Découvre de nouvelles façons de porter ce que tu as déjà.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Trois étapes simples pour révolutionner ta façon de gérer ton style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            <div className="text-center px-2" data-testid="step-catalog">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 text-2xl sm:text-2xl md:text-3xl font-bold text-white shadow-xl">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Catalogue ton dressing
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Prends en photo tous tes vêtements et accessoires. 
                Ajoute-les à ton dressing virtuel avec leurs caractéristiques.
              </p>
            </div>

            <div className="text-center px-2" data-testid="step-create">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 text-2xl sm:text-2xl md:text-3xl font-bold text-white shadow-xl">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Crée tes looks
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Combine tes articles pour créer des tenues. 
                Visualise tes looks et partage tes meilleures créations.
              </p>
            </div>

            <div className="text-center px-2" data-testid="step-inspire">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 text-2xl sm:text-2xl md:text-3xl font-bold text-white shadow-xl">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Inspire & sois inspiré
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Découvre les looks de la communauté. 
                Échange avec d'autres passionnés et trouve l'inspiration au quotidien.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <Card className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 sm:p-8 md:p-12 text-center text-white shadow-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Prêt à révolutionner ton style ?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 px-2">
            Rejoins des milliers de fashionistas qui organisent déjà leur dressing sur FashionHub
          </p>
          <Button 
            onClick={() => setLocation(user ? '/dashboard' : '/login')}
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 text-base sm:text-lg px-8 py-5 sm:px-10 sm:py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            data-testid="button-cta-main"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            {user ? 'Accéder à mon dressing' : 'Créer mon compte gratuit'}
          </Button>
        </Card>
      </div>
    </div>
  );
}

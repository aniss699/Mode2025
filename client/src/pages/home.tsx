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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-8">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Ton réseau social de la mode
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              FashionHub
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
              Crée ton dressing virtuel, partage tes looks, inspire la communauté
            </p>
            
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Organise ta garde-robe, compose des tenues, découvre des styles inspirants et connecte avec des passionnés de mode du monde entier.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <>
                  <Button 
                    onClick={() => setLocation('/login')}
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all text-lg px-8 py-6"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Commencer mon dressing
                  </Button>
                  <Button 
                    onClick={() => setLocation('/feed')}
                    variant="outline"
                    size="lg"
                    className="border-2 border-purple-300 hover:bg-purple-50 text-lg px-8 py-6"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Explorer les tendances
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => setLocation('/dashboard')}
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all text-lg px-8 py-6"
                  >
                    <Shirt className="w-5 h-5 mr-2" />
                    Mon dressing
                  </Button>
                  <Button 
                    onClick={() => setLocation('/feed')}
                    variant="outline"
                    size="lg"
                    className="border-2 border-purple-300 hover:bg-purple-50 text-lg px-8 py-6"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Voir le feed
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi FashionHub ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une plateforme complète pour gérer ton style et t'inspirer au quotidien
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="p-8 hover:shadow-2xl transition-shadow duration-300 border-2 border-pink-100 hover:border-pink-300">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Shirt className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Dressing Virtuel
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Catalogue tous tes vêtements avec photos. Organise par catégorie, couleur, saison. 
              Ne perds plus jamais de vue ce que tu possèdes.
            </p>
          </Card>

          {/* Feature 2 */}
          <Card className="p-8 hover:shadow-2xl transition-shadow duration-300 border-2 border-purple-100 hover:border-purple-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Création de Looks
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Assemble tes articles pour créer des tenues complètes. 
              Partage tes looks préférés avec la communauté et inspire les autres.
            </p>
          </Card>

          {/* Feature 3 */}
          <Card className="p-8 hover:shadow-2xl transition-shadow duration-300 border-2 border-pink-100 hover:border-pink-300">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Feed Inspirant
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Découvre des looks tendance de la communauté. 
              Like, commente et sauvegarde tes tenues favorites pour t'en inspirer.
            </p>
          </Card>

          {/* Feature 4 */}
          <Card className="p-8 hover:shadow-2xl transition-shadow duration-300 border-2 border-purple-100 hover:border-purple-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Communauté Mode
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Connecte avec d'autres passionnés de mode. 
              Suis tes fashionistas préférés et partage ta passion pour le style.
            </p>
          </Card>

          {/* Feature 5 */}
          <Card className="p-8 hover:shadow-2xl transition-shadow duration-300 border-2 border-pink-100 hover:border-pink-300">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Collections Thématiques
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Crée des boards Pinterest-style pour organiser tes looks par occasion, saison ou style. 
              Planifie tes tenues à l'avance.
            </p>
          </Card>

          {/* Feature 6 */}
          <Card className="p-8 hover:shadow-2xl transition-shadow duration-300 border-2 border-purple-100 hover:border-purple-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Suggestions IA
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Reçois des suggestions de combinaisons basées sur tes articles. 
              Découvre de nouvelles façons de porter ce que tu as déjà.
            </p>
          </Card>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trois étapes simples pour révolutionner ta façon de gérer ton style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-xl">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Catalogue ton dressing
              </h3>
              <p className="text-gray-600">
                Prends en photo tous tes vêtements et accessoires. 
                Ajoute-les à ton dressing virtuel avec leurs caractéristiques.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-xl">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Crée tes looks
              </h3>
              <p className="text-gray-600">
                Combine tes articles pour créer des tenues. 
                Visualise tes looks et partage tes meilleures créations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-xl">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Inspire & sois inspiré
              </h3>
              <p className="text-gray-600">
                Découvre les looks de la communauté. 
                Échange avec d'autres passionnés et trouve l'inspiration au quotidien.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-gradient-to-r from-pink-500 to-purple-500 p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à révolutionner ton style ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoins des milliers de fashionistas qui organisent déjà leur dressing sur FashionHub
          </p>
          <Button 
            onClick={() => setLocation(user ? '/dashboard' : '/login')}
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-10 py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {user ? 'Accéder à mon dressing' : 'Créer mon compte gratuit'}
          </Button>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                FashionHub
              </h3>
              <p className="text-gray-400">
                Le réseau social pour gérer ton dressing et partager ta passion pour la mode.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/feed" className="hover:text-pink-400 transition-colors">Feed</a></li>
                <li><a href="/profile" className="hover:text-pink-400 transition-colors">Mon profil</a></li>
                <li><a href="/dashboard" className="hover:text-pink-400 transition-colors">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/legal" className="hover:text-pink-400 transition-colors">Mentions légales</a></li>
                <li><a href="/legal" className="hover:text-pink-400 transition-colors">Politique de confidentialité</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 FashionHub. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

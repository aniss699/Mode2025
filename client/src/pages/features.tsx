import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shirt,
  Camera,
  Heart,
  Users,
  Sparkles,
  TrendingUp,
  Bookmark,
  Star,
  Zap,
  CheckCircle,
  Crown,
  Palette,
  Share2,
  MessageCircle
} from 'lucide-react';
import { useLocation } from 'wouter';

export default function Features() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: Shirt,
      title: "Dressing Virtuel Intelligent",
      description: "Organisez tous vos vêtements et accessoires avec photos, tags et catégories",
      color: "from-pink-500 to-rose-600",
      status: "Essentiel",
      benefits: ["Catalogage illimité", "Recherche facile", "Organisation par saison"]
    },
    {
      icon: Camera,
      title: "Création de Looks",
      description: "Assemblez vos articles pour créer des tenues stylées et partagez-les",
      color: "from-purple-500 to-indigo-600",
      status: "Populaire",
      benefits: ["Mix & match créatif", "Partage communauté", "Inspiration quotidienne"]
    },
    {
      icon: Sparkles,
      title: "Assistant IA Style",
      description: "Suggestions intelligentes de tenues basées sur vos pièces et préférences",
      color: "from-yellow-500 to-orange-600",
      status: "Nouveau",
      benefits: ["Combinaisons intelligentes", "Analyse des couleurs", "Recommandations personnalisées"]
    },
    {
      icon: Heart,
      title: "Feed Inspirant",
      description: "Découvrez des looks tendance et sauvegardez vos favoris",
      color: "from-red-500 to-pink-600",
      status: "Tendance",
      benefits: ["Scroll infini", "Contenu personnalisé", "Interactions sociales"]
    },
    {
      icon: Users,
      title: "Réseau Social Mode",
      description: "Suivez des fashionistas, likez et commentez leurs créations",
      color: "from-indigo-500 to-purple-600",
      status: "Communauté",
      benefits: ["Followers & Abonnements", "Engagement interactif", "Partage de passion"]
    },
    {
      icon: Bookmark,
      title: "Collections Thématiques",
      description: "Créez des boards pour organiser vos looks par occasion ou style",
      color: "from-blue-500 to-cyan-600",
      status: "Organisation",
      benefits: ["Boards illimités", "Looks par occasion", "Style personnel"]
    }
  ];

  const stats = [
    { label: "Fashionistas actifs", value: "10K+", icon: Users, color: "text-pink-600" },
    { label: "Looks partagés", value: "50K+", icon: Camera, color: "text-purple-600" },
    { label: "Taux de satisfaction", value: "98%", icon: Star, color: "text-yellow-600" },
    { label: "Articles catalogués", value: "100K+", icon: Shirt, color: "text-blue-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 text-lg" data-testid="badge-features">
            ✨ Fonctionnalités Complètes
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Découvrez tout ce que FashionHub
            <br />peut faire pour votre style
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Une plateforme complète avec des fonctionnalités avancées pour organiser votre garde-robe,
            créer des looks stylés et partager votre passion pour la mode.
          </p>
          <Button 
            onClick={() => setLocation('/')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transform transition hover:scale-105"
            data-testid="button-start"
          >
            <Zap className="w-5 h-5 mr-2" />
            Commencer maintenant
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center shadow-xl border-0 bg-white dark:bg-gray-900 hover:shadow-2xl transition-all duration-300 transform hover:scale-105" data-testid={`stat-card-${index}`}>
              <CardContent className="p-6">
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-4`} />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Fonctionnalités qui font la différence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-xl border-0 bg-white dark:bg-gray-900 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group" data-testid={`feature-card-${index}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-pink-50 dark:bg-pink-900 text-pink-700 dark:text-pink-200">
                      {feature.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Et bien plus encore...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-2 border-pink-200 dark:border-pink-800" data-testid="extra-feature-social">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-pink-700 dark:text-pink-300">
                  <Share2 className="w-5 h-5" />
                  Partage Social
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Partagez vos looks sur les réseaux sociaux, recevez des commentaires et 
                  construisez votre communauté de passionnés de mode.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-2 border-purple-200 dark:border-purple-800" data-testid="extra-feature-trends">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <TrendingUp className="w-5 h-5" />
                  Analyse de Tendances
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Découvrez les tendances du moment, les couleurs populaires et les styles 
                  qui cartonnent dans la communauté.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800" data-testid="extra-feature-stats">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                  <Crown className="w-5 h-5" />
                  Statistiques Personnelles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Suivez l'évolution de votre dressing, vos articles les plus portés, et 
                  optimisez votre garde-robe.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-800" data-testid="extra-feature-community">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <MessageCircle className="w-5 h-5" />
                  Interaction Communauté
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Échangez des conseils, posez des questions et apprenez des autres 
                  fashionistas passionnés.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl" data-testid="cta-section">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à révolutionner votre style ?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Rejoignez des milliers de fashionistas qui utilisent FashionHub 
            pour organiser leur garde-robe et partager leur passion pour la mode.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => setLocation('/login')}
              className="bg-white text-purple-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl shadow-lg transform transition hover:scale-105"
              data-testid="button-cta-start"
            >
              <Camera className="w-5 h-5 mr-2" />
              Créer mon dressing
            </Button>
            <Button 
              variant="outline"
              onClick={() => setLocation('/feed')}
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold py-4 px-8 rounded-xl shadow-lg transform transition hover:scale-105"
              data-testid="button-cta-explore"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Explorer les looks
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

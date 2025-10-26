import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { 
  Sparkles, Heart, Users, Camera, Star, Eye, TrendingUp, 
  Shirt, ShoppingBag, Zap, CheckCircle, ArrowRight, ChevronDown, 
  ChevronUp, Quote, Palette, Share2, MessageCircle, Bookmark,
  Crown, Award, Instagram, Shield, Smile
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function NotreConcept() {
  const [, setLocation] = useLocation();
  const [activeDemo, setActiveDemo] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const demoSteps = [
    {
      title: "Créez votre dressing virtuel",
      subtitle: "Votre garde-robe en ligne",
      description: "Ajoutez vos vêtements, accessoires et chaussures préférés",
      visual: "👗",
      emotion: "Organisé et stylé",
      details: "Photographiez vos pièces mode, ajoutez des tags (couleur, marque, saison) et organisez votre garde-robe comme jamais auparavant !"
    },
    {
      title: "Composez des looks incroyables",
      subtitle: "Mix & match créatif",
      description: "Associez vos articles pour créer des tenues qui vous ressemblent",
      visual: "✨",
      emotion: "Créatif et inspiré",
      details: "Jouez avec vos pièces, testez de nouvelles combinaisons, et laissez parler votre créativité sans limite !"
    },
    {
      title: "Partagez votre style",
      subtitle: "Inspirez la communauté",
      description: "Publiez vos looks et découvrez ceux des autres fashionistas",
      visual: "📸",
      emotion: "Connecté et valorisé",
      details: "Votre style mérite d'être vu ! Partagez vos plus belles tenues et recevez des likes et des commentaires enthousiastes."
    },
    {
      title: "Construisez votre communauté",
      subtitle: "Suivez vos inspirations",
      description: "Connectez-vous avec des passionnés de mode qui partagent vos goûts",
      visual: "💕",
      emotion: "Inspiré et engagé",
      details: "Suivez vos créateurs favoris, sauvegardez les looks qui vous plaisent dans vos collections, et échangez conseils et astuces mode !"
    }
  ];

  const testimonials = [
    {
      name: "Emma Laurent",
      role: "Fashionista & Blogueuse",
      company: "Style by Emma",
      avatar: "EL",
      rating: 5,
      text: "FashionHub a transformé ma façon de voir ma garde-robe ! Je peux enfin visualiser toutes mes pièces d'un coup d'œil et créer des looks que je n'aurais jamais imaginés. Mes followers adorent !",
      project: "Dressing de 200+ pièces",
      emotion: "😍",
      before: "Garde-robe chaotique",
      after: "Fashionista organisée"
    },
    {
      name: "Léa Dubois",
      role: "Créatrice de contenu",
      company: "Léa's Wardrobe",
      avatar: "LD",
      rating: 5,
      text: "L'inspiration sans fin ! Chaque jour je découvre de nouveaux looks incroyables. C'est comme Pinterest rencontre Instagram mais version mode perso. Addictif !",
      project: "5 collections thématiques",
      emotion: "🤩",
      before: "En panne d'inspiration",
      after: "Créatrice tendances"
    },
    {
      name: "Sofia Martin",
      role: "Passionnée de mode",
      company: "Minimalist Chic",
      avatar: "SM",
      rating: 5,
      text: "Grâce à FashionHub, j'ai réalisé que j'avais déjà tout ce qu'il me fallait dans mon dressing. Plus besoin d'acheter sans réfléchir, je valorise ce que j'ai déjà !",
      project: "Style minimaliste",
      emotion: "💚",
      before: "Shopping compulsif",
      after: "Consommatrice consciente"
    }
  ];

  const emotionalBenefits = [
    {
      icon: Palette,
      title: "Explorez votre créativité",
      subtitle: "Libérez le styliste en vous",
      description: "Testez mille et une combinaisons sans sortir de chez vous. Votre dressing devient votre terrain de jeu mode !",
      color: "purple",
      stat: "Style illimité"
    },
    {
      icon: Users,
      title: "Rejoignez une communauté passionnée",
      subtitle: "Partagez votre passion",
      description: "Connectez-vous avec des milliers de fashionistas qui vibrent mode comme vous. Échangez, inspirez, apprenez !",
      color: "pink",
      stat: "Connexions authentiques"
    },
    {
      icon: TrendingUp,
      title: "Restez toujours tendance",
      subtitle: "Les looks du moment",
      description: "Découvrez en temps réel ce qui cartonne chez les créateurs mode. Ne ratez plus jamais une tendance !",
      color: "blue",
      stat: "Toujours à la pointe"
    },
    {
      icon: ShoppingBag,
      title: "Optimisez votre garde-robe",
      subtitle: "Moins acheter, mieux porter",
      description: "Visualisez vos articles, identifiez ceux que vous ne portez jamais, et faites de meilleurs choix shopping.",
      color: "green",
      stat: "Mode durable"
    }
  ];

  const features = [
    {
      icon: Shirt,
      title: "Dressing Virtuel Intelligent",
      description: "Organisez tous vos vêtements, accessoires et chaussures avec photos et tags",
      color: "bg-pink-500"
    },
    {
      icon: Sparkles,
      title: "Créateur de Looks",
      description: "Combinez vos articles pour créer des tenues stylées et partagez-les avec la communauté",
      color: "bg-purple-500"
    },
    {
      icon: Bookmark,
      title: "Collections Personnalisées",
      description: "Créez des boards thématiques : looks d'été, tenues de soirée, style minimaliste...",
      color: "bg-blue-500"
    },
    {
      icon: Heart,
      title: "Feed Inspirant",
      description: "Scroll infini de looks tendances, recommandés selon vos préférences style",
      color: "bg-red-500"
    },
    {
      icon: Users,
      title: "Réseau Social Mode",
      description: "Suivez vos créateurs favoris, likez, commentez, et échangez conseils style",
      color: "bg-indigo-500"
    },
    {
      icon: Crown,
      title: "Assistant IA Style",
      description: "Suggestions de combinaisons intelligentes et analyse de tendances personnalisées",
      color: "bg-yellow-500"
    }
  ];

  const faqData = [
    {
      question: "C'est quoi exactement FashionHub ?",
      answer: "FashionHub est un réseau social dédié à la mode et au style personnel. Imaginez Instagram rencontre votre dressing : vous créez votre garde-robe virtuelle, composez des looks, partagez vos tenues, et vous inspirez de milliers de fashionistas. C'est Pinterest + TikTok mais pour votre style personnel !"
    },
    {
      question: "Est-ce que c'est gratuit ?",
      answer: "Oui, totalement gratuit ! Créez votre profil, ajoutez votre dressing, partagez vos looks, suivez d'autres créateurs... Tout ça sans débourser un centime. Notre mission est de rendre la mode accessible et inspirante pour tous."
    },
    {
      question: "Dois-je vraiment photographier tous mes vêtements ?",
      answer: "Pas forcément ! Commencez par vos pièces préférées ou celles que vous portez le plus souvent. Beaucoup d'utilisateurs ajoutent progressivement leurs articles. L'important est de s'amuser et de créer des looks qui vous ressemblent !"
    },
    {
      question: "Qui peut voir mon dressing et mes looks ?",
      answer: "Vous décidez ! Votre dressing peut être privé (visible uniquement par vous) ou public. Les looks que vous publiez dans le feed sont publics par défaut, mais vous pouvez aussi créer des collections privées pour organiser vos idées sans les partager."
    },
    {
      question: "Comment l'IA m'aide-t-elle avec mon style ?",
      answer: "Notre assistant IA analyse vos pièces et vous suggère des combinaisons harmonieuses (couleurs, styles, occasions). Il détecte aussi les tendances qui correspondent à votre style personnel et vous recommande des looks similaires à ceux que vous aimez. C'est comme avoir un styliste personnel 24/7 !"
    },
    {
      question: "Puis-je acheter des vêtements sur FashionHub ?",
      answer: "Actuellement, FashionHub se concentre sur l'organisation et le partage de votre style. Mais nous travaillons sur une fonctionnalité wishlist qui vous permettra de sauvegarder les pièces que vous souhaitez acquérir et de trouver des articles similaires en boutique !"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="relative text-center py-12 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-stone-100/50 via-stone-200/50 to-stone-100/50 dark:from-stone-800/50 dark:via-stone-700/50 dark:to-stone-800/50 rounded-3xl blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-6 py-2 rounded-md text-xs font-medium mb-6 tracking-wide uppercase" data-testid="badge-hero">
              <Sparkles className="w-4 h-4 mr-2" />
              Le réseau social de la mode et du style
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-stone-900 dark:text-stone-50 mb-6 leading-tight">
              Votre dressing virtuel,
              <br />
              <span className="text-stone-700 dark:text-stone-300">
                votre communauté mode
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Créez votre garde-robe en ligne, composez des looks stylés, 
              <br className="hidden sm:block" />
              et partagez votre passion pour la mode avec une communauté inspirante.
            </p>

            <div className="bg-white/90 backdrop-blur rounded-2xl p-6 max-w-2xl mx-auto mb-8 shadow-xl">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Ce que vous allez adorer :</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 text-left" data-testid="feature-virtual-wardrobe">
                  <div className="text-2xl">👗</div>
                  <div>
                    <div className="font-semibold text-sm">Dressing virtuel</div>
                    <div className="text-gray-600 text-xs">Organisez votre garde-robe</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-left" data-testid="feature-create-looks">
                  <div className="text-2xl">✨</div>
                  <div>
                    <div className="font-semibold text-sm">Créez des looks</div>
                    <div className="text-gray-600 text-xs">Mix & match créatif</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-left" data-testid="feature-community">
                  <div className="text-2xl">💕</div>
                  <div>
                    <div className="font-semibold text-sm">Communauté mode</div>
                    <div className="text-gray-600 text-xs">Partagez et inspirez</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-left" data-testid="feature-ai-assistant">
                  <div className="text-2xl">🤖</div>
                  <div>
                    <div className="font-semibold text-sm">Assistant IA</div>
                    <div className="text-gray-600 text-xs">Suggestions personnalisées</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <button 
                onClick={() => setLocation('/profile')}
                className="btn-fashion-primary text-base sm:text-lg"
                data-testid="button-start"
              >
                <Camera className="w-5 h-5 mr-2 inline" />
                Créer mon dressing
              </button>
              <button 
                onClick={() => setLocation('/explore')}
                className="btn-fashion-secondary text-base sm:text-lg"
                data-testid="button-explore"
              >
                <Eye className="w-5 h-5 mr-2 inline" />
                Explorer les looks
              </button>
            </div>

            <div className="flex justify-center items-center space-x-2 text-sm">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-gray-600 ml-2">Rejoignez des milliers de fashionistas</span>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-stone-900 dark:text-stone-50 mb-4">Pourquoi FashionHub ?</h2>
            <p className="text-lg text-stone-600 dark:text-stone-400">Bien plus qu'un simple dressing virtuel</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emotionalBenefits.map((benefit, index) => (
              <div 
                key={index}
                className={`bg-white dark:bg-gray-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  hoveredBenefit === index ? 'ring-4 ring-stone-300 dark:ring-stone-700' : ''
                }`}
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(null)}
                data-testid={`benefit-card-${index}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800">
                    <benefit.icon className="w-6 h-6 text-stone-700 dark:text-stone-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">{benefit.title}</h3>
                    <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">{benefit.subtitle}</p>
                    <p className="text-stone-600 dark:text-stone-400 text-base mb-3 leading-relaxed">{benefit.description}</p>
                    <div className="inline-block bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-3 py-1 rounded-full font-semibold text-sm">
                      {benefit.stat}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="bg-stone-900 dark:bg-stone-100 rounded-3xl p-8 md:p-12 text-white dark:text-stone-900">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Comment ça marche ?</h2>
              <p className="text-lg opacity-90">4 étapes pour devenir une fashionista connectée</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {demoSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`text-center p-6 rounded-2xl transition-all duration-500 ${
                    activeDemo === index 
                      ? 'bg-white/20 dark:bg-stone-900/20 shadow-2xl scale-110 transform' 
                      : 'bg-white/10 dark:bg-stone-900/10 hover:bg-white/15 dark:hover:bg-stone-900/15'
                  }`}
                  data-testid={`step-card-${index}`}
                >
                  <div className="text-5xl mb-4">{step.visual}</div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="font-medium mb-3 text-sm opacity-80">{step.subtitle}</p>
                  <p className="mb-3 text-sm opacity-75">{step.description}</p>
                  <div className="bg-white/20 dark:bg-stone-900/20 px-3 py-1 rounded-full text-xs font-medium">
                    {step.emotion}
                  </div>
                  {activeDemo === index && (
                    <p className="mt-4 text-sm bg-white/10 dark:bg-stone-900/10 p-3 rounded-lg animate-fadeIn">
                      {step.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-stone-900 dark:text-stone-50 mb-4">Fonctionnalités complètes</h2>
            <p className="text-lg text-stone-600 dark:text-stone-400">Tout ce dont vous avez besoin pour gérer votre style</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-stone-200 dark:border-stone-800" data-testid={`feature-card-${index}`}>
                <CardHeader>
                  <div className="bg-stone-900 dark:bg-stone-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white dark:text-stone-900" />
                  </div>
                  <CardTitle className="text-lg text-stone-900 dark:text-stone-50">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-600 dark:text-stone-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-stone-900 dark:text-stone-50 mb-4">Ils adorent FashionHub</h2>
            <p className="text-lg text-stone-600 dark:text-stone-400">Témoignages de notre communauté</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-stone-200 dark:border-stone-800" data-testid={`testimonial-card-${index}`}>
                <div className="absolute top-4 right-4 text-2xl">{testimonial.emotion}</div>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-stone-900 dark:bg-stone-100 rounded-full flex items-center justify-center text-white dark:text-stone-900 font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 dark:text-stone-50">{testimonial.name}</div>
                      <div className="text-sm text-stone-600 dark:text-stone-400">{testimonial.role}</div>
                      <div className="text-xs text-stone-500 dark:text-stone-500">{testimonial.company}</div>
                    </div>
                  </div>
                  <div className="flex space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Quote className="w-5 h-5 text-stone-300 dark:text-stone-700 mb-2" />
                  <p className="text-stone-700 dark:text-stone-300 mb-4 italic leading-relaxed">"{testimonial.text}"</p>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex justify-between items-center p-2 bg-stone-100 dark:bg-stone-800 rounded">
                      <span className="font-semibold text-stone-700 dark:text-stone-300 text-sm">Avant :</span>
                      <span className="text-stone-600 dark:text-stone-400 text-sm">{testimonial.before}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-stone-100 dark:bg-stone-800 rounded">
                      <span className="font-semibold text-stone-700 dark:text-stone-300 text-sm">Après :</span>
                      <span className="text-stone-600 dark:text-stone-400 text-sm">{testimonial.after}</span>
                    </div>
                  </div>

                  <Badge variant="secondary" className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 mt-3">
                    📁 {testimonial.project}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="bg-white dark:bg-gray-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl text-stone-900 dark:text-stone-50 mb-4">Questions fréquentes</h2>
              <p className="text-lg text-stone-600 dark:text-stone-400">Tout ce que vous devez savoir</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqData.map((faq, index) => (
                <div key={index} className="border-2 border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden hover:border-stone-400 dark:hover:border-stone-600 transition-colors" data-testid={`faq-item-${index}`}>
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                    data-testid={`faq-button-${index}`}
                  >
                    <span className="font-semibold text-stone-900 dark:text-stone-50 pr-4">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-stone-700 dark:text-stone-300 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-400 dark:text-stone-600 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 py-4 bg-stone-50 dark:bg-stone-800 border-t-2 border-stone-200 dark:border-stone-700">
                      <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center bg-stone-900 dark:bg-stone-100 rounded-3xl p-12 text-white dark:text-stone-900 border-0 shadow-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Prêt à révolutionner votre style ?</h2>
          <p className="text-xl mb-8 opacity-90">Rejoignez des milliers de fashionistas qui transforment leur passion mode en partage créatif</p>
          <Button 
            onClick={() => setLocation('/profile')}
            className="bg-white dark:bg-stone-900 text-stone-900 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 font-bold text-lg px-10 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
            data-testid="button-cta-bottom"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Commencer gratuitement
          </Button>
        </div>

      </div>
    </div>
  );
}

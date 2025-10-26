import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Heart, Users, Camera, Shirt, TrendingUp, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import useEmblaCarousel from 'embla-carousel-react';

export default function Home() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  
  // Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Features data
  const features = [
    {
      icon: Shirt,
      title: "Dressing Virtuel",
      description: "Catalogue tous tes vêtements avec photos. Organise par catégorie, couleur, saison.",
      testId: "card-feature-wardrobe"
    },
    {
      icon: Camera,
      title: "Création de Looks",
      description: "Assemble tes articles pour créer des tenues complètes et partage-les.",
      testId: "card-feature-looks"
    },
    {
      icon: Heart,
      title: "Feed Inspirant",
      description: "Découvre des looks tendance et sauvegarde tes tenues favorites.",
      testId: "card-feature-feed"
    },
    {
      icon: Users,
      title: "Communauté Mode",
      description: "Connecte avec d'autres passionnés et partage ta passion pour le style.",
      testId: "card-feature-community"
    },
    {
      icon: Star,
      title: "Collections Thématiques",
      description: "Crée des boards pour organiser tes looks par occasion ou style.",
      testId: "card-feature-collections"
    },
    {
      icon: Sparkles,
      title: "Suggestions IA",
      description: "Découvre de nouvelles façons de porter ce que tu as déjà.",
      testId: "card-feature-ai"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section - Minimalist & Clean */}
      <div className="relative overflow-hidden bg-gradient-to-b from-stone-50 to-white dark:from-gray-900 dark:to-gray-950">
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
          <div className="text-center space-y-8">
            
            {/* Subtle Badge */}
            <div className="inline-flex items-center gap-2 bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2 mb-2">
              <Sparkles className="w-4 h-4 text-stone-600 dark:text-stone-400" />
              <span className="text-xs font-medium text-stone-600 dark:text-stone-400 tracking-wide uppercase">
                Réseau social de la mode
              </span>
            </div>
            
            {/* Main Heading - Sober Typography */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-stone-900 dark:text-stone-50 leading-tight tracking-tight">
              FashionHub
            </h1>
            
            {/* Subtitle - Clear & Concise */}
            <p className="text-xl sm:text-2xl text-stone-700 dark:text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
              Crée ton dressing virtuel, partage tes looks, inspire la communauté
            </p>
            
            {/* Description */}
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
              Organise ta garde-robe, compose des tenues et connecte avec des passionnés de mode.
            </p>
            
            {/* CTA Buttons - Minimalist Style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {!user ? (
                <>
                  <button 
                    onClick={() => setLocation('/login')}
                    className="btn-fashion-primary text-sm sm:text-base"
                    data-testid="button-start-wardrobe"
                  >
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />
                    Commencer mon dressing
                  </button>
                  <button 
                    onClick={() => setLocation('/feed')}
                    className="btn-fashion-secondary text-sm sm:text-base"
                    data-testid="button-explore-trends"
                  >
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />
                    Explorer les tendances
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setLocation('/dashboard')}
                    className="btn-fashion-primary text-sm sm:text-base"
                    data-testid="button-my-wardrobe"
                  >
                    <Shirt className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />
                    Mon dressing
                  </button>
                  <button 
                    onClick={() => setLocation('/feed')}
                    className="btn-fashion-secondary text-sm sm:text-base"
                    data-testid="button-view-feed"
                  >
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />
                    Voir le feed
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Interactive Carousel */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-950">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-stone-900 dark:text-stone-50 mb-4">
            Pourquoi FashionHub ?
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Une plateforme complète pour gérer ton style au quotidien
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Carousel Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index} 
                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4"
                    data-testid={feature.testId}
                  >
                    <div className="group h-full p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-gray-900 hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-300 hover:shadow-lg">
                      <div className="mb-4 p-3 bg-stone-100 dark:bg-stone-800 rounded-lg inline-block group-hover:bg-stone-200 dark:group-hover:bg-stone-700 transition-colors">
                        <Icon className="w-6 h-6 text-stone-700 dark:text-stone-300" />
                      </div>
                      <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-50 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center shadow-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-all duration-200 opacity-0 md:opacity-100 hover:scale-110"
            aria-label="Précédent"
            data-testid="button-carousel-prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center shadow-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-all duration-200 opacity-0 md:opacity-100 hover:scale-110"
            aria-label="Suivant"
            data-testid="button-carousel-next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === selectedIndex
                  ? 'w-8 h-2 bg-stone-900 dark:bg-stone-100'
                  : 'w-2 h-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400 dark:hover:bg-stone-600'
              }`}
              aria-label={`Aller à la diapositive ${index + 1}`}
              data-testid={`dot-carousel-${index}`}
            />
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-stone-50 dark:bg-gray-900 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-stone-900 dark:text-stone-50 mb-3 sm:mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto px-2">
              Trois étapes simples pour révolutionner ta façon de gérer ton style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            <div className="text-center px-2" data-testid="step-catalog">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-stone-900 dark:bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 text-2xl sm:text-2xl md:text-3xl font-bold text-white dark:text-stone-900 shadow-lg">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-stone-900 dark:text-stone-50 mb-2 sm:mb-3">
                Catalogue ton dressing
              </h3>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
                Prends en photo tous tes vêtements et accessoires. 
                Ajoute-les à ton dressing virtuel avec leurs caractéristiques.
              </p>
            </div>

            <div className="text-center px-2" data-testid="step-create">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-stone-900 dark:bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 text-2xl sm:text-2xl md:text-3xl font-bold text-white dark:text-stone-900 shadow-lg">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-stone-900 dark:text-stone-50 mb-2 sm:mb-3">
                Crée tes looks
              </h3>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
                Combine tes articles pour créer des tenues. 
                Visualise tes looks et partage tes meilleures créations.
              </p>
            </div>

            <div className="text-center px-2" data-testid="step-inspire">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-stone-900 dark:bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 text-2xl sm:text-2xl md:text-3xl font-bold text-white dark:text-stone-900 shadow-lg">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-stone-900 dark:text-stone-50 mb-2 sm:mb-3">
                Inspire & sois inspiré
              </h3>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
                Découvre les looks de la communauté. 
                Échange avec d'autres passionnés et trouve l'inspiration au quotidien.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <Card className="bg-stone-900 dark:bg-stone-100 p-6 sm:p-8 md:p-12 text-center text-white dark:text-stone-900 shadow-2xl border-0">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Prêt à révolutionner ton style ?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 px-2">
            Rejoins des milliers de fashionistas qui organisent déjà leur dressing sur FashionHub
          </p>
          <Button 
            onClick={() => setLocation(user ? '/dashboard' : '/login')}
            size="lg"
            className="bg-white dark:bg-stone-900 text-stone-900 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 text-base sm:text-lg px-8 py-5 sm:px-10 sm:py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
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

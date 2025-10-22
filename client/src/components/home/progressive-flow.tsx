import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { 
  Zap, 
  ChevronRight, 
  ChevronLeft,
  FileText,
  Target,
  Euro,
  Calendar,
  MapPin,
  PlusCircle,
  Hammer,
  Home,
  Baby,
  BookOpen,
  Heart,
  Car,
  ChefHat,
  Globe,
  Palette,
  Laptop,
  Settings,
  Scale,
  Star,
  Cpu,
  Crown,
  Stethoscope,
  Building,
  PiggyBank,
  Paintbrush,
  Microscope,
  GraduationCap,
  Trash2,
  Users
} from 'lucide-react';
// Removed unused import * as LucideIcons from 'lucide-react';
import { CATEGORIES, connectionCategories } from '@/lib/categories';
import { SimpleAIEnhancement } from '@/components/ai/simple-ai-enhancement';
import { TextSuggestionButton } from '@/components/ai/text-suggestion-button';
import { AIFeedbackButtons } from '@/components/ai/feedback-buttons';
import { InteractiveMap } from '@/components/location/interactive-map';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TeamMissionCreator } from '@/components/missions/team-mission-creator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { GeoSearch } from '@/components/location/geo-search';
import { useQueryClient } from '@tanstack/react-query';
import type { TeamRequirement } from '@shared/schema';
import { useLanguage } from '@/hooks/use-language';

type StylePersona = 'fashionista' | 'minimalist' | 'influencer' | 'sustainable' | null;

interface FashionProfileData {
  persona: StylePersona;
  favoriteBrands: string[];
  styleTags: string[];
  firstLooks: File[];
  bio: string;
}

interface ProgressiveFlowProps {
  onComplete?: (data: any) => void;
  onSubmit?: (data: any) => void;
  isLoading?: boolean;
  error?: string | null;
  initialStep?: number;
}

export function ProgressiveFlow({ onComplete, onSubmit, isLoading: externalLoading, error: externalError, initialStep = -1 }: ProgressiveFlowProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  // Lire le paramètre step de l'URL immédiatement
  const getInitialStep = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const stepParam = urlParams.get('step');
      if (stepParam) {
        const parsedStep = parseInt(stepParam);
        if (!isNaN(parsedStep)) {
          return parsedStep;
        }
      }
    }
    return initialStep;
  };

  const [currentStep, setCurrentStep] = useState(getInitialStep()); // Commencer au niveau initial avec lecture URL
  const [isCreating, setIsCreating] = useState(false);
  const [clickedCard, setClickedCard] = useState<string | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isTeamMode, setIsTeamMode] = useState(false); // State pour le mode équipe
  const [isSubmitting, setIsSubmitting] = useState(false); // State pour le bouton de soumission
  const [teamRequirements, setTeamRequirements] = useState<TeamRequirement[]>([]);

  // Function to get Lucide icon component from icon name
  const getIcon = (iconName: string) => {
    const iconMap: {[key: string]: any} = {
      'Hammer': Hammer, // Construction
      'Home': Home,     // Services à domicile
      'Baby': Baby,     // Garde d'enfants
      'BookOpen': BookOpen, // Cours particuliers
      'Heart': Heart,   // Bien-être & Santé
      'Car': Car,       // Automobile
      'ChefHat': ChefHat, // Restauration & Traiteur
      'Calendar': Calendar, // Événementiel
      'Globe': Globe,   // Web & Digital
      'Palette': Palette, // Design & Créatif
      'Laptop': Laptop, // Tech & Consulting
      'Settings': Settings, // Autres Services
      'Scale': Scale,   // Avocat
      'Star': Star,     // Célébrité
      'Cpu': Cpu,       // Expert Informatique
      'Crown': Crown,   // Dirigeant
      'Stethoscope': Stethoscope, // Médecin Spécialiste
      'Target': Target, // Coach Personnel
      'Building': Building, // Architecte
      'PiggyBank': PiggyBank, // Conseiller Financier
      'Paintbrush': Paintbrush, // Artiste
      'Microscope': Microscope, // Scientifique
      'GraduationCap': GraduationCap // Professeur/Formateur
    };
    return iconMap[iconName] || Target;
  };
  const [persona, setPersona] = useState<StylePersona>(null);
  const [fashionProfile, setFashionProfile] = useState<FashionProfileData>({
    persona: null,
    favoriteBrands: [],
    styleTags: [],
    firstLooks: [],
    bio: ''
  });

  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [showFeedbackButtons, setShowFeedbackButtons] = useState(false);
  const [textSuggestionFeedback, setTextSuggestionFeedback] = useState<{[key: string]: boolean}>({});

  const progress = ((currentStep + 2) / 5) * 100; // 5 niveaux au total (niveau -1 + 4 étapes)

  // Function to create the mission via API
  const createMission = async () => {
    setIsCreating(true);

    try {
      // Mode équipe
      if (isTeamMode) {
        console.log('📋 Création mission en équipe');

        if (teamRequirements.length === 0) {
          toast({
            title: 'Équipe vide',
            description: 'Veuillez ajouter au moins une spécialité à votre équipe.',
            variant: 'destructive'
          });
          setIsCreating(false);
          return;
        }

        const response = await fetch('/api/teams/create-project', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            projectData: {
              title: projectData.title,
              description: projectData.description,
              category: selectedCategory || 'developpement',
              budget: projectData.budget || '1000',
              location: projectData.needsLocation ? projectData.location.address : 'Remote',
              isTeamMode: true
            },
            teamRequirements
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Erreur serveur' }));
          throw new Error(errorData.error || errorData.details || `Erreur ${response.status}`);
        }

        const result = await response.json();
        console.log('✅ Projet équipe créé:', result);

        toast({
          title: 'Projet d\'équipe créé !',
          description: `Votre projet nécessite ${teamRequirements.length} spécialité${teamRequirements.length > 1 ? 's' : ''} et est maintenant visible sur le marketplace.`,
          duration: 3000
        });

        // Invalider le cache des missions
        queryClient.invalidateQueries({ queryKey: ['missions'] });

        // Rediriger vers les missions
        setLocation('/missions');
        return;
      }

      // Mode mission simple
      console.log('📋 Création mission simple');
      const missionData = {
        title: projectData.title,
        description: projectData.description,
        category: selectedCategory,
        budget: Number(projectData.budget),
        location: projectData.needsLocation ? projectData.location.address : 'Remote',
        userId: user?.id?.toString() || null,
        clientName: user?.name || 'Utilisateur'
      };

      // Si onSubmit est fourni (depuis create-mission.tsx), l'utiliser
      if (onSubmit) {
        console.log('🔄 Utilisation de onSubmit fourni par create-mission.tsx');
        await onSubmit(missionData);
        return; // onSubmit gère la redirection et les messages
      }

      // Sinon, comportement par défaut (appel API direct)
      const response = await fetch('/api/missions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(missionData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Mission créée avec succès:', result);

        toast({ 
          title: 'Mission créée !', 
          description: 'Votre mission a été publiée avec succès.' 
        });

        // Invalider le cache des missions pour forcer le rechargement
        queryClient.invalidateQueries({ queryKey: ['missions'] });

        // Rediriger vers les missions
        setLocation('/missions');
        onComplete?.({
          serviceType,
          selectedCategory,
          projectData,
          missionId: result.id
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la création de la mission');
      }
    } catch (error) {
      console.error('Erreur création mission:', error);
      toast({
        title: 'Erreur de création',
        description: (error as Error).message || 'Impossible de créer la mission. Vérifiez votre connexion.',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  // --- Nouvelle fonction handleSubmitMission modifiée ---
  const handleSubmitMission = async (values: any) => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour créer une mission",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Ensure proper data formatting before sending
      const formattedData = {
        title: values.title,
        description: values.description,
        category: values.category || 'developpement',
        budget: values.budget ? parseInt(values.budget.toString()) : null,
        location: values.location || null,
        urgency: values.urgency || 'medium',
        requirements: values.requirements || null,
        tags: values.tags || [],
        deadline: values.deadline ? new Date(values.deadline).toISOString() : null,
      };

      console.log('🚀 Sending formatted data:', formattedData);

      const response = await fetch('/api/missions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Erreur serveur:', result);
        throw new Error(result.error || 'Erreur lors de la création de la mission');
      }

      console.log('Mission créée avec succès:', result);

      toast({
        title: "Mission créée !",
        description: "Votre mission a été publiée avec succès",
      });

      onComplete?.(result);
    } catch (error) {
      console.error('Erreur création mission:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de créer la mission. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };



  // Animation d'entrée pour chaque étape
  useEffect(() => {
    const timer = setTimeout(() => {
      // Force un re-render pour les animations CSS
    }, 100);
    return () => clearTimeout(timer);
  }, [currentStep]);



  // Étape -1: Présentation du réseau social mode
  const renderStepMinus1 = () => (
    <div className="w-full min-h-[100svh] md:h-screen md:max-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 overflow-y-auto md:overflow-hidden">
      <div className="flex flex-col justify-start md:justify-center items-center h-full px-2 pt-2 pb-4 md:px-6 md:py-8">
        <div className="text-center w-full max-w-5xl mx-auto space-y-2 md:space-y-8 flex flex-col md:justify-center min-h-0">

          {/* En-tête principal */}
          <div className="space-y-2 md:space-y-6 relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative max-w-4xl mx-auto px-3">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 dark:text-white font-semibold leading-[1.3]">
                Votre garde-robe devient votre portfolio de style
              </h1>
              <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 mt-2 md:mt-4">
                Partagez vos looks, découvrez l'inspiration, créez votre identité mode
              </p>
              <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full mx-auto mt-2 md:mt-4"></div>
            </div>
          </div>

          {/* Propositions de valeur mode */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 max-w-4xl mx-auto flex-none md:flex-1 md:min-h-0">

            {/* Garde-robe virtuelle */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-3 md:p-6 text-center space-y-2 md:space-y-3 group hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-pink-100/50 dark:border-gray-700/50">
              <div className="w-10 h-10 md:w-16 md:h-16 mx-auto bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Home className="w-5 h-5 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white">
                Dressing virtuel
              </h3>
              <p className="text-xs md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Organisez votre garde-robe, créez des looks, partagez votre style unique
              </p>
            </div>

            {/* Communauté mode */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-3 md:p-6 text-center space-y-2 md:space-y-3 group hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-purple-100/50 dark:border-gray-700/50">
              <div className="w-10 h-10 md:w-16 md:h-16 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-5 h-5 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white">
                Feed d'inspiration
              </h3>
              <p className="text-xs md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Découvrez les looks de la communauté, suivez vos fashionistas préférés
              </p>
            </div>

            {/* IA Mode */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-3 md:p-6 text-center space-y-2 md:space-y-3 group hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-blue-100/50 dark:border-gray-700/50">
              <div className="w-10 h-10 md:w-16 md:h-16 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Star className="w-5 h-5 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white">
                IA Fashion
              </h3>
              <p className="text-xs md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Suggestions de looks automatiques, détection de tendances, conseils personnalisés
              </p>
            </div>
          </div>

          {/* Bouton d'action */}
          <div className="flex justify-center items-center mt-3 md:mt-12 px-4 flex-shrink-0">
            <Button 
              onClick={() => setCurrentStep(0)}
              className="w-full sm:w-auto bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 hover:from-pink-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-2 md:px-12 md:py-4 rounded-2xl font-semibold transition-all duration-300 text-sm md:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
              size="lg"
              data-testid="button-create-profile"
            >
              <span className="flex items-center space-x-2">
                <span>Créer mon profil mode</span>
                <span className="animate-bounce">✨</span>
              </span>
            </Button>
          </div>

          {/* Indicateur */}
          <div className="mt-2 md:mt-8 flex-shrink-0">
            <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm px-4 opacity-75">
              Rejoignez des milliers de fashionistas qui partagent leur style
            </p>
          </div>

        </div>
      </div>
    </div>
  );


  // Étape 0: Choix de la persona mode
  const renderStep0 = () => {
    const personas = [
      {
        id: 'fashionista' as StylePersona,
        name: 'Fashionista',
        icon: '🌟',
        description: 'Je partage régulièrement mes outfits et suis les tendances',
        color: 'from-pink-500 to-rose-500'
      },
      {
        id: 'minimalist' as StylePersona,
        name: 'Minimaliste',
        icon: '🎨',
        description: 'Garde-robe capsule, qualité > quantité',
        color: 'from-gray-500 to-slate-500'
      },
      {
        id: 'influencer' as StylePersona,
        name: 'Influenceur',
        icon: '💎',
        description: 'Créateur de contenu avec une grande collection',
        color: 'from-purple-500 to-indigo-500'
      },
      {
        id: 'sustainable' as StylePersona,
        name: 'Eco-responsable',
        icon: '🌱',
        description: 'Seconde main, vide-dressing et mode durable',
        color: 'from-green-500 to-emerald-500'
      }
    ];

    return (
      <div className="text-center space-y-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-gray-900">
            Quel est votre style ?
          </h2>
          <p className="text-gray-600 text-lg">
            Choisissez la persona qui vous correspond le mieux
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {personas.map((p) => (
            <Card
              key={p.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 group ${
                persona === p.id ? 'ring-4 ring-offset-2 ring-pink-500 bg-pink-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => {
                setPersona(p.id);
                setFashionProfile(prev => ({ ...prev, persona: p.id }));
                setTimeout(() => setCurrentStep(1), 400);
              }}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${p.color} rounded-full flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                <p className="text-gray-600 text-sm">{p.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(-1)}
          className="mt-4"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
      </div>
    );
  };

  // Étape 1: Upload premiers looks
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-900">
          Partagez vos premiers looks
        </h2>
        <p className="text-gray-600 text-lg">
          Uploadez 3 à 5 photos de vos tenues préférées pour commencer
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-pink-500 transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                const files = Array.from(e.target.files).slice(0, 5);
                setFashionProfile(prev => ({ ...prev, firstLooks: files }));
              }
            }}
            className="hidden"
            id="look-upload"
          />
          <label htmlFor="look-upload" className="cursor-pointer">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <PlusCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Cliquez pour uploader vos photos
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  JPG, PNG jusqu'à 10MB chacune
                </p>
              </div>
            </div>
          </label>
        </div>

        {fashionProfile.firstLooks.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            {fashionProfile.firstLooks.map((file, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Look ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between max-w-2xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(0)}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <Button
          onClick={() => setCurrentStep(2)}
          disabled={fashionProfile.firstLooks.length < 1}
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
        >
          Continuer
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  // Étape 2: Style tags et marques favorites
  const renderStep2 = () => {
    const styleTags = [
      'Vintage', 'Streetwear', 'Minimaliste', 'Bohème', 'Chic', 
      'Sportswear', 'Casual', 'Elegant', 'Rock', 'Preppy',
      'Grunge', 'Y2K', 'Cottagecore', 'Dark Academia'
    ];

    const popularBrands = [
      'Zara', 'H&M', 'Nike', 'Adidas', 'Uniqlo',
      'COS', 'Mango', 'Pull&Bear', 'Bershka', 'Massimo Dutti'
    ];

    return (
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-gray-900">
            Définissez votre style
          </h2>
          <p className="text-gray-600 text-lg">
            Sélectionnez vos tags et marques préférées
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Style Tags */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-900">
              Tags de style
            </label>
            <div className="flex flex-wrap gap-2">
              {styleTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={fashionProfile.styleTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                    fashionProfile.styleTags.includes(tag)
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setFashionProfile(prev => ({
                      ...prev,
                      styleTags: prev.styleTags.includes(tag)
                        ? prev.styleTags.filter(t => t !== tag)
                        : [...prev.styleTags, tag]
                    }));
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Marques favorites */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-900">
              Marques favorites
            </label>
            <div className="flex flex-wrap gap-2">
              {popularBrands.map((brand) => (
                <Badge
                  key={brand}
                  variant={fashionProfile.favoriteBrands.includes(brand) ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                    fashionProfile.favoriteBrands.includes(brand)
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setFashionProfile(prev => ({
                      ...prev,
                      favoriteBrands: prev.favoriteBrands.includes(brand)
                        ? prev.favoriteBrands.filter(b => b !== brand)
                        : [...prev.favoriteBrands, brand]
                    }));
                  }}
                >
                  {brand}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between max-w-3xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(1)}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <Button
            onClick={() => setCurrentStep(3)}
            disabled={fashionProfile.styleTags.length === 0}
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
          >
            Continuer
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  // Étape 3: Création profil complet
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-900">
          Finalisez votre profil
        </h2>
        <p className="text-gray-600 text-lg">
          Ajoutez une bio pour vous présenter à la communauté
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio (optionnel)
          </label>
          <Textarea
            placeholder="Parlez de votre style, vos inspirations, ce qui vous passionne dans la mode..."
            rows={4}
            value={fashionProfile.bio}
            onChange={(e) => setFashionProfile(prev => ({ ...prev, bio: e.target.value }))}
            className="resize-none"
          />
        </div>

        {/* Récapitulatif */}
        <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-pink-600" />
              Récapitulatif de votre profil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Persona</p>
              <p className="text-lg font-semibold capitalize">{persona}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Looks uploadés</p>
              <p className="text-lg font-semibold">{fashionProfile.firstLooks.length} photo(s)</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Tags de style</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {fashionProfile.styleTags.slice(0, 5).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {fashionProfile.styleTags.length > 5 && (
                  <Badge variant="secondary" className="text-xs">
                    +{fashionProfile.styleTags.length - 5}
                  </Badge>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Marques favorites</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {fashionProfile.favoriteBrands.slice(0, 5).map(brand => (
                  <Badge key={brand} variant="outline" className="text-xs">
                    {brand}
                  </Badge>
                ))}
                {fashionProfile.favoriteBrands.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{fashionProfile.favoriteBrands.length - 5}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between max-w-2xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(2)}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <Button
          onClick={() => {
            toast({
              title: "Profil créé ! 🎉",
              description: "Bienvenue dans la communauté mode !",
            });
            setLocation('/explore');
          }}
          disabled={isCreating}
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          {isCreating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Création...
            </>
          ) : (
            <>
              Créer mon profil
              <Star className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );

  // Ancien renderStep0 devient renderStepOld0 (conservé mais non utilisé)
  const renderStepOld0 = () => (
    <div className="text-center space-y-3">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 progressive-flow-title">
          Comment souhaitez-vous procéder ?
        </h2>
        <p className="text-gray-600 progressive-flow-description">
          Sélectionnez la méthode qui vous convient le mieux
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto progressive-flow-grid">
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 group card-shine progressive-flow-card ${
            serviceType === 'mise-en-relation' ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:bg-purple-50/30'
          } ${clickedCard === 'mise-en-relation' ? 'scale-95 ring-4 ring-purple-400 bg-purple-100 animate-pulse-glow' : ''}`}
          onClick={() => {
            setServiceType('mise-en-relation');
            setClickedCard('mise-en-relation');
            setTimeout(() => {
              setCurrentStep(1);
              setClickedCard(null);
            }, 400);
          }}
        >
          <CardContent className="p-6 text-center">
            <Zap className={`w-12 h-12 mx-auto mb-4 text-purple-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
              clickedCard === 'mise-en-relation' ? 'scale-125 animate-pulse text-purple-800' : ''
            }`} />
            <h3 className="text-xl font-semibold mb-2">Mise en relation</h3>
            <p className="text-gray-600 mb-4">
              Contact direct avec des prestataires sélectionnés
            </p>
            <div className="space-y-2">
              <Badge variant="secondary" className="text-xs px-3 py-1">Fini la recherche de contact infructueuse</Badge>
              <Badge variant="secondary" className="text-xs px-3 py-1">Notre réseau vous recommande</Badge>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 group card-shine progressive-flow-card ${
            serviceType === 'appel-offres' ? 'ring-2 ring-orange-500 bg-orange-50' : 'hover:bg-orange-50/30'
          } ${clickedCard === 'appel-offres' ? 'scale-95 ring-4 ring-orange-400 bg-orange-100 animate-pulse-glow' : ''}`}
          onClick={() => {
            setServiceType('appel-offres');
            setClickedCard('appel-offres');
            setTimeout(() => {
              setCurrentStep(1);
              setClickedCard(null);
            }, 400);
          }}
        >
          <CardContent className="p-6 text-center">
            <Target className={`w-12 h-12 mx-auto mb-4 text-orange-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
              clickedCard === 'appel-offres' ? 'scale-125 animate-pulse text-orange-800' : ''
            }`} />
            <h3 className="text-xl font-semibold mb-2">Appel d'offres</h3>
            <p className="text-gray-600 mb-4">
              Recevez plusieurs propositions et choisissez la meilleure
            </p>
            <div className="space-y-2">
              <Badge variant="secondary" className="text-xs px-3 py-1">Publiez votre projet facilement</Badge>
              <Badge variant="secondary" className="text-xs px-3 py-1">Comparez et sélectionnez les offres</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button 
        variant="outline" 
        onClick={() => setCurrentStep(-1)}
        className="mt-4"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>
    </div>
  );

  // Étape 2 old (complétude annonce) - Non utilisée dans le flow mode
  const renderStepOld2 = () => {
    const categoriesToSearch = serviceType === 'mise-en-relation' ? connectionCategories : CATEGORIES;
    const selectedCat = categoriesToSearch.find(cat => cat.id === selectedCategory);
    const projectLabel = serviceType === 'mise-en-relation' ? 'demande de contact' : 'projet';

    // Fonctions pour gérer les rôles d'équipe
    const addTeamRole = () => {
      setTeamRequirements([...teamRequirements, {
        profession: '',
        description: '',
        required_skills: [],
        estimated_budget: Math.round(Number(projectData.budget) * 0.3) || 1000,
        estimated_days: 10,
        min_experience: 2,
        is_lead_role: teamRequirements.length === 0,
        importance: 'high' as const
      }]);
    };

    const updateTeamRole = (index: number, field: string, value: any) => {
      const updated = [...teamRequirements];
      updated[index] = { ...updated[index], [field]: value };
      setTeamRequirements(updated);
    };

    const removeTeamRole = (index: number) => {
      setTeamRequirements(teamRequirements.filter((_, i) => i !== index));
    };

    const updateSkills = (index: number, skillsText: string) => {
      const skills = skillsText.split(',').map(s => s.trim()).filter(s => s.length > 0);
      updateTeamRole(index, 'required_skills', skills);
    };

    return (
      <div className="space-y-3">
        <div className="text-center space-y-2 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 animate-bounce-in progressive-flow-title">
            Décrivez votre {projectLabel} {selectedCat?.name}
          </h2>
          <p className="text-gray-600 animate-slide-up progressive-flow-description">
            Plus votre description est précise, {serviceType === 'mise-en-relation' ? 'plus les experts seront adaptés' : 'meilleures seront les propositions'}
          </p>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto progressive-flow-form">
          {/* Switch Mode Équipe */}
          <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Switch
              id="team-mode"
              checked={isTeamMode}
              onCheckedChange={setIsTeamMode}
            />
            <Label htmlFor="team-mode" className="text-blue-900 font-medium">
              🤝 Mode équipe - Diviser le projet en plusieurs spécialités
            </Label>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Titre du {projectLabel} *
              </label>
              <TextSuggestionButton
                currentText={projectData.title}
                fieldType="title"
                category={selectedCategory}
                onSuggestion={(suggestedText) => {
                  setProjectData(prev => ({ ...prev, title: suggestedText }));
                  setTextSuggestionFeedback(prev => ({ ...prev, title: true }));
                }}
                className="text-xs"
              />
            </div>
            <Input
              placeholder={serviceType === 'mise-en-relation' ? `Ex: Recherche ${selectedCat?.name.toLowerCase()} pour conseil juridique` : "Ex: Création d'un site web e-commerce"}
              value={projectData.title}
              onChange={(e) => setProjectData(prev => ({ ...prev, title: e.target.value }))}
            />
            {/* Mini feedback après suggestion de titre */}
            {textSuggestionFeedback.title && (
              <div className="mt-2">
                <AIFeedbackButtons
                  phase="brief_enhance"
                  prompt={{ field: 'title', text: projectData.title }}
                  onFeedback={() => setTextSuggestionFeedback(prev => ({ ...prev, title: false }))}
                />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Description détaillée *
              </label>
              <TextSuggestionButton
                currentText={projectData.description}
                fieldType="description"
                category={selectedCategory}
                onSuggestion={(suggestedText) => {
                  setProjectData(prev => ({ ...prev, description: suggestedText }));
                  setTextSuggestionFeedback(prev => ({ ...prev, description: true }));
                }}
                className="text-xs"
              />
            </div>
            <Textarea
              placeholder={serviceType === 'mise-en-relation' ? "Décrivez le type de consultation recherchée, vos besoins spécifiques, le contexte..." : "Décrivez précisément votre besoin, vos objectifs, contraintes techniques..."}
              rows={4}
              value={projectData.description}
              onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
            />
            {/* Mini feedback après suggestion de description */}
            {textSuggestionFeedback.description && (
              <div className="mt-2">
                <AIFeedbackButtons
                  phase="brief_enhance"
                  prompt={{ field: 'description', text: projectData.description }}
                  onFeedback={() => setTextSuggestionFeedback(prev => ({ ...prev, description: false }))}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Euro className="w-4 h-4 inline mr-1" />
              Budget en euros *
            </label>
            <Input
              type="number"
              placeholder="Ex: 5000"
              min="10"
              max="1000000"
              value={projectData.budget}
              onChange={(e) => setProjectData(prev => ({ ...prev, budget: e.target.value }))}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Montant en euros (entre 10€ et 1 000 000€)
            </p>
          </div>

          {/* Intégration IA Enhancement */}
          <div className="mt-6">
            <SimpleAIEnhancement
              title={projectData.title}
              description={projectData.description}
              category={selectedCategory}
              onPriceSuggestion={(priceSuggestion) => {
                const suggestedBudget = `${priceSuggestion.minPrice} - ${priceSuggestion.maxPrice} €`;
                setProjectData(prev => ({ ...prev, budget: suggestedBudget }));
                setAiSuggestions({ type: 'pricing', data: priceSuggestion });
                setShowFeedbackButtons(true);
              }}
            />

            {/* Boutons feedback IA */}
            {showFeedbackButtons && aiSuggestions && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    🤖 Comment trouvez-vous cette suggestion IA ?
                  </p>
                  <div className="text-xs text-gray-600">
                    Votre retour nous aide à améliorer nos suggestions
                  </div>
                </div>
                <AIFeedbackButtons
                  phase="brief_enhance"
                  prompt={{
                    title: projectData.title,
                    description: projectData.description,
                    category: selectedCategory,
                    suggestion: aiSuggestions
                  }}
                  onFeedback={(accepted, rating, edits) => {
                    console.log('Feedback IA reçu:', { accepted, rating, edits });
                    setShowFeedbackButtons(false);
                    toast({
                      title: "Merci pour votre retour !",
                      description: "Vos commentaires nous aident à améliorer l'IA"
                    });
                  }}
                />
              </div>
            )}
          </div>

          {/* Section Localisation */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Localisation
            </h3>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="remote"
                  name="location-type"
                  checked={!projectData.needsLocation}
                  onChange={() => setProjectData(prev => ({ ...prev, needsLocation: false, location: { ...prev.location, address: '' } }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="remote" className="text-sm font-medium text-gray-700">
                  À distance
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="onsite"
                  name="location-type"
                  checked={projectData.needsLocation}
                  onChange={() => setProjectData(prev => ({ ...prev, needsLocation: true }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="onsite" className="text-sm font-medium text-gray-700">
                  Intervention sur site
                </label>
              </div>
            </div>

            {projectData.needsLocation && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code postal (5 chiffres) *
                </label>
                <Input
                  type="text"
                  placeholder="Ex: 75001"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  value={projectData.location.address}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 5);
                    setProjectData(prev => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        address: value
                      }
                    }));
                  }}
                  className="w-40"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Saisissez le code postal de l'intervention
                </p>
              </div>
            )}
          </div>

          {/* Section Composition d'équipe - Affichée seulement si mode équipe activé */}
          {isTeamMode && (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  👥 Composition de l'équipe
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTeamRole}
                  data-testid="button-add-team-role"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Ajouter une spécialité
                </Button>
              </div>

              <p className="text-sm text-gray-600">
                Définissez les différentes spécialités recherchées pour votre projet
              </p>

              {teamRequirements.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>Aucune spécialité ajoutée</p>
                  <p className="text-sm mt-2">Cliquez sur "Ajouter une spécialité" pour commencer</p>
                </div>
              )}

              <div className="space-y-3">
                {teamRequirements.map((role, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs text-gray-600">Profession *</Label>
                            <Input
                              value={role.profession}
                              onChange={(e) => updateTeamRole(index, 'profession', e.target.value)}
                              placeholder="Ex: Développeur Frontend"
                              data-testid={`input-team-profession-${index}`}
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600">Budget (€) *</Label>
                            <Input
                              type="number"
                              value={role.estimated_budget}
                              onChange={(e) => updateTeamRole(index, 'estimated_budget', Number(e.target.value))}
                              placeholder="1000"
                              data-testid={`input-team-budget-${index}`}
                            />
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTeamRole(index)}
                          className="ml-2"
                          data-testid={`button-remove-team-role-${index}`}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>

                      <div>
                        <Label className="text-xs text-gray-600">Description du rôle</Label>
                        <Textarea
                          value={role.description}
                          onChange={(e) => updateTeamRole(index, 'description', e.target.value)}
                          placeholder="Décrivez les responsabilités..."
                          rows={2}
                          data-testid={`textarea-team-description-${index}`}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label className="text-xs text-gray-600">Jours estimés</Label>
                          <Input
                            type="number"
                            value={role.estimated_days}
                            onChange={(e) => updateTeamRole(index, 'estimated_days', Number(e.target.value))}
                            placeholder="10"
                            data-testid={`input-team-days-${index}`}
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Expérience (années)</Label>
                          <Input
                            type="number"
                            value={role.min_experience}
                            onChange={(e) => updateTeamRole(index, 'min_experience', Number(e.target.value))}
                            placeholder="2"
                            data-testid={`input-team-experience-${index}`}
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Importance</Label>
                          <Select
                            value={role.importance}
                            onValueChange={(value) => updateTeamRole(index, 'importance', value)}
                          >
                            <SelectTrigger data-testid={`select-team-importance-${index}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">Haute</SelectItem>
                              <SelectItem value="medium">Moyenne</SelectItem>
                              <SelectItem value="low">Basse</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs text-gray-600">Compétences requises (séparées par des virgules)</Label>
                        <Input
                          value={role.required_skills.join(', ')}
                          onChange={(e) => updateSkills(index, e.target.value)}
                          placeholder="React, TypeScript, CSS"
                          data-testid={`input-team-skills-${index}`}
                        />
                        {role.required_skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {role.required_skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={role.is_lead_role}
                          onCheckedChange={(checked) => updateTeamRole(index, 'is_lead_role', checked)}
                          data-testid={`switch-team-lead-${index}`}
                        />
                        <Label className="text-sm">Rôle de chef d'équipe</Label>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(1)}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>

            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:hover:scale-100 disabled:hover:shadow-none"
              disabled={
                isCreating || !projectData.title.trim() || 
                !projectData.description.trim() ||
                !projectData.budget.trim() ||
                isNaN(Number(projectData.budget)) ||
                Number(projectData.budget) < 10 ||
                Number(projectData.budget) > 1000000 ||
                (projectData.needsLocation && (!projectData.location.address || projectData.location.address.length !== 5))
              }
              onClick={createMission}
              data-testid="button-create-mission"
            >
              {isCreating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Création...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  {isTeamMode ? 'Créer le projet équipe' : 'Publier la mission'}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  };


  const steps = [renderStepMinus1, renderStep0, renderStep1, renderStep2, renderStep3];

  return (
    <div className="w-full max-w-6xl mx-auto progressive-flow-container">
      <div className="bg-transparent pb-24">
        <div className="px-4 relative progressive-flow-step">
          {steps[currentStep + 1]()}
        </div>

        {/* Barre de progression simplifiée - masquée pour le niveau présentation */}
        {currentStep >= 0 && (
          <div className="bg-gradient-to-r from-blue-50/5 via-indigo-50/5 to-purple-50/5 p-4 rounded-xl mt-6 mb-6 border border-blue-200/20 backdrop-blur-sm progressive-flow-progress">
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700">
                Étape {currentStep + 1} sur 4
              </span>
            </div>

            {/* Barre de progression avec gradient et animation */}
            <div className="w-full h-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-700 ease-out shadow-sm relative"
                style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
              >
                {/* Effet de brillance */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
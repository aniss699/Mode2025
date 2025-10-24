import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useCreateApi } from '@/hooks/useApiCall';
import { useFormSubmit, validationHelpers } from '@/hooks/useFormSubmit';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Users, Briefcase, Target, CheckCircle, Eye, Sparkles, Camera } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onSwitchMode: (mode: 'login' | 'register') => void;
}

interface OnboardingData {
  name: string;
  email: string;
  password: string;
  role: 'CLIENT' | 'PRO';
  company?: string;
  specialties?: string[];
  experience?: string;
  budget?: string;
  goals?: string[];
  style_preferences?: string[];
  fashion_interests?: string[];
  favorite_brands?: string[];
  size_info?: { [key: string]: string };
  bio?: string;
}

export function AuthModal({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // État pour l'onboarding
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    name: '',
    email: '',
    password: '',
    role: 'CLIENT',
    goals: []
  });
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Utilisation de l'architecture centralisée pour éliminer la duplication
  const loginApi = useCreateApi<any, { email: string; password: string }>('/api/auth/login', {
    successMessage: 'Connexion réussie ! Bienvenue sur FashionHub',
    errorContext: 'Connexion utilisateur',
    onSuccess: (data) => {
      login(data.user);
      onClose();
    },
  });

  const loginSubmit = useFormSubmit<{ email: string; password: string }>({
    onSubmit: async (data) => {
      loginApi.mutate(data);
    },
    validateBeforeSubmit: validationHelpers.validateAuth,
  });

  const registerMutation = useCreateApi<any, OnboardingData>('/api/auth/register', {
    successMessage: '🎉 Bienvenue sur FashionHub ! Votre compte a été créé',
    errorContext: 'Inscription utilisateur',
    onSuccess: (data) => {
      login(data.user);
      setShowOnboarding(false);
      onClose();
    },
  });

  // Fonctions pour l'onboarding
  const startOnboarding = () => {
    // Copier les données du formulaire initial dans l'onboarding
    setOnboardingData(prev => ({
      ...prev,
      email: formData.email.trim(),
      password: formData.password
    }));
    setShowOnboarding(true);
    setOnboardingStep(0);
  };

  const nextOnboardingStep = () => {
    // Validation avant de passer à l'étape suivante
    if (onboardingStep === 0 && !onboardingData.role) {
      loginSubmit.handleError(new Error('Veuillez sélectionner un type de profil'), 'Validation onboarding');
      return;
    }

    if (onboardingStep === 1) {
      if (!onboardingData.name || onboardingData.name.trim().length < 2) {
        loginSubmit.handleError(new Error('Le nom doit contenir au moins 2 caractères'), 'Validation onboarding');
        return;
      }
      if (!onboardingData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(onboardingData.email)) {
        loginSubmit.handleError(new Error('Veuillez entrer un email valide'), 'Validation onboarding');
        return;
      }
      if (!onboardingData.password || onboardingData.password.length < 6) {
        loginSubmit.handleError(new Error('Le mot de passe doit contenir au moins 6 caractères'), 'Validation onboarding');
        return;
      }
    }

    if (onboardingStep < totalOnboardingSteps() - 1) {
      setOnboardingStep(onboardingStep + 1);
    }
  };

  const prevOnboardingStep = () => {
    if (onboardingStep > 0) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

  const totalOnboardingSteps = () => 3;

  const updateOnboardingData = (field: string, value: any) => {
    setOnboardingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const completeOnboarding = () => {
    // Validation avant envoi
    if (!onboardingData.name || onboardingData.name.trim().length < 2) {
      loginSubmit.handleError(new Error('Le nom doit contenir au moins 2 caractères'), 'Validation inscription');
      return;
    }

    if (!onboardingData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(onboardingData.email)) {
      loginSubmit.handleError(new Error('Email invalide'), 'Validation inscription');
      return;
    }

    if (!onboardingData.password || onboardingData.password.length < 6) {
      loginSubmit.handleError(new Error('Le mot de passe doit contenir au moins 6 caractères'), 'Validation inscription');
      return;
    }

    const userData = {
      name: onboardingData.name.trim(),
      email: onboardingData.email.toLowerCase().trim(),
      password: onboardingData.password,
      role: onboardingData.role, // CLIENT ou PRO
      profile_data: {
        bio: onboardingData.bio?.trim() || '',
        style_preferences: onboardingData.style_preferences || [],
        fashion_interests: onboardingData.fashion_interests || [],
        favorite_brands: onboardingData.favorite_brands || [],
        size_info: onboardingData.size_info || {},
        onboarding_completed: true,
        created_via: 'onboarding_flow'
      }
    };

    console.log('📤 Envoi données inscription:', { 
      email: userData.email, 
      role: userData.role,
      hasProfileData: !!userData.profile_data 
    });

    registerMutation.mutate(userData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'login') {
      // Utilise le système centralisé de validation et de gestion d'erreur
      loginSubmit.handleSubmit({
        email: formData.email.trim(),
        password: formData.password,
      });
    } else {
      // Utilise la validation centralisée pour l'inscription
      const validationErrors = validationHelpers.validateAuth({
        email: formData.email,
        password: formData.password,
      });

      if (validationErrors && validationErrors.length > 0) {
        // Utilise directement le service d'erreur pour afficher la validation
        loginSubmit.handleError(new Error(`Champs requis : ${validationErrors.join(', ')}`), 'Validation inscription');
        return;
      }

      startOnboarding();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({ email: '', password: '' });
    loginSubmit.reset();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const switchMode = (newMode: 'login' | 'register') => {
    resetForm();
    onSwitchMode(newMode);
  };

  // Rendu des étapes d'onboarding (simplifié pour exemple)
  const renderOnboardingStep = () => {
    switch (onboardingStep) {
      case 0: // Choix du rôle
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Users className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ✨ Bienvenue dans l'univers FashionHub !
              </h3>
              <p className="text-gray-600">
                Choisissez votre profil pour rejoindre la communauté mode
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  onboardingData.role === 'CLIENT' ? 'ring-2 ring-pink-500 bg-pink-50' : ''
                }`}
                onClick={() => updateOnboardingData('role', 'CLIENT')}
                data-testid="role-client-card"
              >
                <CardContent className="p-6 text-center">
                  <Eye className="w-8 h-8 text-pink-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">🌟 Fashionista</h4>
                  <p className="text-sm text-gray-600">
                    Je veux découvrir et partager des looks incroyables
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  onboardingData.role === 'PRO' ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                }`}
                onClick={() => updateOnboardingData('role', 'PRO')}
                data-testid="role-pro-card"
              >
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">👗 Créateur Mode</h4>
                  <p className="text-sm text-gray-600">
                    Je crée et partage mes inspirations mode
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 1: // Informations de base
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Camera className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ✨ Créons ton profil mode
              </h3>
              <p className="text-gray-600">
                {onboardingData.role === 'CLIENT' ? 'Deviens une fashionista connectée' : 'Partage ton style unique'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Ton nom ou pseudo *</Label>
                <Input
                  id="name"
                  value={onboardingData.name}
                  onChange={(e) => updateOnboardingData('name', e.target.value)}
                  placeholder="Comment veux-tu être appelé(e) ?"
                  required
                  minLength={2}
                  data-testid="input-onboarding-name"
                />
                {onboardingData.name && onboardingData.name.length < 2 && (
                  <p className="text-xs text-red-600 mt-1">Le nom doit contenir au moins 2 caractères</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={onboardingData.email}
                  onChange={(e) => updateOnboardingData('email', e.target.value)}
                  placeholder="ton@email.com"
                  required
                  data-testid="input-onboarding-email"
                />
                {onboardingData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(onboardingData.email) && (
                  <p className="text-xs text-red-600 mt-1">Format email invalide</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Mot de passe *</Label>
                <Input
                  id="password"
                  type="password"
                  value={onboardingData.password}
                  onChange={(e) => updateOnboardingData('password', e.target.value)}
                  placeholder="Au moins 6 caractères"
                  required
                  minLength={6}
                  data-testid="input-onboarding-password"
                />
                {onboardingData.password && onboardingData.password.length < 6 && (
                  <p className="text-xs text-red-600 mt-1">Le mot de passe doit contenir au moins 6 caractères</p>
                )}
              </div>

              <div>
                <Label htmlFor="bio">Bio (optionnel)</Label>
                <Input
                  id="bio"
                  value={onboardingData.bio || ''}
                  onChange={(e) => updateOnboardingData('bio', e.target.value)}
                  placeholder="Décris ton style en quelques mots ✨"
                  maxLength={200}
                  data-testid="input-onboarding-bio"
                />
                {onboardingData.bio && (
                  <p className="text-xs text-gray-500 mt-1">{onboardingData.bio.length}/200 caractères</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2: // Finalisation
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-pink-600 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                🎉 C'est presque fini !
              </h3>
              <p className="text-gray-600">
                Tu vas rejoindre des milliers de passionnés de mode
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border border-pink-200">
              <h4 className="font-semibold mb-4 text-gray-900">✨ Récapitulatif de ton profil</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <span className="font-medium">👤 Nom :</span> 
                  <span className="text-gray-700">{onboardingData.name}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">📧 Email :</span> 
                  <span className="text-gray-700">{onboardingData.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">✨ Type :</span> 
                  <Badge className={onboardingData.role === 'CLIENT' ? 'bg-pink-500' : 'bg-purple-500'}>
                    {onboardingData.role === 'CLIENT' ? '🌟 Fashionista' : '👗 Créateur Mode'}
                  </Badge>
                </p>
                {onboardingData.bio && (
                  <p className="flex items-start gap-2 mt-3 pt-3 border-t border-pink-200">
                    <span className="font-medium">💭 Bio :</span> 
                    <span className="text-gray-700 italic">{onboardingData.bio}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                🎁 En créant ton compte, tu pourras :
              </p>
              <ul className="text-xs text-blue-700 mt-2 space-y-1 ml-4">
                <li>✓ Créer et partager tes looks</li>
                <li>✓ Suivre tes créateurs préférés</li>
                <li>✓ Sauvegarder tes inspirations</li>
                <li>✓ Rejoindre une communauté passionnée</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Affichage du modal principal ou de l'onboarding
  if (showOnboarding) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Créer un compte</DialogTitle>
            <DialogDescription>
              Étape {onboardingStep + 1} sur {totalOnboardingSteps()}
            </DialogDescription>
          </DialogHeader>

          <Progress value={(onboardingStep + 1) / totalOnboardingSteps() * 100} className="mb-4" />

          {renderOnboardingStep()}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={prevOnboardingStep}
              disabled={onboardingStep === 0}
              data-testid="button-onboarding-prev"
            >
              Précédent
            </Button>

            {onboardingStep < totalOnboardingSteps() - 1 ? (
              <Button
                onClick={nextOnboardingStep}
                data-testid="button-onboarding-next"
              >
                Suivant
              </Button>
            ) : (
              <Button
                onClick={completeOnboarding}
                disabled={registerMutation.isPending}
                data-testid="button-onboarding-complete"
              >
                {registerMutation.isPending ? 'Création...' : 'Créer le compte'}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Modal principal de connexion/inscription
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'login' ? 'Connexion' : 'Créer un compte'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'login'
              ? 'Connectez-vous à votre compte FashionHub'
              : 'Rejoignez la communauté FashionHub'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="votre@email.com"
              required
              data-testid="input-auth-email"
            />
          </div>

          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder={mode === 'login' ? 'Votre mot de passe' : 'Au moins 6 caractères'}
              required
              data-testid="input-auth-password"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loginSubmit.isSubmitting}
            data-testid="button-auth-submit"
          >
            {loginSubmit.isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin"></div>
                {mode === 'login' ? 'Connexion...' : 'Création...'}
              </div>
            ) : (
              mode === 'login' ? 'Se connecter' : 'Continuer'
            )}
          </Button>
        </form>

        <div className="text-center pt-4 border-t">
          <p className="text-sm text-gray-600">
            {mode === 'login' ? "Pas encore de compte ?" : "Déjà un compte ?"}
            <button
              type="button"
              onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
              className="ml-1 text-blue-600 hover:underline"
              data-testid="button-auth-switch"
            >
              {mode === 'login' ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
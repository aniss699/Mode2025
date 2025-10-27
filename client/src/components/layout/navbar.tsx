import { useState } from 'react';
import { useLocation } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { AuthModal } from '@/components/auth/auth-modal';
import { useAuth } from '@/hooks/use-auth';
import { useLanguage } from '@/hooks/use-language';
import { ROUTES } from '@/routes/paths';
import { User, LogOut, Menu, X, Briefcase, Users, BarChart3, Target, MessageSquare, Zap, TrendingUp, Plus, MonitorPlay, ChevronDown, PlusCircle, Smartphone, Sparkles, Lightbulb, Heart, FileText, Brain, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  const handleNavigation = (href: string) => {
    console.log('Navigation vers:', href);
    setLocation(href);
    setIsMobileMenuOpen(false);
  };

  // Gestes tactiles pour fermer le menu mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 100;
    const isRightSwipe = distance < -100;

    // Fermer le menu avec un swipe vers la droite
    if (isRightSwipe && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const NavLink = ({ href, children, className = "" }: { href: string, children: React.ReactNode, className?: string }) => (
    <button
      onClick={() => handleNavigation(href)}
      className={`text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer px-3 py-2 text-sm font-medium whitespace-nowrap ${className} ${
        location === href ? 'text-stone-900 dark:text-stone-50 border-b-2 border-stone-900 dark:border-stone-50' : ''
      }`}
    >
      {children}
    </button>
  );

  const MobileNavLink = ({ href, children, icon: Icon }: { href: string, children: React.ReactNode, icon: any }) => (
    <button
      onClick={() => handleNavigation(href)}
      className={`flex items-center space-x-3 w-full px-4 py-3 text-left hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-200 cursor-pointer rounded-md ${
        location === href ? 'text-stone-900 dark:text-stone-50 bg-stone-50 dark:bg-stone-800 border-l-2 border-stone-900 dark:border-stone-50 font-medium' : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
      }`}
    >
      <Icon className={`w-5 h-5 ${location === href ? 'text-stone-900 dark:text-stone-50' : 'text-stone-600 dark:text-stone-400'}`} />
      <span>{children}</span>
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-950 shadow-sm border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation(ROUTES.HOME)}
              className="group flex items-center space-x-3 sm:space-x-4 transition-all duration-200 mobile-logo-container"
              data-testid="button-logo-navbar"
            >
              <div className="w-10 h-10 bg-stone-900 dark:bg-stone-100 rounded-md flex items-center justify-center">
                <span className="text-white dark:text-stone-900 font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-display font-bold text-stone-900 dark:text-stone-50" data-testid="text-brand-navbar">
                {t('brand.name')}
              </span>
            </button>
          </div>


          {/* Language Selector */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 px-2 sm:px-3 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  <span className="text-xs sm:text-sm font-medium">
                    {language === 'fr' && '🇫🇷 FR'}
                    {language === 'en' && '🇬🇧 EN'}
                    {language === 'es' && '🇪🇸 ES'}
                    {language === 'ar' && '🇸🇦 AR'}
                  </span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('fr')}>
                  <span className="flex items-center gap-2">
                    🇫🇷 Français
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  <span className="flex items-center gap-2">
                    🇬🇧 English
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('es')}>
                  <span className="flex items-center gap-2">
                    🇪🇸 Español
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ar')}>
                  <span className="flex items-center gap-2">
                    🇸🇦 العربية
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Desktop User Menu - Nettoyé */}
                <div className="hidden xl:flex items-center space-x-3">
                  <Button variant="ghost" onClick={() => setLocation('/provider-profile')} className="text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100">
                    {t('navbar.marketplace')}
                  </Button>
                  <Button variant="ghost" onClick={() => setLocation('/missions')} className="text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100">
                    {t('navbar.myMissions')}
                  </Button>
                  <button
                    onClick={() => handleNavigation('/messages')}
                    className="text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors relative px-2 py-2 text-sm"
                  >
                    {t('navbar.messages')}
                  </button>
                </div>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 sm:space-x-2 hover:bg-stone-100 dark:hover:bg-stone-800 px-2 sm:px-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-stone-900 dark:bg-stone-100 rounded-full flex items-center justify-center">
                        <span className="text-white dark:text-stone-900 font-medium text-xs sm:text-sm">
                          {user.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="hidden sm:block text-stone-700 dark:text-stone-300 text-sm max-w-20 truncate">{user.email.split('@')[0]}</span>
                      <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-stone-700 dark:text-stone-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <button
                        onClick={() => handleNavigation('/profile')}
                        className="flex items-center w-full"
                      >
                        <User className="w-4 h-4 mr-2" />
                        {t('navbar.profile')}
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button
                        onClick={() => handleNavigation('/dashboard')}
                        className="flex items-center w-full"
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        {t('navbar.dashboard')}
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button
                        onClick={() => handleNavigation('/favorites')}
                        className="flex items-center w-full"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        {t('navbar.favorites')}
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button
                        onClick={() => handleNavigation('/settings')}
                        className="flex items-center w-full"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        {t('navbar.settings')}
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="lg:hidden">
                      <button
                        onClick={() => handleNavigation('/missions')}
                        className="flex items-center w-full"
                      >
                        <Briefcase className="w-4 h-4 mr-2" />
                        {t('navbar.myMissions')}
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="lg:hidden">
                      <button
                        onClick={() => handleNavigation('/messages')}
                        className="flex items-center w-full"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {t('navbar.messages')}
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-red-600"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {t('navbar.logout')}
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/login')}
                  className="hidden sm:flex text-sm px-3 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  {t('navbar.login')}
                </Button>
                <Button
                  onClick={() => handleAuthClick('register')}
                  className="bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900 text-xs sm:text-sm px-2 sm:px-4 py-2 whitespace-nowrap min-w-fit"
                >
                  <span className="hidden xs:inline sm:inline">{t('navbar.register')}</span>
                  <span className="xs:hidden sm:hidden text-xs">{t('navbar.registerShort')}</span>
                </Button>
              </div>
            )}

            {/* Menu Burger - Maintenant masqué sur mobile, la barre de navigation est en bas */}
            <div className="hidden md:flex">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="w-6 h-6 text-stone-700 dark:text-stone-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sheet (Conditionally rendered based on isMobileMenuOpen) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-[75vw] max-w-xs transform transition-transform duration-300 ease-in-out bg-white dark:bg-gray-950 shadow-xl flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex flex-col h-full relative">
          {/* Indicateur de swipe */}
          <div className="mobile-nav-swipe-indicator"></div>

          {/* Header avec recherche */}
          <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-stone-900 dark:bg-stone-100 rounded-md flex items-center justify-center">
                <span className="text-white dark:text-stone-900 font-bold text-lg">F</span>
                <div className="absolute top-1 right-2 w-1 h-1 bg-white rounded-full"></div>
                <div className="absolute bottom-1 left-2 w-1 h-1 bg-white rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent" data-testid="text-brand-mobile">
                  {t('brand.name')}
                </span>
                <span className="text-xs font-bold tracking-wide leading-none mt-1">
                  <span className="text-gray-600">{t('brand.taglinePart1')}</span>
                  <span className="text-emerald-500 font-black">{t('brand.taglinePart2')}</span>
                  <span className="text-gray-600">{t('brand.taglinePart3')}</span>
                </span>
              </div>
            </div>

            
          </div>

          {/* Actions rapides - disposition verticale */}
          <div className="px-4 py-3 bg-gray-50 border-b">
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => {
                  handleNavigation('/feed');
                  setIsMobileMenuOpen(false);
                }}
                className="mobile-quick-action flex items-center space-x-2.5 bg-white rounded-lg p-2.5 shadow-sm hover:shadow-md transition-shadow"
              >
                <TrendingUp className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-medium text-left">Feed</span>
              </button>
              <button
                onClick={() => {
                  handleNavigation('/explore');
                  setIsMobileMenuOpen(false);
                }}
                className="mobile-quick-action flex items-center space-x-2.5 bg-white rounded-lg p-2.5 shadow-sm hover:shadow-md transition-shadow"
              >
                <Sparkles className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-medium text-left">Explorer</span>
              </button>
              <button
                onClick={() => {
                  handleNavigation('/creators');
                  setIsMobileMenuOpen(false);
                }}
                className="mobile-quick-action flex items-center space-x-2.5 bg-white rounded-lg p-2.5 shadow-sm hover:shadow-md transition-shadow"
              >
                <Users className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-medium text-left">Créateurs</span>
              </button>
              <button
                onClick={() => {
                  handleNavigation('/collections');
                  setIsMobileMenuOpen(false);
                }}
                className="mobile-quick-action flex items-center space-x-2.5 bg-white rounded-lg p-2.5 shadow-sm hover:shadow-md transition-shadow"
              >
                <Briefcase className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-medium text-left">Collections</span>
              </button>
              <button
                onClick={() => {
                  handleNavigation('/notre-concept');
                  setIsMobileMenuOpen(false);
                }}
                className="mobile-quick-action flex items-center space-x-2.5 bg-white rounded-lg p-2.5 shadow-sm hover:shadow-md transition-shadow"
              >
                <Lightbulb className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-medium text-left">Notre Concept</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {/* Mon espace (si connecté) */}
            {user && (
              <div className="mobile-nav-category px-2 mb-4">
                <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('mobile.mySpace')}</h3>
                <MobileNavLink href="/dashboard" icon={BarChart3}>
                  {t('navbar.dashboard')}
                </MobileNavLink>
                <MobileNavLink href="/profile" icon={User}>
                  {t('navbar.profile')}
                </MobileNavLink>
                <MobileNavLink href="/messages" icon={MessageSquare}>
                  Messages
                </MobileNavLink>
                <MobileNavLink href="/favorites" icon={Heart}>
                  {t('mobile.myFavorites')}
                </MobileNavLink>
                <MobileNavLink href="/settings" icon={Settings}>
                  {t('navbar.settings')}
                </MobileNavLink>
              </div>
            )}
          </div>

          {/* Mobile quick add button */}
          {user && (
            <div className="mt-6 px-4">
              <Button
                onClick={() => {
                  handleNavigation('/dashboard');
                  setIsMobileMenuOpen(false);
                }}
                size="sm"
                className="w-full bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('navbar.addClothing')}
              </Button>
            </div>
          )}

          {/* Authentication buttons for mobile */}
          {!user && (
            <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800 mt-6">
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    handleNavigation('/login');
                    setIsMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  {t('navbar.login')}
                </Button>
                <Button
                  onClick={() => {
                    handleAuthClick('register');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 text-white"
                >
                  {t('navbar.register')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>


      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </nav>
  );
}
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ROUTES } from '../../routes/paths';
import { useLanguage } from '@/hooks/use-language';

export function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <div className="text-center mb-12 sm:mb-16 px-2 sm:px-0">
      <div className="space-y-6">
        {/* Logo et nom SWIDEAL */}
        <div className="flex items-center justify-center space-x-4 mb-8" data-testid="logo-hero">
          <div className="relative">
            <img 
              src="/swideal-logo.jpeg" 
              alt="Swideal Logo" 
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-2xl shadow-xl"
            />
            <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></div>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-gray-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent tracking-tight drop-shadow-md" data-testid="text-brand-hero">
              SWIDEAL
            </span>
            <span className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-bold">
              IA • Missions • Talents
            </span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl" style={{fontFamily: 'Inter, system-ui, -apple-system, sans-serif'}}>
          {t('home.hero.title')}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{fontFamily: 'Inter, system-ui, -apple-system, sans-serif'}}>
          {t('home.hero.description')}
        </p>
        <div className="flex justify-center gap-3 text-sm">
          <div className="flex items-center text-green-600 font-medium">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            {t('home.hero.platformLaunching')}
          </div>
          <div className="flex items-center text-blue-600 font-medium">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
            {t('home.hero.earlyUsers')}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild size="lg">
            <Link href={ROUTES.MARKETPLACE}>
              {t('home.hero.discoverMissions')}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={ROUTES.CREATE_MISSION}>
              {t('home.hero.postMission')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
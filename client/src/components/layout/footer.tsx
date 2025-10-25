
import { useLocation } from 'wouter';
import { ROUTES } from '@/routes/paths';
import { Heart, Mail, Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function Footer() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  return (
    <footer className="bg-stone-900 dark:bg-gray-950 text-stone-300 dark:text-stone-400 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-stone-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-stone-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 border-b border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-stone-800 dark:bg-stone-200 rounded-lg flex items-center justify-center mr-3 relative">
                  <span className="text-white dark:text-stone-900 font-bold text-lg">F</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-stone-100 dark:text-stone-50">
                  {t('brand.name')}
                </h3>
              </div>
              <p className="text-stone-400 dark:text-stone-500 text-sm leading-relaxed mb-6">
                {t('footer.description')}
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-xs text-stone-500 dark:text-stone-600">
                  <Heart className="w-3 h-3 mr-1 text-stone-400 dark:text-stone-500" />
                  {t('footer.madeWithPassion')}
                </div>
              </div>
            </div>

            {/* Navigation rapide */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-stone-200 dark:text-stone-300">{t('footer.navigation')}</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => setLocation(ROUTES.MARKETPLACE)} 
                    className="text-stone-400 hover:text-stone-200 dark:text-stone-500 dark:hover:text-stone-300 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-stone-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t('footer.discoverMissions')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLocation('/creators')} 
                    className="text-stone-400 hover:text-stone-200 dark:text-stone-500 dark:hover:text-stone-300 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-stone-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t('footer.findExperts')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLocation('/profile')} 
                    className="text-stone-400 hover:text-stone-200 dark:text-stone-500 dark:hover:text-stone-300 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-stone-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t('footer.publishMission')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLocation('/notre-concept')} 
                    className="text-stone-400 hover:text-stone-200 dark:text-stone-500 dark:hover:text-stone-300 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-stone-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t('footer.ourConcept')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Mon espace */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-stone-200 dark:text-stone-300">{t('footer.mySpace')}</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => setLocation('/login')} 
                    className="text-stone-400 hover:text-stone-200 dark:text-stone-500 dark:hover:text-stone-300 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-stone-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t('navbar.login')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLocation(ROUTES.DASHBOARD)} 
                    className="text-stone-400 hover:text-stone-200 dark:text-stone-500 dark:hover:text-stone-300 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-stone-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t('navbar.dashboard')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLocation(ROUTES.PROFILE)} 
                    className="text-stone-400 hover:text-stone-200 dark:text-stone-500 dark:hover:text-stone-300 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-stone-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t('navbar.profile')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLocation('/messages')} 
                    className="text-stone-400 hover:text-stone-200 dark:text-stone-500 dark:hover:text-stone-300 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-stone-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t('navbar.messages')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Support et contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-stone-200 dark:text-stone-300">{t('footer.support')}</h4>
              <ul className="space-y-3 mb-6">
                <li>
                  <button 
                    onClick={() => setLocation(ROUTES.LEGAL)} 
                    className="text-stone-400 hover:text-stone-200 dark:text-stone-500 dark:hover:text-stone-300 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-stone-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t('footer.legalNotices')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLocation('/sitemap')} 
                    className="text-stone-400 hover:text-stone-200 dark:text-stone-500 dark:hover:text-stone-300 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-stone-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t('footer.sitemap')}
                  </button>
                </li>
              </ul>
              
              {/* Contact info */}
              <div className="space-y-2">
                <div className="flex items-center text-xs text-stone-500 dark:text-stone-600">
                  <Mail className="w-3 h-3 mr-2 text-stone-400" />
                  contact@fashionhub.com
                </div>
                <div className="flex items-center text-xs text-stone-500 dark:text-stone-600">
                  <Globe className="w-3 h-3 mr-2 text-stone-400" />
                  www.fashionhub.com
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-stone-500 dark:text-stone-600">
              {t('footer.rightsReserved')}
            </div>
            
            <div className="flex items-center space-x-6 text-xs text-stone-500 dark:text-stone-600">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-stone-400 rounded-full mr-2 animate-pulse"></div>
                {t('footer.service247')}
              </span>
              <span>|</span>
              <span>{t('footer.globalPlatform')}</span>
              <span>|</span>
              <span>{t('footer.securePayments')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

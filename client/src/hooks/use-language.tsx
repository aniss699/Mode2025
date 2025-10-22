import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en' | 'es' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navbar
    'navbar.login': 'Se connecter',
    'navbar.register': 'Créer un compte',
    'navbar.registerShort': "S'inscrire",
    'navbar.marketplace': 'Marketplace (en pause)',
    'navbar.myMissions': 'Mes Missions',
    'navbar.createMission': 'Créer Mission',
    'navbar.messages': 'Messages',
    'navbar.profile': 'Profil',
    'navbar.dashboard': 'Tableau de bord',
    'navbar.favorites': 'Mes favoris',
    'navbar.logout': 'Déconnexion',
    'navbar.newMission': 'Nouvelle mission',
    'navbar.mission': 'Mission',

    // Brand
    'brand.name': 'Swideal',
    'brand.tagline': 'Le meilleur deal vient à toi',
    'brand.taglinePart1': 'Le meilleur ',
    'brand.taglinePart2': 'deal',
    'brand.taglinePart3': ' vient à toi',

    // Home page
    'home.title': 'La plateforme qui modernise la mise en relation',
    'home.subtitle': 'Swideal transforme chaque collaboration en opportunité gagnant-gagnant',
    'home.hero.title': 'Trouvez le prestataire parfait avec l\'IA',
    'home.hero.description': 'Plateforme française d\'appels d\'offres inversés avec intelligence artificielle.',
    'home.hero.platformLaunching': 'Plateforme en lancement',
    'home.hero.earlyUsers': 'Premiers utilisateurs',
    'home.hero.discoverMissions': 'Découvrir les missions',
    'home.hero.postMission': 'Poster une mission',
    'home.reverseAuction.title': 'Enchère inversée',
    'home.reverseAuction.description': 'Au lieu de chercher des prestataires, publiez votre besoin et laissez-les venir à vous avec leurs meilleures offres.',
    'home.reverseAuction.details': 'Ne cherche plus le meilleur prix il vient à toi !',
    'home.reverseAuction.result': 'Résultat : des prix plus compétitifs naturellement',
    'home.directContact.title': 'Contact direct',
    'home.directContact.description': 'Accès immédiat aux experts du réseau et au-delà',
    'home.networkValue.title': 'Valorisez votre réseau',
    'home.networkValue.description': 'Générez des revenus en recommandant les bons contacts',
    'home.startButton': 'Commencer',
    
    // Our approach section
    'home.ourApproach.title': 'Notre approche',
    'home.ourApproach.description': 'Nous améliorons le modèle de mise en relation existant avec deux mécanismes simples mais efficaces',
    
    // Paid connection section  
    'home.paidConnection.title': 'Mise en relation payante',
    'home.paidConnection.description': 'Au lieu de prospecter pendant des semaines, payez quelqu\'un qui a déjà le contact pour vous mettre en relation directement.',
    'home.paidConnection.result': 'Résultat : votre réseau devient rentable, les contacts sont immédiats',
    
    // Why it works section
    'home.whyItWorks.title': 'Pourquoi cette combinaison fonctionne',
    'home.whyItWorks.economical.title': 'Économiquement logique',
    'home.whyItWorks.economical.description': 'La concurrence optimise les prix',
    'home.whyItWorks.efficient.title': 'Efficace pour tous',
    'home.whyItWorks.efficient.description': 'Moins de recherche, plus de résultats',
    'home.whyItWorks.profitable.title': 'Réseau rentable',
    'home.whyItWorks.profitable.description': 'Chacun peut devenir apporteur d\'affaires',
    'home.whyItWorks.immediate.title': 'Contacts immédiats',
    'home.whyItWorks.immediate.description': 'Fini la prospection longue',

    // Footer
    'footer.description': 'La plateforme qui connecte talents et opportunités dans tous les domaines. Trouvez le partenaire idéal pour concrétiser vos projets.',
    'footer.madeWithPassion': 'Fait avec passion',
    'footer.navigation': 'Navigation',
    'footer.discoverMissions': 'Découvrir les missions',
    'footer.findExperts': 'Trouver des experts',
    'footer.publishMission': 'Publier une mission',
    'footer.ourConcept': 'Notre concept',
    'footer.mySpace': 'Mon espace',
    'footer.myDashboard': 'Mon tableau de bord',
    'footer.myProfile': 'Mon profil',
    'footer.support': 'Support',
    'footer.legalNotices': 'Mentions légales',
    'footer.sitemap': 'Plan du site',
    'footer.rightsReserved': '© 2024 Swideal. Tous droits réservés.',
    'footer.service247': 'Service disponible 24h/7j',
    'footer.globalPlatform': '🌍 Plateforme mondiale',
    'footer.securePayments': '🔒 Paiements sécurisés',

    // Mobile navigation
    'mobile.navigation': 'Navigation',
    'mobile.feed': 'Flux',
    'mobile.providers': 'Prestataires',
    'mobile.services': 'Services',
    'mobile.concept': 'Notre concept',
    'mobile.missions': 'Missions',
    'mobile.mySpace': 'Mon Espace',
    'mobile.myFavorites': 'Mes favoris',
  },
  en: {
    // Navbar
    'navbar.login': 'Sign In',
    'navbar.register': 'Create Account',
    'navbar.registerShort': 'Sign Up',
    'navbar.marketplace': 'Marketplace (en pause)',
    'navbar.myMissions': 'My Missions',
    'navbar.createMission': 'Create Mission',
    'navbar.messages': 'Messages',
    'navbar.profile': 'Profile',
    'navbar.dashboard': 'Dashboard',
    'navbar.favorites': 'My Favorites',
    'navbar.logout': 'Logout',
    'navbar.newMission': 'New Mission',
    'navbar.mission': 'Mission',

    // Brand
    'brand.name': 'Swideal',
    'brand.tagline': 'The best deal comes to you',
    'brand.taglinePart1': 'The best ',
    'brand.taglinePart2': 'deal',
    'brand.taglinePart3': ' comes to you',

    // Home page
    'home.title': 'The platform that modernizes networking',
    'home.subtitle': 'Swideal transforms every collaboration into a win-win opportunity',
    'home.hero.title': 'Find the perfect service provider with AI',
    'home.hero.description': 'French platform for reverse bidding with artificial intelligence.',
    'home.hero.platformLaunching': 'Platform launching',
    'home.hero.earlyUsers': 'Early users',
    'home.hero.discoverMissions': 'Discover missions',
    'home.hero.postMission': 'Post a mission',
    'home.reverseAuction.title': 'Reverse Auction',
    'home.reverseAuction.description': 'Instead of searching for service providers, publish your need and let them come to you with their best offers.',
    'home.reverseAuction.details': 'No more searching for the best price, it comes to you!',
    'home.reverseAuction.result': 'Result: naturally more competitive prices',
    'home.directContact.title': 'Direct Contact',
    'home.directContact.description': 'Immediate access to network experts and beyond',
    'home.networkValue.title': 'Monetize your network',
    'home.networkValue.description': 'Generate revenue by recommending the right contacts',
    'home.startButton': 'Get Started',
    
    // Our approach section
    'home.ourApproach.title': 'Our Approach',
    'home.ourApproach.description': 'We improve the existing networking model with two simple but effective mechanisms',
    
    // Paid connection section
    'home.paidConnection.title': 'Paid Networking',
    'home.paidConnection.description': 'Instead of prospecting for weeks, pay someone who already has the contact to connect you directly.',
    'home.paidConnection.result': 'Result: your network becomes profitable, contacts are immediate',
    
    // Why it works section
    'home.whyItWorks.title': 'Why this combination works',
    'home.whyItWorks.economical.title': 'Economically logical',
    'home.whyItWorks.economical.description': 'Competition optimizes prices',
    'home.whyItWorks.efficient.title': 'Efficient for everyone',
    'home.whyItWorks.efficient.description': 'Less searching, more results',
    'home.whyItWorks.profitable.title': 'Profitable network',
    'home.whyItWorks.profitable.description': 'Anyone can become a business broker',
    'home.whyItWorks.immediate.title': 'Immediate contacts',
    'home.whyItWorks.immediate.description': 'No more long prospecting',

    // Footer
    'footer.description': 'The platform that connects talents and opportunities in all domains. Find the ideal partner to bring your projects to life.',
    'footer.madeWithPassion': 'Made with passion',
    'footer.navigation': 'Navigation',
    'footer.discoverMissions': 'Discover missions',
    'footer.findExperts': 'Find experts',
    'footer.publishMission': 'Publish a mission',
    'footer.ourConcept': 'Our concept',
    'footer.mySpace': 'My Space',
    'footer.myDashboard': 'My dashboard',
    'footer.myProfile': 'My profile',
    'footer.support': 'Support',
    'footer.legalNotices': 'Legal notices',
    'footer.sitemap': 'Sitemap',
    'footer.rightsReserved': '© 2024 Swideal. All rights reserved.',
    'footer.service247': 'Service available 24/7',
    'footer.globalPlatform': '🌍 Global platform',
    'footer.securePayments': '🔒 Secure payments',

    // Mobile navigation
    'mobile.navigation': 'Navigation',
    'mobile.feed': 'Feed',
    'mobile.providers': 'Providers',
    'mobile.services': 'Services',
    'mobile.concept': 'Our concept',
    'mobile.missions': 'Missions',
    'mobile.mySpace': 'My Space',
    'mobile.myFavorites': 'My favorites',
  },
  es: {
    // Navbar
    'navbar.login': 'Iniciar sesión',
    'navbar.register': 'Crear cuenta',
    'navbar.registerShort': 'Registrarse',
    'navbar.marketplace': 'Mercado',
    'navbar.myMissions': 'Mis Misiones',
    'navbar.createMission': 'Crear Misión',
    'navbar.messages': 'Mensajes',
    'navbar.profile': 'Perfil',
    'navbar.dashboard': 'Panel',
    'navbar.favorites': 'Mis favoritos',
    'navbar.logout': 'Cerrar sesión',
    'navbar.newMission': 'Nueva misión',
    'navbar.mission': 'Misión',

    // Brand
    'brand.name': 'Swideal',
    'brand.tagline': 'El mejor trato viene a ti',
    'brand.taglinePart1': 'El mejor ',
    'brand.taglinePart2': 'trato',
    'brand.taglinePart3': ' viene a ti',

    // Home page
    'home.title': 'La plataforma que moderniza las conexiones',
    'home.subtitle': 'Swideal transforma cada colaboración en una oportunidad ganadora',
    'home.hero.title': 'Encuentra el proveedor perfecto con IA',
    'home.hero.description': 'Plataforma francesa de licitaciones inversas con inteligencia artificial.',
    'home.hero.platformLaunching': 'Plataforma en lanzamiento',
    'home.hero.earlyUsers': 'Primeros usuarios',
    'home.hero.discoverMissions': 'Descubrir misiones',
    'home.hero.postMission': 'Publicar una misión',
    'home.reverseAuction.title': 'Subasta inversa',
    'home.reverseAuction.description': 'En lugar de buscar proveedores, publica tu necesidad y deja que vengan a ti con sus mejores ofertas.',
    'home.reverseAuction.details': '¡No busques más el mejor precio, viene a ti!',
    'home.reverseAuction.result': 'Resultado: precios naturalmente más competitivos',
    'home.directContact.title': 'Contacto directo',
    'home.directContact.description': 'Acceso inmediato a expertos de la red y más allá',
    'home.networkValue.title': 'Monetiza tu red',
    'home.networkValue.description': 'Genera ingresos recomendando los contactos adecuados',
    'home.startButton': 'Comenzar',
    'home.ourApproach.title': 'Nuestro enfoque',
    'home.ourApproach.description': 'Mejoramos el modelo de conexión existente con dos mecanismos simples pero efectivos',
    'home.paidConnection.title': 'Conexión pagada',
    'home.paidConnection.description': 'En lugar de prospectar durante semanas, paga a alguien que ya tenga el contacto para conectarte directamente.',
    'home.paidConnection.result': 'Resultado: tu red se vuelve rentable, los contactos son inmediatos',
    'home.whyItWorks.title': 'Por qué funciona esta combinación',
    'home.whyItWorks.economical.title': 'Económicamente lógico',
    'home.whyItWorks.economical.description': 'La competencia optimiza los precios',
    'home.whyItWorks.efficient.title': 'Eficiente para todos',
    'home.whyItWorks.efficient.description': 'Menos búsqueda, más resultados',
    'home.whyItWorks.profitable.title': 'Red rentable',
    'home.whyItWorks.profitable.description': 'Cualquiera puede convertirse en intermediario de negocios',
    'home.whyItWorks.immediate.title': 'Contactos inmediatos',
    'home.whyItWorks.immediate.description': 'Se acabó la prospección prolongada',

    // Footer
    'footer.description': 'La plataforma que conecta talentos y oportunidades en todos los dominios. Encuentra el socio ideal para dar vida a tus proyectos.',
    'footer.madeWithPassion': 'Hecho con pasión',
    'footer.navigation': 'Navegación',
    'footer.discoverMissions': 'Descubrir misiones',
    'footer.findExperts': 'Encontrar expertos',
    'footer.publishMission': 'Publicar una misión',
    'footer.ourConcept': 'Nuestro concepto',
    'footer.mySpace': 'Mi Espacio',
    'footer.myDashboard': 'Mi panel',
    'footer.myProfile': 'Mi perfil',
    'footer.support': 'Soporte',
    'footer.legalNotices': 'Avisos legales',
    'footer.sitemap': 'Mapa del sitio',
    'footer.rightsReserved': '© 2024 Swideal. Todos los derechos reservados.',
    'footer.service247': 'Servicio disponible 24/7',
    'footer.globalPlatform': '🌍 Plataforma global',
    'footer.securePayments': '🔒 Pagos seguros',

    // Mobile navigation
    'mobile.navigation': 'Navegación',
    'mobile.feed': 'Feed',
    'mobile.providers': 'Proveedores',
    'mobile.services': 'Servicios',
    'mobile.concept': 'Nuestro concepto',
    'mobile.missions': 'Misiones',
    'mobile.mySpace': 'Mi Espacio',
    'mobile.myFavorites': 'Mis favoritos',
  },
  ar: {
    // Navbar
    'navbar.login': 'تسجيل الدخول',
    'navbar.register': 'إنشاء حساب',
    'navbar.registerShort': 'التسجيل',
    'navbar.marketplace': 'السوق',
    'navbar.myMissions': 'مهامي',
    'navbar.createMission': 'إنشاء مهمة',
    'navbar.messages': 'الرسائل',
    'navbar.profile': 'الملف الشخصي',
    'navbar.dashboard': 'لوحة التحكم',
    'navbar.favorites': 'المفضلة',
    'navbar.logout': 'تسجيل الخروج',
    'navbar.newMission': 'مهمة جديدة',
    'navbar.mission': 'مهمة',

    // Brand
    'brand.name': 'Swideal',
    'brand.tagline': 'أفضل صفقة تأتي إليك',
    'brand.taglinePart1': 'أفضل ',
    'brand.taglinePart2': 'صفقة',
    'brand.taglinePart3': ' تأتي إليك',

    // Home page
    'home.title': 'المنصة التي تحدث الاتصالات',
    'home.subtitle': 'Swideal يحول كل تعاون إلى فرصة مربحة للجانبين',
    'home.hero.title': 'ابحث عن مزود الخدمة المثالي بالذكاء الاصطناعي',
    'home.hero.description': 'منصة فرنسية للمناقصات العكسية بالذكاء الاصطناعي.',
    'home.hero.platformLaunching': 'إطلاق المنصة',
    'home.hero.earlyUsers': 'المستخدمون الأوائل',
    'home.hero.discoverMissions': 'اكتشف المهام',
    'home.hero.postMission': 'نشر مهمة',
    'home.reverseAuction.title': 'مزاد عكسي',
    'home.reverseAuction.description': 'بدلاً من البحث عن مزودي الخدمات، انشر احتياجك ودعهم يأتون إليك بأفضل عروضهم.',
    'home.reverseAuction.details': 'لا تبحث عن أفضل سعر، سيأتي إليك!',
    'home.reverseAuction.result': 'النتيجة: أسعار أكثر تنافسية بشكل طبيعي',
    'home.directContact.title': 'اتصال مباشر',
    'home.directContact.description': 'وصول فوري إلى خبراء الشبكة وما بعدها',
    'home.networkValue.title': 'استثمر شبكتك',
    'home.networkValue.description': 'حقق دخلاً من خلال التوصية بجهات الاتصال المناسبة',
    'home.startButton': 'ابدأ',
    'home.ourApproach.title': 'نهجنا',
    'home.ourApproach.description': 'نحسن نموذج الاتصال الحالي بآليتين بسيطتين ولكن فعالتين',
    'home.paidConnection.title': 'اتصال مدفوع',
    'home.paidConnection.description': 'بدلاً من التنقيب لأسابيع، ادفع لشخص لديه جهة الاتصال بالفعل ليوصلك مباشرة.',
    'home.paidConnection.result': 'النتيجة: شبكتك تصبح مربحة، جهات الاتصال فورية',
    'home.whyItWorks.title': 'لماذا يعمل هذا المزيج',
    'home.whyItWorks.economical.title': 'منطقي اقتصادياً',
    'home.whyItWorks.economical.description': 'المنافسة تحسن الأسعار',
    'home.whyItWorks.efficient.title': 'فعال للجميع',
    'home.whyItWorks.efficient.description': 'بحث أقل، نتائج أكثر',
    'home.whyItWorks.profitable.title': 'شبكة مربحة',
    'home.whyItWorks.profitable.description': 'يمكن لأي شخص أن يصبح وسيط أعمال',
    'home.whyItWorks.immediate.title': 'جهات اتصال فورية',
    'home.whyItWorks.immediate.description': 'انتهى التنقيب الطويل',

    // Footer
    'footer.description': 'المنصة التي تربط المواهب والفرص في جميع المجالات. ابحث عن الشريك المثالي لإحياء مشاريعك.',
    'footer.madeWithPassion': 'صُنع بشغف',
    'footer.navigation': 'التنقل',
    'footer.discoverMissions': 'اكتشف المهام',
    'footer.findExperts': 'ابحث عن خبراء',
    'footer.publishMission': 'نشر مهمة',
    'footer.ourConcept': 'مفهومنا',
    'footer.mySpace': 'مساحتي',
    'footer.myDashboard': 'لوحة التحكم',
    'footer.myProfile': 'ملفي الشخصي',
    'footer.support': 'الدعم',
    'footer.legalNotices': 'الإشعارات القانونية',
    'footer.sitemap': 'خريطة الموقع',
    'footer.rightsReserved': '© 2024 Swideal. جميع الحقوق محفوظة.',
    'footer.service247': 'خدمة متاحة 24/7',
    'footer.globalPlatform': '🌍 منصة عالمية',
    'footer.securePayments': '🔒 مدفوعات آمنة',

    // Mobile navigation
    'mobile.navigation': 'التنقل',
    'mobile.feed': 'التغذية',
    'mobile.providers': 'مزودو الخدمات',
    'mobile.services': 'الخدمات',
    'mobile.concept': 'مفهومنا',
    'mobile.missions': 'المهام',
    'mobile.mySpace': 'مساحتي',
    'mobile.myFavorites': 'المفضلة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fr']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
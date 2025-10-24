import React, { Suspense, useEffect, lazy } from 'react';
import { Router, Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';
import { LanguageProvider } from '@/hooks/use-language';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import MobileBottomNav from '@/components/layout/mobile-bottom-nav';
import { queryClient } from '@/lib/queryClient';

// Lazy load pages for better performance
const Home = React.lazy(() => import('@/pages/home'));
const CreatorsPage = React.lazy(() => import('@/pages/creators'));
const Collections = React.lazy(() => import('@/pages/collections'));
const CollectionDetail = React.lazy(() => import('@/pages/collection-detail')); // New import
const PublicWardrobe = React.lazy(() => import('@/pages/public-wardrobe')); // New import
const Profile = React.lazy(() => import('@/pages/profile'));
const Dashboard = React.lazy(() => import('@/pages/dashboard'));
const Messages = React.lazy(() => import('@/pages/messages'));
const Legal = React.lazy(() => import('@/pages/legal'));
const Sitemap = React.lazy(() => import('@/pages/sitemap'));
const Features = React.lazy(() => import('@/pages/features'));
const NotreConcept = React.lazy(() => import('@/pages/notre-concept'));

const AIMonitoring = React.lazy(() => import('@/pages/AIMonitoring'));
const LoginPage = React.lazy(() => import('@/pages/login'));
const Feed = React.lazy(() => import('@/pages/Feed'));
const AdminFeedMetrics = React.lazy(() => import('@/pages/AdminFeedMetrics'));
const NotFoundPage = React.lazy(() => import('@/pages/not-found'));
const FeedbackButtonsTest = React.lazy(() => import('@/components/ai/feedback-buttons-test'));

// Lazy load the new Favorites page
const Favorites = React.lazy(() => import('@/pages/favorites'));

// Lazy load the explore page
const Explore = React.lazy(() => import('@/pages/explore'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  useEffect(() => {
    // Debug pour Replit - affichage dans la console
    console.log('🚀 FASHIONHUB App chargée avec succès');
    console.log('📍 URL actuelle:', window.location.href);
    console.log('🔧 User Agent:', navigator.userAgent);
    console.log('📱 Viewport:', window.innerWidth + 'x' + window.innerHeight);

    // Test de connectivité API
    fetch('/api/health')
      .then(res => res.json())
      .then(data => console.log('✅ API Health Check:', data))
      .catch(err => console.error('❌ API Health Check échoué:', err));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <LanguageProvider>
          <AuthProvider>
            <Router>
            <div className="min-h-screen bg-background">
              <Navbar />
              <main className="pt-0 pb-16 md:pb-0">
                <Suspense fallback={<LoadingSpinner />}>
                  <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/creators" component={CreatorsPage} />
                    <Route path="/collections" component={Collections} />
                    <Route path="/collections/:id" component={CollectionDetail} /> {/* New Route */}
                    <Route path="/wardrobe/:userId" component={PublicWardrobe} /> {/* New Route */}
                    <Route path="/profile" component={Profile} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/messages" component={Messages} />
                    <Route path="/notre-concept" component={NotreConcept} />
                    <Route path="/legal" component={Legal} />
                    <Route path="/sitemap" component={Sitemap} />
                    <Route path="/features" component={Features} />

                    <Route path="/monitoring" component={AIMonitoring} />
                    <Route path="/feed" component={Feed} />
                    <Route path="/explore" component={Explore} />
                    <Route path="/admin/feed-metrics" component={AdminFeedMetrics} />
                    <Route path="/test-feedback" component={FeedbackButtonsTest} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/favorites" component={Favorites} />
                    <Route path="/settings" component={lazy(() => import('./pages/settings'))} />
                    <Route component={NotFoundPage} />
                  </Switch>
                </Suspense>
              </main>
              <Footer />
              <MobileBottomNav />
              <Toaster />
            </div>
            </Router>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
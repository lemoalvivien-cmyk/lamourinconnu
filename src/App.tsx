import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AdminRoute } from './components/layout/AdminRoute';
import { InstallPrompt } from './components/pwa/InstallPrompt';
import { TestModeBanner } from './components/layout/TestModeBanner';
import { ROUTES } from './lib/constants';

import { Home } from './pages/public/Home';
import { CommentCaMarche } from './pages/public/CommentCaMarche';
import { Tarifs } from './pages/public/Tarifs';
import { Blog } from './pages/public/Blog';
import { BlogArticle } from './pages/public/BlogArticle';
import { CGU } from './pages/public/CGU';
import { Confidentialite } from './pages/public/Confidentialite';
import { MentionsLegales } from './pages/public/MentionsLegales';
import { Villes } from './pages/public/Villes';
import { Ville } from './pages/public/Ville';
import { MerciAbonnement } from './pages/public/MerciAbonnement';

import { Connexion } from './pages/auth/Connexion';
import { Inscription } from './pages/auth/Inscription';
import { MotDePasseOublie } from './pages/auth/MotDePasseOublie';

import { Dashboard } from './pages/protected/Dashboard';
import { Profil } from './pages/protected/Profil';
import { Matches } from './pages/protected/Matches';
import { RendezVous } from './pages/protected/RendezVous';
import { Parametres } from './pages/protected/Parametres';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminSettings } from './pages/admin/AdminSettings';
import { Home as HomeIcon } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-accent mb-4">404</p>
        <h1 className="text-3xl font-bold text-white mb-4">Page introuvable</h1>
        <p className="text-gray-400 mb-8">
          La page que tu cherches n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <HomeIcon size={18} />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <TestModeBanner />
          <Header />
          <InstallPrompt />
          <main className="flex-grow">
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.HOW_IT_WORKS} element={<CommentCaMarche />} />
              <Route path={ROUTES.PRICING} element={<Tarifs />} />
              <Route path={ROUTES.BLOG} element={<Blog />} />
              <Route path={ROUTES.BLOG_ARTICLE} element={<BlogArticle />} />
              <Route path={ROUTES.CGU} element={<CGU />} />
              <Route path={ROUTES.PRIVACY} element={<Confidentialite />} />
              <Route path={ROUTES.LEGAL} element={<MentionsLegales />} />
              <Route path={ROUTES.CITIES} element={<Villes />} />
              <Route path={ROUTES.CITY} element={<Ville />} />

              <Route path={ROUTES.LOGIN} element={<Connexion />} />
              <Route path={ROUTES.REGISTER} element={<Inscription />} />
              <Route path={ROUTES.FORGOT_PASSWORD} element={<MotDePasseOublie />} />
              <Route path={ROUTES.THANK_YOU_SUBSCRIPTION} element={<MerciAbonnement />} />

              <Route
                path={ROUTES.DASHBOARD}
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.PROFILE}
                element={
                  <ProtectedRoute>
                    <Profil />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.MATCHES}
                element={
                  <ProtectedRoute>
                    <Matches />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.DATES}
                element={
                  <ProtectedRoute>
                    <RendezVous />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.SETTINGS}
                element={
                  <ProtectedRoute>
                    <Parametres />
                  </ProtectedRoute>
                }
              />

              <Route
                path={ROUTES.ADMIN}
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path={ROUTES.ADMIN_USERS}
                element={
                  <AdminRoute>
                    <AdminUsers />
                  </AdminRoute>
                }
              />
              <Route
                path={ROUTES.ADMIN_REPORTS}
                element={
                  <AdminRoute>
                    <AdminReports />
                  </AdminRoute>
                }
              />
              <Route
                path={ROUTES.ADMIN_SETTINGS}
                element={
                  <AdminRoute>
                    <AdminSettings />
                  </AdminRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

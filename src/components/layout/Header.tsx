import { Link, useNavigate } from 'react-router-dom';
import { Heart, Menu, User, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES, APP_NAME } from '../../lib/constants';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { MobileNav } from './MobileNav';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
      navigate(ROUTES.HOME);
    } catch {
      // Sign out failed silently
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-accent/20 bg-primary/95 backdrop-blur-sm transition-all duration-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={ROUTES.HOME} className="flex items-center gap-3">
            <Heart className="text-accent" size={28} fill="currentColor" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-white leading-none">{APP_NAME}</span>
              <Badge variant="experimental" className="mt-1 text-[10px] px-1.5 py-0">
                🧪 PROJET EXPÉRIMENTAL
              </Badge>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {!user ? (
              <>
                <Link to={ROUTES.HOW_IT_WORKS} className="text-white hover:text-accent transition-colors">
                  Comment ça marche
                </Link>
                <Link to={ROUTES.PRICING} className="text-white hover:text-accent transition-colors">
                  Tarifs
                </Link>
                <Link to={ROUTES.BLOG} className="text-white hover:text-accent transition-colors">
                  Blog
                </Link>
                <div className="flex items-center gap-3 ml-2">
                  <Link to={ROUTES.LOGIN}>
                    <Button variant="ghost" size="sm">
                      Connexion
                    </Button>
                  </Link>
                  <Link to={ROUTES.REGISTER}>
                    <Button variant="accent" size="sm">
                      Inscription
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.DASHBOARD} className="text-white hover:text-accent transition-colors">
                  Dashboard
                </Link>
                <Link to={ROUTES.MATCHES} className="text-white hover:text-accent transition-colors">
                  Mes Matchs
                </Link>
                <Link to={ROUTES.DATES} className="text-white hover:text-accent transition-colors">
                  Mes RDV
                </Link>
                {userRole === 'admin' && (
                  <Link to={ROUTES.ADMIN} className="text-gold hover:text-gold/80 transition-colors font-medium">
                    Admin
                  </Link>
                )}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-accent/10 transition-colors"
                  >
                    <User size={18} />
                    <ChevronDown size={16} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isUserMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-secondary border border-accent/20 rounded-lg shadow-xl z-20 py-2">
                        <Link
                          to={ROUTES.PROFILE}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-white hover:bg-accent/10 transition-colors"
                        >
                          <User size={16} />
                          <span>Mon profil</span>
                        </Link>
                        <Link
                          to={ROUTES.SETTINGS}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 text-white hover:bg-accent/10 transition-colors"
                        >
                          Paramètres
                        </Link>
                        <hr className="my-2 border-accent/20" />
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2 w-full px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut size={16} />
                          <span>Déconnexion</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}

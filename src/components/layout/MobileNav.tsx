import { Link } from 'react-router-dom';
import { X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../lib/constants';
import { Button } from '../ui/Button';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { user, userRole, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
    } catch {
      // Sign out failed silently
    }
  };

  const handleLinkClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-secondary border-l border-accent/20 z-50 md:hidden transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-accent/20">
            <span className="font-display font-bold text-lg text-white">Menu</span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {!user ? (
                <>
                  <Link
                    to={ROUTES.HOME}
                    onClick={handleLinkClick}
                    className="block px-4 py-3 text-white hover:bg-accent/10 rounded-lg transition-colors"
                  >
                    Accueil
                  </Link>
                  <Link
                    to={ROUTES.HOW_IT_WORKS}
                    onClick={handleLinkClick}
                    className="block px-4 py-3 text-white hover:bg-accent/10 rounded-lg transition-colors"
                  >
                    Comment ça marche
                  </Link>
                  <Link
                    to={ROUTES.PRICING}
                    onClick={handleLinkClick}
                    className="block px-4 py-3 text-white hover:bg-accent/10 rounded-lg transition-colors"
                  >
                    Tarifs
                  </Link>
                  <Link
                    to={ROUTES.BLOG}
                    onClick={handleLinkClick}
                    className="block px-4 py-3 text-white hover:bg-accent/10 rounded-lg transition-colors"
                  >
                    Blog
                  </Link>

                  <div className="pt-4 mt-4 border-t border-accent/20 space-y-2">
                    <Link to={ROUTES.LOGIN} onClick={handleLinkClick}>
                      <Button variant="ghost" size="md" className="w-full justify-start">
                        Connexion
                      </Button>
                    </Link>
                    <Link to={ROUTES.REGISTER} onClick={handleLinkClick}>
                      <Button variant="accent" size="md" className="w-full justify-start">
                        Inscription
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to={ROUTES.DASHBOARD}
                    onClick={handleLinkClick}
                    className="block px-4 py-3 text-white hover:bg-accent/10 rounded-lg transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={ROUTES.MATCHES}
                    onClick={handleLinkClick}
                    className="block px-4 py-3 text-white hover:bg-accent/10 rounded-lg transition-colors"
                  >
                    Mes Matchs
                  </Link>
                  <Link
                    to={ROUTES.DATES}
                    onClick={handleLinkClick}
                    className="block px-4 py-3 text-white hover:bg-accent/10 rounded-lg transition-colors"
                  >
                    Mes RDV
                  </Link>

                  {userRole === 'admin' && (
                    <Link
                      to={ROUTES.ADMIN}
                      onClick={handleLinkClick}
                      className="block px-4 py-3 text-gold hover:bg-gold/10 rounded-lg transition-colors font-medium"
                    >
                      Admin
                    </Link>
                  )}

                  <div className="pt-4 mt-4 border-t border-accent/20 space-y-2">
                    <Link
                      to={ROUTES.PROFILE}
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 px-4 py-3 text-white hover:bg-accent/10 rounded-lg transition-colors"
                    >
                      <User size={18} />
                      <span>Mon profil</span>
                    </Link>
                    <Link
                      to={ROUTES.SETTINGS}
                      onClick={handleLinkClick}
                      className="block px-4 py-3 text-white hover:bg-accent/10 rounded-lg transition-colors"
                    >
                      Paramètres
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 w-full px-4 py-3 text-white hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

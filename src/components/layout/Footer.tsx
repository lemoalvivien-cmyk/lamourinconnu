import { Link } from 'react-router-dom';
import { Heart, Facebook, Instagram, Twitter } from 'lucide-react';
import { ROUTES, APP_NAME } from '../../lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-accent/20 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="text-accent" size={24} fill="currentColor" />
              <span className="font-display font-bold text-lg text-white">{APP_NAME}</span>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              La plateforme de rencontres qui célèbre le mystère et l'authenticité.
            </p>
            <p className="text-accent text-xs">
              🧪 Projet expérimental
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Découvrir</h3>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.HOW_IT_WORKS} className="text-gray-400 hover:text-accent transition-colors text-sm">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PRICING} className="text-gray-400 hover:text-accent transition-colors text-sm">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link to={ROUTES.BLOG} className="text-gray-400 hover:text-accent transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <a href="mailto:contact@lamourinconnu.fr" className="text-gray-400 hover:text-accent transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.CGU} className="text-gray-400 hover:text-accent transition-colors text-sm">
                  CGU
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PRIVACY} className="text-gray-400 hover:text-accent transition-colors text-sm">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to={ROUTES.LEGAL} className="text-gray-400 hover:text-accent transition-colors text-sm">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Suivez-nous</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-accent/20 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} {APP_NAME} - Projet expérimental. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

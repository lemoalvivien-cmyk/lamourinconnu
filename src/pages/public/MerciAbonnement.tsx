import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ROUTES } from '../../lib/constants';

export function MerciAbonnement() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent to-accent/50 rounded-full mb-6 animate-pulse">
              <CheckCircle className="text-white" size={48} />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Bienvenue dans le <span className="text-accent">Pass Inconnu</span> !
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Ton abonnement est actif. Tu peux maintenant profiter de 2 rendez-vous organisés par mois.
            </p>
          </div>

          <Card className="bg-gradient-to-br from-secondary/80 to-primary border-2 border-accent/30 mb-6">
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="text-gold" size={24} />
                  Tes avantages
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-300">
                      <strong className="text-white">2 rendez-vous organisés</strong> chaque mois avec des profils compatibles
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-300">
                      <strong className="text-white">Matchs prioritaires</strong> dans l'algorithme
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-300">
                      <strong className="text-white">Historique complet</strong> de tous tes rendez-vous
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-300">
                      <strong className="text-white">Support prioritaire</strong> disponible 7j/7
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-accent/10 border border-accent/30 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Clock className="text-accent flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">
                      Activation en cours
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      L'activation peut prendre quelques minutes. Si ton statut n'est pas mis à jour,
                      rafraîchis la page ou contacte-nous à{' '}
                      <a
                        href="mailto:support@lamourinconnu.com"
                        className="text-accent hover:text-accent/80 underline"
                      >
                        support@lamourinconnu.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Link to={ROUTES.DASHBOARD} className="block">
              <Button
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-accent to-accent/80"
              >
                Accéder à mon dashboard
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>

            <Link to={ROUTES.PROFILE} className="block">
              <Button variant="outline" size="lg" className="w-full">
                Compléter mon profil
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Tu as des questions ? Consulte notre{' '}
              <Link to={ROUTES.COMMENT_CA_MARCHE} className="text-accent hover:text-accent/80 underline">
                guide de démarrage
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

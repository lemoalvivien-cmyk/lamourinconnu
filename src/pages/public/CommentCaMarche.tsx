import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  UserPlus,
  Heart,
  Calendar,
  MapPin,
  Shield,
  MessageSquareOff,
  Sparkles,
  CheckCircle2,
  FileText,
  Target,
  Users,
  Clock,
  Home as HomeIcon,
  ChevronRight
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ROUTES } from '../../lib/constants';

export function CommentCaMarche() {
  return (
    <>
      <Helmet>
        <title>Comment ça marche | L'Amour Inconnu</title>
        <meta name="description" content="Découvre comment L'Amour Inconnu organise des rendez-vous réels avec des célibataires compatibles. Un processus simple en 4 étapes." />
        <meta property="og:title" content="Comment ça marche | L'Amour Inconnu" />
        <meta property="og:description" content="Découvre le fonctionnement de L'Amour Inconnu" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link to={ROUTES.HOME} className="hover:text-accent transition-colors flex items-center gap-1">
            <HomeIcon size={16} />
            Accueil
          </Link>
          <ChevronRight size={16} />
          <span className="text-white">Comment ça marche</span>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="experimental" className="mb-6">
            🎯 PROCESSUS DÉTAILLÉ
          </Badge>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Comment fonctionne{' '}
            <span className="text-accent">L'Amour Inconnu</span> ?
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            De ton inscription à ton premier rendez-vous, on t'explique tout en 5 minutes.
          </p>
        </div>
      </section>

      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <UserPlus className="text-white" size={32} />
              </div>
              <div>
                <Badge variant="gold" className="mb-2">ÉTAPE 1/4</Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                  Créer ton profil en 5 minutes
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card variant="gradient" className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-white mb-2">Pas besoin de photo</h3>
                      <p className="text-gray-400 text-sm">
                        Pour commencer, pas de photo obligatoire. On se concentre sur qui tu es vraiment.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-white mb-2">Questions sur ce qui compte</h3>
                      <p className="text-gray-400 text-sm">
                        On te pose des questions sur l'essentiel, pas sur des détails superficiels.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-white mb-2">Profil anonyme</h3>
                      <p className="text-gray-400 text-sm">
                        Ton profil reste anonyme jusqu'à ce que le match soit accepté mutuellement.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card variant="gradient" className="p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="text-accent" size={20} />
                  On te demande :
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">
                      <strong className="text-white">Tes valeurs</strong> - Famille, carrière, voyages, spiritualité...
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">
                      <strong className="text-white">Ton style de vie</strong> - Sport, sorties, rythme quotidien...
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">
                      <strong className="text-white">Ce que tu recherches</strong> - Relation sérieuse, découverte...
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">
                      <strong className="text-white">Tes deal-breakers</strong> - Tabac, enfants, distance max...
                    </span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="text-white" size={32} />
              </div>
              <div>
                <Badge variant="gold" className="mb-2">ÉTAPE 2/4</Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                  Notre algorithme trouve tes compatibles
                </h2>
              </div>
            </div>

            <Card variant="gradient" className="p-8 mb-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-xl text-white mb-3 flex items-center gap-2">
                    <Sparkles className="text-accent" size={24} />
                    Comment ça fonctionne ?
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Chaque jour, notre système analyse les profils de célibataires dans ta zone géographique
                    et calcule un score de compatibilité personnalisé basé sur plusieurs critères.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-primary/30 p-4 rounded-lg border border-accent/20">
                    <h4 className="font-semibold text-white mb-2">Critères essentiels</h4>
                    <p className="text-sm text-gray-400">
                      Tes critères non négociables (enfants, distance, lifestyle...)
                    </p>
                  </div>
                  <div className="bg-primary/30 p-4 rounded-lg border border-accent/20">
                    <h4 className="font-semibold text-white mb-2">Valeurs communes</h4>
                    <p className="text-sm text-gray-400">
                      Les valeurs que vous partagez (famille, ambition, loisirs...)
                    </p>
                  </div>
                  <div className="bg-primary/30 p-4 rounded-lg border border-accent/20">
                    <h4 className="font-semibold text-white mb-2">Complémentarité</h4>
                    <p className="text-sm text-gray-400">
                      Vos styles de vie qui se complètent naturellement
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="bg-gradient-to-br from-accent/10 to-secondary/50 p-8 rounded-2xl border border-accent/20">
              <h3 className="font-semibold text-xl text-white mb-4">
                Tu reçois des profils "mystère" :
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">
                      <strong className="text-white">Informations clés</strong> - Âge, ville, quartier
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">
                      <strong className="text-white">Points communs</strong> - 3-4 valeurs partagées
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">
                      <strong className="text-white">Score de compatibilité</strong> - Ex: 87%
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">
                      <strong className="text-white">Pas de photo</strong> - Zéro jugement superficiel
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="text-white" size={32} />
              </div>
              <div>
                <Badge variant="gold" className="mb-2">ÉTAPE 3/4</Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                  Acceptation mutuelle
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card variant="gradient" className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👀</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Tu explores</h3>
                <p className="text-sm text-gray-400">
                  Tu vois un profil mystère qui te plaît ? Regarde son score, ses valeurs...
                </p>
              </Card>

              <Card variant="gradient" className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Tu acceptes</h3>
                <p className="text-sm text-gray-400">
                  Tu cliques sur "Accepter". L'autre personne fait la même chose.
                </p>
              </Card>

              <Card variant="gradient" className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎉</span>
                </div>
                <h3 className="font-semibold text-white mb-2">MATCH !</h3>
                <p className="text-sm text-gray-400">
                  Quand vous vous acceptez mutuellement : c'est un match !
                </p>
              </Card>
            </div>

            <Card variant="gradient" className="p-8">
              <div className="flex items-start gap-4">
                <MessageSquareOff className="text-accent flex-shrink-0" size={32} />
                <div>
                  <h3 className="font-semibold text-xl text-white mb-3">
                    Pas de longues conversations
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Contrairement aux apps classiques, on ne perd pas de temps en conversations sans fin.
                    Une fois le match confirmé, on passe <strong className="text-white">directement à l'organisation
                    du rendez-vous réel</strong>. C'est ça, la différence.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="text-white" size={32} />
              </div>
              <div>
                <Badge variant="gold" className="mb-2">ÉTAPE 4/4</Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                  Rendez-vous organisé pour vous
                </h2>
              </div>
            </div>

            <Card variant="gradient" className="p-8 mb-8">
              <h3 className="font-semibold text-xl text-white mb-6 text-center">
                Une fois le match confirmé, on s'occupe de tout :
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="text-accent" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">3 créneaux horaires</h4>
                      <p className="text-sm text-gray-400">
                        On vous propose 3 créneaux adaptés à vos disponibilités
                        (soirées de semaine, weekend après-midi...)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-accent" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">2-3 lieux recommandés</h4>
                      <p className="text-sm text-gray-400">
                        Des bars, cafés ou lieux publics sympas et sécurisés,
                        à mi-chemin entre vous deux
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="text-accent" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Confirmation ensemble</h4>
                      <p className="text-sm text-gray-400">
                        Vous choisissez ensemble le créneau et le lieu qui vous conviennent le mieux
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="text-accent" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Rappel et feedback</h4>
                      <p className="text-sm text-gray-400">
                        Email de rappel J-1, et après le RDV, feedback optionnel
                        pour améliorer les futurs matchs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="bg-gradient-to-r from-accent/20 to-gold/20 p-6 rounded-xl border border-accent/30">
              <div className="flex items-center gap-4">
                <Shield className="text-accent flex-shrink-0" size={32} />
                <p className="text-white">
                  <strong>100% sécurisé</strong> - Tous les rendez-vous se passent dans des{' '}
                  <span className="text-accent">lieux publics</span>. Tu contrôles tout : le lieu, l'heure,
                  et tu peux annuler si besoin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-white mb-4">
              Pourquoi cette méthode <span className="text-accent">fonctionne</span> ?
            </h2>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
              Une approche différente qui remet l'humain au centre des rencontres
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card variant="gradient" className="p-8 text-center">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="text-accent" size={40} />
                </div>
                <h3 className="font-semibold text-xl text-white mb-4">
                  Pas de jugement sur la photo
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  En masquant les photos au début, on se concentre sur la{' '}
                  <strong className="text-white">compatibilité réelle</strong>. Tu es matché
                  sur tes valeurs et ta personnalité, pas sur ton apparence.
                </p>
              </Card>

              <Card variant="gradient" className="p-8 text-center">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquareOff className="text-accent" size={40} />
                </div>
                <h3 className="font-semibold text-xl text-white mb-4">
                  Pas de conversation infinie
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  On évite le piège des apps classiques : des semaines de textos pour rien.
                  Ici, <strong className="text-white">on passe à l'action</strong> rapidement
                  avec un vrai rendez-vous.
                </p>
              </Card>

              <Card variant="gradient" className="p-8 text-center">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="text-accent" size={40} />
                </div>
                <h3 className="font-semibold text-xl text-white mb-4">
                  Lieux publics sécurisés
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Tous les rendez-vous ont lieu dans des{' '}
                  <strong className="text-white">lieux publics recommandés</strong>.
                  Tu rencontres l'autre personne en toute confiance et sécurité.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-accent/20 via-secondary to-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="mx-auto mb-6 text-accent" size={64} />
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              Prêt à <span className="text-accent">essayer</span> ?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Rejoins L'Amour Inconnu et découvre une nouvelle façon de rencontrer des célibataires
            </p>
            <Link to={ROUTES.REGISTER}>
              <Button variant="accent" size="lg" className="text-lg px-8 py-6">
                Créer mon profil gratuitement
              </Button>
            </Link>
            <p className="text-sm text-gray-400 mt-4">
              Inscription en 5 minutes • Sans engagement • 100% anonyme
            </p>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

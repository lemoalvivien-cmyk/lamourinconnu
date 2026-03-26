import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  MapPin,
  Users,
  Heart,
  ArrowRight,
  Coffee,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { getCityBySlug } from '../../lib/cities-data';
import { ROUTES } from '../../lib/constants';

export function Ville() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to={ROUTES.CITIES} replace />;
  }

  const city = getCityBySlug(slug);

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Ville non trouvée</h1>
          <p className="text-gray-400 mb-8">
            Cette ville n'est pas encore disponible ou n'existe pas.
          </p>
          <Link to={ROUTES.CITIES}>
            <Button variant="accent">Voir toutes les villes</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Rencontres à ${city.name} - L'Amour Inconnu`}</title>
        <meta name="description" content={`Rencontres authentiques à ${city.name}. ${city.description}`} />
        <meta property="og:title" content={`Rencontres à ${city.name} - L'Amour Inconnu`} />
        <meta property="og:description" content={`Rencontres authentiques à ${city.name}. ${city.description}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://lamourinconnu.fr/villes/${slug}`} />
        <link rel="canonical" href={`https://lamourinconnu.fr/villes/${slug}`} />
      </Helmet>

      <div className="min-h-screen">
        <div className="bg-secondary/30 py-6 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400 max-w-6xl mx-auto">
            <Link to={ROUTES.HOME} className="hover:text-accent transition-colors">
              Accueil
            </Link>
            <ChevronRight size={16} />
            <Link to={ROUTES.CITIES} className="hover:text-accent transition-colors">
              Villes
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-500">{city.name}</span>
          </nav>
        </div>
      </div>

      <div className="relative w-full h-[500px] overflow-hidden">
        <img
          src={city.coverImage}
          alt={`Rencontres à ${city.name}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="text-accent" size={24} />
                <Badge variant="accent">{city.region}</Badge>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
                Rencontres réelles à {city.name}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-6">
                Trouve l'amour à {city.name} avec L'Amour Inconnu
              </p>
              <div className="flex items-center justify-center gap-2 mb-8">
                <Users className="text-accent" size={20} />
                <span className="text-lg text-gray-300">
                  {city.memberCount.toLocaleString('fr-FR')}+ célibataires {city.name.toLowerCase() === 'paris' ? 'parisiens' : `de ${city.name}`} inscrits
                </span>
              </div>
              <Link to={ROUTES.REGISTER}>
                <Button variant="accent" size="lg" className="text-lg px-8 py-4">
                  Rejoindre les célibataires de {city.name}
                  <ArrowRight size={24} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Pourquoi {city.name} est parfait pour L'Amour Inconnu
            </h2>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
              {city.description}
            </p>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Coffee className="text-accent" size={28} />
                Les meilleurs quartiers pour se rencontrer à {city.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {city.neighborhoods.map((neighborhood, index) => (
                  <div
                    key={index}
                    className="p-5 bg-secondary/50 rounded-lg border border-gray-800 hover:border-accent/30 transition-colors"
                  >
                    <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      <MapPin size={18} className="text-accent" />
                      {neighborhood.name}
                    </h4>
                    <p className="text-gray-400">{neighborhood.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="mb-16">
            <Card className="p-8 bg-gradient-to-br from-accent/10 via-secondary to-primary border-accent/30">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Comment ça marche à {city.name} ?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-accent">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Crée ton profil
                  </h3>
                  <p className="text-gray-300">
                    Indique tes préférences et les quartiers de {city.name} que tu fréquentes.
                    Plus ton profil est complet, meilleurs sont les matchs.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-accent">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Reçois des matchs locaux
                  </h3>
                  <p className="text-gray-300">
                    Notre algorithme te propose des célibataires compatibles qui vivent
                    à {city.name}, près de chez toi.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-accent">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Rendez-vous organisés
                  </h3>
                  <p className="text-gray-300">
                    On te propose des lieux dans ton quartier ou à proximité.
                    Date, heure, endroit : tout est organisé pour toi.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {city.testimonials.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Ils se sont rencontrés à {city.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {city.testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                        <Heart className="text-accent" size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-white">
                          {testimonial.name}, {testimonial.age} ans
                        </p>
                        <p className="text-sm text-gray-500">{testimonial.district}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="mb-16">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Les avantages à {city.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="text-accent flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Proximité maximale
                    </h3>
                    <p className="text-gray-400">
                      Rencontre des célibataires dans ton quartier ou à proximité.
                      Pas besoin de traverser toute la ville.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="text-accent flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Lieux soigneusement sélectionnés
                    </h3>
                    <p className="text-gray-400">
                      Nous choisissons des endroits adaptés à {city.name} : accessibles,
                      agréables et propices aux rencontres.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="text-accent flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Profils vérifiés
                    </h3>
                    <p className="text-gray-400">
                      Tous les profils sont vérifiés pour garantir des rencontres
                      sécurisées et authentiques.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="text-accent flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Communauté locale
                    </h3>
                    <p className="text-gray-400">
                      Fais partie d'une communauté de célibataires qui partagent
                      ton mode de vie à {city.name}.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Card className="inline-block p-8 max-w-2xl bg-gradient-to-br from-accent/10 via-secondary to-primary border-accent/30">
              <Heart className="w-16 h-16 text-accent mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-4">
                Prêt à rencontrer des {city.name === 'Paris' ? 'Parisiens' : `habitants de ${city.name}`} ?
              </h3>
              <p className="text-gray-300 mb-6 text-lg">
                Rejoins {city.memberCount.toLocaleString('fr-FR')}+ célibataires à {city.name} et commence
                ton aventure avec L'Amour Inconnu. L'inscription est gratuite.
              </p>
              <Link to={ROUTES.REGISTER}>
                <Button variant="accent" size="lg" className="text-lg px-8 py-4">
                  M'inscrire gratuitement
                  <ArrowRight size={24} className="ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                Compte gratuit • Pass Inconnu à 14€/mois pour 2 rendez-vous minimum
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

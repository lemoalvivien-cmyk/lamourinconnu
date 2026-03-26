import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { MapPin, Users, ArrowRight } from 'lucide-react';
import { getAllCities } from '../../lib/cities-data';
import { ROUTES } from '../../lib/constants';

export function Villes() {
  const cities = getAllCities();

  return (
    <>
      <Helmet>
        <title>Rencontres par ville - L'Amour Inconnu | Trouvez l'amour près de chez vous</title>
        <meta name="description" content="Découvrez L'Amour Inconnu dans votre ville. Des rencontres authentiques organisées partout en France." />
        <meta property="og:title" content="Rencontres par ville - L'Amour Inconnu | Trouvez l'amour près de chez vous" />
        <meta property="og:description" content="Découvrez L'Amour Inconnu dans votre ville. Des rencontres authentiques organisées partout en France." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lamourinconnu.fr/villes" />
        <link rel="canonical" href="https://lamourinconnu.fr/villes" />
      </Helmet>

      <div className="min-h-screen">
        <div className="bg-gradient-to-b from-secondary/50 to-transparent py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Rencontres réelles dans ta ville
            </h1>
            <p className="text-xl text-gray-300">
              L'Amour Inconnu est disponible dans les principales villes de France.
              Découvre où tu peux rencontrer des célibataires près de chez toi.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/villes/${city.slug}`}
                className="group"
              >
                <Card className="h-full overflow-hidden transition-all hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={city.coverImage}
                      alt={`Rencontres à ${city.name}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />

                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 bg-secondary/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <MapPin size={14} className="text-accent" />
                        <span className="text-sm text-gray-300">{city.region}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                        {city.name}
                      </h2>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users size={16} />
                        <span className="text-sm">
                          {city.memberCount.toLocaleString('fr-FR')}+ célibataires
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {city.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-accent font-semibold group-hover:text-accent/80 transition-colors">
                        Découvrir {city.name}
                      </span>
                      <ArrowRight
                        size={20}
                        className="text-accent group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="inline-block p-8 max-w-2xl bg-gradient-to-br from-accent/10 via-secondary to-primary border-accent/30">
              <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">
                Ta ville n'est pas encore disponible ?
              </h3>
              <p className="text-gray-300 mb-6">
                Nous élargissons constamment notre réseau de villes.
                Inscris-toi pour être notifié quand L'Amour Inconnu arrive dans ta région.
              </p>
              <Link to={ROUTES.REGISTER}>
                <Button variant="accent" size="lg">
                  M'inscrire à la liste d'attente
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </Card>
          </div>

          <div className="mt-16">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Pourquoi choisir L'Amour Inconnu dans ta ville ?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="text-accent" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Lieux locaux
                  </h3>
                  <p className="text-gray-400">
                    Des rendez-vous organisés dans les meilleurs endroits de ta ville,
                    sélectionnés pour leur ambiance et leur accessibilité.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <Users className="text-accent" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Célibataires de ta région
                  </h3>
                  <p className="text-gray-400">
                    Rencontre des personnes qui vivent près de chez toi et partagent
                    ton mode de vie local.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="text-accent" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Proximité garantie
                  </h3>
                  <p className="text-gray-400">
                    Fini les rendez-vous à l'autre bout de la ville. Nos matchs
                    prennent en compte la distance pour plus de praticité.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

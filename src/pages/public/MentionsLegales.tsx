import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Building2, Server, Copyright, Mail } from 'lucide-react';
import { ROUTES } from '../../lib/constants';

export function MentionsLegales() {
  const lastUpdate = "6 décembre 2025";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-secondary/50 to-transparent py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to={ROUTES.HOME}>
              <Button variant="outline" size="sm" className="mb-6">
                <ArrowLeft size={16} className="mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <Building2 className="text-accent" size={48} />
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                  Mentions Légales
                </h1>
                <p className="text-gray-400 mt-2">
                  Dernière mise à jour : {lastUpdate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Table des matières</h2>
            <nav className="space-y-2">
              {[
                { id: 'section-1', title: '1. Éditeur du site' },
                { id: 'section-2', title: '2. Hébergement' },
                { id: 'section-3', title: '3. Propriété intellectuelle' },
                { id: 'section-4', title: '4. Crédits' },
                { id: 'section-5', title: '5. Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block text-left text-accent hover:text-accent/80 transition-colors"
                >
                  {item.title}
                </button>
              ))}
            </nav>
          </Card>

          <div className="space-y-8">
            <Card className="p-8" id="section-1">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Building2 className="text-accent" size={32} />
                <span>
                  <span className="text-accent">1.</span> Éditeur du site
                </span>
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Le site internet <strong className="text-white">lamourinconnu.com</strong> est édité par :
                </p>

                <div className="bg-secondary/30 p-6 rounded-lg border border-gray-700 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Nom :</strong> L'Amour Inconnu
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Forme juridique :</strong> [À compléter - SARL / SAS / Auto-entrepreneur]
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Capital social :</strong> [À compléter]
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Siège social :</strong> [À compléter - Adresse complète]
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Numéro SIRET :</strong> [À compléter]
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Numéro RCS :</strong> [À compléter]
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Numéro TVA intracommunautaire :</strong> [À compléter]
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mt-6">Directeur de la publication</h3>
                <div className="bg-secondary/30 p-6 rounded-lg border border-gray-700">
                  <p>
                    <strong className="text-white">Nom :</strong> [À compléter - Nom du directeur de publication]
                  </p>
                  <p className="mt-2">
                    <strong className="text-white">Fonction :</strong> [À compléter - Gérant / Président]
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-white mt-6">Contact</h3>
                <div className="bg-accent/10 border border-accent/30 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="text-accent" size={20} />
                    <div>
                      <strong className="text-white">Email :</strong>{' '}
                      <a
                        href="mailto:contact@lamourinconnu.fr"
                        className="text-accent hover:text-accent/80 underline"
                      >
                        contact@lamourinconnu.fr
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Téléphone :</strong> [À compléter]
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8" id="section-2">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Server className="text-accent" size={32} />
                <span>
                  <span className="text-accent">2.</span> Hébergement
                </span>
              </h2>
              <div className="text-gray-300 space-y-6 leading-relaxed">
                <p>
                  Le site <strong className="text-white">lamourinconnu.com</strong> est hébergé par :
                </p>

                <div className="space-y-6">
                  <div className="bg-secondary/30 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Hébergement du site web
                    </h3>
                    <div className="space-y-2">
                      <p><strong className="text-white">Nom :</strong> Netlify, Inc.</p>
                      <p><strong className="text-white">Adresse :</strong> 2325 3rd Street, Suite 296</p>
                      <p>San Francisco, CA 94107</p>
                      <p>États-Unis</p>
                      <p className="mt-3">
                        <strong className="text-white">Site web :</strong>{' '}
                        <a
                          href="https://www.netlify.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:text-accent/80 underline"
                        >
                          www.netlify.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="bg-secondary/30 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Hébergement de la base de données
                    </h3>
                    <div className="space-y-2">
                      <p><strong className="text-white">Nom :</strong> Supabase Inc.</p>
                      <p><strong className="text-white">Adresse :</strong> 970 Toa Payoh North #07-04</p>
                      <p>Singapore 318992</p>
                      <p>Singapour</p>
                      <p className="mt-3">
                        <strong className="text-white">Site web :</strong>{' '}
                        <a
                          href="https://supabase.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:text-accent/80 underline"
                        >
                          supabase.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="bg-accent/10 border border-accent/30 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong className="text-white">Note :</strong> Les données sont hébergées conformément
                      au RGPD avec des garanties appropriées pour les transferts hors UE. Pour plus d'informations,
                      consultez notre{' '}
                      <Link to={ROUTES.CONFIDENTIALITE} className="text-accent hover:text-accent/80 underline">
                        Politique de Confidentialité
                      </Link>.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8" id="section-3">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Copyright className="text-accent" size={32} />
                <span>
                  <span className="text-accent">3.</span> Propriété intellectuelle
                </span>
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  L'ensemble du contenu présent sur le site <strong className="text-white">lamourinconnu.com</strong>
                  {' '}(textes, graphismes, logos, icônes, images, vidéos, sons, bases de données, logiciels)
                  est la propriété exclusive de <strong className="text-white">L'Amour Inconnu</strong> ou
                  fait l'objet d'une autorisation d'utilisation.
                </p>

                <div className="bg-secondary/30 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-3">Protection</h3>
                  <p>
                    Tous les éléments du site sont protégés par le droit d'auteur, le droit des marques,
                    le droit des brevets et/ou tout autre droit de propriété intellectuelle.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-white mt-6">Reproduction interdite</h3>
                <p>
                  Toute reproduction, représentation, modification, publication, transmission, dénaturation,
                  totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur
                  quelque support que ce soit est interdite.
                </p>
                <p>
                  Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient
                  sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux
                  dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
                </p>

                <h3 className="text-lg font-semibold text-white mt-6">Marque</h3>
                <div className="bg-accent/10 border border-accent/30 p-4 rounded-lg">
                  <p>
                    La marque <strong className="text-white">"L'Amour Inconnu"</strong>, le logo et tous
                    les signes distinctifs reproduits sur le site sont la propriété de L'Amour Inconnu.
                    Toute reproduction non autorisée de ces éléments constitue une contrefaçon sanctionnée
                    par les articles L.713-2 et suivants du Code de la Propriété Intellectuelle.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-white mt-6">Droits des utilisateurs</h3>
                <p>
                  Les utilisateurs du site conservent tous leurs droits de propriété intellectuelle sur
                  les contenus qu'ils publient (photos, textes, descriptions). En publiant du contenu,
                  vous accordez à L'Amour Inconnu une licence d'utilisation limitée au fonctionnement
                  du service.
                </p>
              </div>
            </Card>

            <Card className="p-8" id="section-4">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-accent">4.</span>
                Crédits
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <h3 className="text-lg font-semibold text-white">Conception et développement</h3>
                <div className="bg-secondary/30 p-6 rounded-lg border border-gray-700">
                  <p>
                    <strong className="text-white">Design & Développement :</strong> [À compléter - Nom de l'agence ou du développeur]
                  </p>
                  <p className="mt-2">
                    <strong className="text-white">Site web :</strong> [À compléter]
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-white mt-6">Technologies utilisées</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-secondary/30 p-4 rounded-lg border border-gray-700">
                    <p className="font-semibold text-white mb-2">Frontend</p>
                    <ul className="space-y-1 text-sm">
                      <li>• React (UI Framework)</li>
                      <li>• Vite (Build Tool)</li>
                      <li>• TypeScript (Language)</li>
                      <li>• Tailwind CSS (Styling)</li>
                      <li>• React Router (Routing)</li>
                    </ul>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg border border-gray-700">
                    <p className="font-semibold text-white mb-2">Backend & Services</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Supabase (Database & Auth)</li>
                      <li>• Stripe (Payments)</li>
                      <li>• Netlify (Hosting)</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mt-6">Icônes</h3>
                <div className="bg-secondary/30 p-4 rounded-lg border border-gray-700">
                  <p>
                    <strong className="text-white">Lucide React</strong> - Icônes open source
                  </p>
                  <p className="text-sm mt-2">
                    Licence MIT -{' '}
                    <a
                      href="https://lucide.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 underline"
                    >
                      lucide.dev
                    </a>
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-white mt-6">Polices de caractères</h3>
                <div className="bg-secondary/30 p-4 rounded-lg border border-gray-700">
                  <p>
                    <strong className="text-white">Polices système</strong> (sans licence tierce)
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8" id="section-5">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Mail className="text-accent" size={32} />
                <span>
                  <span className="text-accent">5.</span> Contact
                </span>
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Pour toute question concernant les mentions légales ou le site en général, vous pouvez
                  nous contacter :
                </p>

                <div className="bg-gradient-to-br from-accent/20 via-secondary to-primary p-6 rounded-lg border border-accent/30">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="text-accent flex-shrink-0" size={20} />
                      <div>
                        <p className="font-semibold text-white mb-1">Par email</p>
                        <a
                          href="mailto:contact@lamourinconnu.fr"
                          className="text-accent hover:text-accent/80 underline"
                        >
                          contact@lamourinconnu.fr
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-3 border-t border-gray-700">
                      <Building2 className="text-accent flex-shrink-0 mt-1" size={20} />
                      <div>
                        <p className="font-semibold text-white mb-1">Par courrier</p>
                        <p className="text-sm">
                          L'Amour Inconnu<br />
                          [Adresse à compléter]<br />
                          [Code postal et ville à compléter]
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/30 p-4 rounded-lg mt-6">
                  <p className="text-sm">
                    <strong className="text-white">Délai de réponse :</strong> Nous nous engageons à
                    répondre à vos demandes dans un délai maximum de 72 heures ouvrées.
                  </p>
                </div>
              </div>
            </Card>

            <div className="bg-secondary/30 p-6 rounded-lg border border-gray-700 text-center">
              <p className="text-gray-400 text-sm mb-4">
                Pour toute information concernant la protection de vos données personnelles,
                consultez notre Politique de Confidentialité.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={ROUTES.CONFIDENTIALITE}>
                  <Button variant="outline" size="sm">
                    Politique de Confidentialité
                  </Button>
                </Link>
                <Link to={ROUTES.CGU}>
                  <Button variant="outline" size="sm">
                    Conditions Générales
                  </Button>
                </Link>
              </div>
            </div>

            <div className="text-center py-8">
              <Link to={ROUTES.HOME}>
                <Button variant="accent" size="lg">
                  <ArrowLeft size={16} className="mr-2" />
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

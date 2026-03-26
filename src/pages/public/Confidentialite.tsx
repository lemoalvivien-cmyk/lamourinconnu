import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Shield, Cookie, Lock, Eye } from 'lucide-react';
import { ROUTES } from '../../lib/constants';

export function Confidentialite() {
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
              <Shield className="text-accent" size={48} />
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                  Politique de Confidentialité
                </h1>
                <p className="text-gray-400 mt-2">
                  Dernière mise à jour : {lastUpdate}
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-lg">
              Conforme au RGPD et à la loi Informatique et Libertés
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Table des matières</h2>
            <nav className="space-y-2">
              {[
                { id: 'section-1', title: '1. Identité du responsable de traitement' },
                { id: 'section-2', title: '2. Données collectées' },
                { id: 'section-3', title: '3. Finalités du traitement' },
                { id: 'section-4', title: '4. Base légale' },
                { id: 'section-5', title: '5. Durée de conservation' },
                { id: 'section-6', title: '6. Destinataires des données' },
                { id: 'section-7', title: '7. Transferts hors UE' },
                { id: 'section-8', title: '8. Droits des utilisateurs' },
                { id: 'section-9', title: '9. Cookies' },
                { id: 'section-10', title: '10. Sécurité des données' },
                { id: 'section-11', title: '11. Modification de la politique' },
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
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">1.</span>
                Identité du responsable de traitement
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Le responsable du traitement des données personnelles collectées sur le site
                  lamourinconnu.com est :
                </p>
                <div className="bg-secondary/30 p-6 rounded-lg border border-gray-700">
                  <p><strong className="text-white">Nom :</strong> L'Amour Inconnu</p>
                  <p><strong className="text-white">Adresse :</strong> [À compléter]</p>
                  <p><strong className="text-white">Email :</strong> contact@lamourinconnu.fr</p>
                  <p><strong className="text-white">Téléphone :</strong> [À compléter]</p>
                </div>
                <p>
                  Pour toute question relative à la protection de vos données personnelles ou pour
                  exercer vos droits, vous pouvez nous contacter à l'adresse email ci-dessus.
                </p>
              </div>
            </Card>

            <Card className="p-8" id="section-2">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">2.</span>
                Données collectées
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Nous collectons différentes catégories de données personnelles vous concernant :
                </p>

                <h3 className="text-lg font-semibold text-white mt-6">2.1 Données d'inscription</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Adresse email</li>
                  <li>Mot de passe (chiffré)</li>
                  <li>Prénom</li>
                  <li>Date de naissance</li>
                  <li>Genre</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6">2.2 Données de profil</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Ville de résidence</li>
                  <li>Photos de profil (optionnel)</li>
                  <li>Description personnelle</li>
                  <li>Centres d'intérêt et hobbies</li>
                  <li>Préférences de rencontre</li>
                  <li>Traits de personnalité</li>
                  <li>Valeurs et convictions</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6">2.3 Données d'utilisation</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Historique des matchs</li>
                  <li>Messages échangés</li>
                  <li>Rendez-vous planifiés et historique</li>
                  <li>Préférences et paramètres du compte</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6">2.4 Données de navigation</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Adresse IP</li>
                  <li>Type de navigateur</li>
                  <li>Pages visitées et durée de visite</li>
                  <li>Données de cookies (voir section 9)</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6">2.5 Données de paiement</h3>
                <p>
                  Les données de paiement (numéro de carte bancaire, date d'expiration, cryptogramme)
                  sont collectées et traitées exclusivement par notre prestataire de paiement sécurisé
                  <strong className="text-white"> Stripe</strong>. Nous ne conservons jamais vos données
                  de paiement complètes.
                </p>
                <p>
                  Nous conservons uniquement :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Les 4 derniers chiffres de votre carte (pour identification)</li>
                  <li>L'historique de vos paiements (montants et dates)</li>
                  <li>Le statut de votre abonnement</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8" id="section-3">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">3.</span>
                Finalités du traitement
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Vos données personnelles sont collectées et traitées pour les finalités suivantes :
                </p>

                <h3 className="text-lg font-semibold text-white">3.1 Fourniture du service</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Création et gestion de votre compte</li>
                  <li>Authentification et sécurisation de l'accès</li>
                  <li>Affichage de votre profil aux autres membres</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6">3.2 Matching et organisation des rendez-vous</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Calcul de la compatibilité avec d'autres profils</li>
                  <li>Proposition de matchs personnalisés</li>
                  <li>Organisation de rendez-vous pour les abonnés</li>
                  <li>Suggestion de lieux et horaires adaptés</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6">3.3 Communication</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Envoi d'emails transactionnels (confirmation d'inscription, réinitialisation mot de passe)</li>
                  <li>Notifications de nouveaux matchs et messages</li>
                  <li>Rappels de rendez-vous planifiés</li>
                  <li>Support client et assistance</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6">3.4 Amélioration du service</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Analyse statistique de l'utilisation du service</li>
                  <li>Amélioration de l'algorithme de matching</li>
                  <li>Détection et prévention des abus</li>
                  <li>Tests A/B et optimisation de l'expérience utilisateur</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6">3.5 Obligations légales</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Conservation des données de facturation</li>
                  <li>Réponse aux demandes des autorités compétentes</li>
                  <li>Prévention de la fraude et des activités illégales</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8" id="section-4">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">4.</span>
                Base légale
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Conformément au RGPD, le traitement de vos données personnelles repose sur les
                  bases légales suivantes :
                </p>

                <div className="space-y-4">
                  <div className="bg-secondary/30 p-4 rounded-lg border border-accent/30">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Exécution du contrat (Art. 6.1.b RGPD)
                    </h3>
                    <p>
                      Le traitement est nécessaire à l'exécution du contrat que vous avez conclu avec nous
                      (création de compte, matching, organisation de rendez-vous).
                    </p>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg border border-accent/30">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Consentement (Art. 6.1.a RGPD)
                    </h3>
                    <p>
                      Certains traitements reposent sur votre consentement explicite (cookies non essentiels,
                      communications marketing, partage de données optionnelles).
                    </p>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg border border-accent/30">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Intérêt légitime (Art. 6.1.f RGPD)
                    </h3>
                    <p>
                      Nous avons un intérêt légitime à améliorer notre service, à prévenir la fraude et
                      à assurer la sécurité de la plateforme.
                    </p>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg border border-accent/30">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Obligation légale (Art. 6.1.c RGPD)
                    </h3>
                    <p>
                      Certains traitements sont nécessaires pour respecter nos obligations légales
                      (conservation des factures, réponse aux réquisitions judiciaires).
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8" id="section-5">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">5.</span>
                Durée de conservation
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Vos données sont conservées pendant les durées suivantes :
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Données de compte actif :</strong> pendant toute
                      la durée de votre inscription, puis 3 ans à compter de votre dernière activité
                      (pour permettre une réactivation).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Données de compte supprimé :</strong> suppression
                      immédiate, sauf obligations légales.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Données de paiement :</strong> 10 ans (obligation
                      légale comptable et fiscale).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Messages et conversations :</strong> durée de
                      votre compte + 3 ans.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Données statistiques anonymisées :</strong> durée
                      illimitée (impossibilité de vous identifier).
                    </div>
                  </div>
                </div>

                <p className="bg-accent/10 border border-accent/30 p-4 rounded-lg mt-6">
                  <strong className="text-white">Important :</strong> À l'issue de ces durées, vos
                  données sont supprimées définitivement ou anonymisées de manière irréversible.
                </p>
              </div>
            </Card>

            <Card className="p-8" id="section-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">6.</span>
                Destinataires des données
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Vos données personnelles sont accessibles uniquement aux personnes suivantes :
                </p>

                <h3 className="text-lg font-semibold text-white">6.1 Personnel de L'Amour Inconnu</h3>
                <p>
                  Les membres de notre équipe ayant besoin d'accéder à vos données pour assurer le
                  fonctionnement du service (support client, modération, développement).
                </p>

                <h3 className="text-lg font-semibold text-white mt-6">6.2 Sous-traitants techniques</h3>
                <p>
                  Nous faisons appel à des prestataires de confiance pour héberger et traiter vos données :
                </p>
                <ul className="space-y-3 ml-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Supabase Inc.</strong> - Hébergement de la base
                      de données (certifié SOC 2 Type 2, conforme RGPD)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Netlify Inc.</strong> - Hébergement du site web
                      (certifié SOC 2 Type 2, conforme RGPD)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Stripe Inc.</strong> - Traitement des paiements
                      (certifié PCI DSS niveau 1, conforme RGPD)
                    </div>
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6">6.3 Autres membres</h3>
                <p>
                  Les informations de votre profil public (photos, description, préférences) sont
                  visibles par les autres membres avec qui vous êtes en match. Votre email et vos
                  données sensibles ne sont jamais partagés.
                </p>

                <h3 className="text-lg font-semibold text-white mt-6">6.4 Autorités légales</h3>
                <p>
                  En cas de réquisition judiciaire, nous pouvons être amenés à communiquer vos données
                  aux autorités compétentes (police, justice) dans le cadre d'enquêtes légales.
                </p>
              </div>
            </Card>

            <Card className="p-8" id="section-7">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">7.</span>
                Transferts hors UE
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Certains de nos sous-traitants sont situés en dehors de l'Union Européenne,
                  notamment aux États-Unis. Ces transferts sont encadrés par des garanties appropriées :
                </p>

                <div className="space-y-3">
                  <div className="bg-secondary/30 p-4 rounded-lg border border-accent/30">
                    <h3 className="text-lg font-semibold text-white mb-2">Clauses Contractuelles Types</h3>
                    <p>
                      Nous avons conclu des Clauses Contractuelles Types (CCT) approuvées par la
                      Commission Européenne avec nos sous-traitants américains (Supabase, Netlify, Stripe).
                    </p>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg border border-accent/30">
                    <h3 className="text-lg font-semibold text-white mb-2">Certifications</h3>
                    <p>
                      Nos prestataires disposent de certifications reconnues (SOC 2, ISO 27001, PCI DSS)
                      garantissant un niveau de protection équivalent au RGPD.
                    </p>
                  </div>
                </div>

                <p>
                  Vous pouvez obtenir une copie des garanties mises en place en nous contactant à
                  contact@lamourinconnu.fr.
                </p>
              </div>
            </Card>

            <Card className="p-8" id="section-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">8.</span>
                Droits des utilisateurs
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Conformément au RGPD, vous disposez des droits suivants concernant vos données
                  personnelles :
                </p>

                <div className="space-y-4">
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <Eye size={20} className="text-accent" />
                      Droit d'accès (Art. 15 RGPD)
                    </h3>
                    <p>
                      Vous pouvez obtenir une copie de toutes les données personnelles que nous
                      détenons sur vous.
                    </p>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Droit de rectification (Art. 16 RGPD)
                    </h3>
                    <p>
                      Vous pouvez corriger ou mettre à jour vos données personnelles directement depuis
                      vos paramètres ou en nous contactant.
                    </p>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Droit à l'effacement (Art. 17 RGPD)
                    </h3>
                    <p>
                      Vous pouvez demander la suppression de vos données personnelles, sous réserve
                      de nos obligations légales de conservation.
                    </p>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Droit à la limitation (Art. 18 RGPD)
                    </h3>
                    <p>
                      Vous pouvez demander la limitation du traitement de vos données dans certaines
                      situations (contestation de l'exactitude, traitement illicite).
                    </p>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Droit à la portabilité (Art. 20 RGPD)
                    </h3>
                    <p>
                      Vous pouvez récupérer vos données dans un format structuré et lisible par machine
                      pour les transférer à un autre service.
                    </p>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Droit d'opposition (Art. 21 RGPD)
                    </h3>
                    <p>
                      Vous pouvez vous opposer au traitement de vos données pour des raisons tenant
                      à votre situation particulière.
                    </p>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Droit de retirer votre consentement
                    </h3>
                    <p>
                      Lorsque le traitement est fondé sur votre consentement, vous pouvez le retirer
                      à tout moment.
                    </p>
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/30 p-6 rounded-lg mt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Comment exercer vos droits ?</h3>
                  <p className="mb-3">
                    Pour exercer vos droits, vous pouvez :
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>Nous envoyer un email à <strong className="text-white">contact@lamourinconnu.fr</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>Modifier directement vos informations depuis vos paramètres de compte</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>Supprimer votre compte depuis la section "Paramètres"</span>
                    </li>
                  </ul>
                  <p className="mt-4">
                    Nous nous engageons à répondre à toute demande dans un délai d'<strong className="text-white">un mois</strong> maximum.
                  </p>
                </div>

                <p className="mt-6">
                  Vous disposez également du droit d'introduire une réclamation auprès de la CNIL
                  (Commission Nationale de l'Informatique et des Libertés) si vous estimez que vos
                  droits ne sont pas respectés : www.cnil.fr
                </p>
              </div>
            </Card>

            <Card className="p-8" id="section-9">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">9.</span>
                <Cookie size={24} />
                Cookies
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Notre site utilise des cookies pour améliorer votre expérience et assurer le bon
                  fonctionnement du service.
                </p>

                <h3 className="text-lg font-semibold text-white">9.1 Types de cookies utilisés</h3>

                <div className="space-y-3">
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Cookies essentiels (obligatoires)</h4>
                    <p>
                      Ces cookies sont nécessaires au fonctionnement du site (authentification, sécurité,
                      préférences). Ils ne peuvent pas être désactivés.
                    </p>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Cookies de performance (optionnels)</h4>
                    <p>
                      Ces cookies nous permettent de mesurer l'audience et d'améliorer le service
                      (Google Analytics). Vous pouvez les refuser.
                    </p>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Cookies fonctionnels (optionnels)</h4>
                    <p>
                      Ces cookies mémorisent vos préférences (langue, affichage). Vous pouvez les refuser.
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mt-6">9.2 Gestion des cookies</h3>
                <p>
                  Vous pouvez gérer vos préférences de cookies :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Depuis les paramètres de votre compte</li>
                  <li>Depuis les paramètres de votre navigateur</li>
                  <li>Via le bandeau cookie affiché lors de votre première visite</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6">9.3 Durée de conservation</h3>
                <p>
                  Les cookies sont conservés pendant une durée maximale de 13 mois, conformément aux
                  recommandations de la CNIL.
                </p>
              </div>
            </Card>

            <Card className="p-8" id="section-10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">10.</span>
                <Lock size={24} />
                Sécurité des données
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
                  protéger vos données personnelles contre tout accès non autorisé, modification,
                  divulgation ou destruction.
                </p>

                <h3 className="text-lg font-semibold text-white">Mesures de sécurité</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Chiffrement :</strong> Connexion HTTPS (SSL/TLS)
                      pour tous les échanges de données
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Mots de passe :</strong> Hashage avec algorithme
                      bcrypt (impossible de récupérer votre mot de passe en clair)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Hébergement sécurisé :</strong> Infrastructure
                      certifiée SOC 2 avec sauvegarde automatique
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Accès restreint :</strong> Seuls les membres
                      autorisés de l'équipe ont accès aux données
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong className="text-white">Surveillance :</strong> Monitoring 24/7 et
                      détection des tentatives d'intrusion
                    </div>
                  </li>
                </ul>

                <div className="bg-accent/10 border border-accent/30 p-4 rounded-lg mt-6">
                  <p>
                    <strong className="text-white">En cas de violation de données :</strong> Nous nous
                    engageons à vous notifier dans les 72 heures et à informer la CNIL conformément au RGPD.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8" id="section-11">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">11.</span>
                Modification de la politique
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Nous nous réservons le droit de modifier la présente Politique de Confidentialité
                  à tout moment pour refléter les évolutions du service ou de la réglementation.
                </p>
                <p>
                  Toute modification substantielle vous sera notifiée par email et/ou via une
                  notification sur le site au moins 30 jours avant son entrée en vigueur.
                </p>
                <p>
                  Nous vous encourageons à consulter régulièrement cette page pour rester informé
                  de nos pratiques en matière de protection des données.
                </p>
                <p>
                  La date de dernière mise à jour est indiquée en haut de cette page.
                </p>
              </div>
            </Card>

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

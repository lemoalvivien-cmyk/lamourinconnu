import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, FileText } from 'lucide-react';
import { ROUTES } from '../../lib/constants';

export function CGU() {
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
              <FileText className="text-accent" size={48} />
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                  Conditions Générales d'Utilisation
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
                { id: 'article-1', title: '1. Objet et acceptation des CGU' },
                { id: 'article-2', title: '2. Définitions' },
                { id: 'article-3', title: '3. Accès au service' },
                { id: 'article-4', title: '4. Description du service' },
                { id: 'article-5', title: '5. Obligations de l\'utilisateur' },
                { id: 'article-6', title: '6. Propriété intellectuelle' },
                { id: 'article-7', title: '7. Responsabilité' },
                { id: 'article-8', title: '8. Données personnelles' },
                { id: 'article-9', title: '9. Résiliation' },
                { id: 'article-10', title: '10. Modification des CGU' },
                { id: 'article-11', title: '11. Droit applicable et litiges' },
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
            <Card className="p-8" id="article-1">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">1.</span>
                Objet et acceptation des CGU
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation
                  de la plateforme L'Amour Inconnu, accessible à l'adresse lamourinconnu.com (ci-après « le Service »).
                </p>
                <p>
                  En créant un compte sur L'Amour Inconnu, vous acceptez sans réserve les présentes CGU.
                  Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le Service.
                </p>
                <p>
                  L'Amour Inconnu se réserve le droit de modifier les présentes CGU à tout moment.
                  Les modifications entreront en vigueur dès leur publication sur le site.
                </p>
              </div>
            </Card>

            <Card className="p-8" id="article-2">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">2.</span>
                Définitions
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <ul className="space-y-3 list-none">
                  <li>
                    <strong className="text-white">Service :</strong> désigne la plateforme L'Amour Inconnu
                    et l'ensemble de ses fonctionnalités (matching, messagerie, organisation de rendez-vous).
                  </li>
                  <li>
                    <strong className="text-white">Utilisateur :</strong> désigne toute personne accédant
                    au site, qu'elle soit inscrite ou non.
                  </li>
                  <li>
                    <strong className="text-white">Membre :</strong> désigne un utilisateur inscrit avec
                    un compte gratuit.
                  </li>
                  <li>
                    <strong className="text-white">Abonné :</strong> désigne un membre ayant souscrit
                    au Pass Inconnu (abonnement payant à 14€/mois).
                  </li>
                  <li>
                    <strong className="text-white">Profil :</strong> désigne l'ensemble des informations
                    renseignées par un membre (âge, ville, préférences, personnalité).
                  </li>
                  <li>
                    <strong className="text-white">Match :</strong> désigne une correspondance entre deux
                    profils jugés compatibles par l'algorithme de la plateforme.
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="p-8" id="article-3">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">3.</span>
                Accès au service
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <h3 className="text-lg font-semibold text-white">3.1 Conditions d'inscription</h3>
                <p>
                  Le Service est réservé aux personnes majeures âgées d'au moins 18 ans.
                  En créant un compte, vous attestez avoir au moins 18 ans révolus.
                </p>
                <p>
                  L'inscription est gratuite et volontaire. Elle nécessite la création d'un compte
                  avec une adresse email valide et un mot de passe sécurisé.
                </p>

                <h3 className="text-lg font-semibold text-white mt-6">3.2 Création de compte</h3>
                <p>
                  Pour créer un compte, vous devez fournir :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Une adresse email valide</li>
                  <li>Un mot de passe sécurisé</li>
                  <li>Votre prénom</li>
                  <li>Votre date de naissance</li>
                  <li>Votre ville de résidence</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6">3.3 Véracité des informations</h3>
                <p>
                  Vous vous engagez à fournir des informations exactes, à jour et complètes.
                  Toute fausse information, notamment concernant l'âge, peut entraîner la suspension
                  ou la suppression immédiate de votre compte.
                </p>
                <p>
                  Vous êtes responsable de la confidentialité de vos identifiants de connexion.
                  Toute utilisation de votre compte est présumée être effectuée par vous.
                </p>
              </div>
            </Card>

            <Card className="p-8" id="article-4">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">4.</span>
                Description du service
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <h3 className="text-lg font-semibold text-white">4.1 Fonctionnement du matching</h3>
                <p>
                  L'Amour Inconnu utilise un algorithme de compatibilité basé sur les informations
                  de votre profil (personnalité, valeurs, centres d'intérêt, préférences) pour
                  vous proposer des matchs pertinents.
                </p>
                <p>
                  Les matchs proposés sont basés sur des critères de compatibilité, mais ne garantissent
                  pas une rencontre réussie. L'algorithme est conçu pour maximiser les chances de
                  compatibilité, mais reste une aide à la rencontre.
                </p>

                <h3 className="text-lg font-semibold text-white mt-6">4.2 Organisation des rendez-vous</h3>
                <p>
                  Les abonnés au Pass Inconnu bénéficient de l'organisation de 2 rendez-vous par mois
                  minimum. L'Amour Inconnu propose des lieux et horaires de rendez-vous adaptés,
                  mais la confirmation et la présence effective restent à la discrétion des membres.
                </p>
                <p>
                  L'Amour Inconnu ne peut être tenue responsable en cas d'absence ou d'annulation
                  d'un rendez-vous par l'une des parties.
                </p>

                <h3 className="text-lg font-semibold text-white mt-6">4.3 Pass Inconnu</h3>
                <p>
                  Le Pass Inconnu est un abonnement mensuel à 14€/mois qui donne accès à :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Tous les avantages du compte gratuit</li>
                  <li>2 rendez-vous organisés par mois minimum</li>
                  <li>Matchs prioritaires dans l'algorithme</li>
                  <li>Historique complet des rendez-vous</li>
                  <li>Support prioritaire</li>
                </ul>
                <p className="bg-accent/10 border border-accent/30 p-4 rounded-lg mt-4">
                  <strong className="text-white">Garantie satisfait ou remboursé :</strong> Si vous n'avez
                  eu aucun rendez-vous confirmé dans le mois malgré un abonnement actif et un profil complet,
                  le mois suivant est gratuit.
                </p>
              </div>
            </Card>

            <Card className="p-8" id="article-5">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">5.</span>
                Obligations de l'utilisateur
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <h3 className="text-lg font-semibold text-white">5.1 Comportement respectueux</h3>
                <p>
                  Vous vous engagez à adopter un comportement respectueux envers les autres membres.
                  Sont notamment interdits :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Le harcèlement sous toutes ses formes</li>
                  <li>Les propos injurieux, racistes, sexistes, homophobes ou discriminatoires</li>
                  <li>Les contenus à caractère pornographique ou sexuellement explicites</li>
                  <li>L'usurpation d'identité</li>
                  <li>La sollicitation commerciale non autorisée</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6">5.2 Interdiction de contenu illicite</h3>
                <p>
                  Il est strictement interdit de publier ou transmettre tout contenu :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Contraire aux lois et règlements en vigueur</li>
                  <li>Portant atteinte aux droits de tiers</li>
                  <li>Diffamatoire ou calomnieux</li>
                  <li>Incitant à la violence, à la haine ou à la discrimination</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6">5.3 Signalement des abus</h3>
                <p>
                  Si vous êtes témoin d'un comportement inapproprié, vous pouvez le signaler à notre
                  équipe via contact@lamourinconnu.fr. Nous nous engageons à traiter tous les signalements
                  dans les meilleurs délais.
                </p>
                <p>
                  Tout manquement aux obligations ci-dessus peut entraîner la suspension temporaire
                  ou définitive de votre compte, sans préavis ni remboursement.
                </p>
              </div>
            </Card>

            <Card className="p-8" id="article-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">6.</span>
                Propriété intellectuelle
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  L'ensemble des éléments du Service (structure, design, textes, graphismes, logos,
                  icônes, sons, logiciels, bases de données) est la propriété exclusive de L'Amour Inconnu
                  ou fait l'objet d'une autorisation d'utilisation.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou
                  partie des éléments du Service, quel que soit le moyen ou le procédé utilisé, est
                  interdite, sauf autorisation écrite préalable de L'Amour Inconnu.
                </p>
                <p>
                  Vous conservez tous les droits sur les contenus que vous publiez (photos, textes).
                  Cependant, en publiant du contenu sur le Service, vous accordez à L'Amour Inconnu
                  une licence non exclusive, transférable, sous-licenciable et mondiale pour utiliser,
                  héberger, stocker, reproduire et afficher ce contenu dans le cadre du fonctionnement
                  du Service.
                </p>
              </div>
            </Card>

            <Card className="p-8" id="article-7">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">7.</span>
                Responsabilité
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <h3 className="text-lg font-semibold text-white">7.1 Limitation de responsabilité</h3>
                <p>
                  L'Amour Inconnu met en œuvre tous les moyens raisonnables pour assurer un accès de
                  qualité au Service, mais n'est tenue à aucune obligation d'y parvenir.
                </p>
                <p>
                  L'Amour Inconnu ne peut garantir que le Service soit exempt d'anomalies, d'erreurs
                  ou de bugs, ni que ceux-ci pourront être corrigés, ni que le Service fonctionnera
                  sans interruption ou panne.
                </p>
                <p>
                  L'Amour Inconnu décline toute responsabilité en cas de :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Impossibilité d'accéder au Service</li>
                  <li>Dommages directs ou indirects résultant de l'utilisation du Service</li>
                  <li>Comportement d'autres membres</li>
                  <li>Perte ou vol de données</li>
                  <li>Utilisation frauduleuse de votre compte</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6">7.2 Force majeure</h3>
                <p>
                  L'Amour Inconnu ne pourra être tenue responsable en cas d'inexécution de ses obligations
                  résultant d'un cas de force majeure tel que défini par la jurisprudence française.
                </p>
              </div>
            </Card>

            <Card className="p-8" id="article-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">8.</span>
                Données personnelles
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  L'Amour Inconnu collecte et traite vos données personnelles dans le respect du
                  Règlement Général sur la Protection des Données (RGPD) et de la loi Informatique
                  et Libertés.
                </p>
                <p>
                  Pour plus d'informations sur la collecte, l'utilisation et la protection de vos
                  données personnelles, veuillez consulter notre{' '}
                  <Link to={ROUTES.CONFIDENTIALITE} className="text-accent hover:text-accent/80 underline">
                    Politique de Confidentialité
                  </Link>.
                </p>
                <p>
                  Vous disposez d'un droit d'accès, de rectification, de suppression, de limitation,
                  d'opposition et de portabilité de vos données personnelles. Pour exercer ces droits,
                  contactez-nous à contact@lamourinconnu.fr.
                </p>
              </div>
            </Card>

            <Card className="p-8" id="article-9">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">9.</span>
                Résiliation
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <h3 className="text-lg font-semibold text-white">9.1 Résiliation par l'utilisateur</h3>
                <p>
                  Vous pouvez supprimer votre compte à tout moment depuis vos paramètres.
                  La suppression de votre compte entraîne la suppression définitive de vos données
                  personnelles, sous réserve des obligations légales de conservation.
                </p>
                <p>
                  Pour les abonnés au Pass Inconnu, l'abonnement peut être annulé à tout moment.
                  L'annulation prend effet à la fin de la période en cours. Aucun remboursement
                  au prorata ne sera effectué.
                </p>

                <h3 className="text-lg font-semibold text-white mt-6">9.2 Résiliation par L'Amour Inconnu</h3>
                <p>
                  L'Amour Inconnu se réserve le droit de suspendre ou supprimer votre compte en
                  cas de violation des présentes CGU, sans préavis ni indemnité.
                </p>
                <p>
                  En cas de suspension ou suppression d'un compte pour violation des CGU, aucun
                  remboursement ne sera effectué.
                </p>
              </div>
            </Card>

            <Card className="p-8" id="article-10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">10.</span>
                Modification des CGU
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  L'Amour Inconnu se réserve le droit de modifier les présentes CGU à tout moment
                  pour s'adapter aux évolutions du Service ou à la réglementation.
                </p>
                <p>
                  Toute modification des CGU sera notifiée aux membres par email et/ou via une
                  notification sur le Service. Les modifications entreront en vigueur 15 jours
                  après leur notification.
                </p>
                <p>
                  Si vous n'acceptez pas les nouvelles CGU, vous devez cesser d'utiliser le Service
                  et supprimer votre compte. La poursuite de l'utilisation du Service après l'entrée
                  en vigueur des nouvelles CGU vaut acceptation de celles-ci.
                </p>
              </div>
            </Card>

            <Card className="p-8" id="article-11">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-accent">11.</span>
                Droit applicable et litiges
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Les présentes CGU sont régies par le droit français.
                </p>
                <p>
                  En cas de litige relatif à l'interprétation ou à l'exécution des présentes CGU,
                  les parties s'efforceront de trouver une solution amiable. À défaut, le litige sera
                  soumis aux juridictions compétentes conformément aux règles de droit commun.
                </p>
                <p>
                  Conformément à l'article L.612-1 du Code de la consommation, vous pouvez recourir
                  gratuitement à un médiateur de la consommation en vue de la résolution amiable d'un
                  litige vous opposant à L'Amour Inconnu.
                </p>
                <p>
                  Pour toute question concernant les présentes CGU, vous pouvez nous contacter à
                  l'adresse : contact@lamourinconnu.fr
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

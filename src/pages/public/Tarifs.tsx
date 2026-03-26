import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Check,
  X,
  Shield,
  Clock,
  MessageCircle,
  Sparkles,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ROUTES } from '../../lib/constants';
import { usePlatformSettings } from '../../hooks/usePlatformSettings';
import { useState } from 'react';

export function Tarifs() {
  const { paymentEnabled, loading } = usePlatformSettings();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handlePaymentClick = () => {
    if (paymentEnabled) {
      const stripePaymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK;
      if (stripePaymentLink) {
        window.open(stripePaymentLink, '_blank');
      } else {
        // Stripe payment link not configured
      }
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Pourquoi payer alors que Tinder est gratuit ?",
      answer: "Sur Tinder, tu paies avec ton temps. Des heures de swipe, des conversations qui ne mènent nulle part. Ici, tu paies pour un service concret : des rendez-vous organisés, des matchs de qualité basés sur la compatibilité, pas sur l'apparence."
    },
    {
      question: "C'est quoi la garantie 'satisfait ou mois offert' ?",
      answer: "Si tu n'as eu aucun rendez-vous confirmé dans le mois malgré ton abonnement actif et un profil complet, le mois suivant est gratuit. On croit vraiment en notre service."
    },
    {
      question: "Je peux annuler quand je veux ?",
      answer: "Oui, sans engagement. Tu annules en un clic dans tes paramètres. Aucune justification à donner, aucun frais caché."
    },
    {
      question: "Comment je suis facturé ?",
      answer: "Par prélèvement automatique mensuel via Stripe, leader mondial du paiement sécurisé. Tous les moyens de paiement sont acceptés (CB, Apple Pay, Google Pay...)."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Tarifs | L'Amour Inconnu</title>
        <meta name="description" content="Découvre nos tarifs transparents. Membre gratuit ou Pass Inconnu à 14€/mois. Sans engagement, garantie satisfait ou remboursé." />
        <meta property="og:title" content="Tarifs | L'Amour Inconnu" />
        <meta property="og:description" content="Nos tarifs transparents pour des rencontres réelles" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="experimental" className="mb-6">
            💎 TARIFS TRANSPARENTS
          </Badge>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Nos <span className="text-accent">tarifs</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Un seul prix, pas de mauvaise surprise.{' '}
            <span className="text-accent font-semibold">
              Et si ça ne marche pas, ton mois est offert.
            </span>
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <Card className="p-8 border-2 border-gray-700">
              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Membre Gratuit
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold text-white">0€</span>
                  <span className="text-gray-400">/mois</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Pour découvrir la plateforme
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="text-accent" size={16} />
                  </div>
                  <span className="text-gray-300">
                    <strong className="text-white">Création de profil complète</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="text-accent" size={16} />
                  </div>
                  <span className="text-gray-300">
                    <strong className="text-white">Suggestions de matchs</strong> (limitées)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="text-accent" size={16} />
                  </div>
                  <span className="text-gray-300">
                    Voir les <strong className="text-white">scores de compatibilité</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="text-gray-500" size={16} />
                  </div>
                  <span className="text-gray-500 line-through">
                    Rendez-vous organisés
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="text-gray-500" size={16} />
                  </div>
                  <span className="text-gray-500 line-through">
                    Matchs prioritaires
                  </span>
                </li>
              </ul>

              <Link to={ROUTES.REGISTER} className="block">
                <Button variant="outline" size="lg" className="w-full">
                  S'inscrire gratuitement
                </Button>
              </Link>
            </Card>

            <Card
              variant="gradient"
              className="p-8 border-2 border-gold relative overflow-hidden"
              style={{
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/20 to-transparent rounded-bl-full"></div>

              <div className="flex justify-center mb-4">
                <Badge variant="gold" className="text-sm px-4 py-1">
                  ⭐ RECOMMANDÉ
                </Badge>
              </div>

              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Pass Inconnu
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold text-accent">14€</span>
                  <span className="text-gray-300">/mois</span>
                </div>
                <p className="text-gray-300 text-sm">
                  L'expérience complète
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="text-white" size={16} />
                  </div>
                  <span className="text-gray-300">
                    <strong className="text-white">Tout le gratuit</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="text-white" size={16} />
                  </div>
                  <span className="text-gray-300">
                    <strong className="text-white">2 rendez-vous organisés / mois</strong> garantis
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="text-white" size={16} />
                  </div>
                  <span className="text-gray-300">
                    <strong className="text-white">Matchs prioritaires</strong> dans l'algorithme
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="text-white" size={16} />
                  </div>
                  <span className="text-gray-300">
                    <strong className="text-white">Historique complet</strong> des RDV
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="text-white" size={16} />
                  </div>
                  <span className="text-gray-300">
                    <strong className="text-white">Support prioritaire</strong>
                  </span>
                </li>
              </ul>

              <div className="bg-gradient-to-r from-accent/20 to-gold/20 p-4 rounded-lg mb-6 border border-accent/30">
                <div className="flex items-start gap-3">
                  <Shield className="text-accent flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">
                      Garantie satisfait ou remboursé
                    </p>
                    <p className="text-xs text-gray-300">
                      Aucun RDV confirmé ? Ton mois suivant est offert
                    </p>
                  </div>
                </div>
              </div>

              {loading ? (
                <Button variant="accent" size="lg" className="w-full" disabled>
                  Chargement...
                </Button>
              ) : paymentEnabled ? (
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full"
                  onClick={handlePaymentClick}
                >
                  Je prends mon Pass Inconnu
                </Button>
              ) : (
                <div>
                  <Button variant="accent" size="lg" className="w-full" disabled>
                    🚧 Paiement bientôt disponible
                  </Button>
                  <p className="text-center text-sm text-gray-400 mt-3">
                    Inscris-toi gratuitement et on te préviendra dès l'ouverture
                  </p>
                  <Link to={ROUTES.REGISTER} className="block mt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      S'inscrire gratuitement
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 flex items-center justify-center gap-2">
              <Clock size={16} />
              Sans engagement. Résilie à tout moment.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <HelpCircle className="mx-auto mb-4 text-accent" size={48} />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Questions sur les <span className="text-accent">tarifs</span>
              </h2>
              <p className="text-gray-400">
                Tout ce que tu dois savoir avant de choisir
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:border-accent/50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2 flex items-start gap-3">
                        <span className="text-accent mt-1">Q:</span>
                        <span>{faq.question}</span>
                      </h3>
                      {openFaq === index && (
                        <div className="ml-8 mt-3 text-gray-300 leading-relaxed">
                          <span className="text-accent font-semibold">R:</span> {faq.answer}
                        </div>
                      )}
                    </div>
                    <ChevronDown
                      className={`text-accent flex-shrink-0 transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                      size={20}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-accent/20 via-secondary to-primary p-8 md:p-12 rounded-2xl border border-accent/30 text-center">
              <Sparkles className="mx-auto mb-6 text-accent" size={56} />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Prêt à rencontrer quelqu'un de compatible ?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Commence gratuitement, upgrade quand tu veux
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={ROUTES.REGISTER}>
                  <Button variant="accent" size="lg">
                    Créer mon profil gratuit
                  </Button>
                </Link>
                <Link to={ROUTES.COMMENT_CA_MARCHE}>
                  <Button variant="outline" size="lg">
                    Comment ça marche ?
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <MessageCircle className="mx-auto mb-4 text-accent" size={40} />
            <h3 className="font-semibold text-xl text-white mb-3">
              Une question ?
            </h3>
            <p className="text-gray-400 mb-6">
              Notre équipe est là pour t'aider
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@lamourinconnu.com"
                className="text-accent hover:text-accent/80 transition-colors font-semibold"
              >
                contact@lamourinconnu.com
              </a>
              <span className="text-gray-600 hidden sm:block">•</span>
              <Link
                to={ROUTES.COMMENT_CA_MARCHE}
                className="text-accent hover:text-accent/80 transition-colors font-semibold"
              >
                Voir la FAQ complète
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Heart,
  Smartphone,
  MessageSquareOff,
  Frown,
  Sparkles,
  Target,
  Coffee,
  Clock,
  CheckCircle2,
  Users,
  Shield,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ROUTES } from '../../lib/constants';
import { usePlatformSettings } from '../../hooks/usePlatformSettings';

export function Home() {
  const { paymentEnabled, loading } = usePlatformSettings();
  const [activeTab, setActiveTab] = useState<'busy' | 'serious' | 'shy'>('busy');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Comment fonctionne le matching ?",
      answer: "Notre algorithme analyse tes réponses sur tes valeurs, ton style de vie, tes centres d'intérêt et ce que tu recherches. Il crée ensuite un profil de compatibilité et te propose des célibataires avec un score élevé dans ta zone géographique."
    },
    {
      question: "Est-ce que je dois mettre une photo ?",
      answer: "Non, les photos ne sont pas obligatoires au début. L'idée est de se concentrer d'abord sur la compatibilité des valeurs. Tu pourras choisir de partager des photos plus tard si tu le souhaites."
    },
    {
      question: "Où se passent les rendez-vous ?",
      answer: "Nous proposons des lieux publics dans ta ville : cafés, parcs, musées, etc. Tu choisis parmi les propositions et confirmes le créneau qui te convient. La sécurité est notre priorité."
    },
    {
      question: "Que se passe-t-il si le rendez-vous ne se passe pas bien ?",
      answer: "Aucun problème ! Tu peux nous faire un retour après chaque rendez-vous. Cela nous aide à affiner l'algorithme. Tu n'es jamais obligé de revoir quelqu'un."
    },
    {
      question: "Combien de temps avant le premier rendez-vous ?",
      answer: "Généralement entre 3 et 7 jours après ton inscription, le temps de trouver des matchs compatibles et de coordonner les agendas. Avec le Pass Inconnu, tu es prioritaire."
    },
    {
      question: "Puis-je annuler mon abonnement à tout moment ?",
      answer: "Oui, tu peux annuler ton Pass Inconnu à tout moment depuis tes paramètres. Aucun engagement, aucune question posée."
    }
  ];

  return (
    <>
      <Helmet>
        <title>L'Amour Inconnu - Rencontres réelles sans swipe</title>
        <meta name="description" content="Des rendez-vous organisés pour toi avec des célibataires compatibles. Fini le swipe, place aux vraies rencontres." />
        <meta property="og:title" content="L'Amour Inconnu - Rencontres réelles sans swipe" />
        <meta property="og:description" content="Des rendez-vous organisés pour toi avec des célibataires compatibles." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lamourinconnu.fr" />
      </Helmet>

      <div className="min-h-screen">
        <section
          id="hero"
          className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary"
        >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="experimental" className="mb-6">
              🧪 PROJET EXPÉRIMENTAL
            </Badge>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              L'Amour Inconnu – Des rendez-vous réels organisés pour toi,{' '}
              <span className="text-accent">sans swipe</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Oublie les conversations sans fin. Ici, on t'organise directement des rendez-vous
              avec des célibataires compatibles dans ta ville.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('how-it-works')}
                className="w-full sm:w-auto"
              >
                Découvrir le concept
              </Button>
              <Link to={ROUTES.REGISTER}>
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  Créer mon profil gratuitement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="problem-solution" className="container mx-auto px-4 py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Pourquoi les apps de rencontre ne marchent pas ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card variant="gradient" className="text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <Smartphone className="text-red-400" size={32} />
              </div>
              <h3 className="font-semibold text-xl text-white mb-3">Swipe à l'infini</h3>
              <p className="text-gray-400">
                Tu passes des heures à swiper sans jamais rencontrer personne
              </p>
            </div>
          </Card>

          <Card variant="gradient" className="text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <MessageSquareOff className="text-red-400" size={32} />
              </div>
              <h3 className="font-semibold text-xl text-white mb-3">Conversations mortes</h3>
              <p className="text-gray-400">
                80% des conversations ne mènent jamais à un rendez-vous
              </p>
            </div>
          </Card>

          <Card variant="gradient" className="text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <Frown className="text-red-400" size={32} />
              </div>
              <h3 className="font-semibold text-xl text-white mb-3">Jugement sur la photo</h3>
              <p className="text-gray-400">
                On te juge sur 3 photos, pas sur qui tu es vraiment
              </p>
            </div>
          </Card>
        </div>

        <div className="flex justify-center mb-16">
          <div className="text-accent">
            <ChevronDown size={48} className="animate-bounce" />
          </div>
        </div>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-white mb-12">
          L'Amour Inconnu, <span className="text-accent">c'est différent</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
              <Target className="text-accent" size={32} />
            </div>
            <h3 className="font-semibold text-xl text-white mb-3">Match sur tes valeurs</h3>
            <p className="text-gray-400">
              On te matche sur tes valeurs et ton style de vie, pas sur ton apparence
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
              <Coffee className="text-accent" size={32} />
            </div>
            <h3 className="font-semibold text-xl text-white mb-3">RDV organisés</h3>
            <p className="text-gray-400">
              On t'organise directement des RDV dans des lieux publics de ta ville
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="text-accent" size={32} />
            </div>
            <h3 className="font-semibold text-xl text-white mb-3">Rencontre en vrai</h3>
            <p className="text-gray-400">
              Tu découvres l'autre en vrai, pas en pixels sur un écran
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Un processus simple en 3 étapes pour passer du profil au rendez-vous réel
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6 relative">
                  <span className="text-3xl">📝</span>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                </div>
                <h3 className="font-semibold text-2xl text-white mb-4">Crée ton profil</h3>
                <p className="text-gray-400 leading-relaxed">
                  Réponds à quelques questions sur tes valeurs, ton style de vie et ce que tu recherches.
                  Pas de photo obligatoire au début.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6 relative">
                  <span className="text-3xl">💫</span>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-primary font-bold">
                    2
                  </div>
                </div>
                <h3 className="font-semibold text-2xl text-white mb-4">On trouve tes matchs</h3>
                <p className="text-gray-400 leading-relaxed">
                  Notre algorithme identifie les célibataires compatibles dans ta zone.
                  Tu reçois des profils mystère avec un score de compatibilité.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6 relative">
                  <span className="text-3xl">☕</span>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-primary font-bold">
                    3
                  </div>
                </div>
                <h3 className="font-semibold text-2xl text-white mb-4">Rendez-vous organisé</h3>
                <p className="text-gray-400 leading-relaxed">
                  Quand vous vous acceptez mutuellement, on vous propose des créneaux et des lieux.
                  Vous vous rencontrez en vrai !
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="container mx-auto px-4 py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Pour qui est L'Amour Inconnu ?
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Notre approche convient à différents profils de célibataires
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8 border-b border-accent/20">
            <button
              onClick={() => setActiveTab('busy')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === 'busy'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Clock className="inline mr-2" size={20} />
              Les célibataires pressés
            </button>
            <button
              onClick={() => setActiveTab('serious')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === 'serious'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Heart className="inline mr-2" size={20} />
              Ceux qui veulent du sérieux
            </button>
            <button
              onClick={() => setActiveTab('shy')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === 'shy'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Shield className="inline mr-2" size={20} />
              Les timides du numérique
            </button>
          </div>

          <Card variant="gradient" className="p-8">
            {activeTab === 'busy' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4">Tu n'as pas de temps à perdre</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">Pas de temps à perdre en conversations qui ne mènent nulle part</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">Tu veux des résultats concrets et rapides</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">Tu préfères le vrai contact aux échanges virtuels</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">On s'occupe de l'organisation, tu n'as qu'à te présenter</span>
                  </li>
                </ul>
              </div>
            )}
            {activeTab === 'serious' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4">Tu cherches une vraie relation</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">Les valeurs et la compatibilité comptent plus que l'apparence</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">Tu veux être matché sur l'essentiel : vie, projets, vision</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">Tu en as marre des relations superficielles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">Tu cherches quelqu'un qui te ressemble vraiment</span>
                  </li>
                </ul>
              </div>
            )}
            {activeTab === 'shy' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4">Les apps te mettent mal à l'aise</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">Tu es meilleur·e en vrai qu'en textos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">Tu veux être guidé·e dans le processus</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">Le jugement sur photo te stresse</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">On organise tout pour toi, dans un cadre sécurisé</span>
                  </li>
                </ul>
              </div>
            )}
          </Card>
        </div>
      </section>

      <section id="pricing" className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Un seul tarif, <span className="text-accent">transparent</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Pas de formule complexe, un abonnement simple et sans engagement
          </p>

          <div className="max-w-md mx-auto">
            <Card variant="gradient" className="p-8 border-2 border-accent/30 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="gold">POPULAIRE</Badge>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pass Inconnu</h3>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-5xl font-bold text-accent">14€</span>
                  <span className="text-gray-400">/ mois</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-300">2 rendez-vous organisés par mois minimum</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-300">Matchs prioritaires</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-300">Historique complet de tes rendez-vous</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-300">Support dédié par email</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-300">Annulation à tout moment</span>
                </li>
              </ul>

              <div className="text-center mb-6">
                <Badge variant="success" className="text-sm">
                  ✓ Satisfait ou mois offert
                </Badge>
              </div>

              {loading ? (
                <Button variant="accent" size="lg" className="w-full" disabled>
                  Chargement...
                </Button>
              ) : paymentEnabled ? (
                <Link to={ROUTES.PRICING}>
                  <Button variant="accent" size="lg" className="w-full">
                    Je prends mon Pass
                  </Button>
                </Link>
              ) : (
                <div className="text-center">
                  <Button variant="ghost" size="lg" className="w-full" disabled>
                    Bientôt disponible
                  </Button>
                  <p className="text-sm text-gray-400 mt-4">
                    Le paiement n'est pas encore activé. Inscris-toi pour être informé du lancement !
                  </p>
                </div>
              )}

              <p className="text-sm text-center text-gray-400 mt-4">
                Tu peux tester gratuitement avec un compte membre
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="container mx-auto px-4 py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Questions fréquentes
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Tout ce que tu dois savoir sur L'Amour Inconnu
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} variant="gradient" className="overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-accent/5 transition-colors"
              >
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                {openFAQ === index ? (
                  <ChevronUp className="text-accent flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-accent flex-shrink-0" size={20} />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-4 text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      <section id="cta-final" className="bg-gradient-to-br from-accent/20 via-secondary to-primary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Users className="mx-auto mb-6 text-accent" size={64} />
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              Prêt à rencontrer quelqu'un{' '}
              <span className="text-accent">pour de vrai</span> ?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Rejoins les célibataires qui ont choisi l'authenticité plutôt que les filtres
            </p>
            <Link to={ROUTES.REGISTER}>
              <Button variant="accent" size="lg" className="text-lg px-8 py-6">
                Créer mon profil gratuitement
              </Button>
            </Link>
            <p className="text-sm text-gray-400 mt-4">
              Inscription en 2 minutes • Sans engagement • Données sécurisées
            </p>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

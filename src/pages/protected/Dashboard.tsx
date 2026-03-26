import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDashboardData } from '../../hooks/useDashboardData';
import { supabase } from '../../lib/supabase';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Heart,
  Calendar,
  Star,
  User,
  TrendingUp,
  MapPin,
  Clock,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  X,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { ROUTES } from '../../lib/constants';

export function Dashboard() {
  const { user, userRole } = useAuth();
  const { loading, stats, recentMatches, upcomingDates, profile, paymentEnabled, refresh } = useDashboardData();
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const calculateAge = (birthdate: string | null): number | null => {
    if (!birthdate) return null;
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement de ton dashboard...</p>
        </div>
      </div>
    );
  }

  const firstName = profile?.first_name || profile?.email?.split('@')[0] || 'toi';
  const isSubscriber = userRole === 'subscriber';
  const isProfileIncomplete = stats.profileCompletion < 100;

  const handleAcceptMatch = async (matchId: string) => {
    if (!user || actionLoading) return;
    setActionLoading(matchId);
    try {
      await supabase
        .from('matches')
        .update({ status: 'accepted', matched_at: new Date().toISOString() })
        .eq('id', matchId);
      await refresh();
    } catch (_err) {
      // silently handled
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeclineMatch = async (matchId: string) => {
    if (!user || actionLoading) return;
    setActionLoading(matchId);
    try {
      await supabase
        .from('matches')
        .update({ status: 'declined' })
        .eq('id', matchId);
      await refresh();
    } catch (_err) {
      // silently handled
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                Bonjour {firstName} 👋
              </h1>
              <div className="flex items-center gap-2">
                {isSubscriber ? (
                  <Badge variant="gold" className="flex items-center gap-1">
                    <Sparkles size={14} />
                    Pass Inconnu actif
                  </Badge>
                ) : (
                  <Badge variant="secondary">Membre gratuit</Badge>
                )}
              </div>
            </div>
          </div>

          {isProfileIncomplete && (
            <Card className="mt-6 p-4 bg-accent/10 border-accent/30">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-accent flex-shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                  <p className="text-white font-semibold mb-1">
                    Complète ton profil pour recevoir des matchs
                  </p>
                  <p className="text-gray-400 text-sm mb-3">
                    Ton profil est complété à {stats.profileCompletion}%. Plus ton profil est détaillé,
                    meilleurs seront tes matchs !
                  </p>
                  <Link to={ROUTES.PROFILE}>
                    <Button variant="accent" size="sm">
                      Compléter mon profil
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-xl hover:shadow-accent/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Heart className="text-accent" size={24} />
              </div>
              <TrendingUp className="text-accent" size={20} />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stats.pendingMatchesCount}</p>
            <p className="text-sm text-gray-400 mb-3">Matchs en attente</p>
            <Link to={ROUTES.MATCHES}>
              <Button variant="secondary" size="sm" className="w-full">
                Voir mes matchs
              </Button>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-xl hover:shadow-accent/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Calendar className="text-accent" size={24} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">
              {stats.currentMonthDates} / {stats.dateQuota}
            </p>
            <p className="text-sm text-gray-400 mb-3">RDV ce mois</p>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-accent rounded-full h-2 transition-all"
                style={{
                  width: `${Math.min((stats.currentMonthDates / stats.dateQuota) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-xl hover:shadow-accent/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Star className="text-accent" size={24} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stats.averageCompatibility}%</p>
            <p className="text-sm text-gray-400 mb-3">Score moyen</p>
            <p className="text-xs text-gray-500">Compatibilité des matchs</p>
          </Card>

          <Card className="p-6 hover:shadow-xl hover:shadow-accent/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <User className="text-accent" size={24} />
              </div>
              {stats.profileCompletion === 100 && (
                <CheckCircle2 className="text-green-500" size={20} />
              )}
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stats.profileCompletion}%</p>
            <p className="text-sm text-gray-400 mb-3">Profil complété</p>
            {stats.profileCompletion < 100 && (
              <Link to={ROUTES.PROFILE}>
                <Button variant="secondary" size="sm" className="w-full">
                  Compléter
                </Button>
              </Link>
            )}
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Tes matchs du jour</h2>
                <Link
                  to={ROUTES.MATCHES}
                  className="text-accent hover:text-accent/80 transition-colors text-sm font-semibold flex items-center gap-1"
                >
                  Voir tous mes matchs
                  <ArrowRight size={16} />
                </Link>
              </div>

              {recentMatches.length === 0 ? (
                <Card className="p-8 text-center">
                  <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg mb-2">
                    Pas de nouveau match aujourd'hui
                  </p>
                  <p className="text-gray-500 text-sm">
                    Reviens demain pour découvrir de nouveaux profils !
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {recentMatches.map((match) => {
                    const age = calculateAge(match.birthdate);
                    return (
                      <Card key={match.id} className="p-6 hover:border-accent/30 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                              <Badge variant="accent" className="flex items-center gap-1">
                                <Star size={14} />
                                {match.compatibility_score}% compatibles
                              </Badge>
                              {age && (
                                <span className="text-gray-400 text-sm">{age} ans</span>
                              )}
                              {match.city && (
                                <span className="text-gray-400 text-sm flex items-center gap-1">
                                  <MapPin size={14} />
                                  {match.city}
                                </span>
                              )}
                            </div>

                            {match.lifestyle_tags.length > 0 && (
                              <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-2">Points communs :</p>
                                <div className="flex flex-wrap gap-2">
                                  {match.lifestyle_tags.slice(0, 4).map((tag, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="accent"
                              size="sm"
                              onClick={() => handleAcceptMatch(match.id)}
                              disabled={actionLoading === match.id}
                            >
                              {actionLoading === match.id ? (
                                <Loader2 size={16} className="mr-1 animate-spin" />
                              ) : (
                                <Heart size={16} className="mr-1" />
                              )}
                              Accepter
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleDeclineMatch(match.id)}
                              disabled={actionLoading === match.id}
                              aria-label="Décliner ce match"
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Tes prochains rendez-vous
              </h2>

              {upcomingDates.length === 0 ? (
                <Card className="p-6">
                  <Calendar className="w-12 h-12 text-gray-600 mb-4" />
                  <p className="text-gray-400 mb-2">
                    Tu n'as pas encore de rendez-vous programmé
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Accepte des matchs pour organiser un RDV
                  </p>
                  <Link to={ROUTES.MATCHES}>
                    <Button variant="accent" size="sm" className="w-full">
                      Découvrir des profils
                    </Button>
                  </Link>
                </Card>
              ) : (
                <div className="space-y-4">
                  {upcomingDates.map((date) => (
                    <Card key={date.id} className="p-6 bg-gradient-to-br from-accent/10 to-secondary border-accent/30">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="accent">
                          {date.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Clock className="text-accent flex-shrink-0 mt-0.5" size={18} />
                          <div>
                            <p className="text-sm text-gray-400">Date et heure</p>
                            <p className="text-white font-semibold capitalize">
                              {formatDate(date.scheduled_at)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin className="text-accent flex-shrink-0 mt-0.5" size={18} />
                          <div>
                            <p className="text-sm text-gray-400">Lieu</p>
                            <p className="text-white font-semibold">{date.location_name}</p>
                            <p className="text-sm text-gray-500">{date.location_address}</p>
                          </div>
                        </div>
                      </div>

                      <Link to={ROUTES.DATES}>
                        <Button variant="secondary" size="sm" className="w-full mt-4">
                          Voir les détails
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </Link>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {!isSubscriber && paymentEnabled && (
              <Card className="p-6 bg-gradient-to-br from-gold/10 via-secondary to-primary border-gold/30">
                <Sparkles className="w-12 h-12 text-gold mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Passe au Pass Inconnu
                </h3>
                <p className="text-gray-300 mb-4 text-sm">
                  2 RDV garantis par mois pour seulement 14€
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 size={16} className="text-gold" />
                    Accès illimité aux matchs
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 size={16} className="text-gold" />
                    Minimum 2 rendez-vous/mois
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 size={16} className="text-gold" />
                    Profils prioritaires
                  </li>
                </ul>
                <Link to={ROUTES.PRICING}>
                  <Button variant="accent" className="w-full">
                    Découvrir le Pass
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

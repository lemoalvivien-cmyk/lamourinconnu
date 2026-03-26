import { useState } from 'react';
import {
  Users,
  AlertTriangle,
  Settings,
  TrendingUp,
  Activity,
  CreditCard,
  Gem,
  Calendar,
  Heart,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ROUTES } from '../../lib/constants';
import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import { cn } from '../../lib/utils';
import { supabase } from '../../lib/supabase';

export function AdminDashboard() {
  const {
    loading,
    stats,
    dailySignups,
    monthlyStats,
    recentActivity,
    paymentEnabled,
    togglePayment,
  } = useAdminDashboard();

  const [toggling, setToggling] = useState(false);
  const [runningMatching, setRunningMatching] = useState(false);
  const [matchingResult, setMatchingResult] = useState<{
    profilesProcessed: number;
    matchesCreated: number;
  } | null>(null);

  const handleTogglePayment = async () => {
    if (
      !confirm(
        `Es-tu sûr de vouloir ${paymentEnabled ? 'désactiver' : 'activer'} les paiements ?`
      )
    ) {
      return;
    }

    setToggling(true);
    try {
      await togglePayment(!paymentEnabled);
    } catch (error) {
      alert('Erreur lors de la mise à jour des paramètres de paiement');
    } finally {
      setToggling(false);
    }
  };

  const handleRunMatching = async () => {
    if (!confirm('Lancer l\'algorithme de matching maintenant ?')) {
      return;
    }

    setRunningMatching(true);
    setMatchingResult(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('Session non trouvée');
      }

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/daily-matching`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setMatchingResult({
          profilesProcessed: result.profilesProcessed || 0,
          matchesCreated: result.matchesCreated || 0,
        });
        alert(
          `Matching terminé !\n\n` +
          `Profils traités : ${result.profilesProcessed || 0}\n` +
          `Matchs créés : ${result.matchesCreated || 0}`
        );
      } else {
        throw new Error(result.error || 'Erreur inconnue');
      }
    } catch (error) {
      alert(`Erreur lors du lancement du matching :\n${error}`);
    } finally {
      setRunningMatching(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'signup':
        return <Users className="text-green-400" size={16} />;
      case 'match':
        return <Heart className="text-accent" size={16} />;
      case 'date':
        return <Calendar className="text-blue-400" size={16} />;
      case 'report':
        return <AlertTriangle className="text-red-400" size={16} />;
      default:
        return <Activity className="text-gray-400" size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={40} />
      </div>
    );
  }

  const maxSignups = Math.max(...dailySignups.map((d) => d.count), 1);
  const maxMonthlyValue = Math.max(
    ...monthlyStats.map((s) => Math.max(s.matches, s.dates)),
    1
  );

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
            Administration
          </h1>
          <p className="text-gray-400">Vue d'ensemble de la plateforme</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-secondary/80 to-secondary/50 border-2 border-secondary">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Users className="text-accent" size={24} />
              </div>
              {stats.totalUsersGrowth > 0 && (
                <div className="flex items-center gap-1 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                  <TrendingUp size={12} />
                  +{stats.totalUsersGrowth}%
                </div>
              )}
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalUsers}</div>
            <p className="text-sm text-gray-400">Utilisateurs total</p>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/80 to-secondary/50 border-2 border-secondary">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <Activity className="text-green-400" size={24} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.activeUsers}</div>
            <p className="text-sm text-gray-400">Membres actifs (7j)</p>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/80 to-secondary/50 border-2 border-secondary">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                <Gem className="text-gold" size={24} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.subscribers}</div>
            <p className="text-sm text-gray-400">
              Abonnés Pass Inconnu
              <span className="block text-xs text-gold mt-1">MRR: {stats.mrr}€</span>
            </p>
          </Card>

          <Card
            className={cn(
              'bg-gradient-to-br from-secondary/80 to-secondary/50 border-2',
              stats.pendingReports > 5 ? 'border-red-500/50' : 'border-secondary'
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center',
                  stats.pendingReports > 5 ? 'bg-red-500/20' : 'bg-orange-500/20'
                )}
              >
                <AlertTriangle
                  className={stats.pendingReports > 5 ? 'text-red-400' : 'text-orange-400'}
                  size={24}
                />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats.pendingReports}
            </div>
            <p className="text-sm text-gray-400">Signalements en attente</p>
            {stats.pendingReports > 5 && (
              <p className="text-xs text-red-400 mt-2">⚠️ Action requise</p>
            )}
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-secondary/50 border-2 border-secondary">
            <h3 className="text-lg font-bold text-white mb-4">
              Inscriptions (7 derniers jours)
            </h3>
            <div className="flex items-end justify-between h-48 gap-2">
              {dailySignups.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full h-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-accent to-accent/50 rounded-t transition-all hover:from-accent/80"
                      style={{ height: `${(day.count / maxSignups) * 100}%` }}
                      title={`${day.count} inscriptions`}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{formatDate(day.date)}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-secondary/50 border-2 border-secondary">
            <h3 className="text-lg font-bold text-white mb-4">
              Matchs vs RDV (30 derniers jours)
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-4 h-4 bg-accent rounded" />
                <span className="text-gray-300">Matchs créés</span>
                <span className="ml-auto text-white font-semibold">{stats.successfulMatches}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-4 h-4 bg-blue-400 rounded" />
                <span className="text-gray-300">RDV confirmés</span>
                <span className="ml-auto text-white font-semibold">{stats.totalDates}</span>
              </div>
              <div className="h-32 flex items-end gap-1 mt-6">
                {monthlyStats.slice(-14).map((stat, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full space-y-0.5">
                      <div
                        className="w-full bg-accent rounded-t"
                        style={{
                          height: `${(stat.matches / maxMonthlyValue) * 60 + 4}px`,
                        }}
                        title={`${stat.matches} matchs`}
                      />
                      <div
                        className="w-full bg-blue-400 rounded-t"
                        style={{
                          height: `${(stat.dates / maxMonthlyValue) * 60 + 4}px`,
                        }}
                        title={`${stat.dates} RDV`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="bg-secondary/50 border-2 border-secondary">
              <h3 className="text-lg font-bold text-white mb-4">Activité récente</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentActivity.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-8">
                    Aucune activité récente
                  </p>
                ) : (
                  recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 bg-primary/30 rounded-lg hover:bg-primary/50 transition-colors"
                    >
                      <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTimestamp(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          <div>
            <Card className="bg-gradient-to-br from-gold/10 to-secondary/50 border-2 border-gold/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                  <CreditCard className="text-gold" size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Activation du paiement</h3>
              </div>

              <div className="border-t border-gold/20 pt-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-300">Statut actuel</span>
                  <button
                    onClick={handleTogglePayment}
                    disabled={toggling}
                    className={cn(
                      'relative inline-flex h-8 w-14 items-center rounded-full transition-colors',
                      paymentEnabled ? 'bg-green-500' : 'bg-gray-600',
                      toggling && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <span
                      className={cn(
                        'inline-block h-6 w-6 transform rounded-full bg-white transition-transform',
                        paymentEnabled ? 'translate-x-7' : 'translate-x-1'
                      )}
                    />
                  </button>
                </div>

                <div
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium text-center mb-4',
                    paymentEnabled
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-600/20 text-gray-400'
                  )}
                >
                  {paymentEnabled ? 'ACTIVÉ' : 'DÉSACTIVÉ'}
                </div>
              </div>

              <div className="border-t border-gold/20 pt-4">
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 mb-3">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    ⚠️ Quand activé, les utilisateurs pourront s'abonner au Pass Inconnu via le
                    lien Stripe.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-green-400">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full" />
                  Lien Stripe configuré
                </div>
              </div>
            </Card>

            <div className="mt-6 space-y-3">
              <Button
                onClick={handleRunMatching}
                disabled={runningMatching}
                variant="primary"
                className="w-full justify-start bg-gradient-to-r from-accent to-accent/80"
              >
                {runningMatching ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Matching en cours...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} className="mr-2" />
                    Lancer le matching
                  </>
                )}
              </Button>

              {matchingResult && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-xs text-green-400 font-medium mb-1">
                    Dernier matching réussi
                  </p>
                  <p className="text-xs text-gray-400">
                    {matchingResult.profilesProcessed} profils • {matchingResult.matchesCreated} matchs
                  </p>
                </div>
              )}

              <Link to={ROUTES.ADMIN_USERS}>
                <Button variant="secondary" className="w-full justify-start">
                  <Users size={18} className="mr-2" />
                  Gérer les utilisateurs
                </Button>
              </Link>

              <Link to={ROUTES.ADMIN_REPORTS}>
                <Button variant="secondary" className="w-full justify-start">
                  <AlertTriangle size={18} className="mr-2" />
                  Voir les signalements
                </Button>
              </Link>

              <Link to={ROUTES.ADMIN_SETTINGS}>
                <Button variant="secondary" className="w-full justify-start">
                  <Settings size={18} className="mr-2" />
                  Paramètres
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { usePlatformSettings, PlatformSettings } from '../../hooks/usePlatformSettings';
import {
  CreditCard,
  Settings,
  Mail,
  FileText,
  AlertTriangle,
  Eye,
  EyeOff,
  ExternalLink,
  CheckCircle,
  XCircle,
  Loader2,
  Save,
} from 'lucide-react';

export function AdminSettings() {
  const { settings, loading, saving, saveAllSettings } = usePlatformSettings();
  const [localSettings, setLocalSettings] = useState<PlatformSettings>(settings);
  const [showStripeLink, setShowStripeLink] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  useEffect(() => {
    const isDifferent = JSON.stringify(localSettings) !== JSON.stringify(settings);
    setHasChanges(isDifferent);
  }, [localSettings, settings]);

  const handleChange = (key: keyof PlatformSettings, value: any) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    const success = await saveAllSettings(localSettings);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      alert('Erreur lors de la sauvegarde des paramètres');
    }
  };

  const handleTestStripeLink = () => {
    if (localSettings.stripe_payment_link) {
      window.open(localSettings.stripe_payment_link, '_blank');
    }
  };

  const handleResetMatches = async () => {
    if (
      !confirm(
        'ATTENTION : Cette action va supprimer TOUS les matchs et rendez-vous.\n\nÊtes-vous absolument sûr ?'
      )
    ) {
      return;
    }

    if (
      !confirm(
        'DERNIÈRE CONFIRMATION : Cette action est IRRÉVERSIBLE.\n\nTaper "SUPPRIMER" pour confirmer'
      )
    ) {
      return;
    }

    alert('Fonctionnalité disponible prochainement');
  };

  const handleExportDatabase = async () => {
    if (!confirm('Exporter toute la base de données ?')) {
      return;
    }

    alert('Fonctionnalité disponible prochainement');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={40} />
      </div>
    );
  }

  const isStripeLinkValid = localSettings.stripe_payment_link.includes('buy.stripe.com');

  return (
    <div className="min-h-screen container mx-auto px-4 py-8 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
            Paramètres de la plateforme
          </h1>
          <p className="text-gray-400 text-sm">
            Configuration globale de L'Amour Inconnu
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-gold" size={24} />
              <h2 className="font-display text-xl font-semibold text-white">
                Configuration du paiement
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Paiement activé</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Afficher le bouton d'abonnement dans la navigation
                  </p>
                </div>
                <button
                  onClick={() => handleChange('payment_enabled', !localSettings.payment_enabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.payment_enabled ? 'bg-accent' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.payment_enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Lien Stripe Payment Link
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type={showStripeLink ? 'text' : 'password'}
                      value={localSettings.stripe_payment_link}
                      onChange={(e) => handleChange('stripe_payment_link', e.target.value)}
                      placeholder="https://buy.stripe.com/..."
                      className="pr-10"
                    />
                    <button
                      onClick={() => setShowStripeLink(!showStripeLink)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showStripeLink ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <Button
                    onClick={handleTestStripeLink}
                    variant="secondary"
                    disabled={!localSettings.stripe_payment_link}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Tester
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {isStripeLinkValid ? (
                    <>
                      <CheckCircle size={14} className="text-green-400" />
                      <span className="text-xs text-green-400">Lien valide</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={14} className="text-red-400" />
                      <span className="text-xs text-red-400">Lien non configuré</span>
                    </>
                  )}
                  <span className="text-xs text-gray-400 ml-2">Prix configuré : 14€/mois</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Le lien Stripe Payment Link doit être créé dans votre dashboard Stripe et collé ici.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Settings className="text-gold" size={24} />
              <h2 className="font-display text-xl font-semibold text-white">
                Quotas et limites
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  RDV par mois (abonnés)
                </label>
                <Input
                  type="number"
                  min="1"
                  value={localSettings.quota_rdv_monthly}
                  onChange={(e) => handleChange('quota_rdv_monthly', parseInt(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Matchs suggérés par jour
                </label>
                <Input
                  type="number"
                  min="1"
                  value={localSettings.quota_matches_daily}
                  onChange={(e) => handleChange('quota_matches_daily', parseInt(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Distance max (km)
                </label>
                <Input
                  type="number"
                  min="1"
                  value={localSettings.max_distance_km}
                  onChange={(e) => handleChange('max_distance_km', parseInt(e.target.value))}
                />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Mail className="text-gold" size={24} />
              <h2 className="font-display text-xl font-semibold text-white">
                Configuration des emails
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'email_welcome', label: 'Email de bienvenue' },
                  { key: 'email_match_proposed', label: 'Nouveau match proposé' },
                  { key: 'email_match_confirmed', label: 'Match mutuel confirmé' },
                  { key: 'email_date_proposed', label: 'Proposition de RDV reçue' },
                  { key: 'email_date_confirmed', label: 'RDV confirmé' },
                  { key: 'email_date_reminder', label: 'Rappel RDV J-1' },
                  { key: 'email_feedback_request', label: 'Demande de feedback' },
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                  >
                    <span className="text-sm text-white">{label}</span>
                    <button
                      onClick={() =>
                        handleChange(
                          key as keyof PlatformSettings,
                          !localSettings[key as keyof PlatformSettings]
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        localSettings[key as keyof PlatformSettings]
                          ? 'bg-accent'
                          : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          localSettings[key as keyof PlatformSettings]
                            ? 'translate-x-6'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-secondary">
                <label className="block text-sm font-medium text-white mb-2">
                  Email expéditeur
                </label>
                <Input
                  type="email"
                  value={localSettings.email_sender}
                  onChange={(e) => handleChange('email_sender', e.target.value)}
                  placeholder="contact@lamourinconnu.fr"
                />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-gold" size={24} />
              <h2 className="font-display text-xl font-semibold text-white">
                Textes et messages
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Message d'accueil dashboard
                </label>
                <textarea
                  value={localSettings.dashboard_welcome_message}
                  onChange={(e) => handleChange('dashboard_welcome_message', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 bg-secondary border border-secondary rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Message si aucun match
                </label>
                <textarea
                  value={localSettings.no_match_message}
                  onChange={(e) => handleChange('no_match_message', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 bg-secondary border border-secondary rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Message de confirmation RDV
                </label>
                <textarea
                  value={localSettings.date_confirmation_message}
                  onChange={(e) => handleChange('date_confirmation_message', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 bg-secondary border border-secondary rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <p className="text-xs text-gray-400">
                Ces textes peuvent être modifiés sans toucher au code.
              </p>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-orange-400" size={24} />
              <h2 className="font-display text-xl font-semibold text-white">Mode maintenance</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Mode maintenance</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Seuls les admins peuvent accéder au site
                  </p>
                </div>
                <button
                  onClick={() => handleChange('maintenance_mode', !localSettings.maintenance_mode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.maintenance_mode ? 'bg-orange-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.maintenance_mode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Message de maintenance
                </label>
                <textarea
                  value={localSettings.maintenance_message}
                  onChange={(e) => handleChange('maintenance_message', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-secondary border border-secondary rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent resize-none"
                />
              </div>
            </div>
          </Card>

          <Card className="border-red-500/30">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-red-400" size={24} />
              <h2 className="font-display text-xl font-semibold text-red-400">
                Actions dangereuses
              </h2>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleResetMatches}
                variant="secondary"
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30"
              >
                Réinitialiser tous les matchs
              </Button>

              <Button
                onClick={handleExportDatabase}
                variant="secondary"
                className="w-full"
              >
                Exporter toute la base de données
              </Button>

              <p className="text-xs text-gray-400">
                ⚠️ Ces actions nécessitent une double confirmation
              </p>
            </div>
          </Card>
        </div>
      </div>

      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-secondary/95 backdrop-blur-sm border-t border-secondary p-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              {saveSuccess ? (
                <>
                  <CheckCircle className="text-green-400" size={20} />
                  <span className="text-green-400 font-medium">Paramètres sauvegardés ✓</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="text-orange-400" size={20} />
                  <span className="text-white">Vous avez des modifications non sauvegardées</span>
                </>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setLocalSettings(settings)}
                variant="secondary"
                disabled={saving}
              >
                Annuler
              </Button>
              <Button
                onClick={handleSave}
                variant="primary"
                disabled={saving}
                className="flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Sauvegarder les modifications
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

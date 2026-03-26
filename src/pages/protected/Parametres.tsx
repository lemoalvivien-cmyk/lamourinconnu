import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Bell,
  Shield,
  Flag,
  CreditCard,
  Download,
  Trash2,
  Settings as SettingsIcon,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useSettings } from '../../hooks/useSettings';
import { usePlatformSettings } from '../../hooks/usePlatformSettings';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ChangeEmailModal } from '../../components/modals/ChangeEmailModal';
import { ChangePasswordModal } from '../../components/modals/ChangePasswordModal';
import { DeleteAccountModal } from '../../components/modals/DeleteAccountModal';
import { ReportModal } from '../../components/modals/ReportModal';

export function Parametres() {
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const { settings, loading, updateProfileVisibility, updateNotificationPreference, downloadUserData } =
    useSettings();
  const { settings: platformSettings } = usePlatformSettings();

  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [updatingVisibility, setUpdatingVisibility] = useState(false);

  const isSubscriber = userRole === 'subscriber';

  const handleToggleVisibility = async () => {
    setUpdatingVisibility(true);
    try {
      await updateProfileVisibility(!settings.profile_invisible);
    } catch {
      // Error is propagated by the hook
    } finally {
      setUpdatingVisibility(false);
    }
  };

  const handleToggleNotification = async (key: string, value: boolean) => {
    try {
      await updateNotificationPreference(key as any, value);
    } catch {
      // Error is propagated by the hook
    }
  };

  const handleDownloadData = async () => {
    try {
      await downloadUserData();
    } catch {
      alert('Une erreur est survenue lors du téléchargement');
    }
  };

  const handleDeleteSuccess = () => {
    navigate('/');
  };

  const handleManageSubscription = () => {
    if (platformSettings?.stripe_portal_url) {
      window.open(platformSettings.stripe_portal_url, '_blank');
    }
  };

  const handleUpgradeSubscription = () => {
    if (platformSettings?.payment_enabled && platformSettings?.stripe_payment_link) {
      window.open(platformSettings.stripe_payment_link, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-12 flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="text-accent" size={32} />
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Paramètres</h1>
            <p className="text-gray-400">Gère ton compte et tes préférences</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Mail className="text-accent" size={24} />
              <h2 className="text-2xl font-bold text-white">Mon compte</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-4 border border-secondary">
                <label className="text-sm text-gray-400 block mb-1">Email</label>
                <p className="text-white font-medium">{user?.email}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowChangeEmail(true)}
                  className="flex items-center gap-2"
                >
                  <Mail size={16} />
                  Changer mon email
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowChangePassword(true)}
                  className="flex items-center gap-2"
                >
                  <Lock size={16} />
                  Changer mon mot de passe
                </Button>
              </div>

              <div className="border-t border-secondary pt-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteAccount(true)}
                  className="text-red-400 border-red-400/30 hover:bg-red-500/10 flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Supprimer mon compte
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-gold" size={24} />
              <h2 className="text-2xl font-bold text-white">Mon abonnement</h2>
            </div>

            {isSubscriber ? (
              <div className="space-y-4">
                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="text-gold" size={20} />
                    <h3 className="text-xl font-bold text-white">Pass Inconnu actif</h3>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Tu as accès à toutes les fonctionnalités premium
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="gold">Quota RDV : 2/mois</Badge>
                    <Badge variant="experimental">Priorité matchmaking</Badge>
                  </div>
                </div>

                {platformSettings?.stripe_portal_url && (
                  <Button
                    variant="secondary"
                    onClick={handleManageSubscription}
                    className="w-full"
                  >
                    Gérer mon abonnement
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-secondary/50 rounded-lg p-4 border border-secondary">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Tu es actuellement Membre Gratuit
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Passe au Pass Inconnu pour débloquer toutes les fonctionnalités
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="text-gold flex-shrink-0" size={16} />
                      <span>2 rendez-vous par mois</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="text-gold flex-shrink-0" size={16} />
                      <span>Priorité dans le matchmaking</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="text-gold flex-shrink-0" size={16} />
                      <span>Support prioritaire</span>
                    </li>
                  </ul>
                </div>

                {platformSettings?.payment_enabled && platformSettings?.stripe_payment_link && (
                  <Button
                    variant="accent"
                    onClick={handleUpgradeSubscription}
                    className="w-full"
                  >
                    Passer au Pass Inconnu - 14€/mois
                  </Button>
                )}
              </div>
            )}
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Bell className="text-accent" size={24} />
              <h2 className="text-2xl font-bold text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              <NotificationToggle
                label="Nouveau match proposé"
                description="Reçois un email quand un nouveau match te correspond"
                checked={settings.notifications.email_new_match}
                onChange={(value) => handleToggleNotification('email_new_match', value)}
              />

              <NotificationToggle
                label="Match accepté mutuellement"
                description="Reçois un email quand un match est mutuel"
                checked={settings.notifications.email_match_accepted}
                onChange={(value) => handleToggleNotification('email_match_accepted', value)}
              />

              <NotificationToggle
                label="Proposition de RDV reçue"
                description="Reçois un email quand quelqu'un te propose un rendez-vous"
                checked={settings.notifications.email_date_proposal}
                onChange={(value) => handleToggleNotification('email_date_proposal', value)}
              />

              <NotificationToggle
                label="Rappel RDV J-1"
                description="Reçois un rappel la veille de ton rendez-vous"
                checked={settings.notifications.email_date_reminder}
                onChange={(value) => handleToggleNotification('email_date_reminder', value)}
              />

              <NotificationToggle
                label="Demande de feedback après RDV"
                description="Reçois un email pour partager ton ressenti après un rendez-vous"
                checked={settings.notifications.email_feedback_request}
                onChange={(value) => handleToggleNotification('email_feedback_request', value)}
              />

              <div className="bg-accent/5 border border-accent/20 rounded-lg p-3 mt-4">
                <p className="text-xs text-gray-400">
                  Les notifications importantes (sécurité, facturation) ne peuvent pas être
                  désactivées.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-accent" size={24} />
              <h2 className="text-2xl font-bold text-white">Confidentialité</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-4 border border-secondary">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {settings.profile_invisible ? (
                        <EyeOff className="text-yellow-400" size={18} />
                      ) : (
                        <Eye className="text-green-400" size={18} />
                      )}
                      <h3 className="font-semibold text-white">Profil invisible</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      {settings.profile_invisible
                        ? 'Ton profil est actuellement masqué des propositions de match'
                        : 'Ton profil est visible dans les propositions de match'}
                    </p>
                  </div>
                  <button
                    onClick={handleToggleVisibility}
                    disabled={updatingVisibility}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.profile_invisible ? 'bg-accent' : 'bg-gray-600'
                    } ${updatingVisibility ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.profile_invisible ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={handleDownloadData}
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Télécharger mes données (RGPD)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteAccount(true)}
                  className="text-red-400 border-red-400/30 hover:bg-red-500/10 flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Supprimer mes données
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Flag className="text-red-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Signaler un problème</h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-400">
                Tu as rencontré un comportement inapproprié ou un problème avec un autre membre ?
              </p>
              <Button
                variant="outline"
                onClick={() => setShowReport(true)}
                className="flex items-center gap-2"
              >
                <Flag size={16} />
                Faire un signalement
              </Button>
              <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                <p className="text-xs text-gray-400">
                  Les signalements sont traités avec la plus grande confidentialité. Ils nous
                  aident à maintenir une communauté saine et respectueuse.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <ChangeEmailModal
        isOpen={showChangeEmail}
        onClose={() => setShowChangeEmail(false)}
        currentEmail={user?.email || ''}
      />

      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />

      <DeleteAccountModal
        isOpen={showDeleteAccount}
        onClose={() => setShowDeleteAccount(false)}
        onSuccess={handleDeleteSuccess}
      />

      <ReportModal isOpen={showReport} onClose={() => setShowReport(false)} />
    </div>
  );
}

interface NotificationToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

function NotificationToggle({ label, description, checked, onChange }: NotificationToggleProps) {
  return (
    <div className="bg-secondary/50 rounded-lg p-4 border border-secondary">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-1">{label}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <button
          onClick={() => onChange(!checked)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            checked ? 'bg-accent' : 'bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              checked ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}

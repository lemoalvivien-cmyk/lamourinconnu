import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AdminUser } from '../../hooks/useAdminUsers';
import { AlertTriangle, Ban } from 'lucide-react';

interface UserSuspensionModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null;
  onSuspend: (userId: string, reason: string, duration?: number) => Promise<void>;
}

export function UserSuspensionModal({
  isOpen,
  onClose,
  user,
  onSuspend,
}: UserSuspensionModalProps) {
  const [durationType, setDurationType] = useState<'temporary' | 'permanent'>('temporary');
  const [duration, setDuration] = useState<string>('7');
  const [reasonType, setReasonType] = useState<string>('inappropriate');
  const [reasonDetails, setReasonDetails] = useState<string>('');
  const [suspending, setSuspending] = useState(false);

  if (!user) return null;

  const handleSuspend = async () => {
    if (!reasonDetails.trim()) {
      alert('Veuillez fournir des détails sur la raison de la suspension');
      return;
    }

    const fullReason = `[${getReasonTypeLabel(reasonType)}] ${reasonDetails}`;

    const confirmMessage =
      durationType === 'permanent'
        ? `Es-tu sûr de vouloir BANNIR DÉFINITIVEMENT ${user.email} ?\n\nL'utilisateur ne pourra plus jamais se reconnecter.`
        : `Es-tu sûr de vouloir suspendre ${user.email} pour ${duration} jours ?\n\nL'utilisateur ne pourra pas se connecter pendant cette période.`;

    if (!confirm(confirmMessage)) {
      return;
    }

    setSuspending(true);
    try {
      const durationDays = durationType === 'permanent' ? undefined : parseInt(duration);
      await onSuspend(user.id, fullReason, durationDays);
      onClose();
      alert(
        durationType === 'permanent'
          ? 'Utilisateur banni définitivement'
          : `Utilisateur suspendu pour ${duration} jours`
      );
    } catch (error) {
      alert('Erreur lors de la suspension de l\'utilisateur');
    } finally {
      setSuspending(false);
    }
  };

  const getReasonTypeLabel = (type: string) => {
    switch (type) {
      case 'inappropriate':
        return 'Comportement inapproprié';
      case 'spam':
        return 'Spam';
      case 'fake':
        return 'Faux profil';
      case 'other':
        return 'Autre';
      default:
        return type;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Suspendre / Bannir l'utilisateur">
      <div className="space-y-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <Ban className="text-red-400 flex-shrink-0" size={20} />
          <div>
            <p className="text-sm text-red-400 font-medium mb-1">Action critique</p>
            <p className="text-xs text-gray-400">
              Cette action empêchera l'utilisateur de se connecter et son profil ne sera plus
              visible dans les matchs. Un email de notification lui sera envoyé.
            </p>
          </div>
        </div>

        <div className="bg-secondary/30 rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-1">Utilisateur</p>
          <p className="text-white font-medium">{user.email}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-3">Type de sanction</label>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
              <input
                type="radio"
                name="durationType"
                value="temporary"
                checked={durationType === 'temporary'}
                onChange={(e) => setDurationType(e.target.value as 'temporary')}
                className="mt-1"
              />
              <div className="flex-1">
                <p className="text-white font-medium">Suspension temporaire</p>
                <p className="text-xs text-gray-400 mt-1">
                  L'utilisateur pourra se reconnecter après la période de suspension
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
              <input
                type="radio"
                name="durationType"
                value="permanent"
                checked={durationType === 'permanent'}
                onChange={(e) => setDurationType(e.target.value as 'permanent')}
                className="mt-1"
              />
              <div className="flex-1">
                <p className="text-white font-medium flex items-center gap-2">
                  Bannissement définitif
                  <span className="text-xs text-red-400 bg-red-500/20 px-2 py-0.5 rounded">
                    Irréversible
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  L'utilisateur ne pourra plus jamais se reconnecter
                </p>
              </div>
            </label>
          </div>
        </div>

        {durationType === 'temporary' && (
          <div>
            <label className="block text-sm font-medium text-white mb-2">Durée</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2 bg-secondary border border-secondary rounded-lg text-white focus:outline-none focus:border-accent"
            >
              <option value="7">7 jours</option>
              <option value="30">30 jours</option>
              <option value="90">90 jours</option>
              <option value="365">1 an</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Raison <span className="text-red-400">*</span>
          </label>
          <select
            value={reasonType}
            onChange={(e) => setReasonType(e.target.value)}
            className="w-full px-4 py-2 bg-secondary border border-secondary rounded-lg text-white focus:outline-none focus:border-accent mb-3"
          >
            <option value="inappropriate">Comportement inapproprié</option>
            <option value="spam">Spam</option>
            <option value="fake">Faux profil</option>
            <option value="other">Autre</option>
          </select>

          <textarea
            value={reasonDetails}
            onChange={(e) => setReasonDetails(e.target.value)}
            placeholder="Détails de la raison (obligatoire)"
            rows={4}
            className="w-full px-4 py-3 bg-secondary border border-secondary rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent resize-none"
          />
          <p className="text-xs text-gray-400 mt-2">
            Ces informations seront enregistrées et envoyées à l'utilisateur
          </p>
        </div>

        {durationType === 'permanent' && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="text-red-400 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-red-400 font-medium mb-1">
                Attention : Bannissement définitif
              </p>
              <p className="text-xs text-gray-400">
                Cette action est irréversible. L'utilisateur sera définitivement exclu de la
                plateforme et ne pourra jamais se réinscrire avec cet email.
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-secondary">
          <Button
            onClick={onClose}
            variant="secondary"
            className="flex-1"
            disabled={suspending}
          >
            Annuler
          </Button>
          <Button
            onClick={handleSuspend}
            variant="accent"
            className="flex-1 bg-red-600 hover:bg-red-700"
            disabled={suspending || !reasonDetails.trim()}
          >
            {suspending
              ? 'En cours...'
              : durationType === 'permanent'
              ? 'Bannir définitivement'
              : 'Suspendre'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

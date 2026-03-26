import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { supabase } from '../../lib/supabase';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteAccountModal({ isOpen, onClose, onSuccess }: DeleteAccountModalProps) {
  const [confirmation, setConfirmation] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (confirmation !== 'SUPPRIMER') {
      setError('Merci de taper "SUPPRIMER" pour confirmer');
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('Utilisateur non trouvé');

      if (reason) {
        await supabase.from('account_deletions').insert({
          user_id: user.id,
          reason: reason,
        });
      }

      await supabase.from('profiles').update({ deleted_at: new Date().toISOString() }).eq('id', user.id);

      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;

      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setConfirmation('');
      setReason('');
      setError('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
            <AlertTriangle className="text-red-500" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Supprimer mon compte</h2>
            <p className="text-sm text-red-400">Cette action est irréversible</p>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
          <h3 className="text-white font-semibold mb-2">Attention</h3>
          <ul className="text-sm text-red-300 space-y-1 list-disc list-inside">
            <li>Ton profil sera définitivement supprimé</li>
            <li>Tous tes matchs seront annulés</li>
            <li>Tes rendez-vous seront annulés</li>
            <li>Ton abonnement sera résilié</li>
            <li>Tes données seront anonymisées (RGPD)</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Pourquoi nous quittes-tu ? (optionnel)
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border-2 border-secondary rounded-lg text-white focus:border-accent focus:outline-none transition-colors"
              disabled={loading}
            >
              <option value="">Sélectionne une raison</option>
              <option value="found_love">J'ai trouvé l'amour</option>
              <option value="no_matches">Pas assez de matchs</option>
              <option value="bad_experience">Mauvaise expérience</option>
              <option value="too_expensive">Trop cher</option>
              <option value="pause">Je fais une pause</option>
              <option value="other">Autre raison</option>
            </select>
          </div>

          <Input
            type="text"
            label='Tape "SUPPRIMER" pour confirmer'
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value.toUpperCase())}
            placeholder="SUPPRIMER"
            required
            disabled={loading}
          />

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={handleClose}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              disabled={loading}
            >
              {loading ? 'Suppression...' : 'Supprimer définitivement'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

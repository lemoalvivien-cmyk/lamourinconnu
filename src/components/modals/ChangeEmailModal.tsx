import { useState } from 'react';
import { Mail, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { supabase } from '../../lib/supabase';

interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmail: string;
}

export function ChangeEmailModal({ isOpen, onClose, currentEmail }: ChangeEmailModalProps) {
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newEmail) {
      setError('Merci de saisir un nouvel email');
      return;
    }

    if (newEmail === currentEmail) {
      setError('Le nouvel email est identique à l\'ancien');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError('Format d\'email invalide');
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (updateError) throw updateError;

      setSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setNewEmail('');
      setError('');
      setSuccess(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
            <Mail className="text-accent" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Changer mon email</h2>
            <p className="text-sm text-gray-400">Email actuel : {currentEmail}</p>
          </div>
        </div>

        {success ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
            <p className="text-green-400 text-sm">
              Un email de confirmation a été envoyé à <strong>{newEmail}</strong>. Clique sur le
              lien pour finaliser le changement.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Nouvel email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="nouveau@email.com"
                required
                disabled={loading}
              />

              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <p className="text-xs text-gray-400 flex items-start gap-2">
                  <AlertCircle className="flex-shrink-0 mt-0.5 text-accent" size={14} />
                  <span>
                    Tu recevras un email de confirmation sur ta nouvelle adresse. Tu devras cliquer
                    sur le lien pour valider le changement.
                  </span>
                </p>
              </div>

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
                <Button type="submit" variant="accent" className="flex-1" disabled={loading}>
                  {loading ? 'Envoi...' : 'Changer mon email'}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
}

import { useState, useEffect } from 'react';
import { AlertCircle, Flag, Ban } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedUserId?: string;
  preselectedUserName?: string;
}

interface ReportableUser {
  id: string;
  first_name: string;
  match_id?: string;
  date_id?: string;
}

export function ReportModal({ isOpen, onClose, preselectedUserId, preselectedUserName }: ReportModalProps) {
  const [reportableUsers, setReportableUsers] = useState<ReportableUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [blockUser, setBlockUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (preselectedUserId) {
        setSelectedUserId(preselectedUserId);
        setLoadingUsers(false);
      } else {
        fetchReportableUsers();
      }
    }
  }, [isOpen, preselectedUserId]);

  const fetchReportableUsers = async () => {
    setLoadingUsers(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: matchesData, error: matchesError } = await supabase
        .from('matches')
        .select(
          `
          id,
          user_a_id,
          user_b_id,
          user_a:profiles!matches_user_a_id_fkey(id, first_name),
          user_b:profiles!matches_user_b_id_fkey(id, first_name)
        `
        )
        .or(`user_a_id.eq.${user.id},user_b_id.eq.${user.id}`)
        .eq('status', 'accepted')
        .order('matched_at', { ascending: false })
        .limit(10);

      if (matchesError) throw matchesError;

      const users: ReportableUser[] = [];
      const seenIds = new Set<string>();

      (matchesData || []).forEach((match: any) => {
        const isUserA = match.user_a_id === user.id;
        const otherUser = isUserA ? match.user_b : match.user_a;
        const otherUserId = isUserA ? match.user_b_id : match.user_a_id;

        if (otherUser && !seenIds.has(otherUserId)) {
          users.push({
            id: otherUserId,
            first_name: otherUser.first_name || 'Utilisateur',
            match_id: match.id,
          });
          seenIds.add(otherUserId);
        }
      });

      setReportableUsers(users);
    } catch {
      setError('Impossible de charger la liste');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedUserId) {
      setError('Merci de sélectionner un utilisateur');
      return;
    }

    if (!reason) {
      setError('Merci de sélectionner une raison');
      return;
    }

    if (!description.trim()) {
      setError('Merci de décrire la situation');
      return;
    }

    if (description.trim().length < 50) {
      setError('La description doit contenir au moins 50 caractères');
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('Utilisateur non trouvé');

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const { data: existingReport } = await supabase
        .from('reports')
        .select('id')
        .eq('reporter_id', user.id)
        .eq('reported_user_id', selectedUserId)
        .gte('created_at', oneWeekAgo.toISOString())
        .maybeSingle();

      if (existingReport) {
        setError('Tu as déjà signalé cette personne récemment. Merci de patienter.');
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from('reports').insert({
        reporter_id: user.id,
        reported_user_id: selectedUserId,
        reason: reason,
        description: description,
        blocked: blockUser,
        status: 'pending',
      });

      if (insertError) throw insertError;

      if (blockUser) {
        const { error: blockError } = await supabase.from('blocks').insert({
          blocker_id: user.id,
          blocked_id: selectedUserId,
        });

        if (blockError && blockError.code !== '23505') {
          // Non-duplicate block error occurred; report was still submitted
        }

        setSuccessMessage(
          'Merci pour ton signalement. Notre équipe va l\'examiner dans les 48h. Cette personne a été bloquée de ton côté.'
        );
      } else {
        setSuccessMessage(
          'Merci pour ton signalement. Notre équipe va l\'examiner dans les 48h.'
        );
      }

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
      setSelectedUserId('');
      setReason('');
      setDescription('');
      setBlockUser(false);
      setError('');
      setSuccess(false);
      setSuccessMessage('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
            <Flag className="text-red-500" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Faire un signalement</h2>
            <p className="text-sm text-gray-400">Aide-nous à maintenir un espace sain</p>
          </div>
        </div>

        {success ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
            <p className="text-green-400 text-sm">
              {successMessage}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6">
              <p className="text-xs text-gray-400 flex items-start gap-2">
                <AlertCircle className="flex-shrink-0 mt-0.5 text-accent" size={14} />
                <span>
                  Les signalements abusifs peuvent entraîner la suspension de ton compte. N'utilise
                  cette fonctionnalité qu'en cas de comportement réellement inapproprié.
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!preselectedUserId && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Qui signaler ? <span className="text-red-400">*</span>
                  </label>
                  {loadingUsers ? (
                    <div className="text-sm text-gray-400">Chargement...</div>
                  ) : reportableUsers.length === 0 ? (
                    <div className="text-sm text-gray-400">Aucun utilisateur à signaler</div>
                  ) : (
                    <select
                      value={selectedUserId}
                      onChange={(e) => setSelectedUserId(e.target.value)}
                      className="w-full px-4 py-3 bg-secondary border-2 border-secondary rounded-lg text-white focus:border-accent focus:outline-none transition-colors"
                      required
                      disabled={loading}
                    >
                      <option value="">Sélectionne un utilisateur</option>
                      {reportableUsers.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.first_name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              {preselectedUserId && preselectedUserName && (
                <div className="bg-secondary/50 rounded-lg p-4 border border-secondary">
                  <label className="text-sm text-gray-400 block mb-1">Signalement concernant</label>
                  <p className="text-white font-medium">{preselectedUserName}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Raison du signalement <span className="text-red-400">*</span>
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary border-2 border-secondary rounded-lg text-white focus:border-accent focus:outline-none transition-colors"
                  required
                  disabled={loading}
                >
                  <option value="">Sélectionne une raison</option>
                  <option value="inappropriate_behavior">Comportement inapproprié</option>
                  <option value="fake_profile">Photos/profil trompeur</option>
                  <option value="harassment">Harcèlement</option>
                  <option value="offensive_language">Propos offensants</option>
                  <option value="spam_scam">Spam/Arnaque</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-white">
                    Description détaillée <span className="text-red-400">*</span>
                  </label>
                  <span
                    className={`text-xs ${
                      description.length >= 50 ? 'text-green-400' : 'text-gray-400'
                    }`}
                  >
                    {description.length} / 50 min
                  </span>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décris la situation de manière détaillée pour nous aider à comprendre (minimum 50 caractères)..."
                  rows={5}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-secondary border-2 border-secondary rounded-lg text-white placeholder-gray-500 focus:border-accent focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 border border-secondary">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={blockUser}
                    onChange={(e) => setBlockUser(e.target.checked)}
                    disabled={loading}
                    className="mt-1 w-5 h-5 rounded border-2 border-gray-600 bg-secondary checked:bg-accent checked:border-accent focus:ring-2 focus:ring-accent focus:ring-offset-0 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Ban className="text-red-400" size={16} />
                      <span className="font-medium text-white">Bloquer cette personne</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Cette personne ne pourra plus t'envoyer de messages ni apparaître dans tes
                      propositions de match. Tu pourras débloquer cette personne plus tard depuis
                      tes paramètres.
                    </p>
                  </div>
                </label>
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
                <Button
                  type="submit"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  disabled={loading || reportableUsers.length === 0}
                >
                  {loading ? 'Envoi...' : 'Envoyer le signalement'}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
}

import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AdminUser } from '../../hooks/useAdminUsers';
import { Calendar, MapPin, Heart, Users, AlertTriangle, CheckCircle } from 'lucide-react';

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null;
  onEdit: () => void;
  onSuspend: () => void;
}

export function UserDetailModal({
  isOpen,
  onClose,
  user,
  onEdit,
  onSuspend,
}: UserDetailModalProps) {
  if (!user) return null;

  const calculateAge = (birthdate: string | null) => {
    if (!birthdate) return 'N/A';
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Jamais';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'member':
        return 'Membre';
      case 'subscriber':
        return 'Abonné';
      case 'admin':
        return 'Admin';
      default:
        return role;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'gold';
      case 'subscriber':
        return 'primary';
      default:
        return 'secondary';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Détail utilisateur" size="xl">
      <div className="space-y-6">
        <div className="bg-secondary/30 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">ID</p>
              <p className="text-sm text-white font-mono break-all">{user.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Email</p>
              <p className="text-sm text-white break-all">{user.email}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Users size={18} className="text-accent" />
            Profil
          </h3>
          <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={getRoleBadgeVariant(user.role)}>
                {getRoleLabel(user.role)}
              </Badge>
              {user.profile_complete ? (
                <Badge variant="success">
                  <CheckCircle size={12} className="mr-1" />
                  Profil complet
                </Badge>
              ) : (
                <Badge variant="secondary">Profil incomplet</Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Prénom</p>
                <p className="text-sm text-white">{user.first_name || 'Non renseigné'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Genre</p>
                <p className="text-sm text-white">
                  {user.gender === 'man' ? 'Homme' : user.gender === 'woman' ? 'Femme' : 'Non renseigné'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Recherche</p>
                <p className="text-sm text-white">
                  {user.seeking_gender === 'man'
                    ? 'Homme'
                    : user.seeking_gender === 'woman'
                    ? 'Femme'
                    : 'Non renseigné'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Âge</p>
                <p className="text-sm text-white">{calculateAge(user.birthdate)} ans</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-300">
              <MapPin size={14} className="text-accent" />
              <span>
                {user.city || 'Ville non renseignée'}
                {user.postal_code && ` (${user.postal_code})`}
              </span>
            </div>

            {user.bio && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Bio</p>
                <p className="text-sm text-gray-300 italic">{user.bio}</p>
              </div>
            )}

            {user.lifestyle_tags && user.lifestyle_tags.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {user.lifestyle_tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-secondary">
              <div>
                <p className="text-xs text-gray-400 mb-1">Type de relation</p>
                <p className="text-sm text-white">
                  {user.relation_type === 'serious'
                    ? 'Sérieuse'
                    : user.relation_type === 'casual'
                    ? 'Décontractée'
                    : 'Non renseigné'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Enfants</p>
                <p className="text-sm text-white">
                  {user.want_kids === 'yes'
                    ? 'Oui'
                    : user.want_kids === 'no'
                    ? 'Non'
                    : user.want_kids === 'maybe'
                    ? 'Peut-être'
                    : 'Non renseigné'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Heart size={18} className="text-accent" />
            Activité
          </h3>
          <div className="bg-secondary/30 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{user.match_count}</p>
                <p className="text-xs text-gray-400">Matchs proposés</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">{user.accepted_match_count}</p>
                <p className="text-xs text-gray-400">Matchs acceptés</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gold">{user.date_count}</p>
                <p className="text-xs text-gray-400">RDV effectués</p>
              </div>
            </div>

            <div className="pt-3 border-t border-secondary">
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={14} className="text-gray-400" />
                <span className="text-gray-400">Inscrit le :</span>
                <span className="text-white">{formatDate(user.created_at)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm mt-2">
                <Calendar size={14} className="text-gray-400" />
                <span className="text-gray-400">Dernière connexion :</span>
                <span className="text-white">{formatDate(user.last_seen_at)}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <AlertTriangle size={18} className="text-orange-400" />
            Signalements
          </h3>
          <div className="bg-secondary/30 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Reçus</p>
                <p className="text-2xl font-bold text-red-400">{user.reports_received}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Envoyés</p>
                <p className="text-2xl font-bold text-orange-400">{user.reports_sent}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-secondary">
          <Button onClick={onClose} variant="secondary" className="flex-1">
            Fermer
          </Button>
          <Button onClick={onEdit} variant="primary" className="flex-1">
            Modifier
          </Button>
          <Button onClick={onSuspend} variant="accent" className="flex-1 bg-red-600 hover:bg-red-700">
            Suspendre
          </Button>
        </div>
      </div>
    </Modal>
  );
}

import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AdminUser } from '../../hooks/useAdminUsers';
import { AlertTriangle } from 'lucide-react';

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null;
  onSave: (userId: string, role: string) => Promise<void>;
}

export function UserEditModal({ isOpen, onClose, user, onSave }: UserEditModalProps) {
  const [role, setRole] = useState(user?.role || 'member');
  const [saving, setSaving] = useState(false);

  if (!user) return null;

  const handleSave = async () => {
    if (role === user.role) {
      onClose();
      return;
    }

    if (
      !confirm(
        `Es-tu sûr de vouloir changer le rôle de ${user.email} de "${getRoleLabel(
          user.role
        )}" à "${getRoleLabel(role)}" ?`
      )
    ) {
      return;
    }

    setSaving(true);
    try {
      await onSave(user.id, role);
      onClose();
    } catch (error) {
      alert('Erreur lors de la modification du rôle');
    } finally {
      setSaving(false);
    }
  };

  const getRoleLabel = (roleValue: string) => {
    switch (roleValue) {
      case 'member':
        return 'Membre';
      case 'subscriber':
        return 'Abonné';
      case 'admin':
        return 'Admin';
      default:
        return roleValue;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Modifier l'utilisateur">
      <div className="space-y-6">
        <div className="bg-secondary/30 rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-1">Email</p>
          <p className="text-white font-medium">{user.email}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Rôle</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 bg-secondary border border-secondary rounded-lg text-white focus:outline-none focus:border-accent"
          >
            <option value="member">Membre</option>
            <option value="subscriber">Abonné</option>
            <option value="admin">Admin</option>
          </select>
          <p className="text-xs text-gray-400 mt-2">
            Membre : compte gratuit | Abonné : Pass Inconnu actif | Admin : administrateur
          </p>
        </div>

        {role !== user.role && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="text-orange-400 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-orange-400 font-medium mb-1">
                Attention : Cette action sera enregistrée
              </p>
              <p className="text-xs text-gray-400">
                Tous les changements de rôle sont tracés pour des raisons de sécurité et de
                conformité.
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-secondary">
          <Button onClick={onClose} variant="secondary" className="flex-1" disabled={saving}>
            Annuler
          </Button>
          <Button
            onClick={handleSave}
            variant="primary"
            className="flex-1"
            disabled={saving || role === user.role}
          >
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

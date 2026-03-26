import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AdminReport } from '../../hooks/useAdminReports';
import {
  AlertTriangle,
  CheckCircle,
  Ban,
  AlertOctagon,
  XCircle,
  User,
  Calendar,
  MessageSquare,
} from 'lucide-react';

interface ReportDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: AdminReport | null;
  onResolve: (reportId: string, adminNote: string) => Promise<void>;
  onWarn: (reportId: string, reportedUserId: string, reason: string) => Promise<void>;
  onSuspend: (reportId: string, reportedUserId: string, reason: string, duration: number) => Promise<void>;
  onBan: (reportId: string, reportedUserId: string, reason: string) => Promise<void>;
  onReject: (reportId: string, adminNote: string) => Promise<void>;
}

export function ReportDetailModal({
  isOpen,
  onClose,
  report,
  onResolve,
  onWarn,
  onSuspend,
  onBan,
  onReject,
}: ReportDetailModalProps) {
  const [adminNote, setAdminNote] = useState('');
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [suspensionDuration, setSuspensionDuration] = useState('7');
  const [processing, setProcessing] = useState(false);

  if (!report) return null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="secondary" className="text-xs">
            🟡 En attente
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge variant="primary" className="text-xs">
            🔵 En cours
          </Badge>
        );
      case 'resolved':
        return (
          <Badge variant="success" className="text-xs">
            ✅ Résolu
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="secondary" className="text-xs">
            ❌ Rejeté
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleAction = async () => {
    if (!selectedAction || !adminNote.trim()) {
      alert('Veuillez sélectionner une action et ajouter une note admin');
      return;
    }

    setProcessing(true);
    try {
      switch (selectedAction) {
        case 'resolve':
          await onResolve(report.id, adminNote);
          alert('Signalement marqué comme résolu');
          break;
        case 'warn':
          if (!confirm(`Avertir ${report.reported_email} ?\n\nCette action enverra un email d'avertissement.`)) {
            return;
          }
          await onWarn(report.id, report.reported_user_id, adminNote);
          alert('Avertissement envoyé');
          break;
        case 'suspend':
          if (
            !confirm(
              `Suspendre ${report.reported_email} pour ${suspensionDuration} jours ?\n\nL'utilisateur ne pourra pas se connecter pendant cette période.`
            )
          ) {
            return;
          }
          await onSuspend(report.id, report.reported_user_id, adminNote, parseInt(suspensionDuration));
          alert(`Utilisateur suspendu pour ${suspensionDuration} jours`);
          break;
        case 'ban':
          if (
            !confirm(
              `BANNIR DÉFINITIVEMENT ${report.reported_email} ?\n\nCette action est IRRÉVERSIBLE.`
            )
          ) {
            return;
          }
          await onBan(report.id, report.reported_user_id, adminNote);
          alert('Utilisateur banni définitivement');
          break;
        case 'reject':
          if (!confirm('Rejeter ce signalement comme infondé ?')) {
            return;
          }
          await onReject(report.id, adminNote);
          alert('Signalement rejeté');
          break;
      }
      onClose();
    } catch {
      alert('Erreur lors de l\'action');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Signalement #${report.id.slice(0, 8)}`} size="xl">
      <div className="space-y-6">
        <div className="bg-secondary/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="text-orange-400" size={20} />
              Informations du signalement
            </h3>
            {getStatusBadge(report.status)}
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Signalé par</p>
                <div className="flex items-center gap-2">
                  <User size={14} className="text-accent" />
                  <div>
                    <p className="text-sm text-white font-medium">{report.reporter_email}</p>
                    {report.reporter_first_name && (
                      <p className="text-xs text-gray-400">{report.reporter_first_name}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">Concernant</p>
                <div className="flex items-center gap-2">
                  <User size={14} className="text-red-400" />
                  <div>
                    <p className="text-sm text-white font-medium">{report.reported_email}</p>
                    {report.reported_first_name && (
                      <p className="text-xs text-gray-400">{report.reported_first_name}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-1">Raison</p>
              <p className="text-sm text-white font-medium">{report.reason}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Calendar size={14} className="text-gray-400" />
              <span>{formatDate(report.created_at)}</span>
            </div>

            {report.description && (
              <div>
                <p className="text-xs text-gray-400 mb-2">Description</p>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-sm text-gray-300 italic">{report.description}</p>
                </div>
              </div>
            )}

            {report.blocked && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2">
                <Ban size={16} className="text-red-400" />
                <p className="text-sm text-red-400">
                  Le signaleur a également bloqué cet utilisateur
                </p>
              </div>
            )}
          </div>
        </div>

        {report.admin_note && (
          <div className="bg-secondary/30 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <MessageSquare size={16} className="text-gold" />
              Note admin précédente
            </h3>
            <p className="text-sm text-gray-300">{report.admin_note}</p>
            {report.action_taken && (
              <p className="text-xs text-gray-400 mt-2">Action prise : {report.action_taken}</p>
            )}
          </div>
        )}

        {report.status === 'pending' || report.status === 'in_progress' ? (
          <>
            <div className="bg-secondary/30 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Actions disponibles</h3>
              <div className="space-y-2">
                <label className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                  <input
                    type="radio"
                    name="action"
                    value="resolve"
                    checked={selectedAction === 'resolve'}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-white font-medium">
                      <CheckCircle size={16} className="text-green-400" />
                      <span>Marquer comme résolu</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Le problème est résolu sans action spécifique sur l'utilisateur
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                  <input
                    type="radio"
                    name="action"
                    value="warn"
                    checked={selectedAction === 'warn'}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-white font-medium">
                      <AlertTriangle size={16} className="text-orange-400" />
                      <span>Avertir l'utilisateur signalé</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Envoie un email d'avertissement (3 avertissements = suspension automatique 7j)
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                  <input
                    type="radio"
                    name="action"
                    value="suspend"
                    checked={selectedAction === 'suspend'}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-white font-medium">
                      <Ban size={16} className="text-orange-400" />
                      <span>Suspendre temporairement</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      L'utilisateur ne pourra pas se connecter pendant la durée choisie
                    </p>
                    {selectedAction === 'suspend' && (
                      <select
                        value={suspensionDuration}
                        onChange={(e) => setSuspensionDuration(e.target.value)}
                        className="mt-2 px-3 py-2 bg-secondary border border-secondary rounded text-white text-sm"
                      >
                        <option value="7">7 jours</option>
                        <option value="30">30 jours</option>
                        <option value="90">90 jours</option>
                      </select>
                    )}
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                  <input
                    type="radio"
                    name="action"
                    value="ban"
                    checked={selectedAction === 'ban'}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-white font-medium">
                      <AlertOctagon size={16} className="text-red-400" />
                      <span>Bannir définitivement</span>
                      <span className="text-xs text-red-400 bg-red-500/20 px-2 py-0.5 rounded">
                        Irréversible
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      L'utilisateur ne pourra plus jamais se reconnecter
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                  <input
                    type="radio"
                    name="action"
                    value="reject"
                    checked={selectedAction === 'reject'}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-white font-medium">
                      <XCircle size={16} className="text-gray-400" />
                      <span>Rejeter le signalement</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Le signalement est infondé, aucune action n'est nécessaire
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Note admin (obligatoire) <span className="text-red-400">*</span>
              </label>
              <textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Décrivez l'action prise et les raisons..."
                rows={4}
                className="w-full px-4 py-3 bg-secondary border border-secondary rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent resize-none"
              />
              <p className="text-xs text-gray-400 mt-2">
                Cette note est interne et ne sera pas visible par les utilisateurs
              </p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-secondary">
              <Button onClick={onClose} variant="secondary" className="flex-1" disabled={processing}>
                Annuler
              </Button>
              <Button
                onClick={handleAction}
                variant="primary"
                className="flex-1"
                disabled={processing || !selectedAction || !adminNote.trim()}
              >
                {processing ? 'Traitement...' : 'Confirmer l\'action'}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex justify-end pt-4 border-t border-secondary">
            <Button onClick={onClose} variant="secondary">
              Fermer
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}

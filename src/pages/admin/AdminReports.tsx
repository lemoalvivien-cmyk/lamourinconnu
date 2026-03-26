import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useAdminReports, AdminReport } from '../../hooks/useAdminReports';
import { ReportDetailModal } from '../../components/modals/ReportDetailModal';
import { AlertTriangle, Calendar, User, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminReports() {
  const {
    reports,
    loading,
    statusFilter,
    setStatusFilter,
    updateReportStatus,
    warnUser,
    suspendReportedUser,
    banReportedUser,
  } = useAdminReports();

  const [selectedReport, setSelectedReport] = useState<AdminReport | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const pendingCount = reports.filter((r) => r.status === 'pending').length;
  const resolvedThisMonth = reports.filter((r) => {
    if (r.status !== 'resolved' || !r.resolved_at) return false;
    const resolvedDate = new Date(r.resolved_at);
    const now = new Date();
    return (
      resolvedDate.getMonth() === now.getMonth() &&
      resolvedDate.getFullYear() === now.getFullYear()
    );
  }).length;

  const urgentReports = reports.filter(
    (r) => r.status === 'pending' && r.blocked
  ).length;

  const handleViewDetails = (report: AdminReport) => {
    setSelectedReport(report);
    setDetailModalOpen(true);
  };

  const handleResolve = async (reportId: string, adminNote: string) => {
    await updateReportStatus(reportId, 'resolved', adminNote, 'resolved');
  };

  const handleReject = async (reportId: string, adminNote: string) => {
    await updateReportStatus(reportId, 'rejected', adminNote, 'rejected');
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
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

  const tabs = [
    { value: 'pending', label: 'En attente', count: reports.filter((r) => r.status === 'pending').length },
    { value: 'in_progress', label: 'En cours', count: reports.filter((r) => r.status === 'in_progress').length },
    { value: 'resolved', label: 'Résolus', count: reports.filter((r) => r.status === 'resolved').length },
    { value: 'all', label: 'Tous', count: reports.length },
  ];

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
            Signalements
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-orange-400" />
              <span>{pendingCount} en attente</span>
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full" />
            <div className="flex items-center gap-2">
              <span>{resolvedThisMonth} résolus ce mois</span>
            </div>
          </div>
        </div>

        {urgentReports > 0 && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="text-orange-400 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-orange-400 font-medium">
                {urgentReports} signalement{urgentReports > 1 ? 's' : ''} urgent{urgentReports > 1 ? 's' : ''}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Ces utilisateurs ont également bloqué la personne signalée
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                statusFilter === tab.value
                  ? 'bg-accent text-white'
                  : 'bg-secondary text-gray-400 hover:bg-secondary/80'
              )}
            >
              {tab.label}
              <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <Card>
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-gold" size={40} />
            </div>
          </Card>
        ) : reports.length === 0 ? (
          <Card>
            <p className="text-gray-400 text-center py-12">
              Aucun signalement trouvé
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <Card key={report.id} className="hover:border-accent/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle className="text-orange-400" size={20} />
                      <h3 className="font-semibold text-white">
                        Signalement #{report.id.slice(0, 8)}
                      </h3>
                      {getStatusBadge(report.status)}
                      {report.blocked && (
                        <Badge variant="danger" className="text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <User size={14} className="text-gray-400" />
                        <span className="text-gray-400">Signalé par :</span>
                        <span className="text-white font-medium">{report.reporter_email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User size={14} className="text-red-400" />
                        <span className="text-gray-400">Concernant :</span>
                        <span className="text-white font-medium">{report.reported_email}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div>
                        <span className="text-xs text-gray-400">Raison : </span>
                        <span className="text-sm text-white font-medium">{report.reason}</span>
                      </div>
                      {report.description && (
                        <div>
                          <span className="text-xs text-gray-400">Description : </span>
                          <p className="text-sm text-gray-300 italic line-clamp-2">
                            {report.description}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Calendar size={12} />
                      <span>{formatDate(report.created_at)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleViewDetails(report)}
                    variant="primary"
                    size="sm"
                  >
                    Voir les détails
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <ReportDetailModal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          report={selectedReport}
          onResolve={handleResolve}
          onWarn={warnUser}
          onSuspend={suspendReportedUser}
          onBan={banReportedUser}
          onReject={handleReject}
        />
      </div>
    </div>
  );
}

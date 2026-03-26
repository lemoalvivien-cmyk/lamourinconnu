import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useAdminUsers, AdminUser } from '../../hooks/useAdminUsers';
import { UserDetailModal } from '../../components/modals/UserDetailModal';
import { UserEditModal } from '../../components/modals/UserEditModal';
import { UserSuspensionModal } from '../../components/modals/UserSuspensionModal';
import {
  Search,
  Download,
  Eye,
  Edit2,
  Ban,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Users,
  Activity,
  Gem,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminUsers() {
  const {
    users,
    loading,
    totalUsers,
    currentPage,
    totalPages,
    searchQuery,
    statusFilter,
    profileFilter,
    activityFilter,
    setSearchQuery,
    setStatusFilter,
    setProfileFilter,
    setActivityFilter,
    setCurrentPage,
    updateUserRole,
    suspendUser,
    exportCSV,
  } = useAdminUsers();

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [suspensionModalOpen, setSuspensionModalOpen] = useState(false);

  const activeUsers = users.filter((u) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return u.last_seen_at && new Date(u.last_seen_at) > sevenDaysAgo;
  }).length;

  const subscribers = users.filter((u) => u.role === 'subscriber').length;

  const handleViewDetails = (user: AdminUser) => {
    setSelectedUser(user);
    setDetailModalOpen(true);
  };

  const handleEdit = (user?: AdminUser) => {
    if (user) {
      setSelectedUser(user);
    }
    setDetailModalOpen(false);
    setEditModalOpen(true);
  };

  const handleSuspend = (user?: AdminUser) => {
    if (user) {
      setSelectedUser(user);
    }
    setDetailModalOpen(false);
    setSuspensionModalOpen(true);
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Jamais';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return (
          <Badge variant="gold" className="text-xs">
            Admin
          </Badge>
        );
      case 'subscriber':
        return (
          <Badge variant="primary" className="text-xs">
            <Gem size={10} className="mr-1" />
            Abonné
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            Membre
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
            Gestion des utilisateurs
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>{totalUsers} utilisateurs</span>
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full" />
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-green-400" />
              <span>{activeUsers} actifs</span>
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full" />
            <div className="flex items-center gap-2">
              <Gem size={16} className="text-gold" />
              <span>{subscribers} abonnés</span>
            </div>
          </div>
        </div>

        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Rechercher par email, ville ou ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-secondary border border-secondary rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-secondary border border-secondary rounded-lg text-white focus:outline-none focus:border-accent"
            >
              <option value="all">Tous les statuts</option>
              <option value="member">Membres</option>
              <option value="subscriber">Abonnés</option>
              <option value="admin">Admins</option>
            </select>

            <select
              value={profileFilter}
              onChange={(e) => setProfileFilter(e.target.value)}
              className="px-4 py-2 bg-secondary border border-secondary rounded-lg text-white focus:outline-none focus:border-accent"
            >
              <option value="all">Tous les profils</option>
              <option value="complete">Complet</option>
              <option value="incomplete">Incomplet</option>
            </select>

            <select
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
              className="px-4 py-2 bg-secondary border border-secondary rounded-lg text-white focus:outline-none focus:border-accent"
            >
              <option value="all">Toute activité</option>
              <option value="active">Actifs (7j)</option>
              <option value="inactive">Inactifs</option>
            </select>

            <Button onClick={exportCSV} variant="secondary" className="whitespace-nowrap">
              <Download size={18} className="mr-2" />
              Export CSV
            </Button>
          </div>
        </Card>

        {loading ? (
          <Card>
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-gold" size={40} />
            </div>
          </Card>
        ) : users.length === 0 ? (
          <Card>
            <p className="text-gray-400 text-center py-12">Aucun utilisateur trouvé</p>
          </Card>
        ) : (
          <>
            <div className="bg-secondary/50 rounded-lg border border-secondary overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary/80 border-b border-secondary">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Ville
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Inscrit le
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Profil
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary">
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-secondary/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="text-sm text-white font-medium">
                              {user.email}
                            </span>
                            {user.first_name && (
                              <span className="text-xs text-gray-400">{user.first_name}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {user.city || (
                            <span className="text-gray-500 italic">Non renseignée</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {formatDate(user.created_at)}
                        </td>
                        <td className="px-4 py-3">{getRoleBadge(user.role)}</td>
                        <td className="px-4 py-3">
                          {user.profile_complete ? (
                            <div className="flex items-center gap-1 text-xs text-green-400">
                              <CheckCircle size={14} />
                              <span>Complet</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <XCircle size={14} />
                              <span>Incomplet</span>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleViewDetails(user)}
                              className="p-1.5 hover:bg-secondary rounded transition-colors"
                              title="Voir le détail"
                            >
                              <Eye size={16} className="text-gray-400 hover:text-white" />
                            </button>
                            <button
                              onClick={() => handleEdit(user)}
                              className="p-1.5 hover:bg-secondary rounded transition-colors"
                              title="Modifier"
                            >
                              <Edit2 size={16} className="text-gray-400 hover:text-accent" />
                            </button>
                            <button
                              onClick={() => handleSuspend(user)}
                              className="p-1.5 hover:bg-secondary rounded transition-colors"
                              title="Suspendre"
                            >
                              <Ban size={16} className="text-gray-400 hover:text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-400">
                  Page {currentPage} sur {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant="secondary"
                    className="px-3 py-2"
                  >
                    <ChevronLeft size={18} />
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum: number;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={cn(
                            'px-3 py-2 rounded text-sm font-medium transition-colors',
                            currentPage === pageNum
                              ? 'bg-accent text-white'
                              : 'bg-secondary text-gray-400 hover:bg-secondary/80'
                          )}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <Button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    variant="secondary"
                    className="px-3 py-2"
                  >
                    <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        <UserDetailModal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          user={selectedUser}
          onEdit={() => handleEdit()}
          onSuspend={() => handleSuspend()}
        />

        <UserEditModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          user={selectedUser}
          onSave={updateUserRole}
        />

        <UserSuspensionModal
          isOpen={suspensionModalOpen}
          onClose={() => setSuspensionModalOpen(false)}
          user={selectedUser}
          onSuspend={suspendUser}
        />
      </div>
    </div>
  );
}

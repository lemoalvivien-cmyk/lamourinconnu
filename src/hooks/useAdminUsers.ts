import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface AdminUser {
  id: string;
  email: string;
  city: string | null;
  created_at: string;
  role: string;
  last_seen_at: string | null;
  first_name: string | null;
  gender: string | null;
  seeking_gender: string | null;
  birthdate: string | null;
  postal_code: string | null;
  bio: string | null;
  lifestyle_tags: string[];
  relation_type: string | null;
  want_kids: string | null;
  smoking: string | null;
  profile_complete: boolean;
  match_count: number;
  accepted_match_count: number;
  date_count: number;
  reports_received: number;
  reports_sent: number;
}

interface UseAdminUsersReturn {
  users: AdminUser[];
  loading: boolean;
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  statusFilter: string;
  profileFilter: string;
  activityFilter: string;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  setProfileFilter: (profile: string) => void;
  setActivityFilter: (activity: string) => void;
  setCurrentPage: (page: number) => void;
  refresh: () => void;
  updateUserRole: (userId: string, role: string) => Promise<void>;
  suspendUser: (userId: string, reason: string, duration?: number) => Promise<void>;
  exportCSV: () => void;
}

const USERS_PER_PAGE = 20;

export function useAdminUsers(): UseAdminUsersReturn {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [profileFilter, setProfileFilter] = useState('all');
  const [activityFilter, setActivityFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchQuery, statusFilter, profileFilter, activityFilter]);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      let query = supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      if (searchQuery) {
        query = query.or(`email.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,id.eq.${searchQuery}`);
      }

      if (statusFilter !== 'all') {
        query = query.eq('role', statusFilter);
      }

      if (activityFilter === 'active') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        query = query.gte('last_seen_at', sevenDaysAgo.toISOString());
      } else if (activityFilter === 'inactive') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        query = query.lt('last_seen_at', sevenDaysAgo.toISOString());
      }

      const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE - 1);

      if (error) throw error;

      const userIds = (data || []).map((u) => u.id);

      const [allMatchesResult, allReportsReceivedResult, allReportsSentResult] = await Promise.all([
        supabase
          .from('matches')
          .select('id, status, user_a_id, user_b_id')
          .or(userIds.map((id) => `user_a_id.eq.${id},user_b_id.eq.${id}`).join(',')),
        supabase
          .from('reports')
          .select('id, reported_user_id')
          .in('reported_user_id', userIds),
        supabase
          .from('reports')
          .select('id, reporter_id')
          .in('reporter_id', userIds),
      ]);

      const allMatches = allMatchesResult.data || [];
      const allReportsReceived = allReportsReceivedResult.data || [];
      const allReportsSent = allReportsSentResult.data || [];

      const matchIds = allMatches.map((m) => m.id);
      const allDatesResult = matchIds.length > 0
        ? await supabase.from('dates').select('id, match_id').in('match_id', matchIds)
        : { data: [] };
      const allDates = allDatesResult.data || [];

      const enrichedUsers = (data || []).map((user) => {
        const userMatches = allMatches.filter(
          (m) => m.user_a_id === user.id || m.user_b_id === user.id
        );
        const acceptedMatches = userMatches.filter((m) => m.status === 'accepted').length;
        const userMatchIds = userMatches.map((m) => m.id);
        const userDates = allDates.filter((d) => userMatchIds.includes(d.match_id));

        const profileComplete = Boolean(
          user.gender &&
          user.seeking_gender &&
          user.birthdate &&
          user.city &&
          user.postal_code &&
          user.relation_type &&
          user.want_kids !== null &&
          user.smoking !== null &&
          user.lifestyle_tags?.length > 0 &&
          user.bio?.length > 20
        );

        return {
          ...user,
          profile_complete: profileComplete,
          match_count: userMatches.length,
          accepted_match_count: acceptedMatches,
          date_count: userDates.length,
          reports_received: allReportsReceived.filter((r) => r.reported_user_id === user.id).length,
          reports_sent: allReportsSent.filter((r) => r.reporter_id === user.id).length,
        };
      });

      let filteredUsers = enrichedUsers;

      if (profileFilter === 'complete') {
        filteredUsers = enrichedUsers.filter((u) => u.profile_complete);
      } else if (profileFilter === 'incomplete') {
        filteredUsers = enrichedUsers.filter((u) => !u.profile_complete);
      }

      setUsers(filteredUsers);
      setTotalUsers(count || 0);
    } catch {
      // Failed to fetch users
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, role: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId);

    if (error) {
      throw error;
    }

    await fetchUsers();
  };

  const suspendUser = async (userId: string, reason: string, duration?: number) => {
    const suspendedUntil = duration
      ? new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString()
      : null;

    const { error } = await supabase
      .from('profiles')
      .update({
        suspended: true,
        suspended_until: suspendedUntil,
        suspension_reason: reason,
      })
      .eq('id', userId);

    if (error) {
      throw error;
    }

    await fetchUsers();
  };

  const exportCSV = () => {
    const headers = [
      'ID',
      'Email',
      'Ville',
      'Date inscription',
      'Rôle',
      'Profil complet',
      'Dernier login',
    ];

    const rows = users.map((user) => [
      user.id,
      user.email,
      user.city || 'N/A',
      new Date(user.created_at).toLocaleDateString('fr-FR'),
      user.role,
      user.profile_complete ? 'Oui' : 'Non',
      user.last_seen_at
        ? new Date(user.last_seen_at).toLocaleDateString('fr-FR')
        : 'Jamais',
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `utilisateurs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

  return {
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
    refresh: fetchUsers,
    updateUserRole,
    suspendUser,
    exportCSV,
  };
}

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface AdminReport {
  id: string;
  reporter_id: string;
  reported_user_id: string;
  reason: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  blocked: boolean;
  admin_note: string | null;
  action_taken: string | null;
  resolved_at: string | null;
  resolved_by: string | null;
  created_at: string;
  reporter_email?: string;
  reporter_first_name?: string;
  reported_email?: string;
  reported_first_name?: string;
}

interface UseAdminReportsReturn {
  reports: AdminReport[];
  loading: boolean;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  refresh: () => void;
  updateReportStatus: (reportId: string, status: string, adminNote?: string, actionTaken?: string) => Promise<void>;
  warnUser: (reportId: string, reportedUserId: string, reason: string) => Promise<void>;
  suspendReportedUser: (reportId: string, reportedUserId: string, reason: string, duration?: number) => Promise<void>;
  banReportedUser: (reportId: string, reportedUserId: string, reason: string) => Promise<void>;
}

export function useAdminReports(): UseAdminReportsReturn {
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending');

  useEffect(() => {
    fetchReports();
  }, [statusFilter]);

  const fetchReports = async () => {
    setLoading(true);

    try {
      let query = supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data: reportsData, error } = await query;

      if (error) throw error;

      const enrichedReports = await Promise.all(
        (reportsData || []).map(async (report) => {
          const [reporterData, reportedData] = await Promise.all([
            supabase
              .from('profiles')
              .select('email, first_name')
              .eq('id', report.reporter_id)
              .maybeSingle(),
            supabase
              .from('profiles')
              .select('email, first_name')
              .eq('id', report.reported_user_id)
              .maybeSingle(),
          ]);

          return {
            ...report,
            reporter_email: reporterData.data?.email,
            reporter_first_name: reporterData.data?.first_name,
            reported_email: reportedData.data?.email,
            reported_first_name: reportedData.data?.first_name,
          };
        })
      );

      setReports(enrichedReports);
    } catch {
      // Failed to fetch reports
    } finally {
      setLoading(false);
    }
  };

  const updateReportStatus = async (
    reportId: string,
    status: string,
    adminNote?: string,
    actionTaken?: string
  ) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const updates: any = {
      status,
      resolved_by: user.id,
    };

    if (status === 'resolved' || status === 'rejected') {
      updates.resolved_at = new Date().toISOString();
    }

    if (adminNote) {
      updates.admin_note = adminNote;
    }

    if (actionTaken) {
      updates.action_taken = actionTaken;
    }

    const { error } = await supabase
      .from('reports')
      .update(updates)
      .eq('id', reportId);

    if (error) {
      throw error;
    }

    await fetchReports();
  };

  const warnUser = async (reportId: string, reportedUserId: string, reason: string) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('warnings_count')
      .eq('id', reportedUserId)
      .maybeSingle();

    const currentWarnings = profile?.warnings_count || 0;
    const newWarnings = currentWarnings + 1;

    const { error: profileError } = await supabase
      .from('profiles')
      .update({ warnings_count: newWarnings })
      .eq('id', reportedUserId);

    if (profileError) throw profileError;

    await updateReportStatus(reportId, 'resolved', `Warning issued: ${reason}`, 'warning');

    if (newWarnings >= 3) {
      await supabase
        .from('profiles')
        .update({
          suspended: true,
          suspended_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          suspension_reason: 'Automatic suspension after 3 warnings',
        })
        .eq('id', reportedUserId);
    }
  };

  const suspendReportedUser = async (
    reportId: string,
    reportedUserId: string,
    reason: string,
    duration?: number
  ) => {
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
      .eq('id', reportedUserId);

    if (error) throw error;

    await updateReportStatus(
      reportId,
      'resolved',
      `User suspended: ${reason}`,
      duration ? `suspension_${duration}d` : 'ban'
    );
  };

  const banReportedUser = async (reportId: string, reportedUserId: string, reason: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({
        suspended: true,
        suspended_until: null,
        suspension_reason: reason,
      })
      .eq('id', reportedUserId);

    if (error) throw error;

    await updateReportStatus(reportId, 'resolved', `User banned permanently: ${reason}`, 'ban');
  };

  return {
    reports,
    loading,
    statusFilter,
    setStatusFilter,
    refresh: fetchReports,
    updateReportStatus,
    warnUser,
    suspendReportedUser,
    banReportedUser,
  };
}

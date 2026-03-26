import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface AdminStats {
  totalUsers: number;
  totalUsersGrowth: number;
  activeUsers: number;
  subscribers: number;
  mrr: number;
  pendingReports: number;
  totalMatches: number;
  successfulMatches: number;
  totalDates: number;
}

interface RecentActivity {
  id: string;
  type: 'signup' | 'match' | 'date' | 'report';
  description: string;
  timestamp: string;
}

interface DailySignup {
  date: string;
  count: number;
}

interface MonthlyStats {
  date: string;
  matches: number;
  dates: number;
}

export function useAdminDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalUsersGrowth: 0,
    activeUsers: 0,
    subscribers: 0,
    mrr: 0,
    pendingReports: 0,
    totalMatches: 0,
    successfulMatches: 0,
    totalDates: 0,
  });
  const [dailySignups, setDailySignups] = useState<DailySignup[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [paymentEnabled, setPaymentEnabled] = useState(false);

  useEffect(() => {
    if (user) {
      fetchAdminData();
    }
  }, [user]);

  const fetchAdminData = async () => {
    setLoading(true);

    try {
      await Promise.all([
        fetchStats(),
        fetchDailySignups(),
        fetchMonthlyStats(),
        fetchRecentActivity(),
        fetchPaymentSettings(),
      ]);
    } catch {
      // Failed to fetch admin data
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const [
      { count: totalUsers },
      { count: usersLastWeek },
      { count: usersPrevWeek },
      { count: activeUsers },
      { count: subscribers },
      { count: pendingReports },
      { count: totalMatches },
      { count: successfulMatches },
      { count: totalDates },
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString()),
      supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', fourteenDaysAgo.toISOString())
        .lt('created_at', sevenDaysAgo.toISOString()),
      supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('last_seen_at', sevenDaysAgo.toISOString()),
      supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'subscriber'),
      supabase
        .from('reports')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending'),
      supabase.from('matches').select('*', { count: 'exact', head: true }),
      supabase
        .from('matches')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'accepted'),
      supabase.from('dates').select('*', { count: 'exact', head: true }),
    ]);

    const growth =
      usersPrevWeek && usersPrevWeek > 0
        ? Math.round(((usersLastWeek || 0) - usersPrevWeek) / usersPrevWeek * 100)
        : usersLastWeek || 0 > 0
        ? 100
        : 0;

    setStats({
      totalUsers: totalUsers || 0,
      totalUsersGrowth: growth,
      activeUsers: activeUsers || 0,
      subscribers: subscribers || 0,
      mrr: (subscribers || 0) * 14,
      pendingReports: pendingReports || 0,
      totalMatches: totalMatches || 0,
      successfulMatches: successfulMatches || 0,
      totalDates: totalDates || 0,
    });
  };

  const fetchDailySignups = async () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data } = await supabase
      .from('profiles')
      .select('created_at')
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: true });

    if (!data) {
      setDailySignups([]);
      return;
    }

    const signupsByDay: Record<string, number> = {};

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      signupsByDay[dateStr] = 0;
    }

    data.forEach((profile) => {
      const dateStr = profile.created_at.split('T')[0];
      if (signupsByDay[dateStr] !== undefined) {
        signupsByDay[dateStr]++;
      }
    });

    const dailyData = Object.entries(signupsByDay).map(([date, count]) => ({
      date,
      count,
    }));

    setDailySignups(dailyData);
  };

  const fetchMonthlyStats = async () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [matchesData, datesData] = await Promise.all([
      supabase
        .from('matches')
        .select('created_at')
        .gte('created_at', thirtyDaysAgo.toISOString()),
      supabase
        .from('dates')
        .select('created_at')
        .gte('created_at', thirtyDaysAgo.toISOString()),
    ]);

    const statsByDay: Record<string, { matches: number; dates: number }> = {};

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      statsByDay[dateStr] = { matches: 0, dates: 0 };
    }

    (matchesData.data || []).forEach((match) => {
      const dateStr = match.created_at.split('T')[0];
      if (statsByDay[dateStr]) {
        statsByDay[dateStr].matches++;
      }
    });

    (datesData.data || []).forEach((date) => {
      const dateStr = date.created_at.split('T')[0];
      if (statsByDay[dateStr]) {
        statsByDay[dateStr].dates++;
      }
    });

    const monthlyData = Object.entries(statsByDay).map(([date, stats]) => ({
      date,
      matches: stats.matches,
      dates: stats.dates,
    }));

    setMonthlyStats(monthlyData);
  };

  const fetchRecentActivity = async () => {
    const activities: RecentActivity[] = [];

    const [profilesData, matchesData, datesData, reportsData] = await Promise.all([
      supabase
        .from('profiles')
        .select('id, first_name, city, created_at')
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('matches')
        .select('id, user_a_id, user_b_id, created_at, status')
        .eq('status', 'accepted')
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('dates')
        .select('id, scheduled_at, created_at')
        .eq('status', 'confirmed')
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('reports')
        .select('id, reporter_id, reported_user_id, created_at')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

    (profilesData.data || []).forEach((profile) => {
      activities.push({
        id: profile.id,
        type: 'signup',
        description: `${profile.first_name || 'Utilisateur'} (${profile.city || 'Ville inconnue'}) s'est inscrit`,
        timestamp: profile.created_at,
      });
    });

    (matchesData.data || []).forEach((match) => {
      activities.push({
        id: match.id,
        type: 'match',
        description: `Match accepté entre deux utilisateurs`,
        timestamp: match.created_at,
      });
    });

    (datesData.data || []).forEach((date) => {
      const dateFormatted = new Date(date.scheduled_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
      });
      activities.push({
        id: date.id,
        type: 'date',
        description: `RDV confirmé pour le ${dateFormatted}`,
        timestamp: date.created_at,
      });
    });

    (reportsData.data || []).forEach((report) => {
      activities.push({
        id: report.id,
        type: 'report',
        description: `Nouveau signalement`,
        timestamp: report.created_at,
      });
    });

    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    setRecentActivity(activities.slice(0, 10));
  };

  const fetchPaymentSettings = async () => {
    const { data } = await supabase
      .from('platform_settings')
      .select('setting_value')
      .eq('setting_key', 'payment_enabled')
      .maybeSingle();

    setPaymentEnabled(data?.setting_value === 'true');
  };

  const togglePayment = async (enabled: boolean) => {
    const { error } = await supabase
      .from('platform_settings')
      .update({ setting_value: enabled ? 'true' : 'false' })
      .eq('setting_key', 'payment_enabled');

    if (error) {
      throw error;
    }

    setPaymentEnabled(enabled);
  };

  return {
    loading,
    stats,
    dailySignups,
    monthlyStats,
    recentActivity,
    paymentEnabled,
    togglePayment,
    refresh: fetchAdminData,
  };
}

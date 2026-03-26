import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface DashboardStats {
  pendingMatchesCount: number;
  currentMonthDates: number;
  dateQuota: number;
  averageCompatibility: number;
  profileCompletion: number;
}

interface MatchProfile {
  id: string;
  compatibility_score: number;
  user_a_id: string;
  user_b_id: string;
  city: string | null;
  birthdate: string | null;
  lifestyle_tags: string[];
  created_at: string;
}

interface UpcomingDate {
  id: string;
  scheduled_at: string;
  location_name: string;
  location_address: string;
  status: string;
  match_id: string;
}

export function useDashboardData() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    pendingMatchesCount: 0,
    currentMonthDates: 0,
    dateQuota: 2,
    averageCompatibility: 0,
    profileCompletion: 0,
  });
  const [recentMatches, setRecentMatches] = useState<MatchProfile[]>([]);
  const [upcomingDates, setUpcomingDates] = useState<UpcomingDate[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [paymentEnabled, setPaymentEnabled] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const [
        profileData,
        matchesData,
        datesData,
        _subscriptionData,
        settingsData
      ] = await Promise.all([
        fetchProfile(),
        fetchMatches(),
        fetchDates(),
        fetchSubscription(),
        fetchSettings()
      ]);

      setProfile(profileData);

      const pendingMatches = matchesData.filter((m: any) =>
        m.status === 'proposed' ||
        (m.status === 'accepted_by_a' && m.user_b_id === user.id) ||
        (m.status === 'accepted_by_b' && m.user_a_id === user.id)
      );

      const avgScore = matchesData.length > 0
        ? matchesData.reduce((sum: number, m: any) => sum + (m.compatibility_score || 0), 0) / matchesData.length
        : 0;

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthDates = datesData.filter((d: any) => {
        const dateMonth = new Date(d.scheduled_at).getMonth();
        const dateYear = new Date(d.scheduled_at).getFullYear();
        return dateMonth === currentMonth && dateYear === currentYear;
      });

      const profileCompletionPercentage = calculateProfileCompletion(profileData);

      setStats({
        pendingMatchesCount: pendingMatches.length,
        currentMonthDates: monthDates.length,
        dateQuota: 999,
        averageCompatibility: Math.round(avgScore),
        profileCompletion: profileCompletionPercentage,
      });

      const recentMatchesWithProfiles = await Promise.all(
        pendingMatches.slice(0, 3).map(async (match: any) => {
          const otherUserId = match.user_a_id === user.id ? match.user_b_id : match.user_a_id;
          const { data: otherProfile } = await supabase
            .from('profiles')
            .select('city, birthdate, lifestyle_tags')
            .eq('id', otherUserId)
            .maybeSingle();

          return {
            id: match.id,
            compatibility_score: match.compatibility_score,
            user_a_id: match.user_a_id,
            user_b_id: match.user_b_id,
            city: otherProfile?.city || null,
            birthdate: otherProfile?.birthdate || null,
            lifestyle_tags: otherProfile?.lifestyle_tags || [],
            created_at: match.created_at,
          };
        })
      );

      setRecentMatches(recentMatchesWithProfiles);

      const upcoming = datesData
        .filter((d: any) => new Date(d.scheduled_at) > new Date() && d.status !== 'canceled')
        .sort((a: any, b: any) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime())
        .slice(0, 1);

      setUpcomingDates(upcoming);
      setPaymentEnabled(settingsData?.setting_value === 'true');

    } catch {
      // Failed to fetch dashboard data
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    if (!user) return null;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    return data;
  };

  const fetchMatches = async () => {
    if (!user) return [];

    const { data } = await supabase
      .from('matches')
      .select('*')
      .or(`user_a_id.eq.${user.id},user_b_id.eq.${user.id}`)
      .order('created_at', { ascending: false });

    return data || [];
  };

  const fetchDates = async () => {
    if (!user) return [];

    const { data } = await supabase
      .from('dates')
      .select('*, matches!inner(*)')
      .or(`matches.user_a_id.eq.${user.id},matches.user_b_id.eq.${user.id}`, { foreignTable: 'matches' })
      .order('scheduled_at', { ascending: true });

    return data || [];
  };

  const fetchSubscription = async () => {
    if (!user) return null;

    const { data } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    return data;
  };

  const fetchSettings = async () => {
    const { data } = await supabase
      .from('platform_settings')
      .select('*')
      .eq('setting_key', 'payment_enabled')
      .maybeSingle();

    return data;
  };

  const calculateProfileCompletion = (profileData: any): number => {
    if (!profileData) return 0;

    const fields = [
      profileData.gender,
      profileData.seeking_gender,
      profileData.birthdate,
      profileData.city,
      profileData.postal_code,
      profileData.relation_type,
      profileData.want_kids,
      profileData.smoking,
      profileData.lifestyle_tags && profileData.lifestyle_tags.length > 0,
      profileData.bio && profileData.bio.length > 20,
    ];

    const completedFields = fields.filter(Boolean).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  return {
    loading,
    stats,
    recentMatches,
    upcomingDates,
    profile,
    paymentEnabled,
    refresh: fetchDashboardData,
  };
}

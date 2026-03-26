import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface Profile {
  id: string;
  first_name: string;
  age: number;
  city: string;
  birthdate?: string;
}

interface Match {
  id: string;
  user_a_id: string;
  user_b_id: string;
  compatibility_score: number;
}

interface DateEntry {
  id: string;
  match_id: string;
  proposed_by: string;
  scheduled_at: string;
  location_name: string;
  location_address?: string;
  notes: string;
  status: string;
  created_at: string;
  match?: Match & {
    profile?: Profile;
  };
  feedback?: {
    rating: number;
    comment: string;
  };
}

export function useDates() {
  const { user } = useAuth();
  const [upcomingDates, setUpcomingDates] = useState<DateEntry[]>([]);
  const [pastDates, setPastDates] = useState<DateEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [monthlyCount, setMonthlyCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchDates();
    }
  }, [user]);

  const fetchDates = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { data: matchesData, error: matchesError } = await supabase
        .from('matches')
        .select('id, user_a_id, user_b_id, compatibility_score')
        .or(`user_a_id.eq.${user.id},user_b_id.eq.${user.id}`)
        .eq('status', 'accepted');

      if (matchesError) throw matchesError;

      const matchIds = (matchesData || []).map((m) => m.id);

      if (matchIds.length === 0) {
        setUpcomingDates([]);
        setPastDates([]);
        setMonthlyCount(0);
        setLoading(false);
        return;
      }

      const { data: datesData, error: datesError } = await supabase
        .from('dates')
        .select(`
          *,
          match:matches(
            *,
            user_a:profiles!matches_user_a_id_fkey(*),
            user_b:profiles!matches_user_b_id_fkey(*)
          )
        `)
        .in('match_id', matchIds)
        .order('scheduled_at', { ascending: true });

      if (datesError) throw datesError;

      const { data: feedbackData, error: feedbackError } = await supabase
        .from('feedbacks')
        .select('date_id, rating, comment')
        .eq('user_id', user.id);

      if (feedbackError) throw feedbackError;

      const feedbackMap = new Map(
        (feedbackData || []).map((f) => [f.date_id, { rating: f.rating, comment: f.comment }])
      );

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const processedDates: DateEntry[] = (datesData || []).map((date: any) => {
        const match = date.match;
        const isUserA = match?.user_a_id === user.id;
        const otherProfile = isUserA ? match?.user_b : match?.user_a;

        return {
          id: date.id,
          match_id: date.match_id,
          proposed_by: date.proposed_by,
          scheduled_at: date.scheduled_at,
          location_name: date.location_name,
          location_address: date.location_address || '',
          notes: date.notes,
          status: date.status,
          created_at: date.created_at,
          match: {
            ...match,
            profile: otherProfile,
          },
          feedback: feedbackMap.get(date.id),
        };
      });

      const upcoming = processedDates.filter(
        (d) =>
          new Date(d.scheduled_at) > now &&
          (d.status === 'pending' || d.status === 'confirmed')
      );

      const past = processedDates.filter(
        (d) =>
          new Date(d.scheduled_at) <= now &&
          (d.status === 'confirmed' || d.status === 'completed')
      );

      const monthlyDates = processedDates.filter(
        (d) => new Date(d.scheduled_at) >= startOfMonth && new Date(d.scheduled_at) <= now
      );

      setUpcomingDates(upcoming);
      setPastDates(past);
      setMonthlyCount(monthlyDates.length);
    } catch {
      setError('Impossible de charger les rendez-vous');
    } finally {
      setLoading(false);
    }
  };

  const cancelDate = async (dateId: string) => {
    try {
      const { error } = await supabase
        .from('dates')
        .update({ status: 'canceled' })
        .eq('id', dateId);

      if (error) throw error;

      await fetchDates();
    } catch (err) {
      throw err;
    }
  };

  const submitFeedback = async (data: {
    dateId: string;
    rating: number;
    comment: string;
    wantToSeeAgain: boolean;
  }) => {
    if (!user) return;

    try {
      const { error } = await supabase.from('feedbacks').insert({
        date_id: data.dateId,
        user_id: user.id,
        rating: data.rating,
        comment: data.comment,
        want_to_see_again: data.wantToSeeAgain,
      });

      if (error) throw error;

      await fetchDates();
    } catch (err) {
      throw err;
    }
  };

  return {
    upcomingDates,
    pastDates,
    monthlyCount,
    loading,
    error,
    cancelDate,
    submitFeedback,
    refetch: fetchDates,
  };
}

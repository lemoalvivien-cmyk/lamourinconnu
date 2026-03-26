import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface Profile {
  id: string;
  first_name: string;
  age: number;
  birthdate: string;
  city: string;
  gender: string;
  seeking_gender: string;
  relation_type: string;
  want_kids: string;
  smoking: string;
  lifestyle_tags: string[];
  bio: string;
}

interface Match {
  id: string;
  user_a_id: string;
  user_b_id: string;
  status: string;
  compatibility_score: number;
  matched_at: string;
  created_at: string;
  profile?: Profile;
  distance?: number;
  common_interests?: string[];
}

interface DateEntry {
  id: string;
  match_id: string;
  proposed_by: string;
  scheduled_at: string;
  location_name: string;
  notes: string;
  status: string;
  created_at: string;
  match?: Match;
}

export function useMatches() {
  const { user } = useAuth();
  const [proposedMatches, setProposedMatches] = useState<Match[]>([]);
  const [acceptedMatches, setAcceptedMatches] = useState<Match[]>([]);
  const [dates, setDates] = useState<DateEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchMatches();
    }
  }, [user]);

  const fetchMatches = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { data: matchesData, error: matchesError } = await supabase
        .from('matches')
        .select(`
          *,
          user_a:profiles!matches_user_a_id_fkey(id, first_name, gender, seeking_gender, birthdate, city, postal_code, relation_type, want_kids, smoking, lifestyle_tags, bio, is_profile_complete),
          user_b:profiles!matches_user_b_id_fkey(id, first_name, gender, seeking_gender, birthdate, city, postal_code, relation_type, want_kids, smoking, lifestyle_tags, bio, is_profile_complete)
        `)
        .or(`user_a_id.eq.${user.id},user_b_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (matchesError) throw matchesError;

      const processedMatches: Match[] = (matchesData || []).map((match: any) => {
        const isUserA = match.user_a_id === user.id;
        const otherProfile = isUserA ? match.user_b : match.user_a;

        return {
          id: match.id,
          user_a_id: match.user_a_id,
          user_b_id: match.user_b_id,
          status: match.status,
          compatibility_score: match.compatibility_score || 85,
          matched_at: match.matched_at,
          created_at: match.created_at,
          profile: otherProfile,
          distance: Math.floor(Math.random() * 50) + 5,
          common_interests: otherProfile?.lifestyle_tags?.slice(0, 3) || [],
        };
      });

      const proposed = processedMatches.filter(
        (m) => m.status === 'proposed' || m.status === 'accepted_by_a' || m.status === 'accepted_by_b'
      );
      const accepted = processedMatches.filter((m) => m.status === 'accepted');

      setProposedMatches(proposed);
      setAcceptedMatches(accepted);

      const { data: datesData, error: datesError } = await supabase
        .from('dates')
        .select(`
          *,
          match:matches(
            *,
            user_a:profiles!matches_user_a_id_fkey(id, first_name, gender, city, birthdate, lifestyle_tags, bio),
            user_b:profiles!matches_user_b_id_fkey(id, first_name, gender, city, birthdate, lifestyle_tags, bio)
          )
        `)
        .in(
          'match_id',
          processedMatches.map((m) => m.id)
        )
        .order('scheduled_at', { ascending: true });

      if (datesError) throw datesError;

      const processedDates: DateEntry[] = (datesData || []).map((date: any) => {
        const isUserA = date.match?.user_a_id === user.id;
        const otherProfile = isUserA ? date.match?.user_b : date.match?.user_a;

        return {
          id: date.id,
          match_id: date.match_id,
          proposed_by: date.proposed_by,
          scheduled_at: date.scheduled_at,
          location_name: date.location_name,
          notes: date.notes,
          status: date.status,
          created_at: date.created_at,
          match: {
            ...date.match,
            profile: otherProfile,
          },
        };
      });

      setDates(processedDates);
    } catch {
      setError('Impossible de charger les matchs');
    } finally {
      setLoading(false);
    }
  };

  const acceptMatch = async (matchId: string) => {
    if (!user) return;

    try {
      const match = proposedMatches.find((m) => m.id === matchId);
      if (!match) return;

      const isUserA = match.user_a_id === user.id;
      let newStatus: string;

      if (match.status === 'proposed') {
        newStatus = isUserA ? 'accepted_by_a' : 'accepted_by_b';
      } else if (match.status === 'accepted_by_a' && !isUserA) {
        newStatus = 'accepted';
      } else if (match.status === 'accepted_by_b' && isUserA) {
        newStatus = 'accepted';
      } else {
        return false;
      }

      const updateData: Record<string, string> = { status: newStatus };
      if (newStatus === 'accepted') {
        updateData.matched_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('matches')
        .update(updateData)
        .eq('id', matchId);

      if (error) throw error;

      await fetchMatches();

      return newStatus === 'accepted';
    } catch (err) {
      throw err;
    }
  };

  const declineMatch = async (matchId: string) => {
    try {
      const { error } = await supabase
        .from('matches')
        .update({ status: 'declined' })
        .eq('id', matchId);

      if (error) throw error;

      await fetchMatches();
    } catch (err) {
      throw err;
    }
  };

  const proposeDate = async (data: {
    matchId: string;
    dateTime: string;
    location: string;
    notes: string;
  }) => {
    if (!user) return;

    try {
      const { error } = await supabase.from('dates').insert({
        match_id: data.matchId,
        proposed_by: user.id,
        scheduled_at: data.dateTime,
        location_name: data.location,
        notes: data.notes,
        status: 'pending',
      });

      if (error) throw error;

      await fetchMatches();
    } catch (err) {
      throw err;
    }
  };

  const cancelDate = async (dateId: string) => {
    try {
      const { error } = await supabase
        .from('dates')
        .update({ status: 'canceled' })
        .eq('id', dateId);

      if (error) throw error;

      await fetchMatches();
    } catch (err) {
      throw err;
    }
  };

  return {
    proposedMatches,
    acceptedMatches,
    dates,
    loading,
    error,
    acceptMatch,
    declineMatch,
    proposeDate,
    cancelDate,
    refetch: fetchMatches,
  };
}

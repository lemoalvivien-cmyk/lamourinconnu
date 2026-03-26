import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface NotificationSettings {
  email_new_match: boolean;
  email_match_accepted: boolean;
  email_date_proposal: boolean;
  email_date_reminder: boolean;
  email_feedback_request: boolean;
}

interface UserSettings {
  profile_invisible: boolean;
  notifications: NotificationSettings;
}

export function useSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings>({
    profile_invisible: false,
    notifications: {
      email_new_match: true,
      email_match_accepted: true,
      email_date_proposal: true,
      email_date_reminder: true,
      email_feedback_request: true,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchSettings();
    }
  }, [user]);

  const fetchSettings = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('profile_invisible')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      const { data: notifData, error: notifError } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (notifError && notifError.code !== 'PGRST116') throw notifError;

      setSettings({
        profile_invisible: profileData?.profile_invisible || false,
        notifications: {
          email_new_match: notifData?.email_new_match ?? true,
          email_match_accepted: notifData?.email_match_accepted ?? true,
          email_date_proposal: notifData?.email_date_proposal ?? true,
          email_date_reminder: notifData?.email_date_reminder ?? true,
          email_feedback_request: notifData?.email_feedback_request ?? true,
        },
      });
    } catch {
      setError('Impossible de charger les paramètres');
    } finally {
      setLoading(false);
    }
  };

  const updateProfileVisibility = async (invisible: boolean) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ profile_invisible: invisible })
        .eq('id', user.id);

      if (error) throw error;

      setSettings((prev) => ({
        ...prev,
        profile_invisible: invisible,
      }));
    } catch (err) {
      throw err;
    }
  };

  const updateNotificationPreference = async (
    key: keyof NotificationSettings,
    value: boolean
  ) => {
    if (!user) return;

    try {
      const { data: existing } = await supabase
        .from('notification_preferences')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('notification_preferences')
          .update({ [key]: value })
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('notification_preferences').insert({
          user_id: user.id,
          [key]: value,
        });

        if (error) throw error;
      }

      setSettings((prev) => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [key]: value,
        },
      }));
    } catch (err) {
      throw err;
    }
  };

  const downloadUserData = async () => {
    if (!user) return;

    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      const { data: matchesData } = await supabase
        .from('matches')
        .select('*')
        .or(`user_a_id.eq.${user.id},user_b_id.eq.${user.id}`);

      const { data: datesData } = await supabase
        .from('dates')
        .select('*')
        .in(
          'match_id',
          (matchesData || []).map((m) => m.id)
        );

      const { data: feedbacksData } = await supabase
        .from('feedbacks')
        .select('*')
        .eq('user_id', user.id);

      const userData = {
        profile: profileData,
        matches: matchesData,
        dates: datesData,
        feedbacks: feedbacksData,
        export_date: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(userData, null, 2)], {
        type: 'application/json',
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lamour-inconnu-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      throw err;
    }
  };

  return {
    settings,
    loading,
    error,
    updateProfileVisibility,
    updateNotificationPreference,
    downloadUserData,
    refetch: fetchSettings,
  };
}

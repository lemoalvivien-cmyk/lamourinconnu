import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface PlatformSettings {
  payment_enabled: boolean;
  stripe_payment_link: string;
  quota_rdv_monthly: number;
  quota_matches_daily: number;
  max_distance_km: number;
  email_welcome: boolean;
  email_match_proposed: boolean;
  email_match_confirmed: boolean;
  email_date_proposed: boolean;
  email_date_confirmed: boolean;
  email_date_reminder: boolean;
  email_feedback_request: boolean;
  email_sender: string;
  maintenance_mode: boolean;
  maintenance_message: string;
  dashboard_welcome_message: string;
  no_match_message: string;
  date_confirmation_message: string;
  stripe_portal_url: string;
}

const DEFAULT_SETTINGS: PlatformSettings = {
  payment_enabled: false,
  stripe_payment_link: '',
  quota_rdv_monthly: 2,
  quota_matches_daily: 5,
  max_distance_km: 100,
  email_welcome: true,
  email_match_proposed: true,
  email_match_confirmed: true,
  email_date_proposed: true,
  email_date_confirmed: true,
  email_date_reminder: true,
  email_feedback_request: true,
  email_sender: 'contact@lamourinconnu.fr',
  maintenance_mode: false,
  maintenance_message: 'Nous effectuons une mise à jour. Le site sera de retour très bientôt !',
  dashboard_welcome_message: 'Bienvenue sur L\'Amour Inconnu',
  no_match_message: 'Aucun match pour le moment. Revenez bientôt !',
  date_confirmation_message: 'Votre rendez-vous est confirmé',
  stripe_portal_url: '',
};

export function usePlatformSettings() {
  const [settings, setSettings] = useState<PlatformSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('platform_settings')
        .select('setting_key, setting_value');

      if (error) {
        // Failed to fetch settings; defaults will be used
      } else if (data) {
        const settingsObj: Record<string, boolean | number | string> = { ...DEFAULT_SETTINGS };
        data.forEach((item) => {
          const key = item.setting_key as keyof PlatformSettings;
          const value = item.setting_value;

          if (typeof DEFAULT_SETTINGS[key] === 'boolean') {
            settingsObj[key] = value === 'true';
          } else if (typeof DEFAULT_SETTINGS[key] === 'number') {
            settingsObj[key] = parseInt(value);
          } else {
            settingsObj[key] = value;
          }
        });
        setSettings(settingsObj as unknown as PlatformSettings);
      }
    } catch {
      // Failed to fetch settings; defaults will be used
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: keyof PlatformSettings, value: any) => {
    const stringValue = String(value);

    const { error } = await supabase
      .from('platform_settings')
      .upsert({
        setting_key: key,
        setting_value: stringValue
      }, {
        onConflict: 'setting_key'
      });

    if (error) {
      throw error;
    }

    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveAllSettings = async (newSettings: PlatformSettings) => {
    setSaving(true);
    try {
      const updates = Object.entries(newSettings).map(([key, value]) => ({
        setting_key: key,
        setting_value: String(value),
      }));

      const { error } = await supabase
        .from('platform_settings')
        .upsert(updates, { onConflict: 'setting_key' });

      if (error) throw error;

      setSettings(newSettings);
      return true;
    } catch {
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    settings,
    loading,
    saving,
    updateSetting,
    saveAllSettings,
    refresh: fetchSettings,
    paymentEnabled: settings.payment_enabled,
  };
}

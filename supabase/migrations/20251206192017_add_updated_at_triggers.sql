/*
  # Triggers pour updated_at

  ## Description
  Crée une fonction et des triggers pour mettre à jour automatiquement
  le champ updated_at lors des modifications.

  ## Tables concernées
  - profiles
  - subscriptions
  - dates
  - platform_settings
*/

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour subscriptions
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour dates
DROP TRIGGER IF EXISTS update_dates_updated_at ON dates;
CREATE TRIGGER update_dates_updated_at
  BEFORE UPDATE ON dates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour platform_settings
DROP TRIGGER IF EXISTS update_platform_settings_updated_at ON platform_settings;
CREATE TRIGGER update_platform_settings_updated_at
  BEFORE UPDATE ON platform_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

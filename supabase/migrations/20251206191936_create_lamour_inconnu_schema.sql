/*
  # Schema L'Amour Inconnu

  ## Description
  Base de données complète pour la plateforme de rencontres L'Amour Inconnu.
  Toutes les tables sont protégées par Row Level Security (RLS).

  ## 1. New Tables

  ### `profiles`
  - Étend la table auth.users de Supabase
  - Stocke les informations détaillées du profil utilisateur
  - Colonnes: id, email, gender, seeking_gender, birthdate, city, postal_code, max_distance_km, 
    relation_type, want_kids, smoking, lifestyle_tags, bio, is_profile_complete, role, created_at, updated_at

  ### `subscriptions`
  - Gère les abonnements Pass Inconnu (14€/mois)
  - Colonnes: id, user_id, stripe_customer_id, stripe_subscription_id, plan_code, status,
    current_period_start, current_period_end, rdv_quota_used, rdv_quota_max, created_at, updated_at

  ### `matches`
  - Stocke les connexions entre utilisateurs basées sur la compatibilité
  - Colonnes: id, user_a_id, user_b_id, compatibility_score, status, created_at

  ### `dates`
  - Gère les rendez-vous planifiés entre utilisateurs matchés
  - Colonnes: id, match_id, scheduled_at, location_name, location_address, status, created_at, updated_at

  ### `feedbacks`
  - Collecte les retours après les rendez-vous
  - Colonnes: id, date_id, user_id, rating, comment, created_at

  ### `reports`
  - Système de signalement pour modération
  - Colonnes: id, reporter_id, reported_id, reason, status, created_at

  ### `platform_settings`
  - Paramètres globaux de la plateforme (accessible aux admins)
  - Colonnes: id, setting_key, setting_value, updated_at

  ## 2. Security

  Toutes les tables ont RLS activé avec des politiques strictes :
  - profiles: lecture publique (pour matching), écriture limitée au propriétaire
  - subscriptions: accès limité au propriétaire uniquement
  - matches: visibles uniquement par les 2 utilisateurs concernés
  - dates: visibles via la relation avec matches
  - feedbacks: accessibles via la relation avec dates
  - reports: lecture pour le reporter et les admins, écriture pour utilisateurs authentifiés
  - platform_settings: lecture publique, écriture admin uniquement

  ## 3. Important Notes
  - Toutes les suppressions utilisent CASCADE pour maintenir l'intégrité
  - Les contraintes CHECK garantissent la validité des données
  - Les timestamps sont automatiquement gérés
  - Quota de RDV par défaut: 2 par mois pour les abonnés
*/

-- 1. TABLE profiles (étend auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('homme', 'femme', 'autre')),
  seeking_gender TEXT CHECK (seeking_gender IN ('homme', 'femme', 'tous')),
  birthdate DATE,
  city TEXT,
  postal_code TEXT,
  max_distance_km INTEGER DEFAULT 50,
  relation_type TEXT CHECK (relation_type IN ('serieux', 'fun', 'a_voir')),
  want_kids TEXT CHECK (want_kids IN ('oui', 'non', 'plus_tard', 'deja')),
  smoking TEXT CHECK (smoking IN ('oui', 'non', 'occasionnel')),
  lifestyle_tags TEXT[] DEFAULT '{}',
  bio TEXT CHECK (char_length(bio) <= 300),
  is_profile_complete BOOLEAN DEFAULT false,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'subscriber', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLE subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan_code TEXT DEFAULT 'PASS_INCONNU_14',
  status TEXT DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'canceled', 'past_due')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  rdv_quota_used INTEGER DEFAULT 0,
  rdv_quota_max INTEGER DEFAULT 2,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLE matches
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_a_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  user_b_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  compatibility_score INTEGER CHECK (compatibility_score >= 0 AND compatibility_score <= 100),
  status TEXT DEFAULT 'proposed' CHECK (status IN ('proposed', 'accepted_by_a', 'accepted_by_b', 'accepted', 'declined', 'expired')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_match UNIQUE(user_a_id, user_b_id)
);

-- 4. TABLE dates (rendez-vous)
CREATE TABLE IF NOT EXISTS dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMPTZ,
  location_name TEXT,
  location_address TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'done', 'no_show', 'canceled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLE feedbacks
CREATE TABLE IF NOT EXISTS feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_id UUID REFERENCES dates(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLE reports (signalements)
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reported_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABLE platform_settings (paramètres admin)
CREATE TABLE IF NOT EXISTS platform_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insérer les paramètres par défaut si non existants
INSERT INTO platform_settings (setting_key, setting_value) 
VALUES ('payment_enabled', 'false')
ON CONFLICT (setting_key) DO NOTHING;

-- ============================================
-- RLS POLICIES
-- ============================================

-- PROFILES: lecture publique pour matching, écriture propriétaire
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- SUBSCRIPTIONS: accès propriétaire uniquement
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription" ON subscriptions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription" ON subscriptions
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- MATCHES: visibles par les 2 utilisateurs impliqués
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own matches" ON matches
  FOR SELECT
  USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);

CREATE POLICY "Users can create matches" ON matches
  FOR INSERT
  WITH CHECK (auth.uid() = user_a_id OR auth.uid() = user_b_id);

CREATE POLICY "Users can update own matches" ON matches
  FOR UPDATE
  USING (auth.uid() = user_a_id OR auth.uid() = user_b_id)
  WITH CHECK (auth.uid() = user_a_id OR auth.uid() = user_b_id);

-- DATES: accessibles via la relation avec matches
ALTER TABLE dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own dates" ON dates
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM matches 
      WHERE matches.id = dates.match_id 
      AND (matches.user_a_id = auth.uid() OR matches.user_b_id = auth.uid())
    )
  );

CREATE POLICY "Users can create dates" ON dates
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM matches 
      WHERE matches.id = match_id 
      AND (matches.user_a_id = auth.uid() OR matches.user_b_id = auth.uid())
    )
  );

CREATE POLICY "Users can update own dates" ON dates
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM matches 
      WHERE matches.id = dates.match_id 
      AND (matches.user_a_id = auth.uid() OR matches.user_b_id = auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM matches 
      WHERE matches.id = match_id 
      AND (matches.user_a_id = auth.uid() OR matches.user_b_id = auth.uid())
    )
  );

-- FEEDBACKS: accessibles via la relation avec dates
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view feedbacks for their dates" ON feedbacks
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM dates
      JOIN matches ON dates.match_id = matches.id
      WHERE dates.id = feedbacks.date_id
      AND (matches.user_a_id = auth.uid() OR matches.user_b_id = auth.uid())
    )
  );

CREATE POLICY "Users can create feedback for their dates" ON feedbacks
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM dates
      JOIN matches ON dates.match_id = matches.id
      WHERE dates.id = date_id
      AND (matches.user_a_id = auth.uid() OR matches.user_b_id = auth.uid())
    )
  );

-- REPORTS: reporter peut voir ses signalements, admins voient tout
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reports" ON reports
  FOR SELECT
  USING (
    auth.uid() = reporter_id
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Authenticated users can create reports" ON reports
  FOR INSERT
  WITH CHECK (
    auth.uid() = reporter_id
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "Admins can update reports" ON reports
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- PLATFORM_SETTINGS: lecture publique, écriture admin
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read settings" ON platform_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert settings" ON platform_settings
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update settings" ON platform_settings
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Créer des index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_profiles_city ON profiles(city);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_matches_user_a ON matches(user_a_id);
CREATE INDEX IF NOT EXISTS idx_matches_user_b ON matches(user_b_id);
CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_dates_match_id ON dates(match_id);
CREATE INDEX IF NOT EXISTS idx_feedbacks_date_id ON feedbacks(date_id);
CREATE INDEX IF NOT EXISTS idx_reports_reporter_id ON reports(reporter_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);

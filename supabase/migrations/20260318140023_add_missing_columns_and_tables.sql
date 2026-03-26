/*
  # Add missing columns and tables referenced in application code

  ## Description
  Several columns and tables are referenced in the frontend code but were never
  created in the database. This migration adds them to prevent runtime errors.

  ## 1. New Columns on `profiles`
    - `first_name` (text) - User's first name, displayed in admin panel and matching
    - `profile_invisible` (boolean, default false) - Whether user has hidden their profile
    - `deleted_at` (timestamptz, nullable) - Soft-delete timestamp for account deletion
    - `last_seen_at` (timestamptz, nullable) - Last activity timestamp for admin analytics

  ## 2. New Tables
    - `account_deletions` - Stores reasons when users delete their account (RGPD)
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `reason` (text)
      - `created_at` (timestamptz)

    - `notification_preferences` - Per-user notification settings
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles, unique)
      - `email_new_match` (boolean, default true)
      - `email_match_accepted` (boolean, default true)
      - `email_date_proposal` (boolean, default true)
      - `email_date_reminder` (boolean, default true)
      - `email_feedback_request` (boolean, default true)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  ## 3. Security
    - RLS enabled on both new tables
    - `account_deletions`: insert-only for authenticated owner
    - `notification_preferences`: full CRUD for authenticated owner only

  ## 4. Important Notes
    - All changes are additive (no destructive operations)
    - IF NOT EXISTS guards prevent errors on re-run
    - These columns and tables are required by existing frontend code
*/

-- Add missing columns to profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'first_name'
  ) THEN
    ALTER TABLE profiles ADD COLUMN first_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'profile_invisible'
  ) THEN
    ALTER TABLE profiles ADD COLUMN profile_invisible boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'deleted_at'
  ) THEN
    ALTER TABLE profiles ADD COLUMN deleted_at timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'last_seen_at'
  ) THEN
    ALTER TABLE profiles ADD COLUMN last_seen_at timestamptz;
  END IF;
END $$;

-- Create account_deletions table
CREATE TABLE IF NOT EXISTS account_deletions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  reason text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE account_deletions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own deletion reason"
  ON account_deletions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Only admins can view deletion reasons"
  ON account_deletions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create notification_preferences table
CREATE TABLE IF NOT EXISTS notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  email_new_match boolean DEFAULT true,
  email_match_accepted boolean DEFAULT true,
  email_date_proposal boolean DEFAULT true,
  email_date_reminder boolean DEFAULT true,
  email_feedback_request boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notification preferences"
  ON notification_preferences
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notification preferences"
  ON notification_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notification preferences"
  ON notification_preferences
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_account_deletions_user_id ON account_deletions(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_preferences_user_id ON notification_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_deleted_at ON profiles(deleted_at);
CREATE INDEX IF NOT EXISTS idx_profiles_last_seen_at ON profiles(last_seen_at);

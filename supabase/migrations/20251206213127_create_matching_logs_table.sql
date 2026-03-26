/*
  # Create matching logs table

  1. New Tables
    - `matching_logs`
      - `id` (uuid, primary key)
      - `executed_at` (timestamptz) - When the matching job was executed
      - `profiles_processed` (integer) - Number of profiles processed
      - `matches_created` (integer) - Number of new matches created
      - `errors` (text array) - Any errors encountered
      - `execution_duration_ms` (integer) - How long the job took
      - `triggered_by` (text) - 'cron' or 'manual' or user_id if admin
  
  2. Security
    - Enable RLS on `matching_logs` table
    - Only admins can read logs
    - Only service role can insert logs (via Edge Function)
*/

CREATE TABLE IF NOT EXISTS matching_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  executed_at TIMESTAMPTZ DEFAULT NOW(),
  profiles_processed INTEGER DEFAULT 0,
  matches_created INTEGER DEFAULT 0,
  errors TEXT[] DEFAULT ARRAY[]::TEXT[],
  execution_duration_ms INTEGER,
  triggered_by TEXT
);

ALTER TABLE matching_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can read matching logs"
  ON matching_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
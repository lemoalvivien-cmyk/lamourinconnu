/*
  # Add warnings count to profiles table

  1. Changes
    - Add `warnings_count` integer column to track user warnings
    - Defaults to 0
    - After 3 warnings, user is automatically suspended for 7 days
    
  2. Notes
    - This field is managed by admins via the reports system
    - Warnings are issued for inappropriate behavior
    - Auto-suspension kicks in at 3 warnings
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'warnings_count'
  ) THEN
    ALTER TABLE profiles ADD COLUMN warnings_count integer DEFAULT 0;
  END IF;
END $$;

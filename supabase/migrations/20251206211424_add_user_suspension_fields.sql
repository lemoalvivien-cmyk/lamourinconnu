/*
  # Add user suspension fields to profiles table

  1. Changes
    - Add `suspended` boolean column to track if user is suspended
    - Add `suspended_until` timestamp column for temporary suspensions
    - Add `suspension_reason` text column to store the reason for suspension
    
  2. Notes
    - `suspended` defaults to false
    - `suspended_until` is nullable (null = permanent ban)
    - `suspension_reason` stores the admin's reason for suspension
    - These fields enable admins to temporarily or permanently suspend users
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'suspended'
  ) THEN
    ALTER TABLE profiles ADD COLUMN suspended boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'suspended_until'
  ) THEN
    ALTER TABLE profiles ADD COLUMN suspended_until timestamptz;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'suspension_reason'
  ) THEN
    ALTER TABLE profiles ADD COLUMN suspension_reason text;
  END IF;
END $$;

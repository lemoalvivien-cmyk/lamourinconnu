/*
  # Update reports table for admin management

  1. Changes to reports table
    - Rename `reported_id` to `reported_user_id` for consistency with code
    - Add `description` text column for detailed report description
    - Add `admin_note` text column for internal admin notes
    - Add `action_taken` text column to track admin action (warning, suspension, ban, rejected)
    - Add `resolved_at` timestamptz for resolution timestamp
    - Add `resolved_by` uuid for admin who resolved the report
    - Update status enum to include 'in_progress' and 'rejected'
    
  2. Security
    - Maintains existing RLS policies
    - Admin actions are logged for accountability
    
  3. Important Notes
    - All admin modifications are tracked
    - Reports can be in states: pending, in_progress, resolved, rejected
    - Action taken can be: warning, suspension, ban, rejected, resolved
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reports' AND column_name = 'reported_id'
  ) THEN
    ALTER TABLE reports RENAME COLUMN reported_id TO reported_user_id;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reports' AND column_name = 'description'
  ) THEN
    ALTER TABLE reports ADD COLUMN description text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reports' AND column_name = 'admin_note'
  ) THEN
    ALTER TABLE reports ADD COLUMN admin_note text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reports' AND column_name = 'action_taken'
  ) THEN
    ALTER TABLE reports ADD COLUMN action_taken text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reports' AND column_name = 'resolved_at'
  ) THEN
    ALTER TABLE reports ADD COLUMN resolved_at timestamptz;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reports' AND column_name = 'resolved_by'
  ) THEN
    ALTER TABLE reports ADD COLUMN resolved_by uuid REFERENCES profiles(id) ON DELETE SET NULL;
  END IF;
END $$;

ALTER TABLE reports DROP CONSTRAINT IF EXISTS reports_status_check;
ALTER TABLE reports ADD CONSTRAINT reports_status_check 
  CHECK (status IN ('pending', 'in_progress', 'resolved', 'rejected'));

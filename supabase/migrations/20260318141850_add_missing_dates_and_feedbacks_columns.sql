/*
  # Add missing columns to dates and feedbacks tables

  1. Modified Tables
    - `dates`
      - `proposed_by` (uuid, FK to profiles) - who proposed the date
      - `notes` (text) - optional notes for the date proposal
    - `feedbacks`
      - `want_to_see_again` (boolean, default false) - whether user wants to see match again

  2. Important Notes
    - These columns are referenced in frontend code but were missing from the schema
    - No existing data is affected (additive changes only)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'dates' AND column_name = 'proposed_by'
  ) THEN
    ALTER TABLE dates ADD COLUMN proposed_by UUID REFERENCES profiles(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'dates' AND column_name = 'notes'
  ) THEN
    ALTER TABLE dates ADD COLUMN notes TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'feedbacks' AND column_name = 'want_to_see_again'
  ) THEN
    ALTER TABLE feedbacks ADD COLUMN want_to_see_again BOOLEAN DEFAULT false;
  END IF;
END $$;
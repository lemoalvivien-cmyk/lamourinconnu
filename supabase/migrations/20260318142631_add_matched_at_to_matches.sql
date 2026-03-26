/*
  # Add matched_at column to matches table

  1. Modified Tables
    - `matches`
      - `matched_at` (timestamptz, nullable) - timestamp when both users accepted the match

  2. Important Notes
    - This column is set by the frontend when a match is accepted
    - Used to order recent matches and display match date
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'matches' AND column_name = 'matched_at'
  ) THEN
    ALTER TABLE matches ADD COLUMN matched_at TIMESTAMPTZ;
  END IF;
END $$;
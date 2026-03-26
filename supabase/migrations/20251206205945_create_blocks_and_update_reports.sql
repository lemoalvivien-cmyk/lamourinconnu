/*
  # Create blocks table and update reports

  1. New Tables
    - `blocks`
      - `id` (uuid, primary key)
      - `blocker_id` (uuid, references profiles)
      - `blocked_id` (uuid, references profiles)
      - `created_at` (timestamptz)
      - Unique constraint on (blocker_id, blocked_id)
  
  2. Changes to reports table
    - Add `blocked` column (boolean, default false)
    - Indicates if the reporter also blocked the reported user
  
  3. Security
    - Enable RLS on `blocks` table
    - Add policy for users to manage their own blocks
    - Only the blocker can see their blocks
    
  4. Important Notes
    - Blocks are one-directional (A blocks B doesn't mean B blocks A)
    - Blocked users should not appear in match suggestions
    - A user cannot signal the same person multiple times
*/

-- Add blocked column to reports table
ALTER TABLE reports ADD COLUMN IF NOT EXISTS blocked BOOLEAN DEFAULT false;

-- Create blocks table
CREATE TABLE IF NOT EXISTS blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  blocked_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(blocker_id, blocked_id)
);

-- Enable RLS on blocks table
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own blocks
CREATE POLICY "Users can read own blocks"
  ON blocks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = blocker_id);

-- Policy: Users can create their own blocks
CREATE POLICY "Users can create own blocks"
  ON blocks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = blocker_id);

-- Policy: Users can delete their own blocks
CREATE POLICY "Users can delete own blocks"
  ON blocks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = blocker_id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_blocks_blocker_id ON blocks(blocker_id);
CREATE INDEX IF NOT EXISTS idx_blocks_blocked_id ON blocks(blocked_id);

-- Add constraint to prevent self-blocking
ALTER TABLE blocks ADD CONSTRAINT no_self_blocking CHECK (blocker_id != blocked_id);

/*
  # Restrict profiles SELECT policy to authenticated users

  ## Description
  The original profiles SELECT policy used USING(true) without a TO clause,
  meaning anonymous/unauthenticated requests could read ALL profiles including
  emails. This migration restricts it to authenticated users only.

  ## Security Changes
    - Drop the permissive "Users can view all profiles" policy
    - Create new policy restricted TO authenticated
    - Users can still see all profiles (needed for matching display)
    - But anonymous API calls can no longer read the profiles table

  ## Important Notes
    - The daily-matching edge function uses service_role key which bypasses RLS
    - Frontend queries still work because users are authenticated
    - This prevents unauthenticated data scraping
*/

DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;

CREATE POLICY "Authenticated users can view profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

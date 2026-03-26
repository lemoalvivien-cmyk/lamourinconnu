/*
  # Fonction de création automatique du profil

  ## Description
  Crée automatiquement un profil dans la table profiles
  lorsqu'un utilisateur s'inscrit via Supabase Auth.

  ## Fonctionnement
  - Trigger automatique sur auth.users
  - Crée le profil avec l'email et l'ID de l'utilisateur
  - Attribution du rôle 'member' par défaut
*/

-- Fonction pour créer automatiquement un profil
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'member');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger sur la table auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

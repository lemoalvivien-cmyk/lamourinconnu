/*
  SETUP TEST MODE - L'Amour Inconnu

  Ce script configure la plateforme en mode test gratuit et crée le compte admin.

  INSTRUCTIONS :
  1. Exécuter ce SQL dans Supabase SQL Editor
  2. Puis créer manuellement le compte admin dans l'interface Supabase Auth
*/

-- =====================================================
-- 1. CONFIGURATION MODE TEST GRATUIT
-- =====================================================

-- Désactiver le mode paiement par défaut
INSERT INTO platform_settings (setting_key, setting_value)
VALUES ('payment_enabled', 'false')
ON CONFLICT (setting_key)
DO UPDATE SET setting_value = 'false';

-- Message de bienvenue pour mode test
INSERT INTO platform_settings (setting_key, setting_value)
VALUES ('dashboard_welcome_message', '🧪 Bienvenue en mode test ! La plateforme est 100% gratuite pendant les premières semaines.')
ON CONFLICT (setting_key)
DO UPDATE SET setting_value = '🧪 Bienvenue en mode test ! La plateforme est 100% gratuite pendant les premières semaines.';

-- =====================================================
-- 2. CRÉATION DU COMPTE ADMIN
-- =====================================================

/*
  ÉTAPE 1 : Créer l'utilisateur dans Supabase Auth Dashboard

  - Aller sur : Dashboard > Authentication > Users > Add user
  - Email: lemoalvivien@gmail.com
  - Password: Emilie1983$
  - Cliquer sur "Create user"
  - L'utilisateur sera créé avec un ID unique

  ÉTAPE 2 : Exécuter le SQL ci-dessous APRÈS avoir créé le compte
  (Remplacer USER_ID par l'ID réel généré dans l'étape 1)
*/

-- Attribuer le rôle admin au compte créé
-- ⚠️ IMPORTANT : Remplacer 'USER_ID_ICI' par l'ID réel du compte créé dans Auth
UPDATE profiles
SET
  role = 'admin',
  is_profile_complete = true
WHERE email = 'lemoalvivien@gmail.com';

-- Alternative : Si le profil n'existe pas encore, cette fonction le créera automatiquement
-- lors de la première connexion grâce au trigger create_profile_on_signup

-- =====================================================
-- 3. VÉRIFICATION
-- =====================================================

-- Vérifier que payment_enabled est bien sur false
SELECT setting_key, setting_value
FROM platform_settings
WHERE setting_key = 'payment_enabled';

-- Vérifier que le compte admin existe (après connexion)
SELECT id, email, role
FROM profiles
WHERE email = 'lemoalvivien@gmail.com';

/*
  NOTES IMPORTANTES :

  1. Mode Test Gratuit :
     - payment_enabled = false par défaut
     - Tous les utilisateurs ont accès à toutes les fonctionnalités
     - Pas de limite de RDV
     - Pas d'affichage du bouton Stripe

  2. Compte Admin :
     - Email: lemoalvivien@gmail.com
     - Mot de passe: Emilie1983$
     - Accès au dashboard admin : /admin
     - Peut activer/désactiver le mode paiement

  3. Pour Activer le Mode Payant :
     - Se connecter avec le compte admin
     - Aller sur /admin/settings
     - Toggle "Activer les paiements" sur ON
     - Configurer le lien Stripe Payment Link

  4. Bannière de Test :
     - Visible sur toutes les pages
     - Email de contact : contact@vlmconsulting.fr
     - Peut être retirée en supprimant le composant TestModeBanner
*/

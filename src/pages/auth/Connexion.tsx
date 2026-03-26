import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/ui/Card';
import { LoginForm } from '../../components/auth/LoginForm';
import { ROUTES } from '../../lib/constants';

export function Connexion() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string, _rememberMe: boolean) => {
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      if (err.message?.includes('Invalid login credentials')) {
        setError('Identifiants incorrects. Veuillez réessayer.');
      } else if (err.message?.includes('Email not confirmed')) {
        setError('Veuillez confirmer votre email avant de vous connecter.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            Bon retour parmi nous
          </h1>
          <p className="text-gray-400">Connectez-vous à votre compte</p>
        </div>

        <Card>
          <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Pas encore de compte ?{' '}
              <Link to={ROUTES.REGISTER} className="text-accent hover:text-accent/80 transition-colors font-medium">
                Inscrivez-vous
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

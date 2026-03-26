import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/ui/Card';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { ROUTES } from '../../lib/constants';

export function Inscription() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    setError('');
    setLoading(true);

    try {
      await signUp(email, password);
      navigate(ROUTES.PROFILE);
    } catch (err: any) {
      if (err.message?.includes('already registered') || err.message?.includes('User already registered')) {
        setError('Un compte existe déjà avec cet email.');
      } else if (err.message?.includes('invalid email')) {
        setError('Adresse email invalide.');
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
            Créez votre compte
          </h1>
          <p className="text-gray-400">Commencez votre aventure dès maintenant</p>
        </div>

        <Card>
          <RegisterForm onSubmit={handleSubmit} loading={loading} error={error} />

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Déjà un compte ?{' '}
              <Link to={ROUTES.LOGIN} className="text-accent hover:text-accent/80 transition-colors font-medium">
                Connectez-vous
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

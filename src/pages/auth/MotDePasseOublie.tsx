import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ForgotPasswordForm } from '../../components/auth/ForgotPasswordForm';
import { ROUTES } from '../../lib/constants';

export function MotDePasseOublie() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (submittedEmail: string) => {
    setError('');
    setSuccess(false);
    setLoading(true);
    setEmail(submittedEmail);

    try {
      await resetPassword(submittedEmail);
      setSuccess(true);
    } catch (err: any) {
      if (err.message?.includes('User not found')) {
        setError('Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.');
        setSuccess(true);
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
            Mot de passe oublié ?
          </h1>
          <p className="text-gray-400">
            Réinitialisez votre mot de passe en quelques clics
          </p>
        </div>

        <Card>
          <ForgotPasswordForm
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            success={success}
            email={email}
          />

          {!success && (
            <div className="mt-6 text-center">
              <Link
                to={ROUTES.LOGIN}
                className="text-sm text-accent hover:text-accent/80 transition-colors"
              >
                ← Retour à la connexion
              </Link>
            </div>
          )}

          {success && (
            <div className="mt-6 text-center">
              <Link to={ROUTES.LOGIN}>
                <Button variant="accent" size="lg" className="w-full">
                  Retour à la connexion
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ROUTES } from '../../lib/constants';

interface RegisterFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string;
}

export function RegisterForm({ onSubmit, loading, error }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdult, setIsAdult] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!isAdult) {
      setFormError('Vous devez avoir au moins 18 ans pour vous inscrire');
      return;
    }

    if (!acceptTerms) {
      setFormError('Vous devez accepter les conditions d\'utilisation');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 8) {
      setFormError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Veuillez entrer une adresse email valide');
      return;
    }

    await onSubmit(email, password);
  };

  const displayError = error || formError;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {displayError && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
          <p className="text-red-400 text-sm">{displayError}</p>
        </div>
      )}

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.com"
        required
        autoComplete="email"
      />

      <Input
        label="Mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
        autoComplete="new-password"
      />

      <Input
        label="Confirmer le mot de passe"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="••••••••"
        required
        autoComplete="new-password"
      />

      <div className="space-y-3 pt-2">
        <label className="flex items-start gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={isAdult}
            onChange={(e) => setIsAdult(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded border-accent/20 bg-secondary/50 text-accent focus:ring-accent focus:ring-offset-0"
            required
          />
          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
            J'ai 18 ans ou plus <span className="text-red-400">*</span>
          </span>
        </label>

        <label className="flex items-start gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded border-accent/20 bg-secondary/50 text-accent focus:ring-accent focus:ring-offset-0"
            required
          />
          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
            J'accepte les{' '}
            <Link to={ROUTES.CGU} className="text-accent hover:text-accent/80 underline" target="_blank">
              conditions générales d'utilisation
            </Link>
            {' '}et la{' '}
            <Link to={ROUTES.PRIVACY} className="text-accent hover:text-accent/80 underline" target="_blank">
              politique de confidentialité
            </Link>
            {' '}<span className="text-red-400">*</span>
          </span>
        </label>
      </div>

      <Button
        type="submit"
        variant="accent"
        size="lg"
        className="w-full"
        disabled={loading || !isAdult || !acceptTerms}
      >
        {loading ? 'Inscription...' : 'S\'inscrire'}
      </Button>

      <p className="text-xs text-gray-400 text-center">
        <span className="text-red-400">*</span> Champs obligatoires
      </p>
    </form>
  );
}

import { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
  loading: boolean;
  error: string;
  success: boolean;
  email: string;
}

export function ForgotPasswordForm({ onSubmit, loading, error, success, email }: ForgotPasswordFormProps) {
  const [emailInput, setEmailInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      return;
    }

    await onSubmit(emailInput);
  };

  if (success) {
    return (
      <div className="text-center py-4">
        <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 mb-6">
          <p className="text-green-400 mb-2 font-medium">
            Email envoyé avec succès !
          </p>
          <p className="text-gray-300 text-sm">
            Un lien de réinitialisation a été envoyé à <strong>{email}</strong>
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Vérifiez votre boîte de réception et vos spams
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <Input
        label="Email"
        type="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        placeholder="votre@email.com"
        required
        autoComplete="email"
      />

      <p className="text-sm text-gray-400">
        Entrez l'adresse email associée à votre compte. Vous recevrez un lien pour réinitialiser votre mot de passe.
      </p>

      <Button
        type="submit"
        variant="accent"
        size="lg"
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Envoi...' : 'Envoyer le lien'}
      </Button>
    </form>
  );
}

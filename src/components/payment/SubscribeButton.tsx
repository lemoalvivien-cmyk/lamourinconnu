import { useEffect, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/Button';

interface SubscribeButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function SubscribeButton({ className, variant = 'primary' }: SubscribeButtonProps) {
  const [isPaymentEnabled, setIsPaymentEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkPaymentStatus() {
      try {
        const { data } = await supabase
          .from('platform_settings')
          .select('setting_value')
          .eq('setting_key', 'payment_enabled')
          .maybeSingle();

        setIsPaymentEnabled(data?.setting_value === 'true');
      } catch {
        setIsPaymentEnabled(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkPaymentStatus();
  }, []);

  const handleSubscribe = () => {
    const paymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK;

    if (!paymentLink) {
      alert('Le lien de paiement n\'est pas configuré. Contacte le support.');
      return;
    }

    window.open(paymentLink, '_blank');
  };

  if (isLoading) {
    return (
      <Button
        disabled
        variant={variant}
        className={className}
      >
        <Loader2 size={18} className="mr-2 animate-spin" />
        Chargement...
      </Button>
    );
  }

  if (!isPaymentEnabled) {
    return (
      <div className="text-center">
        <Button
          disabled
          variant="outline"
          className={className}
        >
          Bientôt disponible
        </Button>
        <p className="text-sm text-gray-400 mt-2">
          Inscris-toi pour être informé de l'ouverture
        </p>
      </div>
    );
  }

  return (
    <Button
      onClick={handleSubscribe}
      variant={variant}
      className={`bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 ${className}`}
    >
      <Sparkles size={18} className="mr-2" />
      Je prends mon Pass Inconnu
    </Button>
  );
}

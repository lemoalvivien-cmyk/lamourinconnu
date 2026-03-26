import { Heart, Sparkles, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
  age: number;
  score: number;
  onProposeDate: () => void;
}

export function MatchModal({
  isOpen,
  onClose,
  firstName,
  age,
  score,
  onProposeDate,
}: MatchModalProps) {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center p-8">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 animate-ping">
            <Heart className="text-accent w-24 h-24 mx-auto opacity-50" />
          </div>
          <Heart className="text-accent w-24 h-24 mx-auto relative z-10 fill-current" />
        </div>

        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Sparkles className="text-gold" size={32} />
            C'est un Match !
            <Sparkles className="text-gold" size={32} />
          </h2>
          <p className="text-gray-400 text-lg">
            Vous avez tous les deux accepté ce profil mystère
          </p>
        </div>

        <div className="bg-secondary/50 rounded-xl p-6 border-2 border-accent/30 mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {getInitials(firstName)}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {firstName}, {age} ans
          </h3>
          <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full">
            <span className="text-accent font-bold text-xl">{score}%</span>
            <span className="text-gray-300">de compatibilité</span>
          </div>
        </div>

        <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-gold flex items-center justify-center gap-2">
            <Sparkles size={16} />
            Vous pouvez maintenant organiser votre premier rendez-vous mystère
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            variant="accent"
            size="lg"
            className="w-full"
            onClick={onProposeDate}
          >
            <Calendar size={20} className="mr-2" />
            Proposer un rendez-vous
          </Button>
          <Button variant="secondary" className="w-full" onClick={onClose}>
            Plus tard
          </Button>
        </div>
      </div>
    </Modal>
  );
}

import { useState } from 'react';
import { Star, Heart, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { cn } from '../../lib/utils';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
  dateId: string;
  onSubmit: (data: {
    dateId: string;
    rating: number;
    comment: string;
    wantToSeeAgain: boolean;
  }) => Promise<void>;
}

export function FeedbackModal({
  isOpen,
  onClose,
  firstName,
  dateId,
  onSubmit,
}: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [wantToSeeAgain, setWantToSeeAgain] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('Merci de donner une note');
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        dateId,
        rating,
        comment,
        wantToSeeAgain,
      });

      setRating(0);
      setHoverRating(0);
      setComment('');
      setWantToSeeAgain(false);
      onClose();
    } catch (err) {
      setError('Une erreur est survenue. Réessaie.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setRating(0);
      setHoverRating(0);
      setComment('');
      setWantToSeeAgain(false);
      setError('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Comment s'est passé ton RDV ?
        </h2>
        <p className="text-gray-400 mb-6">
          Avec <span className="text-white font-medium">{firstName}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-3">
              Note générale <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={40}
                    className={cn(
                      'transition-colors',
                      star <= (hoverRating || rating)
                        ? 'fill-gold text-gold'
                        : 'text-gray-600'
                    )}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-gray-400 mt-2">
                {rating === 1 && 'Pas terrible'}
                {rating === 2 && 'Moyen'}
                {rating === 3 && 'Bien'}
                {rating === 4 && 'Très bien'}
                {rating === 5 && 'Excellent !'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Tu veux nous en dire plus ? (optionnel)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Partage ton ressenti sur ce rendez-vous..."
              rows={4}
              className="w-full px-4 py-3 bg-secondary border-2 border-secondary rounded-lg text-white placeholder-gray-500 focus:border-accent focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={wantToSeeAgain}
                onChange={(e) => setWantToSeeAgain(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-2 border-accent bg-transparent checked:bg-accent checked:border-accent focus:ring-accent focus:ring-2 cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Heart size={16} className="text-accent" />
                  <span className="text-white font-medium">
                    Je souhaite revoir cette personne
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Si {firstName} partage ce sentiment, nous vous mettrons en relation directe
                </p>
              </div>
            </label>
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
            <p className="text-xs text-gray-400 flex items-start gap-2">
              <AlertCircle className="flex-shrink-0 mt-0.5 text-accent" size={14} />
              <span>
                Ton feedback est anonyme et confidentiel. Il nous aide à améliorer nos
                recommandations et l'expérience de nos membres.
              </span>
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={handleClose}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="accent"
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Envoi...' : 'Envoyer mon feedback'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

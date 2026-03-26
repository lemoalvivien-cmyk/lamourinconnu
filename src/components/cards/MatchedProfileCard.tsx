import { MapPin, Heart, Calendar, Flag } from 'lucide-react';
import { Button } from '../ui/Button';

interface MatchedProfileCardProps {
  matchId: string;
  userId: string;
  firstName: string;
  age: number;
  city: string;
  score: number;
  matchedAt: string;
  onProposeDate: (matchId: string) => void;
  onReport?: (userId: string, userName: string) => void;
}

export function MatchedProfileCard({
  matchId,
  userId,
  firstName,
  age,
  city,
  score,
  matchedAt,
  onProposeDate,
  onReport,
}: MatchedProfileCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-secondary/50 rounded-xl p-6 border-2 border-secondary hover:border-accent/50 transition-all relative">
      {onReport && (
        <button
          onClick={() => onReport(userId, firstName)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          title="Signaler ce profil"
        >
          <Flag size={16} />
        </button>
      )}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-accent to-gold rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {getInitials(firstName)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white mb-1">
            {firstName}, {age} ans
          </h3>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <MapPin size={14} />
            <span>{city}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-accent">{score}%</div>
          <p className="text-xs text-gray-400">compatibilité</p>
        </div>
      </div>

      <div className="bg-primary/50 rounded-lg p-4 mb-6 border border-accent/20">
        <div className="flex items-center gap-2 text-sm">
          <Heart className="text-accent" size={16} />
          <span className="text-gray-300">
            Match depuis le{' '}
            <span className="text-white font-medium">{formatDate(matchedAt)}</span>
          </span>
        </div>
      </div>

      <Button
        variant="accent"
        className="w-full"
        onClick={() => onProposeDate(matchId)}
      >
        <Calendar size={18} className="mr-2" />
        Proposer un rendez-vous
      </Button>
    </div>
  );
}

import { MapPin, Heart, X, Users, Flag } from 'lucide-react';
import { Button } from '../ui/Button';

interface MysteryProfileCardProps {
  matchId: string;
  userId?: string;
  score: number;
  age: number;
  city: string;
  distance: number;
  commonInterests: string[];
  relationType: string;
  wantKids: string;
  smoking: string;
  onAccept: (matchId: string) => void;
  onDecline: (matchId: string) => void;
  onReport?: (userId: string, userName: string) => void;
  loading?: boolean;
}

export function MysteryProfileCard({
  matchId,
  userId,
  score,
  age,
  city,
  distance,
  commonInterests,
  relationType,
  wantKids,
  smoking,
  onAccept,
  onDecline,
  onReport,
  loading,
}: MysteryProfileCardProps) {
  const relationLabels: Record<string, string> = {
    serieux: 'Relation sérieuse',
    fun: 'Fun et détente',
    a_voir: 'À voir',
  };

  const kidsLabels: Record<string, string> = {
    oui: 'Veut des enfants',
    non: 'Ne veut pas d\'enfants',
    plus_tard: 'Enfants plus tard',
    deja: 'A déjà des enfants',
  };

  const smokingLabels: Record<string, string> = {
    oui: 'Fumeur',
    non: 'Non-fumeur',
    occasionnel: 'Fumeur occasionnel',
  };

  return (
    <div className="bg-secondary/50 rounded-xl p-6 border-2 border-secondary hover:border-accent/50 transition-all relative">
      {onReport && userId && (
        <button
          onClick={() => onReport(userId, 'Profil mystère')}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          title="Signaler ce profil"
        >
          <Flag size={16} />
        </button>
      )}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-accent/20 to-gold/20 rounded-full flex items-center justify-center mb-4 border-2 border-accent/30">
          <Users className="text-accent" size={40} />
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="text-3xl font-bold text-accent">{score}%</div>
          </div>
          <p className="text-sm text-gray-400">de compatibilité</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 text-gray-300">
          <MapPin size={18} className="text-accent flex-shrink-0" />
          <span className="text-sm">
            {city} ({distance}km)
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-300">
          <span className="text-lg flex-shrink-0">🎂</span>
          <span className="text-sm">{age} ans</span>
        </div>
      </div>

      <div className="border-t border-secondary pt-4 mb-6">
        <h4 className="text-sm font-semibold text-white mb-3">Points communs</h4>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5">✓</span>
            <span className="text-sm text-gray-300">{relationLabels[relationType]}</span>
          </div>
          {commonInterests.slice(0, 3).map((interest, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span className="text-sm text-gray-300 capitalize">{interest}</span>
            </div>
          ))}
          <div className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5">✓</span>
            <span className="text-sm text-gray-300">{smokingLabels[smoking]}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5">✓</span>
            <span className="text-sm text-gray-300">{kidsLabels[wantKids]}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => onDecline(matchId)}
          disabled={loading}
        >
          <X size={18} className="mr-2" />
          Passer
        </Button>
        <Button
          variant="accent"
          className="flex-1"
          onClick={() => onAccept(matchId)}
          disabled={loading}
        >
          <Heart size={18} className="mr-2" />
          Accepter
        </Button>
      </div>
    </div>
  );
}

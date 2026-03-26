import { Calendar, MapPin, User, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface PastDateCardProps {
  dateId: string;
  firstName: string;
  age: number;
  dateTime: string;
  location: string;
  hasFeedback: boolean;
  onLeaveFeedback: (dateId: string) => void;
}

export function PastDateCard({
  dateId,
  firstName,
  age,
  dateTime,
  location,
  hasFeedback,
  onLeaveFeedback,
}: PastDateCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayName = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(date);
    const dateFormatted = new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);

    return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${dateFormatted}`;
  };

  return (
    <div className="bg-secondary/30 rounded-xl p-5 border border-secondary hover:border-accent/30 transition-all">
      <div className="flex items-start gap-3 mb-3">
        <Calendar className="text-gray-500 flex-shrink-0 mt-1" size={20} />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1">{formatDate(dateTime)}</h3>
        </div>
      </div>

      <div className="pl-8 space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-400">
          <User size={16} className="flex-shrink-0" />
          <span className="text-sm">
            {firstName}, {age} ans
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-400">
          <MapPin size={16} className="flex-shrink-0" />
          <span className="text-sm">{location}</span>
        </div>
      </div>

      <div className="pl-8">
        {hasFeedback ? (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <CheckCircle2 size={16} />
            <span>Feedback envoyé</span>
          </div>
        ) : (
          <Button
            variant="accent"
            size="sm"
            onClick={() => onLeaveFeedback(dateId)}
            className="flex items-center gap-2"
          >
            <MessageSquare size={16} />
            Laisser un feedback
          </Button>
        )}
      </div>
    </div>
  );
}

import { Calendar, Clock, MapPin, Navigation, Edit, XCircle, CheckCircle2, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface DateTimelineCardProps {
  dateId: string;
  firstName: string;
  age: number;
  dateTime: string;
  location: string;
  locationAddress: string;
  status: 'pending' | 'confirmed';
  onGetDirections: (location: string) => void;
  onModify: (dateId: string) => void;
  onCancel: (dateId: string) => void;
}

export function DateTimelineCard({
  dateId,
  firstName,
  age,
  dateTime,
  location,
  locationAddress,
  status,
  onGetDirections,
  onModify,
  onCancel,
}: DateTimelineCardProps) {
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isTomorrow = (dateString: string) => {
    const date = new Date(dateString);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.toDateString() === tomorrow.toDateString();
  };

  const getDateLabel = () => {
    if (isToday(dateTime)) {
      return <Badge variant="gold" className="ml-2">Aujourd'hui</Badge>;
    }
    if (isTomorrow(dateTime)) {
      return <Badge variant="gold" className="ml-2">Demain</Badge>;
    }
    return null;
  };

  return (
    <div className="bg-secondary/50 rounded-xl p-6 border-2 border-secondary hover:border-accent/50 transition-all">
      <div className="flex items-start gap-3 mb-4">
        <Calendar className="text-accent flex-shrink-0 mt-1" size={24} />
        <div className="flex-1">
          <div className="flex items-center flex-wrap gap-2">
            <h3 className="text-xl font-bold text-white">{formatDate(dateTime)}</h3>
            {getDateLabel()}
          </div>
        </div>
        {status === 'confirmed' ? (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle2 size={14} />
            Confirmé
          </Badge>
        ) : (
          <Badge variant="warning" className="flex items-center gap-1">
            <Clock size={14} />
            En attente
          </Badge>
        )}
      </div>

      <div className="pl-9 space-y-4">
        <div className="flex items-center gap-3 text-gray-300">
          <Clock size={18} className="text-accent" />
          <span className="text-lg font-medium">{formatTime(dateTime)}</span>
        </div>

        <div className="bg-primary/50 rounded-lg p-4 border border-accent/20">
          <div className="flex items-start gap-3 mb-3">
            <MapPin className="text-accent flex-shrink-0 mt-1" size={18} />
            <div>
              <p className="text-white font-semibold">{location}</p>
              <p className="text-sm text-gray-400 mt-1">{locationAddress}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <User className="text-gold flex-shrink-0 mt-1" size={18} />
            <div>
              <p className="text-white font-medium">
                {firstName}, {age} ans
              </p>
            </div>
          </div>
        </div>

        {status === 'pending' && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
            <p className="text-sm text-yellow-400">
              En attente de la confirmation de {firstName}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            variant="accent"
            size="sm"
            onClick={() => onGetDirections(`${location}, ${locationAddress}`)}
            className="flex items-center gap-2"
          >
            <Navigation size={16} />
            Itinéraire
          </Button>
          {status === 'pending' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onModify(dateId)}
              className="flex items-center gap-2"
            >
              <Edit size={16} />
              Modifier
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCancel(dateId)}
            className="flex items-center gap-2"
          >
            <XCircle size={16} />
            Annuler
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Calendar, MapPin, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface DateCardProps {
  dateId: string;
  matchId: string;
  firstName: string;
  age: number;
  dateTime: string;
  location: string;
  status: 'pending' | 'confirmed' | 'canceled' | 'completed';
  onViewDetails: (dateId: string) => void;
  onCancel: (dateId: string) => void;
}

export function DateCard({
  dateId,
  firstName,
  age,
  dateTime,
  location,
  status,
  onViewDetails,
  onCancel,
}: DateCardProps) {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const dayName = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(date);
    const dateFormatted = new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
    }).format(date);
    const time = new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);

    return {
      dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
      date: dateFormatted,
      time,
    };
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle2 size={14} />
            Confirmé
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <AlertCircle size={14} />
            En attente
          </Badge>
        );
      case 'canceled':
        return (
          <Badge variant="error" className="flex items-center gap-1">
            <XCircle size={14} />
            Annulé
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle2 size={14} />
            Terminé
          </Badge>
        );
      default:
        return null;
    }
  };

  const { dayName, date, time } = formatDateTime(dateTime);
  const isPast = new Date(dateTime) < new Date();
  const canCancel = status === 'pending' || status === 'confirmed';

  return (
    <div className="bg-secondary/50 rounded-xl p-6 border-2 border-secondary hover:border-accent/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-gold rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
            {getInitials(firstName)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {firstName}, {age} ans
            </h3>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      <div className="space-y-3 mb-6 bg-primary/30 rounded-lg p-4 border border-accent/20">
        <div className="flex items-start gap-3">
          <Calendar className="text-accent flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-white font-medium">
              {dayName} {date}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="text-accent flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-white font-medium">{time}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="text-accent flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-white font-medium">{location}</p>
          </div>
        </div>
      </div>

      {isPast && status === 'completed' && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
          <p className="text-sm text-green-400">
            Rendez-vous passé. On espère que ça s'est bien passé !
          </p>
        </div>
      )}

      {status === 'canceled' && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
          <p className="text-sm text-red-400">Ce rendez-vous a été annulé.</p>
        </div>
      )}

      <div className="flex gap-3">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => onViewDetails(dateId)}
        >
          Voir les détails
        </Button>
        {canCancel && !isPast && (
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onCancel(dateId)}
          >
            Annuler
          </Button>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Calendar, MapPin, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';

interface ProposeDateModalProps {
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
  matchId: string;
  onSubmit: (data: {
    matchId: string;
    dateTime: string;
    location: string;
    notes: string;
  }) => Promise<void>;
}

export function ProposeDateModal({
  isOpen,
  onClose,
  firstName,
  matchId,
  onSubmit,
}: ProposeDateModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    notes: '',
  });

  const getMinDateTime = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.date || !formData.time || !formData.location) {
      setError('Tous les champs obligatoires doivent être remplis');
      return;
    }

    const dateTime = `${formData.date}T${formData.time}:00`;
    const proposedDateTime = new Date(dateTime);

    if (proposedDateTime < new Date()) {
      setError('La date et l\'heure doivent être dans le futur');
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        matchId,
        dateTime,
        location: formData.location,
        notes: formData.notes,
      });

      setFormData({ date: '', time: '', location: '', notes: '' });
      onClose();
    } catch (err) {
      setError('Une erreur est survenue. Réessaie.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ date: '', time: '', location: '', notes: '' });
      setError('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Proposer un rendez-vous
        </h2>
        <p className="text-gray-400 mb-6">
          Propose un lieu et une date à {firstName}. Il/Elle recevra ta proposition et pourra
          l'accepter ou proposer une alternative.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Date <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={getMinDateTime()}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Heure <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Clock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Lieu <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Café de Flore, Paris 6e"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Message (optionnel)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Ajoute un petit message..."
              rows={3}
              className="w-full px-4 py-3 bg-secondary border-2 border-secondary rounded-lg text-white placeholder-gray-500 focus:border-accent focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <p className="text-sm text-gray-300 flex items-start gap-2">
              <AlertCircle className="flex-shrink-0 mt-0.5 text-accent" size={16} />
              <span>
                Ce rendez-vous restera mystère : vous ne connaîtrez pas vos identités avant le
                jour J. Un code secret vous sera envoyé pour vous reconnaître.
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
              {loading ? 'Envoi...' : 'Envoyer la proposition'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

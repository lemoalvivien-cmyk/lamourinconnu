import { useState } from 'react';
import { Calendar, Clock, Loader2 } from 'lucide-react';
import { useDates } from '../../hooks/useDates';
import { DateTimelineCard } from '../../components/dates/DateTimelineCard';
import { PastDateCard } from '../../components/dates/PastDateCard';
import { FeedbackModal } from '../../components/dates/FeedbackModal';
import { Badge } from '../../components/ui/Badge';

export function RendezVous() {
  const [selectedDateForFeedback, setSelectedDateForFeedback] = useState<any>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const {
    upcomingDates,
    pastDates,
    monthlyCount,
    loading,
    error,
    cancelDate,
    submitFeedback,
  } = useDates();

  const calculateAge = (birthdate?: string): number => {
    if (!birthdate) return 0;
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleGetDirections = (location: string) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(mapsUrl, '_blank');
  };

  const handleModify = (_dateId: string) => {
    // TODO: implement date modification
  };

  const handleCancel = async (dateId: string) => {
    if (confirm('Es-tu sûr de vouloir annuler ce rendez-vous ?')) {
      try {
        await cancelDate(dateId);
      } catch {
        // Error is handled by the useDates hook
      }
    }
  };

  const handleLeaveFeedback = (date: any) => {
    setSelectedDateForFeedback(date);
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = async (data: {
    dateId: string;
    rating: number;
    comment: string;
    wantToSeeAgain: boolean;
  }) => {
    await submitFeedback(data);
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                Mes Rendez-vous
              </h1>
              <p className="text-gray-400">Gère tes rencontres mystère</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Badge
                  variant="experimental"
                  className="text-lg px-4 py-2"
                >
                  {monthlyCount} RDV
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">Ce mois</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-accent" size={40} />
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-white">À venir</h2>
              </div>

              {upcomingDates.length === 0 ? (
                <div className="bg-secondary/50 rounded-xl p-12 text-center border-2 border-secondary">
                  <Calendar className="text-gray-500 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Aucun rendez-vous prévu pour le moment
                  </h3>
                  <p className="text-gray-400">
                    Accepte des matchs et propose des rendez-vous pour commencer l'aventure !
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingDates.map((date) => {
                    const profile = date.match?.profile;
                    const age = profile?.age || calculateAge(profile?.birthdate);

                    return (
                      <DateTimelineCard
                        key={date.id}
                        dateId={date.id}
                        firstName={profile?.first_name || 'Mystère'}
                        age={age}
                        dateTime={date.scheduled_at}
                        location={date.location_name}
                        locationAddress={date.location_address || ''}
                        status={date.status as any}
                        onGetDirections={handleGetDirections}
                        onModify={handleModify}
                        onCancel={handleCancel}
                      />
                    );
                  })}
                </div>
              )}
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-gray-400" size={28} />
                <h2 className="text-2xl font-bold text-white">Historique</h2>
              </div>

              {pastDates.length === 0 ? (
                <div className="bg-secondary/30 rounded-xl p-12 text-center border border-secondary">
                  <Clock className="text-gray-500 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-bold text-white mb-2">Aucun rendez-vous passé</h3>
                  <p className="text-gray-400">
                    Tes rendez-vous passés apparaîtront ici après avoir eu lieu.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pastDates.map((date) => {
                    const profile = date.match?.profile;
                    const age = profile?.age || calculateAge(profile?.birthdate);

                    return (
                      <PastDateCard
                        key={date.id}
                        dateId={date.id}
                        firstName={profile?.first_name || 'Mystère'}
                        age={age}
                        dateTime={date.scheduled_at}
                        location={date.location_name}
                        hasFeedback={!!date.feedback}
                        onLeaveFeedback={() => handleLeaveFeedback(date)}
                      />
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        )}
      </div>

      {selectedDateForFeedback && (
        <FeedbackModal
          isOpen={showFeedbackModal}
          onClose={() => {
            setShowFeedbackModal(false);
            setSelectedDateForFeedback(null);
          }}
          firstName={
            selectedDateForFeedback.match?.profile?.first_name || 'Mystère'
          }
          dateId={selectedDateForFeedback.id}
          onSubmit={handleSubmitFeedback}
        />
      )}
    </div>
  );
}

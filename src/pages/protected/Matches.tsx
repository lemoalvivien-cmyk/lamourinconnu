import { useState } from 'react';
import { Heart, Users, Calendar, Loader2 } from 'lucide-react';
import { useMatches } from '../../hooks/useMatches';
import { MysteryProfileCard } from '../../components/cards/MysteryProfileCard';
import { MatchedProfileCard } from '../../components/cards/MatchedProfileCard';
import { DateCard } from '../../components/cards/DateCard';
import { MatchModal } from '../../components/modals/MatchModal';
import { ProposeDateModal } from '../../components/modals/ProposeDateModal';
import { ReportModal } from '../../components/modals/ReportModal';
import { cn } from '../../lib/utils';

type TabType = 'proposed' | 'accepted' | 'dates';

export function Matches() {
  const [activeTab, setActiveTab] = useState<TabType>('proposed');
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [reportUserId, setReportUserId] = useState<string>('');
  const [reportUserName, setReportUserName] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const {
    proposedMatches,
    acceptedMatches,
    dates,
    loading,
    error,
    acceptMatch,
    declineMatch,
    proposeDate,
    cancelDate,
  } = useMatches();

  const handleAccept = async (matchId: string) => {
    setActionLoading(matchId);
    try {
      const isFullMatch = await acceptMatch(matchId);

      if (isFullMatch) {
        const match = proposedMatches.find((m) => m.id === matchId);
        if (match) {
          setSelectedMatch(match);
          setShowMatchModal(true);
        }
      }
    } catch {
      // Error is propagated by the hook
    } finally {
      setActionLoading(null);
    }
  };

  const handleDecline = async (matchId: string) => {
    setActionLoading(matchId);
    try {
      await declineMatch(matchId);
    } catch {
      // Error is propagated by the hook
    } finally {
      setActionLoading(null);
    }
  };

  const handleOpenDateModal = (match: any) => {
    setSelectedMatch(match);
    setShowDateModal(true);
  };

  const handleProposeDate = async (data: {
    matchId: string;
    dateTime: string;
    location: string;
    notes: string;
  }) => {
    await proposeDate(data);
  };

  const handleCancelDate = async (dateId: string) => {
    if (confirm('Es-tu sûr de vouloir annuler ce rendez-vous ?')) {
      await cancelDate(dateId);
    }
  };

  const handleViewDetails = (_dateId: string) => {
    // TODO: implement date details view
  };

  const handleReport = (userId: string, userName: string) => {
    setReportUserId(userId);
    setReportUserName(userName);
    setShowReportModal(true);
  };

  const calculateAge = (birthdate: string): number => {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const tabs = [
    {
      id: 'proposed' as TabType,
      label: 'Proposés',
      icon: Users,
      count: proposedMatches.length,
    },
    {
      id: 'accepted' as TabType,
      label: 'Acceptés',
      icon: Heart,
      count: acceptedMatches.length,
    },
    {
      id: 'dates' as TabType,
      label: 'Rendez-vous',
      icon: Calendar,
      count: dates.length,
    },
  ];

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
            Tes Matchs
          </h1>
          <p className="text-gray-400">
            Découvre tes profils mystère et organise tes rendez-vous
          </p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap',
                  'border-2',
                  activeTab === tab.id
                    ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20'
                    : 'bg-secondary border-secondary text-gray-400 hover:border-accent/50 hover:text-white'
                )}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-xs font-bold',
                      activeTab === tab.id
                        ? 'bg-white text-accent'
                        : 'bg-accent/20 text-accent'
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
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
          <>
            {activeTab === 'proposed' && (
              <div>
                {proposedMatches.length === 0 ? (
                  <div className="bg-secondary/50 rounded-xl p-12 text-center border-2 border-secondary">
                    <Users className="text-gray-500 mx-auto mb-4" size={48} />
                    <h3 className="text-xl font-bold text-white mb-2">
                      Pas de nouveau match pour le moment
                    </h3>
                    <p className="text-gray-400">
                      Ton profil est analysé chaque jour ! Reviens bientôt pour découvrir de
                      nouvelles propositions.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {proposedMatches.map((match) => {
                      const age = match.profile?.age || (match.profile?.birthdate ? calculateAge(match.profile.birthdate) : 0);
                      const otherUserId = match.profile?.id || match.user_b_id;

                      return (
                        <MysteryProfileCard
                          key={match.id}
                          matchId={match.id}
                          userId={otherUserId}
                          score={match.compatibility_score}
                          age={age}
                          city={match.profile?.city || 'Inconnu'}
                          distance={match.distance || 0}
                          commonInterests={match.common_interests || []}
                          relationType={match.profile?.relation_type || 'a_voir'}
                          wantKids={match.profile?.want_kids || 'non'}
                          smoking={match.profile?.smoking || 'non'}
                          onAccept={handleAccept}
                          onDecline={handleDecline}
                          onReport={handleReport}
                          loading={actionLoading === match.id}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'accepted' && (
              <div>
                {acceptedMatches.length === 0 ? (
                  <div className="bg-secondary/50 rounded-xl p-12 text-center border-2 border-secondary">
                    <Heart className="text-gray-500 mx-auto mb-4" size={48} />
                    <h3 className="text-xl font-bold text-white mb-2">
                      Tu n'as pas encore de match mutuel
                    </h3>
                    <p className="text-gray-400">
                      Continue à explorer les propositions pour trouver des profils compatibles !
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {acceptedMatches.map((match) => {
                      const age = match.profile?.age || (match.profile?.birthdate ? calculateAge(match.profile.birthdate) : 0);
                      const otherUserId = match.profile?.id || match.user_b_id;

                      return (
                        <MatchedProfileCard
                          key={match.id}
                          matchId={match.id}
                          userId={otherUserId}
                          firstName={match.profile?.first_name || 'Mystère'}
                          age={age}
                          city={match.profile?.city || 'Inconnu'}
                          score={match.compatibility_score}
                          matchedAt={match.matched_at}
                          onProposeDate={() => handleOpenDateModal(match)}
                          onReport={handleReport}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'dates' && (
              <div>
                {dates.length === 0 ? (
                  <div className="bg-secondary/50 rounded-xl p-12 text-center border-2 border-secondary">
                    <Calendar className="text-gray-500 mx-auto mb-4" size={48} />
                    <h3 className="text-xl font-bold text-white mb-2">
                      Tu n'as pas encore de rendez-vous
                    </h3>
                    <p className="text-gray-400">
                      Propose un rendez-vous à l'un de tes matchs acceptés !
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dates.map((date) => {
                      const profile = date.match?.profile;
                      const age = profile?.age || (profile?.birthdate ? calculateAge(profile.birthdate) : 0);

                      return (
                        <DateCard
                          key={date.id}
                          dateId={date.id}
                          matchId={date.match_id}
                          firstName={profile?.first_name || 'Mystère'}
                          age={age}
                          dateTime={date.scheduled_at}
                          location={date.location_name}
                          status={date.status as any}
                          onViewDetails={handleViewDetails}
                          onCancel={handleCancelDate}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {selectedMatch && (
        <>
          <MatchModal
            isOpen={showMatchModal}
            onClose={() => {
              setShowMatchModal(false);
              setSelectedMatch(null);
            }}
            firstName={selectedMatch.profile?.first_name || 'Mystère'}
            age={selectedMatch.profile?.age || (selectedMatch.profile?.birthdate ? calculateAge(selectedMatch.profile.birthdate) : 0)}
            score={selectedMatch.compatibility_score}
            onProposeDate={() => {
              setShowMatchModal(false);
              setShowDateModal(true);
            }}
          />

          <ProposeDateModal
            isOpen={showDateModal}
            onClose={() => {
              setShowDateModal(false);
              if (!showMatchModal) {
                setSelectedMatch(null);
              }
            }}
            firstName={selectedMatch.profile?.first_name || 'Mystère'}
            matchId={selectedMatch.id}
            onSubmit={handleProposeDate}
          />
        </>
      )}

      <ReportModal
        isOpen={showReportModal}
        onClose={() => {
          setShowReportModal(false);
          setReportUserId('');
          setReportUserName('');
        }}
        preselectedUserId={reportUserId}
        preselectedUserName={reportUserName}
      />
    </div>
  );
}

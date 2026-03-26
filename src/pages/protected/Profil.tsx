import { ProfileForm } from '../../components/forms/ProfileForm';
import { Heart } from 'lucide-react';

export function Profil() {
  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-4">
            <Heart className="text-accent" size={32} />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Complète ton profil
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Quelques informations sur toi pour te proposer les meilleures rencontres possibles.
            Toutes tes données restent confidentielles.
          </p>
        </div>

        <ProfileForm />
      </div>
    </div>
  );
}

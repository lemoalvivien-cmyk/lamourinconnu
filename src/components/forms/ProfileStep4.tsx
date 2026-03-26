import { CheckCircle2, CreditCard as Edit2 } from 'lucide-react';

interface ProfileStep4Props {
  data: {
    gender: string;
    seeking_gender: string;
    birthdate: string;
    city: string;
    postal_code: string;
    max_distance_km: number;
    relation_type: string;
    want_kids: string;
    smoking: string;
    lifestyle_tags: string[];
    bio: string;
  };
  onEditStep: (step: number) => void;
  attestation: boolean;
  onAttestationChange: (checked: boolean) => void;
  errors: Record<string, string>;
}

export function ProfileStep4({
  data,
  onEditStep,
  attestation,
  onAttestationChange,
  errors,
}: ProfileStep4Props) {
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

  const genderLabels: Record<string, string> = {
    homme: 'Homme',
    femme: 'Femme',
    autre: 'Autre',
  };

  const seekingLabels: Record<string, string> = {
    homme: 'Un homme',
    femme: 'Une femme',
    tous: 'Peu importe',
  };

  const relationLabels: Record<string, string> = {
    serieux: 'Relation sérieuse',
    fun: 'Fun et détente',
    a_voir: 'À voir selon le feeling',
  };

  const kidsLabels: Record<string, string> = {
    oui: 'Oui, j\'en veux',
    non: 'Non, je n\'en veux pas',
    plus_tard: 'Peut-être plus tard',
    deja: 'J\'en ai déjà',
  };

  const smokingLabels: Record<string, string> = {
    oui: 'Oui, je fume',
    non: 'Non, je ne fume pas',
    occasionnel: 'Occasionnellement',
  };

  const age = data.birthdate ? calculateAge(data.birthdate) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Récapitulatif de ton profil</h2>
        <p className="text-gray-400 text-sm">
          Vérifie que toutes les informations sont correctes avant de valider
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-secondary/50 rounded-lg p-6 border-2 border-secondary">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="text-green-500" size={20} />
              Informations de base
            </h3>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="text-accent hover:text-accent/80 transition-colors flex items-center gap-1 text-sm"
            >
              <Edit2 size={16} />
              Modifier
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Genre</p>
              <p className="text-white font-medium">{genderLabels[data.gender]}</p>
            </div>
            <div>
              <p className="text-gray-400">Recherche</p>
              <p className="text-white font-medium">{seekingLabels[data.seeking_gender]}</p>
            </div>
            <div>
              <p className="text-gray-400">Âge</p>
              <p className="text-white font-medium">{age} ans</p>
            </div>
            <div>
              <p className="text-gray-400">Localisation</p>
              <p className="text-white font-medium">
                {data.city} ({data.postal_code})
              </p>
            </div>
            <div>
              <p className="text-gray-400">Rayon de recherche</p>
              <p className="text-white font-medium">{data.max_distance_km} km</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-6 border-2 border-secondary">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="text-green-500" size={20} />
              Style de vie
            </h3>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="text-accent hover:text-accent/80 transition-colors flex items-center gap-1 text-sm"
            >
              <Edit2 size={16} />
              Modifier
            </button>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-400">Type de relation</p>
              <p className="text-white font-medium">{relationLabels[data.relation_type]}</p>
            </div>
            <div>
              <p className="text-gray-400">Enfants</p>
              <p className="text-white font-medium">{kidsLabels[data.want_kids]}</p>
            </div>
            <div>
              <p className="text-gray-400">Tabac</p>
              <p className="text-white font-medium">{smokingLabels[data.smoking]}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-2">Centres d'intérêt</p>
              <div className="flex flex-wrap gap-2">
                {data.lifestyle_tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-6 border-2 border-secondary">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="text-green-500" size={20} />
              Description
            </h3>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="text-accent hover:text-accent/80 transition-colors flex items-center gap-1 text-sm"
            >
              <Edit2 size={16} />
              Modifier
            </button>
          </div>
          <div className="text-sm">
            <p className="text-gray-300 italic">&ldquo;{data.bio}&rdquo;</p>
          </div>
        </div>
      </div>

      <div className="bg-accent/10 border-2 border-accent/30 rounded-lg p-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={attestation}
            onChange={(e) => onAttestationChange(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-2 border-accent bg-secondary checked:bg-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary cursor-pointer"
          />
          <div>
            <p className="text-white font-medium">
              J'atteste que ces informations sont exactes
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Les informations fournies serviront à te proposer des profils compatibles. Tu t'engages
              à être honnête pour garantir une expérience de qualité pour tous.
            </p>
          </div>
        </label>
        {errors.attestation && (
          <p className="mt-2 text-sm text-red-400">{errors.attestation}</p>
        )}
      </div>

      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
        <p className="text-sm text-green-400 flex items-center gap-2">
          <CheckCircle2 size={16} />
          Ton profil est prêt à être validé ! Une fois confirmé, tu pourras commencer à recevoir des
          matchs.
        </p>
      </div>
    </div>
  );
}

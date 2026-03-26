import { TagSelector } from '../ui/TagSelector';

interface ProfileStep2Props {
  data: {
    relation_type: string;
    want_kids: string;
    smoking: string;
    lifestyle_tags: string[];
  };
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
}

const LIFESTYLE_TAGS = [
  { id: 'sport', label: 'Sport', emoji: '🏃' },
  { id: 'gaming', label: 'Gaming', emoji: '🎮' },
  { id: 'cinema', label: 'Cinéma', emoji: '🎬' },
  { id: 'lecture', label: 'Lecture', emoji: '📚' },
  { id: 'voyages', label: 'Voyages', emoji: '✈️' },
  { id: 'cuisine', label: 'Cuisine', emoji: '🍳' },
  { id: 'musique', label: 'Musique', emoji: '🎵' },
  { id: 'nature', label: 'Nature', emoji: '🌿' },
  { id: 'art', label: 'Art/Culture', emoji: '🎨' },
  { id: 'animaux', label: 'Animaux', emoji: '🐾' },
  { id: 'sorties', label: 'Sorties', emoji: '🍷' },
  { id: 'tech', label: 'Tech', emoji: '💻' },
];

export function ProfileStep2({ data, errors, onChange }: ProfileStep2Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Ton style de vie</h2>
        <p className="text-gray-400 text-sm">
          Parle-nous de toi et de ce que tu recherches
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Type de relation recherchée <span className="text-red-400">*</span>
        </label>
        <select
          value={data.relation_type}
          onChange={(e) => onChange('relation_type', e.target.value)}
          className="w-full px-4 py-3 bg-secondary border-2 border-secondary rounded-lg text-white focus:border-accent focus:outline-none transition-colors"
        >
          <option value="">Sélectionne...</option>
          <option value="serieux">Relation sérieuse</option>
          <option value="fun">Fun et détente</option>
          <option value="a_voir">À voir selon le feeling</option>
        </select>
        {errors.relation_type && (
          <p className="mt-1 text-sm text-red-400">{errors.relation_type}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Envie d'enfants <span className="text-red-400">*</span>
          </label>
          <select
            value={data.want_kids}
            onChange={(e) => onChange('want_kids', e.target.value)}
            className="w-full px-4 py-3 bg-secondary border-2 border-secondary rounded-lg text-white focus:border-accent focus:outline-none transition-colors"
          >
            <option value="">Sélectionne...</option>
            <option value="oui">Oui, j'en veux</option>
            <option value="non">Non, je n'en veux pas</option>
            <option value="plus_tard">Peut-être plus tard</option>
            <option value="deja">J'en ai déjà</option>
          </select>
          {errors.want_kids && (
            <p className="mt-1 text-sm text-red-400">{errors.want_kids}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Tabac <span className="text-red-400">*</span>
          </label>
          <select
            value={data.smoking}
            onChange={(e) => onChange('smoking', e.target.value)}
            className="w-full px-4 py-3 bg-secondary border-2 border-secondary rounded-lg text-white focus:border-accent focus:outline-none transition-colors"
          >
            <option value="">Sélectionne...</option>
            <option value="oui">Oui, je fume</option>
            <option value="non">Non, je ne fume pas</option>
            <option value="occasionnel">Occasionnellement</option>
          </select>
          {errors.smoking && (
            <p className="mt-1 text-sm text-red-400">{errors.smoking}</p>
          )}
        </div>
      </div>

      <div>
        <TagSelector
          label="Tes centres d'intérêt"
          availableTags={LIFESTYLE_TAGS}
          selectedTags={data.lifestyle_tags}
          onChange={(tags) => onChange('lifestyle_tags', tags)}
          maxSelections={5}
          error={errors.lifestyle_tags}
        />
        <p className="mt-2 text-sm text-gray-400">
          Sélectionne au moins 2 tags qui te correspondent (maximum 5)
        </p>
      </div>

      <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mt-6">
        <p className="text-sm text-gray-300">
          💡 <strong>Astuce :</strong> Les centres d'intérêt communs sont la base de notre
          algorithme de compatibilité. Sois honnête pour trouver les bonnes personnes !
        </p>
      </div>
    </div>
  );
}

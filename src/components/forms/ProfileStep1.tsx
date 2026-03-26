import { Input } from '../ui/Input';
import { RangeSlider } from '../ui/RangeSlider';

interface ProfileStep1Props {
  data: {
    gender: string;
    seeking_gender: string;
    birthdate: string;
    city: string;
    postal_code: string;
    max_distance_km: number;
  };
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
}

export function ProfileStep1({ data, errors, onChange }: ProfileStep1Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Informations de base</h2>
        <p className="text-gray-400 text-sm">
          Ces informations nous aideront à te proposer des profils compatibles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Je suis <span className="text-red-400">*</span>
          </label>
          <select
            value={data.gender}
            onChange={(e) => onChange('gender', e.target.value)}
            className="w-full px-4 py-3 bg-secondary border-2 border-secondary rounded-lg text-white focus:border-accent focus:outline-none transition-colors"
          >
            <option value="">Sélectionne...</option>
            <option value="homme">Un homme</option>
            <option value="femme">Une femme</option>
            <option value="autre">Autre</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-400">{errors.gender}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Je recherche <span className="text-red-400">*</span>
          </label>
          <select
            value={data.seeking_gender}
            onChange={(e) => onChange('seeking_gender', e.target.value)}
            className="w-full px-4 py-3 bg-secondary border-2 border-secondary rounded-lg text-white focus:border-accent focus:outline-none transition-colors"
          >
            <option value="">Sélectionne...</option>
            <option value="homme">Un homme</option>
            <option value="femme">Une femme</option>
            <option value="tous">Peu importe</option>
          </select>
          {errors.seeking_gender && (
            <p className="mt-1 text-sm text-red-400">{errors.seeking_gender}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Date de naissance <span className="text-red-400">*</span>
        </label>
        <Input
          type="date"
          value={data.birthdate}
          onChange={(e) => onChange('birthdate', e.target.value)}
          error={errors.birthdate}
          max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
            .toISOString()
            .split('T')[0]}
        />
        {errors.birthdate && (
          <p className="mt-1 text-sm text-red-400">{errors.birthdate}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">
            Ville <span className="text-red-400">*</span>
          </label>
          <Input
            type="text"
            value={data.city}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="Paris, Lyon, Marseille..."
            error={errors.city}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-400">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Code postal <span className="text-red-400">*</span>
          </label>
          <Input
            type="text"
            value={data.postal_code}
            onChange={(e) => onChange('postal_code', e.target.value)}
            placeholder="75001"
            maxLength={5}
            error={errors.postal_code}
          />
          {errors.postal_code && (
            <p className="mt-1 text-sm text-red-400">{errors.postal_code}</p>
          )}
        </div>
      </div>

      <div>
        <RangeSlider
          label="Rayon de recherche"
          value={data.max_distance_km}
          onChange={(value) => onChange('max_distance_km', value)}
          options={[10, 20, 50, 100]}
          unit="km"
        />
      </div>

      <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mt-6">
        <p className="text-sm text-gray-300">
          💡 <strong>Astuce :</strong> Plus ton rayon de recherche est large, plus tu auras de
          profils compatibles. Tu pourras le modifier à tout moment.
        </p>
      </div>
    </div>
  );
}

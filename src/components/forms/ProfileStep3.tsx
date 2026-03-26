import { useState, useEffect } from 'react';

interface ProfileStep3Props {
  data: {
    bio: string;
  };
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
}

export function ProfileStep3({ data, errors, onChange }: ProfileStep3Props) {
  const [charCount, setCharCount] = useState(data.bio.length);
  const maxChars = 300;
  const minChars = 50;

  useEffect(() => {
    setCharCount(data.bio.length);
  }, [data.bio]);

  const getCharCountColor = () => {
    if (charCount < minChars) return 'text-red-400';
    if (charCount > maxChars * 0.9) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Ta description</h2>
        <p className="text-gray-400 text-sm">
          C'est le moment de te présenter ! Qu'est-ce qui te rend unique ?
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Bio <span className="text-red-400">*</span>
        </label>
        <textarea
          value={data.bio}
          onChange={(e) => {
            if (e.target.value.length <= maxChars) {
              onChange('bio', e.target.value);
            }
          }}
          placeholder="Décris-toi en quelques mots... Ce qui te passionne, ce que tu recherches, ce qui te fait rire..."
          rows={8}
          className="w-full px-4 py-3 bg-secondary border-2 border-secondary rounded-lg text-white placeholder-gray-500 focus:border-accent focus:outline-none transition-colors resize-none"
        />
        <div className="flex items-center justify-between mt-2">
          <div>
            {errors.bio && <p className="text-sm text-red-400">{errors.bio}</p>}
          </div>
          <p className={`text-sm font-medium ${getCharCountColor()}`}>
            {charCount} / {maxChars} caractères
            {charCount < minChars && (
              <span className="text-xs ml-2">(minimum {minChars})</span>
            )}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Quelques idées pour ta bio :</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-secondary/50 rounded-lg p-4 border border-secondary">
            <p className="text-sm text-gray-300">
              ✨ Ce qui te passionne dans la vie
            </p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4 border border-secondary">
            <p className="text-sm text-gray-300">
              🎯 Ce que tu recherches chez quelqu'un
            </p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4 border border-secondary">
            <p className="text-sm text-gray-300">
              🌟 Une qualité dont tu es fier/fière
            </p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4 border border-secondary">
            <p className="text-sm text-gray-300">
              💭 Un détail qui te rend unique
            </p>
          </div>
        </div>
      </div>

      <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
        <p className="text-sm text-gray-300">
          💡 <strong>Astuce :</strong> Reste authentique ! Les profils honnêtes et personnels
          attirent toujours plus que les descriptions génériques. Évite les clichés et montre ta
          vraie personnalité.
        </p>
      </div>
    </div>
  );
}

import { cn } from '../../lib/utils';

interface RangeSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  unit?: string;
  options?: number[];
  error?: string;
}

export function RangeSlider({
  value,
  onChange,
  min = 10,
  max = 100,
  step = 10,
  label,
  unit = 'km',
  options,
  error,
}: RangeSliderProps) {
  const displayOptions = options || generateOptions(min, max, step);

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-white mb-2">
          {label}
        </label>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-1">
              {value}
              <span className="text-2xl text-gray-400 ml-1">{unit}</span>
            </div>
            <p className="text-sm text-gray-400">Rayon de recherche</p>
          </div>
        </div>

        <div className="flex gap-2">
          {displayOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={cn(
                'flex-1 py-3 px-2 rounded-lg text-sm font-medium transition-all',
                'border-2',
                value === option
                  ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20'
                  : 'bg-secondary border-secondary/50 text-gray-400 hover:border-accent/50 hover:text-white'
              )}
            >
              {option}
              {unit}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}

function generateOptions(min: number, max: number, step: number): number[] {
  const options: number[] = [];
  for (let i = min; i <= max; i += step) {
    options.push(i);
  }
  return options;
}

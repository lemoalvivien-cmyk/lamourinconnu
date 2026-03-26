import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Tag {
  id: string;
  label: string;
  emoji: string;
}

interface TagSelectorProps {
  availableTags: Tag[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  maxSelections?: number;
  label?: string;
  error?: string;
}

export function TagSelector({
  availableTags,
  selectedTags,
  onChange,
  maxSelections = 5,
  label,
  error,
}: TagSelectorProps) {
  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onChange(selectedTags.filter((t) => t !== tagId));
    } else {
      if (selectedTags.length < maxSelections) {
        onChange([...selectedTags, tagId]);
      }
    }
  };

  const isSelected = (tagId: string) => selectedTags.includes(tagId);
  const isDisabled = (tagId: string) =>
    !isSelected(tagId) && selectedTags.length >= maxSelections;

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-white mb-3">
          {label}
          <span className="text-gray-400 ml-2">
            ({selectedTags.length}/{maxSelections})
          </span>
        </label>
      )}

      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => {
          const selected = isSelected(tag.id);
          const disabled = isDisabled(tag.id);

          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggleTag(tag.id)}
              disabled={disabled}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                'border-2 hover:scale-105 active:scale-95',
                selected
                  ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20'
                  : disabled
                  ? 'bg-secondary/50 border-secondary/50 text-gray-600 cursor-not-allowed'
                  : 'bg-secondary border-secondary/50 text-white hover:border-accent/50'
              )}
            >
              <span className="text-lg">{tag.emoji}</span>
              <span>{tag.label}</span>
              {selected && <X size={14} />}
            </button>
          );
        })}
      </div>

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}

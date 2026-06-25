import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  count?: number;
  size?: 'sm' | 'md';
}

export default function Rating({ value, max = 5, count, size = 'sm' }: RatingProps) {
  const starSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`${starSize} ${
            i < Math.floor(value)
              ? 'text-primary-container fill-primary-container star-gold'
              : i < value
              ? 'text-primary-container fill-primary-container/40 star-gold'
              : 'text-outline-variant'
          }`}
        />
      ))}
      {count !== undefined && (
        <span className="text-xs text-on-surface-variant ml-1">({count})</span>
      )}
    </div>
  );
}

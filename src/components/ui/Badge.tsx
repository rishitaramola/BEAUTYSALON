import { Sparkles } from 'lucide-react';

type BadgeType = 'ai' | 'top-rated' | 'premium' | 'new' | 'custom';

interface BadgeProps {
  type?: BadgeType;
  label?: string;
}

export default function Badge({ type = 'custom', label }: BadgeProps) {
  if (type === 'ai') {
    return (
      <span className="badge-ai">
        <Sparkles className="w-2.5 h-2.5" />
        AI Recommended
      </span>
    );
  }
  if (type === 'top-rated') {
    return <span className="badge-top-rated">Top Rated</span>;
  }
  if (type === 'premium') {
    return (
      <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full" style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.4)', color: '#735c00' }}>
        Premium Salon
      </span>
    );
  }
  if (type === 'new') {
    return (
      <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700">
        New
      </span>
    );
  }
  return (
    <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-surface-container border border-outline-variant text-on-surface-variant">
      {label}
    </span>
  );
}

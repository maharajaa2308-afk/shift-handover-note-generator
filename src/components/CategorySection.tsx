import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import type { HandoverItem } from '@/types';
import { HandoverItemCard } from '@/components/HandoverItemCard';

interface CategorySectionProps {
  title: string;
  icon: ReactNode;
  items: HandoverItem[];
  accent: {
    headerBg: string;
    headerText: string;
    iconBg: string;
    iconText: string;
    countBg: string;
    countText: string;
    border: string;
  };
  delay?: number;
}

export function CategorySection({
  title,
  icon,
  items,
  accent,
  delay = 0,
}: CategorySectionProps) {
  return (
    <div
      className="flex flex-col bg-white rounded-2xl border border-ink-200/60 shadow-card overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn('flex items-center justify-between px-5 py-4', accent.headerBg)}>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex items-center justify-center w-9 h-9 rounded-lg',
              accent.iconBg,
              accent.iconText
            )}
          >
            {icon}
          </div>
          <h3 className={cn('text-sm font-bold', accent.headerText)}>{title}</h3>
        </div>
        <span
          className={cn(
            'text-xs font-bold px-2.5 py-1 rounded-full',
            accent.countBg,
            accent.countText
          )}
        >
          {items.length}
        </span>
      </div>

      <div className="flex-1 p-4 space-y-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-ink-50 mb-3">
              <span className="text-ink-300 text-xl font-bold">—</span>
            </div>
            <p className="text-sm font-medium text-ink-400">Nothing to report</p>
          </div>
        ) : (
          items.map((item, i) => (
            <div
              key={item.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${delay + i * 60}ms` }}
            >
              <HandoverItemCard item={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

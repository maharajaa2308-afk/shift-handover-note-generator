import { cn } from '@/utils/cn';
import type { Priority } from '@/types';

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const config: Record<Priority, { label: string; classes: string; dot: string }> = {
  critical: {
    label: 'Critical',
    classes: 'bg-danger-50 text-danger-700 border-danger-200',
    dot: 'bg-danger-500',
  },
  high: {
    label: 'High',
    classes: 'bg-warning-50 text-warning-700 border-warning-200',
    dot: 'bg-warning-500',
  },
  medium: {
    label: 'Medium',
    classes: 'bg-brand-50 text-brand-700 border-brand-200',
    dot: 'bg-brand-500',
  },
  low: {
    label: 'Low',
    classes: 'bg-ink-100 text-ink-600 border-ink-200',
    dot: 'bg-ink-400',
  },
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const c = config[priority];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-semibold rounded-full border',
        c.classes,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', c.dot)} />
      {c.label}
    </span>
  );
}

import { cn } from '@/utils/cn';
import type { SourceSystem } from '@/types';

interface SourceBadgeProps {
  source: SourceSystem;
  className?: string;
}

const config: Record<SourceSystem, { label: string; classes: string }> = {
  ServiceNow: {
    label: 'ServiceNow',
    classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  'Jira Service Desk': {
    label: 'Jira',
    classes: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  PagerDuty: {
    label: 'PagerDuty',
    classes: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  Zendesk: {
    label: 'Zendesk',
    classes: 'bg-teal-50 text-teal-700 border-teal-200',
  },
};

export function SourceBadge({ source, className }: SourceBadgeProps) {
  const c = config[source];
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-md border',
        c.classes,
        className
      )}
    >
      {c.label}
    </span>
  );
}

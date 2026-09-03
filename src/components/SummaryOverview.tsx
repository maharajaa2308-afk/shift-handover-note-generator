import { CheckCircle2, Loader, AlertOctagon, Eye, Activity, FileStack, Clock } from 'lucide-react';
import { Card } from '@/components/Card';
import type { ShiftData } from '@/types';

interface SummaryOverviewProps {
  data: ShiftData;
}

export function SummaryOverview({ data }: SummaryOverviewProps) {
  const totalItems =
    data.completed.length + data.inProgress.length + data.blockers.length + data.watchlist.length;

  const stats = [
    {
      label: 'Total Events',
      value: data.totalEvents,
      icon: Activity,
      color: 'text-brand-600',
      bg: 'bg-brand-50',
      sub: 'across all sources',
    },
    {
      label: 'Total Items',
      value: totalItems,
      icon: FileStack,
      color: 'text-accent-600',
      bg: 'bg-accent-50',
      sub: 'in handover note',
    },
    {
      label: 'Completed',
      value: data.completed.length,
      icon: CheckCircle2,
      color: 'text-success-600',
      bg: 'bg-success-50',
      sub: 'resolved this shift',
    },
    {
      label: 'Blockers',
      value: data.blockers.length,
      icon: AlertOctagon,
      color: 'text-danger-600',
      bg: 'bg-danger-50',
      sub: 'need attention',
    },
    {
      label: 'In Progress',
      value: data.inProgress.length,
      icon: Loader,
      color: 'text-warning-600',
      bg: 'bg-warning-50',
      sub: 'ongoing work',
    },
    {
      label: 'Watch-list',
      value: data.watchlist.length,
      icon: Eye,
      color: 'text-ink-600',
      bg: 'bg-ink-100',
      sub: 'for next shift',
    },
  ];

  const shiftDuration = (() => {
    const start = new Date(data.shiftStart);
    const end = new Date(data.shiftEnd);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;
    const hours = Math.round((end.getTime() - start.getTime()) / 3600000);
    return `${hours}h shift`;
  })();

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-ink-900">Shift Summary</h2>
          <p className="text-xs text-ink-500 mt-0.5">Overview of shift activity and handover items</p>
        </div>
        {shiftDuration && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-ink-500 bg-ink-100 px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5" />
            {shiftDuration}
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex flex-col gap-2 p-3 rounded-xl bg-ink-50/50 border border-ink-100"
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${stat.bg} ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-2xl font-bold text-ink-900 leading-none">{stat.value}</p>
                <p className="text-xs font-semibold text-ink-700 mt-1">{stat.label}</p>
                <p className="text-[11px] text-ink-400 mt-0.5">{stat.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

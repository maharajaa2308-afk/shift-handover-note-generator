import { Hash, Clock, User } from 'lucide-react';
import type { HandoverItem } from '@/types';
import { PriorityBadge } from '@/components/PriorityBadge';
import { SourceBadge } from '@/components/SourceBadge';

function formatTimestamp(ts: string): string {
  const d = new Date(ts);
  if (isNaN(d.getTime())) return ts;
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function HandoverItemCard({ item }: { item: HandoverItem }) {
  return (
    <div className="group flex flex-col gap-3 p-4 rounded-xl border border-ink-200/60 bg-white hover:border-ink-300 hover:shadow-card-hover transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Hash className="w-3.5 h-3.5 text-ink-400 shrink-0" />
          <span className="font-mono text-xs font-semibold text-ink-700 truncate">
            {item.recordId}
          </span>
        </div>
        <PriorityBadge priority={item.priority} />
      </div>

      <p className="text-sm text-ink-600 leading-relaxed">{item.description}</p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 border-t border-ink-100">
        <SourceBadge source={item.source} />
        <span className="flex items-center gap-1 text-xs text-ink-400">
          <Clock className="w-3 h-3" />
          {formatTimestamp(item.timestamp)}
        </span>
        {item.assignee && (
          <span className="flex items-center gap-1 text-xs text-ink-400">
            <User className="w-3 h-3" />
            {item.assignee}
          </span>
        )}
      </div>
    </div>
  );
}

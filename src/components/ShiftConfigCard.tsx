import { Calendar, Clock, CheckCircle2, AlertTriangle, Zap, ArrowRight } from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { dataSources } from '@/data';
import { cn } from '@/utils/cn';

interface ShiftConfigCardProps {
  shiftStart: string;
  shiftEnd: string;
  onShiftStartChange: (value: string) => void;
  onShiftEndChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  hasResults: boolean;
}

export function ShiftConfigCard({
  shiftStart,
  shiftEnd,
  onShiftStartChange,
  onShiftEndChange,
  onGenerate,
  isGenerating,
  hasResults,
}: ShiftConfigCardProps) {
  return (
    <Card className="p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 text-brand-600">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-ink-900">Shift Configuration</h2>
          <p className="text-sm text-ink-500">Define the shift window and connected systems</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-600 mb-2 uppercase tracking-wide">
            <Clock className="w-3.5 h-3.5" />
            Shift Start
          </label>
          <input
            type="datetime-local"
            value={shiftStart}
            onChange={(e) => onShiftStartChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-ink-200 bg-ink-50/50 text-sm font-medium text-ink-800 focus:outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100 transition-all"
          />
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-600 mb-2 uppercase tracking-wide">
            <Clock className="w-3.5 h-3.5" />
            Shift End
          </label>
          <input
            type="datetime-local"
            value={shiftEnd}
            onChange={(e) => onShiftEndChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-ink-200 bg-ink-50/50 text-sm font-medium text-ink-800 focus:outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100 transition-all"
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold text-ink-600 mb-3 uppercase tracking-wide">
          Connected Data Sources
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dataSources.map((source) => (
            <div
              key={source.key}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-ink-200 bg-white hover:border-ink-300 transition-colors"
            >
              <div
                className={cn(
                  'flex items-center justify-center w-9 h-9 rounded-lg shrink-0',
                  source.connected
                    ? 'bg-success-50 text-success-600'
                    : 'bg-ink-100 text-ink-400'
                )}
              >
                {source.connected ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink-800 truncate">{source.name}</p>
                <p className="text-xs text-ink-400">
                  {source.connected
                    ? `${source.recordCount} records · synced ${source.lastSync}`
                    : 'Not connected'}
                </p>
              </div>
              <span
                className={cn(
                  'flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-full shrink-0',
                  source.connected
                    ? 'bg-success-50 text-success-700'
                    : 'bg-ink-100 text-ink-500'
                )}
              >
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    source.connected ? 'bg-success-500 animate-pulse' : 'bg-ink-400'
                  )}
                />
                {source.connected ? 'Live' : 'Off'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={onGenerate}
        disabled={isGenerating}
        size="lg"
        className="w-full sm:w-auto"
      >
        {isGenerating ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" />
            Generating...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4" />
            {hasResults ? 'Regenerate Handover Note' : 'Generate Handover Note'}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </Card>
  );
}

import { useState } from 'react';
import {
  ClipboardList,
  Download,
  RefreshCw,
  CheckCircle2,
  Loader,
  AlertOctagon,
  Eye,
  Sparkles,
} from 'lucide-react';
import { ShiftConfigCard } from '@/components/ShiftConfigCard';
import { SummaryOverview } from '@/components/SummaryOverview';
import { CategorySection } from '@/components/CategorySection';
import { Button } from '@/components/Button';
import { generateHandoverNote } from '@/services/handoverApi';
import type { ShiftData } from '@/types';

export default function App() {
  const [shiftStart, setShiftStart] = useState('2026-09-03T08:00');
  const [shiftEnd, setShiftEnd] = useState('2026-09-03T16:00');
  const [isGenerating, setIsGenerating] = useState(false);
  const [shiftData, setShiftData] = useState<ShiftData | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setShiftData(null);
    try {
      const data = await generateHandoverNote({ shiftStart, shiftEnd });
      setShiftData(data);
    } catch {
      // Keep the UI usable even if the backend is unreachable
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!shiftData) return;
    const content = buildHandoverText(shiftData);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `handover-note-${shiftData.shiftStart.slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-ink-50 grid-pattern">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-ink-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-sm">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-ink-900 leading-tight">
                  Shift Handover Note Generator
                </h1>
                <p className="text-xs text-ink-500 hidden sm:block">
                  Automatically generate structured handover notes from real shift activity
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {shiftData && (
                <>
                  <Button variant="secondary" size="sm" onClick={handleDownload}>
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleGenerate} disabled={isGenerating}>
                    <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin-slow' : ''}`} />
                    <span className="hidden sm:inline">Regenerate</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Hero subtitle for mobile */}
        <div className="sm:hidden">
          <p className="text-sm text-ink-500">
            Automatically generate structured handover notes from real shift activity.
          </p>
        </div>

        {/* Shift Configuration */}
        <ShiftConfigCard
          shiftStart={shiftStart}
          shiftEnd={shiftEnd}
          onShiftStartChange={setShiftStart}
          onShiftEndChange={setShiftEnd}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          hasResults={!!shiftData}
        />

        {/* Generating skeleton */}
        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 mb-4">
              <Sparkles className="w-7 h-7 animate-pulse" />
            </div>
            <p className="text-sm font-semibold text-ink-700">Analyzing shift activity...</p>
            <p className="text-xs text-ink-400 mt-1">Correlating events from connected data sources</p>
          </div>
        )}

        {/* Results */}
        {shiftData && !isGenerating && (
          <div className="space-y-6 animate-fade-in">
            {/* Action bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
              <div>
                <h2 className="text-xl font-bold text-ink-900">Results Dashboard</h2>
                <p className="text-sm text-ink-500 mt-0.5">
                  Generated at{' '}
                  {new Date(shiftData.generatedAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="md" onClick={handleDownload}>
                  <Download className="w-4 h-4" />
                  Download Handover PDF
                </Button>
                <Button variant="primary" size="md" onClick={handleGenerate}>
                  <RefreshCw className="w-4 h-4" />
                  Regenerate Note
                </Button>
              </div>
            </div>

            {/* Summary Overview */}
            <SummaryOverview data={shiftData} />

            {/* Category Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <CategorySection
                title="Completed"
                icon={<CheckCircle2 className="w-5 h-5" />}
                items={shiftData.completed}
                delay={0}
                accent={{
                  headerBg: 'bg-success-50',
                  headerText: 'text-success-800',
                  iconBg: 'bg-success-100',
                  iconText: 'text-success-600',
                  countBg: 'bg-success-100',
                  countText: 'text-success-700',
                  border: 'border-success-200/40',
                }}
              />
              <CategorySection
                title="In Progress"
                icon={<Loader className="w-5 h-5" />}
                items={shiftData.inProgress}
                delay={80}
                accent={{
                  headerBg: 'bg-warning-50',
                  headerText: 'text-warning-800',
                  iconBg: 'bg-warning-100',
                  iconText: 'text-warning-600',
                  countBg: 'bg-warning-100',
                  countText: 'text-warning-700',
                  border: 'border-warning-200/40',
                }}
              />
              <CategorySection
                title="Blockers / Escalations"
                icon={<AlertOctagon className="w-5 h-5" />}
                items={shiftData.blockers}
                delay={160}
                accent={{
                  headerBg: 'bg-danger-50',
                  headerText: 'text-danger-800',
                  iconBg: 'bg-danger-100',
                  iconText: 'text-danger-600',
                  countBg: 'bg-danger-100',
                  countText: 'text-danger-700',
                  border: 'border-danger-200/40',
                }}
              />
              <CategorySection
                title="Watch-list"
                icon={<Eye className="w-5 h-5" />}
                items={shiftData.watchlist}
                delay={240}
                accent={{
                  headerBg: 'bg-ink-100',
                  headerText: 'text-ink-800',
                  iconBg: 'bg-ink-200',
                  iconText: 'text-ink-600',
                  countBg: 'bg-ink-200',
                  countText: 'text-ink-700',
                  border: 'border-ink-200/40',
                }}
              />
            </div>
          </div>
        )}

        {/* Empty state before first generation */}
        {!shiftData && !isGenerating && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-ink-100 text-ink-400 mb-4">
              <ClipboardList className="w-7 h-7" />
            </div>
            <p className="text-sm font-semibold text-ink-600">No handover note generated yet</p>
            <p className="text-xs text-ink-400 mt-1 max-w-sm">
              Set your shift window above and click Generate to create a structured handover note from connected data sources.
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-ink-200/60 bg-white/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-ink-400 text-center">
            Shift Handover Note Generator · IT Operations Dashboard · Demo with sample data
          </p>
        </div>
      </footer>
    </div>
  );
}

function buildHandoverText(data: ShiftData): string {
  const lines: string[] = [];
  lines.push('========================================');
  lines.push('     SHIFT HANDOVER NOTE');
  lines.push('========================================');
  lines.push(`Shift: ${data.shiftStart} to ${data.shiftEnd}`);
  lines.push(`Generated: ${new Date(data.generatedAt).toLocaleString()}`);
  lines.push(`Total Events: ${data.totalEvents}`);
  lines.push('');
  lines.push('--- COMPLETED ---');
  data.completed.forEach((i) => lines.push(`  [${i.recordId}] ${i.description} (${i.source})`));
  lines.push('');
  lines.push('--- IN PROGRESS ---');
  data.inProgress.forEach((i) => lines.push(`  [${i.recordId}] ${i.description} (${i.source})`));
  lines.push('');
  lines.push('--- BLOCKERS / ESCALATIONS ---');
  data.blockers.forEach((i) => lines.push(`  [${i.recordId}] ${i.description} (${i.source})`));
  lines.push('');
  lines.push('--- WATCH-LIST ---');
  data.watchlist.forEach((i) => lines.push(`  [${i.recordId}] ${i.description} (${i.source})`));
  lines.push('========================================');
  return lines.join('\n');
}

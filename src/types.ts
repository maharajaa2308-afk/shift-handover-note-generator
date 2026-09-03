export type SourceSystem = 'ServiceNow' | 'Jira Service Desk' | 'PagerDuty' | 'Zendesk';

export type ItemCategory = 'completed' | 'in_progress' | 'blockers' | 'watchlist';

export type Priority = 'critical' | 'high' | 'medium' | 'low';

export interface HandoverItem {
  id: string;
  recordId: string;
  description: string;
  source: SourceSystem;
  timestamp: string;
  priority: Priority;
  assignee?: string;
}

export interface ShiftData {
  completed: HandoverItem[];
  inProgress: HandoverItem[];
  blockers: HandoverItem[];
  watchlist: HandoverItem[];
  totalEvents: number;
  generatedAt: string;
  shiftStart: string;
  shiftEnd: string;
}

export interface DataSourceStatus {
  name: string;
  key: string;
  connected: boolean;
  lastSync: string;
  recordCount: number;
}

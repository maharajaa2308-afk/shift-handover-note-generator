import type { ShiftData, DataSourceStatus } from '@/types';

export const dataSources: DataSourceStatus[] = [
  {
    name: 'Ticketing System',
    key: 'ticketing',
    connected: true,
    lastSync: '2 min ago',
    recordCount: 47,
  },
  {
    name: 'Incident Management',
    key: 'incident',
    connected: true,
    lastSync: '5 min ago',
    recordCount: 12,
  },
];

export const sampleShiftData: ShiftData = {
  shiftStart: '2026-09-03T08:00',
  shiftEnd: '2026-09-03T16:00',
  totalEvents: 59,
  generatedAt: new Date().toISOString(),
  completed: [
    {
      id: 'c1',
      recordId: 'INC0012847',
      description:
        'Resolved login authentication failure for production CRM cluster — root cause traced to expired SSL certificate on auth-gateway-02',
      source: 'ServiceNow',
      timestamp: '2026-09-03T09:14',
      priority: 'high',
      assignee: 'M. Chen',
    },
    {
      id: 'c2',
      recordId: 'TCK-5521',
      description:
        'Closed user request for VPN access provisioning for offshore contractor team — accounts activated and documented',
      source: 'Jira Service Desk',
      timestamp: '2026-09-03T10:32',
      priority: 'low',
      assignee: 'S. Patel',
    },
    {
      id: 'c3',
      recordId: 'INC0012891',
      description:
        'Fixed database connection pool exhaustion on reporting-db-03 — connection limit increased and idle timeout tuned',
      source: 'ServiceNow',
      timestamp: '2026-09-03T11:48',
      priority: 'high',
      assignee: 'R. Okafor',
    },
    {
      id: 'c4',
      recordId: 'ZD-88430',
      description:
        'Resolved email delivery delays for marketing automation platform — SMTP relay queue flushed and rate limits adjusted',
      source: 'Zendesk',
      timestamp: '2026-09-03T13:05',
      priority: 'medium',
      assignee: 'L. Torres',
    },
    {
      id: 'c5',
      recordId: 'TCK-5544',
      description:
        'Completed quarterly access review for finance application — 14 accounts removed, 3 escalated for manager approval',
      source: 'Jira Service Desk',
      timestamp: '2026-09-03T14:20',
      priority: 'medium',
      assignee: 'M. Chen',
    },
  ],
  inProgress: [
    {
      id: 'p1',
      recordId: 'INC0012903',
      description:
        'Ongoing investigation into intermittent 502 errors on customer-facing API gateway — appears load-balancer health check threshold too aggressive',
      source: 'ServiceNow',
      timestamp: '2026-09-03T12:15',
      priority: 'high',
      assignee: 'R. Okafor',
    },
    {
      id: 'p2',
      recordId: 'CHG-7712',
      description:
        'Rolling deployment of Kubernetes cluster upgrade from v1.27 to v1.28 — 3 of 6 nodes complete, monitoring for regressions',
      source: 'Jira Service Desk',
      timestamp: '2026-09-03T11:00',
      priority: 'medium',
      assignee: 'S. Patel',
    },
    {
      id: 'p3',
      recordId: 'TCK-5560',
      description:
        'Configuring new SSO integration with Okta for internal tooling suite — SAML metadata exchanged, testing attribute mapping',
      source: 'Jira Service Desk',
      timestamp: '2026-09-03T13:45',
      priority: 'medium',
      assignee: 'L. Torres',
    },
  ],
  blockers: [
    {
      id: 'b1',
      recordId: 'INC0012915',
      description:
        'ESCALATED: Production data warehouse unresponsive — storage layer hit 98% capacity, DBA team engaged, waiting on storage expansion ticket',
      source: 'ServiceNow',
      timestamp: '2026-09-03T14:50',
      priority: 'critical',
      assignee: 'Escalated to DBA',
    },
    {
      id: 'b2',
      recordId: 'PD-2231',
      description:
        'BLOCKED: Payment gateway webhook failures affecting checkout — third-party provider acknowledged outage, ETA 2 hours for resolution',
      source: 'PagerDuty',
      timestamp: '2026-09-03T15:10',
      priority: 'critical',
      assignee: 'Escalated to Vendor',
    },
    {
      id: 'b3',
      recordId: 'TCK-5571',
      description:
        'BLOCKED: Cannot proceed with IAM policy migration — waiting on security team approval for cross-account role permissions',
      source: 'Jira Service Desk',
      timestamp: '2026-09-03T13:30',
      priority: 'high',
      assignee: 'Waiting on Security',
    },
  ],
  watchlist: [
    {
      id: 'w1',
      recordId: 'INC0012891',
      description:
        'Monitor database connection pool after tuning — watch for re-occurrence of pool exhaustion during peak reporting hours',
      source: 'ServiceNow',
      timestamp: '2026-09-03T11:48',
      priority: 'medium',
      assignee: 'R. Okafor',
    },
    {
      id: 'w2',
      recordId: 'CHG-7712',
      description:
        'Watch remaining 3 Kubernetes nodes during upgrade — node-04 reported elevated latency during pod rescheduling',
      source: 'Jira Service Desk',
      timestamp: '2026-09-03T15:30',
      priority: 'medium',
      assignee: 'S. Patel',
    },
    {
      id: 'w3',
      recordId: 'ZD-88430',
      description:
        'Monitor email relay throughput after rate-limit adjustment — queue depth should stabilize below 500 messages within 1 hour',
      source: 'Zendesk',
      timestamp: '2026-09-03T13:05',
      priority: 'low',
      assignee: 'L. Torres',
    },
    {
      id: 'w4',
      recordId: 'PD-2240',
      description:
        'Cloud cost anomaly detected in us-east-1 — billing alert triggered at 140% of daily forecast, investigate unexpected compute spike',
      source: 'PagerDuty',
      timestamp: '2026-09-03T15:45',
      priority: 'medium',
      assignee: 'Unassigned',
    },
  ],
};

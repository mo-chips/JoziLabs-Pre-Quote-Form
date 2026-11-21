/**
 * JoziLabs – Service Discovery Module: Cloud & Infrastructure
 * scripts/services/cloud-services.js
 *
 * Covers cloud architecture, VPS & application hosting, cloud migrations,
 * database management & automated backups, CI/CD DevOps pipelines, and
 * Google Workspace / Microsoft 365 business cloud setups.
 */

export const cloudServicesService = {
  id: 'cloud-services',
  title: 'Cloud & Infrastructure',
  shortTitle: 'Cloud & Infra',
  categoryBadge: 'SCALE · HOST & MIGRATE',
  tagline: 'Cloud Hosting, Server Migrations, Managed Databases, Backups & Workspace Setup',
  description:
    'Deploy, migrate, or optimise cloud servers, databases, automated off-site backups, DevOps deployment pipelines, and business cloud workspaces.',
  startingPriceNote: 'Setups from R2,500 · Managed Cloud & Migrations',
  estimatedTime: '~2 min discovery',
  iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
  highlights: [
    'Cloud Migration & Server Setup',
    'Managed Databases & Backups',
    'DevOps, Docker & CI/CD Pipelines',
    'Google Workspace / Microsoft 365'
  ],

  step1Config: {
    orgLabel: 'Company or project name',
    orgPlaceholder: 'e.g. Highveld Financial Group',
    orgRequired: true,
    summaryLabel: 'Briefly describe the systems or workloads you run (or plan to run):',
    summaryPlaceholder: 'e.g. Moving our local accounting server and 25 staff email accounts to the cloud.'
  },

  stepsMeta: {
    2: {
      shortTitle: '2. Cloud Scope',
      title: 'Cloud & Infrastructure Requirements',
      subtitle: 'Tell us whether you are setting up new cloud infrastructure, migrating existing servers, or optimising performance & cost.'
    },
    3: {
      shortTitle: '3. Providers & Uptime',
      title: 'Cloud Platforms, Backups & Reliability',
      subtitle: 'Select your preferred cloud providers, South African data residency needs, and uptime/backup requirements.'
    },
    4: {
      shortTitle: '4. Management & Budget',
      title: 'Access, SLA Timeline & Budget',
      subtitle: 'Share your current infrastructure access, cutover timeline, and rough budget ballpark.'
    }
  },

  defaults: {
    cloudSituation: '',
    cloudFocusAreas: [],
    migrationWorkloads: ['Websites or Web Applications', 'Databases (SQL / PostgreSQL / MySQL / Mongo)'],
    migrationCurrentEnv: 'Legacy shared hosting / cPanel',
    migrationDowntimeWindow: 'After-hours / Weekend cutover preferred',
    optimisePainPoints: ['Slow loading / High latency for South African users'],
    cloudCustomNotes: '',
    cloudProviders: ['Not sure — recommend best for SA latency & budget'],
    cloudReliabilityNeeds: ['Automated daily off-site backups', 'SSL, Firewall & Cloudflare CDN/WAF protection'],
    cloudScaleEstimate: 'Small – Medium Business (Up to 50 staff or <10,000 monthly visitors)',
    cloudAccessStatus: 'full_admin',
    ongoingServicePreference: 'Setup + Monthly Managed Cloud & Monitoring Retainer',
    estimatedBudget: '',
    timelinePreference: 'Within 2 – 4 weeks',
    desiredLaunchDate: '',
    milestoneDetails: ''
  },

  options: {
    cloudSituations: [
      {
        value: 'new_cloud',
        label: 'New Cloud Infrastructure & Deployment',
        description: 'Provisioning new cloud servers, databases, containers, or business workspace from scratch.'
      },
      {
        value: 'migration',
        label: 'Cloud Migration (Move Servers, Apps, Data or Emails)',
        description: 'Safely moving workloads from an office server, legacy host, or old provider to modern cloud infrastructure.'
      },
      {
        value: 'optimise',
        label: 'Optimise, Scale or Fix Existing Cloud Setup',
        description: 'Reduce high monthly cloud bills, fix downtime/crashes, automate deployments, or harden backups.'
      }
    ],
    cloudFocusAreas: [
      {
        value: 'app_server_hosting',
        label: 'Application & Web Server Hosting (VPS / Containers)',
        description: 'Linux/Windows cloud servers, Docker containers, load balancers, and reverse proxies.'
      },
      {
        value: 'database_backups',
        label: 'Managed Databases, Backups & Disaster Recovery',
        description: 'PostgreSQL/MySQL/SQL Server setup, automated off-site snapshots, and rapid recovery.'
      },
      {
        value: 'cloud_migration',
        label: 'Zero-Data-Loss Cloud Migration',
        description: 'End-to-end migration of websites, databases, file shares, or email mailboxes.'
      },
      {
        value: 'devops_cicd',
        label: 'DevOps, CI/CD & Automated Deployments',
        description: 'GitHub Actions, GitLab CI, staging environments, and one-click zero-downtime releases.'
      },
      {
        value: 'workspace_email',
        label: 'Business Email, DNS & Cloud Workspace',
        description: 'Google Workspace or Microsoft 365 setup, SharePoint/Drive permissions, and domain DNS security.'
      }
    ],
    migrationWorkloads: [
      'Websites or Web Applications',
      'Databases (SQL / PostgreSQL / MySQL / Mongo)',
      'Company File Shares & Documents (to SharePoint / Google Drive)',
      'Staff Email Accounts & Historical Mailboxes',
      'On-Premise Accounting / ERP Server (e.g. Sage / Pastel)'
    ],
    migrationCurrentEnvs: [
      'On-premise office server / Local PC',
      'Legacy shared hosting / cPanel',
      'Another cloud provider (AWS / Azure / GCP / VPS)',
      'Multiple scattered accounts'
    ],
    migrationDowntimeWindows: [
      'Zero downtime required (Live replication)',
      'After-hours / Weekend cutover preferred',
      'Flexible maintenance window'
    ],
    optimisePainPoints: [
      'Monthly cloud or hosting bill is too high',
      'Slow loading / High latency for South African users',
      'Servers crash during traffic spikes',
      'No automated backups or disaster recovery plan',
      'Manual deployments are slow and error-prone',
      'SSL, DNS or email deliverability issues'
    ],
    cloudProviders: [
      'Amazon Web Services (AWS – Cape Town af-south-1)',
      'Microsoft Azure (South Africa North – Johannesburg)',
      'Google Cloud Platform (GCP)',
      'Cost-effective Cloud VPS (Hetzner / DigitalOcean / Linode)',
      'Modern App Platforms (Vercel / Render / Railway / Supabase)',
      'Google Workspace / Microsoft 365 Cloud',
      'Not sure — recommend best for SA latency & budget'
    ],
    cloudReliabilityNeeds: [
      'Automated daily off-site backups',
      'SSL, Firewall & Cloudflare CDN/WAF protection',
      'South African data residency (POPIA compliance)',
      '24/7 uptime monitoring & instant WhatsApp/Email alerts',
      'Staging / Test environment separate from Production',
      'Auto-scaling & load balancing for high traffic'
    ],
    cloudScaleEstimates: [
      'Starter / Single App (1–10 staff or <2,000 monthly visitors)',
      'Small – Medium Business (Up to 50 staff or <10,000 monthly visitors)',
      'High-Traffic / Multi-Server (50+ staff or 10,000 – 100,000+ visitors)',
      'Not sure — need capacity sizing'
    ],
    cloudAccessStatuses: [
      { value: 'full_admin', label: 'Yes, we have full root / admin & DNS access' },
      { value: 'partial_vendor', label: 'Current host or old IT vendor manages access (need help)' },
      { value: 'greenfield', label: 'Brand-new cloud account required' }
    ],
    ongoingSupportOptions: [
      {
        value: 'Setup + Monthly Managed Cloud & Monitoring Retainer',
        label: 'Setup + Managed Cloud & Uptime Monitoring (Recommended)',
        description: 'We monitor server health, backups, security patches, SSL renewals, and cloud cost optimisation monthly.'
      },
      {
        value: 'Once-off Architecture / Migration + Handover',
        label: 'Once-off Setup or Migration only',
        description: 'We architect, migrate, document the infrastructure, and hand full control to your team.'
      },
      {
        value: 'Compare both options in our quote',
        label: 'Compare once-off vs managed cloud retainer',
        description: 'Show both the project cost and optional monthly managed infrastructure plan.'
      }
    ],
    budgetRanges: [
      {
        value: 'Under R5,000',
        label: 'Under R5,000',
        note: 'Workspace / DNS setup / Single VPS or backup configuration',
        tiers: ['workspace', 'starter_cloud']
      },
      {
        value: 'R5,000 – R15,000',
        label: 'R5,000 – R15,000',
        note: 'Server & DB migration / CI-CD pipeline / Cloud architecture',
        tiers: ['migration', 'devops']
      },
      {
        value: 'R15,000 – R35,000',
        label: 'R15,000 – R35,000',
        note: 'Multi-server migration / High-availability & DR setup',
        tiers: ['multi_server']
      },
      {
        value: 'R35,000+',
        label: 'R35,000+',
        note: 'Enterprise cloud transformation & managed infrastructure',
        tiers: ['enterprise_cloud']
      }
    ],
    timelineOptions: [
      { value: 'Urgent (Server down or immediate cutover needed)', label: 'Urgent / Immediate attention' },
      { value: 'Within 1 – 2 weeks', label: 'Within 1 – 2 weeks' },
      { value: 'Within 2 – 4 weeks', label: 'Within 2 – 4 weeks' },
      { value: 'Flexible / Planned migration window', label: 'Flexible / Planned window' },
      { value: 'Specific launch date / event', label: 'Specific cutover date' }
    ]
  },

  getFlowState(data) {
    const isNewCloud = data.cloudSituation === 'new_cloud';
    const isMigration = data.cloudSituation === 'migration';
    const isOptimise = data.cloudSituation === 'optimise';
    const hasPickedSituation = isNewCloud || isMigration || isOptimise;
    const focus = Array.isArray(data.cloudFocusAreas) ? data.cloudFocusAreas : [];

    const showMigrationModule = isMigration || focus.includes('cloud_migration');
    const showOptimiseModule = isOptimise;

    let budgetRecommendation = {
      text: 'Select the budget range that best matches your infrastructure project.',
      highlightTier: ''
    };

    if (focus.length === 1 && focus.includes('workspace_email') && !isMigration) {
      budgetRecommendation = {
        text: 'Typical range for Google Workspace / Microsoft 365 & DNS setup: Under R5,000.',
        highlightTier: 'workspace'
      };
    } else if (showMigrationModule) {
      budgetRecommendation = {
        text: 'Typical range for cloud server, database, or workspace migration: R5,000 – R15,000+.',
        highlightTier: 'migration'
      };
    } else if (focus.includes('devops_cicd') || focus.includes('database_backups')) {
      budgetRecommendation = {
        text: 'Typical range for managed database, automated backup, or CI/CD pipeline setup: R5,000 – R15,000.',
        highlightTier: 'devops'
      };
    } else if (isNewCloud) {
      budgetRecommendation = {
        text: 'Typical range for new cloud server & database provisioning: Under R5,000 – R15,000.',
        highlightTier: 'starter_cloud'
      };
    }

    return {
      isNewCloud,
      isMigration,
      isOptimise,
      hasPickedSituation,
      showMigrationModule,
      showOptimiseModule,
      showSpecificDateInput: data.timelinePreference === 'Specific launch date / event',
      budgetRecommendation
    };
  },

  getRequiredFields(stepId) {
    if (stepId === 2) {
      return ['cloudSituation', 'cloudFocusAreas'];
    }
    if (stepId === 4) {
      return ['estimatedBudget'];
    }
    return [];
  },

  validateField(fieldName, data) {
    switch (fieldName) {
      case 'cloudSituation':
        if (!data.cloudSituation) {
          return 'Please select whether you need a new cloud setup, a migration, or infrastructure optimisation.';
        }
        return null;
      case 'cloudFocusAreas':
        if (!Array.isArray(data.cloudFocusAreas) || data.cloudFocusAreas.length === 0) {
          return 'Please select at least one cloud or infrastructure area you need help with.';
        }
        return null;
      case 'estimatedBudget':
        if (!data.estimatedBudget) {
          return 'Please select an estimated budget range.';
        }
        return null;
      default:
        return null;
    }
  },

  buildReview(data, flow) {
    const situationLabel =
      this.options.cloudSituations.find((s) => s.value === data.cloudSituation)?.label ||
      data.cloudSituation;
    const focusLabels = (data.cloudFocusAreas || []).map(
      (val) => this.options.cloudFocusAreas.find((f) => f.value === val)?.label || val
    );

    const step2Items = [
      { label: 'Infrastructure Path', value: situationLabel },
      { label: 'Focus Areas', tags: focusLabels, fullSpan: true }
    ];

    if (flow.showMigrationModule) {
      step2Items.push(
        { label: 'Workloads to Migrate', tags: data.migrationWorkloads, fullSpan: true },
        { label: 'Current Environment', value: data.migrationCurrentEnv },
        { label: 'Cutover Window', value: data.migrationDowntimeWindow }
      );
    }

    if (flow.showOptimiseModule) {
      step2Items.push({
        label: 'Infrastructure Pain Points',
        tags: data.optimisePainPoints,
        fullSpan: true
      });
    }

    if (data.cloudCustomNotes) {
      step2Items.push({ label: 'Technical Notes', value: data.cloudCustomNotes, fullSpan: true });
    }

    const step3Items = [
      { label: 'Cloud Providers / Platforms', tags: data.cloudProviders, fullSpan: true },
      { label: 'Reliability, Backup & Security', tags: data.cloudReliabilityNeeds, fullSpan: true },
      { label: 'Estimated Traffic / Team Scale', value: data.cloudScaleEstimate }
    ];

    const accessLabel =
      this.options.cloudAccessStatuses.find((a) => a.value === data.cloudAccessStatus)?.label ||
      data.cloudAccessStatus;

    const step4Items = [
      { label: 'Budget Ballpark (ZAR)', value: data.estimatedBudget },
      {
        label: 'Target Timeline',
        value:
          flow.showSpecificDateInput && data.desiredLaunchDate
            ? `${data.desiredLaunchDate}${data.milestoneDetails ? ` (${data.milestoneDetails})` : ''}`
            : data.timelinePreference
      },
      { label: 'Account & DNS Access', value: accessLabel },
      { label: 'Ongoing Management', value: data.ongoingServicePreference, fullSpan: true }
    ];

    return [
      { stepId: 2, title: 'Cloud & Infrastructure Scope', items: step2Items },
      { stepId: 3, title: 'Cloud Platforms, Backups & Reliability', items: step3Items },
      { stepId: 4, title: 'Access, SLA Timeline & Budget', items: step4Items }
    ];
  },

  buildPayload(data, flow) {
    return {
      serviceScope: {
        cloudSituation: data.cloudSituation,
        focusAreas: data.cloudFocusAreas,
        migrationDetails: flow.showMigrationModule
          ? {
              workloads: data.migrationWorkloads,
              currentEnvironment: data.migrationCurrentEnv,
              downtimeWindow: data.migrationDowntimeWindow
            }
          : null,
        optimisationDetails: flow.showOptimiseModule
          ? {
              painPoints: data.optimisePainPoints
            }
          : null,
        technicalNotes: (data.cloudCustomNotes || '').trim() || null
      },
      technicalAndDeliverables: {
        cloudProviders: data.cloudProviders,
        reliabilityAndBackups: data.cloudReliabilityNeeds,
        scaleEstimate: data.cloudScaleEstimate
      },
      setupBudgetAndTimeline: {
        accessStatus: data.cloudAccessStatus,
        ongoingServicePreference: data.ongoingServicePreference,
        estimatedBudget: data.estimatedBudget,
        timelinePreference: data.timelinePreference,
        desiredLaunchDate: flow.showSpecificDateInput ? data.desiredLaunchDate || null : null,
        milestoneDetails: flow.showSpecificDateInput ? (data.milestoneDetails || '').trim() || null : null
      }
    };
  },

  buildTextSummary(payload) {
    const p = payload.serviceScope;
    const d = payload.technicalAndDeliverables;
    const t = payload.setupBudgetAndTimeline;

    const lines = [
      '2. CLOUD & INFRASTRUCTURE SCOPE',
      `   • Cloud Situation:   ${p.cloudSituation}`,
      `   • Focus Areas:       ${(p.focusAreas || []).join(', ')}`
    ];

    if (p.migrationDetails) {
      lines.push(
        `   • [Migration]:       Workloads: ${(p.migrationDetails.workloads || []).join(', ')}`,
        `   • [Migration Env]:   From: ${p.migrationDetails.currentEnvironment} | Window: ${p.migrationDetails.downtimeWindow}`
      );
    }
    if (p.optimisationDetails) {
      lines.push(`   • [Pain Points]:     ${(p.optimisationDetails.painPoints || []).join(', ')}`);
    }
    if (p.technicalNotes) {
      lines.push(`   • Technical Notes:   ${p.technicalNotes}`);
    }

    lines.push(
      '',
      '3. PROVIDERS, BACKUPS & RELIABILITY',
      `   • Cloud Providers:   ${(d.cloudProviders || []).join(', ')}`,
      `   • Reliability/DR:    ${(d.reliabilityAndBackups || []).join(', ')}`,
      `   • Workload Scale:    ${d.scaleEstimate}`,
      '',
      '4. ACCESS, TIMELINE & BUDGET',
      `   • Budget Ballpark:   ${t.estimatedBudget}`,
      `   • Target Timeline:   ${t.timelinePreference}${
        t.desiredLaunchDate ? ` (${t.desiredLaunchDate} - ${t.milestoneDetails || ''})` : ''
      }`,
      `   • Admin Access:      ${t.accessStatus}`,
      `   • Ongoing Support:   ${t.ongoingServicePreference}`
    );

    return lines;
  }
};

export default cloudServicesService;

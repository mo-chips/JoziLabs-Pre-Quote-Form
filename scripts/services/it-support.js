/**
 * JoziLabs – Service Discovery Module: IT Support & Managed Systems
 * scripts/services/it-support.js
 *
 * Covers remote & on-site IT support, helpdesk SLAs, workstation & laptop setup,
 * office networking & Wi-Fi, Microsoft 365 / Google Workspace admin, and data backups.
 */

export const itSupportService = {
  id: 'it-support',
  parentGroupId: 'it-cybersecurity',
  title: 'IT Support & Systems',
  shortTitle: 'IT Support',
  categoryBadge: 'SUPPORT · INSTALL & MANAGE',
  tagline: 'Managed IT Support, Office Networks, Workstations & Cloud Admin',
  description:
    'Reliable remote and Johannesburg on-site IT support, laptop/workstation provisioning, office Wi-Fi & routers, business email administration, and automated backups.',
  startingPriceNote: 'Call-outs from R650 · Managed IT SLAs from R1,800/pm',
  estimatedTime: '~2 min discovery',
  iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  highlights: [
    'Remote & On-Site IT Helpdesk',
    'Workstation & Laptop Setup',
    'Office Wi-Fi, Routers & Networks',
    'Microsoft 365 & Backup Management'
  ],

  step1Config: {
    orgLabel: 'Company or office name',
    orgPlaceholder: 'e.g. Melville Legal Chambers',
    orgRequired: true,
    summaryLabel: 'Briefly describe your office setup or main IT headache:',
    summaryPlaceholder: 'e.g. 12 staff laptops on Windows 11 with unreliable Wi-Fi and SharePoint sync issues.'
  },

  stepsMeta: {
    2: {
      shortTitle: '2. IT Scope',
      title: 'IT Environment & Support Requirements',
      subtitle: 'Tell us whether you need urgent troubleshooting, ongoing managed IT support, or a new office/device rollout.'
    },
    3: {
      shortTitle: '3. Devices & Setup',
      title: 'Devices, Delivery Mode & Pain Points',
      subtitle: 'Share your team size, operating systems, remote vs on-site preference, and current frustrations.'
    },
    4: {
      shortTitle: '4. SLA & Budget',
      title: 'Support Model, Urgency & Budget',
      subtitle: 'Choose between a monthly Managed IT retainer or once-off support, plus your target budget ballpark.'
    }
  },

  defaults: {
    itSituation: '',
    itSupportTasks: [],
    itTeamSize: '6 – 15 users / devices',
    itUrgentIssueDesc: '',
    itCustomNotes: '',
    itOperatingSystems: ['Windows 10 / 11 PCs & Laptops', 'Microsoft 365 (Outlook, Teams, OneDrive, SharePoint)'],
    itDeliveryPreference: 'Hybrid (Fast remote helpdesk + Johannesburg on-site when needed)',
    itPainPoints: ['Slow or freezing computers', 'Email / OneDrive / SharePoint syncing problems'],
    itHardwareProcurement: 'No hardware purchase needed right now',
    ongoingServicePreference: 'Monthly Managed IT Support Retainer (SLA)',
    estimatedBudget: '',
    timelinePreference: 'Within 1 – 2 weeks',
    desiredLaunchDate: '',
    milestoneDetails: ''
  },

  options: {
    itSituations: [
      {
        value: 'urgent_fix',
        label: 'Urgent IT Issue / Troubleshooting & Repair',
        description: 'We have broken email, network downtime, slow/infected PCs, or a system issue that needs fixing now.'
      },
      {
        value: 'managed_it',
        label: 'Ongoing Managed IT Support for Our Team',
        description: 'We want a reliable technology partner on call to support our staff, devices, emails, and backups.'
      },
      {
        value: 'new_setup',
        label: 'New Office, Network or Workstation Rollout',
        description: 'We are onboarding new staff laptops, configuring an office network/Wi-Fi, or setting up cloud tools.'
      }
    ],
    itSupportTasks: [
      {
        value: 'helpdesk_support',
        label: 'Day-to-Day Staff Helpdesk & Troubleshooting',
        description: 'Fast remote and on-site assistance whenever staff hit software, email, or printer snags.'
      },
      {
        value: 'workstation_setup',
        label: 'Laptop & Workstation Setup, Upgrades or Cleanup',
        description: 'Fresh OS installs, SSD/RAM upgrades, software deployment, and security policies.'
      },
      {
        value: 'network_wifi',
        label: 'Office Wi-Fi, Router, Mesh & Network Setup',
        description: 'Fix dead zones, configure business routers/firewalls, switches, and UPS backup readiness.'
      },
      {
        value: 'm365_google_admin',
        label: 'Microsoft 365 / Google Workspace & Email Admin',
        description: 'User onboarding/offboarding, SharePoint/Drive permissions, and email deliverability.'
      },
      {
        value: 'backup_recovery',
        label: 'Automated Cloud Backups & Data Recovery',
        description: 'Protect critical company folders and laptops against hardware failure or accidental deletion.'
      },
      {
        value: 'printers_peripherals',
        label: 'Network Printers, Scanners & VoIP Setup',
        description: 'Connect and stabilise shared office printers, scanners, and meeting room hardware.'
      }
    ],
    itTeamSizes: [
      '1 – 5 users / devices',
      '6 – 15 users / devices',
      '16 – 40 users / devices',
      '40+ users / devices'
    ],
    itOperatingSystems: [
      'Windows 10 / 11 PCs & Laptops',
      'Apple MacBooks / iMacs (macOS)',
      'Microsoft 365 (Outlook, Teams, OneDrive, SharePoint)',
      'Google Workspace (Gmail, Drive, Docs)',
      'On-premise Windows / Linux Server or NAS',
      'Accounting / Industry Software (Sage, Pastel, AutoCAD, etc.)'
    ],
    itDeliveryPreferences: [
      'Remote Support First (Instant AnyDesk / TeamViewer / Screen-share)',
      'On-Site Support in Johannesburg / Gauteng',
      'Hybrid (Fast remote helpdesk + Johannesburg on-site when needed)'
    ],
    itPainPoints: [
      'Slow or freezing computers',
      'Wi-Fi drops or dead zones in the office',
      'Email / OneDrive / SharePoint syncing problems',
      'No central place for company files or backups',
      'Current IT person takes too long to respond',
      'Staff onboarding / offboarding is chaotic'
    ],
    itHardwareProcurementOptions: [
      { value: 'No hardware purchase needed right now', label: 'Use our existing hardware' },
      { value: 'Need advice & quotes on new laptops/equipment', label: 'Recommend & source new laptops / routers / UPS' },
      { value: 'We bought hardware and need it configured', label: 'We already bought the hardware — just install & configure' }
    ],
    ongoingSupportOptions: [
      {
        value: 'Monthly Managed IT Support Retainer (SLA)',
        label: 'Monthly Managed IT Retainer (Recommended for Teams)',
        description: 'Predictable monthly fee covering helpdesk support, device monitoring, backups, and priority response.'
      },
      {
        value: 'Once-off IT Project / Setup or Ad-hoc Call-out',
        label: 'Once-off Fix, Setup or Pay-As-You-Go',
        description: 'Fixed quote for your setup or repair with no ongoing monthly commitment.'
      },
      {
        value: 'Compare both options in our quote',
        label: 'Compare once-off vs monthly IT Care Plan',
        description: 'Show us both the immediate fix/setup cost and an optional monthly support retainer.'
      }
    ],
    budgetRanges: [
      {
        value: 'Under R2,500',
        label: 'Under R2,500',
        note: 'Ad-hoc troubleshooting / 1–3 PC setup / Email fix',
        tiers: ['adhoc_fix']
      },
      {
        value: 'R2,500 – R7,500',
        label: 'R2,500 – R7,500',
        note: 'Small team IT SLA / Office Wi-Fi & workstation rollout',
        tiers: ['small_office', 'managed_small']
      },
      {
        value: 'R7,500 – R15,000',
        label: 'R7,500 – R15,000',
        note: 'Medium office IT setup / Managed IT for 10–25 staff',
        tiers: ['managed_medium']
      },
      {
        value: 'R15,000+',
        label: 'R15,000+',
        note: 'Full office network overhaul / 25+ user Managed IT',
        tiers: ['managed_large']
      }
    ],
    timelineOptions: [
      { value: 'Urgent / Same-day or next-day needed', label: 'Urgent (Today / Tomorrow)' },
      { value: 'Within this week', label: 'Within this week' },
      { value: 'Within 1 – 2 weeks', label: 'Within 1 – 2 weeks' },
      { value: 'Flexible / Planning ahead', label: 'Flexible / Planning ahead' },
      { value: 'Specific launch date / event', label: 'Specific office move / start date' }
    ]
  },

  getFlowState(data) {
    const isUrgentFix = data.itSituation === 'urgent_fix';
    const isManagedIt = data.itSituation === 'managed_it';
    const isNewSetup = data.itSituation === 'new_setup';
    const hasPickedSituation = isUrgentFix || isManagedIt || isNewSetup;

    let budgetRecommendation = {
      text: 'Select the budget range (once-off or monthly SLA ballpark) that fits your IT needs.',
      highlightTier: ''
    };

    if (isUrgentFix && (data.itTeamSize || '').startsWith('1 – 5')) {
      budgetRecommendation = {
        text: 'Typical range for an ad-hoc troubleshooting session or small team fix: Under R2,500.',
        highlightTier: 'adhoc_fix'
      };
    } else if (isManagedIt) {
      const isLarge =
        (data.itTeamSize || '').startsWith('16 ') || (data.itTeamSize || '').startsWith('40+');
      budgetRecommendation = {
        text: isLarge
          ? 'Typical range for Managed IT Support for 16+ users: R7,500 – R15,000+/pm.'
          : 'Typical range for small-team Managed IT Support (up to 15 users): R2,500 – R7,500/pm.',
        highlightTier: isLarge ? 'managed_medium' : 'managed_small'
      };
    } else if (isNewSetup) {
      budgetRecommendation = {
        text: 'Typical range for new office network, Wi-Fi, or multi-workstation setup: R2,500 – R15,000.',
        highlightTier: 'small_office'
      };
    }

    return {
      isUrgentFix,
      isManagedIt,
      isNewSetup,
      hasPickedSituation,
      showSpecificDateInput: data.timelinePreference === 'Specific launch date / event',
      budgetRecommendation
    };
  },

  getRequiredFields(stepId) {
    if (stepId === 2) {
      return ['itSituation', 'itSupportTasks'];
    }
    if (stepId === 4) {
      return ['estimatedBudget'];
    }
    return [];
  },

  validateField(fieldName, data) {
    switch (fieldName) {
      case 'itSituation':
        if (!data.itSituation) {
          return 'Please select what type of IT assistance you need.';
        }
        return null;
      case 'itSupportTasks':
        if (!Array.isArray(data.itSupportTasks) || data.itSupportTasks.length === 0) {
          return 'Please select at least one IT support area.';
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
      this.options.itSituations.find((s) => s.value === data.itSituation)?.label || data.itSituation;
    const taskLabels = (data.itSupportTasks || []).map(
      (val) => this.options.itSupportTasks.find((t) => t.value === val)?.label || val
    );

    const step2Items = [
      { label: 'IT Assistance Type', value: situationLabel },
      { label: 'Team / Device Count', value: data.itTeamSize },
      { label: 'Requested IT Services', tags: taskLabels, fullSpan: true }
    ];

    if (flow.isUrgentFix && data.itUrgentIssueDesc) {
      step2Items.push({ label: 'Urgent Issue Description', value: data.itUrgentIssueDesc, fullSpan: true });
    }
    if (data.itCustomNotes) {
      step2Items.push({ label: 'Additional Notes', value: data.itCustomNotes, fullSpan: true });
    }

    const step3Items = [
      { label: 'Systems & Software Used', tags: data.itOperatingSystems, fullSpan: true },
      { label: 'Support Delivery Mode', value: data.itDeliveryPreference },
      { label: 'Hardware Procurement', value: data.itHardwareProcurement },
      { label: 'Current IT Frustrations', tags: data.itPainPoints, fullSpan: true }
    ];

    const step4Items = [
      { label: 'Budget Ballpark (ZAR)', value: data.estimatedBudget },
      {
        label: 'Urgency / Timeline',
        value:
          flow.showSpecificDateInput && data.desiredLaunchDate
            ? `${data.desiredLaunchDate}${data.milestoneDetails ? ` (${data.milestoneDetails})` : ''}`
            : data.timelinePreference
      },
      { label: 'Preferred Support Model', value: data.ongoingServicePreference, fullSpan: true }
    ];

    return [
      { stepId: 2, title: 'IT Environment & Support Requirements', items: step2Items },
      { stepId: 3, title: 'Devices, Delivery Mode & Pain Points', items: step3Items },
      { stepId: 4, title: 'Support Model, Urgency & Budget', items: step4Items }
    ];
  },

  buildPayload(data, flow) {
    return {
      serviceScope: {
        itSituation: data.itSituation,
        teamSize: data.itTeamSize,
        requestedTasks: data.itSupportTasks,
        urgentIssueDescription: flow.isUrgentFix ? (data.itUrgentIssueDesc || '').trim() || null : null,
        additionalNotes: (data.itCustomNotes || '').trim() || null
      },
      technicalAndDeliverables: {
        operatingSystemsAndTools: data.itOperatingSystems,
        deliveryPreference: data.itDeliveryPreference,
        hardwareProcurement: data.itHardwareProcurement,
        currentPainPoints: data.itPainPoints
      },
      setupBudgetAndTimeline: {
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
      '2. IT SUPPORT & SYSTEMS SCOPE',
      `   • IT Situation:      ${p.itSituation}`,
      `   • Team / Devices:    ${p.teamSize}`,
      `   • Requested Tasks:   ${(p.requestedTasks || []).join(', ')}`
    ];

    if (p.urgentIssueDescription) {
      lines.push(`   • Urgent Issue:      ${p.urgentIssueDescription}`);
    }
    if (p.additionalNotes) {
      lines.push(`   • Custom Notes:      ${p.additionalNotes}`);
    }

    lines.push(
      '',
      '3. ENVIRONMENT, DEVICES & DELIVERY',
      `   • OS & Platforms:    ${(d.operatingSystemsAndTools || []).join(', ')}`,
      `   • Support Mode:      ${d.deliveryPreference}`,
      `   • Hardware Needs:    ${d.hardwareProcurement}`,
      `   • Pain Points:       ${(d.currentPainPoints || []).join(', ') || 'None specified'}`,
      '',
      '4. SLA MODEL, TIMELINE & BUDGET',
      `   • Budget Ballpark:   ${t.estimatedBudget}`,
      `   • Target Timeline:   ${t.timelinePreference}${
        t.desiredLaunchDate ? ` (${t.desiredLaunchDate} - ${t.milestoneDetails || ''})` : ''
      }`,
      `   • Support Model:     ${t.ongoingServicePreference}`
    );

    return lines;
  }
};

export default itSupportService;

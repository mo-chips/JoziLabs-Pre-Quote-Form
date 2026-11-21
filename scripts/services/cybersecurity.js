/**
 * JoziLabs – Service Discovery Module: Cybersecurity & Data Protection
 * scripts/services/cybersecurity.js
 *
 * Covers security audits, vulnerability testing, hacked website/email recovery,
 * business email hardening (SPF/DKIM/DMARC & MFA), endpoint security, and POPIA technical readiness.
 */

export const cybersecurityService = {
  id: 'cybersecurity',
  parentGroupId: 'it-cybersecurity',
  title: 'Cybersecurity & Protection',
  shortTitle: 'Cybersecurity',
  categoryBadge: 'PROTECT · AUDIT & RESCUE',
  tagline: 'Security Audits, Breach Recovery, Email Hardening & POPIA Compliance',
  description:
    'Protect your websites, cloud accounts, and business data with vulnerability audits, incident recovery, anti-phishing email authentication, and POPIA technical safeguards.',
  startingPriceNote: 'Audits & Hardening from R3,500 · Incident Rescue',
  estimatedTime: '~2 min discovery',
  iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  highlights: [
    'Website & App Security Audits',
    'Hacked Site & Email Incident Rescue',
    'MFA, SPF/DKIM/DMARC & Anti-Phishing',
    'POPIA Technical Safeguard Review'
  ],

  step1Config: {
    orgLabel: 'Organisation or business name',
    orgPlaceholder: 'e.g. Protea Medical Practice',
    orgRequired: true,
    summaryLabel: 'Briefly describe the systems or data you want to protect (please do not share passwords):',
    summaryPlaceholder: 'e.g. Protecting our patient portal, 15 staff email accounts, and customer database.'
  },

  stepsMeta: {
    2: {
      shortTitle: '2. Security Scope',
      title: 'Security Situation & Target Assets',
      subtitle: 'Tell us whether you need a proactive security audit, active breach/incident recovery, or POPIA compliance readiness.'
    },
    3: {
      shortTitle: '3. Posture & Controls',
      title: 'Current Security Controls & Data Profile',
      subtitle: 'Let us know what protections are currently in place and the types of business data you handle.'
    },
    4: {
      shortTitle: '4. Urgency & Budget',
      title: 'Response Timeline, Monitoring & Budget',
      subtitle: 'Select your urgency level, ongoing monitoring preference, and rough budget ballpark.'
    }
  },

  defaults: {
    securitySituation: '',
    securityTargetAssets: [],
    incidentTypes: ['Compromised / hacked website or online store'],
    incidentCurrentStatus: 'System is still live but behaving abnormally',
    proactiveServices: ['Website / Web App vulnerability scan & hardening', 'Email security (SPF, DKIM, DMARC) & MFA enforcement'],
    complianceFrameworks: ['South African POPIA (Protection of Personal Information Act)'],
    securityCustomNotes: '',
    currentSecurityControls: ['Standard SSL / HTTPS certificate'],
    dataSensitivityTypes: ['Customer contact & billing records (PII)'],
    ongoingServicePreference: 'Security Audit / Hardening + Monthly Security & Patch Monitoring',
    estimatedBudget: '',
    timelinePreference: 'Within 1 – 2 weeks',
    desiredLaunchDate: '',
    milestoneDetails: ''
  },

  options: {
    securitySituations: [
      {
        value: 'proactive_audit',
        label: 'Proactive Security Audit, Hardening & Protection',
        description: 'We want to test our website, apps, emails, or office network for weaknesses and lock them down before an attack.'
      },
      {
        value: 'incident_rescue',
        label: 'Active Incident / Hacked Website, Email or Account Rescue',
        description: 'We suspect a breach, defaced website, malware infection, or business email compromise and need urgent help.'
      },
      {
        value: 'compliance_popia',
        label: 'POPIA & Client Security Compliance Readiness',
        description: 'We need to verify our technical data safeguards, encryption, backups, or complete a client security review.'
      }
    ],
    securityTargetAssets: [
      {
        value: 'websites_webapps',
        label: 'Company Website, Online Store or Web Application',
        description: 'Public websites, e-commerce checkouts, customer portals, and backend APIs.'
      },
      {
        value: 'email_cloud_accounts',
        label: 'Business Email & Cloud Workspace (M365 / Google)',
        description: 'Protect against invoice spoofing, BEC phishing, and unauthorized mailbox logins.'
      },
      {
        value: 'databases_records',
        label: 'Customer Databases & Sensitive Business Files',
        description: 'SQL databases, cloud storage buckets, financial records, and personal client documents.'
      },
      {
        value: 'endpoints_network',
        label: 'Staff Laptops, Workstations & Office Wi-Fi/Firewall',
        description: 'Endpoint protection, disk encryption, password managers, and secure remote access.'
      }
    ],
    incidentTypes: [
      'Compromised / hacked website or online store',
      'Business Email Compromise (Phishing / Fake invoice scam)',
      'Malware, ransomware or suspicious pop-ups on staff PCs',
      'Unauthorized login or leaked credentials',
      'DDoS attack or suspicious traffic spike'
    ],
    incidentCurrentStatuses: [
      'Emergency — system is offline or actively compromised right now',
      'System is still live but behaving abnormally',
      'We contained the issue and need a forensic cleanup & hardening'
    ],
    proactiveServices: [
      'Website / Web App vulnerability scan & hardening',
      'Cloudflare WAF, DDoS & bot protection setup',
      'Email security (SPF, DKIM, DMARC) & MFA enforcement',
      'Company-wide Password Manager & 2FA rollout',
      'Endpoint security (Antivirus/EDR) & device encryption',
      'Immutable off-site backups (Ransomware protection)',
      'Staff phishing awareness & security hygiene training'
    ],
    complianceFrameworks: [
      'South African POPIA (Protection of Personal Information Act)',
      'Corporate client / vendor security questionnaire',
      'Payment & E-commerce checkout security best practices',
      'General internal IT security policy & access control'
    ],
    currentSecurityControls: [
      'Standard SSL / HTTPS certificate',
      'Two-Factor Authentication (2FA / MFA) on all staff emails',
      'Cloudflare or Web Application Firewall (WAF)',
      'Business Antivirus / Endpoint protection',
      'Automated off-site backups',
      'None of these / Not sure what is currently active'
    ],
    dataSensitivityTypes: [
      'Customer contact & billing records (PII)',
      'Financial, invoicing or banking workflows',
      'Medical, legal or confidential client documents',
      'Student / learner records',
      'Standard public business information only'
    ],
    ongoingSupportOptions: [
      {
        value: 'Security Audit / Hardening + Monthly Security & Patch Monitoring',
        label: 'Audit & Hardening + Monthly Security Monitoring (Recommended)',
        description: 'We lock down your systems and provide continuous vulnerability checks, patch updates, and backup verification.'
      },
      {
        value: 'Once-off Security Audit, Cleanup or Hardening Project',
        label: 'Once-off Audit / Incident Cleanup + Executive Report',
        description: 'We perform the assessment or rescue, remediate vulnerabilities, and hand over a clear remediation report.'
      },
      {
        value: 'Compare both options in our quote',
        label: 'Compare once-off vs continuous monitoring',
        description: 'Show us the immediate engagement cost and optional monthly security care.'
      }
    ],
    budgetRanges: [
      {
        value: 'Under R5,000',
        label: 'Under R5,000',
        note: 'Website security cleanup / Email SPF-DKIM-DMARC & MFA setup',
        tiers: ['quick_hardening', 'site_cleanup']
      },
      {
        value: 'R5,000 – R15,000',
        label: 'R5,000 – R15,000',
        note: 'Comprehensive security audit / POPIA safeguard review / Incident recovery',
        tiers: ['audit_standard', 'incident']
      },
      {
        value: 'R15,000 – R30,000',
        label: 'R15,000 – R30,000',
        note: 'Web App & API penetration test / Multi-system company hardening',
        tiers: ['pentest']
      },
      {
        value: 'R30,000+',
        label: 'R30,000+',
        note: 'Enterprise security architecture & continuous managed protection',
        tiers: ['enterprise_sec']
      }
    ],
    timelineOptions: [
      { value: 'Critical / Active Incident — Need immediate response', label: 'Critical / Active Incident (Immediate)' },
      { value: 'Within this week', label: 'Within this week' },
      { value: 'Within 1 – 2 weeks', label: 'Within 1 – 2 weeks' },
      { value: 'Flexible / Scheduled audit', label: 'Flexible / Scheduled audit' },
      { value: 'Specific launch date / event', label: 'Specific compliance deadline' }
    ]
  },

  getFlowState(data) {
    const isProactive = data.securitySituation === 'proactive_audit';
    const isIncident = data.securitySituation === 'incident_rescue';
    const isCompliance = data.securitySituation === 'compliance_popia';
    const hasPickedSituation = isProactive || isIncident || isCompliance;

    let budgetRecommendation = {
      text: 'Select the budget range that fits your security assessment or hardening scope.',
      highlightTier: ''
    };

    if (isIncident) {
      budgetRecommendation = {
        text: 'Typical range for hacked website cleanup or incident containment & hardening: Under R5,000 – R15,000.',
        highlightTier: 'incident'
      };
    } else if (isCompliance) {
      budgetRecommendation = {
        text: 'Typical range for a POPIA technical safeguard audit & remediation plan: R5,000 – R15,000.',
        highlightTier: 'audit_standard'
      };
    } else if (isProactive) {
      const assets = Array.isArray(data.securityTargetAssets) ? data.securityTargetAssets : [];
      if (assets.length <= 1 && assets.includes('email_cloud_accounts')) {
        budgetRecommendation = {
          text: 'Typical range for business email hardening (SPF/DKIM/DMARC) & MFA setup: Under R5,000.',
          highlightTier: 'quick_hardening'
        };
      } else {
        budgetRecommendation = {
          text: 'Typical range for a website/app security audit & company hardening: R5,000 – R15,000+.',
          highlightTier: 'audit_standard'
        };
      }
    }

    return {
      isProactive,
      isIncident,
      isCompliance,
      hasPickedSituation,
      showIncidentModule: isIncident,
      showProactiveModule: isProactive || isCompliance,
      showComplianceModule: isCompliance,
      showSpecificDateInput: data.timelinePreference === 'Specific launch date / event',
      budgetRecommendation
    };
  },

  getRequiredFields(stepId) {
    if (stepId === 2) {
      return ['securitySituation', 'securityTargetAssets'];
    }
    if (stepId === 4) {
      return ['estimatedBudget'];
    }
    return [];
  },

  validateField(fieldName, data) {
    switch (fieldName) {
      case 'securitySituation':
        if (!data.securitySituation) {
          return 'Please select whether this is a proactive audit, an active incident, or a compliance review.';
        }
        return null;
      case 'securityTargetAssets':
        if (!Array.isArray(data.securityTargetAssets) || data.securityTargetAssets.length === 0) {
          return 'Please select at least one asset or system that needs protection.';
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
      this.options.securitySituations.find((s) => s.value === data.securitySituation)?.label ||
      data.securitySituation;
    const assetLabels = (data.securityTargetAssets || []).map(
      (val) => this.options.securityTargetAssets.find((a) => a.value === val)?.label || val
    );

    const step2Items = [
      { label: 'Security Path', value: situationLabel },
      { label: 'Target Systems & Assets', tags: assetLabels, fullSpan: true }
    ];

    if (flow.showIncidentModule) {
      step2Items.push(
        { label: 'Incident Type', tags: data.incidentTypes, fullSpan: true },
        { label: 'Current Containment Status', value: data.incidentCurrentStatus }
      );
    }

    if (flow.showProactiveModule) {
      step2Items.push({
        label: 'Requested Security Services',
        tags: data.proactiveServices,
        fullSpan: true
      });
    }

    if (flow.showComplianceModule) {
      step2Items.push({
        label: 'Compliance & Policy Focus',
        tags: data.complianceFrameworks,
        fullSpan: true
      });
    }

    if (data.securityCustomNotes) {
      step2Items.push({ label: 'Security Context Notes', value: data.securityCustomNotes, fullSpan: true });
    }

    const step3Items = [
      { label: 'Current Security Controls Active', tags: data.currentSecurityControls, fullSpan: true },
      { label: 'Data Sensitivity Profile', tags: data.dataSensitivityTypes, fullSpan: true }
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
      { label: 'Ongoing Protection Model', value: data.ongoingServicePreference, fullSpan: true }
    ];

    return [
      { stepId: 2, title: 'Security Situation & Target Assets', items: step2Items },
      { stepId: 3, title: 'Current Security Controls & Data Profile', items: step3Items },
      { stepId: 4, title: 'Response Timeline, Monitoring & Budget', items: step4Items }
    ];
  },

  buildPayload(data, flow) {
    return {
      serviceScope: {
        securitySituation: data.securitySituation,
        targetAssets: data.securityTargetAssets,
        incidentDetails: flow.showIncidentModule
          ? {
              incidentTypes: data.incidentTypes,
              currentStatus: data.incidentCurrentStatus
            }
          : null,
        proactiveServices: flow.showProactiveModule ? data.proactiveServices : null,
        complianceFocus: flow.showComplianceModule ? data.complianceFrameworks : null,
        additionalNotes: (data.securityCustomNotes || '').trim() || null
      },
      technicalAndDeliverables: {
        currentSecurityControls: data.currentSecurityControls,
        dataSensitivityProfile: data.dataSensitivityTypes
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
      '2. CYBERSECURITY & DATA PROTECTION SCOPE',
      `   • Security Path:     ${p.securitySituation}`,
      `   • Target Assets:     ${(p.targetAssets || []).join(', ')}`
    ];

    if (p.incidentDetails) {
      lines.push(
        `   • [Incident Type]:   ${(p.incidentDetails.incidentTypes || []).join(', ')}`,
        `   • [Incident Status]: ${p.incidentDetails.currentStatus}`
      );
    }
    if (p.proactiveServices) {
      lines.push(`   • [Hardening/Audit]: ${(p.proactiveServices || []).join(', ')}`);
    }
    if (p.complianceFocus) {
      lines.push(`   • [Compliance]:      ${(p.complianceFocus || []).join(', ')}`);
    }
    if (p.additionalNotes) {
      lines.push(`   • Security Notes:    ${p.additionalNotes}`);
    }

    lines.push(
      '',
      '3. CURRENT POSTURE & DATA PROFILE',
      `   • Active Controls:   ${(d.currentSecurityControls || []).join(', ')}`,
      `   • Data Sensitivity:  ${(d.dataSensitivityProfile || []).join(', ')}`,
      '',
      '4. URGENCY, MONITORING & BUDGET',
      `   • Budget Ballpark:   ${t.estimatedBudget}`,
      `   • Target Timeline:   ${t.timelinePreference}${
        t.desiredLaunchDate ? ` (${t.desiredLaunchDate} - ${t.milestoneDetails || ''})` : ''
      }`,
      `   • Protection Model:  ${t.ongoingServicePreference}`
    );

    return lines;
  }
};

export default cybersecurityService;

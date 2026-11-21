/**
 * JoziLabs – Service Discovery Module: Software Development
 * scripts/services/software-development.js
 *
 * Covers mobile apps (Android & iOS), desktop & internal business systems,
 * AI chat assistants trained on business data, workflow automation, and API integrations.
 */

export const softwareDevelopmentService = {
  id: 'software-development',
  title: 'Software Development',
  shortTitle: 'Software Dev',
  categoryBadge: 'BUILD · MOBILE, SYSTEMS & AI',
  tagline: 'iOS & Android Mobile Apps, Internal Business Systems, APIs & AI Assistants',
  description:
    'Cross-platform Android and iOS mobile apps, internal business operations software, custom AI assistants trained on your data, and system integrations.',
  startingPriceNote: 'MVPs & AI tools from R10,000 · Full fixed-scope quote',
  estimatedTime: '~2.5 min discovery',
  iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" x2="10" y1="4" y2="20"/></svg>`,
  highlights: [
    'Android & iOS Mobile Apps',
    'Internal Operations & ERP Software',
    'AI Chat Assistants & Automation',
    'APIs & System Integrations'
  ],

  step1Config: {
    orgLabel: 'Business, startup or project name',
    orgPlaceholder: 'e.g. Apex Fleet Solutions',
    orgRequired: true,
    summaryLabel: 'What core problem or workflow will this software solve?',
    summaryPlaceholder: 'e.g. Replace manual Excel job cards with a mobile app for field technicians and a live manager dashboard.'
  },

  stepsMeta: {
    2: {
      shortTitle: '2. Product Scope',
      title: 'Software Type & Architecture Scope',
      subtitle: 'Tell us whether we are building a new application, upgrading an existing system, or adding AI automation.'
    },
    3: {
      shortTitle: '3. Tech & Integrations',
      title: 'Platforms, Roles, Integrations & Specs',
      subtitle: 'Select who uses the system, what external tools it connects to, and your current design/specification stage.'
    },
    4: {
      shortTitle: '4. Delivery & Budget',
      title: 'Deployment, Roadmap & Budget',
      subtitle: 'Choose how the software will be hosted/deployed, your target timeline, and budget ballpark.'
    }
  },

  defaults: {
    softwareSituation: '',
    softwareProductType: '',
    softwarePrimaryGoals: ['Automate manual admin & save time', 'Give customers or staff a self-service portal'],
    existingSystemContext: '',
    existingTechStack: 'Not sure / Need JoziLabs to audit',
    mobileTargetPlatforms: 'Both Android & iOS (Cross-platform)',
    mobileDeviceFeatures: ['Push notifications', 'Offline mode / Low-data sync'],
    portalUserRoles: 'Both Customers & Internal Staff (Multi-role)',
    portalCapabilities: ['Live dashboard & analytics', 'Role-based user logins & permissions'],
    aiUseCases: ['Customer support AI chatbot trained on our prices, hours & policies'],
    aiDataSources: ['Website pages & FAQ documents'],
    softwareCustomNotes: '',
    specReadiness: 'Idea & rough workflow notes (need help scoping)',
    softwareIntegrations: ['Email / SMS / WhatsApp notifications'],
    softwareDataSecurity: ['Role-based access control', 'POPIA-compliant customer data handling'],
    softwareReferenceApps: '',
    softwareDeploymentPref: 'JoziLabs managed cloud deployment (Recommended)',
    ongoingServicePreference: 'Phased MVP first + Monthly Dev & Maintenance SLA',
    estimatedBudget: '',
    timelinePreference: 'In 1 – 2 months',
    desiredLaunchDate: '',
    milestoneDetails: ''
  },

  options: {
    softwareSituations: [
      {
        value: 'new_build',
        label: 'Brand-New Custom Software or Mobile App (Greenfield)',
        description: 'We are building a new mobile app, desktop/internal business system, or API service from scratch.'
      },
      {
        value: 'existing_system',
        label: 'Existing App or Software System (Upgrade, Rescue or Modernise)',
        description: 'We have an existing app, database, or codebase that needs new features, bug fixes, or refactoring.'
      },
      {
        value: 'ai_automation',
        label: 'AI Assistant or Workflow Automation',
        description: 'We want to add a custom AI chat assistant or automate repetitive operations across our business tools.'
      }
    ],
    softwareProductTypes: [
      {
        value: 'mobile_app',
        label: 'Mobile Application (Android / iOS)',
        description: 'Installable smartphone & tablet app built with modern cross-platform tech, plus optional admin backend.'
      },
      {
        value: 'internal_tool',
        label: 'Internal Business, Desktop or Operations Software',
        description: 'Custom quoting, inventory, job-card, POS, or financial tracking software tailored to how your team works.'
      },
      {
        value: 'ai_assistant',
        label: 'AI Chat Assistant & Smart Automation',
        description: 'AI trained on your pricing, policies, and documents to answer customers or automate internal workflows.'
      },
      {
        value: 'api_backend',
        label: 'API, Backend System or Software Integration',
        description: 'Connect your existing databases, accounting, ERP, or third-party platforms so data syncs automatically.'
      }
    ],
    softwarePrimaryGoals: [
      'Automate manual admin & save time',
      'Give customers or staff a self-service portal',
      'Launch a new commercial app / SaaS product',
      'Replace spreadsheets & paper job cards',
      'Answer customer queries 24/7 with AI',
      'Connect disconnected software systems via API'
    ],
    existingTechStacks: [
      'JavaScript / TypeScript (React, Node, Next.js)',
      'Python (Django, FastAPI, Flask)',
      'Java / Spring / Kotlin',
      'PHP / Laravel / WordPress custom plugin',
      'Flutter / React Native',
      'Not sure / Need JoziLabs to audit'
    ],
    mobileTargetPlatforms: [
      'Both Android & iOS (Cross-platform)',
      'Android first (Google Play / APK)',
      'iOS first (Apple App Store)',
      'Mobile App + Web Admin Dashboard'
    ],
    mobileDeviceFeatures: [
      'Push notifications',
      'Offline mode / Low-data sync',
      'Camera, photo upload or QR/barcode scanning',
      'GPS location & map tracking',
      'Biometric login (Fingerprint / Face ID)',
      'In-app payments or subscriptions'
    ],
    portalUserRoles: [
      'Customers / External Clients',
      'Internal Staff & Management Only',
      'Both Customers & Internal Staff (Multi-role)',
      'Multi-tenant (Multiple companies / vendors)'
    ],
    portalCapabilities: [
      'Live dashboard & analytics',
      'Role-based user logins & permissions',
      'Generate & track quotes, invoices or orders',
      'Secure document upload, approval & signing',
      'Booking, scheduling or dispatch management',
      'Automated PDF / Excel report exports'
    ],
    aiUseCases: [
      'Customer support AI chatbot trained on our prices, hours & policies',
      'WhatsApp AI assistant for lead qualification & bookings',
      'Internal staff knowledge assistant (search SOPs & docs)',
      'Automated data extraction from PDFs, invoices or emails',
      'Smart quoting or recommendation engine'
    ],
    aiDataSources: [
      'Website pages & FAQ documents',
      'PDF price lists, catalogues & policy docs',
      'Live database / product inventory',
      'Spreadsheets (Excel / Google Sheets)'
    ],
    specReadinessOptions: [
      {
        value: 'Idea & rough workflow notes (need help scoping)',
        label: 'Idea & Workflow Notes',
        description: 'We know what problem to solve and need JoziLabs to help design the screens and architecture.'
      },
      {
        value: 'Wireframes or Figma designs ready',
        label: 'Wireframes / UI Designs Ready',
        description: 'We already have sketches, mockups, or Figma screens showing how it should look.'
      },
      {
        value: 'Detailed technical specification ready',
        label: 'Detailed Specification Document',
        description: 'We have a written scope or feature list ready for fixed-price estimation.'
      },
      {
        value: 'Working prototype or existing codebase',
        label: 'Existing Prototype / Codebase',
        description: 'We have an MVP, spreadsheet model, or existing repo to build upon.'
      }
    ],
    softwareIntegrations: [
      'South African Payment Gateways (Yoco, PayFast, Paystack, Ozow)',
      'Email / SMS / WhatsApp notifications',
      'Accounting Software (Xero, Sage, QuickBooks)',
      'Google / Microsoft Single Sign-On (SSO) & Calendar',
      'Courier / Maps / Geolocation APIs',
      'Custom REST API or Webhook to existing database'
    ],
    softwareDataSecurity: [
      'Role-based access control',
      'POPIA-compliant customer data handling',
      'Two-Factor Authentication (2FA / OTP)',
      'Audit trail & activity logs',
      'Automated daily encrypted backups'
    ],
    softwareDeploymentOptions: [
      { value: 'JoziLabs managed cloud deployment (Recommended)', label: 'JoziLabs managed cloud hosting & deployment' },
      { value: 'Deploy to our own cloud account (AWS / Azure / GCP)', label: 'Deploy to our own company cloud account' },
      { value: 'Google Play Store & Apple App Store publishing', label: 'Publish to Google Play & Apple App Store' },
      { value: 'Advise us on the most cost-effective setup', label: 'Not sure — advise us' }
    ],
    ongoingSupportOptions: [
      {
        value: 'Phased MVP first + Monthly Dev & Maintenance SLA',
        label: 'Phased MVP + Ongoing Care & Feature Retainer (Recommended)',
        description: 'Launch a lean, working v1 quickly, test on mobile devices, and iterate with monthly support.'
      },
      {
        value: 'Once-off fixed-scope build + handover',
        label: 'Once-off build & full code handover',
        description: 'We deliver the agreed scope, documentation, and source code to your organisation.'
      },
      {
        value: 'Compare both options in our quote',
        label: 'Compare once-off vs phased retainer',
        description: 'Include both a complete build estimate and an iterative MVP roadmap.'
      }
    ],
    budgetRanges: [
      {
        value: 'R10,000 – R25,000',
        label: 'R10,000 – R25,000',
        note: 'Focused MVP / AI Chat Assistant / API integration / Internal tool',
        tiers: ['ai_mvp', 'internal_small', 'api_backend']
      },
      {
        value: 'R25,000 – R50,000',
        label: 'R25,000 – R50,000',
        note: 'Mobile App MVP / Custom Internal Operations Software',
        tiers: ['mobile_mvp', 'internal_full']
      },
      {
        value: 'R50,000 – R100,000',
        label: 'R50,000 – R100,000',
        note: 'Full Cross-Platform iOS & Android App / Multi-role System',
        tiers: ['mobile_full', 'saas']
      },
      {
        value: 'R100,000+',
        label: 'R100,000+',
        note: 'Enterprise software suite / Complex multi-system architecture',
        tiers: ['enterprise']
      }
    ],
    timelineOptions: [
      { value: 'Within 2 – 4 weeks (Fast MVP / AI Bot)', label: 'Within 2 – 4 weeks (Rapid MVP)' },
      { value: 'In 1 – 2 months', label: 'In 1 – 2 months' },
      { value: 'In 2 – 3 months', label: 'In 2 – 3 months' },
      { value: 'Flexible / Phased rollout', label: 'Flexible / Phased rollout' },
      { value: 'Specific launch date / event', label: 'Specific date / milestone' }
    ]
  },

  getFlowState(data) {
    const isNewBuild = data.softwareSituation === 'new_build';
    const isExistingSystem = data.softwareSituation === 'existing_system';
    const isAiAutomation = data.softwareSituation === 'ai_automation';
    const hasPickedSituation = isNewBuild || isExistingSystem || isAiAutomation;

    const pType = data.softwareProductType;
    const showMobileModule = pType === 'mobile_app';
    const showPortalModule = pType === 'internal_tool' || pType === 'api_backend';
    const showAiModule = isAiAutomation || pType === 'ai_assistant';

    let budgetRecommendation = {
      text: 'Select the budget range that best aligns with your software roadmap.',
      highlightTier: ''
    };

    if (showAiModule && pType !== 'mobile_app') {
      budgetRecommendation = {
        text: 'Typical range for a custom AI Chat Assistant or workflow automation integration: R10,000 – R25,000.',
        highlightTier: 'ai_mvp'
      };
    } else if (showMobileModule) {
      budgetRecommendation = {
        text: 'Typical range for an Android & iOS mobile app with backend dashboard: R25,000 – R100,000 depending on scope.',
        highlightTier: 'mobile_mvp'
      };
    } else if (pType === 'internal_tool') {
      budgetRecommendation = {
        text: 'Typical range for custom internal operations or management software: R10,000 – R50,000.',
        highlightTier: 'internal_small'
      };
    } else if (pType === 'api_backend') {
      budgetRecommendation = {
        text: 'Typical range for a custom API, backend service, or multi-system integration: R10,000 – R50,000.',
        highlightTier: 'api_backend'
      };
    }

    return {
      isNewBuild,
      isExistingSystem,
      isAiAutomation,
      hasPickedSituation,
      showMobileModule,
      showPortalModule,
      showAiModule,
      showSpecificDateInput: data.timelinePreference === 'Specific launch date / event',
      budgetRecommendation
    };
  },

  getRequiredFields(stepId, data) {
    if (stepId === 2) {
      return ['softwareSituation', 'softwareProductType'];
    }
    if (stepId === 4) {
      return ['estimatedBudget'];
    }
    return [];
  },

  validateField(fieldName, data) {
    switch (fieldName) {
      case 'softwareSituation':
        if (!data.softwareSituation) {
          return 'Please select whether this is a new application, an existing system, or AI automation.';
        }
        return null;
      case 'softwareProductType':
        if (!data.softwareProductType) {
          return 'Please select the primary type of software solution you need.';
        }
        return null;
      case 'estimatedBudget':
        if (!data.estimatedBudget) {
          return 'Please select an estimated budget range for your software project.';
        }
        return null;
      default:
        return null;
    }
  },

  buildReview(data, flow) {
    const situationLabel =
      this.options.softwareSituations.find((s) => s.value === data.softwareSituation)?.label ||
      data.softwareSituation;
    const typeLabel =
      this.options.softwareProductTypes.find((t) => t.value === data.softwareProductType)?.label ||
      data.softwareProductType;

    const step2Items = [
      { label: 'Project Situation', value: situationLabel },
      { label: 'Software Solution Type', value: typeLabel },
      { label: 'Core Objectives', tags: data.softwarePrimaryGoals, fullSpan: true }
    ];

    if (flow.isExistingSystem) {
      step2Items.push(
        { label: 'Current Tech Stack', value: data.existingTechStack },
        { label: 'Existing System Details', value: data.existingSystemContext || 'Not specified' }
      );
    }

    if (flow.showMobileModule) {
      step2Items.push(
        { label: 'Target Mobile Platforms', value: data.mobileTargetPlatforms },
        { label: 'Device Capabilities', tags: data.mobileDeviceFeatures, fullSpan: true }
      );
    }

    if (flow.showPortalModule) {
      step2Items.push(
        { label: 'User Roles', value: data.portalUserRoles },
        { label: 'Core Software Capabilities', tags: data.portalCapabilities, fullSpan: true }
      );
    }

    if (flow.showAiModule) {
      step2Items.push(
        { label: 'AI & Automation Use Cases', tags: data.aiUseCases, fullSpan: true },
        { label: 'AI Knowledge Sources', tags: data.aiDataSources }
      );
    }

    if (data.softwareCustomNotes) {
      step2Items.push({ label: 'Workflow Notes', value: data.softwareCustomNotes, fullSpan: true });
    }

    const step3Items = [
      { label: 'Specification & Design Stage', value: data.specReadiness },
      { label: 'External Integrations', tags: data.softwareIntegrations, fullSpan: true },
      { label: 'Data & Security Controls', tags: data.softwareDataSecurity, fullSpan: true },
      ...(data.softwareReferenceApps
        ? [{ label: 'Reference Apps / Systems', value: data.softwareReferenceApps, fullSpan: true }]
        : [])
    ];

    const step4Items = [
      { label: 'Budget Ballpark (ZAR)', value: data.estimatedBudget },
      {
        label: 'Target Timeline',
        value:
          flow.showSpecificDateInput && data.desiredLaunchDate
            ? `${data.desiredLaunchDate}${data.milestoneDetails ? ` (${data.milestoneDetails})` : ''}`
            : data.timelinePreference
      },
      { label: 'Deployment & Hosting', value: data.softwareDeploymentPref },
      { label: 'Delivery & Support Model', value: data.ongoingServicePreference, fullSpan: true }
    ];

    return [
      { stepId: 2, title: 'Software Type & Architecture Scope', items: step2Items },
      { stepId: 3, title: 'Platforms, Integrations & Specifications', items: step3Items },
      { stepId: 4, title: 'Deployment, Roadmap & Budget', items: step4Items }
    ];
  },

  buildPayload(data, flow) {
    return {
      serviceScope: {
        softwareSituation: data.softwareSituation,
        softwareProductType: data.softwareProductType,
        primaryGoals: data.softwarePrimaryGoals,
        existingSystem: flow.isExistingSystem
          ? {
              techStack: data.existingTechStack,
              context: (data.existingSystemContext || '').trim() || null
            }
          : null,
        dynamicModules: {
          mobileApp: flow.showMobileModule
            ? {
                targetPlatforms: data.mobileTargetPlatforms,
                deviceFeatures: data.mobileDeviceFeatures
              }
            : null,
          webPortalOrTool: flow.showPortalModule
            ? {
                userRoles: data.portalUserRoles,
                capabilities: data.portalCapabilities
              }
            : null,
          aiAutomation: flow.showAiModule
            ? {
                useCases: data.aiUseCases,
                dataSources: data.aiDataSources
              }
            : null
        },
        workflowNotes: (data.softwareCustomNotes || '').trim() || null
      },
      technicalAndDeliverables: {
        specReadiness: data.specReadiness,
        integrations: data.softwareIntegrations,
        dataAndSecurity: data.softwareDataSecurity,
        referenceApps: (data.softwareReferenceApps || '').trim() || null
      },
      setupBudgetAndTimeline: {
        deploymentPreference: data.softwareDeploymentPref,
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
      '2. SOFTWARE DEVELOPMENT SCOPE',
      `   • Situation:         ${p.softwareSituation}`,
      `   • Product Type:      ${p.softwareProductType}`,
      `   • Primary Goals:     ${(p.primaryGoals || []).join(', ') || 'General'}`
    ];

    if (p.existingSystem) {
      lines.push(
        `   • Existing Stack:    ${p.existingSystem.techStack}`,
        `   • System Context:    ${p.existingSystem.context || 'Not specified'}`
      );
    }
    if (p.dynamicModules?.mobileApp) {
      lines.push(
        `   • [Mobile Scope]:    ${p.dynamicModules.mobileApp.targetPlatforms} | Features: ${(p.dynamicModules.mobileApp.deviceFeatures || []).join(', ')}`
      );
    }
    if (p.dynamicModules?.webPortalOrTool) {
      lines.push(
        `   • [App/Portal]:      Roles: ${p.dynamicModules.webPortalOrTool.userRoles} | Capabilities: ${(p.dynamicModules.webPortalOrTool.capabilities || []).join(', ')}`
      );
    }
    if (p.dynamicModules?.aiAutomation) {
      lines.push(
        `   • [AI/Automation]:   ${(p.dynamicModules.aiAutomation.useCases || []).join(', ')} | Sources: ${(p.dynamicModules.aiAutomation.dataSources || []).join(', ')}`
      );
    }
    if (p.workflowNotes) {
      lines.push(`   • Workflow Notes:    ${p.workflowNotes}`);
    }

    lines.push(
      '',
      '3. INTEGRATIONS, SPECS & SECURITY',
      `   • Spec Readiness:    ${d.specReadiness}`,
      `   • Integrations:      ${(d.integrations || []).join(', ') || 'None specified'}`,
      `   • Data & Security:   ${(d.dataAndSecurity || []).join(', ') || 'Standard'}`,
      '',
      '4. DEPLOYMENT, TIMELINE & BUDGET',
      `   • Budget Ballpark:   ${t.estimatedBudget}`,
      `   • Target Timeline:   ${t.timelinePreference}${
        t.desiredLaunchDate ? ` (${t.desiredLaunchDate} - ${t.milestoneDetails || ''})` : ''
      }`,
      `   • Deployment:        ${t.deploymentPreference}`,
      `   • Support Model:     ${t.ongoingServicePreference}`
    );

    return lines;
  }
};

export default softwareDevelopmentService;

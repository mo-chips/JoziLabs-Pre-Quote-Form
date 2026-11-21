/**
 * JoziLabs – Service Discovery Module: Not Sure / Help Me Scope It
 * scripts/services/general-discovery.js
 *
 * Designed for clients who have a business challenge, broken system, or new idea
 * but do not know how to classify their problem technically (or need multiple services).
 * Zero jargon — focuses on symptoms, goals, current tools, and desired outcomes so
 * JoziLabs can diagnose the problem and recommend the right service track.
 */

export const generalDiscoveryService = {
  id: 'general-discovery',
  title: 'Not Sure? Help Me Scope It',
  shortTitle: 'Guided Scoping',
  categoryBadge: 'GUIDED · ZERO JARGON',
  tagline: 'Describe Your Problem or Idea — We Will Recommend the Right Solution',
  description:
    'Not sure whether you need a website, custom software, cloud migration, IT support, or security? Tell us what is happening in plain English and we will diagnose it for you.',
  estimatedTime: '~2 min guided discovery',
  iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  highlights: [
    'Plain-English Problem Diagnosis',
    'New Ideas & Unfinished Projects',
    'Multi-Service & All-in-One Scope',
    'Clear Recommendation & Fixed Quote'
  ],

  step1Config: {
    orgLabel: 'Business, organisation or project name (if applicable)',
    orgPlaceholder: 'e.g. Karoo Fresh Produce (or your name if starting out)',
    orgRequired: false,
    summaryLabel: 'In one sentence, what does your business or project do?',
    summaryPlaceholder: 'e.g. We distribute fresh produce to restaurants across Gauteng.'
  },

  stepsMeta: {
    2: {
      shortTitle: '2. Your Challenge',
      title: 'Tell Us About Your Problem or Idea',
      subtitle: 'No technical terms needed — pick what sounds closest to your situation and tell us what you want to achieve.'
    },
    3: {
      shortTitle: '3. Current Setup',
      title: 'Where You Are Today & What Success Looks Like',
      subtitle: 'Let us know what tools you already have (if any) and what a successful outcome looks like for you.'
    },
    4: {
      shortTitle: '4. Guidance & Budget',
      title: 'How We Can Guide You, Timeline & Budget',
      subtitle: 'Tell us how you prefer to explore options, your urgency, and a rough budget comfort zone.'
    }
  },

  defaults: {
    problemSituation: '',
    problemSymptoms: [],
    problemDescription: '',
    brokenTargetArea: 'Not sure — multiple things feel broken',
    existingReferenceLink: '',
    suspectedServiceAreas: ['Not sure — let JoziLabs advise'],
    currentTechFootprint: [],
    beneficiaryGroup: 'Both our customers and our internal team',
    desiredOutcomes: [
      'Everything working reliably, fast, and securely',
      'A clear technical recommendation and fixed-price quote'
    ],
    guidancePreference: 'Show us a simple starter option and a full long-term option to compare',
    ongoingServicePreference: 'Solve the immediate need + ongoing monthly support if needed',
    estimatedBudget: '',
    timelinePreference: 'Within 2 – 4 weeks',
    desiredLaunchDate: '',
    milestoneDetails: ''
  },

  options: {
    problemSituations: [
      {
        value: 'launch_new',
        label: 'We have a new business or idea we want to launch',
        description: 'We want to get online, attract customers, or build a new digital product, and need guidance on the best way to build it.'
      },
      {
        value: 'fix_broken',
        label: 'Something we currently use is broken, slow or unreliable',
        description: 'A website, email system, office computer, or software tool is letting us down and we need someone to diagnose and fix it.'
      },
      {
        value: 'automate_work',
        label: 'Our team is spending too much time on manual admin',
        description: 'We rely heavily on spreadsheets, paper, or WhatsApp messages and want technology to save time and reduce mistakes.'
      },
      {
        value: 'multi_service',
        label: 'We need a mix of services (or an all-in-one tech partner)',
        description: 'Our needs span multiple areas (like web, apps, cloud, IT, or security) and we want one team to look at the whole picture.'
      }
    ],
    problemSymptoms: [
      'Customers struggle to find us online, request quotes, or buy from us',
      'We have an idea for an app, portal, or tool and do not know where to start',
      'Our current website, emails, or office systems are slow, broken, or outdated',
      'Our previous developer or IT person is unreachable and left things unfinished',
      'We are worried about losing important files, getting hacked, or POPIA compliance',
      'We want to use AI or automation to answer customer questions or speed up work'
    ],
    brokenTargetAreas: [
      'Our website or online store',
      'Company emails or cloud accounts',
      'Office laptops, Wi-Fi or printers',
      'An internal software tool or database',
      'Not sure — multiple things feel broken'
    ],
    suspectedServiceAreas: [
      'Website or Online Store',
      'Custom App, Client Portal or AI Assistant',
      'Cloud Hosting, Backups or Business Emails',
      'Office IT Support & Laptops/Wi-Fi',
      'Cybersecurity & Data Protection',
      'Staff Training or Code Tutoring',
      'Not sure — let JoziLabs advise'
    ],
    currentTechFootprint: [
      'We have a live website or domain name (.co.za / .com)',
      'We have company email addresses',
      'We have office laptops / computers for our team',
      'We track work in Excel / Google Sheets / Paper forms',
      'We use accounting or CRM software (e.g. Xero, Sage)',
      'Nothing yet — we are starting completely from scratch'
    ],
    beneficiaryGroups: [
      'Primarily our external customers / clients',
      'Primarily our internal staff & operations',
      'Both our customers and our internal team',
      'Just me (Solo founder / student / individual)'
    ],
    desiredOutcomes: [
      'More customer enquiries, bookings, or online sales',
      'Less manual paperwork and fewer repetitive admin tasks',
      'Everything working reliably, fast, and securely',
      'Look professional and trustworthy to our clients',
      'Take over and rescue an unfinished or neglected system',
      'A clear technical recommendation and fixed-price quote'
    ],
    guidancePreferences: [
      {
        value: 'Recommend the simplest, most cost-effective solution first',
        label: 'Recommend the simplest, most cost-effective solution first'
      },
      {
        value: 'Show us a simple starter option and a full long-term option to compare',
        label: 'Show us a starter option and a full option to compare'
      },
      {
        value: 'Review this brief and schedule a quick 15-min call / WhatsApp chat',
        label: 'Review this brief + schedule a quick 15-min discovery chat'
      }
    ],
    ongoingSupportOptions: [
      {
        value: 'Solve the immediate need + ongoing monthly support if needed',
        label: 'Project + Ongoing Care & Tech Partner (Recommended)',
        description: 'We solve the immediate challenge and stay on hand to maintain, host, and support your systems.'
      },
      {
        value: 'Once-off project or fix only',
        label: 'Once-Off Fix or Build Only',
        description: 'We deliver the solution or repair and hand everything over cleanly to you.'
      },
      {
        value: 'Not sure yet — advise us once you diagnose the problem',
        label: 'Advise Us After Reviewing Our Problem',
        description: 'Let JoziLabs recommend whether a once-off project or monthly care makes sense.'
      }
    ],
    budgetRanges: [
      {
        value: 'Under R5,000',
        label: 'Under R5,000',
        note: 'Quick fix, system rescue, email/IT setup, or starter presence',
        tiers: ['fix_starter']
      },
      {
        value: 'R5,000 – R15,000',
        label: 'R5,000 – R15,000',
        note: 'Full business website, cloud migration, or security/IT overhaul',
        tiers: ['standard_project']
      },
      {
        value: 'R15,000 – R35,000',
        label: 'R15,000 – R35,000',
        note: 'Custom software MVP, online store, or multi-service package',
        tiers: ['custom_multi']
      },
      {
        value: 'R35,000+ / Advise Us',
        label: 'R35,000+ / Advise Us',
        note: 'Larger custom system — or propose options based on our brief',
        tiers: ['large_or_open']
      }
    ],
    timelineOptions: [
      { value: 'Urgent — Something is broken or blocking our business', label: 'Urgent (Blocking business)' },
      { value: 'Within 1 – 2 weeks', label: 'Within 1 – 2 weeks' },
      { value: 'Within 2 – 4 weeks', label: 'Within 2 – 4 weeks' },
      { value: 'Flexible — We want the right long-term plan', label: 'Flexible / Exploring options' },
      { value: 'Specific launch date / event', label: 'Specific target date' }
    ]
  },

  getFlowState(data) {
    const isLaunchNew = data.problemSituation === 'launch_new';
    const isFixBroken = data.problemSituation === 'fix_broken';
    const isAutomateWork = data.problemSituation === 'automate_work';
    const isMultiService = data.problemSituation === 'multi_service';
    const hasPickedSituation = isLaunchNew || isFixBroken || isAutomateWork || isMultiService;

    let budgetRecommendation = {
      text: 'Pick a rough comfort zone below — or choose "R35,000+ / Advise Us" if you want us to price a few options.',
      highlightTier: ''
    };

    if (isFixBroken) {
      budgetRecommendation = {
        text: 'Typical range for diagnosing and fixing a broken website, email, or office system: Under R5,000 – R15,000.',
        highlightTier: 'fix_starter'
      };
    } else if (isLaunchNew) {
      budgetRecommendation = {
        text: 'Typical range for launching a new business presence or starter platform: Under R5,000 – R15,000.',
        highlightTier: 'standard_project'
      };
    } else if (isAutomateWork || isMultiService) {
      budgetRecommendation = {
        text: 'Typical range for workflow automation, custom tools, or a multi-service package: R15,000 – R35,000+.',
        highlightTier: 'custom_multi'
      };
    }

    return {
      isLaunchNew,
      isFixBroken,
      isAutomateWork,
      isMultiService,
      hasPickedSituation,
      showBrokenModule: isFixBroken,
      showMultiModule: isMultiService || isAutomateWork,
      showSpecificDateInput: data.timelinePreference === 'Specific launch date / event',
      budgetRecommendation
    };
  },

  getRequiredFields(stepId) {
    if (stepId === 2) {
      return ['problemSituation', 'problemSymptoms', 'problemDescription'];
    }
    if (stepId === 4) {
      return ['estimatedBudget'];
    }
    return [];
  },

  validateField(fieldName, data) {
    switch (fieldName) {
      case 'problemSituation':
        if (!data.problemSituation) {
          return 'Please select the option that best describes your current situation.';
        }
        return null;
      case 'problemSymptoms':
        if (!Array.isArray(data.problemSymptoms) || data.problemSymptoms.length === 0) {
          return 'Please select at least one statement that matches what you are experiencing.';
        }
        return null;
      case 'problemDescription':
        if (!data.problemDescription || !data.problemDescription.trim()) {
          return 'Please briefly describe your problem or idea in your own words so we can diagnose it.';
        }
        return null;
      case 'estimatedBudget':
        if (!data.estimatedBudget) {
          return 'Please select a rough budget comfort zone (or "Advise Us").';
        }
        return null;
      default:
        return null;
    }
  },

  buildReview(data, flow) {
    const situationLabel =
      this.options.problemSituations.find((s) => s.value === data.problemSituation)?.label ||
      data.problemSituation;

    const step2Items = [
      { label: 'Current Situation', value: situationLabel },
      { label: 'Matching Symptoms & Needs', tags: data.problemSymptoms, fullSpan: true },
      { label: 'In Your Own Words', value: data.problemDescription, fullSpan: true }
    ];

    if (flow.showBrokenModule) {
      step2Items.push({ label: 'What Is Affected', value: data.brokenTargetArea });
      if (data.existingReferenceLink) {
        step2Items.push({ label: 'Current Website / System Link', value: data.existingReferenceLink });
      }
    }

    if (flow.showMultiModule) {
      step2Items.push({
        label: 'Possible Areas Involved',
        tags: data.suspectedServiceAreas,
        fullSpan: true
      });
    }

    const step3Items = [
      { label: 'What You Already Have in Place', tags: data.currentTechFootprint, fullSpan: true },
      { label: 'Who Benefits Most', value: data.beneficiaryGroup },
      { label: 'Desired 30–60 Day Outcomes', tags: data.desiredOutcomes, fullSpan: true }
    ];

    const step4Items = [
      { label: 'Budget Comfort Zone (ZAR)', value: data.estimatedBudget },
      {
        label: 'Urgency / Timeline',
        value:
          flow.showSpecificDateInput && data.desiredLaunchDate
            ? `${data.desiredLaunchDate}${data.milestoneDetails ? ` (${data.milestoneDetails})` : ''}`
            : data.timelinePreference
      },
      { label: 'How We Should Guide You', value: data.guidancePreference, fullSpan: true },
      { label: 'Ongoing Partnership Preference', value: data.ongoingServicePreference, fullSpan: true }
    ];

    return [
      { stepId: 2, title: 'Your Problem, Idea & Symptoms', items: step2Items },
      { stepId: 3, title: 'Current Setup & Desired Outcomes', items: step3Items },
      { stepId: 4, title: 'Guidance Preference, Timeline & Budget', items: step4Items }
    ];
  },

  buildPayload(data, flow) {
    return {
      serviceScope: {
        problemSituation: data.problemSituation,
        problemSymptoms: data.problemSymptoms,
        problemDescriptionInOwnWords: (data.problemDescription || '').trim(),
        brokenSystemDetails: flow.showBrokenModule
          ? {
              affectedArea: data.brokenTargetArea,
              existingLinkOrSystem: (data.existingReferenceLink || '').trim() || null
            }
          : null,
        suspectedServiceAreas: flow.showMultiModule ? data.suspectedServiceAreas : null
      },
      technicalAndDeliverables: {
        currentTechFootprint: data.currentTechFootprint,
        beneficiaryGroup: data.beneficiaryGroup,
        desiredOutcomes: data.desiredOutcomes
      },
      setupBudgetAndTimeline: {
        guidancePreference: data.guidancePreference,
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
      '2. GUIDED PROBLEM DIAGNOSIS & SCOPE',
      `   • Situation:         ${p.problemSituation}`,
      `   • Key Symptoms:      ${(p.problemSymptoms || []).join('; ')}`,
      `   • Client Description: ${p.problemDescriptionInOwnWords}`
    ];

    if (p.brokenSystemDetails) {
      lines.push(
        `   • [Affected Area]:   ${p.brokenSystemDetails.affectedArea}`,
        `   • [Existing Link]:   ${p.brokenSystemDetails.existingLinkOrSystem || 'Not specified'}`
      );
    }
    if (p.suspectedServiceAreas) {
      lines.push(`   • [Suspected Areas]: ${(p.suspectedServiceAreas || []).join(', ')}`);
    }

    lines.push(
      '',
      '3. CURRENT SETUP & DESIRED OUTCOMES',
      `   • Currently Have:    ${(d.currentTechFootprint || []).join(', ') || 'Starting from scratch'}`,
      `   • Who Benefits:      ${d.beneficiaryGroup}`,
      `   • Desired Outcomes:  ${(d.desiredOutcomes || []).join(', ')}`,
      '',
      '4. GUIDANCE, TIMELINE & BUDGET',
      `   • Budget Ballpark:   ${t.estimatedBudget}`,
      `   • Target Timeline:   ${t.timelinePreference}${
        t.desiredLaunchDate ? ` (${t.desiredLaunchDate} - ${t.milestoneDetails || ''})` : ''
      }`,
      `   • Guidance Approach: ${t.guidancePreference}`,
      `   • Ongoing Support:   ${t.ongoingServicePreference}`
    );

    return lines;
  }
};

export default generalDiscoveryService;

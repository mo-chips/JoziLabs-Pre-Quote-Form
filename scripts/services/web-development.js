/**
 * JoziLabs – Service Discovery Module: Web Development
 * scripts/services/web-development.js
 *
 * Covers custom websites, landing pages, Shopify & e-commerce stores,
 * booking websites, Website Rescue (bug fixes/hacked sites), SEO, and Care Plans.
 */

export const webDevelopmentService = {
  id: 'web-development',
  title: 'Web Development',
  shortTitle: 'Web Development',
  categoryBadge: 'BUILD · FIX & GROW',
  tagline: 'Custom Websites, Web Apps, Online Stores, Redesigns, Site Rescue & SEO',
  description:
    'Mobile-first business websites, custom web apps & client portals, e-commerce stores with South African payment gateways, booking systems, website rescues, and monthly Care Plans.',
  startingPriceNote: 'Projects from R3,500 · Care Plans from R450/pm',
  estimatedTime: '~2 min discovery',
  iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/><path d="M2 7h20"/></svg>`,
  highlights: [
    'Business & Brochure Websites',
    'Custom Web Apps & Client Portals',
    'Online Stores (Shopify / Custom)',
    'Website Rescue, Speed & SEO'
  ],

  step1Config: {
    orgLabel: 'Business or project name',
    orgPlaceholder: 'e.g. Ubuntu Logistics',
    orgRequired: true,
    summaryLabel: 'In one sentence, what does your business offer?',
    summaryPlaceholder: 'e.g. We supply and install solar backup systems for homes and offices.'
  },

  stepsMeta: {
    2: {
      shortTitle: '2. Website Scope',
      title: 'Website Scope & Requirements',
      subtitle: 'Questions adapt automatically to whether you need a brand-new site or help with an existing one.'
    },
    3: {
      shortTitle: '3. Design & Extras',
      title: 'Design, Content & Website Add-ons',
      subtitle: 'Let us know what brand materials you have ready and any handy features to include.'
    },
    4: {
      shortTitle: '4. Hosting & Budget',
      title: 'Domain, Hosting, Timeline & Budget',
      subtitle: 'Quick domain/hosting check, target launch timeline, and your rough budget ballpark.'
    }
  },

  defaults: {
    siteSituation: '',
    primaryGoals: ['Get more quote requests & leads', 'Look professional & credible online'],
    newSiteType: '',
    existingWebsiteUrl: '',
    existingSiteTasks: [],
    existingSitePainPoints: [],
    existingSitePlatform: 'Not sure',
    staticPageCount: '2 – 5 pages (Small business site)',
    requiredPages: ['Home', 'About Us', 'Services', 'Contact Us'],
    additionalPages: '',
    ecommerceProductCount: '1 – 20 products',
    ecommerceGateways: ['Yoco', 'Ozow (Instant EFT)'],
    ecommerceDelivery: ['Courier integration (The Courier Guy / Bob Go)'],
    bookingType: '1-on-1 Appointments / Consultations',
    bookingPaymentRequired: 'Free booking / Pay in person',
    bookingExtras: ['Automated WhatsApp / Email reminders'],
    accountUserTypes: 'Customers / Clients',
    webappCapabilities: ['Client dashboard & status tracking'],
    customProjectNotes: '',
    newSiteBrandAssets: [],
    existingSiteKeepAssets: ['Keep our existing logo & brand colours'],
    visualStyle: 'Modern and minimalist',
    assistanceNeeded: [],
    commonAddons: ['WhatsApp floating chat button', 'Contact / Quote request form'],
    admiredWebsites: '',
    newSiteDomainStatus: 'need',
    domainNameInput: '',
    newSiteHostingNeeds: 'hosting_and_email',
    existingSiteAccessStatus: 'full_access',
    ongoingServicePreference: 'Build + Monthly Care Plan (from R450/pm)',
    estimatedBudget: '',
    timelinePreference: 'Within 2 – 4 weeks',
    desiredLaunchDate: '',
    milestoneDetails: ''
  },

  options: {
    siteSituations: [
      {
        value: 'new',
        label: 'Brand-New Website, Web App or Online Store',
        description: 'We do not have a site yet, or we are launching a brand-new website, web app, or online store from scratch.'
      },
      {
        value: 'existing',
        label: 'Existing Website or Web App (Redesign, Rescue, SEO or Upgrade)',
        description: 'We already have a live site that needs a redesign, bug fixes, speed boost, or new features.'
      }
    ],
    projectGoals: [
      'Get more quote requests & leads',
      'Look professional & credible online',
      'Sell products online',
      'Take bookings or appointments',
      'Automate admin / client web portal',
      'Rank higher on Google (Local SEO)'
    ],
    newSiteTypes: [
      {
        value: 'static',
        label: 'Business / Brochure Website',
        description: 'Mobile-first site to showcase your company, services, and capture client enquiries.'
      },
      {
        value: 'ecommerce',
        label: 'Online Store (E-commerce / Shopify)',
        description: 'Sell physical or digital products online with cart, checkout & SA payment gateways.'
      },
      {
        value: 'booking',
        label: 'Booking & Appointment Website',
        description: 'Let clients book appointments, classes, rentals, or service call-outs online.'
      },
      {
        value: 'webapp',
        label: 'Custom Web App / Client Portal',
        description: 'Interactive web application with user logins, dashboards, or database-driven business workflows.'
      }
    ],
    existingSiteTasks: [
      {
        value: 'redesign',
        label: 'Full visual redesign & modernisation',
        description: 'Give our outdated website a fresh, fast, mobile-first look.'
      },
      {
        value: 'rescue',
        label: 'Website Rescue (Fix broken features, bugs or security)',
        description: 'Repair errors, broken forms, slow loading, or recover a compromised site.'
      },
      {
        value: 'speed_seo',
        label: 'Speed & Google ranking (SEO) boost',
        description: 'Optimise for South African mobile networks, Google search, and Google Business Profile.'
      },
      {
        value: 'add_ecommerce',
        label: 'Add an online store & payments',
        description: 'Upgrade our current site so customers can buy and pay online.'
      },
      {
        value: 'add_booking',
        label: 'Add online booking / scheduling',
        description: 'Let visitors book appointments or services directly on our site.'
      },
      {
        value: 'add_portal',
        label: 'Add a web app / client login portal',
        description: 'Add customer or staff accounts, dashboards, and interactive web app functionality.'
      }
    ],
    existingSitePainPoints: [
      'Looks outdated or unprofessional',
      'Loads too slowly on mobile data',
      'Not bringing in leads or sales',
      'Hard for our team to update text/photos',
      'Forms, checkout or pages are broken',
      'Our previous developer is unavailable'
    ],
    existingSitePlatforms: [
      'WordPress',
      'Shopify',
      'Wix / Squarespace',
      'Custom code / HTML',
      'Not sure'
    ],
    staticPageCounts: [
      { value: '1 page (Single-page landing site)', label: '1 Page', note: 'Single-page scrolling site' },
      { value: '2 – 5 pages (Small business site)', label: '2 – 5 Pages', note: 'Core company essentials' },
      { value: '6 – 10 pages (Standard site)', label: '6 – 10 Pages', note: 'Detailed service breakdowns' },
      { value: '10+ pages (Large content site)', label: '10+ Pages', note: 'Extensive catalogue or content' }
    ],
    staticWebsitePages: [
      { value: 'Home', label: 'Home', tag: 'Core' },
      { value: 'About Us', label: 'About Us', tag: 'Core' },
      { value: 'Services', label: 'Services', tag: 'Core' },
      { value: 'Individual Service Pages', label: 'Individual Service Pages', tag: 'Detail' },
      { value: 'Pricing / Packages', label: 'Pricing / Packages', tag: 'Sales' },
      { value: 'Portfolio / Gallery', label: 'Portfolio / Gallery', tag: 'Showcase' },
      { value: 'Testimonials', label: 'Testimonials', tag: 'Trust' },
      { value: 'FAQ', label: 'FAQ', tag: 'Support' },
      { value: 'Our Team', label: 'Our Team', tag: 'Company' },
      { value: 'Blog / News', label: 'Blog / News', tag: 'Content' },
      { value: 'Contact Us', label: 'Contact Us', tag: 'Core' }
    ],
    ecommerceProductCounts: [
      '1 – 20 products',
      '21 – 100 products',
      '100 – 500 products',
      '500+ products',
      'Not sure yet'
    ],
    ecommercePaymentGateways: [
      'Yoco',
      'PayFast',
      'Ozow (Instant EFT)',
      'Paystack',
      'Manual EFT / Invoice',
      'Advise us on the best option'
    ],
    ecommerceDeliveryOptions: [
      'Courier integration (The Courier Guy / Bob Go)',
      'Flat-rate delivery fee',
      'In-store pickup / collection',
      'Digital products (no shipping needed)'
    ],
    bookingTypes: [
      '1-on-1 Appointments / Consultations',
      'Classes / Group Sessions',
      'Service Call-outs (at client location)',
      'Room / Venue / Equipment Rentals'
    ],
    bookingPaymentOptions: [
      'Free booking / Pay in person',
      'Deposit required online to confirm',
      'Full payment required online',
      'Not sure yet'
    ],
    bookingExtras: [
      'Automated WhatsApp / Email reminders',
      'Sync with Google / Outlook Calendar',
      'Let clients choose a specific staff member'
    ],
    accountAudienceOptions: [
      'Customers / Clients',
      'Internal Staff / Team',
      'Both Customers & Staff (Multi-role)',
      'Partners / Vendors'
    ],
    webappCapabilities: [
      'Client dashboard & status tracking',
      'View & pay invoices / statements',
      'Upload & download documents securely',
      'Custom calculator or instant quoting tool',
      'Connect to existing software / API (e.g. Xero, CRM)'
    ],
    newSiteBrandAssets: [
      'We have a logo',
      'We have brand colours',
      'We have photos of our work/products',
      'We have written text/content',
      'Starting from scratch — we have none of these yet'
    ],
    existingSiteKeepAssets: [
      'Keep our existing logo & brand colours',
      'Keep most of our existing website text',
      'Keep our existing photos & images',
      'Replace everything — we want a fresh start'
    ],
    visualStyles: [
      {
        value: 'Modern and minimalist',
        label: 'Modern & Clean',
        description: 'Simple, sharp, clutter-free, and lightweight on mobile.'
      },
      {
        value: 'Professional and corporate',
        label: 'Professional & Corporate',
        description: 'Polished and trustworthy for B2B and corporate clients.'
      },
      {
        value: 'Friendly and approachable',
        label: 'Warm & Friendly',
        description: 'Welcoming and approachable for everyday customers.'
      },
      {
        value: 'Bold and creative',
        label: 'Bold & Standout',
        description: 'High-impact colours and energetic brand personality.'
      },
      {
        value: 'Luxury and premium',
        label: 'Premium & High-End',
        description: 'Refined, editorial feel for boutique and luxury brands.'
      },
      {
        value: 'Not sure yet',
        label: 'Not sure — guide us',
        description: 'Let JoziLabs suggest a style that fits our industry.'
      }
    ],
    creativeAssistance: [
      'Logo design or brand refresh',
      'Writing the website text (Copywriting)',
      'Professional stock images or graphics'
    ],
    commonAddons: [
      'WhatsApp floating chat button',
      'Contact / Quote request form',
      'Click-to-call mobile button',
      'Google Maps & Business Profile optimisation',
      'Edit our own content / blog (CMS)',
      'AI chat assistant trained on our prices & FAQs'
    ],
    newSiteDomainStatus: [
      { value: 'own', label: 'Yes, we already own a domain' },
      { value: 'need', label: 'No, please register a new domain for us' },
      { value: 'unsure', label: 'Not sure' }
    ],
    newSiteHostingNeeds: [
      { value: 'hosting_and_email', label: 'Set up website hosting + business emails' },
      { value: 'hosting_only', label: 'Set up website hosting only (we have emails)' },
      { value: 'have_hosting', label: 'We already have our own hosting account' }
    ],
    existingSiteAccessStatus: [
      { value: 'full_access', label: 'Yes, we have the domain & hosting logins' },
      { value: 'previous_dev', label: 'Our previous developer/agency has them (need help)' },
      { value: 'unsure', label: 'Not sure — need JoziLabs to check' }
    ],
    ongoingSupportOptions: [
      {
        value: 'Build + Monthly Care Plan (from R450/pm)',
        label: 'Build + Monthly Care Plan (Recommended)',
        description: 'Starting from R450/pm — we handle hosting, security, backups, updates, and minor monthly edits.'
      },
      {
        value: 'Once-off project only',
        label: 'Once-off project only',
        description: 'We complete the website work and hand everything over to your team.'
      },
      {
        value: 'Compare both options in our quote',
        label: 'Compare both options in our quote',
        description: 'Show us the once-off cost and the optional monthly Care Plan.'
      }
    ],
    budgetRanges: [
      {
        value: 'Under R5,000',
        label: 'Under R5,000',
        note: 'Landing page / Starter site / Website Rescue or SEO fix',
        tiers: ['static_small', 'rescue', 'landing']
      },
      {
        value: 'R5,000 – R15,000',
        label: 'R5,000 – R15,000',
        note: 'Standard business site / Redesign / Booking site',
        tiers: ['static', 'redesign', 'booking']
      },
      {
        value: 'R15,000 – R25,000',
        label: 'R15,000 – R25,000',
        note: 'Online store (Shopify / E-commerce) / Advanced booking',
        tiers: ['ecommerce', 'booking']
      },
      {
        value: 'R25,000+',
        label: 'R25,000+',
        note: 'Custom web app / Client portal / Large online store',
        tiers: ['ecommerce_large', 'webapp']
      }
    ],
    timelineOptions: [
      { value: 'As soon as possible', label: 'As soon as possible' },
      { value: 'Within 2 – 4 weeks', label: 'Within 2 – 4 weeks' },
      { value: 'In 1 – 2 months', label: 'In 1 – 2 months' },
      { value: 'Flexible / No rush', label: 'Flexible / No rush' },
      { value: 'Specific launch date / event', label: 'Specific date / milestone' }
    ]
  },

  getFlowState(data) {
    const isNewSite = data.siteSituation === 'new';
    const isExistingSite = data.siteSituation === 'existing';
    const tasks = Array.isArray(data.existingSiteTasks) ? data.existingSiteTasks : [];

    const showStaticModule =
      (isNewSite && data.newSiteType === 'static') ||
      (isExistingSite && tasks.includes('redesign'));

    const showEcommerceModule =
      (isNewSite && data.newSiteType === 'ecommerce') ||
      (isExistingSite && tasks.includes('add_ecommerce'));

    const showBookingModule =
      (isNewSite && data.newSiteType === 'booking') ||
      (isExistingSite && tasks.includes('add_booking'));

    const showWebappModule =
      (isNewSite && data.newSiteType === 'webapp') ||
      (isExistingSite && tasks.includes('add_portal'));

    const wantsVisualRedesign =
      isNewSite ||
      tasks.includes('redesign') ||
      (Array.isArray(data.existingSiteKeepAssets) &&
        data.existingSiteKeepAssets.includes('Replace everything — we want a fresh start'));

    let budgetRecommendation = {
      text: 'Select the budget range that best fits your website project below.',
      highlightTier: ''
    };

    if (isNewSite) {
      if (data.newSiteType === 'static') {
        const isSmall =
          (data.staticPageCount || '').startsWith('1 ') ||
          (data.staticPageCount || '').startsWith('2 ');
        budgetRecommendation = {
          text: isSmall
            ? 'Typical range for a 1–5 page business website: Under R5,000 – R15,000.'
            : 'Typical range for a 6+ page business website: R5,000 – R15,000.',
          highlightTier: isSmall ? 'static_small' : 'static'
        };
      } else if (data.newSiteType === 'ecommerce') {
        budgetRecommendation = {
          text: 'Typical range for an online store with South African payment gateways: R15,000 – R25,000+.',
          highlightTier: 'ecommerce'
        };
      } else if (data.newSiteType === 'booking') {
        budgetRecommendation = {
          text: 'Typical range for a booking & appointment website: R5,000 – R25,000.',
          highlightTier: 'booking'
        };
      } else if (data.newSiteType === 'webapp') {
        budgetRecommendation = {
          text: 'Typical range for a custom web app or client portal: R25,000+.',
          highlightTier: 'webapp'
        };
      }
    } else if (isExistingSite) {
      if (tasks.includes('add_ecommerce') || tasks.includes('add_portal')) {
        budgetRecommendation = {
          text: 'Typical range for adding an online store or client web portal to an existing site: R15,000 – R25,000+.',
          highlightTier: tasks.includes('add_portal') ? 'webapp' : 'ecommerce'
        };
      } else if (tasks.includes('redesign')) {
        budgetRecommendation = {
          text: 'Typical range for a full website visual redesign: R5,000 – R15,000.',
          highlightTier: 'redesign'
        };
      } else if (tasks.includes('rescue') || tasks.includes('speed_seo')) {
        budgetRecommendation = {
          text: 'Typical range for Website Rescue, bug fixes, or speed/SEO optimisation: Under R5,000.',
          highlightTier: 'rescue'
        };
      }
    }

    return {
      isNewSite,
      isExistingSite,
      hasPickedSituation: isNewSite || isExistingSite,
      showStaticModule,
      showEcommerceModule,
      showBookingModule,
      showWebappModule,
      wantsVisualRedesign,
      showSpecificDateInput: data.timelinePreference === 'Specific launch date / event',
      budgetRecommendation
    };
  },

  getRequiredFields(stepId, data, flow) {
    if (stepId === 2) {
      return [
        'siteSituation',
        ...(flow.isNewSite ? ['newSiteType'] : []),
        ...(flow.isExistingSite ? ['existingWebsiteUrl', 'existingSiteTasks'] : [])
      ];
    }
    if (stepId === 4) {
      return ['estimatedBudget'];
    }
    return [];
  },

  validateField(fieldName, data, flow, helpers) {
    switch (fieldName) {
      case 'siteSituation':
        if (!data.siteSituation) {
          return 'Please select whether this is a brand-new site or an existing website.';
        }
        return null;
      case 'newSiteType':
        if (flow.isNewSite && !data.newSiteType) {
          return 'Please choose the type of new website you want to build.';
        }
        return null;
      case 'existingWebsiteUrl':
        if (flow.isExistingSite) {
          if (!data.existingWebsiteUrl || !data.existingWebsiteUrl.trim()) {
            return 'Please enter your current website address so we can inspect it.';
          }
          if (!helpers.isValidUrl(data.existingWebsiteUrl)) {
            return 'Please enter a valid website URL (e.g. mybusiness.co.za).';
          }
        }
        return null;
      case 'existingSiteTasks':
        if (
          flow.isExistingSite &&
          (!Array.isArray(data.existingSiteTasks) || data.existingSiteTasks.length === 0)
        ) {
          return 'Please select at least one thing you need done on your existing site.';
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
    const newTypeLabel =
      this.options.newSiteTypes.find((t) => t.value === data.newSiteType)?.label || data.newSiteType;
    const existingTaskLabels = (data.existingSiteTasks || []).map(
      (val) => this.options.existingSiteTasks.find((t) => t.value === val)?.label || val
    );

    const step2Items = [
      {
        label: 'Website Path',
        value: flow.isNewSite
          ? 'Brand-New Website or Online Store'
          : flow.isExistingSite
          ? 'Existing Website (Redesign, Rescue or Upgrade)'
          : 'Not selected'
      },
      { label: 'Main Goals', tags: data.primaryGoals }
    ];

    if (flow.isNewSite) {
      step2Items.push({ label: 'New Website Type', value: newTypeLabel });
    } else if (flow.isExistingSite) {
      step2Items.push(
        { label: 'Current Website URL', value: data.existingWebsiteUrl },
        { label: 'Current Platform', value: data.existingSitePlatform },
        { label: 'Requested Work', tags: existingTaskLabels, fullSpan: true }
      );
      if (Array.isArray(data.existingSitePainPoints) && data.existingSitePainPoints.length > 0) {
        step2Items.push({
          label: 'Current Frustrations',
          tags: data.existingSitePainPoints,
          fullSpan: true
        });
      }
    }

    if (flow.showStaticModule) {
      step2Items.push(
        { label: 'Estimated Size', value: data.staticPageCount },
        { label: 'Selected Pages', tags: data.requiredPages, fullSpan: true }
      );
      if (data.additionalPages) {
        step2Items.push({ label: 'Extra Pages / Languages', value: data.additionalPages });
      }
    }

    if (flow.showEcommerceModule) {
      step2Items.push(
        { label: 'Product Count', value: data.ecommerceProductCount },
        { label: 'Payment Gateways', tags: data.ecommerceGateways },
        { label: 'Delivery & Collection', tags: data.ecommerceDelivery, fullSpan: true }
      );
    }

    if (flow.showBookingModule) {
      step2Items.push(
        { label: 'Booking Type', value: data.bookingType },
        { label: 'Booking Payments', value: data.bookingPaymentRequired },
        { label: 'Booking Extras', tags: data.bookingExtras, fullSpan: true }
      );
    }

    if (flow.showWebappModule) {
      step2Items.push(
        { label: 'Who Logs In', value: data.accountUserTypes },
        { label: 'Web App / Portal Capabilities', tags: data.webappCapabilities, fullSpan: true }
      );
    }

    if (data.customProjectNotes) {
      step2Items.push({ label: 'Additional Notes', value: data.customProjectNotes, fullSpan: true });
    }

    const step3Items = [
      {
        label: flow.isExistingSite ? 'Keep from Current Site' : 'Brand Assets Ready',
        tags: flow.isExistingSite ? data.existingSiteKeepAssets : data.newSiteBrandAssets
      },
      {
        label: 'Visual Style Vibe',
        value: flow.wantsVisualRedesign ? data.visualStyle : 'Preserve existing visual design'
      },
      { label: 'Website Features Included', tags: data.commonAddons, fullSpan: true },
      ...(Array.isArray(data.assistanceNeeded) && data.assistanceNeeded.length
        ? [{ label: 'Creative Assistance Needed', tags: data.assistanceNeeded }]
        : []),
      ...(data.admiredWebsites
        ? [{ label: 'Inspiration Websites', value: data.admiredWebsites }]
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
      { label: 'Post-Launch Care Plan', value: data.ongoingServicePreference },
      ...(flow.isNewSite
        ? [
            {
              label: 'Domain & Hosting',
              value: `Domain: ${data.newSiteDomainStatus}${
                data.domainNameInput ? ` (${data.domainNameInput})` : ''
              } · Hosting: ${data.newSiteHostingNeeds}`,
              fullSpan: true
            }
          ]
        : [
            {
              label: 'Current Domain/Hosting Access',
              value:
                this.options.existingSiteAccessStatus.find(
                  (a) => a.value === data.existingSiteAccessStatus
                )?.label || data.existingSiteAccessStatus,
              fullSpan: true
            }
          ])
    ];

    return [
      { stepId: 2, title: 'Website Scope & Dynamic Requirements', items: step2Items },
      { stepId: 3, title: 'Design, Content & Website Add-ons', items: step3Items },
      { stepId: 4, title: 'Domain, Hosting, Timeline & Budget', items: step4Items }
    ];
  },

  buildPayload(data, flow) {
    return {
      serviceScope: {
        siteSituation: data.siteSituation,
        primaryGoals: data.primaryGoals,
        newSiteBranch: flow.isNewSite ? { newSiteType: data.newSiteType } : null,
        existingSiteBranch: flow.isExistingSite
          ? {
              existingWebsiteUrl: (data.existingWebsiteUrl || '').trim(),
              requestedTasks: data.existingSiteTasks,
              currentPainPoints: data.existingSitePainPoints,
              currentPlatform: data.existingSitePlatform
            }
          : null,
        dynamicModules: {
          staticPages: flow.showStaticModule
            ? {
                estimatedPageCount: data.staticPageCount,
                selectedPages: data.requiredPages,
                additionalPages: (data.additionalPages || '').trim() || null
              }
            : null,
          ecommerce: flow.showEcommerceModule
            ? {
                estimatedProductCount: data.ecommerceProductCount,
                paymentGateways: data.ecommerceGateways,
                deliveryOptions: data.ecommerceDelivery
              }
            : null,
          booking: flow.showBookingModule
            ? {
                bookingType: data.bookingType,
                paymentRequirement: data.bookingPaymentRequired,
                bookingExtras: data.bookingExtras
              }
            : null,
          webappPortal: flow.showWebappModule
            ? {
                userTypes: data.accountUserTypes,
                capabilities: data.webappCapabilities
              }
            : null
        },
        customProjectNotes: (data.customProjectNotes || '').trim() || null
      },
      technicalAndDeliverables: {
        brandAssets: flow.isNewSite ? data.newSiteBrandAssets : data.existingSiteKeepAssets,
        visualStyle: flow.wantsVisualRedesign ? data.visualStyle : 'Preserve existing visual style',
        assistanceNeeded: data.assistanceNeeded,
        commonAddons: data.commonAddons,
        admiredWebsites: (data.admiredWebsites || '').trim() || null
      },
      setupBudgetAndTimeline: {
        domainAndHosting: flow.isNewSite
          ? {
              domainStatus: data.newSiteDomainStatus,
              domainName: (data.domainNameInput || '').trim() || null,
              hostingNeeds: data.newSiteHostingNeeds
            }
          : {
              existingAccessStatus: data.existingSiteAccessStatus
            },
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
      '2. WEB DEVELOPMENT PATH & SCOPE',
      `   • Website Situation: ${p.siteSituation === 'new' ? 'Brand-New Build' : 'Existing Website'}`,
      `   • Main Goals:        ${(p.primaryGoals || []).join(', ') || 'General'}`
    ];

    if (p.newSiteBranch) {
      lines.push(`   • New Site Type:     ${p.newSiteBranch.newSiteType}`);
    }
    if (p.existingSiteBranch) {
      lines.push(
        `   • Current Website:   ${p.existingSiteBranch.existingWebsiteUrl} (${p.existingSiteBranch.currentPlatform})`,
        `   • Requested Work:    ${(p.existingSiteBranch.requestedTasks || []).join(', ')}`,
        `   • Pain Points:       ${(p.existingSiteBranch.currentPainPoints || []).join(', ') || 'None specified'}`
      );
    }
    if (p.dynamicModules?.staticPages) {
      const sp = p.dynamicModules.staticPages;
      lines.push(
        `   • [Pages Scope]:     ${sp.estimatedPageCount} | Pages: ${(sp.selectedPages || []).join(', ')}${
          sp.additionalPages ? ` (+ ${sp.additionalPages})` : ''
        }`
      );
    }
    if (p.dynamicModules?.ecommerce) {
      const ec = p.dynamicModules.ecommerce;
      lines.push(
        `   • [Store Scope]:     ${ec.estimatedProductCount} | Gateways: ${(ec.paymentGateways || []).join(', ')} | Delivery: ${(ec.deliveryOptions || []).join(', ')}`
      );
    }
    if (p.dynamicModules?.booking) {
      const bk = p.dynamicModules.booking;
      lines.push(
        `   • [Booking Scope]:   ${bk.bookingType} | Payment: ${bk.paymentRequirement} | Extras: ${(bk.bookingExtras || []).join(', ')}`
      );
    }
    if (p.dynamicModules?.webappPortal) {
      const wa = p.dynamicModules.webappPortal;
      lines.push(
        `   • [Web App/Portal]:  Users: ${wa.userTypes} | Capabilities: ${(wa.capabilities || []).join(', ')}`
      );
    }
    if (p.customProjectNotes) {
      lines.push(`   • Custom Notes:      ${p.customProjectNotes}`);
    }

    lines.push(
      '',
      '3. DESIGN, CONTENT & ADD-ONS',
      `   • Visual Style:      ${d.visualStyle}`,
      `   • Brand Assets:      ${(d.brandAssets || []).join(', ') || 'None specified'}`,
      `   • Creative Help:     ${(d.assistanceNeeded || []).join(', ') || 'None specified'}`,
      `   • Website Add-ons:   ${(d.commonAddons || []).join(', ') || 'Standard'}`,
      '',
      '4. DOMAIN, HOSTING, TIMELINE & BUDGET',
      `   • Budget Ballpark:   ${t.estimatedBudget}`,
      `   • Target Timeline:   ${t.timelinePreference}${
        t.desiredLaunchDate ? ` (${t.desiredLaunchDate} - ${t.milestoneDetails || ''})` : ''
      }`,
      `   • Ongoing Support:   ${t.ongoingServicePreference}`
    );

    return lines;
  }
};

export default webDevelopmentService;

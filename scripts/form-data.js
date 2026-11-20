/**
 * JoziLabs – Website Project Discovery Form
 * scripts/form-data.js
 *
 * Context-aware, dynamically branching discovery schema:
 * - Step 1: Local (SA Province + City) vs International (Country) toggle, plus dynamic contact preference
 * - Step 2: Branches on "New Site" vs "Existing Site", and sub-branches on New Site Type
 *   (Static/Brochure -> page count & pages, E-commerce -> products/payments/shipping,
 *    Booking -> booking rules, Web App -> roles & portal capabilities)
 * - Step 3: Adapts design/assets questions to New vs Existing + rescue/redesign scope
 * - Step 4: Adapts domain/hosting setup to New vs Existing, smart budget tip, and conditional date milestone
 * - Step 5: Dynamic review summary showing only the active branch
 */

const STORAGE_KEY = 'jozilabs_discovery_form_v3';

export const STEPS_CONFIG = [
  {
    id: 1,
    key: 'aboutYou',
    shortTitle: '1. About You',
    title: 'About You & Your Business',
    subtitle: 'Tell us who you are and where your business operates.'
  },
  {
    id: 2,
    key: 'projectScope',
    shortTitle: '2. Project Scope',
    title: 'Your Project & Requirements',
    subtitle: 'Questions below adapt automatically based on whether this is a new build or an existing site.'
  },
  {
    id: 3,
    key: 'designExtras',
    shortTitle: '3. Design & Extras',
    title: 'Design, Content & Add-ons',
    subtitle: 'Let us know what brand materials you have and any extra tools to include.'
  },
  {
    id: 4,
    key: 'setupBudget',
    shortTitle: '4. Setup & Budget',
    title: 'Hosting, Timeline & Budget',
    subtitle: 'Quick technical setup check, target timeline, and your rough budget ballpark.'
  },
  {
    id: 5,
    key: 'finalReview',
    shortTitle: '5. Quick Review',
    title: 'Review Your Project Brief',
    subtitle: 'Verify your tailored project snapshot before testing the prototype submission.'
  }
];

export const FORM_OPTIONS = {
  saProvinces: [
    'Gauteng',
    'Western Cape',
    'KwaZulu-Natal',
    'Eastern Cape',
    'Free State',
    'Limpopo',
    'Mpumalanga',
    'North West',
    'Northern Cape',
    'Nationwide (All Provinces)'
  ],

  contactChannels: [
    'Email',
    'WhatsApp',
    'Phone Call'
  ],

  industries: [
    'Retail & Online Store',
    'Professional & Consulting Services',
    'Trades, Construction & Engineering',
    'Healthcare, Medical & Wellness',
    'Education, Training & Tutoring',
    'Hospitality, Food & Events',
    'Technology & Startups',
    'Logistics, Transport & Automotive',
    'Real Estate & Property',
    'Non-Profit & Community',
    'Other / General Business'
  ],

  // Primary Branch in Step 2: New vs Existing
  siteSituations: [
    {
      value: 'new',
      label: 'Brand-New Website or App',
      description: 'We do not have a website yet, or we are launching a brand-new digital project from scratch.'
    },
    {
      value: 'existing',
      label: 'Existing Website (Redesign, Fix or Upgrade)',
      description: 'We already have a live website that needs a redesign, bug fixes, speed boost, or new features.'
    }
  ],

  // Shared Goals (Fits both New & Existing)
  projectGoals: [
    'Get more quote requests & leads',
    'Look professional & credible online',
    'Sell products online',
    'Take bookings or appointments',
    'Automate admin / client portal',
    'Rank higher on Google (SEO)'
  ],

  // Branch A: New Site Types (Drives the dynamic sub-questions!)
  newSiteTypes: [
    {
      value: 'static',
      label: 'Business / Brochure Website',
      description: 'Informational site to showcase your company, services, and capture enquiries.'
    },
    {
      value: 'ecommerce',
      label: 'Online Store (E-commerce)',
      description: 'Sell physical or digital products online with cart, checkout & SA payment gateways.'
    },
    {
      value: 'booking',
      label: 'Booking & Appointment Site',
      description: 'Let clients book appointments, classes, rentals, or service call-outs online.'
    },
    {
      value: 'webapp',
      label: 'Custom Web App / Client Portal',
      description: 'Interactive software with user logins, dashboards, or custom business workflows.'
    }
  ],

  // Branch B: Existing Site Asks
  existingSiteTasks: [
    {
      value: 'redesign',
      label: 'Full visual redesign & modernisation',
      description: 'Give our outdated website a fresh, fast, mobile-first look.'
    },
    {
      value: 'rescue',
      label: 'Fix broken features, bugs or security (Website Rescue)',
      description: 'Repair errors, broken forms, slow loading, or recover a hacked site.'
    },
    {
      value: 'speed_seo',
      label: 'Speed & Google ranking (SEO) boost',
      description: 'Optimise for South African mobile networks and local Google search.'
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
      label: 'Add a client login / portal',
      description: 'Add customer or staff accounts and dashboard functionality.'
    }
  ],

  existingSitePainPoints: [
    'Looks outdated or unprofessional',
    'Loads too slowly on mobile',
    'Not bringing in leads or sales',
    'Hard for our team to update text/photos',
    'Forms or pages are broken',
    'Our previous developer is unavailable'
  ],

  existingSitePlatforms: [
    'WordPress',
    'Shopify',
    'Wix / Squarespace',
    'Custom code / HTML',
    'Not sure'
  ],

  // Dynamic Sub-Questions: 1. Static / Business Site
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

  // Dynamic Sub-Questions: 2. E-commerce
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

  // Dynamic Sub-Questions: 3. Booking & Appointments
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

  // Dynamic Sub-Questions: 4. Custom Web App / Portal
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

  // Step 3: Design & Assets (Adapts to New vs Existing)
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
      description: 'Simple, sharp, clutter-free, and easy to read.'
    },
    {
      value: 'Professional and corporate',
      label: 'Professional & Corporate',
      description: 'Polished and trustworthy for business clients.'
    },
    {
      value: 'Friendly and approachable',
      label: 'Warm & Friendly',
      description: 'Welcoming and approachable for everyday customers.'
    },
    {
      value: 'Bold and creative',
      label: 'Bold & Standout',
      description: 'High-impact colours and energetic personality.'
    },
    {
      value: 'Luxury and premium',
      label: 'Premium & High-End',
      description: 'Refined, editorial feel for luxury brands.'
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
    'Google Maps & Business Profile link',
    'Edit our own content / blog (CMS)',
    'AI chat assistant trained on our prices & FAQs'
  ],

  // Step 4: Setup, Timeline & Budget
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
      value: 'Development and ongoing maintenance',
      label: 'Build + Monthly Care Plan (Recommended)',
      description: 'We handle hosting, security, backups, software updates, and minor edits monthly.'
    },
    {
      value: 'Once-off development',
      label: 'Once-off project only',
      description: 'We complete the work and hand everything over to your team.'
    },
    {
      value: 'Not sure yet',
      label: 'Compare both options in our quote',
      description: 'Show us the once-off cost and the optional monthly Care Plan.'
    }
  ],

  budgetRanges: [
    { value: 'Under R2,500', label: 'Under R2,500', note: 'Quick fix / starter page', tiers: ['rescue'] },
    { value: 'R2,500 – R5,000', label: 'R2,500 – R5,000', note: '1–5 page site / minor upgrade', tiers: ['static_small', 'rescue'] },
    { value: 'R5,000 – R10,000', label: 'R5,000 – R10,000', note: 'Standard business site / redesign', tiers: ['static', 'redesign', 'booking'] },
    { value: 'R10,000 – R20,000', label: 'R10,000 – R20,000', note: 'Online store / booking platform', tiers: ['ecommerce', 'booking', 'redesign'] },
    { value: 'R20,000 – R40,000', label: 'R20,000 – R40,000', note: 'Custom web app / large store', tiers: ['ecommerce', 'webapp'] },
    { value: 'R40,000+', label: 'R40,000+', note: 'Complex custom system', tiers: ['webapp'] },
    { value: 'Not sure yet', label: 'Not sure yet — advise me', note: 'Recommend options for my scope', tiers: [] }
  ],

  timelineOptions: [
    { value: 'As soon as possible', label: 'As soon as possible' },
    { value: 'Within 2 – 4 weeks', label: 'Within 2 – 4 weeks' },
    { value: 'In 1 – 2 months', label: 'In 1 – 2 months' },
    { value: 'Flexible / No rush', label: 'Flexible / No rush' },
    { value: 'Specific launch date / event', label: 'Specific date / milestone' }
  ]
};

export function createDefaultFormData() {
  return {
    // Step 1 – About You & Location
    contactName: '',
    businessName: '',
    email: '',
    preferredContact: 'Email',
    phone: '',
    industry: '',
    locationScope: 'local', // 'local' | 'international'
    province: 'Gauteng',
    city: 'Johannesburg',
    country: '',
    businessSummary: '',

    // Step 2 – Primary Branch: New vs Existing
    siteSituation: '', // 'new' | 'existing'
    primaryGoals: ['Get more quote requests & leads', 'Look professional & credible online'],

    // Step 2 – Branch A: New Site
    newSiteType: '', // 'static' | 'ecommerce' | 'booking' | 'webapp'

    // Step 2 – Branch B: Existing Site
    existingWebsiteUrl: '',
    existingSiteTasks: [],
    existingSitePainPoints: [],
    existingSitePlatform: 'Not sure',

    // Step 2 – Dynamic Sub-Module 1: Static / Business Pages
    staticPageCount: '2 – 5 pages (Small business site)',
    requiredPages: ['Home', 'About Us', 'Services', 'Contact Us'],
    additionalPages: '',

    // Step 2 – Dynamic Sub-Module 2: E-commerce
    ecommerceProductCount: '1 – 20 products',
    ecommerceGateways: ['Yoco', 'Ozow (Instant EFT)'],
    ecommerceDelivery: ['Courier integration (The Courier Guy / Bob Go)'],

    // Step 2 – Dynamic Sub-Module 3: Booking
    bookingType: '1-on-1 Appointments / Consultations',
    bookingPaymentRequired: 'Free booking / Pay in person',
    bookingExtras: ['Automated WhatsApp / Email reminders'],

    // Step 2 – Dynamic Sub-Module 4: Custom Web App / Portal
    accountUserTypes: 'Customers / Clients',
    webappCapabilities: ['Client dashboard & status tracking'],
    customProjectNotes: '',

    // Step 3 – Design, Content & Add-ons
    newSiteBrandAssets: [],
    existingSiteKeepAssets: ['Keep our existing logo & brand colours'],
    visualStyle: 'Modern and minimalist',
    assistanceNeeded: [],
    commonAddons: ['WhatsApp floating chat button', 'Contact / Quote request form'],
    admiredWebsites: '',

    // Step 4 – Setup, Timeline & Budget
    newSiteDomainStatus: 'need',
    domainNameInput: '',
    newSiteHostingNeeds: 'hosting_and_email',
    existingSiteAccessStatus: 'full_access',
    ongoingServicePreference: 'Development and ongoing maintenance',
    estimatedBudget: '',
    timelinePreference: 'Within 2 – 4 weeks',
    desiredLaunchDate: '',
    milestoneDetails: '',

    // Step 5 – Consent
    confirmAccurate: true,
    consentContact: false
  };
}

export function loadFormState() {
  const defaults = createDefaultFormData();
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { currentStep: 1, maxVisitedStep: 1, data: defaults };
    }
    const parsed = JSON.parse(raw);
    const totalSteps = STEPS_CONFIG.length;
    return {
      currentStep: Number.isInteger(parsed.currentStep)
        ? Math.min(Math.max(parsed.currentStep, 1), totalSteps)
        : 1,
      maxVisitedStep: Number.isInteger(parsed.maxVisitedStep)
        ? Math.min(Math.max(parsed.maxVisitedStep, 1), totalSteps)
        : 1,
      data: { ...defaults, ...(parsed.data || {}) }
    };
  } catch {
    return { currentStep: 1, maxVisitedStep: 1, data: defaults };
  }
}

export function saveFormState(state) {
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentStep: state.currentStep,
        maxVisitedStep: state.maxVisitedStep,
        data: state.data
      })
    );
  } catch {
    // Ignore storage quota restriction
  }
}

export function clearFormState() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore errors
  }
}

/**
 * Evaluates all dynamic visibility rules based on user answers.
 */
export function getDynamicFlowState(data) {
  const isNewSite = data.siteSituation === 'new';
  const isExistingSite = data.siteSituation === 'existing';
  const tasks = Array.isArray(data.existingSiteTasks) ? data.existingSiteTasks : [];

  // Which feature modules should appear in Step 2?
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

  // Should we ask about Visual Redesign Style in Step 3?
  // Always for New Sites; for Existing Sites, only if they selected 'redesign' or 'Replace everything'
  const wantsVisualRedesign =
    isNewSite ||
    tasks.includes('redesign') ||
    (Array.isArray(data.existingSiteKeepAssets) &&
      data.existingSiteKeepAssets.includes('Replace everything — we want a fresh start'));

  // Smart budget guidance tip based on scope
  let budgetRecommendation = {
    text: 'Select a rough ballpark below — or choose "Not sure yet" and we will guide you.',
    highlightTier: ''
  };

  if (isNewSite) {
    if (data.newSiteType === 'static') {
      const isSmall = data.staticPageCount.startsWith('1 ') || data.staticPageCount.startsWith('2 ');
      budgetRecommendation = {
        text: isSmall
          ? 'Typical range for a 1–5 page business website: R2,500 – R10,000.'
          : 'Typical range for a 6+ page business website: R5,000 – R15,000.',
        highlightTier: isSmall ? 'static_small' : 'static'
      };
    } else if (data.newSiteType === 'ecommerce') {
      budgetRecommendation = {
        text: 'Typical range for an online store with SA payment gateways: R10,000 – R25,000+.',
        highlightTier: 'ecommerce'
      };
    } else if (data.newSiteType === 'booking') {
      budgetRecommendation = {
        text: 'Typical range for a booking & appointment website: R5,000 – R20,000.',
        highlightTier: 'booking'
      };
    } else if (data.newSiteType === 'webapp') {
      budgetRecommendation = {
        text: 'Typical range for a custom web app or client portal: R15,000 – R40,000+.',
        highlightTier: 'webapp'
      };
    }
  } else if (isExistingSite) {
    if (tasks.includes('add_ecommerce') || tasks.includes('add_portal')) {
      budgetRecommendation = {
        text: 'Typical range for adding e-commerce or a client portal to an existing site: R10,000 – R25,000+.',
        highlightTier: 'ecommerce'
      };
    } else if (tasks.includes('redesign')) {
      budgetRecommendation = {
        text: 'Typical range for a full website redesign: R5,000 – R15,000.',
        highlightTier: 'redesign'
      };
    } else if (tasks.includes('rescue') || tasks.includes('speed_seo')) {
      budgetRecommendation = {
        text: 'Typical range for Website Rescue, bug fixes, or speed/SEO optimisation: Under R2,500 – R7,500.',
        highlightTier: 'rescue'
      };
    }
  }

  return {
    isLocal: data.locationScope !== 'international',
    isInternational: data.locationScope === 'international',
    isPhoneRequired: data.preferredContact === 'WhatsApp' || data.preferredContact === 'Phone Call',
    isNewSite,
    isExistingSite,
    showStaticModule,
    showEcommerceModule,
    showBookingModule,
    showWebappModule,
    wantsVisualRedesign,
    showSpecificDateInput: data.timelinePreference === 'Specific launch date / event',
    budgetRecommendation
  };
}

export function formatLocationSummary(data) {
  if (data.locationScope === 'international') {
    return data.country && data.country.trim()
      ? `International (${data.country.trim()})`
      : 'International';
  }
  const city = (data.city || '').trim();
  const province = (data.province || '').trim();
  if (city && province) return `${city}, ${province} (South Africa)`;
  if (province) return `${province} (South Africa)`;
  if (city) return `${city} (South Africa)`;
  return 'South Africa';
}

export function buildSubmissionPayload(data) {
  const flow = getDynamicFlowState(data);

  return {
    meta: {
      schemaVersion: '3.0.0-dynamic-branching-mvp',
      source: 'JoziLabs Website Project Discovery Form (Frontend Prototype)',
      generatedAt: new Date().toISOString(),
      submittedToBackend: false
    },
    clientAndLocation: {
      contactName: data.contactName.trim(),
      businessName: data.businessName.trim(),
      email: data.email.trim(),
      preferredContact: data.preferredContact,
      phone: data.phone.trim() || null,
      industry: data.industry || 'Not specified',
      locationScope: data.locationScope,
      province: flow.isLocal ? data.province : null,
      city: flow.isLocal ? data.city.trim() : null,
      country: flow.isInternational ? data.country.trim() : 'South Africa',
      formattedLocation: formatLocationSummary(data),
      businessSummary: data.businessSummary.trim() || null
    },
    projectScope: {
      siteSituation: data.siteSituation,
      primaryGoals: data.primaryGoals,
      newSiteBranch: flow.isNewSite
        ? {
            newSiteType: data.newSiteType
          }
        : null,
      existingSiteBranch: flow.isExistingSite
        ? {
            existingWebsiteUrl: data.existingWebsiteUrl.trim(),
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
              additionalPages: data.additionalPages.trim() || null
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
      customProjectNotes: data.customProjectNotes.trim() || null
    },
    designAndAddons: {
      brandAssets: flow.isNewSite ? data.newSiteBrandAssets : data.existingSiteKeepAssets,
      visualStyle: flow.wantsVisualRedesign ? data.visualStyle : 'Preserve existing visual style',
      assistanceNeeded: data.assistanceNeeded,
      commonAddons: data.commonAddons,
      admiredWebsites: data.admiredWebsites.trim() || null
    },
    setupBudgetAndTimeline: {
      domainAndHosting: flow.isNewSite
        ? {
            domainStatus: data.newSiteDomainStatus,
            domainName: data.domainNameInput.trim() || null,
            hostingNeeds: data.newSiteHostingNeeds
          }
        : {
            existingAccessStatus: data.existingSiteAccessStatus
          },
      ongoingServicePreference: data.ongoingServicePreference,
      estimatedBudget: data.estimatedBudget,
      timelinePreference: data.timelinePreference,
      desiredLaunchDate: flow.showSpecificDateInput ? data.desiredLaunchDate || null : null,
      milestoneDetails: flow.showSpecificDateInput ? data.milestoneDetails.trim() || null : null
    },
    consents: {
      confirmAccurate: Boolean(data.confirmAccurate),
      consentContact: Boolean(data.consentContact)
    }
  };
}

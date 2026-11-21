/**
 * JoziLabs – Multi-Service Discovery Form Engine
 * scripts/form-engine.js
 *
 * Central onboarding & questionnaire engine that:
 * 1. Registers all service modules from scripts/services/*.js
 * 2. Exposes the 5 core JoziLabs service pillars on the "Start a Project" hub
 *    (Web Development, Software Development, Cloud & Infrastructure, IT & Cybersecurity, Tutoring)
 * 3. Renders service-specific discovery questions for Steps 2, 3, and 4
 * 4. Evaluates conditional branching, dynamic budget recommendations, review cards,
 *    and structured JSON / plain-text brief output without forcing different services
 *    into the same rigid questionnaire.
 */

import { webDevelopmentService } from './services/web-development.js';
import { softwareDevelopmentService } from './services/software-development.js';
import { cloudServicesService } from './services/cloud-services.js';
import { itSupportService } from './services/it-support.js';
import { cybersecurityService } from './services/cybersecurity.js';
import { tutoringService } from './services/tutoring.js';
import { generalDiscoveryService } from './services/general-discovery.js';

const STORAGE_KEY = 'jozilabs_start_a_project_v4';

export const SERVICE_MODULES = {
  'web-development': webDevelopmentService,
  'software-development': softwareDevelopmentService,
  'cloud-services': cloudServicesService,
  'it-support': itSupportService,
  'cybersecurity': cybersecurityService,
  'tutoring': tutoringService,
  'general-discovery': generalDiscoveryService
};

/**
 * The 5 primary service pillars displayed on the central "Start a Project" page,
 * aligned with https://www.jozilabs.tech/services and JoziLabs' expanded offerings.
 */
export const START_PROJECT_PILLARS = [
  {
    pillarId: 'web-development',
    defaultServiceId: 'web-development',
    title: 'Web Development',
    categoryBadge: 'BUILD · FIX & GROW',
    tagline: 'Custom Websites, Web Apps, Online Stores, Redesigns, Site Rescue & SEO',
    description:
      'Mobile-first business websites, custom web apps & client portals, Shopify & e-commerce stores with SA payment gateways, booking systems, Website Rescue, and monthly Care Plans.',
    estimatedTime: '~2 min discovery',
    iconSvg: webDevelopmentService.iconSvg,
    highlights: webDevelopmentService.highlights
  },
  {
    pillarId: 'software-development',
    defaultServiceId: 'software-development',
    title: 'Software Development',
    categoryBadge: 'BUILD · MOBILE, SYSTEMS & AI',
    tagline: 'iOS & Android Mobile Apps, Internal Business Systems, APIs & AI Assistants',
    description:
      'Cross-platform Android & iOS mobile apps, internal business operations software, custom AI chat assistants trained on your data, and system integrations.',
    estimatedTime: '~2.5 min discovery',
    iconSvg: softwareDevelopmentService.iconSvg,
    highlights: softwareDevelopmentService.highlights
  },
  {
    pillarId: 'cloud-services',
    defaultServiceId: 'cloud-services',
    title: 'Cloud & Infrastructure',
    categoryBadge: 'SCALE · HOST & MIGRATE',
    tagline: 'Cloud Hosting, Server Migrations, Databases, Backups & Workspace',
    description:
      'Deploy, migrate, or optimise cloud servers, managed databases, off-site disaster recovery backups, CI/CD pipelines, and Google/M365 workspaces.',
    estimatedTime: '~2 min discovery',
    iconSvg: cloudServicesService.iconSvg,
    highlights: cloudServicesService.highlights
  },
  {
    pillarId: 'it-cybersecurity',
    defaultServiceId: 'it-support',
    subServices: [
      {
        id: 'it-support',
        label: 'IT Support & Systems',
        shortDesc: 'Helpdesk, laptops, office Wi-Fi & M365 admin'
      },
      {
        id: 'cybersecurity',
        label: 'Cybersecurity & POPIA',
        shortDesc: 'Security audits, breach rescue, MFA & email protection'
      }
    ],
    title: 'IT & Cybersecurity',
    categoryBadge: 'SUPPORT · PROTECT',
    tagline: 'Managed IT Support, Office Networks, Security Audits & Breach Rescue',
    description:
      'Complete technical support and cyber protection: choose between Managed IT Support & Office Systems or Cybersecurity Audits, Incident Rescue & POPIA readiness.',
    estimatedTime: '~2 min discovery',
    iconSvg: cybersecurityService.iconSvg,
    highlights: [
      'Remote & On-Site IT Helpdesk',
      'Office Wi-Fi, Laptops & M365 Setup',
      'Website & Email Security Audits',
      'Hacked System Rescue & POPIA'
    ]
  },
  {
    pillarId: 'tutoring',
    defaultServiceId: 'tutoring',
    title: 'Code Tutoring & Training',
    categoryBadge: 'TEACH · 1-ON-1 & GROUP',
    tagline: 'Hands-On Java, Python, Web Dev & Computer Science Lessons',
    description:
      'Practical 1-on-1 and small-group coding lessons for university CS/IT students, high school learners, career switchers, and corporate teams.',
    estimatedTime: '~1.5 min discovery',
    iconSvg: tutoringService.iconSvg,
    highlights: tutoringService.highlights
  },
  {
    pillarId: 'general-discovery',
    defaultServiceId: 'general-discovery',
    title: 'Not Sure? Help Me Scope It',
    categoryBadge: 'GUIDED · ZERO JARGON',
    tagline: 'Describe Your Problem or Idea — We Will Recommend the Right Solution',
    description:
      'Not sure how to classify your problem or need a mix of services? Tell us what is happening in plain English and our team will diagnose it and guide you.',
    estimatedTime: '~2 min guided discovery',
    iconSvg: generalDiscoveryService.iconSvg,
    highlights: generalDiscoveryService.highlights
  }
];

export const COMMON_FORM_OPTIONS = {
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
  contactChannels: ['Email', 'WhatsApp', 'Phone Call'],
  industries: [
    'Retail & Online Store',
    'Professional & Consulting Services',
    'Trades, Construction & Engineering',
    'Healthcare, Medical & Wellness',
    'Education, Training & Academic',
    'Hospitality, Food & Events',
    'Technology, SaaS & Startups',
    'Logistics, Transport & Automotive',
    'Finance, Legal & Property',
    'Non-Profit & Community',
    'Student / Individual Learner',
    'Other / General Business'
  ]
};

export function getServiceModule(serviceId) {
  if (serviceId === 'it-cybersecurity') {
    return SERVICE_MODULES['it-support'];
  }
  return SERVICE_MODULES[serviceId] || SERVICE_MODULES['web-development'];
}

export function getStepsConfig(serviceId) {
  const service = getServiceModule(serviceId);
  const isTutoring = service.id === 'tutoring';

  return [
    {
      id: 1,
      key: 'aboutYou',
      shortTitle: '1. About You',
      title: isTutoring ? 'About You & Learner Profile' : 'About You & Your Business',
      subtitle: isTutoring
        ? 'Tell us who you are, how to reach you, and where you are based.'
        : 'Tell us who you are, how to send your quote, and where your organisation operates.'
    },
    {
      id: 2,
      key: 'serviceScope',
      shortTitle: service.stepsMeta[2].shortTitle,
      title: service.stepsMeta[2].title,
      subtitle: service.stepsMeta[2].subtitle
    },
    {
      id: 3,
      key: 'technicalContext',
      shortTitle: service.stepsMeta[3].shortTitle,
      title: service.stepsMeta[3].title,
      subtitle: service.stepsMeta[3].subtitle
    },
    {
      id: 4,
      key: 'setupBudget',
      shortTitle: service.stepsMeta[4].shortTitle,
      title: service.stepsMeta[4].title,
      subtitle: service.stepsMeta[4].subtitle
    },
    {
      id: 5,
      key: 'finalReview',
      shortTitle: '5. Quick Review',
      title: `Review Your ${service.title} Brief`,
      subtitle: 'Verify your tailored discovery snapshot before generating your project brief.'
    }
  ];
}

export function createCommonDefaults() {
  return {
    contactName: '',
    businessName: '',
    email: '',
    preferredContact: 'Email',
    phone: '',
    industry: '',
    locationScope: 'local',
    province: 'Gauteng',
    city: 'Johannesburg',
    country: '',
    businessSummary: '',
    confirmAccurate: true,
    consentContact: false
  };
}

export function createDefaultServiceDataMap() {
  const map = {};
  Object.entries(SERVICE_MODULES).forEach(([id, mod]) => {
    map[id] = structuredClone ? structuredClone(mod.defaults) : JSON.parse(JSON.stringify(mod.defaults));
  });
  return map;
}

export function createInitialAppState() {
  return {
    selectedServiceId: null, // null means show Central "Start a Project" Hub
    currentStep: 1,
    maxVisitedStep: 1,
    commonData: createCommonDefaults(),
    serviceData: createDefaultServiceDataMap()
  };
}

export function loadAppState() {
  const initial = createInitialAppState();
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return initial;

    const parsed = JSON.parse(raw);
    const selectedServiceId =
      parsed.selectedServiceId && SERVICE_MODULES[parsed.selectedServiceId]
        ? parsed.selectedServiceId
        : null;

    const mergedServiceData = { ...initial.serviceData };
    if (parsed.serviceData && typeof parsed.serviceData === 'object') {
      Object.keys(SERVICE_MODULES).forEach((id) => {
        if (parsed.serviceData[id]) {
          mergedServiceData[id] = {
            ...initial.serviceData[id],
            ...parsed.serviceData[id]
          };
        }
      });
    }

    return {
      selectedServiceId,
      currentStep: Number.isInteger(parsed.currentStep)
        ? Math.min(Math.max(parsed.currentStep, 1), 5)
        : 1,
      maxVisitedStep: Number.isInteger(parsed.maxVisitedStep)
        ? Math.min(Math.max(parsed.maxVisitedStep, 1), 5)
        : 1,
      commonData: { ...initial.commonData, ...(parsed.commonData || {}) },
      serviceData: mergedServiceData
    };
  } catch {
    return initial;
  }
}

export function saveAppState(state) {
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selectedServiceId: state.selectedServiceId,
        currentStep: state.currentStep,
        maxVisitedStep: state.maxVisitedStep,
        commonData: state.commonData,
        serviceData: state.serviceData
      })
    );
  } catch {
    // Ignore storage quota errors
  }
}

export function clearAppState() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore errors
  }
}

/**
 * Merges common Step 1/5 data with the active service's Step 2-4 data.
 */
export function getActiveFlatData(state) {
  const serviceId = state.selectedServiceId || 'web-development';
  const activeServiceData = state.serviceData[serviceId] || {};
  return {
    ...state.commonData,
    ...activeServiceData
  };
}

/**
 * Writes a field change back into either commonData or the active service's serviceData bucket.
 */
export function writeFieldToAppState(state, fieldName, value) {
  const commonKeys = Object.keys(state.commonData);
  if (commonKeys.includes(fieldName)) {
    state.commonData[fieldName] = value;
  } else {
    const serviceId = state.selectedServiceId || 'web-development';
    if (!state.serviceData[serviceId]) {
      state.serviceData[serviceId] = {};
    }
    state.serviceData[serviceId][fieldName] = value;
  }
  saveAppState(state);
}

/**
 * Evaluates common + service-specific flow state.
 */
export function getDynamicFlowState(serviceId, data) {
  const service = getServiceModule(serviceId);
  const serviceFlow = service.getFlowState(data);

  return {
    serviceId: service.id,
    isLocal: data.locationScope !== 'international',
    isInternational: data.locationScope === 'international',
    isPhoneRequired: data.preferredContact === 'WhatsApp' || data.preferredContact === 'Phone Call',
    isOrgRequired: Boolean(service.step1Config?.orgRequired),
    ...serviceFlow
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

/* ============================================================
   HTML ESCAPING & UI COMPONENT BUILDERS
   ============================================================ */
export function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderChoiceCardsHtml(fieldName, options, twoCol = false) {
  const gridClass = twoCol ? 'choice-cards-grid two-up-cards' : 'choice-cards-grid';
  return `
    <div class="${gridClass}">
      ${options
        .map(
          (opt) => `
          <label class="choice-card">
            <input type="radio" name="${escapeHtml(fieldName)}" value="${escapeHtml(opt.value)}">
            <span class="choice-card-content">
              <span class="choice-card-title">${escapeHtml(opt.label)}</span>
              <span class="choice-card-desc">${escapeHtml(opt.description)}</span>
            </span>
          </label>
        `
        )
        .join('')}
    </div>
  `;
}

function renderCheckboxCardsHtml(fieldName, options, twoCol = false) {
  const gridClass = twoCol ? 'choice-cards-grid two-up-cards' : 'choice-cards-grid';
  return `
    <div class="${gridClass}">
      ${options
        .map(
          (opt) => `
          <label class="choice-card">
            <input type="checkbox" name="${escapeHtml(fieldName)}" value="${escapeHtml(opt.value)}">
            <span class="choice-card-content">
              <span class="choice-card-title">${escapeHtml(opt.label)}</span>
              <span class="choice-card-desc">${escapeHtml(opt.description)}</span>
            </span>
          </label>
        `
        )
        .join('')}
    </div>
  `;
}

function renderCheckboxPillsHtml(fieldName, items, singleCol = false) {
  const gridClass = singleCol
    ? 'checkbox-pill-grid single-col-pills'
    : 'checkbox-pill-grid';
  return `
    <div class="${gridClass}">
      ${items
        .map(
          (item) => `
          <label class="check-pill">
            <span class="check-pill-left">
              <input type="checkbox" name="${escapeHtml(fieldName)}" value="${escapeHtml(item)}">
              <span class="check-pill-label">${escapeHtml(item)}</span>
            </span>
          </label>
        `
        )
        .join('')}
    </div>
  `;
}

function renderTaggedCheckboxPillsHtml(fieldName, items) {
  return `
    <div class="page-selector-grid">
      ${items
        .map(
          (item) => `
          <label class="check-pill">
            <span class="check-pill-left">
              <input type="checkbox" name="${escapeHtml(fieldName)}" value="${escapeHtml(item.value)}">
              <span class="check-pill-label">${escapeHtml(item.label)}</span>
            </span>
            <span class="check-pill-tag">${escapeHtml(item.tag)}</span>
          </label>
        `
        )
        .join('')}
    </div>
  `;
}

function renderRadioPillsHtml(fieldName, items) {
  return `
    <div class="radio-inline-group">
      ${items
        .map((item) => {
          const val = typeof item === 'object' ? item.value : item;
          const label = typeof item === 'object' ? item.label : item;
          return `
            <label class="radio-pill">
              <input type="radio" name="${escapeHtml(fieldName)}" value="${escapeHtml(val)}">
              <span>${escapeHtml(label)}</span>
            </label>
          `;
        })
        .join('')}
    </div>
  `;
}

export function renderBudgetCardsHtml(budgetRanges, currentVal = '', highlightTier = '') {
  return budgetRanges
    .map((range) => {
      const isRecommended = highlightTier && Array.isArray(range.tiers) && range.tiers.includes(highlightTier);
      const recBadge = isRecommended
        ? `<span class="budget-recommended-pill">Typical</span>`
        : '';
      const checkedAttr = currentVal === range.value ? 'checked' : '';
      return `
        <label class="budget-card ${isRecommended ? 'is-recommended' : ''}">
          <span class="budget-card-top">
            <input type="radio" name="estimatedBudget" value="${escapeHtml(range.value)}" ${checkedAttr}>
            <span class="budget-card-amount">${escapeHtml(range.label)}</span>
            ${recBadge}
          </span>
          <span class="budget-card-note">${escapeHtml(range.note)}</span>
        </label>
      `;
    })
    .join('');
}

function renderSharedStep4BudgetAndTimelineHtml(service, budgetLabel = 'What is your rough budget ballpark (ZAR)?', timelineLabel = 'When would you ideally like this ready?', supportLabel = 'How would you like us to support you going forward?') {
  const o = service.options;
  return `
    <fieldset class="form-fieldset" data-field-group="estimatedBudget">
      <legend class="form-label">
        ${escapeHtml(budgetLabel)} <span class="req-star" aria-hidden="true">*</span>
      </legend>
      <div class="disclaimer-callout">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4M12 8h.01"></path>
        </svg>
        <div>
          <strong id="dynamic-budget-tip">Typical range for your selection will appear here.</strong>
          <div style="margin-top: 0.15rem;">These discovery ranges help us recommend the right approach — every client receives a transparent, fixed-price quote first.</div>
        </div>
      </div>

      <div class="budget-cards-grid" id="estimatedBudget-container">
        ${renderBudgetCardsHtml(o.budgetRanges)}
      </div>
      <p class="field-error" id="error-estimatedBudget" role="alert" hidden></p>
    </fieldset>

    <fieldset class="form-fieldset card-fieldset">
      <legend class="form-label">${escapeHtml(timelineLabel)}</legend>
      ${renderRadioPillsHtml('timelinePreference', o.timelineOptions)}

      <div class="field-grid two-col conditional-subbox" id="conditional-specific-date" hidden>
        <div class="form-group">
          <label for="desiredLaunchDate" class="form-label">Target date</label>
          <input type="date" id="desiredLaunchDate" name="desiredLaunchDate" class="form-control">
        </div>
        <div class="form-group">
          <label for="milestoneDetails" class="form-label">What is the event, exam or milestone?</label>
          <input
            type="text"
            id="milestoneDetails"
            name="milestoneDetails"
            class="form-control"
            placeholder="e.g. Product launch, office move, semester exam, compliance deadline"
          >
        </div>
      </div>
    </fieldset>

    <fieldset class="form-fieldset" data-field-group="ongoingServicePreference">
      <legend class="form-label">${escapeHtml(supportLabel)}</legend>
      ${renderChoiceCardsHtml('ongoingServicePreference', o.ongoingSupportOptions)}
    </fieldset>
  `;
}

/* ============================================================
   DYNAMIC STEP TEMPLATE GENERATORS PER SERVICE (STEPS 2, 3, 4)
   ============================================================ */
export function renderServiceStepsHtml(serviceId) {
  const service = getServiceModule(serviceId);
  const o = service.options;

  switch (service.id) {
    /* ------------------------------------------------------------
       1. WEB DEVELOPMENT
       ------------------------------------------------------------ */
    case 'web-development':
      return {
        step2: `
          <fieldset class="form-fieldset" data-field-group="siteSituation">
            <legend class="form-label">
              First, are we building a brand-new website or working on an existing one? <span class="req-star" aria-hidden="true">*</span>
            </legend>
            ${renderChoiceCardsHtml('siteSituation', o.siteSituations, true)}
            <p class="field-error" id="error-siteSituation" role="alert" hidden></p>
          </fieldset>

          <div id="web-shared-goals" hidden>
            <fieldset class="form-fieldset" data-field-group="primaryGoals">
              <legend class="form-label">
                What are your main goals for the website? <span class="opt-badge">Tap all that apply</span>
              </legend>
              ${renderCheckboxPillsHtml('primaryGoals', o.projectGoals)}
            </fieldset>
          </div>

          <div id="web-branch-new" class="dynamic-branch-panel" hidden>
            <div class="branch-indicator-bar">
              <span class="conditional-badge">New Website Path</span>
              <span>Choose the type of new site below — the next questions adapt automatically.</span>
            </div>
            <fieldset class="form-fieldset" data-field-group="newSiteType">
              <legend class="form-label">
                What type of new website are we building? <span class="req-star" aria-hidden="true">*</span>
              </legend>
              ${renderChoiceCardsHtml('newSiteType', o.newSiteTypes, true)}
              <p class="field-error" id="error-newSiteType" role="alert" hidden></p>
            </fieldset>
          </div>

          <div id="web-branch-existing" class="dynamic-branch-panel" hidden>
            <div class="branch-indicator-bar">
              <span class="conditional-badge">Existing Website Path</span>
              <span>Share your current site link and tell us what needs fixing, upgrading, or redesigning.</span>
            </div>
            <div class="field-grid two-col" style="margin-bottom: 1.35rem;">
              <div class="form-group" data-field-group="existingWebsiteUrl">
                <label for="existingWebsiteUrl" class="form-label">
                  Current website URL <span class="req-star" aria-hidden="true">*</span>
                </label>
                <input
                  type="url"
                  id="existingWebsiteUrl"
                  name="existingWebsiteUrl"
                  class="form-control"
                  placeholder="e.g. www.mycurrentsite.co.za"
                  aria-describedby="error-existingWebsiteUrl"
                >
                <p class="field-error" id="error-existingWebsiteUrl" role="alert" hidden></p>
              </div>
              <fieldset class="form-fieldset" data-field-group="existingSitePlatform">
                <legend class="form-label">
                  What is it currently built on? <span class="opt-badge">If known</span>
                </legend>
                ${renderRadioPillsHtml('existingSitePlatform', o.existingSitePlatforms)}
              </fieldset>
            </div>

            <fieldset class="form-fieldset" data-field-group="existingSiteTasks">
              <legend class="form-label">
                What do you need us to do on your existing site? <span class="req-star" aria-hidden="true">*</span>
              </legend>
              <span class="field-hint">Select one or more. Choosing store or booking upgrades will unlock quick options below.</span>
              ${renderCheckboxCardsHtml('existingSiteTasks', o.existingSiteTasks)}
              <p class="field-error" id="error-existingSiteTasks" role="alert" hidden></p>
            </fieldset>

            <fieldset class="form-fieldset" data-field-group="existingSitePainPoints">
              <legend class="form-label">
                What is frustrating you most about the current site? <span class="opt-badge">Optional</span>
              </legend>
              ${renderCheckboxPillsHtml('existingSitePainPoints', o.existingSitePainPoints)}
            </fieldset>
          </div>

          <div id="web-module-static" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Dynamic Scope · Pages &amp; Structure</span>
              <h3>How big should the website be?</h3>
            </div>
            <fieldset class="form-fieldset">
              <legend class="form-label">Estimated number of pages</legend>
              <div class="budget-cards-grid">
                ${o.staticPageCounts
                  .map(
                    (item) => `
                    <label class="budget-card">
                      <span class="budget-card-top">
                        <input type="radio" name="staticPageCount" value="${escapeHtml(item.value)}">
                        <span class="budget-card-amount">${escapeHtml(item.label)}</span>
                      </span>
                      <span class="budget-card-note">${escapeHtml(item.note)}</span>
                    </label>
                  `
                  )
                  .join('')}
              </div>
            </fieldset>

            <fieldset class="form-fieldset" style="margin-bottom: 0.75rem;">
              <div class="fieldset-header-row">
                <legend class="form-label">Which pages / sections do you need?</legend>
                <button type="button" class="btn btn-xs btn-ghost" id="select-core-pages-btn">Reset to core pages</button>
              </div>
              ${renderTaggedCheckboxPillsHtml('requiredPages', o.staticWebsitePages)}
            </fieldset>

            <div class="form-group" style="margin-bottom: 0;">
              <label for="additionalPages" class="form-label">
                Any other custom pages or multiple languages? <span class="opt-badge">Optional</span>
              </label>
              <input
                type="text"
                id="additionalPages"
                name="additionalPages"
                class="form-control"
                placeholder="e.g. Service area pages, Careers, or isiZulu / Afrikaans toggle"
              >
            </div>
          </div>

          <div id="web-module-ecommerce" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Dynamic Scope · Online Store &amp; Payments</span>
              <h3>Store &amp; Checkout Configuration</h3>
            </div>
            <fieldset class="form-fieldset">
              <legend class="form-label">Roughly how many products will you sell?</legend>
              ${renderRadioPillsHtml('ecommerceProductCount', o.ecommerceProductCounts)}
            </fieldset>
            <div class="field-grid two-col" style="margin-bottom: 0;">
              <fieldset class="form-fieldset" style="margin-bottom: 0;">
                <legend class="form-label">Preferred payment gateways</legend>
                ${renderCheckboxPillsHtml('ecommerceGateways', o.ecommercePaymentGateways, true)}
              </fieldset>
              <fieldset class="form-fieldset" style="margin-bottom: 0;">
                <legend class="form-label">Delivery &amp; collection options</legend>
                ${renderCheckboxPillsHtml('ecommerceDelivery', o.ecommerceDeliveryOptions, true)}
              </fieldset>
            </div>
          </div>

          <div id="web-module-booking" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Dynamic Scope · Bookings &amp; Scheduling</span>
              <h3>Appointment &amp; Booking Setup</h3>
            </div>
            <div class="field-grid two-col">
              <fieldset class="form-fieldset">
                <legend class="form-label">What will customers book?</legend>
                ${renderRadioPillsHtml('bookingType', o.bookingTypes)}
              </fieldset>
              <fieldset class="form-fieldset">
                <legend class="form-label">Do bookings require online payment?</legend>
                ${renderRadioPillsHtml('bookingPaymentRequired', o.bookingPaymentOptions)}
              </fieldset>
            </div>
            <fieldset class="form-fieldset" style="margin-bottom: 0;">
              <legend class="form-label">Helpful booking extras</legend>
              ${renderCheckboxPillsHtml('bookingExtras', o.bookingExtras)}
            </fieldset>
          </div>

          <div id="web-module-webapp" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Dynamic Scope · Web App &amp; Client Portal</span>
              <h3>User Accounts &amp; Web Application Capabilities</h3>
            </div>
            <fieldset class="form-fieldset">
              <legend class="form-label">Who will log into the web application?</legend>
              ${renderRadioPillsHtml('accountUserTypes', o.accountAudienceOptions)}
            </fieldset>
            <fieldset class="form-fieldset" style="margin-bottom: 0;">
              <legend class="form-label">What should logged-in users be able to do?</legend>
              ${renderCheckboxPillsHtml('webappCapabilities', o.webappCapabilities)}
            </fieldset>
          </div>

          <div id="web-notes-block" class="form-group" style="margin-top: 1.25rem;" hidden>
            <label for="customProjectNotes" class="form-label">
              Anything specific about your website requirements we should know? <span class="opt-badge">Optional</span>
            </label>
            <input
              type="text"
              id="customProjectNotes"
              name="customProjectNotes"
              class="form-control"
              placeholder="e.g. Integrate with our WhatsApp catalogue, fix checkout errors, or migrate from Wix..."
            >
          </div>
        `,
        step3: `
          <fieldset class="form-fieldset" id="web-design-new-block">
            <legend class="form-label">
              What brand materials do you already have ready? <span class="opt-badge">Tap all you have</span>
            </legend>
            ${renderCheckboxPillsHtml('newSiteBrandAssets', o.newSiteBrandAssets)}
          </fieldset>

          <fieldset class="form-fieldset" id="web-design-existing-block" hidden>
            <legend class="form-label">
              What should we keep from your current website? <span class="opt-badge">Tap all that apply</span>
            </legend>
            ${renderCheckboxPillsHtml('existingSiteKeepAssets', o.existingSiteKeepAssets)}
          </fieldset>

          <fieldset class="form-fieldset" id="web-visual-style-fieldset">
            <legend class="form-label">
              What visual vibe fits your brand best? <span class="opt-badge">Tap one</span>
            </legend>
            ${renderChoiceCardsHtml('visualStyle', o.visualStyles)}
          </fieldset>

          <div id="web-visual-preserved-note" class="disclaimer-callout" hidden>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
            <span><strong>Keeping your current look:</strong> Because you selected fixes, upgrades, or SEO on your existing site (rather than a visual redesign), we skipped the style questions and will preserve your current branding.</span>
          </div>

          <div class="field-grid two-col">
            <fieldset class="form-fieldset card-fieldset">
              <legend class="form-label">
                Need JoziLabs to help create any of these? <span class="opt-badge">Optional</span>
              </legend>
              ${renderCheckboxPillsHtml('assistanceNeeded', o.creativeAssistance, true)}
            </fieldset>
            <fieldset class="form-fieldset card-fieldset">
              <legend class="form-label">
                Handy features to include <span class="opt-badge">Tap any you want</span>
              </legend>
              ${renderCheckboxPillsHtml('commonAddons', o.commonAddons, true)}
            </fieldset>
          </div>

          <div class="form-group">
            <label for="admiredWebsites" class="form-label">
              Any websites you admire or want us to use as inspiration? <span class="opt-badge">Optional</span>
            </label>
            <input
              type="text"
              id="admiredWebsites"
              name="admiredWebsites"
              class="form-control"
              placeholder="Paste a website link or mention a brand whose look you love..."
            >
          </div>
        `,
        step4: `
          <div id="web-setup-new" class="field-grid two-col" style="margin-bottom: 1.5rem;">
            <fieldset class="form-fieldset card-fieldset">
              <legend class="form-label">
                Do you already own a domain name (e.g. <code>.co.za</code>)?
              </legend>
              ${renderRadioPillsHtml('newSiteDomainStatus', o.newSiteDomainStatus)}
              <div class="form-group" style="margin-top: 0.85rem; margin-bottom: 0;">
                <label for="domainNameInput" class="form-label" id="label-domainNameInput">
                  Preferred domain name (if you have an idea) <span class="opt-badge">Optional</span>
                </label>
                <input
                  type="text"
                  id="domainNameInput"
                  name="domainNameInput"
                  class="form-control"
                  placeholder="e.g. ubuntulogistics.co.za"
                >
              </div>
            </fieldset>
            <fieldset class="form-fieldset card-fieldset">
              <legend class="form-label">
                Do you need website hosting &amp; business emails?
              </legend>
              <span class="field-hint">For example: <code>info@yourcompany.co.za</code></span>
              ${renderRadioPillsHtml('newSiteHostingNeeds', o.newSiteHostingNeeds)}
            </fieldset>
          </div>

          <div id="web-setup-existing" style="margin-bottom: 1.5rem;" hidden>
            <fieldset class="form-fieldset card-fieldset">
              <legend class="form-label">
                Do you have login access to your current domain &amp; website hosting?
              </legend>
              <span class="field-hint">No stress if your old developer has them — we help clients recover and transfer domains regularly.</span>
              ${renderRadioPillsHtml('existingSiteAccessStatus', o.existingSiteAccessStatus)}
            </fieldset>
          </div>

          ${renderSharedStep4BudgetAndTimelineHtml(
            service,
            'What is your rough budget ballpark (ZAR)?',
            'When would you ideally like the website ready?',
            'How would you like us to support you after launch?'
          )}
        `
      };

    /* ------------------------------------------------------------
       2. SOFTWARE DEVELOPMENT
       ------------------------------------------------------------ */
    case 'software-development':
      return {
        step2: `
          <fieldset class="form-fieldset" data-field-group="softwareSituation">
            <legend class="form-label">
              What best describes your software project? <span class="req-star" aria-hidden="true">*</span>
            </legend>
            ${renderChoiceCardsHtml('softwareSituation', o.softwareSituations)}
            <p class="field-error" id="error-softwareSituation" role="alert" hidden></p>
          </fieldset>

          <fieldset class="form-fieldset" data-field-group="softwareProductType">
            <legend class="form-label">
              What type of software solution are we building or upgrading? <span class="req-star" aria-hidden="true">*</span>
            </legend>
            ${renderChoiceCardsHtml('softwareProductType', o.softwareProductTypes, true)}
            <p class="field-error" id="error-softwareProductType" role="alert" hidden></p>
          </fieldset>

          <fieldset class="form-fieldset">
            <legend class="form-label">
              What are the primary business outcomes for this software? <span class="opt-badge">Tap all that apply</span>
            </legend>
            ${renderCheckboxPillsHtml('softwarePrimaryGoals', o.softwarePrimaryGoals)}
          </fieldset>

          <div id="sw-branch-existing" class="dynamic-branch-panel" hidden>
            <div class="branch-indicator-bar">
              <span class="conditional-badge">Existing System Details</span>
              <span>Tell us about the current software or codebase we will be working with.</span>
            </div>
            <div class="field-grid two-col">
              <fieldset class="form-fieldset">
                <legend class="form-label">Current technology stack <span class="opt-badge">If known</span></legend>
                ${renderRadioPillsHtml('existingTechStack', o.existingTechStacks)}
              </fieldset>
              <div class="form-group">
                <label for="existingSystemContext" class="form-label">
                  Current app link, repository status or key bugs <span class="opt-badge">Optional</span>
                </label>
                <textarea
                  id="existingSystemContext"
                  name="existingSystemContext"
                  class="form-control"
                  rows="3"
                  placeholder="e.g. GitHub repo available, built in React + Node, need to complete payment flow and fix mobile responsiveness..."
                ></textarea>
              </div>
            </div>
          </div>

          <div id="sw-module-mobile" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Dynamic Scope · Mobile Application (Android / iOS)</span>
              <h3>Mobile Platforms &amp; Smartphone Capabilities</h3>
            </div>
            <fieldset class="form-fieldset">
              <legend class="form-label">Which platforms should the mobile app run on?</legend>
              ${renderRadioPillsHtml('mobileTargetPlatforms', o.mobileTargetPlatforms)}
            </fieldset>
            <fieldset class="form-fieldset" style="margin-bottom: 0;">
              <legend class="form-label">Native smartphone features needed</legend>
              ${renderCheckboxPillsHtml('mobileDeviceFeatures', o.mobileDeviceFeatures)}
            </fieldset>
          </div>

          <div id="sw-module-portal" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Dynamic Scope · Internal Software &amp; Operations Systems</span>
              <h3>User Roles &amp; Core Software Capabilities</h3>
            </div>
            <fieldset class="form-fieldset">
              <legend class="form-label">Who will use the software system?</legend>
              ${renderRadioPillsHtml('portalUserRoles', o.portalUserRoles)}
            </fieldset>
            <fieldset class="form-fieldset" style="margin-bottom: 0;">
              <legend class="form-label">Key functional modules required</legend>
              ${renderCheckboxPillsHtml('portalCapabilities', o.portalCapabilities)}
            </fieldset>
          </div>

          <div id="sw-module-ai" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Dynamic Scope · Custom AI Assistant &amp; Automation</span>
              <h3>AI Training Data &amp; Automation Use Cases</h3>
            </div>
            <fieldset class="form-fieldset">
              <legend class="form-label">What should the AI assistant or automation do?</legend>
              ${renderCheckboxPillsHtml('aiUseCases', o.aiUseCases, true)}
            </fieldset>
            <fieldset class="form-fieldset" style="margin-bottom: 0;">
              <legend class="form-label">What business data should it learn from?</legend>
              ${renderCheckboxPillsHtml('aiDataSources', o.aiDataSources)}
            </fieldset>
          </div>

          <div class="form-group" style="margin-top: 1.25rem;">
            <label for="softwareCustomNotes" class="form-label">
              Describe a typical user journey or workflow in a sentence or two <span class="opt-badge">Optional</span>
            </label>
            <textarea
              id="softwareCustomNotes"
              name="softwareCustomNotes"
              class="form-control"
              rows="2"
              placeholder="e.g. A client logs in, requests a quote, our admin approves it, and an invoice is pushed to Xero..."
            ></textarea>
          </div>
        `,
        step3: `
          <fieldset class="form-fieldset">
            <legend class="form-label">
              How far along are your specifications or designs?
            </legend>
            ${renderChoiceCardsHtml('specReadiness', o.specReadinessOptions, true)}
          </fieldset>

          <div class="field-grid two-col">
            <fieldset class="form-fieldset card-fieldset">
              <legend class="form-label">
                External systems &amp; APIs to integrate <span class="opt-badge">Tap all needed</span>
              </legend>
              ${renderCheckboxPillsHtml('softwareIntegrations', o.softwareIntegrations, true)}
            </fieldset>

            <fieldset class="form-fieldset card-fieldset">
              <legend class="form-label">
                Security, access &amp; data requirements <span class="opt-badge">Tap all needed</span>
              </legend>
              ${renderCheckboxPillsHtml('softwareDataSecurity', o.softwareDataSecurity, true)}
            </fieldset>
          </div>

          <div class="form-group">
            <label for="softwareReferenceApps" class="form-label">
              Are there any existing apps or tools similar to what you want to build? <span class="opt-badge">Optional</span>
            </label>
            <input
              type="text"
              id="softwareReferenceApps"
              name="softwareReferenceApps"
              class="form-control"
              placeholder="e.g. Similar to Uber for local couriers, or a simpler version of Monday.com for our workshop"
            >
          </div>
        `,
        step4: `
          <fieldset class="form-fieldset card-fieldset" style="margin-bottom: 1.5rem;">
            <legend class="form-label">
              How should the software be hosted &amp; deployed?
            </legend>
            ${renderRadioPillsHtml('softwareDeploymentPref', o.softwareDeploymentOptions)}
          </fieldset>

          ${renderSharedStep4BudgetAndTimelineHtml(
            service,
            'What is your rough budget ballpark for this software build (ZAR)?',
            'When would you ideally like the first version (MVP) ready?',
            'How would you like to structure delivery and post-launch support?'
          )}
        `
      };

    /* ------------------------------------------------------------
       3. CLOUD & INFRASTRUCTURE
       ------------------------------------------------------------ */
    case 'cloud-services':
      return {
        step2: `
          <fieldset class="form-fieldset" data-field-group="cloudSituation">
            <legend class="form-label">
              What is the primary goal of your cloud or infrastructure project? <span class="req-star" aria-hidden="true">*</span>
            </legend>
            ${renderChoiceCardsHtml('cloudSituation', o.cloudSituations)}
            <p class="field-error" id="error-cloudSituation" role="alert" hidden></p>
          </fieldset>

          <fieldset class="form-fieldset" data-field-group="cloudFocusAreas">
            <legend class="form-label">
              Which infrastructure areas do you need us to handle? <span class="req-star" aria-hidden="true">*</span>
            </legend>
            <span class="field-hint">Select one or more cloud services below.</span>
            ${renderCheckboxCardsHtml('cloudFocusAreas', o.cloudFocusAreas)}
            <p class="field-error" id="error-cloudFocusAreas" role="alert" hidden></p>
          </fieldset>

          <div id="cloud-module-migration" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Dynamic Scope · Cloud Migration Planning</span>
              <h3>What Are We Migrating &amp; From Where?</h3>
            </div>
            <fieldset class="form-fieldset">
              <legend class="form-label">Which workloads or data need to be migrated?</legend>
              ${renderCheckboxPillsHtml('migrationWorkloads', o.migrationWorkloads)}
            </fieldset>
            <div class="field-grid two-col" style="margin-bottom: 0;">
              <fieldset class="form-fieldset" style="margin-bottom: 0;">
                <legend class="form-label">Where are they hosted right now?</legend>
                ${renderRadioPillsHtml('migrationCurrentEnv', o.migrationCurrentEnvs)}
              </fieldset>
              <fieldset class="form-fieldset" style="margin-bottom: 0;">
                <legend class="form-label">Preferred cutover / downtime window</legend>
                ${renderRadioPillsHtml('migrationDowntimeWindow', o.migrationDowntimeWindows)}
              </fieldset>
            </div>
          </div>

          <div id="cloud-module-optimise" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Dynamic Scope · Cloud Cost &amp; Performance</span>
              <h3>Current Infrastructure Bottlenecks</h3>
            </div>
            <fieldset class="form-fieldset" style="margin-bottom: 0;">
              <legend class="form-label">What issues are you experiencing with your current setup?</legend>
              ${renderCheckboxPillsHtml('optimisePainPoints', o.optimisePainPoints)}
            </fieldset>
          </div>

          <div class="form-group" style="margin-top: 1.25rem;">
            <label for="cloudCustomNotes" class="form-label">
              Any specific server specs, database engines, or domain details? <span class="opt-badge">Optional</span>
            </label>
            <input
              type="text"
              id="cloudCustomNotes"
              name="cloudCustomNotes"
              class="form-control"
              placeholder="e.g. PostgreSQL database + Node API on Docker, or 30 mailboxes moving to Microsoft 365..."
            >
          </div>
        `,
        step3: `
          <fieldset class="form-fieldset">
            <legend class="form-label">
              Preferred or existing cloud platforms <span class="opt-badge">Tap all that apply</span>
            </legend>
            ${renderCheckboxPillsHtml('cloudProviders', o.cloudProviders)}
          </fieldset>

          <fieldset class="form-fieldset card-fieldset">
            <legend class="form-label">
              Uptime, backup &amp; compliance requirements <span class="opt-badge">Tap all needed</span>
            </legend>
            ${renderCheckboxPillsHtml('cloudReliabilityNeeds', o.cloudReliabilityNeeds)}
          </fieldset>

          <fieldset class="form-fieldset">
            <legend class="form-label">Approximate user or traffic scale</legend>
            ${renderRadioPillsHtml('cloudScaleEstimate', o.cloudScaleEstimates)}
          </fieldset>
        `,
        step4: `
          <fieldset class="form-fieldset card-fieldset" style="margin-bottom: 1.5rem;">
            <legend class="form-label">
              Do you have administrator access to your current hosting, cloud or domain accounts?
            </legend>
            ${renderRadioPillsHtml('cloudAccessStatus', o.cloudAccessStatuses)}
          </fieldset>

          ${renderSharedStep4BudgetAndTimelineHtml(
            service,
            'What is your rough budget ballpark for this cloud project (ZAR)?',
            'When do you need this infrastructure live or migrated?',
            'How would you like us to manage your cloud infrastructure?'
          )}
        `
      };

    /* ------------------------------------------------------------
       4. IT SUPPORT & SYSTEMS
       ------------------------------------------------------------ */
    case 'it-support':
      return {
        step2: `
          <fieldset class="form-fieldset" data-field-group="itSituation">
            <legend class="form-label">
              How can our IT Support team help your organisation? <span class="req-star" aria-hidden="true">*</span>
            </legend>
            ${renderChoiceCardsHtml('itSituation', o.itSituations)}
            <p class="field-error" id="error-itSituation" role="alert" hidden></p>
          </fieldset>

          <div id="it-module-urgent" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Urgent IT Triage</span>
              <h3>What needs immediate fixing?</h3>
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label for="itUrgentIssueDesc" class="form-label">
                Briefly describe the issue and how many staff are affected <span class="opt-badge">Optional</span>
              </label>
              <input
                type="text"
                id="itUrgentIssueDesc"
                name="itUrgentIssueDesc"
                class="form-control"
                placeholder="e.g. Office internet/Wi-Fi is down across 10 desks, or Outlook emails are bouncing..."
              >
            </div>
          </div>

          <fieldset class="form-fieldset">
            <legend class="form-label">How many staff members / workstations need support?</legend>
            ${renderRadioPillsHtml('itTeamSize', o.itTeamSizes)}
          </fieldset>

          <fieldset class="form-fieldset" data-field-group="itSupportTasks">
            <legend class="form-label">
              Which IT services do you need? <span class="req-star" aria-hidden="true">*</span>
            </legend>
            ${renderCheckboxCardsHtml('itSupportTasks', o.itSupportTasks, true)}
            <p class="field-error" id="error-itSupportTasks" role="alert" hidden></p>
          </fieldset>

          <div class="form-group" style="margin-top: 1.25rem;">
            <label for="itCustomNotes" class="form-label">
              Any specific office hardware, server, or software details? <span class="opt-badge">Optional</span>
            </label>
            <input
              type="text"
              id="itCustomNotes"
              name="itCustomNotes"
              class="form-control"
              placeholder="e.g. Unifi Wi-Fi access points, Pastel partner server, or mixed Mac & Windows laptops..."
            >
          </div>
        `,
        step3: `
          <fieldset class="form-fieldset">
            <legend class="form-label">
              Which operating systems &amp; workplace tools does your team use? <span class="opt-badge">Tap all that apply</span>
            </legend>
            ${renderCheckboxPillsHtml('itOperatingSystems', o.itOperatingSystems)}
          </fieldset>

          <div class="field-grid two-col">
            <fieldset class="form-fieldset card-fieldset">
              <legend class="form-label">Preferred support delivery mode</legend>
              ${renderRadioPillsHtml('itDeliveryPreference', o.itDeliveryPreferences)}
            </fieldset>

            <fieldset class="form-fieldset card-fieldset">
              <legend class="form-label">Do you need new hardware sourced or configured?</legend>
              ${renderRadioPillsHtml('itHardwareProcurement', o.itHardwareProcurementOptions)}
            </fieldset>
          </div>

          <fieldset class="form-fieldset">
            <legend class="form-label">
              What are the biggest IT frustrations for your team right now? <span class="opt-badge">Optional</span>
            </legend>
            ${renderCheckboxPillsHtml('itPainPoints', o.itPainPoints)}
          </fieldset>
        `,
        step4: `
          ${renderSharedStep4BudgetAndTimelineHtml(
            service,
            'What is your rough budget ballpark (Once-off or Monthly SLA in ZAR)?',
            'How soon do you need IT support or setup to begin?',
            'Which IT support engagement model suits your business best?'
          )}
        `
      };

    /* ------------------------------------------------------------
       5. CYBERSECURITY & DATA PROTECTION
       ------------------------------------------------------------ */
    case 'cybersecurity':
      return {
        step2: `
          <fieldset class="form-fieldset" data-field-group="securitySituation">
            <legend class="form-label">
              What prompts your cybersecurity enquiry today? <span class="req-star" aria-hidden="true">*</span>
            </legend>
            ${renderChoiceCardsHtml('securitySituation', o.securitySituations)}
            <p class="field-error" id="error-securitySituation" role="alert" hidden></p>
          </fieldset>

          <fieldset class="form-fieldset" data-field-group="securityTargetAssets">
            <legend class="form-label">
              Which systems or business assets need assessment or protection? <span class="req-star" aria-hidden="true">*</span>
            </legend>
            ${renderCheckboxCardsHtml('securityTargetAssets', o.securityTargetAssets, true)}
            <p class="field-error" id="error-securityTargetAssets" role="alert" hidden></p>
          </fieldset>

          <div id="sec-module-incident" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Dynamic Scope · Active Incident &amp; Recovery</span>
              <h3>Incident Triage &amp; Containment</h3>
            </div>
            <fieldset class="form-fieldset">
              <legend class="form-label">What type of incident or suspicious activity occurred?</legend>
              ${renderCheckboxPillsHtml('incidentTypes', o.incidentTypes)}
            </fieldset>
            <fieldset class="form-fieldset" style="margin-bottom: 0;">
              <legend class="form-label">Current system status</legend>
              ${renderRadioPillsHtml('incidentCurrentStatus', o.incidentCurrentStatuses)}
            </fieldset>
          </div>

          <div id="sec-module-proactive" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Dynamic Scope · Security Testing &amp; Hardening</span>
              <h3>Proactive Security Measures Required</h3>
            </div>
            <fieldset class="form-fieldset" style="margin-bottom: 0;">
              <legend class="form-label">Which security services should we include in your quote?</legend>
              ${renderCheckboxPillsHtml('proactiveServices', o.proactiveServices)}
            </fieldset>
          </div>

          <div id="sec-module-compliance" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Dynamic Scope · POPIA &amp; Security Governance</span>
              <h3>Compliance &amp; Data Protection Focus</h3>
            </div>
            <fieldset class="form-fieldset" style="margin-bottom: 0;">
              <legend class="form-label">Which compliance or governance requirements apply?</legend>
              ${renderCheckboxPillsHtml('complianceFrameworks', o.complianceFrameworks)}
            </fieldset>
          </div>

          <div class="form-group" style="margin-top: 1.25rem;">
            <label for="securityCustomNotes" class="form-label">
              Any additional context on your domain, systems, or security concerns? <span class="opt-badge">Never share passwords here</span>
            </label>
            <input
              type="text"
              id="securityCustomNotes"
              name="securityCustomNotes"
              class="form-control"
              placeholder="e.g. Clients received spoofed emails pretending to be our domain, or need a pre-launch security review..."
            >
          </div>
        `,
        step3: `
          <fieldset class="form-fieldset card-fieldset">
            <legend class="form-label">
              Which security controls do you already have in place? <span class="opt-badge">Tap all active</span>
            </legend>
            ${renderCheckboxPillsHtml('currentSecurityControls', o.currentSecurityControls)}
          </fieldset>

          <fieldset class="form-fieldset card-fieldset">
            <legend class="form-label">
              What types of sensitive data does your organisation store or process?
            </legend>
            ${renderCheckboxPillsHtml('dataSensitivityTypes', o.dataSensitivityTypes)}
          </fieldset>
        `,
        step4: `
          ${renderSharedStep4BudgetAndTimelineHtml(
            service,
            'What is your rough budget ballpark for this cybersecurity engagement (ZAR)?',
            'How urgently do you need this security review or intervention?',
            'How would you like us to support your security posture?'
          )}
        `
      };

    /* ------------------------------------------------------------
       6. CODE TUTORING & TECHNICAL EDUCATION
       ------------------------------------------------------------ */
    case 'tutoring':
      return {
        step2: `
          <fieldset class="form-fieldset" data-field-group="learnerProfile">
            <legend class="form-label">
              Who are the coding lessons for? <span class="req-star" aria-hidden="true">*</span>
            </legend>
            ${renderChoiceCardsHtml('learnerProfile', o.learnerProfiles, true)}
            <p class="field-error" id="error-learnerProfile" role="alert" hidden></p>
          </fieldset>

          <fieldset class="form-fieldset" data-field-group="tutoringSubjects">
            <legend class="form-label">
              Which programming languages or subjects do you want to master? <span class="req-star" aria-hidden="true">*</span>
            </legend>
            <span class="field-hint">Select one or more subjects below.</span>
            ${renderCheckboxCardsHtml('tutoringSubjects', o.tutoringSubjects, true)}
            <p class="field-error" id="error-tutoringSubjects" role="alert" hidden></p>
          </fieldset>

          <div id="tutor-module-academic" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Dynamic Scope · University &amp; School Coursework</span>
              <h3>Academic Curriculum &amp; Exam Alignment</h3>
            </div>
            <div class="form-group">
              <label for="academicInstitution" class="form-label">
                University / School &amp; Module Code (if known) <span class="opt-badge">Optional</span>
              </label>
              <input
                type="text"
                id="academicInstitution"
                name="academicInstitution"
                class="form-control"
                placeholder="e.g. UJ Computer Science 1A, Wits COMS1018, UNISA COS1511, or Grade 11/12 IEB IT (Java)"
              >
            </div>
            <fieldset class="form-fieldset" style="margin-bottom: 0;">
              <legend class="form-label">How can your tutor help you most?</legend>
              ${renderCheckboxPillsHtml('academicFocusAreas', o.academicFocusAreas)}
            </fieldset>
          </div>

          <div id="tutor-module-practical" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Dynamic Scope · Practical Coding &amp; Career Skills</span>
              <h3>Hands-On Project &amp; Skill Outcomes</h3>
            </div>
            <fieldset class="form-fieldset" style="margin-bottom: 0;">
              <legend class="form-label">What practical outcomes are you aiming for?</legend>
              ${renderCheckboxPillsHtml('practicalCareerGoals', o.practicalCareerGoals)}
            </fieldset>
          </div>

          <div class="form-group" style="margin-top: 1.25rem;">
            <label for="tutoringCustomNotes" class="form-label">
              Any specific topics, assignments, or struggles you want your tutor to focus on? <span class="opt-badge">Optional</span>
            </label>
            <input
              type="text"
              id="tutoringCustomNotes"
              name="tutoringCustomNotes"
              class="form-control"
              placeholder="e.g. Struggling with Java recursion & arrays, or want to build a Python web scraper..."
            >
          </div>
        `,
        step3: `
          <fieldset class="form-fieldset">
            <legend class="form-label">What is the learner's current programming experience?</legend>
            ${renderChoiceCardsHtml('codingExperienceLevel', o.codingExperienceLevels)}
          </fieldset>

          <div class="field-grid two-col">
            <fieldset class="form-fieldset card-fieldset">
              <legend class="form-label">Preferred lesson format</legend>
              ${renderRadioPillsHtml('lessonDeliveryFormat', o.lessonDeliveryFormats)}
            </fieldset>

            <fieldset class="form-fieldset card-fieldset">
              <legend class="form-label">How often would you like lessons?</legend>
              ${renderRadioPillsHtml('lessonFrequency', o.lessonFrequencies)}
            </fieldset>
          </div>

          <fieldset class="form-fieldset">
            <legend class="form-label">
              Which days / time slots usually suit your schedule? <span class="opt-badge">Tap all that work</span>
            </legend>
            ${renderCheckboxPillsHtml('preferredTimeSlots', o.preferredTimeSlots)}
          </fieldset>
        `,
        step4: `
          <fieldset class="form-fieldset card-fieldset" style="margin-bottom: 1.5rem;">
            <legend class="form-label">
              Do you have a laptop and coding environment ready?
            </legend>
            ${renderRadioPillsHtml('tutoringLaptopReady', o.tutoringSetupOptions)}
          </fieldset>

          ${renderSharedStep4BudgetAndTimelineHtml(
            service,
            'Which tutoring package / monthly budget range suits you best (ZAR)?',
            'When would you like to start your first lesson?',
            'How would you like to structure your tutoring sessions?'
          )}
        `
      };

    /* ------------------------------------------------------------
       7. NOT SURE? HELP ME SCOPE IT (GENERAL GUIDED DISCOVERY)
       ------------------------------------------------------------ */
    case 'general-discovery':
      return {
        step2: `
          <fieldset class="form-fieldset" data-field-group="problemSituation">
            <legend class="form-label">
              Which of these sounds closest to your current situation? <span class="req-star" aria-hidden="true">*</span>
            </legend>
            ${renderChoiceCardsHtml('problemSituation', o.problemSituations, true)}
            <p class="field-error" id="error-problemSituation" role="alert" hidden></p>
          </fieldset>

          <fieldset class="form-fieldset" data-field-group="problemSymptoms">
            <legend class="form-label">
              Which everyday challenges or needs apply to you? <span class="req-star" aria-hidden="true">*</span>
            </legend>
            <span class="field-hint">Tap all that sound familiar — no technical knowledge needed.</span>
            ${renderCheckboxPillsHtml('problemSymptoms', o.problemSymptoms)}
            <p class="field-error" id="error-problemSymptoms" role="alert" hidden></p>
          </fieldset>

          <div id="gen-module-broken" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Guided Triage · What Is Letting You Down?</span>
              <h3>Where Are You Experiencing the Problem?</h3>
            </div>
            <fieldset class="form-fieldset">
              <legend class="form-label">Which area seems most affected?</legend>
              ${renderRadioPillsHtml('brokenTargetArea', o.brokenTargetAreas)}
            </fieldset>
            <div class="form-group" style="margin-bottom: 0;">
              <label for="existingReferenceLink" class="form-label">
                Website address or name of the tool/system (if you have one) <span class="opt-badge">Optional</span>
              </label>
              <input
                type="text"
                id="existingReferenceLink"
                name="existingReferenceLink"
                class="form-control"
                placeholder="e.g. www.ourwebsite.co.za, Microsoft Outlook, or our office Wi-Fi"
              >
            </div>
          </div>

          <div id="gen-module-multi" class="conditional-feature-panel" hidden>
            <div class="conditional-panel-header">
              <span class="conditional-badge">Guided Triage · Possible Areas</span>
              <h3>Which Areas Might Be Part of the Solution?</h3>
            </div>
            <fieldset class="form-fieldset" style="margin-bottom: 0;">
              <legend class="form-label">Tap any you think might be relevant (or leave as "Not sure")</legend>
              ${renderCheckboxPillsHtml('suspectedServiceAreas', o.suspectedServiceAreas)}
            </fieldset>
          </div>

          <div class="form-group" data-field-group="problemDescription" style="margin-top: 1.25rem;">
            <label for="problemDescription" class="form-label">
              In your own words, what is the main problem you want solved or idea you want to build? <span class="req-star" aria-hidden="true">*</span>
            </label>
            <span class="field-hint">Explain it just like you would to a colleague over coffee — we will translate it into the right technical plan.</span>
            <textarea
              id="problemDescription"
              name="problemDescription"
              class="form-control"
              rows="3"
              required
              aria-required="true"
              aria-describedby="error-problemDescription"
              placeholder="e.g. Our drivers take paper delivery notes that get lost, and customers keep phoning us asking where their order is..."
            ></textarea>
            <p class="field-error" id="error-problemDescription" role="alert" hidden></p>
          </div>
        `,
        step3: `
          <fieldset class="form-fieldset card-fieldset">
            <legend class="form-label">
              What do you already have in place today? <span class="opt-badge">Tap all you have</span>
            </legend>
            ${renderCheckboxPillsHtml('currentTechFootprint', o.currentTechFootprint)}
          </fieldset>

          <fieldset class="form-fieldset">
            <legend class="form-label">
              Who will benefit most once we solve this?
            </legend>
            ${renderRadioPillsHtml('beneficiaryGroup', o.beneficiaryGroups)}
          </fieldset>

          <fieldset class="form-fieldset card-fieldset">
            <legend class="form-label">
              What would a clear "win" look like for you? <span class="opt-badge">Tap all that apply</span>
            </legend>
            ${renderCheckboxPillsHtml('desiredOutcomes', o.desiredOutcomes)}
          </fieldset>
        `,
        step4: `
          <fieldset class="form-fieldset card-fieldset" style="margin-bottom: 1.5rem;">
            <legend class="form-label">
              How would you like JoziLabs to guide you with our quotation?
            </legend>
            ${renderRadioPillsHtml('guidancePreference', o.guidancePreferences)}
          </fieldset>

          ${renderSharedStep4BudgetAndTimelineHtml(
            service,
            'What is your rough budget comfort zone (ZAR)?',
            'How soon would you like this solved or launched?',
            'How would you like us to work with you after the initial fix or launch?'
          )}
        `
      };

    default:
      return { step2: '', step3: '', step4: '' };
  }
}

/* ============================================================
   DYNAMIC VISIBILITY UPDATER (Runs on input/change without losing focus)
   ============================================================ */
export function updateServiceDynamicDOM(serviceId, data) {
  const service = getServiceModule(serviceId);
  const flow = getDynamicFlowState(service.id, data);

  const toggle = (id, show) => {
    const el = document.getElementById(id);
    if (el) el.hidden = !show;
  };

  // Step 1 Common Dynamic Updates
  toggle('location-local-fields', flow.isLocal);
  toggle('location-international-fields', flow.isInternational);

  const phoneLabel = document.getElementById('label-phone');
  if (phoneLabel) {
    if (flow.isPhoneRequired) {
      const labelText =
        data.preferredContact === 'WhatsApp' ? 'Your WhatsApp number' : 'Your phone number';
      phoneLabel.innerHTML = `${labelText} <span class="req-star" id="badge-phone">*</span>`;
    } else {
      phoneLabel.innerHTML = `WhatsApp or phone number <span class="opt-badge" id="badge-phone">Optional</span>`;
    }
  }

  // Step 1 Service-Specific Org & Summary Labels
  const orgLabelEl = document.getElementById('label-businessName');
  const orgInputEl = document.getElementById('businessName');
  if (orgLabelEl && service.step1Config) {
    const badgeHtml = service.step1Config.orgRequired
      ? `<span class="req-star" aria-hidden="true">*</span>`
      : `<span class="opt-badge">Optional</span>`;
    orgLabelEl.innerHTML = `${escapeHtml(service.step1Config.orgLabel)} ${badgeHtml}`;
  }
  if (orgInputEl && service.step1Config) {
    orgInputEl.placeholder = service.step1Config.orgPlaceholder;
    orgInputEl.required = Boolean(service.step1Config.orgRequired);
    orgInputEl.setAttribute('aria-required', service.step1Config.orgRequired ? 'true' : 'false');
  }

  const summaryLabelEl = document.getElementById('label-businessSummary');
  const summaryInputEl = document.getElementById('businessSummary');
  if (summaryLabelEl && service.step1Config) {
    summaryLabelEl.innerHTML = `${escapeHtml(service.step1Config.summaryLabel)} <span class="opt-badge">Optional</span>`;
  }
  if (summaryInputEl && service.step1Config) {
    summaryInputEl.placeholder = service.step1Config.summaryPlaceholder;
  }

  // Service-Specific Conditional Branches in Step 2, 3, 4
  if (service.id === 'web-development') {
    toggle('web-shared-goals', flow.hasPickedSituation);
    toggle('web-branch-new', flow.isNewSite);
    toggle('web-branch-existing', flow.isExistingSite);
    toggle('web-notes-block', flow.hasPickedSituation);
    toggle('web-module-static', flow.showStaticModule);
    toggle('web-module-ecommerce', flow.showEcommerceModule);
    toggle('web-module-booking', flow.showBookingModule);
    toggle('web-module-webapp', flow.showWebappModule);

    toggle('web-design-new-block', !flow.isExistingSite);
    toggle('web-design-existing-block', flow.isExistingSite);
    toggle('web-visual-style-fieldset', flow.wantsVisualRedesign);
    toggle('web-visual-preserved-note', flow.isExistingSite && !flow.wantsVisualRedesign);

    toggle('web-setup-new', !flow.isExistingSite);
    toggle('web-setup-existing', flow.isExistingSite);

    const domainLabel = document.getElementById('label-domainNameInput');
    if (domainLabel) {
      domainLabel.innerHTML =
        data.newSiteDomainStatus === 'own'
          ? `Your registered domain name <span class="opt-badge">e.g. .co.za</span>`
          : `Any domain name ideas you want us to check? <span class="opt-badge">Optional</span>`;
    }
  } else if (service.id === 'software-development') {
    toggle('sw-branch-existing', flow.isExistingSystem);
    toggle('sw-module-mobile', flow.showMobileModule);
    toggle('sw-module-portal', flow.showPortalModule);
    toggle('sw-module-ai', flow.showAiModule);
  } else if (service.id === 'cloud-services') {
    toggle('cloud-module-migration', flow.showMigrationModule);
    toggle('cloud-module-optimise', flow.showOptimiseModule);
  } else if (service.id === 'it-support') {
    toggle('it-module-urgent', flow.isUrgentFix);
  } else if (service.id === 'cybersecurity') {
    toggle('sec-module-incident', flow.showIncidentModule);
    toggle('sec-module-proactive', flow.showProactiveModule);
    toggle('sec-module-compliance', flow.showComplianceModule);
  } else if (service.id === 'tutoring') {
    toggle('tutor-module-academic', flow.isAcademic);
    toggle('tutor-module-practical', flow.isPractical);
  } else if (service.id === 'general-discovery') {
    toggle('gen-module-broken', flow.showBrokenModule);
    toggle('gen-module-multi', flow.showMultiModule);
  }

  // Shared Step 4 Dynamic Budget Tip & Conditional Date Picker
  const budgetTipEl = document.getElementById('dynamic-budget-tip');
  if (budgetTipEl && flow.budgetRecommendation) {
    budgetTipEl.textContent = flow.budgetRecommendation.text;
  }

  const budgetContainer = document.getElementById('estimatedBudget-container');
  if (budgetContainer && service.options?.budgetRanges) {
    budgetContainer.innerHTML = renderBudgetCardsHtml(
      service.options.budgetRanges,
      data.estimatedBudget,
      flow.budgetRecommendation?.highlightTier || ''
    );
  }

  toggle('conditional-specific-date', flow.showSpecificDateInput);
}

/* ============================================================
   REVIEW SECTIONS & PAYLOAD BUILDERS
   ============================================================ */
export function buildReviewSections(serviceId, data) {
  const service = getServiceModule(serviceId);
  const flow = getDynamicFlowState(service.id, data);

  const step1Section = {
    stepId: 1,
    title: service.id === 'tutoring' ? 'About You & Learner Profile' : 'About You & Location',
    items: [
      { label: 'Selected Service', value: service.title },
      { label: 'Contact Name', value: data.contactName },
      {
        label: service.id === 'tutoring' ? 'School / University / Org' : 'Business / Project Name',
        value: data.businessName || (service.id === 'tutoring' ? 'Individual Learner' : '')
      },
      { label: 'Email Address', value: data.email },
      {
        label: 'Preferred Contact',
        value: data.phone ? `${data.preferredContact} (${data.phone})` : data.preferredContact
      },
      { label: 'Location', value: formatLocationSummary(data) },
      ...(data.industry ? [{ label: 'Sector / Context', value: data.industry }] : []),
      ...(data.businessSummary
        ? [{ label: 'Summary / Goal', value: data.businessSummary, fullSpan: true }]
        : [])
    ]
  };

  const serviceSections = service.buildReview(data, flow);
  return [step1Section, ...serviceSections];
}

export function buildSubmissionPayload(serviceId, data) {
  const service = getServiceModule(serviceId);
  const flow = getDynamicFlowState(service.id, data);
  const servicePayload = service.buildPayload(data, flow);

  return {
    meta: {
      schemaVersion: '4.0.0-multi-service-discovery',
      source: 'JoziLabs Start a Project – Multi-Service Discovery Planner (Frontend Prototype)',
      serviceId: service.id,
      serviceTitle: service.title,
      serviceCategory: service.categoryBadge,
      generatedAt: new Date().toISOString(),
      submittedToBackend: false
    },
    clientAndLocation: {
      contactName: (data.contactName || '').trim(),
      businessOrOrganisationName: (data.businessName || '').trim() || null,
      email: (data.email || '').trim(),
      preferredContact: data.preferredContact,
      phone: (data.phone || '').trim() || null,
      industry: data.industry || 'Not specified',
      locationScope: data.locationScope,
      province: flow.isLocal ? data.province : null,
      city: flow.isLocal ? (data.city || '').trim() : null,
      country: flow.isInternational ? (data.country || '').trim() : 'South Africa',
      formattedLocation: formatLocationSummary(data),
      summary: (data.businessSummary || '').trim() || null
    },
    ...servicePayload,
    consents: {
      confirmAccurate: Boolean(data.confirmAccurate),
      consentContact: Boolean(data.consentContact)
    }
  };
}

export function buildPlainTextSummary(serviceId, payload) {
  const service = getServiceModule(serviceId);
  const c = payload.clientAndLocation;
  const serviceLines = service.buildTextSummary(payload);

  const lines = [
    '============================================================',
    `JOZILABS – ${service.title.toUpperCase()} BRIEF (PROTOTYPE MVP)`,
    '============================================================',
    `SERVICE TRACK: ${service.title} (${service.categoryBadge})`,
    'STATUS:        Local Frontend Prototype Output (Not transmitted to a server)',
    `GENERATED:     ${payload.meta.generatedAt}`,
    '',
    '1. CLIENT & LOCATION',
    `   • Contact Name:      ${c.contactName}`,
    `   • Org / Business:    ${c.businessOrOrganisationName || 'Individual / Not specified'}`,
    `   • Email Address:     ${c.email}`,
    `   • Preferred Contact: ${c.preferredContact}${c.phone ? ` (${c.phone})` : ''}`,
    `   • Location:          ${c.formattedLocation}`,
    `   • Sector:            ${c.industry}`,
    `   • Summary:           ${c.summary || 'Not specified'}`,
    '',
    ...serviceLines,
    '============================================================'
  ];

  return lines.join('\n');
}

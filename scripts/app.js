/**
 * JoziLabs – Website Project Discovery Form
 * scripts/app.js
 *
 * Dynamic Branching Discovery Controller:
 * - Step 1: Local (SA Province dropdown + City textbox) vs International (Country textbox) toggle,
 *   plus dynamic contact preference (Email vs WhatsApp vs Phone Call)
 * - Step 2: Branches on New Site vs Existing Site, then dynamically reveals only the matching
 *   sub-modules (Static Pages, E-commerce Store, Bookings, or Web App / Client Portal)
 * - Step 3: Adapts design & brand asset questions to New vs Existing site and whether a visual redesign is requested
 * - Step 4: Adapts domain/hosting setup to New vs Existing site, highlights typical budget ranges for the chosen scope,
 *   and reveals launch date/milestone fields only when a specific date is selected
 * - Step 5: Builds a tailored review summary showing only the active branches
 */

import {
  STEPS_CONFIG,
  FORM_OPTIONS,
  createDefaultFormData,
  loadFormState,
  saveFormState,
  clearFormState,
  getDynamicFlowState,
  formatLocationSummary,
  buildSubmissionPayload
} from './form-data.js';

import {
  validateField,
  validateStep,
  validateAllSteps
} from './validation.js';

const THEME_STORAGE_KEY = 'jozilabs_discovery_theme';
const TOTAL_STEPS = STEPS_CONFIG.length; // 5 steps

class DiscoveryFormApp {
  constructor() {
    this.state = loadFormState();
    this.touchedFields = new Set();
    this.lastFocusedElement = null;

    this.initTheme();
    this.cacheElements();
    this.renderStaticOptionControls();
    this.hydrateInputsFromState();
    this.updateDynamicUI();
    this.bindEvents();
    this.goToStep(this.state.currentStep, { skipScroll: true });
  }

  /* ============================================================
     THEME MANAGEMENT
     ============================================================ */
  initTheme() {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
    } catch {
      // Default to dark theme set on <html>
    }
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore storage error
    }
  }

  /* ============================================================
     DOM CACHING & OPTION RENDERING
     ============================================================ */
  cacheElements() {
    this.form = document.getElementById('discovery-form');
    this.questionnaireShell = document.getElementById('questionnaire-shell');
    this.progressNav = document.getElementById('progress-navigation');
    this.confirmationScreen = document.getElementById('confirmation-screen');

    // Progress elements
    this.stepCounterEl = document.getElementById('progress-step-counter');
    this.stepTitleEl = document.getElementById('progress-step-title');
    this.progressPctEl = document.getElementById('progress-percentage');
    this.progressBarAria = document.getElementById('progress-bar-aria');
    this.progressBarFill = document.getElementById('progress-bar-fill');
    this.stepRailList = document.getElementById('step-rail-list');

    // Active step header elements
    this.stepKickerEl = document.getElementById('active-step-kicker');
    this.stepHeadingEl = document.getElementById('active-step-heading');
    this.stepSubtitleEl = document.getElementById('active-step-subtitle');

    // Error summary banner
    this.errorSummaryBanner = document.getElementById('step-error-summary');
    this.errorSummaryDetail = document.getElementById('step-error-summary-detail');

    // Navigation buttons
    this.prevBtn = document.getElementById('prev-step-btn');
    this.nextBtn = document.getElementById('next-step-btn');
    this.submitBtn = document.getElementById('submit-enquiry-btn');
    this.resetBtn = document.getElementById('reset-form-btn');
    this.themeToggleBtn = document.getElementById('theme-toggle-btn');

    // Review & Confirmation elements
    this.reviewContainer = document.getElementById('review-summary-container');
    this.compiledSummaryPre = document.getElementById('compiled-summary-text');
    this.payloadTimestamp = document.getElementById('payload-timestamp');
    this.copyBriefBtn = document.getElementById('copy-brief-btn');
    this.copyBriefBtnText = document.getElementById('copy-brief-btn-text');
    this.downloadJsonBtn = document.getElementById('download-json-btn');
    this.printBriefBtn = document.getElementById('print-brief-btn');
    this.backToReviewBtn = document.getElementById('back-to-review-btn');
    this.startNewEnquiryBtn = document.getElementById('start-new-enquiry-btn');

    // Privacy modal
    this.privacyModal = document.getElementById('privacy-modal');
    this.closePrivacyBtn = document.getElementById('close-privacy-modal-btn');
    this.acknowledgePrivacyBtn = document.getElementById('acknowledge-privacy-btn');
  }

  renderStaticOptionControls() {
    // STEP 1: Industry Select, Preferred Contact Segmented Toggle, SA Provinces Select
    const industrySelect = document.getElementById('industry');
    if (industrySelect) {
      FORM_OPTIONS.industries.forEach((ind) => {
        const opt = document.createElement('option');
        opt.value = ind;
        opt.textContent = ind;
        industrySelect.appendChild(opt);
      });
    }

    const contactToggle = document.getElementById('preferredContact-container');
    if (contactToggle) {
      contactToggle.innerHTML = FORM_OPTIONS.contactChannels
        .map(
          (ch) => `
          <label class="segment-option">
            <input type="radio" name="preferredContact" value="${this.escapeAttr(ch)}">
            <span>${this.escapeHtml(ch)}</span>
          </label>
        `
        )
        .join('');
    }

    const provinceSelect = document.getElementById('province');
    if (provinceSelect) {
      FORM_OPTIONS.saProvinces.forEach((prov) => {
        const opt = document.createElement('option');
        opt.value = prov;
        opt.textContent = prov;
        provinceSelect.appendChild(opt);
      });
    }

    // STEP 2: Primary Branch (New vs Existing), Shared Goals, New Site Types, Existing Site Asks
    this.renderChoiceCards('siteSituation-container', 'siteSituation', FORM_OPTIONS.siteSituations);
    this.renderCheckboxPills('primaryGoals-container', 'primaryGoals', FORM_OPTIONS.projectGoals);
    this.renderChoiceCards('newSiteType-container', 'newSiteType', FORM_OPTIONS.newSiteTypes);

    // Existing site tasks (checkbox cards so they can pick Redesign + Add Store, or Rescue + SEO)
    this.renderCheckboxCards('existingSiteTasks-container', 'existingSiteTasks', FORM_OPTIONS.existingSiteTasks);
    this.renderCheckboxPills(
      'existingSitePainPoints-container',
      'existingSitePainPoints',
      FORM_OPTIONS.existingSitePainPoints
    );
    this.renderRadioPills(
      'existingSitePlatform-container',
      'existingSitePlatform',
      FORM_OPTIONS.existingSitePlatforms
    );

    // Dynamic Sub-Module 1: Static Page Counts & Pages
    const staticCountContainer = document.getElementById('staticPageCount-container');
    if (staticCountContainer) {
      staticCountContainer.innerHTML = FORM_OPTIONS.staticPageCounts
        .map(
          (item) => `
          <label class="budget-card">
            <span class="budget-card-top">
              <input type="radio" name="staticPageCount" value="${this.escapeAttr(item.value)}">
              <span class="budget-card-amount">${this.escapeHtml(item.label)}</span>
            </span>
            <span class="budget-card-note">${this.escapeHtml(item.note)}</span>
          </label>
        `
        )
        .join('');
    }

    const pagesContainer = document.getElementById('requiredPages-container');
    if (pagesContainer) {
      pagesContainer.innerHTML = FORM_OPTIONS.staticWebsitePages
        .map(
          (page) => `
          <label class="check-pill">
            <span class="check-pill-left">
              <input type="checkbox" name="requiredPages" value="${this.escapeAttr(page.value)}">
              <span class="check-pill-label">${this.escapeHtml(page.label)}</span>
            </span>
            <span class="check-pill-tag">${this.escapeHtml(page.tag)}</span>
          </label>
        `
        )
        .join('');
    }

    // Dynamic Sub-Module 2: E-commerce
    this.renderRadioPills(
      'ecommerceProductCount-container',
      'ecommerceProductCount',
      FORM_OPTIONS.ecommerceProductCounts
    );
    this.renderCheckboxPills(
      'ecommerceGateways-container',
      'ecommerceGateways',
      FORM_OPTIONS.ecommercePaymentGateways
    );
    this.renderCheckboxPills(
      'ecommerceDelivery-container',
      'ecommerceDelivery',
      FORM_OPTIONS.ecommerceDeliveryOptions
    );

    // Dynamic Sub-Module 3: Booking
    this.renderRadioPills('bookingType-container', 'bookingType', FORM_OPTIONS.bookingTypes);
    this.renderRadioPills(
      'bookingPaymentRequired-container',
      'bookingPaymentRequired',
      FORM_OPTIONS.bookingPaymentOptions
    );
    this.renderCheckboxPills('bookingExtras-container', 'bookingExtras', FORM_OPTIONS.bookingExtras);

    // Dynamic Sub-Module 4: Custom Web App / Portal
    this.renderRadioPills(
      'accountUserTypes-container',
      'accountUserTypes',
      FORM_OPTIONS.accountAudienceOptions
    );
    this.renderCheckboxPills(
      'webappCapabilities-container',
      'webappCapabilities',
      FORM_OPTIONS.webappCapabilities
    );

    // STEP 3: Design, Brand Assets & Add-ons
    this.renderCheckboxPills(
      'newSiteBrandAssets-container',
      'newSiteBrandAssets',
      FORM_OPTIONS.newSiteBrandAssets
    );
    this.renderCheckboxPills(
      'existingSiteKeepAssets-container',
      'existingSiteKeepAssets',
      FORM_OPTIONS.existingSiteKeepAssets
    );
    this.renderChoiceCards('visualStyle-container', 'visualStyle', FORM_OPTIONS.visualStyles);
    this.renderCheckboxPills(
      'assistanceNeeded-container',
      'assistanceNeeded',
      FORM_OPTIONS.creativeAssistance
    );
    this.renderCheckboxPills('commonAddons-container', 'commonAddons', FORM_OPTIONS.commonAddons);

    // STEP 4: Technical Setup, Budget & Timeline
    this.renderRadioObjectPills(
      'newSiteDomainStatus-container',
      'newSiteDomainStatus',
      FORM_OPTIONS.newSiteDomainStatus
    );
    this.renderRadioObjectPills(
      'newSiteHostingNeeds-container',
      'newSiteHostingNeeds',
      FORM_OPTIONS.newSiteHostingNeeds
    );
    this.renderRadioObjectPills(
      'existingSiteAccessStatus-container',
      'existingSiteAccessStatus',
      FORM_OPTIONS.existingSiteAccessStatus
    );
    this.renderRadioObjectPills(
      'timelinePreference-container',
      'timelinePreference',
      FORM_OPTIONS.timelineOptions
    );
    this.renderChoiceCards(
      'ongoingServicePreference-container',
      'ongoingServicePreference',
      FORM_OPTIONS.ongoingSupportOptions
    );

    this.renderBudgetCards();
  }

  renderBudgetCards(highlightTier = '') {
    const budgetContainer = document.getElementById('estimatedBudget-container');
    if (!budgetContainer) return;

    const currentVal = this.state.data.estimatedBudget;

    budgetContainer.innerHTML = FORM_OPTIONS.budgetRanges
      .map((range) => {
        const isRecommended = highlightTier && range.tiers.includes(highlightTier);
        const recBadge = isRecommended
          ? `<span class="budget-recommended-pill">Typical</span>`
          : '';
        const checkedAttr = currentVal === range.value ? 'checked' : '';

        return `
          <label class="budget-card ${isRecommended ? 'is-recommended' : ''}">
            <span class="budget-card-top">
              <input type="radio" name="estimatedBudget" value="${this.escapeAttr(range.value)}" ${checkedAttr}>
              <span class="budget-card-amount">${this.escapeHtml(range.label)}</span>
              ${recBadge}
            </span>
            <span class="budget-card-note">${this.escapeHtml(range.note)}</span>
          </label>
        `;
      })
      .join('');
  }

  renderChoiceCards(containerId, fieldName, options) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = options
      .map(
        (opt) => `
        <label class="choice-card">
          <input type="radio" name="${fieldName}" value="${this.escapeAttr(opt.value)}">
          <span class="choice-card-content">
            <span class="choice-card-title">${this.escapeHtml(opt.label)}</span>
            <span class="choice-card-desc">${this.escapeHtml(opt.description)}</span>
          </span>
        </label>
      `
      )
      .join('');
  }

  renderCheckboxCards(containerId, fieldName, options) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = options
      .map(
        (opt) => `
        <label class="choice-card">
          <input type="checkbox" name="${fieldName}" value="${this.escapeAttr(opt.value)}">
          <span class="choice-card-content">
            <span class="choice-card-title">${this.escapeHtml(opt.label)}</span>
            <span class="choice-card-desc">${this.escapeHtml(opt.description)}</span>
          </span>
        </label>
      `
      )
      .join('');
  }

  renderCheckboxPills(containerId, fieldName, items) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = items
      .map(
        (item) => `
        <label class="check-pill">
          <span class="check-pill-left">
            <input type="checkbox" name="${fieldName}" value="${this.escapeAttr(item)}">
            <span class="check-pill-label">${this.escapeHtml(item)}</span>
          </span>
        </label>
      `
      )
      .join('');
  }

  renderRadioPills(containerId, fieldName, items) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = items
      .map(
        (item) => `
        <label class="radio-pill">
          <input type="radio" name="${fieldName}" value="${this.escapeAttr(item)}">
          <span>${this.escapeHtml(item)}</span>
        </label>
      `
      )
      .join('');
  }

  renderRadioObjectPills(containerId, fieldName, items) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = items
      .map(
        (item) => `
        <label class="radio-pill">
          <input type="radio" name="${fieldName}" value="${this.escapeAttr(item.value)}">
          <span>${this.escapeHtml(item.label)}</span>
        </label>
      `
      )
      .join('');
  }

  /* ============================================================
     STATE HYDRATION & SYNCHRONISATION
     ============================================================ */
  hydrateInputsFromState() {
    const { data } = this.state;

    const textFields = [
      'contactName',
      'businessName',
      'email',
      'phone',
      'industry',
      'province',
      'city',
      'country',
      'businessSummary',
      'existingWebsiteUrl',
      'additionalPages',
      'customProjectNotes',
      'admiredWebsites',
      'domainNameInput',
      'desiredLaunchDate',
      'milestoneDetails'
    ];

    textFields.forEach((field) => {
      const el = this.form.elements[field];
      if (el && typeof data[field] === 'string') {
        el.value = data[field];
      }
    });

    const radioFields = [
      'preferredContact',
      'locationScope',
      'siteSituation',
      'newSiteType',
      'existingSitePlatform',
      'staticPageCount',
      'ecommerceProductCount',
      'bookingType',
      'bookingPaymentRequired',
      'accountUserTypes',
      'visualStyle',
      'newSiteDomainStatus',
      'newSiteHostingNeeds',
      'existingSiteAccessStatus',
      'ongoingServicePreference',
      'estimatedBudget',
      'timelinePreference'
    ];

    radioFields.forEach((field) => {
      const radios = this.form.querySelectorAll(`input[type="radio"][name="${field}"]`);
      radios.forEach((radio) => {
        radio.checked = radio.value === data[field];
      });
    });

    const checkboxArrayFields = [
      'primaryGoals',
      'existingSiteTasks',
      'existingSitePainPoints',
      'requiredPages',
      'ecommerceGateways',
      'ecommerceDelivery',
      'bookingExtras',
      'webappCapabilities',
      'newSiteBrandAssets',
      'existingSiteKeepAssets',
      'assistanceNeeded',
      'commonAddons'
    ];

    checkboxArrayFields.forEach((field) => {
      const selectedSet = new Set(Array.isArray(data[field]) ? data[field] : []);
      const boxes = this.form.querySelectorAll(`input[type="checkbox"][name="${field}"]`);
      boxes.forEach((box) => {
        box.checked = selectedSet.has(box.value);
      });
    });

    ['confirmAccurate', 'consentContact'].forEach((field) => {
      const box = document.getElementById(field);
      if (box) {
        box.checked = Boolean(data[field]);
      }
    });
  }

  readFieldValueIntoState(target) {
    const { name, type, value, checked } = target;
    if (!name || !(name in this.state.data)) return;

    if (type === 'checkbox') {
      if (Array.isArray(this.state.data[name])) {
        const boxes = this.form.querySelectorAll(`input[type="checkbox"][name="${name}"]:checked`);
        this.state.data[name] = Array.from(boxes).map((b) => b.value);
      } else {
        this.state.data[name] = Boolean(checked);
      }
    } else if (type === 'radio') {
      if (checked) {
        this.state.data[name] = value;
      }
    } else {
      this.state.data[name] = value;
    }

    saveFormState(this.state);
  }

  /* ============================================================
     DYNAMIC BRANCHING & VISIBILITY UPDATES
     ============================================================ */
  updateDynamicUI() {
    const { data } = this.state;
    const flow = getDynamicFlowState(data);

    // 1. Step 1: Local (Province + City) vs International (Country only)
    this.toggleBox('location-local-fields', flow.isLocal);
    this.toggleBox('location-international-fields', flow.isInternational);

    // 2. Step 1: Preferred Contact Channel dynamically updates Phone label & required badge
    const phoneLabel = document.getElementById('label-phone');
    if (phoneLabel) {
      if (flow.isPhoneRequired) {
        const labelText = data.preferredContact === 'WhatsApp' ? 'Your WhatsApp number' : 'Your phone number';
        phoneLabel.innerHTML = `${labelText} <span class="req-star" id="badge-phone">*</span>`;
      } else {
        phoneLabel.innerHTML = `WhatsApp or phone number <span class="opt-badge" id="badge-phone">Optional</span>`;
      }
    }

    // 3. Step 2: Primary Branch (New Site vs Existing Site)
    const hasPickedSituation = flow.isNewSite || flow.isExistingSite;
    this.toggleBox('shared-goals-block', hasPickedSituation);
    this.toggleBox('branch-new-site', flow.isNewSite);
    this.toggleBox('branch-existing-site', flow.isExistingSite);
    this.toggleBox('step2-notes-block', hasPickedSituation);

    // 4. Step 2: Dynamic Sub-Modules based on New Site Type OR Existing Site Tasks
    this.toggleBox('module-static-pages', flow.showStaticModule);
    this.toggleBox('module-ecommerce', flow.showEcommerceModule);
    this.toggleBox('module-booking', flow.showBookingModule);
    this.toggleBox('module-webapp', flow.showWebappModule);

    // 5. Step 3: Design & Brand Assets adapt to New vs Existing + whether visual redesign is needed
    this.toggleBox('design-assets-new-block', !flow.isExistingSite);
    this.toggleBox('design-assets-existing-block', flow.isExistingSite);
    this.toggleBox('visual-style-fieldset', flow.wantsVisualRedesign);
    this.toggleBox('visual-style-preserved-note', flow.isExistingSite && !flow.wantsVisualRedesign);

    // 6. Step 4: Domain & Hosting Setup adapts to New vs Existing
    this.toggleBox('setup-branch-new', !flow.isExistingSite);
    this.toggleBox('setup-branch-existing', flow.isExistingSite);

    const domainLabel = document.getElementById('label-domainNameInput');
    if (domainLabel) {
      if (data.newSiteDomainStatus === 'own') {
        domainLabel.innerHTML = `Your registered domain name <span class="opt-badge">e.g. .co.za</span>`;
      } else {
        domainLabel.innerHTML = `Any domain name ideas you want us to check? <span class="opt-badge">Optional</span>`;
      }
    }

    // 7. Step 4: Dynamic Budget Tip & Highlighted Typical Budget Cards
    const budgetTipEl = document.getElementById('dynamic-budget-tip');
    if (budgetTipEl) {
      budgetTipEl.textContent = flow.budgetRecommendation.text;
    }
    this.renderBudgetCards(flow.budgetRecommendation.highlightTier);

    // 8. Step 4: Specific Date / Milestone fields only appear if selected
    this.toggleBox('conditional-specific-date', flow.showSpecificDateInput);
  }

  toggleBox(elementId, shouldShow) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.hidden = !shouldShow;
  }

  /* ============================================================
     VALIDATION UI RENDERING
     ============================================================ */
  validateAndRenderField(fieldName) {
    const errorMsg = validateField(fieldName, this.state.data);
    this.setFieldErrorUI(fieldName, errorMsg);
    return !errorMsg;
  }

  setFieldErrorUI(fieldName, errorMessage) {
    const group = this.form.querySelector(`[data-field-group="${fieldName}"]`);
    const errorEl = document.getElementById(`error-${fieldName}`);
    const control = this.form.elements[fieldName];

    if (group) {
      group.classList.toggle('has-error', Boolean(errorMessage));
    }

    if (errorEl) {
      if (errorMessage) {
        errorEl.textContent = errorMessage;
        errorEl.hidden = false;
      } else {
        errorEl.textContent = '';
        errorEl.hidden = true;
      }
    }

    if (control) {
      if (control instanceof RadioNodeList) {
        control.forEach((input) => {
          input.setAttribute('aria-invalid', errorMessage ? 'true' : 'false');
        });
      } else if (control.setAttribute) {
        control.setAttribute('aria-invalid', errorMessage ? 'true' : 'false');
      }
    }
  }

  clearStepErrorsUI(stepId) {
    const stepSection = document.getElementById(`step-${stepId}`);
    if (!stepSection) return;

    stepSection.querySelectorAll('.has-error').forEach((el) => el.classList.remove('has-error'));
    stepSection.querySelectorAll('.field-error').forEach((el) => {
      el.textContent = '';
      el.hidden = true;
    });
    stepSection.querySelectorAll('[aria-invalid="true"]').forEach((el) => {
      el.setAttribute('aria-invalid', 'false');
    });
    this.errorSummaryBanner.hidden = true;
  }

  validateCurrentStepWithUI() {
    const stepId = this.state.currentStep;
    const result = validateStep(stepId, this.state.data);

    this.clearStepErrorsUI(stepId);

    if (!result.isValid) {
      Object.entries(result.errors).forEach(([field, message]) => {
        this.touchedFields.add(field);
        this.setFieldErrorUI(field, message);
      });

      const errorCount = Object.keys(result.errors).length;
      this.errorSummaryDetail.textContent =
        errorCount === 1
          ? 'Please complete the 1 highlighted item below to continue.'
          : `Please complete the ${errorCount} highlighted items below to continue.`;
      this.errorSummaryBanner.hidden = false;

      this.focusField(result.firstInvalidField);
      return false;
    }

    this.errorSummaryBanner.hidden = true;
    return true;
  }

  focusField(fieldName) {
    if (!fieldName) return;
    const control = this.form.elements[fieldName];
    if (!control) return;

    let targetEl = control;
    if (control instanceof RadioNodeList) {
      targetEl = control[0];
    }

    if (targetEl && typeof targetEl.focus === 'function') {
      targetEl.focus({ preventScroll: false });
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /* ============================================================
     STEP NAVIGATION & PROGRESS RAIL
     ============================================================ */
  goToStep(stepId, options = {}) {
    const targetStep = Math.min(Math.max(Number(stepId) || 1, 1), TOTAL_STEPS);
    this.state.currentStep = targetStep;
    if (targetStep > this.state.maxVisitedStep) {
      this.state.maxVisitedStep = targetStep;
    }
    saveFormState(this.state);

    this.questionnaireShell.hidden = false;
    this.progressNav.hidden = false;
    this.confirmationScreen.hidden = true;

    for (let i = 1; i <= TOTAL_STEPS; i++) {
      const section = document.getElementById(`step-${i}`);
      if (section) {
        const isCurrent = i === targetStep;
        section.hidden = !isCurrent;
        section.classList.toggle('is-active', isCurrent);
      }
    }

    const stepMeta = STEPS_CONFIG.find((s) => s.id === targetStep) || STEPS_CONFIG[0];
    const padded = String(targetStep).padStart(2, '0');
    this.stepKickerEl.textContent = `STEP ${padded} / 0${TOTAL_STEPS}`;
    this.stepHeadingEl.textContent = stepMeta.title;
    this.stepSubtitleEl.textContent = stepMeta.subtitle;

    this.errorSummaryBanner.hidden = true;

    this.prevBtn.hidden = targetStep === 1;
    this.nextBtn.hidden = targetStep === TOTAL_STEPS;
    this.submitBtn.hidden = targetStep !== TOTAL_STEPS;

    const pct = Math.round((targetStep / TOTAL_STEPS) * 100);
    this.stepCounterEl.textContent = `Step ${targetStep} of ${TOTAL_STEPS}`;
    this.stepTitleEl.textContent = stepMeta.title;
    this.progressPctEl.textContent = `${pct}%`;
    this.progressBarAria.setAttribute('aria-valuenow', String(targetStep));
    this.progressBarFill.style.width = `${(targetStep / TOTAL_STEPS) * 100}%`;

    this.renderStepRail();

    if (targetStep === TOTAL_STEPS) {
      this.renderFinalReview();
    }

    if (!options.skipScroll) {
      this.progressNav.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  renderStepRail() {
    const current = this.state.currentStep;
    const maxVisited = this.state.maxVisitedStep;

    this.stepRailList.innerHTML = STEPS_CONFIG.map((step) => {
      const isCurrent = step.id === current;
      const isVisited = step.id <= maxVisited;
      const stepValidation =
        step.id < TOTAL_STEPS ? validateStep(step.id, this.state.data) : { isValid: false };
      const isCompleted = step.id < current && stepValidation.isValid;

      const stateClasses = [
        'step-rail-btn',
        isCurrent ? 'is-current' : '',
        isCompleted ? 'is-completed' : ''
      ]
        .filter(Boolean)
        .join(' ');

      const checkIcon = isCompleted
        ? `<svg class="step-rail-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`
        : '';

      return `
        <li class="step-rail-item">
          <button
            type="button"
            class="${stateClasses}"
            data-goto-step="${step.id}"
            ${!isVisited ? 'disabled' : ''}
            aria-current="${isCurrent ? 'step' : 'false'}"
            aria-label="Step ${step.id}: ${this.escapeAttr(step.title)}${isCompleted ? ' (Completed)' : ''}"
          >
            <span class="step-rail-top">
              <span class="step-rail-num">0${step.id}</span>
              ${checkIcon}
            </span>
            <span class="step-rail-label">${this.escapeHtml(step.shortTitle)}</span>
          </button>
        </li>
      `;
    }).join('');
  }

  handleNextStep() {
    if (!this.validateCurrentStepWithUI()) {
      return;
    }

    if (this.state.currentStep < TOTAL_STEPS) {
      this.goToStep(this.state.currentStep + 1);
    }
  }

  handlePrevStep() {
    if (this.state.currentStep > 1) {
      this.goToStep(this.state.currentStep - 1);
    }
  }

  /* ============================================================
     STEP 5: DYNAMIC REVIEW RENDERING
     ============================================================ */
  renderFinalReview() {
    const { data } = this.state;
    const flow = getDynamicFlowState(data);

    const newTypeLabel =
      FORM_OPTIONS.newSiteTypes.find((t) => t.value === data.newSiteType)?.label || data.newSiteType;

    const existingTaskLabels = (data.existingSiteTasks || []).map(
      (val) => FORM_OPTIONS.existingSiteTasks.find((t) => t.value === val)?.label || val
    );

    const step2Items = [
      {
        label: 'Project Path',
        value: flow.isNewSite
          ? 'Brand-New Website or App'
          : flow.isExistingSite
          ? 'Existing Website (Redesign, Fix or Upgrade)'
          : 'Not selected'
      },
      { label: 'Main Goals', tags: data.primaryGoals }
    ];

    if (flow.isNewSite) {
      step2Items.push({ label: 'New Site Type', value: newTypeLabel });
    } else if (flow.isExistingSite) {
      step2Items.push(
        { label: 'Current Website URL', value: data.existingWebsiteUrl },
        { label: 'Current Platform', value: data.existingSitePlatform },
        { label: 'Requested Work on Existing Site', tags: existingTaskLabels, fullSpan: true }
      );
      if (data.existingSitePainPoints.length > 0) {
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
        { label: 'Portal Capabilities', tags: data.webappCapabilities, fullSpan: true }
      );
    }

    if (data.customProjectNotes) {
      step2Items.push({ label: 'Custom Notes', value: data.customProjectNotes, fullSpan: true });
    }

    const sections = [
      {
        stepId: 1,
        title: 'About You & Location',
        items: [
          { label: 'Contact Name', value: data.contactName },
          { label: 'Business / Project Name', value: data.businessName },
          { label: 'Email Address', value: data.email },
          {
            label: 'Preferred Contact',
            value: data.phone ? `${data.preferredContact} (${data.phone})` : data.preferredContact
          },
          { label: 'Location', value: formatLocationSummary(data) },
          { label: 'Industry', value: data.industry },
          ...(data.businessSummary
            ? [{ label: 'Business Summary', value: data.businessSummary, fullSpan: true }]
            : [])
        ]
      },
      {
        stepId: 2,
        title: 'Project Scope & Dynamic Requirements',
        items: step2Items
      },
      {
        stepId: 3,
        title: 'Design, Content & Add-ons',
        items: [
          {
            label: flow.isExistingSite ? 'Keep from Current Site' : 'Brand Assets Ready',
            tags: flow.isExistingSite ? data.existingSiteKeepAssets : data.newSiteBrandAssets
          },
          {
            label: 'Visual Style Vibe',
            value: flow.wantsVisualRedesign ? data.visualStyle : 'Preserve existing visual design'
          },
          { label: 'Handy Features Included', tags: data.commonAddons, fullSpan: true },
          ...(data.assistanceNeeded.length
            ? [{ label: 'Creative Assistance Needed', tags: data.assistanceNeeded }]
            : []),
          ...(data.admiredWebsites
            ? [{ label: 'Inspiration Websites', value: data.admiredWebsites }]
            : [])
        ]
      },
      {
        stepId: 4,
        title: 'Setup, Timeline & Budget',
        items: [
          { label: 'Budget Ballpark (ZAR)', value: data.estimatedBudget },
          {
            label: 'Target Timeline',
            value:
              flow.showSpecificDateInput && data.desiredLaunchDate
                ? `${data.desiredLaunchDate}${data.milestoneDetails ? ` (${data.milestoneDetails})` : ''}`
                : data.timelinePreference
          },
          { label: 'Post-Launch Support', value: data.ongoingServicePreference },
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
                    FORM_OPTIONS.existingSiteAccessStatus.find(
                      (a) => a.value === data.existingSiteAccessStatus
                    )?.label || data.existingSiteAccessStatus,
                  fullSpan: true
                }
              ])
        ]
      }
    ];

    this.reviewContainer.innerHTML = sections
      .map((sec) => {
        const validation = validateStep(sec.stepId, data);
        const cardClass = validation.isValid ? 'review-card' : 'review-card has-step-errors';

        return `
          <article class="${cardClass}">
            <div class="review-card-header">
              <div class="review-card-title-group">
                <span class="review-step-num">Step 0${sec.stepId}</span>
                <h3 class="review-card-title">${this.escapeHtml(sec.title)}</h3>
              </div>
              <button
                type="button"
                class="btn btn-xs btn-secondary"
                data-edit-step="${sec.stepId}"
                aria-label="Edit Step ${sec.stepId}: ${this.escapeAttr(sec.title)}"
              >
                Edit
              </button>
            </div>
            <div class="review-card-body">
              ${sec.items.map((item) => this.renderReviewItem(item)).join('')}
            </div>
          </article>
        `;
      })
      .join('');
  }

  renderReviewItem(item) {
    const spanClass = item.fullSpan ? 'review-item full-span' : 'review-item';

    if (Array.isArray(item.tags)) {
      if (item.tags.length === 0) {
        return `
          <div class="${spanClass}">
            <span class="review-label">${this.escapeHtml(item.label)}</span>
            <span class="review-value is-empty">None selected</span>
          </div>
        `;
      }
      return `
        <div class="${spanClass}">
          <span class="review-label">${this.escapeHtml(item.label)}</span>
          <div class="review-tags">
            ${item.tags.map((t) => `<span class="review-tag">${this.escapeHtml(t)}</span>`).join('')}
          </div>
        </div>
      `;
    }

    const val = (item.value || '').trim();
    return `
      <div class="${spanClass}">
        <span class="review-label">${this.escapeHtml(item.label)}</span>
        <span class="review-value ${val ? '' : 'is-empty'}">${
          val ? this.escapeHtml(val) : 'Not specified'
        }</span>
      </div>
    `;
  }

  /* ============================================================
     FORM SUBMISSION & PROTOTYPE CONFIRMATION SCREEN
     ============================================================ */
  handleFormSubmit(event) {
    event.preventDefault();

    if (!this.validateCurrentStepWithUI()) {
      return;
    }

    const allValidation = validateAllSteps(this.state.data);
    if (!allValidation.isValid && allValidation.firstInvalidStep !== TOTAL_STEPS) {
      this.goToStep(allValidation.firstInvalidStep);
      this.validateCurrentStepWithUI();
      return;
    }

    this.showConfirmationScreen();
  }

  showConfirmationScreen() {
    const payload = buildSubmissionPayload(this.state.data);
    const formattedSummary = this.buildPlainTextSummary(payload);

    this.payloadTimestamp.textContent = new Date().toLocaleString('en-ZA', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
    this.compiledSummaryPre.textContent = formattedSummary;

    this.questionnaireShell.hidden = true;
    this.progressNav.hidden = true;
    this.confirmationScreen.hidden = false;

    this.confirmationScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  buildPlainTextSummary(payload) {
    const c = payload.clientAndLocation;
    const p = payload.projectScope;
    const d = payload.designAndAddons;
    const t = payload.setupBudgetAndTimeline;

    const lines = [
      '============================================================',
      'JOZILABS – DYNAMIC WEBSITE PROJECT BRIEF (PROTOTYPE MVP)',
      '============================================================',
      'STATUS: Local Frontend Prototype Output (Not transmitted to a server)',
      `GENERATED: ${payload.meta.generatedAt}`,
      '',
      '1. CLIENT & LOCATION',
      `   • Contact Name:      ${c.contactName}`,
      `   • Business Name:     ${c.businessName}`,
      `   • Email Address:     ${c.email}`,
      `   • Preferred Contact: ${c.preferredContact}${c.phone ? ` (${c.phone})` : ''}`,
      `   • Location:          ${c.formattedLocation}`,
      `   • Industry:          ${c.industry}`,
      `   • Summary:           ${c.businessSummary || 'Not specified'}`,
      '',
      '2. PROJECT PATH & SCOPE',
      `   • Project Situation: ${p.siteSituation === 'new' ? 'Brand-New Build' : 'Existing Website'}`,
      `   • Main Goals:        ${p.primaryGoals.join(', ') || 'General'}`
    ];

    if (p.newSiteBranch) {
      lines.push(`   • New Site Type:     ${p.newSiteBranch.newSiteType}`);
    }
    if (p.existingSiteBranch) {
      lines.push(
        `   • Current Website:   ${p.existingSiteBranch.existingWebsiteUrl} (${p.existingSiteBranch.currentPlatform})`,
        `   • Requested Work:    ${p.existingSiteBranch.requestedTasks.join(', ')}`,
        `   • Pain Points:       ${p.existingSiteBranch.currentPainPoints.join(', ') || 'None specified'}`
      );
    }

    if (p.dynamicModules.staticPages) {
      const sp = p.dynamicModules.staticPages;
      lines.push(
        `   • [Pages Scope]:     ${sp.estimatedPageCount} | Pages: ${sp.selectedPages.join(', ')}${sp.additionalPages ? ` (+ ${sp.additionalPages})` : ''}`
      );
    }
    if (p.dynamicModules.ecommerce) {
      const ec = p.dynamicModules.ecommerce;
      lines.push(
        `   • [Store Scope]:     ${ec.estimatedProductCount} | Gateways: ${ec.paymentGateways.join(', ')} | Delivery: ${ec.deliveryOptions.join(', ')}`
      );
    }
    if (p.dynamicModules.booking) {
      const bk = p.dynamicModules.booking;
      lines.push(
        `   • [Booking Scope]:   ${bk.bookingType} | Payment: ${bk.paymentRequirement} | Extras: ${bk.bookingExtras.join(', ')}`
      );
    }
    if (p.dynamicModules.webappPortal) {
      const wa = p.dynamicModules.webappPortal;
      lines.push(
        `   • [Web App/Portal]:  Users: ${wa.userTypes} | Capabilities: ${wa.capabilities.join(', ')}`
      );
    }

    lines.push(
      '',
      '3. DESIGN & ADD-ONS',
      `   • Visual Style:      ${d.visualStyle}`,
      `   • Brand Assets:      ${d.brandAssets.join(', ') || 'None specified'}`,
      `   • Creative Help:     ${d.assistanceNeeded.join(', ') || 'None specified'}`,
      `   • Handy Add-ons:     ${d.commonAddons.join(', ') || 'Standard'}`,
      '',
      '4. SETUP, TIMELINE & BUDGET',
      `   • Budget Ballpark:   ${t.estimatedBudget}`,
      `   • Target Timeline:   ${t.timelinePreference}${t.desiredLaunchDate ? ` (${t.desiredLaunchDate} - ${t.milestoneDetails || ''})` : ''}`,
      `   • Ongoing Support:   ${t.ongoingServicePreference}`,
      '============================================================'
    );

    return lines.join('\n');
  }

  async copyBriefToClipboard() {
    const text = this.compiledSummaryPre.textContent || '';
    try {
      await navigator.clipboard.writeText(text);
      this.copyBriefBtnText.textContent = 'Copied to Clipboard!';
      setTimeout(() => {
        this.copyBriefBtnText.textContent = 'Copy Project Summary';
      }, 2400);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(this.compiledSummaryPre);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      this.copyBriefBtnText.textContent = 'Selected (Press Ctrl+C)';
    }
  }

  downloadJsonPayload() {
    const payload = buildSubmissionPayload(this.state.data);
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = (this.state.data.businessName || 'project')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    link.href = url;
    link.download = `jozilabs-discovery-${safeName || 'brief'}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  resetForm(confirmWithUser = true) {
    if (confirmWithUser) {
      const confirmed = window.confirm(
        'Start over from Step 1? Your current selections will be reset to defaults.'
      );
      if (!confirmed) return;
    }

    clearFormState();
    this.state = {
      currentStep: 1,
      maxVisitedStep: 1,
      data: createDefaultFormData()
    };
    this.touchedFields.clear();
    this.form.reset();
    this.hydrateInputsFromState();
    this.updateDynamicUI();
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      this.clearStepErrorsUI(i);
    }
    this.goToStep(1);
  }

  /* ============================================================
     PRIVACY NOTICE MODAL (ACCESSIBLE DIALOG)
     ============================================================ */
  openPrivacyModal(triggerEl) {
    this.lastFocusedElement = triggerEl || document.activeElement;
    this.privacyModal.hidden = false;
    document.body.style.overflow = 'hidden';
    this.closePrivacyBtn.focus();
  }

  closePrivacyModal() {
    this.privacyModal.hidden = true;
    document.body.style.overflow = '';
    if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
      this.lastFocusedElement.focus();
    }
  }

  handleModalKeydown(event) {
    if (this.privacyModal.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closePrivacyModal();
      return;
    }

    if (event.key === 'Tab') {
      const focusable = this.privacyModal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  /* ============================================================
     EVENT BINDINGS
     ============================================================ */
  bindEvents() {
    this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());

    this.form.addEventListener('input', (e) => {
      const target = e.target;
      if (!target || !target.name) return;
      this.readFieldValueIntoState(target);
      this.updateDynamicUI();

      if (this.touchedFields.has(target.name)) {
        this.validateAndRenderField(target.name);
      }
    });

    this.form.addEventListener('change', (e) => {
      const target = e.target;
      if (!target || !target.name) return;
      this.readFieldValueIntoState(target);
      this.updateDynamicUI();
      this.touchedFields.add(target.name);
      this.validateAndRenderField(target.name);
      this.renderStepRail();
    });

    this.form.addEventListener(
      'blur',
      (e) => {
        const target = e.target;
        if (!target || !target.name) return;
        if (target.type === 'radio' || target.type === 'checkbox') return;
        this.touchedFields.add(target.name);
        this.validateAndRenderField(target.name);
      },
      true
    );

    const selectCorePagesBtn = document.getElementById('select-core-pages-btn');
    if (selectCorePagesBtn) {
      selectCorePagesBtn.addEventListener('click', () => {
        this.state.data.requiredPages = ['Home', 'About Us', 'Services', 'Contact Us'];
        saveFormState(this.state);
        this.hydrateInputsFromState();
        this.updateDynamicUI();
      });
    }

    this.nextBtn.addEventListener('click', () => this.handleNextStep());
    this.prevBtn.addEventListener('click', () => this.handlePrevStep());
    this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    this.resetBtn.addEventListener('click', () => this.resetForm(true));

    this.stepRailList.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-goto-step]');
      if (!btn || btn.disabled) return;
      const targetStep = Number(btn.getAttribute('data-goto-step'));
      if (targetStep === this.state.currentStep) return;

      if (targetStep > this.state.currentStep && !this.validateCurrentStepWithUI()) {
        return;
      }
      this.goToStep(targetStep);
    });

    this.reviewContainer.addEventListener('click', (e) => {
      const editBtn = e.target.closest('[data-edit-step]');
      if (!editBtn) return;
      const stepId = Number(editBtn.getAttribute('data-edit-step'));
      this.goToStep(stepId);
    });

    this.copyBriefBtn.addEventListener('click', () => this.copyBriefToClipboard());
    this.downloadJsonBtn.addEventListener('click', () => this.downloadJsonPayload());
    this.printBriefBtn.addEventListener('click', () => window.print());
    this.backToReviewBtn.addEventListener('click', () => this.goToStep(TOTAL_STEPS));
    this.startNewEnquiryBtn.addEventListener('click', () => this.resetForm(true));

    document.querySelectorAll('[data-open-privacy]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openPrivacyModal(btn);
      });
    });

    this.closePrivacyBtn.addEventListener('click', () => this.closePrivacyModal());
    this.acknowledgePrivacyBtn.addEventListener('click', () => this.closePrivacyModal());
    this.privacyModal.addEventListener('click', (e) => {
      if (e.target === this.privacyModal) {
        this.closePrivacyModal();
      }
    });
    document.addEventListener('keydown', (e) => this.handleModalKeydown(e));
  }

  /* ============================================================
     SAFE HTML ESCAPING UTILITIES
     ============================================================ */
  escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  escapeAttr(str) {
    return this.escapeHtml(str);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.joziLabsDiscoveryApp = new DiscoveryFormApp();
});

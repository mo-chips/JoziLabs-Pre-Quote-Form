/**
 * JoziLabs – Start a Project | Multi-Service Discovery Application Controller
 * scripts/app.js
 *
 * Orchestrates:
 * - Central "Start a Project" Service Selector Hub (Web Development, Software Development,
 *   Cloud & Infrastructure, IT & Cybersecurity [IT Support + Cybersecurity], and Code Tutoring)
 * - Service-specific discovery step injection via scripts/form-engine.js
 * - Consistent 5-step client onboarding flow with preserved contact details across services
 * - Context-aware validation, review summary cards, plain-text brief copy, and JSON payload export
 */

import {
  SERVICE_MODULES,
  START_PROJECT_PILLARS,
  COMMON_FORM_OPTIONS,
  getServiceModule,
  getStepsConfig,
  createInitialAppState,
  createDefaultServiceDataMap,
  loadAppState,
  saveAppState,
  clearAppState,
  getActiveFlatData,
  writeFieldToAppState,
  renderServiceStepsHtml,
  updateServiceDynamicDOM,
  buildReviewSections,
  buildSubmissionPayload,
  buildPlainTextSummary,
  escapeHtml
} from './form-engine.js';

import {
  validateField,
  validateStep,
  validateAllSteps
} from './validation.js';

const THEME_STORAGE_KEY = 'jozilabs_discovery_theme';
const TOTAL_STEPS = 5;

class StartAProjectApp {
  constructor() {
    this.state = loadAppState();
    this.touchedFields = new Set();
    this.lastFocusedElement = null;

    this.initTheme();
    this.cacheElements();
    this.renderCommonStep1Controls();
    this.renderServiceHubCards();
    this.bindEvents();

    // Support URL query parameter e.g. ?service=software-development
    const urlService = this.getServiceFromUrl();
    if (urlService) {
      this.selectService(urlService, { goToStep: 1, skipScroll: true });
    } else if (this.state.selectedServiceId) {
      this.selectService(this.state.selectedServiceId, {
        goToStep: this.state.currentStep,
        skipScroll: true,
        restoreSession: true
      });
    } else {
      this.showServiceHub({ skipScroll: true });
    }
  }

  getServiceFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      const raw = (params.get('service') || '').trim().toLowerCase();
      if (!raw) return null;
      if (raw === 'it-cybersecurity') return 'it-support';
      if (SERVICE_MODULES[raw]) return raw;
      return null;
    } catch {
      return null;
    }
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
      // Keep default theme on <html>
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
     DOM ELEMENT CACHING
     ============================================================ */
  cacheElements() {
    this.pageTitleEl = document.getElementById('page-title');
    this.pageLeadEl = document.getElementById('page-lead');
    this.headerAllServicesBtn = document.getElementById('header-all-services-btn');

    // Central "Start a Project" Hub
    this.startProjectHub = document.getElementById('start-project-hub');
    this.servicePillarsGrid = document.getElementById('service-pillars-grid');

    // Active Service Banner
    this.activeServiceBanner = document.getElementById('active-service-banner');
    this.activeServiceIcon = document.getElementById('active-service-icon');
    this.activeServiceBadge = document.getElementById('active-service-badge');
    this.activeServiceTime = document.getElementById('active-service-time');
    this.activeServiceTitle = document.getElementById('active-service-title');
    this.itCyberSubtoggle = document.getElementById('it-cyber-subtoggle');
    this.subBtnItSupport = document.getElementById('subbtn-it-support');
    this.subBtnCybersecurity = document.getElementById('subbtn-cybersecurity');
    this.changeServiceBtn = document.getElementById('change-service-btn');

    // Main Form & Progress
    this.form = document.getElementById('discovery-form');
    this.questionnaireShell = document.getElementById('questionnaire-shell');
    this.progressNav = document.getElementById('progress-navigation');
    this.confirmationScreen = document.getElementById('confirmation-screen');

    this.step2Container = document.getElementById('step-2');
    this.step3Container = document.getElementById('step-3');
    this.step4Container = document.getElementById('step-4');

    this.stepCounterEl = document.getElementById('progress-step-counter');
    this.stepTitleEl = document.getElementById('progress-step-title');
    this.progressPctEl = document.getElementById('progress-percentage');
    this.progressBarAria = document.getElementById('progress-bar-aria');
    this.progressBarFill = document.getElementById('progress-bar-fill');
    this.stepRailList = document.getElementById('step-rail-list');

    this.stepKickerEl = document.getElementById('active-step-kicker');
    this.stepHeadingEl = document.getElementById('active-step-heading');
    this.stepSubtitleEl = document.getElementById('active-step-subtitle');

    this.errorSummaryBanner = document.getElementById('step-error-summary');
    this.errorSummaryDetail = document.getElementById('step-error-summary-detail');

    this.prevBtn = document.getElementById('prev-step-btn');
    this.prevBtnLabel = document.getElementById('prev-step-btn-label');
    this.nextBtn = document.getElementById('next-step-btn');
    this.submitBtn = document.getElementById('submit-enquiry-btn');
    this.resetBtn = document.getElementById('reset-form-btn');
    this.themeToggleBtn = document.getElementById('theme-toggle-btn');

    // Review & Confirmation elements
    this.reviewContainer = document.getElementById('review-summary-container');
    this.confirmationServiceName = document.getElementById('confirmation-service-name');
    this.compiledSummaryPre = document.getElementById('compiled-summary-text');
    this.payloadTimestamp = document.getElementById('payload-timestamp');
    this.copyBriefBtn = document.getElementById('copy-brief-btn');
    this.copyBriefBtnText = document.getElementById('copy-brief-btn-text');
    this.downloadJsonBtn = document.getElementById('download-json-btn');
    this.printBriefBtn = document.getElementById('print-brief-btn');
    this.backToReviewBtn = document.getElementById('back-to-review-btn');
    this.exploreOtherServicesBtn = document.getElementById('explore-other-services-btn');
    this.startNewEnquiryBtn = document.getElementById('start-new-enquiry-btn');

    // Privacy modal
    this.privacyModal = document.getElementById('privacy-modal');
    this.closePrivacyBtn = document.getElementById('close-privacy-modal-btn');
    this.acknowledgePrivacyBtn = document.getElementById('acknowledge-privacy-btn');
  }

  /* ============================================================
     RENDER COMMON STEP 1 & CENTRAL "START A PROJECT" HUB
     ============================================================ */
  renderCommonStep1Controls() {
    const industrySelect = document.getElementById('industry');
    if (industrySelect) {
      COMMON_FORM_OPTIONS.industries.forEach((ind) => {
        const opt = document.createElement('option');
        opt.value = ind;
        opt.textContent = ind;
        industrySelect.appendChild(opt);
      });
    }

    const contactToggle = document.getElementById('preferredContact-container');
    if (contactToggle) {
      contactToggle.innerHTML = COMMON_FORM_OPTIONS.contactChannels
        .map(
          (ch) => `
          <label class="segment-option">
            <input type="radio" name="preferredContact" value="${escapeHtml(ch)}">
            <span>${escapeHtml(ch)}</span>
          </label>
        `
        )
        .join('');
    }

    const provinceSelect = document.getElementById('province');
    if (provinceSelect) {
      COMMON_FORM_OPTIONS.saProvinces.forEach((prov) => {
        const opt = document.createElement('option');
        opt.value = prov;
        opt.textContent = prov;
        provinceSelect.appendChild(opt);
      });
    }
  }

  renderServiceHubCards() {
    if (!this.servicePillarsGrid) return;

    this.servicePillarsGrid.innerHTML = START_PROJECT_PILLARS.map((pillar) => {
      return `
        <article class="service-hub-card" data-pillar-card="${escapeHtml(pillar.pillarId)}">
          <div class="service-card-top">
            <div class="service-card-icon" aria-hidden="true">
              ${pillar.iconSvg}
            </div>
            <h3 class="service-card-title">${escapeHtml(pillar.title)}</h3>
          </div>

          <div class="service-card-body">
            <p class="service-card-tagline">${escapeHtml(pillar.tagline)}</p>
            <p class="service-card-desc">${escapeHtml(pillar.description)}</p>

            <ul class="service-highlights-list" aria-label="${escapeHtml(pillar.title)} capabilities">
              ${pillar.highlights
                .map(
                  (item) => `
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                    <span>${escapeHtml(item)}</span>
                  </li>
                `
                )
                .join('')}
            </ul>
          </div>

          <div class="service-card-footer">
            <button
              type="button"
              class="btn btn-primary btn-sm service-start-btn"
              data-select-service="${escapeHtml(pillar.defaultServiceId)}"
            >
              <span>Start Discovery</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  /* ============================================================
     SERVICE SELECTION & CENTRAL HUB VIEW SWITCHING
     ============================================================ */
  showServiceHub(options = {}) {
    clearAppState();
    this.state = createInitialAppState();
    this.touchedFields.clear();
    if (this.form) {
      this.form.reset();
    }
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      this.clearStepErrorsUI(i);
    }

    this.pageTitleEl.textContent = 'Start a Project with JoziLabs';
    this.pageLeadEl.textContent =
      'Select the service you need below. Each service launches its own tailored discovery flow so you only answer questions relevant to what you are building, fixing, securing, or learning.';

    this.startProjectHub.hidden = false;
    this.activeServiceBanner.hidden = true;
    this.progressNav.hidden = true;
    this.questionnaireShell.hidden = true;
    this.confirmationScreen.hidden = true;
    this.headerAllServicesBtn.hidden = true;

    this.renderServiceHubCards();

    if (!options.skipScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  selectService(serviceId, options = {}) {
    const resolvedId = serviceId === 'it-cybersecurity' ? 'it-support' : serviceId;
    const service = getServiceModule(resolvedId);

    if (!options.restoreSession) {
      // Changing or selecting a service resets the form to a clean state at Step 1
      clearAppState();
      this.state = createInitialAppState();
      if (this.form) {
        this.form.reset();
      }
      for (let i = 1; i <= TOTAL_STEPS; i++) {
        this.clearStepErrorsUI(i);
      }
    }

    this.state.selectedServiceId = service.id;
    saveAppState(this.state);
    this.touchedFields.clear();

    // Update Hero Heading & Lead to reflect active service
    this.pageTitleEl.textContent = `Let's Scope Your ${service.title} Project`;
    this.pageLeadEl.textContent = service.description;

    // Update Active Service Banner
    this.activeServiceIcon.innerHTML = service.iconSvg;
    this.activeServiceBadge.textContent = service.categoryBadge;
    this.activeServiceTime.textContent = service.estimatedTime;
    this.activeServiceTitle.textContent = service.title;

    const isItOrCyber = service.id === 'it-support' || service.id === 'cybersecurity';
    this.itCyberSubtoggle.hidden = !isItOrCyber;
    if (isItOrCyber) {
      this.subBtnItSupport.classList.toggle('is-active', service.id === 'it-support');
      this.subBtnCybersecurity.classList.toggle('is-active', service.id === 'cybersecurity');
    }

    // Inject Service-Specific HTML into Steps 2, 3, and 4
    const templates = renderServiceStepsHtml(service.id);
    this.step2Container.innerHTML = templates.step2;
    this.step3Container.innerHTML = templates.step3;
    this.step4Container.innerHTML = templates.step4;

    // Bind Web Dev's "Reset to core pages" helper button if present
    const selectCorePagesBtn = document.getElementById('select-core-pages-btn');
    if (selectCorePagesBtn) {
      selectCorePagesBtn.addEventListener('click', () => {
        writeFieldToAppState(this.state, 'requiredPages', [
          'Home',
          'About Us',
          'Services',
          'Contact Us'
        ]);
        this.hydrateInputsFromState();
        this.updateDynamicUI();
      });
    }

    // Hydrate inputs and update dynamic visibility
    this.hydrateInputsFromState();
    this.updateDynamicUI();

    // Show Form Shell & hide Central Hub
    this.startProjectHub.hidden = true;
    this.activeServiceBanner.hidden = false;
    this.progressNav.hidden = false;
    this.questionnaireShell.hidden = false;
    this.confirmationScreen.hidden = true;
    this.headerAllServicesBtn.hidden = false;

    const targetStep = options.goToStep || this.state.currentStep || 1;
    this.goToStep(targetStep, { skipScroll: options.skipScroll });
  }

  /* ============================================================
     STATE HYDRATION & SYNCHRONISATION
     ============================================================ */
  hydrateInputsFromState() {
    const data = getActiveFlatData(this.state);

    // Hydrate all named elements in the form
    const controls = this.form.querySelectorAll('input[name], select[name], textarea[name]');
    controls.forEach((ctrl) => {
      const { name, type, value } = ctrl;
      if (!(name in data)) return;

      const stateVal = data[name];

      if (type === 'checkbox') {
        if (Array.isArray(stateVal)) {
          ctrl.checked = stateVal.includes(value);
        } else {
          ctrl.checked = Boolean(stateVal);
        }
      } else if (type === 'radio') {
        ctrl.checked = String(stateVal) === String(value);
      } else {
        ctrl.value = typeof stateVal === 'string' ? stateVal : '';
      }
    });
  }

  readFieldValueIntoState(target) {
    const { name, type, value, checked } = target;
    if (!name) return;
    const currentData = getActiveFlatData(this.state);
    if (!(name in currentData)) return;

    let nextValue;
    if (type === 'checkbox') {
      if (Array.isArray(currentData[name])) {
        const boxes = this.form.querySelectorAll(`input[type="checkbox"][name="${name}"]:checked`);
        nextValue = Array.from(boxes).map((b) => b.value);
      } else {
        nextValue = Boolean(checked);
      }
    } else if (type === 'radio') {
      if (!checked) return;
      nextValue = value;
    } else {
      nextValue = value;
    }

    writeFieldToAppState(this.state, name, nextValue);
  }

  updateDynamicUI() {
    const serviceId = this.state.selectedServiceId || 'web-development';
    const data = getActiveFlatData(this.state);
    updateServiceDynamicDOM(serviceId, data);
  }

  /* ============================================================
     VALIDATION UI RENDERING
     ============================================================ */
  validateAndRenderField(fieldName) {
    const serviceId = this.state.selectedServiceId || 'web-development';
    const data = getActiveFlatData(this.state);
    const errorMsg = validateField(fieldName, data, serviceId);
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
    const serviceId = this.state.selectedServiceId || 'web-development';
    const data = getActiveFlatData(this.state);
    const result = validateStep(stepId, data, serviceId);

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
    saveAppState(this.state);

    const serviceId = this.state.selectedServiceId || 'web-development';
    const stepsConfig = getStepsConfig(serviceId);

    this.startProjectHub.hidden = true;
    this.activeServiceBanner.hidden = false;
    this.questionnaireShell.hidden = false;
    this.progressNav.hidden = false;
    this.confirmationScreen.hidden = true;
    this.headerAllServicesBtn.hidden = false;

    for (let i = 1; i <= TOTAL_STEPS; i++) {
      const section = document.getElementById(`step-${i}`);
      if (section) {
        const isCurrent = i === targetStep;
        section.hidden = !isCurrent;
        section.classList.toggle('is-active', isCurrent);
      }
    }

    const stepMeta = stepsConfig.find((s) => s.id === targetStep) || stepsConfig[0];
    const padded = String(targetStep).padStart(2, '0');
    const service = getServiceModule(serviceId);
    this.stepKickerEl.textContent = `${service.shortTitle.toUpperCase()} · STEP ${padded} / 0${TOTAL_STEPS}`;
    this.stepHeadingEl.textContent = stepMeta.title;
    this.stepSubtitleEl.textContent = stepMeta.subtitle;

    this.errorSummaryBanner.hidden = true;

    // On Step 1, Previous returns to "All Services" Hub; on Steps 2-5, goes to previous step
    this.prevBtn.hidden = false;
    this.prevBtnLabel.textContent = targetStep === 1 ? 'All Services' : 'Previous';

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
      this.activeServiceBanner.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  renderStepRail() {
    const current = this.state.currentStep;
    const maxVisited = this.state.maxVisitedStep;
    const serviceId = this.state.selectedServiceId || 'web-development';
    const stepsConfig = getStepsConfig(serviceId);
    const data = getActiveFlatData(this.state);

    this.stepRailList.innerHTML = stepsConfig
      .map((step) => {
        const isCurrent = step.id === current;
        const isVisited = step.id <= maxVisited;
        const stepValidation =
          step.id < TOTAL_STEPS ? validateStep(step.id, data, serviceId) : { isValid: false };
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
              aria-label="Step ${step.id}: ${escapeHtml(step.title)}${
                isCompleted ? ' (Completed)' : ''
              }"
            >
              <span class="step-rail-top">
                <span class="step-rail-num">0${step.id}</span>
                ${checkIcon}
              </span>
              <span class="step-rail-label">${escapeHtml(step.shortTitle)}</span>
            </button>
          </li>
        `;
      })
      .join('');
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
    } else {
      this.showServiceHub();
    }
  }

  /* ============================================================
     STEP 5: SERVICE-SPECIFIC REVIEW RENDERING
     ============================================================ */
  renderFinalReview() {
    const serviceId = this.state.selectedServiceId || 'web-development';
    const data = getActiveFlatData(this.state);
    const sections = buildReviewSections(serviceId, data);

    this.reviewContainer.innerHTML = sections
      .map((sec) => {
        const validation = validateStep(sec.stepId, data, serviceId);
        const cardClass = validation.isValid ? 'review-card' : 'review-card has-step-errors';

        return `
          <article class="${cardClass}">
            <div class="review-card-header">
              <div class="review-card-title-group">
                <span class="review-step-num">Step 0${sec.stepId}</span>
                <h3 class="review-card-title">${escapeHtml(sec.title)}</h3>
              </div>
              <button
                type="button"
                class="btn btn-xs btn-secondary"
                data-edit-step="${sec.stepId}"
                aria-label="Edit Step ${sec.stepId}: ${escapeHtml(sec.title)}"
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
            <span class="review-label">${escapeHtml(item.label)}</span>
            <span class="review-value is-empty">None selected</span>
          </div>
        `;
      }
      return `
        <div class="${spanClass}">
          <span class="review-label">${escapeHtml(item.label)}</span>
          <div class="review-tags">
            ${item.tags.map((t) => `<span class="review-tag">${escapeHtml(t)}</span>`).join('')}
          </div>
        </div>
      `;
    }

    const val = String(item.value ?? '').trim();
    return `
      <div class="${spanClass}">
        <span class="review-label">${escapeHtml(item.label)}</span>
        <span class="review-value ${val ? '' : 'is-empty'}">${
          val ? escapeHtml(val) : 'Not specified'
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

    const serviceId = this.state.selectedServiceId || 'web-development';
    const data = getActiveFlatData(this.state);
    const allValidation = validateAllSteps(data, serviceId);

    if (!allValidation.isValid && allValidation.firstInvalidStep !== TOTAL_STEPS) {
      this.goToStep(allValidation.firstInvalidStep);
      this.validateCurrentStepWithUI();
      return;
    }

    this.showConfirmationScreen();
  }

  showConfirmationScreen() {
    const serviceId = this.state.selectedServiceId || 'web-development';
    const service = getServiceModule(serviceId);
    const data = getActiveFlatData(this.state);
    const payload = buildSubmissionPayload(service.id, data);
    const formattedSummary = buildPlainTextSummary(service.id, payload);

    if (this.confirmationServiceName) {
      this.confirmationServiceName.textContent = service.title;
    }

    this.payloadTimestamp.textContent = new Date().toLocaleString('en-ZA', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
    this.compiledSummaryPre.textContent = formattedSummary;

    this.questionnaireShell.hidden = true;
    this.progressNav.hidden = true;
    this.activeServiceBanner.hidden = true;
    this.confirmationScreen.hidden = false;

    this.confirmationScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    const serviceId = this.state.selectedServiceId || 'web-development';
    const data = getActiveFlatData(this.state);
    const payload = buildSubmissionPayload(serviceId, data);

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = (data.businessName || data.contactName || 'project')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    link.href = url;
    link.download = `jozilabs-${serviceId}-${safeName || 'brief'}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  resetCurrentTrack(confirmWithUser = true) {
    const serviceId = this.state.selectedServiceId;
    if (!serviceId) return;

    const service = getServiceModule(serviceId);
    if (confirmWithUser) {
      const confirmed = window.confirm(
        `Reset your ${service.title} discovery answers back to defaults?`
      );
      if (!confirmed) return;
    }

    const defaultsMap = createDefaultServiceDataMap();
    this.state.serviceData[service.id] = defaultsMap[service.id];
    this.state.currentStep = 1;
    this.state.maxVisitedStep = 1;
    saveAppState(this.state);

    this.touchedFields.clear();
    this.hydrateInputsFromState();
    this.updateDynamicUI();
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      this.clearStepErrorsUI(i);
    }
    this.goToStep(1);
  }

  resetEntireApp(confirmWithUser = true) {
    if (confirmWithUser) {
      const confirmed = window.confirm(
        'Start fresh and return to the Start a Project service selector?'
      );
      if (!confirmed) return;
    }

    clearAppState();
    this.state = createInitialAppState();
    this.touchedFields.clear();
    this.form.reset();
    this.showServiceHub();
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

    // Service Selection from Central Hub (Cards & Direct Quick Chips)
    this.startProjectHub.addEventListener('click', (e) => {
      const selectBtn = e.target.closest('[data-select-service]');
      if (selectBtn) {
        const serviceId = selectBtn.getAttribute('data-select-service');
        this.selectService(serviceId);
        return;
      }

      const card = e.target.closest('[data-pillar-card]');
      if (card && !e.target.closest('button')) {
        const pillarId = card.getAttribute('data-pillar-card');
        const pillar = START_PROJECT_PILLARS.find((p) => p.pillarId === pillarId);
        if (pillar) {
          this.selectService(pillar.defaultServiceId);
        }
      }
    });

    // Sub-service toggle inside IT & Cybersecurity banner (resets form to Step 1)
    this.itCyberSubtoggle.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-switch-subservice]');
      if (!btn) return;
      const subId = btn.getAttribute('data-switch-subservice');
      if (subId && subId !== this.state.selectedServiceId) {
        this.selectService(subId);
      }
    });

    // Change Service / All Services buttons
    this.changeServiceBtn.addEventListener('click', () => this.showServiceHub());
    this.headerAllServicesBtn.addEventListener('click', () => this.showServiceHub());
    this.exploreOtherServicesBtn.addEventListener('click', () => this.showServiceHub());

    // Form input & change listeners
    this.form.addEventListener('input', (e) => {
      const target = e.target;
      if (!target || !target.name) return;
      this.readFieldValueIntoState(target);
      this.updateDynamicUI();

      if (this.touchedFields.has(target.name)) {
        this.validateAndRenderField(target.name);
      }
    });

    const PRIMARY_TYPE_FIELDS = new Set([
      'siteSituation',
      'newSiteType',
      'softwareSituation',
      'softwareProductType',
      'cloudSituation',
      'itSituation',
      'securitySituation',
      'learnerProfile',
      'problemSituation'
    ]);

    this.form.addEventListener('change', (e) => {
      const target = e.target;
      if (!target || !target.name) return;

      if (PRIMARY_TYPE_FIELDS.has(target.name) && target.type === 'radio' && target.checked) {
        const serviceId = this.state.selectedServiceId || 'web-development';
        const defaultsMap = createDefaultServiceDataMap();
        const freshDefaults = defaultsMap[serviceId] || {};

        if (target.name === 'newSiteType') {
          const keepSituation = this.state.serviceData[serviceId]?.siteSituation || 'new';
          const keepGoals = this.state.serviceData[serviceId]?.primaryGoals || freshDefaults.primaryGoals;
          this.state.serviceData[serviceId] = {
            ...freshDefaults,
            siteSituation: keepSituation,
            primaryGoals: keepGoals,
            newSiteType: target.value
          };
        } else if (target.name === 'softwareProductType') {
          const keepSituation = this.state.serviceData[serviceId]?.softwareSituation || '';
          this.state.serviceData[serviceId] = {
            ...freshDefaults,
            softwareSituation: keepSituation,
            softwareProductType: target.value
          };
        } else {
          this.state.serviceData[serviceId] = {
            ...freshDefaults,
            [target.name]: target.value
          };
        }

        this.state.maxVisitedStep = this.state.currentStep;
        saveAppState(this.state);
        this.hydrateInputsFromState();
        for (let i = 2; i <= TOTAL_STEPS; i++) {
          this.clearStepErrorsUI(i);
        }
      } else {
        this.readFieldValueIntoState(target);
      }

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

    this.nextBtn.addEventListener('click', () => this.handleNextStep());
    this.prevBtn.addEventListener('click', () => this.handlePrevStep());
    this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    this.resetBtn.addEventListener('click', () => this.resetCurrentTrack(true));

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
    this.startNewEnquiryBtn.addEventListener('click', () => this.resetEntireApp(true));

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
}

document.addEventListener('DOMContentLoaded', () => {
  window.joziLabsStartProjectApp = new StartAProjectApp();
});

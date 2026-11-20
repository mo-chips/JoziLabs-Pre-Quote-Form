/**
 * JoziLabs – Website Project Discovery Form
 * scripts/validation.js
 *
 * Context-aware validation rules that dynamically validate only the active branch
 * (Local vs International location, New vs Existing website, WhatsApp/Phone contact preference).
 */

import { getDynamicFlowState } from './form-data.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+\d\s()-]{7,22}$/;

export function isValidUrl(value) {
  const trimmed = (value || '').trim();
  if (!trimmed) return false;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(withProtocol);
    return Boolean(parsed.hostname && parsed.hostname.includes('.'));
  } catch {
    return false;
  }
}

export function validateField(fieldName, data) {
  const flow = getDynamicFlowState(data);

  switch (fieldName) {
    // Step 1 – About You & Location
    case 'contactName':
      if (!data.contactName || !data.contactName.trim()) {
        return 'Please enter your name.';
      }
      return null;

    case 'businessName':
      if (!data.businessName || !data.businessName.trim()) {
        return 'Please enter your business or project name.';
      }
      return null;

    case 'email':
      if (!data.email || !data.email.trim()) {
        return 'Please enter your email address.';
      }
      if (!EMAIL_REGEX.test(data.email.trim())) {
        return 'Please enter a valid email address (e.g. name@business.co.za).';
      }
      return null;

    case 'phone':
      if (flow.isPhoneRequired && (!data.phone || !data.phone.trim())) {
        return `Please enter your ${data.preferredContact === 'WhatsApp' ? 'WhatsApp' : 'phone'} number so we can reach you.`;
      }
      if (data.phone && data.phone.trim() && !PHONE_REGEX.test(data.phone.trim())) {
        return 'Please enter a valid phone number (e.g. 082 123 4567).';
      }
      return null;

    case 'province':
      if (flow.isLocal && (!data.province || !data.province.trim())) {
        return 'Please select your province.';
      }
      return null;

    case 'city':
      if (flow.isLocal && (!data.city || !data.city.trim())) {
        return 'Please enter your city or town.';
      }
      return null;

    case 'country':
      if (flow.isInternational && (!data.country || !data.country.trim())) {
        return 'Please enter your country.';
      }
      return null;

    // Step 2 – Dynamic Branching: New vs Existing
    case 'siteSituation':
      if (!data.siteSituation) {
        return 'Please select whether this is a brand-new site or an existing website.';
      }
      return null;

    case 'newSiteType':
      if (flow.isNewSite && !data.newSiteType) {
        return 'Please choose the type of new site you want to build.';
      }
      return null;

    case 'existingWebsiteUrl':
      if (flow.isExistingSite) {
        if (!data.existingWebsiteUrl || !data.existingWebsiteUrl.trim()) {
          return 'Please enter your current website address so we can inspect it.';
        }
        if (!isValidUrl(data.existingWebsiteUrl)) {
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

    // Step 4 – Budget Ballpark
    case 'estimatedBudget':
      if (!data.estimatedBudget) {
        return 'Please select a budget ballpark (or "Not sure yet — advise me").';
      }
      return null;

    // Step 5 – Review & Consent
    case 'confirmAccurate':
      if (!data.confirmAccurate) {
        return 'Please tick to confirm your project details.';
      }
      return null;

    case 'consentContact':
      if (!data.consentContact) {
        return 'Please tick so JoziLabs can contact you with your quotation.';
      }
      return null;

    default:
      return null;
  }
}

export function getStepFields(stepId, data) {
  const flow = getDynamicFlowState(data);

  switch (stepId) {
    case 1:
      return [
        'contactName',
        'businessName',
        'email',
        'phone',
        ...(flow.isLocal ? ['province', 'city'] : ['country'])
      ];
    case 2:
      return [
        'siteSituation',
        ...(flow.isNewSite ? ['newSiteType'] : []),
        ...(flow.isExistingSite ? ['existingWebsiteUrl', 'existingSiteTasks'] : [])
      ];
    case 3:
      return [];
    case 4:
      return ['estimatedBudget'];
    case 5:
      return ['confirmAccurate', 'consentContact'];
    default:
      return [];
  }
}

export function validateStep(stepId, data) {
  const fields = getStepFields(stepId, data);
  const errors = {};
  let firstInvalidField = null;

  for (const field of fields) {
    const error = validateField(field, data);
    if (error) {
      errors[field] = error;
      if (!firstInvalidField) {
        firstInvalidField = field;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    firstInvalidField
  };
}

export function validateAllSteps(data) {
  const stepResults = {};
  let firstInvalidStep = null;

  for (let stepId = 1; stepId <= 5; stepId++) {
    const result = validateStep(stepId, data);
    stepResults[stepId] = result;
    if (!result.isValid && firstInvalidStep === null) {
      firstInvalidStep = stepId;
    }
  }

  return {
    isValid: firstInvalidStep === null,
    firstInvalidStep,
    stepResults
  };
}

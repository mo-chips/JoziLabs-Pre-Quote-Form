/**
 * JoziLabs – Multi-Service Discovery Form Validation
 * scripts/validation.js
 *
 * Context-aware validation rules that dynamically validate:
 * - Step 1: Common client & location fields (adapting org requirement for Tutoring vs Business services)
 * - Steps 2–4: Service-specific required fields delegated to the active service module in scripts/services/*.js
 * - Step 5: Accuracy & contact consent checkboxes
 */

import { getServiceModule, getDynamicFlowState } from './form-engine.js';

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

export function validateField(fieldName, data, serviceId = 'web-development') {
  const service = getServiceModule(serviceId);
  const flow = getDynamicFlowState(service.id, data);

  switch (fieldName) {
    // Step 1 – Common Client & Location Validation
    case 'contactName':
      if (!data.contactName || !data.contactName.trim()) {
        return 'Please enter your name.';
      }
      return null;

    case 'businessName':
      if (flow.isOrgRequired && (!data.businessName || !data.businessName.trim())) {
        return 'Please enter your business, organisation, or project name.';
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
        return `Please enter your ${
          data.preferredContact === 'WhatsApp' ? 'WhatsApp' : 'phone'
        } number so we can reach you.`;
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

    // Steps 2, 3, 4 – Delegated to the active service schema
    default:
      if (typeof service.validateField === 'function') {
        return service.validateField(fieldName, data, flow, { isValidUrl });
      }
      return null;
  }
}

export function getStepFields(stepId, data, serviceId = 'web-development') {
  const service = getServiceModule(serviceId);
  const flow = getDynamicFlowState(service.id, data);

  switch (stepId) {
    case 1:
      return [
        'contactName',
        ...(flow.isOrgRequired ? ['businessName'] : []),
        'email',
        'phone',
        ...(flow.isLocal ? ['province', 'city'] : ['country'])
      ];
    case 2:
    case 3:
    case 4:
      if (typeof service.getRequiredFields === 'function') {
        return service.getRequiredFields(stepId, data, flow);
      }
      return stepId === 4 ? ['estimatedBudget'] : [];
    case 5:
      return ['confirmAccurate', 'consentContact'];
    default:
      return [];
  }
}

export function validateStep(stepId, data, serviceId = 'web-development') {
  const fields = getStepFields(stepId, data, serviceId);
  const errors = {};
  let firstInvalidField = null;

  for (const field of fields) {
    const error = validateField(field, data, serviceId);
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

export function validateAllSteps(data, serviceId = 'web-development') {
  const stepResults = {};
  let firstInvalidStep = null;

  for (let stepId = 1; stepId <= 5; stepId++) {
    const result = validateStep(stepId, data, serviceId);
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

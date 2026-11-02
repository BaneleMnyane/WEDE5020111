/* validation.js – shared validation and submission helpers for the B4NEXX forms */
(() => {
    'use strict';

    const NAME_RE = /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ' -]{1,49}$/;
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const PHONE_RE = /^(?:\+27|0)[\s-]?[1-9]\d[\s-]?\d{3}[\s-]?\d{4}$/;

    const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);

    const todayString = () => {
        const d = new Date();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${d.getFullYear()}-${month}-${day}`;
    };

    const errorElement = (field) => document.getElementById(`${field.id}-error`);

    const setError = (field, message) => {
        field.classList.add('invalid');
        field.setAttribute('aria-invalid', 'true');
        const el = errorElement(field);
        if (el) el.textContent = message;
        return false;
    };

    const clearError = (field) => {
        field.classList.remove('invalid');
        field.removeAttribute('aria-invalid');
        const el = errorElement(field);
        if (el) el.textContent = '';
        return true;
    };

    /* Validate one input, select or textarea. Returns true when valid. */
    const validateField = (field) => {
        const rule = field.getAttribute('data-validate');
        const label = field.getAttribute('data-label') || 'this field';

        if (field.type === 'checkbox') {
            return field.required && !field.checked
                ? setError(field, 'Please tick this box to continue.')
                : clearError(field);
        }

        const value = field.value.trim();

        if (!value) {
            if (!field.required) return clearError(field);
            const verb = rule === 'select' ? 'choose' : 'enter';
            return setError(field, `Please ${verb} ${label}.`);
        }

        switch (rule) {
            case 'name':
                if (!NAME_RE.test(value)) {
                    return setError(field, `${capitalise(label)} must be 2 to 50 characters and use only letters, spaces, hyphens or apostrophes.`);
                }
                break;
            case 'email':
                if (!EMAIL_RE.test(value)) {
                    return setError(field, 'Enter a valid email address, for example name@example.com.');
                }
                break;
            case 'phone':
                if (!PHONE_RE.test(value)) {
                    return setError(field, 'Enter a valid South African number, for example 082 123 4567 or +27 82 123 4567.');
                }
                break;
            case 'date':
                if (value < todayString()) {
                    return setError(field, 'Please choose today or a future date.');
                }
                break;
            case 'message': {
                const min = field.minLength > 0 ? field.minLength : 0;
                if (value.length < min) {
                    return setError(field, `Please write at least ${min} characters (you have ${value.length}).`);
                }
                break;
            }
            default:
                break;
        }
        return clearError(field);
    };

    /* Validate a radio group wrapped in <fieldset data-group>. */
    const validateGroup = (group) => {
        const chosen = group.querySelector('input[type="radio"]:checked');
        return chosen
            ? clearError(group)
            : setError(group, group.getAttribute('data-message') || 'Please choose an option.');
    };

    /* Validate every field in DOM order; report the first problem. */
    const validateForm = (form) => {
        let count = 0;
        let firstInvalid = null;

        form.querySelectorAll('[data-validate], [data-group]').forEach((item) => {
            const ok = item.hasAttribute('data-group') ? validateGroup(item) : validateField(item);
            if (!ok) {
                count += 1;
                if (!firstInvalid) {
                    firstInvalid = item.hasAttribute('data-group') ? item.querySelector('input') : item;
                }
            }
        });

        return { valid: count === 0, count, firstInvalid };
    };

    /* Immediate feedback while the visitor fills the form in. */
    const attachLiveValidation = (form) => {
        form.addEventListener('focusout', (event) => {
            if (event.target.matches('[data-validate]')) validateField(event.target);
        });

        form.addEventListener('input', (event) => {
            const field = event.target;
            if (field.matches('[data-validate]') && field.getAttribute('aria-invalid') === 'true') {
                validateField(field);
            }
        });

        form.addEventListener('change', (event) => {
            const field = event.target;
            if (field.matches('select[data-validate], input[type="checkbox"][data-validate]')) {
                validateField(field);
            }
            const group = field.closest('[data-group]');
            if (group) validateGroup(group);
        });
    };

    const initCounters = (form) => {
        form.querySelectorAll('[data-counter-for]').forEach((counter) => {
            const field = document.getElementById(counter.getAttribute('data-counter-for'));
            if (!field) return;
            const update = () => {
                counter.textContent = `${field.value.length} / ${field.maxLength}`;
            };
            field.addEventListener('input', update);
            form.addEventListener('reset', () => setTimeout(update, 0));
            update();
        });
    };

    const setMinDates = (form) => {
        form.querySelectorAll('input[type="date"]').forEach((input) => {
            input.min = todayString();
        });
    };

    const resetErrors = (form) => {
        form.querySelectorAll('[data-validate], [data-group]').forEach(clearError);
    };

    const collectData = (form) => {
        const data = {};
        new FormData(form).forEach((value, key) => {
            data[key] = typeof value === 'string' ? value.trim() : value;
        });
        delete data._gotcha;
        return data;
    };

    const isConfigured = () => {
        const endpoint = (window.SITE_CONFIG || {}).formspreeEndpoint;
        return Boolean(endpoint) && !/YOUR_FORM_ID/.test(endpoint);
    };

    /* Sends JSON to Formspree. Resolves { delivered: false } when no endpoint is configured. */
    const send = (payload) => {
        if (!isConfigured()) return Promise.resolve({ delivered: false });

        return fetch(window.SITE_CONFIG.formspreeEndpoint, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then((response) => {
            if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
            return { delivered: true };
        });
    };

    window.FormUtils = {
        validateField,
        validateGroup,
        validateForm,
        attachLiveValidation,
        initCounters,
        setMinDates,
        resetErrors,
        collectData,
        isConfigured,
        send
    };
})();

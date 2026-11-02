/* contact.js – validates the contact form and sends the message by email */
(() => {
    'use strict';

    const form = document.getElementById('contact-form');
    if (!form || !window.FormUtils) return;

    const config = window.SITE_CONFIG || {};
    const email = config.contactEmail || 'b4nexx619@gmail.com';
    const status = document.getElementById('contact-status');
    const submitButton = form.querySelector('button[type="submit"]');

    FormUtils.initCounters(form);
    FormUtils.attachLiveValidation(form);

    form.addEventListener('reset', () => {
        setTimeout(() => {
            FormUtils.resetErrors(form);
            status.hidden = true;
        }, 0);
    });

    const showStatus = (kind, text, withEmailLink) => {
        status.className = `form-status ${kind}`;
        status.textContent = '';

        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        if (withEmailLink) {
            const link = document.createElement('a');
            link.href = `mailto:${email}`;
            link.textContent = email;
            paragraph.append(' ', link, '.');
        }
        status.appendChild(paragraph);
        status.hidden = false;
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Spam trap: real visitors never fill this hidden field
        if (form.elements._gotcha && form.elements._gotcha.value) return;

        const result = FormUtils.validateForm(form);
        if (!result.valid) {
            showStatus('error-state', `Please fix the ${result.count} highlighted ${result.count === 1 ? 'field' : 'fields'} and try again.`);
            result.firstInvalid.focus();
            return;
        }

        const data = FormUtils.collectData(form);
        data.updates = data.updates || 'No';

        // No email service configured yet: open the visitor's email app instead
        if (!FormUtils.isConfigured()) {
            const body = `${data.message}\n\nFrom: ${data.name} (${data.email})`;
            window.location.href = `mailto:${email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
            showStatus('success', 'Your email app should now open with your message ready to send. If nothing happens, email', true);
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Sending…';
        showStatus('', 'Sending your message…');

       try {
    await FormUtils.send({ _subject: `Website contact: ${data.subject}`, ...data });
    form.reset();
    FormUtils.resetErrors(form);
    // Wait one tick so the reset handler's timeout runs first, otherwise it hides this message
    setTimeout(() => {
        showStatus('success', `Thank you, ${data.name}! Your message has been sent and a reply will go to ${data.email}.`);
    }, 0);
} catch (error) {
            showStatus('error-state', 'Sorry, your message could not be sent. Please try again or email', true);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
})();

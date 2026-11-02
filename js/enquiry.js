/* enquiry.js – validates the enquiry form, processes it and shows a tailored response */
(() => {
    'use strict';

    const form = document.getElementById('enquiry-form');
    if (!form || !window.FormUtils) return;

    const config = window.SITE_CONFIG || {};
    const errorSummary = document.getElementById('form-error-summary');
    const panel = document.getElementById('enquiry-response');
    const submitButton = form.querySelector('button[type="submit"]');
    const typeSelect = document.getElementById('enquiry-type');

    const TYPES = {
        booking: {
            label: 'Live performance booking',
            next: 'I will check availability for your date and reply with next steps. Have the venue, location, type of event and expected audience size ready.'
        },
        production: {
            label: 'Music production',
            next: 'I will review your idea and reply with a few questions and a rough plan. Sending a reference track or two will help me understand the sound you want.'
        },
        songwriting: {
            label: 'Songwriting',
            next: 'I will reply with questions about the story, tone and artist the song is for, then outline how we can work together.'
        },
        feature: {
            label: 'Song feature or collaboration',
            next: 'I will listen to your idea or demo and let you know whether it is a good fit. Include a link to the track if you have one.'
        },
        other: {
            label: 'Something else',
            next: 'I will read your message and point you in the right direction.'
        }
    };

    FormUtils.setMinDates(form);
    FormUtils.initCounters(form);
    FormUtils.attachLiveValidation(form);

    // Services page links preselect the enquiry type, e.g. enquiry.html?type=booking
    const requestedType = new URLSearchParams(window.location.search).get('type');
    if (requestedType && Object.prototype.hasOwnProperty.call(TYPES, requestedType)) {
        typeSelect.value = requestedType;
    }

    form.addEventListener('reset', () => {
        setTimeout(() => {
            FormUtils.resetErrors(form);
            errorSummary.hidden = true;
        }, 0);
    });

    const formatDate = (value) => {
        if (!value) return 'Not specified';
        return new Date(`${value}T00:00:00`).toLocaleDateString('en-ZA', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    const showResponse = (data, reference, delivered) => {
        const type = TYPES[data.enquiry_type];

        document.getElementById('resp-name').textContent = data.first_name;
        document.getElementById('resp-intro').textContent = delivered
            ? 'Your enquiry has been sent to B4NEXX. Here is a summary for your records.'
            : 'Thanks for your enquiry. Here is a summary of what you submitted.';
        document.getElementById('resp-next').textContent = type.next;

        const rows = [
            ['Reference', reference],
            ['Name', `${data.first_name} ${data.surname}`],
            ['Email', data.email],
            ['Phone', data.phone || 'Not provided'],
            ['Enquiry type', type.label],
            ['Preferred date', formatDate(data.preferred_date)],
            ['Reply by', data.contact_method],
            ['Message', data.message]
        ];

        const list = document.getElementById('resp-summary');
        list.textContent = '';
        rows.forEach(([term, detail]) => {
            const dt = document.createElement('dt');
            const dd = document.createElement('dd');
            dt.textContent = term;
            dd.textContent = detail;
            list.append(dt, dd);
        });

        form.hidden = true;
        panel.hidden = false;
        panel.focus();
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Spam trap: real visitors never fill this hidden field
        if (form.elements._gotcha && form.elements._gotcha.value) return;

        const result = FormUtils.validateForm(form);
        if (!result.valid) {
            errorSummary.textContent = `Please fix the ${result.count} highlighted ${result.count === 1 ? 'field' : 'fields'} and try again.`;
            errorSummary.hidden = false;
            result.firstInvalid.focus();
            return;
        }
        errorSummary.hidden = true;

        const data = FormUtils.collectData(form);
        const reference = `ENQ-${Date.now().toString(36).toUpperCase().slice(-6)}`;

        submitButton.disabled = true;
        submitButton.textContent = 'Sending…';

        try {
            const outcome = await FormUtils.send({
                _subject: `New enquiry (${reference}): ${TYPES[data.enquiry_type].label}`,
                reference,
                ...data
            });
            showResponse(data, reference, outcome.delivered);
        } catch (error) {
            errorSummary.textContent = `Sorry, your enquiry could not be sent. Please check your connection and try again, or email ${config.contactEmail || 'B4NEXX'} directly.`;
            errorSummary.hidden = false;
            errorSummary.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Enquiry';
        }
    });

    document.getElementById('new-enquiry').addEventListener('click', () => {
        form.reset();
        FormUtils.resetErrors(form);
        panel.hidden = true;
        form.hidden = false;
        form.querySelector('input').focus();
    });
})();

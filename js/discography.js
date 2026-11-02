/* discography.js – live search, sorting and an accessible image lightbox */
(() => {
    'use strict';

    const grid = document.getElementById('release-grid');
    if (!grid) return;

    /* ---------------- Search and sort ---------------- */
    const cards = Array.from(grid.querySelectorAll('.release-card'));
    const searchInput = document.getElementById('search');
    const sortSelect = document.getElementById('sort');
    const clearButton = document.getElementById('clear-search');
    const countText = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');

    const applyFilters = () => {
        const query = searchInput.value.trim().toLowerCase();
        let shown = 0;

        cards.forEach((card) => {
            const haystack = `${card.dataset.title} ${card.dataset.keywords || ''}`.toLowerCase();
            const match = !query || haystack.includes(query);
            card.hidden = !match;
            if (match) shown += 1;
        });

        const noun = cards.length === 1 ? 'release' : 'releases';
        countText.textContent = shown === cards.length
            ? `Showing all ${cards.length} ${noun}`
            : `Showing ${shown} of ${cards.length} ${noun}`;
        noResults.hidden = shown !== 0;
    };

    const applySort = () => {
        const ordered = cards.slice();
        if (sortSelect.value === 'az') {
            ordered.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
        } else if (sortSelect.value === 'za') {
            ordered.sort((a, b) => b.dataset.title.localeCompare(a.dataset.title));
        }
        ordered.forEach((card) => grid.appendChild(card));
    };

    searchInput.addEventListener('input', applyFilters);
    sortSelect.addEventListener('change', applySort);
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        sortSelect.value = 'default';
        applySort();
        applyFilters();
        searchInput.focus();
    });
    applyFilters();

    /* ---------------- Lightbox ---------------- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    let items = [];
    let current = 0;
    let lastFocused = null;

    const show = (index) => {
        current = (index + items.length) % items.length;
        const trigger = items[current];
        const thumb = trigger.querySelector('img');
        lightboxImg.src = trigger.dataset.full || thumb.currentSrc || thumb.src;
        lightboxImg.alt = thumb.alt;
        lightboxCaption.textContent = `${trigger.dataset.caption || thumb.alt} (${current + 1} of ${items.length})`;
    };

    const openLightbox = (trigger) => {
        items = Array.from(grid.querySelectorAll('.release-card:not([hidden]) .cover-button'));
        if (!items.length) return;
        lastFocused = trigger;
        const single = items.length < 2;
        prevBtn.hidden = single;
        nextBtn.hidden = single;
        show(Math.max(items.indexOf(trigger), 0));
        lightbox.hidden = false;
        document.body.classList.add('lightbox-open');
        closeBtn.focus();
    };

    const closeLightbox = () => {
        lightbox.hidden = true;
        document.body.classList.remove('lightbox-open');
        if (lastFocused) lastFocused.focus();
    };

    grid.addEventListener('click', (event) => {
        const trigger = event.target.closest('.cover-button');
        if (trigger) openLightbox(trigger);
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => show(current - 1));
    nextBtn.addEventListener('click', () => show(current + 1));

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
        if (lightbox.hidden) return;

        if (event.key === 'Escape') {
            closeLightbox();
        } else if (event.key === 'ArrowLeft' && items.length > 1) {
            show(current - 1);
        } else if (event.key === 'ArrowRight' && items.length > 1) {
            show(current + 1);
        } else if (event.key === 'Tab') {
            // Keep keyboard focus inside the open lightbox
            const focusable = [closeBtn, prevBtn, nextBtn].filter((btn) => !btn.hidden);
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
    });

    // Swipe left/right on touch screens
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener('touchend', (event) => {
        const distance = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(distance) > 50 && items.length > 1) {
            show(distance > 0 ? current - 1 : current + 1);
        }
    }, { passive: true });
})();

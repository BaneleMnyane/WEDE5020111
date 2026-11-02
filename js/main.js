/* main.js – responsive menu toggle and dynamic footer year (all pages) */
(() => {
    'use strict';

    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('nav-menu');

    if (toggle && menu) {
        const setOpen = (open) => {
            menu.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.textContent = open ? '✕ Close' : '☰ Menu';
        };

        toggle.addEventListener('click', () => {
            setOpen(!menu.classList.contains('open'));
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('open')) {
                setOpen(false);
                toggle.focus();
            }
        });
    }

    const year = document.getElementById('year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }
})();

(() => {
    'use strict';

    const container = document.getElementById('map');
    if (!container) return;

    const DEFAULTS = { lat: -29.7873, lng: 31.0101, zoom: 15, label: '57 Colombia Road, Kenville, Greenwood Park, Durban' };
    const settings = Object.assign({}, DEFAULTS, (window.SITE_CONFIG || {}).map || {});
    const coordsOk = Number.isFinite(Number(settings.lat)) && Number.isFinite(Number(settings.lng));
    const lat = coordsOk ? Number(settings.lat) : DEFAULTS.lat;
    const lng = coordsOk ? Number(settings.lng) : DEFAULTS.lng;
    const zoom = Number(settings.zoom) || DEFAULTS.zoom;
    const label = settings.label || DEFAULTS.label;

    const mapLink = document.getElementById('map-link');
    if (mapLink) {
        mapLink.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    }
    const resetButton = document.getElementById('map-reset');

    let map = null;
    let marker = null;
    let embed = null;
    let tilesLoaded = 0;

    /* Fallback: a plain Google Maps embed (still zoomable and draggable) */
    const showEmbed = (reason) => {
        if (embed) return;
        console.warn(`B4NEXX map: showing the Google Maps fallback (${reason}).`);
        if (map) {
            try { map.remove(); } catch (error) { /* ignore */ }
            map = null;
            marker = null;
        }
        container.textContent = '';
        container.className = 'map-box';
        container.removeAttribute('tabindex');
        embed = document.createElement('iframe');
        embed.title = 'Map showing the B4NEXX location';
        embed.src = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
        embed.referrerPolicy = 'no-referrer-when-downgrade';
        embed.setAttribute('allowfullscreen', '');
        container.appendChild(embed);
    };

    const startLeaflet = () => {
        map = L.map(container, { scrollWheelZoom: false }).setView([lat, lng], zoom);

        // Esri street tiles. They work from a local folder (file://) as well as a live site.
        // The "dark-tiles" class applies the dark filter from style.css.
        const tiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 19,
            className: 'dark-tiles',
            attribution: 'Tiles &copy; Esri'
        }).addTo(map);

        // If no tile ever loads (blocked, offline), switch to the fallback
        tiles.on('tileload', () => { tilesLoaded += 1; });
        const checkTiles = () => {
            if (!embed && tilesLoaded === 0) showEmbed('map tiles did not load');
        };
        tiles.on('load', () => setTimeout(checkTiles, 400));
        setTimeout(checkTiles, 8000);

        // Popup content built with DOM methods, no HTML strings
        const popup = document.createElement('div');
        const heading = document.createElement('h3');
        const text = document.createElement('p');
        const directions = document.createElement('a');

        heading.textContent = 'B4NEXX';
        text.textContent = label;
        directions.textContent = 'Get directions';
        directions.href = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        directions.target = '_blank';
        directions.rel = 'noopener noreferrer';
        popup.append(heading, text, directions);

        marker = L.marker([lat, lng], { title: label, alt: label }).addTo(map);
        marker.bindPopup(popup).openPopup();

        // Scroll-wheel zoom only after the visitor clicks the map, so page scrolling is not trapped
        map.on('click', () => map.scrollWheelZoom.enable());
        map.on('mouseout', () => map.scrollWheelZoom.disable());
    };

    if (typeof L === 'undefined') {
        showEmbed('Leaflet did not load');
    } else {
        try {
            startLeaflet();
        } catch (error) {
            console.error(error);
            showEmbed('Leaflet reported an error');
        }
    }

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            if (embed) {
                embed.src = embed.src;
            } else if (map) {
                map.setView([lat, lng], zoom);
                if (marker) marker.openPopup();
            }
        });
    }
})();
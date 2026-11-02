/* config.js – the only settings you need to edit before deploying */
window.SITE_CONFIG = {
    // 1. Create a free form at https://formspree.io (send to b4nexx619@gmail.com),
    //    then replace YOUR_FORM_ID below with the ID Formspree gives you.
    //    Until then the contact form falls back to opening the visitor's email app.
    formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',

    contactEmail: 'b4nexx619@gmail.com',

    // 2. Map location (currently Johannesburg as a placeholder – change to your
    //    real base, e.g. copy the latitude/longitude from Google Maps).
    map: {
    lat: -29.7873,
    lng: 31.0101,
    zoom: 15,
    label: '57 Colombia Road, Kenville, Greenwood Park, Durban'
}
};

# B4NEXX Website

Official artist website for **B4NEXX**, an independent Hip-Hop and R&B artist and producer from South Africa. Built as the Part 3 portfolio of evidence (POE) for the Web Development module.

- **Live site:** https://YOUR-USERNAME.github.io/YOUR-REPO/
- **Repository:** https://github.com/YOUR-USERNAME/YOUR-REPO
- **Student:** [Your full name], ST10534010

## Purpose

The site presents B4NEXX's music, services and contact details in one place, and lets visitors search the discography, send an enquiry, contact the artist by email and find the artist on a map.

## Pages

| Page | File | What it does |
|---|---|---|
| Home | `index.html` | Cinematic poster hero (name behind, photo in front), welcome message and links into the site |
| Discography | `discography.html` | Release cards, live search, sorting, cover-art lightbox, Spotify links |
| Services | `services.html` | Four service cards that link into the enquiry form |
| Contact | `contacts.html` | Direct email, Instagram, validated contact form and interactive map |
| About | `about.html` | Artist story and sound |
| Enquiry | `enquiry.html` | Validated enquiry form with an instant summary and next-steps response |

## Features

- **Cinematic home hero:** the B4NEXX name sits behind a transparent cut-out of the artist, with film grain, a vignette and a warm grade, built in pure CSS. It stays real text for SEO and accessibility.
- **Responsive layout** with CSS media queries and a menu toggle on small screens.
- **Interactive elements:** menu toggle, live search and sort, lightbox, map, form feedback.
- **Gallery lightbox:** cover art opens in a full-screen viewer with next/previous buttons, keyboard arrows, Escape to close, swipe on touch screens and a focus trap.
- **Dynamic content and search:** the discography filters as you type and updates the result count.
- **Interactive map:** Leaflet and OpenStreetMap with a marker, popup, directions link and reset button.
- **Enquiry form:** text, email, phone, dropdown, date, radio, textarea and checkbox controls with field-by-field validation and a tailored confirmation.
- **Contact form:** validated, with a message counter, and sends email through Formspree.
- **SEO:** unique title, meta description and meta keywords on every page, descriptive image file names and alt text, schema.org JSON-LD on the home page, `sitemap.xml` and `robots.txt`.
- **Accessibility:** skip link, labelled form controls, `aria-live` messages, keyboard-friendly lightbox and visible focus styles.

## Technologies

HTML5, CSS3 (Grid, Flexbox, media queries, layered positioning, blend modes, masks), vanilla JavaScript (ES6), [Leaflet](https://leafletjs.com) 1.9.4, OpenStreetMap tiles, Formspree, Git and GitHub, GitHub Pages.

## Folder structure

```
.
├── index.html
├── discography.html
├── services.html
├── contacts.html
├── about.html
├── enquiry.html
├── sitemap.xml
├── robots.txt
├── README.md
├── CHANGELOG.md
├── css/
│   └── style.css
├── fonts/
│   └── montserrat-900.woff2   self-hosted Montserrat Black (SIL OFL licence included)
├── js/
│   ├── config.js        site settings (form endpoint, map location)
│   ├── main.js          menu toggle and footer year
│   ├── validation.js    shared form validation and sending
│   ├── enquiry.js       enquiry form logic and response
│   ├── contact.js       contact form logic
│   ├── discography.js   search, sort and lightbox
│   └── map.js           Leaflet map
└── images/
```

## Run locally

1. Clone or download the repository.
2. Put your images in `images/` using the file names listed in `images/README.txt`.
3. Open `index.html` in a browser, or serve the folder with a local server such as the VS Code Live Server extension.

No build step or dependencies are needed. Leaflet loads from a CDN.

## Configuration

Edit `js/config.js`:

1. **Contact email delivery:** create a free form at [Formspree](https://formspree.io) that sends to the artist email address and replace `YOUR_FORM_ID` in `formspreeEndpoint`. Until this is set, the contact form opens the visitor's email app instead, and the enquiry form shows its summary without emailing anyone.
2. **Map location:** change `lat`, `lng` and `label` to the real location.

## Deployment (GitHub Pages)

1. Push the project to a GitHub repository (the home page must be `index.html` in the root).
2. In the repository go to **Settings → Pages**.
3. Under **Build and deployment** choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. After a minute the site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.
5. Replace `YOUR-USERNAME` and `YOUR-REPO` in this README, `sitemap.xml` and `robots.txt` with the real address.

Note: search engines only read `robots.txt` from the root of a domain. On a GitHub project page (`/YOUR-REPO/`) the file is still deployed, but for full effect use a user site (`YOUR-USERNAME.github.io`) or a custom domain.

## Changing the hero photo

Replace `images/b4nexx-hero-cutout.png` with a PNG of the artist on a transparent background (about 470 x 576 px or larger, head near the top). The name behind it is the `<h1 class="poster-title">` in `index.html`. Adjust `.poster-person` in `css/style.css` (`height`, `top`, `left`) to move or resize the photo.

## Adding a new release

Copy one `<li class="release-card">` block in `discography.html`, then change:

- `data-title` and `data-keywords` (these power the search)
- the image `src`, descriptive file name and `alt` text
- the `data-caption` and `aria-label`
- the `<h3>` title and the Spotify link

The search, sort and lightbox pick it up automatically.

## Testing checklist

- [ ] All six pages load with no console errors.
- [ ] Every nav link and image works on the deployed site (file names are lowercase).
- [ ] Both forms show an error for each empty or invalid field.
- [ ] Enquiry form shows the summary after a valid submit.
- [ ] Contact form sends an email (Formspree configured).
- [ ] Lightbox opens, moves between images and closes with Escape.
- [ ] Search filters the discography and shows "no results" correctly.
- [ ] Map loads, marker popup opens, reset button works.
- [ ] Layout works at phone, tablet and desktop widths.

## Known limitations

- Enquiries are only delivered by email once Formspree is configured.
- The map location is a placeholder until `config.js` is updated.
- Design polish is planned for a later iteration.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full record of development.

## References

Agafonkin, V. (2023) *Leaflet: an open-source JavaScript library for interactive maps*, version 1.9.4. Available at: https://leafletjs.com (Accessed: 29 October 2026).

Anthropic (2026) *Claude Sonnet 5.5* [Large language model]. Available at: https://claude.ai (Accessed: 29 October 2026). Used for code review, debugging and generating starter code for the forms, lightbox, search, map and documentation, which I then reviewed, tested and edited.

Formspree (2026) *Formspree: form backend for developers*. Available at: https://formspree.io (Accessed: 29 October 2026).

Google (2026) *Introduction to robots.txt*. Available at: https://developers.google.com/search/docs/crawling-indexing/robots/intro (Accessed: 29 October 2026).

Mozilla Developer Network (2026) *Client-side form validation*. Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation (Accessed: 29 October 2026).

OpenStreetMap contributors (2026) *OpenStreetMap*. Available at: https://www.openstreetmap.org/copyright (Accessed: 29 October 2026).

Sitemaps.org (2008) *Sitemaps XML format*. Available at: https://www.sitemaps.org/protocol.html (Accessed: 29 October 2026).

W3C (2026) *Dialog (modal) pattern, ARIA Authoring Practices Guide*. Available at: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ (Accessed: 29 October 2026).

Montserrat typeface: Julieta Ulanovsky et al. (2011) *Montserrat*, SIL Open Font License 1.1. Available at: https://github.com/JulietaUla/Montserrat (Accessed: 29 October 2026).

Images: B4NEXX cover art, Quantum Syndicate logo and the hero photograph are the artist's own work.

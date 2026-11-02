# Changelog

All notable changes to the B4NEXX website are recorded here, newest first. Versions match the POE parts.

## [3.0.0] - 2026-10-29 - POE Part 3

### Added
- **Enquiry form** (`enquiry.html`, `js/enquiry.js`): first name, surname, email, phone, enquiry type, preferred date, reply method, message and consent controls, each with its own validation and error message.
- **Enquiry response:** on a valid submit the visitor sees a summary with a reference number and a "what happens next" message that depends on the enquiry type.
- **Contact form** (`contacts.html`, `js/contact.js`): validated name, email, subject and message fields, a character counter, a spam-trap field and email sending through Formspree, with a mailto fallback.
- **Shared validation** (`js/validation.js`): one set of rules for names, South African phone numbers, email addresses, dates, message length, selects, radios and checkboxes, with immediate feedback while typing.
- **Discography search and sort** (`js/discography.js`): live filter by title and keywords, A to Z and Z to A sorting, result count and a "no results" message.
- **Gallery lightbox:** cover art opens in a modal viewer with next/previous buttons, keyboard arrows, Escape to close, touch swipe, focus trap and focus return.
- **Interactive map** (`js/map.js`): Leaflet and OpenStreetMap map with a marker, popup, directions link and a reset button.
- **Cinematic home hero** (`index.html`, `css/style.css`): the B4NEXX name is layered behind a transparent cut-out photo of the artist, with a warm colour grade, film grain, vignette and a bottom fade for the buttons. Uses a self-hosted Montserrat Black font (`fonts/`), so no third-party font request is needed.
- **Responsive menu toggle** (`js/main.js`) for small screens, plus a skip link and a dynamic footer year.
- **SEO:** unique `<title>`, meta description and meta keywords on all six pages, schema.org JSON-LD on the home page, `sitemap.xml` and `robots.txt`.
- **Service links:** each service card links to the enquiry form with the matching enquiry type preselected.
- `README.md` with purpose, features, setup, deployment steps and references, and this changelog.

### Changed
- Replaced the old two-column home hero and its unused styles with the poster hero.
- Renamed all files to lowercase with hyphens (`B4nexx website.html` became `index.html`, `Contacts.html` became `contacts.html`) so the site works on case-sensitive hosts and GitHub Pages.
- Replaced every absolute `C:\Users\...` link and image path with a relative path.
- Moved the stylesheet to `css/style.css`, removed unused `.project-container` and `.project-card` rules, an empty media query and a duplicate `.eyebrow` rule, and added styles for forms, lightbox, map and the menu toggle.
- Images renamed to descriptive, SEO-friendly names and given meaningful alt text.
- The home page logo is now a paragraph so each page has exactly one `<h1>`.
- Footer added to every page for consistency.

### Fixed
- Discography page: corrected the `ctype html` typo, added the missing `<head>`, title and meta tags, moved the stylesheet and navigation to the correct place, closed all tags, removed the stray `width="200px"` text and put each cover image inside its Spotify link.
- Enquiry page: removed the duplicate `<body>`, added the missing `<html>` tag, fixed the broken `<form>` tag, closed the form and corrected the page title, description and active nav link.
- Home page: removed leftover unclosed Shopify code and moved the stylesheet link into `<head>`.
- Services page: wrapped navigation links correctly and fixed the "Book a Service" link that pointed to a file that did not exist.
- Email field now uses `type="email"`.

### Feedback from Part 2 addressed
| Feedback received in Part 2 | What I changed | Where |
|---|---|---|
| [Paste feedback point 1 here] | [What you changed] | [File or page] |
| [Paste feedback point 2 here] | [What you changed] | [File or page] |
| [Paste feedback point 3 here] | [What you changed] | [File or page] |

## [2.0.0] - [add date] - POE Part 2
- [Describe what you added or changed in Part 2]

## [1.0.0] - [add date] - POE Part 1
- Initial site structure: home, discography, services, contacts and about pages.
- [Add anything else from Part 1]

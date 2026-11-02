#!/usr/bin/env bash
# Creates a clean, descriptive commit history for the initial import.
# Run once from the project folder in Git Bash:   bash commit-plan.sh
# After that, keep committing small changes as you work (design tweaks, fixes, new releases).
set -e

git init -b main
git config user.name >/dev/null 2>&1 || { echo "Set your name first:  git config user.name \"Your Name\""; exit 1; }
git config user.email >/dev/null 2>&1 || { echo "Set your email first: git config user.email \"you@example.com\""; exit 1; }

commit() {
    local message="$1"; shift
    git add "$@"
    git commit -m "$message"
}

commit "Add project structure, README and changelog" README.md CHANGELOG.md images/README.txt
commit "Add global stylesheet with responsive layout, forms, lightbox and map styles" css/style.css
commit "Add home page with cinematic poster hero, SEO title, description, keywords and JSON-LD" index.html images/b4nexx-hero-cutout.png fonts/
commit "Add About page with metadata and call-to-action" about.html
commit "Add Services page with service cards linked to the enquiry form" services.html
commit "Add Discography page with release cards, alt text and Spotify links" discography.html
commit "Add responsive menu toggle and dynamic footer year" js/main.js
commit "Add discography live search, sorting and accessible image lightbox" js/discography.js
commit "Add shared form validation helpers and site configuration" js/validation.js js/config.js
commit "Add Enquiry page with validated form and tailored confirmation summary" enquiry.html js/enquiry.js
commit "Add Contact page with validated message form and Formspree email sending" contacts.html js/contact.js
commit "Add interactive Leaflet map with marker, popup and reset control" js/map.js
commit "Add sitemap.xml and robots.txt for search engines" sitemap.xml robots.txt

echo
echo "Done. Next:"
echo "  git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git"
echo "  git push -u origin main"

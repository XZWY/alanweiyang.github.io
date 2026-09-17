# Zhongweiyang (Alan) Xu — Personal website

A responsive academic portfolio for audio and generative AI research, built with
HTML, CSS and JavaScript. No npm, Ruby, Jekyll, API keys or paid hosting required.

## Preview

From this repository, run `python3 -m http.server 8000 --bind 127.0.0.1`, then open
http://127.0.0.1:8000/. You can also open `index.html` directly.

## GitHub Pages deployment

Repository: https://github.com/XZWY/alanweiyang.github.io

Live address: https://xzwy.github.io/alanweiyang.github.io/

**Recommended — GitHub Actions:**

1. Set repository **Settings → Pages → Build and deployment → Source → GitHub Actions**.
2. Commit and push the changes to `master`.
3. The included `Deploy personal website` workflow validates links, packages public
   files, and deploys the artifact. You can also run it manually in the Actions tab.

If the default branch changes, update `.github/workflows/pages.yml` accordingly.

**Alternative — existing branch deployment:** Keep **Deploy from a branch** with
**master / (root)**. Remove the optional `.github/workflows/pages.yml` before pushing
so that both deployment methods do not run. The included `.nojekyll` bypasses the
old Jekyll build; GitHub serves the new `index.html` directly.

Official reference: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Editing

- `index.html`: biography, research, publications, experience, education and contact.
- `assets/site/style.css`: typography, colors, responsive layout and reduced motion.
- `assets/site/main.js`: topic filters, search, mobile menu and active navigation.
- `assets/site/profile.png`: original portrait supplied for this redesign.
- `cv2026.pdf`: supplied CV served by all new CV links.

To add a paper, copy an `<article class="publication">` in `index.html`. Set
`data-topics` to one or more space-separated values: `speech diffusion spatial
understanding music`. Update the initial HTML publication count; JavaScript
computes filtered counts automatically. Search combines every query term with
the selected topic and matches title, authors, year and venue.

All content is readable without JavaScript. The site uses system fonts, local
assets, and no analytics, cookies, third-party scripts or backend.

## Validate and package

Run `python3 scripts/build.py` (Python 3.9+). The generated `_site/` is ready for
any static host. Validation covers local links, anchors, unique IDs, image alt
text and GitHub Pages project-path compatibility.

The original AcademicPages source is retained for reference and rollback; the
new site does not use it. The Actions artifact excludes that source. Existing
`/about/`, `/about.html`, `/publications/` and `/cv/` links redirect to new content.
Existing `files/`, `images/`, `cv2024.pdf` and `weiyang-cv.pdf` remain available.

## Content sources and verification

Professional history and publication status follow the supplied `cv2026.pdf`.
The Hunyuan audio-understanding and voice-conversation focus was updated from
the owner’s explicit clarification.
Social links and existing paper/demo/code URLs come from the previous website.
New paper links point to arXiv and OpenReview. Education says “MS/PhD studies”
because the supplied CV does not explicitly assert the degree award.

Includes semantic landmarks, a skip link, visible keyboard focus, labeled search,
announced result counts, Escape support for the mobile menu and reduced motion.
Browser visual QA remains pending because computer-use permission was unavailable;
check desktop and mobile widths before publishing.

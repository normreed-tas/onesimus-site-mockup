# Onesimus Foundation — Website Design Mockup

This is a clickable, static HTML mockup of the proposed Onesimus Foundation
website — eleven pages, fully linked, for stakeholder review. It is a design
concept only: no real forms, payments, or CMS are wired up.

## Pages included
- `index.html` — Home
- `about.html` — About Us
- `collaboration.html` — Collaboration
- `training.html` — Resourcing & Training
- `family-community.html` — Family & Community
- `research.html` — Research
- `youth-justice.html` — Youth Justice (under For Professionals)
- `survey.html` — Understanding Our Prisons survey (pre-launch)
- `events.html` — Events
- `donate.html` — Donate
- `contact.html` — Contact

## What's real vs placeholder
- All internal navigation between these nine pages is fully wired and
  clickable.
- Content is drawn from real source material (board bios, program
  descriptions, historical records) gathered during the design process —
  but several items are explicitly flagged in the copy as still needing
  confirmation (e.g. some partner links, bank transfer details).
- A few links remain as `#` placeholders because they'd point to something
  outside a static mockup: the Strategic Directions PDF download, the
  Donate payment button, event registration, and the "fully booked"
  training state.
- This is **not** the final Wix build — it's a design reference for the
  next stage of development and stakeholder discussion.

## Deploying to GitHub Pages

1. Create a new GitHub repository (public, or private if your GitHub plan
   supports Pages on private repos).
2. Upload all files in this folder to the repository root (or push via
   `git add . && git commit -m "Add site mockup" && git push`).
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch",
   choose the `main` branch and `/ (root)` folder, then **Save**.
5. GitHub will publish the site at
   `https://<your-username>.github.io/<repository-name>/` within a minute
   or two.
6. Share that link with stakeholders. `index.html` loads automatically as
   the homepage.

No build step, dependencies, or server is required — these are plain HTML
files with fonts loaded from Google Fonts over a CDN.

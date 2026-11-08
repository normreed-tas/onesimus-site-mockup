# Onesimus Foundation — Website Design Mockup

This is a clickable, static HTML mockup of the proposed Onesimus Foundation
website — eighteen pages, fully linked, for stakeholder review. It is a design
concept only: no real forms, payments, or CMS are wired up.

## Pages included
- `index.html` — Home
- `about.html` — About Us
- `collaboration.html` — Collaboration
- `practitioners-guide.html` — The Onesimus Practitioner's Guide (under For Professionals)
- `phone-guides.html` — Phone Guides: the phone apps Onesimus builds and hosts (Getting Out, Stay Connected), with QR codes, and an offer to other organisations (under For Professionals)
- `training.html` — Resourcing & Training
- `family-community.html` — Family & Community (under For Families)
- `family-resources.html` — Resources for Families (under For Families)
- `family-journey.html` — "Someone you love has gone to prison": a step-by-step guide for families, written for a reading age of about 12. A deliberately simple page with no site menu, reached from Resources for Families
- `research.html` — Research
- `justice-figures.html` — Tasmanian justice figures, adults (data explorer; linked from Research)
- `youth-justice.html` — Youth Justice (under For Professionals), including the youth figures explorer. Both explorers share `justice-figures-data.js` and link to each other for adult/youth comparisons
- `figures-register.html` — Sources and checks: the source record for every figure and what the evidence labels mean (linked from both figures pages)
- `key-documents.html` — Key documents (links to official sources; linked from Research)
- `survey.html` — Understanding Our Prisons survey (pre-launch)
- `events.html` — Events
- `donate.html` — Donate
- `contact.html` — Contact

## Justice figures (data explorer)

Three pages share two script files:

- `justice-figures-data.js` — the 37 questions and answers (figures, charts, caveats, comparisons) and the explorer logic. Adult questions show on `justice-figures.html`; questions marked `age:'youth'` show in the figures section of `youth-justice.html`. Each page says which half it shows with `data-age` on `#figures`. Adult/youth comparison buttons link across pages to `#fig-<id>`.
- `justice-figures-records.js` — `LV`, the evidence label for every statement (Official figure, Official note, Interpretation, Our question), and `REC`, the source record for every figure (publication, tables, who, period, footnotes, comparability, date checked). Loaded before the data file. If an answer's main paragraph is reworded, its `LV` letters must still match its sentence count.
- `figures-register.html` builds its table from both files.

When either script changes, bump the `?v=` on the script tags in all three pages, or returning visitors may see a stale copy.

**Annual update.** Each source is replaced once a year: ROGS (Productivity Commission) each January; ABS *Prisoners in Australia* each December; ABS *Recorded Crime – Offenders* each March; AIHW *Youth justice in Australia* mid-year. Update the figures, re-check each answer's caveats, and update the source records' "Last checked" date. All figures were last checked against the source tables on 6 November 2026.

## What's real vs placeholder
- All internal navigation between these eighteen pages is fully wired and
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

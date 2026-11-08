# Moving the mockup to Wix — brief for the builder

Prepared 6 November 2026. This mockup is the content and design reference for the new Onesimus Foundation website. It is not the final build. Live preview: https://normreed-tas.github.io/onesimus-site-mockup/

## How the build is being done

These decisions are already made (see Norm's rebuild brief):

- **A clean new site** on Wix Premium Core. The existing site is not edited or copied.
- **Built on the free wixsite.com address first.** At go-live, the Core plan and the onesimus.org.au domain move to the new site. The old site stays dormant as an archive.
- **Nothing is published without Norm's approval.**

## Pages

| Mockup page | Purpose | Wix notes |
|---|---|---|
| `index.html` | Home, with a two-audience entry (families / professionals) | Standard page |
| `about.html` | Story, Board, Churchill Fellowship background | Strategic Directions PDF link is a placeholder |
| `family-community.html` | Support for families, track record, "What the numbers say" | Keep the three figures, their sources and the "What isn't known" panel as written |
| `family-resources.html` | Resources for Families landing page | Contains mockup notes for Norm — remove before going public |
| `family-journey.html` | Step-by-step guide for families, arrest to community support | Deliberately simple: no site menu, "Bigger text" and "Help now" buttons, readable at about age 12. Operational detail links to Tasmania Prison Service pages rather than copying them. Purple chips mark items still to confirm with TPS. Contains a mockup note — remove before going public |
| `collaboration.html` | Networks and partners | Several partner links still to be confirmed |
| `phone-guides.html` | Phone Guides: Getting Out and Stay Connected, with QR codes, and an offer to other organisations | The apps themselves stay on GitHub Pages (normreed-tas.github.io/getting-out/ and /stay-connected/); the QR codes point there, so those addresses must not change |
| `practitioners-guide.html` | The Onesimus Practitioner's Guide: provenance, four practice chapters, tools, archived 2018 PDF, training | Contains a mockup note — remove before going public |
| `training.html` | Resourcing and training | "Bookings open soon" buttons are placeholders |
| `youth-justice.html` | Youth justice resources and the youth figures section | See *Justice figures* below |
| `research.html` | Research shelf | Links to Key Documents and Justice Figures |
| `justice-figures.html` | Adult justice figures explorer | See *Justice figures* below |
| `figures-register.html` | Sources and checks for every figure | See *Justice figures* below |
| `key-documents.html` | Links to official documents | Links only; re-check every few months |
| `survey.html` | Understanding Our Prisons survey | Pre-launch; no survey link yet |
| `events.html` | Events | Wix Events (RSVP or ticketing still to be decided) |
| `donate.html` | Donate | Platform still to be decided; bank details are a placeholder |
| `contact.html` | Contact | Wix form |

**Menu:** About Us | For Families (Family & Community, Resources for Families) | For Professionals (Collaboration, Practitioner's Guide, Phone Guides, Resourcing & Training, Youth Justice) | Research | The Survey | Events | Donate. Key Documents and the figures pages are reached from Research, not from the menu. Below 1024px wide, the menu collapses behind a "Menu" button.

## Placeholders to wire up in Wix

Each of these is `href="#"` in the mockup:

- Donate button and bank transfer details (`donate.html`)
- Event registration, "Register interest" (`events.html`)
- "Bookings open soon" training buttons (`training.html`)
- Strategic Directions document (`about.html`)
- Survey link (`survey.html`), once the survey is approved to open

## Before going public

- Every mockup page is marked as a draft by `draft.css` (a faint diagonal "DRAFT" watermark and a corner label). It is linked by one line per page, so do not carry it over to the Wix build.
- Remove the mockup notes addressed to Norm on `family-journey.html`, `family-resources.html` and `practitioners-guide.html`.
- Resolve the purple "to confirm" chips on `family-journey.html` with the Tasmania Prison Service.

## Files to carry over

- `Ten_Ways_Handout_v3.pdf`, the one-page handout on the Youth Justice page. This is Onesimus-made, so it is hosted.
- Everything else from third parties is **linked, not hosted**, so it stays complete and current. Keep it that way.

## Justice figures

This is the one part of the mockup that is more than pages. It is a small application, and its trustworthiness depends on features that are easy to lose in a rebuild.

**What it is:**

- **37 questions**, each answered from official sources: the Productivity Commission's Report on Government Services (ROGS), the ABS and the AIHW.
  - 20 adult questions on `justice-figures.html`.
  - 17 youth questions in a section of `youth-justice.html`.
- **Each answer has:**
  - the figure, with charts;
  - "What this number counts";
  - "Read it carefully" caveats;
  - a comparison with a related figure, sometimes on the other page;
  - an **evidence label on every statement**: Official figure, Official note, Interpretation or Our question;
  - a fold-out **source record**: publication, tables, who is counted, period, footnotes relied on, whether ROGS rates it comparable between states, and the date last checked.
- **`figures-register.html`** lists every source record and explains the labels.

**Files:**

- `justice-figures-data.js` holds the questions, answers and page logic.
- `justice-figures-records.js` holds the labels and source records.
- See `README.md` for how they fit together.

**Must survive the move:**

- The evidence labels and source records.
- The comparability warnings and caveats.
- The register page.
- The links between adult and youth answers.
- The "last checked" date.
- Mobile layout. All pages have been tested at 375px wide.

**Options:**

1. **Embed as it is (recommended for launch).** Keep the three figures pages hosted where they are, or on a subdomain, and embed or link them from the Wix Research and Youth Justice pages. This is quickest and keeps everything verified intact. Embedding works through a Wix "Embed a site" or HTML iframe element. The trade-off is that the figures sit outside the Wix editor.
2. **Rebuild with Wix CMS.** Put the questions and source records in Wix CMS collections, with Velo code for the explorer. This is the most work, but it would let a non-coder update the figures each year from the Wix dashboard.

Whichever is chosen, **someone must own the annual update:**

| Source | Updated each |
|---|---|
| ROGS (Productivity Commission) | January |
| ABS *Prisoners in Australia* | December |
| ABS *Recorded Crime – Offenders* | March |
| AIHW *Youth justice in Australia* | Mid-year |

A figures page that goes out of date does more harm than having none.

## Design

- **Colours:**

  | Token | Value |
  |---|---|
  | Ink | `#1B2A3A` |
  | Sage | `#4B7A5E` |
  | Paper | `#F6F3ED` |
  | Brass | `#B8894A` |
  | Slate | `#6B7280` |
  | Line | `#DDD6C9` |
  | Sage tint | `#EAF0EB` |

- **Fonts** (Google Fonts):
  - Fraunces for headings
  - Inter for body text
  - IBM Plex Mono for small labels
- **Style:** flat, generous whitespace, thin borders, no shadows.

## Content rules

- **ABN:** 89 610 863 280.
- **Third-party documents** are linked, not hosted.
- **Some topics and documents must stay off the public site.** Norm holds the list. Check with him before adding any new content about youth detention, submissions or surveys.
- **Statistics** must not say more than their source supports. Keep the labels and source records with any figure that is reused elsewhere on the site.

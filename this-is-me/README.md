# "This is me": a phone-guide concept for the Child Impact Assessment

A working sketch, prepared by the Onesimus Foundation (Tasmania) for Sarah Beresford and the Prison Reform Trust to consider. **Private. Not for publication.** It is not a Prison Reform Trust product and is not endorsed by the Trust.

## What it shows

How the Child Impact Assessment framework could sit on a phone, in the same form as Onesimus's other phone guides:

| Section | Built from |
|---|---|
| Start with a child | The three assessments (mum, dad, brother): about me, me and my mum/dad/brother, what has happened (five stages), a 1–10 rating, a drawing space, agreed actions, print |
| Notes for the helper | The accompanying notes, stage by stage |
| Guiding principles | The eight principles |
| Questions people ask | The framework FAQs |
| Children's stories | The eight case studies in the "This is me" toolkit (named and linked, not retold) |
| From the Prison Reform Trust | Links to every source document, the podcast, the narrated presentation and the training list |
| Help now | UK numbers |

## Three things to know

1. **The wording is a stand-in.** Prompts, notes, principles and FAQ answers follow the structure of PRT's documents but were written by Onesimus to show the guide working. PRT's own wording would replace them. All of it lives in `js/content.js`.
2. **Nothing a child writes is saved or sent.** Answers and drawings are held in the page's memory only and are gone when the page is left. Printing is the only way to keep them.
3. **Some fields are left off** the phone version for privacy: address, date of birth, gender, school, and the names and contact details of adults and other children at home.

## To check before anyone else sees it

- The Prisoners' Families Helpline number and hours were checked against the helpline's own website on 17 Nov 2026.
- The mum and brother assessments were not read in detail; the sketch assumes they follow the dad version's structure.
- The FAQ on parental consent points to PRT's own answer and gives none itself, because it turns on UK data protection rules.

## Technical

No build step. `index.html`, `css/styles.css`, `js/content.js`, `js/app.js`, `sw.js` (cache `cia-guide-v1`, clears only its own prefix). `noindex`. Storage is used only for the text-size and reviewer-view switches (`cia.` prefix). Tested in Chrome at 390 px wide: no sideways scrolling, no script errors.

## Next, if Sarah is interested

- PRT supplies its wording, or agrees to its documents being used word for word.
- A Tasmanian edition for Onesimus, with Tasmanian services and links to the Field Guide, made with her agreement.

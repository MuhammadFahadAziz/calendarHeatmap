# Certification Handoff

Last updated: 2026-05-11

## Purpose

This note summarizes the certification path followed in this chat for the `Calendar Heatmap` Power BI custom visual. It explains:

- the certification rules that matter
- the Partner Center submission flow
- the current project state
- the main cautions for the next person continuing the work

## Project identity

- Visual name: `Calendar Heatmap`
- Offer ID: `calendar_heatmap`
- Current package version: `1.0.0.23`
- Visual GUID: `calendarHeatmap9C5B780604B844298D143AD6DD95EB16`
- Visual repo:
  <https://github.com/MuhammadFahadAziz/calendarHeatmap>
- Public docs repo:
  <https://github.com/MuhammadFahadAziz/calendarHeatmap-docs>
- Main certification branch:
  `certification`

## Official certification rules that mattered in this chat

These are the practical Microsoft rules that guided the work:

1. The repo used for certification should contain only one Power BI visual.
2. A lowercase branch named `certification` must exist.
3. The `certification` branch must match the submitted `.pbiviz` package exactly.
4. Required repo files include:
   - `.gitignore`
   - `capabilities.json`
   - `pbiviz.json`
   - `package.json`
   - `package-lock.json`
   - `tsconfig.json`
5. `.gitignore` must exclude:
   - `node_modules`
   - `.tmp`
   - `dist`
6. Certification requires passing build and hygiene checks such as:
   - `npm audit`
   - `eslint`
   - `pbiviz package`
   - `pbiviz package --certification-audit`
7. The visual must avoid external service access and unsafe code patterns.
8. Support, privacy policy, and listing assets must be provided in Partner Center.
9. The sample `.pbix` and submitted `.pbiviz` must correspond to the intended submission state.
10. Certification can be requested during offer submission, but AppSource publish and certification are related review steps, not the same thing.

## Official process followed

The practical submission flow used here was:

1. Build and polish the custom visual.
2. Move the visual into its own dedicated repo.
3. Create and push the lowercase `certification` branch.
4. Prepare certification assets:
   - package
   - icon
   - screenshots
   - sample `.pbix`
   - privacy/support documents
5. Prepare metadata in `pbiviz.json`.
6. Create a Microsoft work account for publishing.
7. Create or access a publisher in Partner Center.
8. Create a `Power BI visual` offer in Partner Center.
9. Fill:
   - Offer setup
   - Properties
   - Offer listing
   - Availability
   - Technical configuration
10. Upload:
   - `.pbix`
   - `.pbiviz`
   - logo
   - screenshots
11. Paste certification notes with repo and branch details.
12. Submit the offer for review.

## Publisher and Partner Center path used

The publisher/account setup reached a working state during this chat.

Publishing identity created:

- work account:
  `MuhammadFahadAziz@DataViz001.onmicrosoft.com`
- publisher:
  `DataViz`

Important lesson from this chat:

- Azure trial / Azure portal access alone was not enough to solve Marketplace enrollment.
- The cleaner working path came from creating a Microsoft work account and using that inside Partner Center.

## Current submission state

At the point of this handoff:

- the Power BI visual offer was created in Partner Center
- the offer went through setup and submission
- certification was requested
- Microsoft review had entered pre-processing / review flow

However, after that submission snapshot, additional code changes were made and pushed.

## Critical caution

This is the single most important operational note:

- After the earlier review submission, new code changes were later pushed to `certification` and `main`.
- Those later changes included:
  - data labels feature
  - data label display units
  - label sizing
  - layout adjustments
  - handoff note updates

So:

- the current `certification` branch is no longer guaranteed to match the exact earlier submitted review snapshot
- if Microsoft is reviewing the older submission, and a future resubmission is required, a new clean package/branch sync should be prepared before re-submit

In short:

- certification branch exists and is valid structurally
- but exact branch/package match must always be rechecked before any future resubmission

## What was prepared technically

The visual repo includes:

- month-by-month calendar heatmap
- day and month cross-filtering
- header controls
- dynamic header fields
- `fx` day color
- `fx` month card color
- glass-style cards
- responsive layout work
- data labels feature
- data label display units and decimal places

## Assets prepared

Visual repo asset folder:

- [submission-assets](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\submission-assets)

Prepared assets:

- [CalendarHeatmap_Icon_300.png](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\submission-assets\CalendarHeatmap_Icon_300.png)
- [CalendarHeatmap_Screenshot_01_Overview.png](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\submission-assets\CalendarHeatmap_Screenshot_01_Overview.png)
- [CalendarHeatmap_Screenshot_02_Colors.png](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\submission-assets\CalendarHeatmap_Screenshot_02_Colors.png)
- [CalendarHeatmap_Screenshot_03_Detail.png](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\submission-assets\CalendarHeatmap_Screenshot_03_Detail.png)
- [CalendarHeatmap_SampleReport.pbix](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\submission-assets\CalendarHeatmap_SampleReport.pbix)

Public docs repo content:

- `privacy.md`
- `support.md`
- `index.md`

Public links used:

- privacy:
  <https://github.com/MuhammadFahadAziz/calendarHeatmap-docs/blob/main/privacy.md>
- support:
  <https://github.com/MuhammadFahadAziz/calendarHeatmap-docs/blob/main/support.md>

## Package and metadata

Current package path:

- [calendarHeatmap9C5B780604B844298D143AD6DD95EB16.1.0.0.23.pbiviz](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\dist\calendarHeatmap9C5B780604B844298D143AD6DD95EB16.1.0.0.23.pbiviz)

Current metadata in `pbiviz.json`:

- support URL:
  `https://github.com/MuhammadFahadAziz/calendarHeatmap/issues`
- repository URL:
  `https://github.com/MuhammadFahadAziz/calendarHeatmap`
- author name:
  `MuhammadFahadAziz`
- author email:
  `fahadaziz77@gmail.com`

## Validation already completed

These checks were completed during the work:

- `npm audit`
- `eslint`
- `pbiviz package`
- `pbiviz package --certification-audit`

The visual was also explicitly checked against common certification concerns:

- no external `fetch`
- no `XMLHttpRequest`
- no outbound web access privileges
- empty `privileges`

## Partner Center content used

The offer listing used customer-facing content such as:

- display name:
  `Calendar Heatmap`
- concise summary and longer description
- keywords like:
  - `calendar`
  - `heatmap`
  - `date`

Properties/legal setup used:

- Microsoft Standard Contract option
- privacy link
- support document link

Technical configuration used:

- sample `.pbix`
- `.pbiviz` package

Certification notes used the repo URL, branch name, version, and no-license-key-needed note.

## Current open issues / follow-up items

### 1. Review-state caution

If Microsoft asks for fixes, do not assume the current branch matches the previously reviewed package. Rebuild and realign carefully before resubmission.

### 2. PBIX state

The sample PBIX was later modified by the user locally and intentionally left out of one later code-only commit. Before any resubmission:

- verify the PBIX is the correct final sample
- verify it matches the intended package version

### 3. Layout polish

The visual still needs more layout intelligence so `Cell size` always behaves as the user expects and only wraps month cards when truly necessary.

### 4. Heavy-data optimization

The visual should be improved for large visible date spans. Candidate future work:

- DOM batching
- reduced full rerendering
- guardrails for large month spans
- compact mode

## Notes on terminology

User clarified an important UX expectation:

- `Cell size` should mean the **day cell** size
- it should not behave like the month-card size
- month cards should use available width naturally before wrapping

This should guide future layout refactors.

## Notes on newer features added after initial submission

These items were added later and are now present in the repo:

1. Data labels
   - show/hide toggle
   - size control
   - auto text contrast
   - support for `K`, `M`, `B`, full value, and auto units
2. Month-card width behavior adjustment
3. Additional handoff notes

## Recommended next steps for the next person

1. Check current Partner Center review status.
2. If Microsoft requests changes, decide whether to:
   - resubmit the old snapshot
   - or intentionally move to a new package snapshot
3. Before resubmission, make branch/package/PBIX match exactly.
4. If no review changes are needed, keep the current notes as operational history only.
5. For future product work, continue with:
   - layout correction for cell-size behavior
   - heavy-data optimization
   - any remaining certification feedback fixes

## Most important summary

The certification process itself is mostly set up correctly:

- dedicated repo
- `certification` branch
- assets
- docs
- Partner Center publisher
- offer created and submitted

The main thing to remember is:

- certification is not only about building the visual
- it also requires exact repo/package alignment, public documentation links, listing assets, and Partner Center publisher setup
- after submission, any later code changes must be handled carefully so the submission snapshot remains understandable

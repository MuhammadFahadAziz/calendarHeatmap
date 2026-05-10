# Handoff Note

Last updated: 2026-05-10

## Project

- Visual: `Calendar Heatmap`
- Repo local path:
  `C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap`
- GitHub repo:
  <https://github.com/MuhammadFahadAziz/calendarHeatmap>
- Main submission branch:
  `certification`
- Working branch:
  `main`

## Current package

- Current visual version:
  `1.0.0.23`
- Current package file:
  [calendarHeatmap9C5B780604B844298D143AD6DD95EB16.1.0.0.23.pbiviz](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\dist\calendarHeatmap9C5B780604B844298D143AD6DD95EB16.1.0.0.23.pbiviz)
- Visual GUID:
  `calendarHeatmap9C5B780604B844298D143AD6DD95EB16`

## Today status

Today the work moved from repo and asset preparation into actual Partner Center submission flow.

Completed today:

- created a Microsoft work account for publishing:
  `MuhammadFahadAziz@DataViz001.onmicrosoft.com`
- completed Partner Center publisher setup under `DataViz`
- created the Power BI visual offer:
  `calendar_heatmap`
- filled the offer setup, properties, offer listing, and technical configuration sections
- uploaded the `.pbiviz` package and sample `.pbix`
- submitted the offer into Microsoft review
- reached Partner Center `Pre-processing`

Partner Center status at handoff:

- offer is submitted
- current phase is `Pre-processing`
- Power BI certification was requested
- next expected stages are:
  - `Certification`
  - `Publish`

## What was built

The custom Power BI visual now includes:

- month-by-month calendar heatmap layout
- day-level and month-level cross-filtering
- editable header title and subtitle
- dynamic header title and subtitle fields
- Power BI `fx` support for day color
- Power BI `fx` support for month card color
- responsive layout improvements
- glass-style card appearance over transparent background
- selection accent behavior for day and month interactions
- simplified color controls
- custom header color controls
- certification-oriented repo structure and handoff docs

## Submission assets prepared

Folder:

- [submission-assets](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\submission-assets)

Files:

- [CalendarHeatmap_Icon_300.png](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\submission-assets\CalendarHeatmap_Icon_300.png)
- [CalendarHeatmap_Screenshot_01_Overview.png](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\submission-assets\CalendarHeatmap_Screenshot_01_Overview.png)
- [CalendarHeatmap_Screenshot_02_Colors.png](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\submission-assets\CalendarHeatmap_Screenshot_02_Colors.png)
- [CalendarHeatmap_Screenshot_03_Detail.png](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\submission-assets\CalendarHeatmap_Screenshot_03_Detail.png)
- [CalendarHeatmap_SampleReport.pbix](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\submission-assets\CalendarHeatmap_SampleReport.pbix)

Bundled icon files:

- [icon.png](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\assets\icon.png)
- [icon-appsource-300.png](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\assets\icon-appsource-300.png)

## Metadata now in package

Current metadata in [pbiviz.json](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\pbiviz.json):

- support URL:
  `https://github.com/MuhammadFahadAziz/calendarHeatmap/issues`
- repository URL:
  `https://github.com/MuhammadFahadAziz/calendarHeatmap`
- author name:
  `MuhammadFahadAziz`
- author email:
  `fahadaziz77@gmail.com`

## Repo and branch status

Important certification branch requirement has been handled:

- repo contains only this visual
- lowercase branch `certification` exists
- local and remote Git are connected
- changes were committed and pushed

Recent commits:

- `certification`: `fe24207` `Add GitHub Pages privacy policy`
- earlier certification prep commit: `ae76ee1` `Prepare certification submission v1.0.0.23`
- `main`: `f40f262` merge commit including the privacy docs and submission prep

Note:

- `certification` does not need a pull request for Microsoft certification
- it only needs to exist and match the submitted package/code snapshot

## Certification docs created

- [CERTIFICATION_CHECKLIST.md](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\CERTIFICATION_CHECKLIST.md)
- [OFFICIAL_CERTIFICATION_CHECKLIST.md](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\OFFICIAL_CERTIFICATION_CHECKLIST.md)
- [PARTNER_CENTER_SUBMISSION.md](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\PARTNER_CENTER_SUBMISSION.md)
- [MARKETPLACE_COPY.md](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\MARKETPLACE_COPY.md)
- [METADATA_TO_FILL.md](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\METADATA_TO_FILL.md)
- [README.md](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\README.md)

## Privacy policy

Prepared files:

- [docs/index.md](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\docs\index.md)
- [docs/privacy.md](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\docs\privacy.md)

These were created and pushed so they can be used for GitHub Pages if desired.

However, GitHub Pages setup was not completed in this conversation. The user indicated they may host the privacy policy on a custom/public URL elsewhere instead of using GitHub Pages.

Public docs repo created today:

- docs repo:
  <https://github.com/MuhammadFahadAziz/calendarHeatmap-docs>
- public docs local path:
  `C:\Users\fahad\OneDrive\Documents\GitHub\calendarHeatmap-docs`

Files uploaded there:

- `README.md`
- `index.md`
- `privacy.md`
- `support.md`

Current public document URLs used/available:

- privacy:
  <https://github.com/MuhammadFahadAziz/calendarHeatmap-docs/blob/main/privacy.md>
- support:
  <https://github.com/MuhammadFahadAziz/calendarHeatmap-docs/blob/main/support.md>

## Quality checks already completed

- `npm audit` clean
- `eslint` clean
- `pbiviz package` successful
- `pbiviz package --certification-audit` run
- no outbound `fetch` / `XMLHttpRequest` style usage in project source
- `privileges` empty in `capabilities.json`

## Remaining blockers for certification

At the latest handoff point, the offer had already been submitted. The main remaining item is to wait for Microsoft review results and respond if feedback comes back.

Possible remaining actions:

1. Monitor Partner Center review status
2. Watch for Microsoft certification feedback or rejection notes
3. Resubmit fixes if Microsoft requests changes
4. Optionally replace the GitHub blob privacy/support links later with cleaner GitHub Pages or custom-domain URLs

## Recommended next steps

In order:

1. Wait for Partner Center pre-processing to complete
2. Monitor certification review status
3. If Microsoft sends feedback, fix the visual and resubmit using the same repo and `certification` branch flow
4. If no issues are found, wait for final publish rollout

## Open todo

Keep this item for a future product-quality pass after certification or during the next feature iteration:

1. Heavy-data performance optimization
   Current visual should handle moderate to fairly large row counts if they aggregate into a limited date range, but it is not yet optimized for very heavy visible calendar spans.
   Future work candidates:
   - batch DOM rendering with `DocumentFragment`
   - reduce full rerender work
   - add guardrails for very large month ranges
   - add optional compact mode for large spans

2. Data labels on day cells
   This was identified as a missing core feature.
   Future implementation goals:
   - add a `Data labels` format pane card
   - add `Show data labels` on/off toggle
   - render numeric data labels inside day boxes when enabled
   - keep label visibility dependent on available cell space
   - automatically compute readable label color from the actual rendered day cell fill color
   - if day color is driven by Power BI conditional formatting or field-based color, the label color should still auto-adjust for contrast
   - preserve existing day number readability and avoid overlap between day number and value label

## Certification notes text

Use:

```text
Source repository:
https://github.com/MuhammadFahadAziz/calendarHeatmap

Certification branch:
certification

Visual package version:
1.0.0.23

This repository contains only one Power BI custom visual. The certification branch matches the submitted visual package.
```

## Important final submission references

- Package:
  [calendarHeatmap9C5B780604B844298D143AD6DD95EB16.1.0.0.23.pbiviz](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\dist\calendarHeatmap9C5B780604B844298D143AD6DD95EB16.1.0.0.23.pbiviz)
- Certification branch:
  `certification`
- Repo:
  <https://github.com/MuhammadFahadAziz/calendarHeatmap>

## Notes about repo history

- An older unrelated repo named `CustomVisuals` existed before the dedicated repo setup.
- Certification should use only the dedicated `calendarHeatmap` repo, not the older mixed repo.

## Notes about branch behavior

- GitHub may show `certification` as behind `main` because `main` includes merge commits.
- This is not itself a certification blocker as long as `certification` contains the exact visual code and matches the submitted package.

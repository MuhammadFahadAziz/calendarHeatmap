# Calendar Heatmap

A Power BI custom visual that renders daily values in a month-by-month calendar heatmap layout.

## Current package

- Visual name: `Calendar Heatmap`
- GUID: `calendarHeatmap9C5B780604B844298D143AD6DD95EB16`
- Current version: `1.0.0.23`
- Package: `dist/calendarHeatmap9C5B780604B844298D143AD6DD95EB16.1.0.0.23.pbiviz`

## Features

- Month-by-month calendar cards
- Day-level and month-level cross-filtering
- Editable header title and subtitle
- Dynamic header text buckets
- Power BI `fx` support for day color and month card color
- Responsive layout and glass-style cards
- Submission asset folder for AppSource screenshots and icon

## Data roles

- `Date`
- `Value`
- `Header Title`
- `Header Subtitle`

## Development

```powershell
npm install
npm run eslint
npm run package
```

Optional certification audit:

```powershell
pbiviz package --certification-audit
```

## Submission assets

Prepared Partner Center assets are in [submission-assets](C:\Users\fahad\OneDrive\Documents\GitHub\CustomVisuals\calendarHeatmap\submission-assets):

- `CalendarHeatmap_Icon_300.png`
- `CalendarHeatmap_Screenshot_01_Overview.png`
- `CalendarHeatmap_Screenshot_02_Colors.png`
- `CalendarHeatmap_Screenshot_03_Detail.png`
- `CalendarHeatmap_SampleReport.pbix`

## Certification branch

Use the lowercase `certification` branch for the exact code snapshot that matches the submitted package.

## Remaining manual items

- Review author/support metadata in `pbiviz.json` and adjust if needed
- Publish the repo to GitHub and add the public repository URL
- Validate the sample offline `.pbix`
- Provide privacy policy, support link, and EULA/contract choice
- Complete Partner Center offer details

# Calendar Heatmap Certification Checklist

## Repo and Code

- [x] One visual lives in this repository
- [x] `.gitignore` excludes `node_modules`, `.tmp`, and `dist`
- [x] `npm install` works
- [x] `npm run lint` works
- [x] `npm run package` works
- [x] `npm audit` shows no moderate or high vulnerabilities
- [x] `pbiviz package --certification-audit` runs
- [x] No external privileges are declared in `capabilities.json`
- [x] Rendering events are implemented
- [x] Cross-filtering and selection are implemented
- [ ] Create and keep a lowercase `certification` branch matching the submitted package
- [ ] Replace placeholder author/support/repository metadata

## Required Assets

- [x] `300x300` PNG icon for AppSource listing
- [x] `1-5` screenshots in PNG format, each exactly `1366x768`
- [x] Sample `.pbix` report file staged for submission
- [ ] Privacy policy URL
- [ ] Support URL
- [ ] EULA or Standard Contract decision

## Functional Testing

- [ ] Convert from native visual to this visual and back without errors
- [ ] Day click filters other visuals correctly
- [ ] Month click filters other visuals correctly
- [ ] Other visuals and slicers filter this visual correctly
- [ ] Resize behavior works for small and large containers
- [ ] Multiple instances work on the same page
- [ ] Save and reopen preserves formatting settings
- [ ] Null, invalid, negative, and sparse data do not break rendering
- [ ] Desktop and Service testing completed

## Partner Center Submission

- [ ] Create Power BI visual offer in Partner Center
- [ ] Upload `.pbiviz`
- [ ] Upload sample `.pbix`
- [ ] Upload icon and screenshots
- [ ] Enable `Request Power BI certification`
- [ ] Put source repo link in certification notes
- [ ] If repo is private, provide credentials, recovery codes, and read-only access to `pbicvsupport`

## Current Notes

- Current visual version: `1.0.0.22`
- Sample report path: `submission-assets/CalendarHeatmap_SampleReport.pbix`
- Latest package should be rebuilt before submission if code changes again
- Do not change the visual GUID when publishing updates

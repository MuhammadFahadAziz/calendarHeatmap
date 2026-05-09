# Official Power BI Certification Checklist

This checklist is based on Microsoft Learn guidance for Power BI custom visual certification and Partner Center submission.

Checked against official sources on `2026-05-09`.

## Official sources

- Certified visuals:
  [Microsoft Learn - Certified Power BI visuals](https://learn.microsoft.com/en-us/power-bi/developer/visuals/power-bi-custom-visuals-certified)
- Submission testing:
  [Microsoft Learn - Test a custom visual before submitting it](https://learn.microsoft.com/en-ie/power-bi/developer/visuals/submission-testing)
- Create Power BI visual offer:
  [Microsoft Learn - Create a Power BI visual offer](https://learn.microsoft.com/en-us/partner-center/marketplace-offers/power-bi-visual-offer-setup)
- Offer listing details:
  [Microsoft Learn - Configure Power BI visual offer listing details](https://learn.microsoft.com/en-us/partner-center/marketplace-offers/power-bi-visual-offer-listing)
- Technical configuration:
  [Microsoft Learn - Set up Power BI visual offer technical configuration](https://learn.microsoft.com/en-us/partner-center/marketplace-offers/power-bi-visual-technical-configuration)
- Offer properties:
  [Microsoft Learn - Configure Power BI visual offer properties](https://learn.microsoft.com/en-us/partner-center/marketplace-offers/power-bi-visual-properties)

## 1. General certification requirements

- [ ] Visual is not an `R` visual
- [ ] Visual complies with Power BI visual guidelines
- [ ] Visual passes required Microsoft submission tests
- [ ] Compiled package exactly matches submitted package
- [ ] Visual is approved through Partner Center
- [ ] Certification checkbox is enabled in Partner Center

## 2. Repository requirements

- [ ] Repository contains code for only one Power BI visual
- [ ] Repository is available to the Power BI review team
- [ ] Lowercase branch named `certification` exists
- [ ] `certification` branch matches the submitted package exactly
- [ ] If private packages or submodules are used, reviewer access is available

## 3. Required files

- [ ] `.gitignore`
- [ ] `capabilities.json`
- [ ] `pbiviz.json`
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `tsconfig.json`

### `.gitignore` must exclude

- [ ] `node_modules`
- [ ] `.tmp`
- [ ] `dist`

## 4. Package and command requirements

- [ ] Latest practical Power BI API is used
- [ ] Latest practical `powerbi-visuals-tools` is used
- [ ] `package.json` contains `typescript`
- [ ] `package.json` contains `eslint`
- [ ] `package.json` contains `eslint-plugin-powerbi-visuals`
- [ ] `package.json` contains an eslint command:
  `npx eslint . --ext .js,.jsx,.ts,.tsx`

### These commands must pass without errors

- [ ] `npm install`
- [ ] `pbiviz package`
- [ ] `npm audit`
- [ ] `npx eslint . --ext .js,.jsx,.ts,.tsx`

### Audit requirements

- [ ] `npm audit` shows no moderate or high issues
- [ ] `pbiviz package --certification-audit` completes successfully

## 5. Source code requirements

### Required

- [ ] Only public reviewable open-source components are used
- [ ] Rendering Events API is supported
- [ ] DOM manipulation is safe
- [ ] User input and user data are sanitized before being added to DOM
- [ ] Sample report is used as certification test data

### Not allowed

- [ ] No HTTP/S outbound access
- [ ] No WebSocket outbound access
- [ ] `WebAccess` privileges are empty or omitted
- [ ] No `fetch`
- [ ] No `XMLHttpRequest`
- [ ] No `innerHTML` with user input or user data
- [ ] No `D3.html(user input or user data)`
- [ ] No `eval()`
- [ ] No `Function()`
- [ ] No unsafe dynamic code execution
- [ ] No JavaScript console errors or exceptions for tested inputs
- [ ] No minified JavaScript projects submitted for review

## 6. Metadata and package content

- [ ] `pbiviz.json` contains visual name
- [ ] `pbiviz.json` contains display name
- [ ] `pbiviz.json` contains stable GUID
- [ ] `pbiviz.json` contains incremented version
- [ ] `pbiviz.json` contains description
- [ ] `pbiviz.json` contains real support URL
- [ ] `pbiviz.json` contains real GitHub URL
- [ ] `pbiviz.json` contains real author name
- [ ] `pbiviz.json` contains real author email

## 7. Functional submission testing

- [ ] Convert from native visual to this visual and back without errors
- [ ] Selections in this visual affect other visuals correctly
- [ ] Selections in other visuals affect this visual correctly
- [ ] Min/max dataViewMapping conditions work correctly
- [ ] Removing fields in arbitrary order does not break the visual
- [ ] Format pane opens safely for every bucket configuration
- [ ] Visual, page, report, and slicer filtering work correctly
- [ ] Tooltips show correct filtered values
- [ ] Ctrl/Alt/Shift selection behavior has no unexpected issues
- [ ] Actual size / Fit to page / Fit to width behave correctly
- [ ] Resizing works correctly
- [ ] Minimum report size does not break display
- [ ] Scroll bars only appear when needed and behave correctly
- [ ] Pin to dashboard works correctly
- [ ] Multiple instances on one page work correctly
- [ ] Multiple instances across pages work correctly
- [ ] Switching pages works correctly
- [ ] Reading view and Edit view both work correctly
- [ ] Property changes persist after save and reopen
- [ ] Numeric, date, and text data render correctly
- [ ] Different model format strings render correctly
- [ ] Null, infinity, negative, wrong-type, and sparse data do not break the visual

## 8. Desktop and performance testing

- [ ] Test in current Power BI Desktop
- [ ] Import, save, reopen, and publish from Desktop works correctly
- [ ] Numeric precision changes display correctly
- [ ] Large data volumes do not freeze the visual
- [ ] Selection, filtering, resizing, and rendering are performant

## 9. Partner Center listing assets

- [ ] Listing icon is PNG and exactly `300x300`
- [ ] At least one screenshot is PNG and exactly `1366x768`
- [ ] No screenshot is blurry
- [ ] Summary is ready
- [ ] Full description is ready
- [ ] Search keywords are ready
- [ ] Optional video URL is ready if needed

## 10. Legal and support

- [ ] Privacy policy URL is ready
- [ ] Support URL is ready
- [ ] EULA URL is ready, or Standard Contract is selected

## 11. Technical configuration upload

- [ ] PBIVIZ package is ready
- [ ] Sample `.pbix` is ready
- [ ] Sample `.pbix` uses the same visual version as the `.pbiviz`
- [ ] Sample `.pbix` works offline with no external connections

## 12. Certification request process

- [ ] Sign in to Partner Center
- [ ] Create or open the Power BI visual offer
- [ ] Complete Offer setup
- [ ] Complete Properties
- [ ] Complete Offer listing
- [ ] Upload icon and screenshots
- [ ] Upload `.pbiviz`
- [ ] Upload sample `.pbix`
- [ ] Enable `Request Power BI certification`
- [ ] On review/publish notes, include source repository link
- [ ] If repo is private, include access credentials and recovery codes
- [ ] If repo is private, grant read-only access to `pbicvsupport`

## 13. Private repository checklist

- [ ] Validation account prepared
- [ ] Two-factor authentication configured
- [ ] Recovery codes generated
- [ ] Repository link ready
- [ ] Sign-in credentials ready
- [ ] Recovery codes ready
- [ ] Read-only access granted to `pbicvsupport`

## 14. Current project status summary

Use this section as a live status board for this project.

- [x] Dedicated visual repository exists
- [x] `certification` branch exists
- [x] `.gitignore` exists
- [x] Submission icon prepared
- [x] Submission screenshots prepared
- [x] `npm audit` clean
- [x] `eslint` passes
- [x] `pbiviz package` passes
- [x] `pbiviz package --certification-audit` has been run
- [x] Sample `.pbix` file is staged in submission assets
- [ ] Sample `.pbix` still needs final offline/version validation
- [x] Author/support/repository metadata populated
- [ ] Privacy policy / support / EULA decision still needed
- [ ] Partner Center offer setup still needed

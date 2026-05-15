# Calendar Heatmap Detailed Hints and Tips Copy

Use this as the full text for the sample PBIX help pages.  
The style is intentionally closer to the detailed reference sample: large headings, explanation text, guided steps, and a small tips section.

## Page 1: Home

### Title

`Welcome to Calendar Heatmap Demo`

### Body

`This is a Power BI custom visual demo file for Calendar Heatmap. Use this sample report to review the visual's core functionality, formatting options, interaction behavior, and common reporting scenarios.`

`Calendar Heatmap is designed to display day-level values in a familiar calendar layout. It helps users analyze daily activity patterns, compare monthly trends, highlight strong and weak periods, and quickly detect outliers in time-based data.`

`This sample report includes pages for general usage, layout and header settings, color formatting, data labels, and filtering behavior. Each page is meant to help reviewers and users understand how the visual is configured and how it should behave in a report.`

`Use the sample pages to test formatting changes, cross-filtering, and resizing behavior.`

## Page 2: How to Use

### Title

`HOW TO USE CALENDAR HEATMAP`

### Body

`Calendar Heatmap requires one Date field and one Value measure. The visual groups records by date and renders each day as a calendar cell inside the corresponding month card.`

`Step 1: Add one Date field and one Value measure to the visual.`

`Step 2: Filter the report to a single month if you want to focus on one calendar card. Remove the filter to display multiple months together.`

`Step 3: Select a day cell to cross-filter other visuals by exact date. This is useful when you want to inspect one specific day in detail.`

`Step 4: Select a month header to filter by the full month. This allows quick comparison between month-level trends and supporting visuals in the report.`

`Step 5: Use the Format pane to test header settings, layout options, color formatting, legend settings, and data labels.`

`Step 6: Resize the visual to verify responsive behavior when the report canvas changes size.`

`Tips: Use a month filter during detailed testing, then remove the filter to validate multi-month layout behavior and spacing.`

### Screenshot placeholder

`SCREENSHOT of Home page with one selected day and one selected month example`

## Page 3: Header and Layout

### Title

`HEADER AND LAYOUT OPTIONS`

### Body

`Calendar Heatmap provides flexible header and layout settings so the visual can adapt to both compact analytic reports and presentation-style dashboards.`

`The Header area supports a custom title and subtitle and can also be controlled dynamically by field-driven text. This allows the report author to keep the visual context-aware when filters change.`

`Use the Header settings to test:`

`• Show or hide header`

`• Title and subtitle text`

`• Title size and subtitle size`

`• Title color and subtitle color`

`Use the Layout settings to test:`

`• Week starts on Monday`

`• Cell size`

`• Cell gap`

`• Month title size`

`• Day label size`

`• Show or hide weekday labels`

`• Show or hide month summary`

`• Label color`

`• Border color`

`Tips: Cell size refers to the day cell, not the full month card. Increase it gradually and verify that the layout still uses horizontal space efficiently before wrapping months to the next row.`

### Screenshot placeholder

`SCREENSHOT of Header settings and Layout settings`

## Page 4: Color Formatting

### Title

`COLOR FORMATTING`

### Body

`Calendar Heatmap supports Power BI-driven formatting so the report author can style the visual dynamically and align it with the surrounding dashboard theme.`

`The visual supports conditional formatting for both day cells and month cards. This allows value-driven color logic as well as theme-driven presentation choices.`

`Use the Colors settings to test:`

`• Day color using Power BI fx`

`• Month card color using Power BI fx`

`• Manual theme changes in the report background`

`• Visual behavior under light, dark, and colored dashboard surfaces`

`The month card formatting is useful when you want the visual to match broader dashboard branding, while day color formatting is useful for measure-based heatmap intensity or field-driven color logic.`

`Tips: Test at least one conditional formatting scenario based on measure values and one based on a field-driven color output. This makes it easier to verify that the visual respects native Power BI formatting behavior.`

### Screenshot placeholder

`SCREENSHOT of Colors settings with fx applied to day color and month card color`

## Page 5: Data Labels

### Title

`DATA LABELS`

### Body

`Calendar Heatmap supports optional data labels inside day cells so that users can read the measure value directly without relying only on color intensity.`

`Data labels are especially useful in compact executive dashboards where quick reading is more important than a purely minimal visual style.`

`Use the Data labels settings to test:`

`• Show or hide data labels`

`• Data label size`

`• Display units: Auto, None, K, M, and B`

`• Decimal places`

`When data labels are enabled, label text color adjusts automatically based on the actual day-cell color. This helps maintain readability when the day fill is driven by manual color settings or Power BI conditional formatting.`

`Tips: Test labels with both small and large values. Also test Auto, K, and M display units to confirm formatting behavior under different measure scales.`

### Screenshot placeholder

`SCREENSHOT of Data label settings with display units and decimal places`

## Page 6: Filtering and Interaction

### Title

`FILTERING AND INTERACTION`

### Body

`Calendar Heatmap is designed to work as an interactive report visual, not only as a static display. Day-level and month-level selections should help users navigate the report and focus on the right period quickly.`

`Interaction behavior to validate:`

`• Selecting a day cell filters other visuals by exact date`

`• Selecting a month header filters other visuals by full month`

`• External filters and slicers limit the visible month range correctly`

`• The selected state remains clear enough for the user to understand what is active`

`• Multiple month cards can still be reviewed comfortably after selection and resize changes`

`This page should be used together with another visual in the sample report so reviewers can confirm that Calendar Heatmap participates correctly in cross-filtering scenarios.`

`Tips: Test day selection and month selection separately, because they represent two different filtering behaviors and both are important during certification review.`

### Screenshot placeholder

`SCREENSHOT of day selection filtering another visual`

## Page 7: Customizable Options Summary

### Title

`CUSTOMIZABLE OPTIONS`

### Body

`Calendar Heatmap includes the following customizable options:`

`Header`

`• Show or hide header`

`• Header title`

`• Header subtitle`

`• Title size`

`• Subtitle size`

`• Title color`

`• Subtitle color`

`• Dynamic header title field`

`• Dynamic header subtitle field`

`Layout`

`• Week starts on Monday`

`• Cell size`

`• Cell gap`

`• Day label size`

`• Month title size`

`• Show or hide weekday labels`

`• Show or hide month summary`

`• Label color`

`• Border color`

`Colors`

`• Day color with Power BI fx`

`• Month card color with Power BI fx`

`Legend`

`• Show or hide legend`

`Data Labels`

`• Show or hide data labels`

`• Data label size`

`• Data label display units`

`• Data label decimal places`

`Tips: This combination of manual formatting and Power BI-driven formatting makes the visual suitable for both simple reporting pages and highly styled dashboards.`

### Screenshot placeholder

`SCREENSHOT of Format pane showing Header, Layout, Colors, Legend, and Data labels`


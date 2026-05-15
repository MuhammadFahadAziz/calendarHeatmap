# Calendar Heatmap Sample Hints Blueprint

This note captures the hints-and-tips style observed in the reference sample at:

- `C:\Users\fahad\OneDrive\Desktop\Sample`

## What the reference sample does well

The sample does **not** rely on one small note. Instead, it uses:

- a dedicated **Home / Introduction** page
- multiple **feature pages**
- large **textbox panels**
- short **feature title**
- short **what it does**
- optional **step-by-step instructions**
- separate **Tips** line
- supporting screenshots or visuals on the same page

The overall pattern is:

1. Big heading
2. One-sentence explanation
3. Steps to configure or test
4. Tips / notes
5. Screenshot or visual example

## Recommended Calendar Heatmap sample structure

Use the same approach for the Calendar Heatmap sample report.

### Page 1: Home

**Textbox title**

`Welcome to Calendar Heatmap Demo`

**Textbox body**

`This is a Power BI custom visual demo file for Calendar Heatmap. Use this sample report to review the visual's main capabilities, formatting options, and cross-filtering behavior.`

`Calendar Heatmap displays day-level values in a month-by-month calendar layout. It is designed for daily trend analysis, activity monitoring, sales tracking, and other time-based reporting scenarios.`

`Use the following pages to review layout settings, data labels, colors, and filtering behavior.`

### Page 2: How to Use

This should be the main certification help page.

**Textbox title**

`HOW TO USE CALENDAR HEATMAP`

**Textbox body**

`Step 1: Add one Date field and one Value measure to the visual.`

`Step 2: Filter the report to a single month to focus on one calendar card, or remove filters to review multiple months together.`

`Step 3: Select a day cell to cross-filter other visuals by exact date.`

`Step 4: Select a month header to cross-filter by full month.`

`Step 5: Use the Format pane to test header settings, colors, layout, and data labels.`

`Tips: Resize the visual to verify responsive layout behavior.`

**Additional textbox**

`SCREENSHOT of Home page with one selected day`

### Page 3: Header and Layout

**Textbox title**

`HEADER AND LAYOUT OPTIONS`

**Textbox body**

`Calendar Heatmap supports editable header content and responsive layout controls.`

`Common options include:`

`• Show or hide header`

`• Title and subtitle`

`• Title size and subtitle size`

`• Title color and subtitle color`

`• Week starts on Monday`

`• Cell size and cell gap`

`• Month title size`

`• Show or hide weekday labels`

`• Show or hide month summary`

`Tips: Increase cell size to make day boxes larger. Use label size and month title size carefully to preserve readability.`

**Additional textbox**

`SCREENSHOT of Header settings and Layout settings`

### Page 4: Colors

**Textbox title**

`COLOR FORMATTING`

**Textbox body**

`Calendar Heatmap supports dynamic Power BI color formatting for both day cells and month cards.`

`Use Colors settings to test:`

`• Day color with Power BI fx`

`• Month card color with Power BI fx`

`• Different report themes and backgrounds`

`Tips: Test both a standard palette and conditional formatting based on measure values or field-driven color output.`

**Additional textbox**

`SCREENSHOT of Colors settings with fx applied`

### Page 5: Data Labels

**Textbox title**

`DATA LABELS`

**Textbox body**

`Data labels can be shown inside day cells to display the measure value directly.`

`Use Data labels settings to test:`

`• Show or hide data labels`

`• Data label size`

`• Display units: Auto, None, K, M, and B`

`• Decimal places`

`Tips: Data label text color adjusts automatically to remain readable against the day cell color, including conditional formatting output.`

**Additional textbox**

`SCREENSHOT of Data labels settings with display units and decimal places`

### Page 6: Filtering Behavior

**Textbox title**

`FILTERING AND INTERACTION`

**Textbox body**

`Use this page to validate interaction behavior.`

`• Clicking a day cell filters other visuals by exact date.`

`• Clicking a month header filters other visuals by full month.`

`• Other report filters can limit the visible month range.`

`Tips: Test day selection and month selection separately so both behaviors are easy to validate.`

**Additional textbox**

`SCREENSHOT of day selection filtering other visuals`

## Short customizable options list

Use this list in a side textbox if needed:

`Customizable options include:`

`• Header title and subtitle`

`• Title and subtitle colors`

`• Title and subtitle sizes`

`• Week start option`

`• Cell size and gap`

`• Month title size`

`• Weekday label visibility`

`• Month summary visibility`

`• Day color with fx`

`• Month card color with fx`

`• Legend visibility`

`• Data label visibility`

`• Data label size`

`• Data label display units`

`• Data label decimal places`

## Recommendation for certification resubmission

For the next sample report:

- keep the main demo page
- add one dedicated **How to Use** page
- add 2 to 4 focused feature pages
- use large textboxes with short steps
- include explicit screenshot placeholders if screenshots are not embedded yet

This will better match the structure of the successful reference sample.

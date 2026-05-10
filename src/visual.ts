"use strict";

import powerbi from "powerbi-visuals-api";
import { AdvancedFilter, IAdvancedFilter, IBasicFilter, IFilterColumnTarget, IFilterTarget } from "powerbi-models";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { dataViewObjects } from "powerbi-visuals-utils-dataviewutils";
import "./../style/visual.less";

import ISelectionId = powerbi.visuals.ISelectionId;
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import IVisualEventService = powerbi.extensibility.IVisualEventService;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;

import { VisualFormattingSettingsModel } from "./settings";

interface AggregatedDayValue {
    key: string;
    date: Date;
    total: number;
    hasValue: boolean;
    selectionId: ISelectionId | null;
    overrideColor?: string;
    monthCardOverrideColor?: string;
}

interface MonthCellData {
    key: string;
    date: Date;
    dayOfMonth: number;
    value: number | null;
    formattedValue: string;
    dataLabelText: string;
    color: string;
    selectionId: ISelectionId | null;
    isSelected: boolean;
    monthLabel: string;
}

interface MonthSummaryData {
    total: number;
    activeDays: number;
    peakValue: number | null;
}

interface MonthData {
    key: string;
    title: string;
    weeks: (MonthCellData | null)[][];
    summary: MonthSummaryData;
    isSelected: boolean;
    cardColor: string | null;
}

interface HeaderContent {
    title: string;
    subtitle: string;
}

export class Visual implements IVisual {
    private container: HTMLElement;
    private root: HTMLDivElement;
    private visualHost: IVisualHost;
    private selectionManager: ISelectionManager;
    private events: IVisualEventService;
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;
    private lastMetricName: string | null = null;
    private lastAggregatedValues: Map<string, AggregatedDayValue> | null = null;
    private lastHeaderContent: HeaderContent | null = null;
    private activeDayKey: string | null = null;
    private activeMonthKey: string | null = null;
    private activeFilterTarget: IFilterColumnTarget | null = null;
    private effectiveCellSize: number = 26;
    private effectiveDataLabelSize: number = 10;

    constructor(options: VisualConstructorOptions) {
        this.formattingSettingsService = new FormattingSettingsService();
        this.visualHost = options.host;
        this.selectionManager = options.host.createSelectionManager();
        this.events = options.host.eventService;
        this.container = options.element;
        this.root = document.createElement("div");
        this.root.className = "calendar-heatmap";
        this.container.appendChild(this.root);
        this.handleRootContextMenu();
        this.handleBackgroundClear();
    }

    public update(options: VisualUpdateOptions) {
        this.events.renderingStarted(options);

        try {
            this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(
                VisualFormattingSettingsModel,
                options.dataViews?.[0]
            );

            this.applyLayoutSettings(options.viewport);

            const dataView = options.dataViews?.[0];
            const categorical = dataView?.categorical;
            const categoryColumn = categorical?.categories?.[0];
            const valueColumn = this.getMeasureColumnByRole(categorical?.values, "value") ?? categorical?.values?.[0];

            if (!categoryColumn || !valueColumn) {
                this.resetVisualState();
                this.renderEmptyState("Add a date field and a measure to build the calendar heatmap.");
                this.events.renderingFinished(options);
                return;
            }

            const aggregatedValues = this.aggregateDateValues(categoryColumn, valueColumn.values);
            if (aggregatedValues.size === 0) {
                this.resetVisualState();
                this.renderEmptyState("No valid dates were found in the date field.");
                this.events.renderingFinished(options);
                return;
            }

            this.activeFilterTarget = this.getFilterTarget(categoryColumn.source);
            this.syncActiveFilterState(options.jsonFilters, aggregatedValues, dataView?.metadata?.isDataFilterApplied);

            const metricName = valueColumn.source.displayName || "Value";
            this.lastMetricName = metricName;
            this.lastAggregatedValues = aggregatedValues;
            this.lastHeaderContent = this.buildHeaderContent(categorical?.values, aggregatedValues);
            this.renderCurrentState();
            this.events.renderingFinished(options);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unexpected rendering error";
            this.events.renderingFailed(options, message);
            this.renderEmptyState("The visual couldn't render this data yet.");
            throw error;
        }
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }

    private resetVisualState(): void {
        this.lastMetricName = null;
        this.lastAggregatedValues = null;
        this.lastHeaderContent = null;
        this.activeFilterTarget = null;
        this.activeDayKey = null;
        this.activeMonthKey = null;
    }

    private applyLayoutSettings(viewport: powerbi.IViewport): void {
        const header = this.formattingSettings.headerCard;
        const layout = this.formattingSettings.layoutCard;
        const dataLabels = this.formattingSettings.dataLabelsCard;
        const colorPalette = this.visualHost.colorPalette;
        const isHighContrast = colorPalette.isHighContrast;
        const labelColor = isHighContrast ? colorPalette.foreground.value : layout.labelColor.value.value;
        const titleColor = isHighContrast ? colorPalette.foreground.value : header.titleColor.value.value;
        const subtitleColor = isHighContrast ? colorPalette.foreground.value : header.subtitleColor.value.value;
        const borderColor = isHighContrast ? colorPalette.foreground.value : layout.borderColor.value.value;
        const visualBackground = isHighContrast ? colorPalette.background.value : "transparent";
        const selectionColor = this.getSelectionAccentColor();
        const requestedCellSize = layout.cellSize.value;
        const requestedGap = layout.cellGap.value;
        const safeViewportWidth = Math.max(320, viewport.width);
        const maxSingleMonthCellSize = Math.max(18, Math.floor((safeViewportWidth - 72 - (requestedGap * 6)) / 7));
        const requestedDataLabelSize = Math.max(8, Math.min(dataLabels.dataLabelSize.value, 16));
        const minimumCellSize = dataLabels.showDataLabels.value
            ? Math.max(30, Math.ceil(requestedDataLabelSize * 2.7))
            : 18;
        const effectiveCellSize = Math.max(18, Math.min(Math.max(requestedCellSize, minimumCellSize), maxSingleMonthCellSize));
        const effectiveFontSize = Math.min(layout.fontSize.value, Math.max(10, Math.floor(effectiveCellSize * 0.6)));
        const maxDataLabelSizeFromCell = Math.max(8, Math.floor((effectiveCellSize - 6) / 2.7));
        const effectiveDataLabelSize = Math.max(8, Math.min(requestedDataLabelSize, 16, maxDataLabelSizeFromCell));
        const monthMinWidth = Math.max(280, (effectiveCellSize * 7) + (requestedGap * 6) + 56);
        const effectiveMonthTitleSize = Math.max(10, Math.min(layout.monthTitleSize.value, 32));

        this.effectiveCellSize = effectiveCellSize;
        this.effectiveDataLabelSize = effectiveDataLabelSize;

        this.root.style.setProperty("--cell-size", `${effectiveCellSize}px`);
        this.root.style.setProperty("--cell-gap", `${requestedGap}px`);
        this.root.style.setProperty("--title-size", `${header.titleSize.value}px`);
        this.root.style.setProperty("--subtitle-size", `${header.subtitleSize.value}px`);
        this.root.style.setProperty("--title-color", titleColor);
        this.root.style.setProperty("--subtitle-color", subtitleColor);
        this.root.style.setProperty("--font-size", `${effectiveFontSize}px`);
        this.root.style.setProperty("--month-title-size", `${effectiveMonthTitleSize}px`);
        this.root.style.setProperty("--month-min-width", `${monthMinWidth}px`);
        this.root.style.setProperty("--label-color", labelColor);
        this.root.style.setProperty("--border-color", borderColor);
        this.root.style.setProperty("--data-label-size", `${effectiveDataLabelSize}px`);
        this.root.style.setProperty("--visual-background", visualBackground);
        this.root.style.setProperty("--selection-color", selectionColor);
        this.root.style.setProperty("--selection-shadow", this.hexToRgba(selectionColor, 0.18));
        this.root.classList.toggle("calendar-heatmap--high-contrast", isHighContrast);
    }

    private aggregateDateValues(
        categoryColumn: powerbi.DataViewCategoryColumn,
        measureValues: powerbi.PrimitiveValue[]
    ): Map<string, AggregatedDayValue> {
        const aggregatedValues = new Map<string, AggregatedDayValue>();

        categoryColumn.values.forEach((rawDateValue, index) => {
            const date = this.coerceDate(rawDateValue);
            if (!date) {
                return;
            }

            const dayKey = this.getDateKey(date);
            const existing = aggregatedValues.get(dayKey) ?? {
                key: dayKey,
                date,
                total: 0,
                hasValue: false,
                selectionId: categoryColumn.identity
                    ? this.visualHost.createSelectionIdBuilder().withCategory(categoryColumn, index).createSelectionId()
                    : null,
                overrideColor: undefined
            };

            const rawMeasure = measureValues[index];
            const numericMeasure = typeof rawMeasure === "number" && Number.isFinite(rawMeasure) ? rawMeasure : null;

            if (numericMeasure !== null) {
                existing.total += numericMeasure;
                existing.hasValue = true;
            }

            const objectColor = dataViewObjects.getFillColor(
                categoryColumn.objects?.[index],
                { objectName: "colors", propertyName: "dayColor" }
            );

            if (objectColor) {
                existing.overrideColor = objectColor;
            }

            const monthCardObjectColor = dataViewObjects.getFillColor(
                categoryColumn.objects?.[index],
                { objectName: "colors", propertyName: "monthCardColor" }
            );

            if (monthCardObjectColor) {
                existing.monthCardOverrideColor = monthCardObjectColor;
            }

            aggregatedValues.set(dayKey, existing);
        });

        return aggregatedValues;
    }

    private buildMonthData(aggregatedValues: Map<string, AggregatedDayValue>): MonthData[] {
        const dates = Array.from(aggregatedValues.values())
            .map(item => item.date)
            .sort((left, right) => left.getTime() - right.getTime());

        const firstDate = dates[0];
        const lastDate = dates[dates.length - 1];
        const firstMonth = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
        const lastMonth = new Date(lastDate.getFullYear(), lastDate.getMonth(), 1);
        const months: MonthData[] = [];

        const mondayFirst = this.formattingSettings.layoutCard.mondayFirst.value;

        for (let cursor = new Date(firstMonth); cursor <= lastMonth; cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)) {
            const year = cursor.getFullYear();
            const month = cursor.getMonth();
            const monthStart = new Date(year, month, 1);
            const monthEnd = new Date(year, month + 1, 0);
            const monthKey = this.getMonthKey(monthStart);
            const startOffset = this.getCalendarColumn(monthStart, mondayFirst);
            const rows = 6;
            const weeks = Array.from({ length: rows }, () => Array<MonthCellData | null>(7).fill(null));
            let monthTotal = 0;
            let activeDays = 0;
            let peakValue: number | null = null;
            const monthCardColorCounts = new Map<string, number>();

            for (let day = 1; day <= monthEnd.getDate(); day++) {
                const date = new Date(year, month, day);
                const slot = startOffset + day - 1;
                const rowIndex = Math.floor(slot / 7);
                const columnIndex = slot % 7;
                const dayValue = aggregatedValues.get(this.getDateKey(date));
                const value = dayValue?.hasValue ? dayValue.total : null;

                if (value !== null) {
                    monthTotal += value;
                    activeDays += 1;
                    peakValue = peakValue === null ? value : Math.max(peakValue, value);
                }

                if (dayValue?.monthCardOverrideColor) {
                    monthCardColorCounts.set(
                        dayValue.monthCardOverrideColor,
                        (monthCardColorCounts.get(dayValue.monthCardOverrideColor) ?? 0) + 1
                    );
                }

                weeks[rowIndex][columnIndex] = {
                    key: dayValue?.key ?? this.getDateKey(date),
                    date,
                    dayOfMonth: day,
                    value,
                    formattedValue: value === null ? "No data" : this.formatNumber(value),
                    dataLabelText: value === null ? "" : this.formatDataLabelValue(value),
                    color: dayValue?.overrideColor ?? this.getDefaultCellColor(value),
                    selectionId: dayValue?.selectionId ?? null,
                    isSelected: dayValue?.key === this.activeDayKey,
                    monthLabel: monthStart.toLocaleDateString(undefined, { month: "long", year: "numeric" })
                };
            }

            months.push({
                key: monthKey,
                title: monthStart.toLocaleDateString(undefined, { month: "long", year: "numeric" }),
                weeks,
                summary: {
                    total: monthTotal,
                    activeDays,
                    peakValue
                },
                isSelected: this.activeMonthKey === monthKey && !this.activeDayKey,
                cardColor: this.getDominantColor(monthCardColorCounts)
            });
        }

        return months;
    }

    private renderCalendar(months: MonthData[], metricName: string, aggregatedValues: Map<string, AggregatedDayValue>): void {
        this.root.replaceChildren();

        if (this.formattingSettings.headerCard.showHeader.value) {
            const header = document.createElement("div");
            header.className = "calendar-heatmap__header";

            const titleBlock = document.createElement("div");
            const title = document.createElement("h2");
            title.className = "calendar-heatmap__title";
            title.textContent = this.lastHeaderContent?.title || this.getHeaderTitle();

            const subtitle = document.createElement("p");
            subtitle.className = "calendar-heatmap__subtitle";
            subtitle.textContent = this.lastHeaderContent?.subtitle || this.getHeaderSubtitle(aggregatedValues);

            titleBlock.appendChild(title);
            if (subtitle.textContent) {
                titleBlock.appendChild(subtitle);
            }
            header.appendChild(titleBlock);

            if (this.formattingSettings.legendCard.showLegend.value) {
                header.appendChild(this.createLegend(metricName, aggregatedValues));
            }

            this.root.appendChild(header);
        } else if (this.formattingSettings.legendCard.showLegend.value) {
            const legendOnlyRow = document.createElement("div");
            legendOnlyRow.className = "calendar-heatmap__header calendar-heatmap__header--legend-only";
            legendOnlyRow.appendChild(this.createLegend(metricName, aggregatedValues));
            this.root.appendChild(legendOnlyRow);
        }

        const monthsGrid = document.createElement("div");
        monthsGrid.className = "calendar-heatmap__months";
        monthsGrid.classList.toggle("calendar-heatmap__months--single", months.length === 1);

        const weekdayLabels = this.formattingSettings.layoutCard.mondayFirst.value
            ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        months.forEach(month => {
            const monthCard = document.createElement("section");
            monthCard.className = "calendar-heatmap__month";
            monthCard.classList.toggle("calendar-heatmap__month--selected", month.isSelected);
            if (month.cardColor) {
                monthCard.style.background = this.getGlassSurface(month.cardColor);
                monthCard.style.borderColor = this.getColorWithAlpha(month.cardColor, 0.34);
            }

            const monthHeader = document.createElement("div");
            monthHeader.className = "calendar-heatmap__month-header";
            monthHeader.tabIndex = 0;
            monthHeader.setAttribute("role", "button");
            monthHeader.setAttribute("aria-label", `Filter report to ${month.title}`);
            monthHeader.addEventListener("click", () => {
                this.handleMonthSelection(month);
            });
            monthHeader.addEventListener("keydown", (event: KeyboardEvent) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    this.handleMonthSelection(month);
                }
            });

            const monthTitle = document.createElement("h3");
            monthTitle.className = "calendar-heatmap__month-title";
            monthTitle.textContent = month.title;

            monthHeader.appendChild(monthTitle);

            if (this.formattingSettings.layoutCard.showMonthSummary.value) {
                monthHeader.appendChild(this.createMonthSummary(month.summary));
            }

            monthCard.appendChild(monthHeader);

            if (this.formattingSettings.layoutCard.showWeekdayLabels.value) {
                const weekdayRow = document.createElement("div");
                weekdayRow.className = "calendar-heatmap__weekday-row";

                weekdayLabels.forEach(label => {
                    const weekday = document.createElement("span");
                    weekday.className = "calendar-heatmap__weekday";
                    weekday.textContent = label;
                    weekdayRow.appendChild(weekday);
                });

                monthCard.appendChild(weekdayRow);
            }

            const monthGrid = document.createElement("div");
            monthGrid.className = "calendar-heatmap__grid";

            month.weeks.forEach(week => {
                week.forEach(cellData => {
                    const cell = document.createElement("div");
                    cell.className = "calendar-heatmap__cell";

                    if (!cellData) {
                        cell.classList.add("calendar-heatmap__cell--empty");
                    } else {
                        cell.style.backgroundColor = cellData.color;
                        cell.classList.toggle("calendar-heatmap__cell--selected", cellData.isSelected);
                        cell.title = `${cellData.date.toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                        })}\n${metricName}: ${cellData.formattedValue}`;
                        cell.tabIndex = 0;
                        cell.setAttribute("role", "button");
                        cell.setAttribute(
                            "aria-label",
                            `${cellData.monthLabel}, day ${cellData.dayOfMonth}. ${metricName}: ${cellData.formattedValue}.`
                        );
                        cell.addEventListener("click", (event: MouseEvent) => {
                            event.stopPropagation();
                            this.handleDaySelection(cellData);
                        });
                        cell.addEventListener("keydown", (event: KeyboardEvent) => {
                            if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                event.stopPropagation();
                                this.handleDaySelection(cellData);
                            }
                        });
                        cell.addEventListener("contextmenu", (event: MouseEvent) => {
                            this.selectionManager.showContextMenu(
                                cellData.selectionId ?? ({} as ISelectionId),
                                { x: event.clientX, y: event.clientY }
                            );
                            event.preventDefault();
                            event.stopPropagation();
                        });

                        const dayLabel = document.createElement("span");
                        dayLabel.className = "calendar-heatmap__day-label";
                        dayLabel.textContent = cellData.dayOfMonth.toString();
                        const readableColor = this.getReadableTextColor(
                            cellData.isSelected ? this.getSelectionAccentColor() : cellData.color
                        );
                        dayLabel.style.color = readableColor;
                        cell.appendChild(dayLabel);

                        if (this.shouldRenderDataLabel(cellData)) {
                            const valueLabel = document.createElement("span");
                            valueLabel.className = "calendar-heatmap__value-label";
                            valueLabel.textContent = cellData.dataLabelText;
                            valueLabel.style.color = readableColor;
                            cell.appendChild(valueLabel);
                        }
                    }

                    monthGrid.appendChild(cell);
                });
            });

            monthCard.appendChild(monthGrid);
            monthsGrid.appendChild(monthCard);
        });

        this.root.appendChild(monthsGrid);
    }

    private renderEmptyState(message: string): void {
        this.root.replaceChildren();

        const emptyState = document.createElement("div");
        emptyState.className = "calendar-heatmap__empty";

        if (this.formattingSettings.headerCard.showHeader.value) {
            const title = document.createElement("h2");
            title.className = "calendar-heatmap__title";
            title.textContent = this.lastHeaderContent?.title || this.getHeaderTitle();

            const body = document.createElement("p");
            body.className = "calendar-heatmap__subtitle";
            body.textContent = message;
            emptyState.append(title, body);
        } else {
            const body = document.createElement("p");
            body.className = "calendar-heatmap__subtitle";
            body.textContent = message;
            emptyState.appendChild(body);
        }

        this.root.appendChild(emptyState);
    }

    private renderCurrentState(): void {
        if (!this.lastMetricName || !this.lastAggregatedValues || !this.lastHeaderContent) {
            return;
        }

        const months = this.buildMonthData(this.lastAggregatedValues);
        this.renderCalendar(months, this.lastMetricName, this.lastAggregatedValues);
    }

    private createLegend(metricName: string, aggregatedValues: Map<string, AggregatedDayValue>): HTMLElement {
        const legend = document.createElement("div");
        legend.className = "calendar-heatmap__legend";

        const values = Array.from(aggregatedValues.values())
            .filter(item => item.hasValue)
            .map(item => item.total);

        const minValue = values.length > 0 ? Math.min(...values) : 0;
        const maxValue = values.length > 0 ? Math.max(...values) : 0;

        const label = document.createElement("span");
        label.className = "calendar-heatmap__legend-label";
        label.textContent = metricName;

        const swatch = document.createElement("div");
        swatch.className = "calendar-heatmap__legend-swatch";
        swatch.style.background = this.visualHost.colorPalette.isHighContrast
            ? this.visualHost.colorPalette.foreground.value
            : "linear-gradient(90deg, #dbeafe, #1d4ed8)";

        const range = document.createElement("div");
        range.className = "calendar-heatmap__legend-range";
        range.textContent = `${this.formatNumber(minValue)} - ${this.formatNumber(maxValue)}`;

        legend.append(label, swatch, range);
        return legend;
    }

    private getHeaderTitle(): string {
        const title = this.formattingSettings.headerCard.titleText.value?.trim();
        return title || "Calendar Heatmap";
    }

    private getHeaderSubtitle(aggregatedValues: Map<string, AggregatedDayValue>): string {
        const customSubtitle = this.formattingSettings.headerCard.subtitleText.value?.trim();
        if (customSubtitle) {
            return customSubtitle;
        }

        return `${aggregatedValues.size} date${aggregatedValues.size === 1 ? "" : "s"} visible. Filter the report to a month and the visual focuses on that month automatically.`;
    }

    private buildHeaderContent(
        valueColumns: powerbi.DataViewValueColumns | undefined,
        aggregatedValues: Map<string, AggregatedDayValue>
    ): HeaderContent {
        const dynamicTitle = this.getDynamicTextByRole(valueColumns, "headerTitle");
        const dynamicSubtitle = this.getDynamicTextByRole(valueColumns, "headerSubtitle");

        return {
            title: dynamicTitle || this.getHeaderTitle(),
            subtitle: dynamicSubtitle || this.getHeaderSubtitle(aggregatedValues)
        };
    }

    private getDynamicTextByRole(
        valueColumns: powerbi.DataViewValueColumns | undefined,
        roleName: string
    ): string {
        const column = this.getMeasureColumnByRole(valueColumns, roleName);
        if (!column) {
            return "";
        }

        const firstValue = column.values?.find(value => value !== null && value !== undefined);
        if (firstValue === null || firstValue === undefined) {
            return "";
        }

        return String(firstValue).trim();
    }

    private getMeasureColumnByRole(
        valueColumns: powerbi.DataViewValueColumns | undefined,
        roleName: string
    ): powerbi.DataViewValueColumn | undefined {
        return valueColumns?.find(column => Boolean(column.source.roles?.[roleName]));
    }

    private createMonthSummary(summary: MonthSummaryData): HTMLElement {
        const summaryRow = document.createElement("div");
        summaryRow.className = "calendar-heatmap__summary";

        const total = document.createElement("span");
        total.className = "calendar-heatmap__summary-chip";
        total.textContent = `Total: ${this.formatNumber(summary.total)}`;

        const activeDays = document.createElement("span");
        activeDays.className = "calendar-heatmap__summary-chip";
        activeDays.textContent = `Active days: ${summary.activeDays}`;

        summaryRow.append(total, activeDays);

        if (summary.peakValue !== null) {
            const peak = document.createElement("span");
            peak.className = "calendar-heatmap__summary-chip";
            peak.textContent = `Peak: ${this.formatNumber(summary.peakValue)}`;
            summaryRow.appendChild(peak);
        }

        return summaryRow;
    }

    private handleRootContextMenu(): void {
        this.root.addEventListener("contextmenu", (event: MouseEvent) => {
            this.selectionManager.showContextMenu({} as ISelectionId, {
                x: event.clientX,
                y: event.clientY
            });
            event.preventDefault();
        });
    }

    private handleBackgroundClear(): void {
        this.root.addEventListener("click", (event: MouseEvent) => {
            if (event.target === this.root) {
                this.clearVisualFilter();
            }
        });
    }

    private handleDaySelection(cellData: MonthCellData): void {
        if (!this.activeFilterTarget) {
            return;
        }

        if (this.activeDayKey === cellData.key) {
            this.clearVisualFilter();
            return;
        }

        this.activeDayKey = cellData.key;
        this.activeMonthKey = this.getMonthKey(cellData.date);
        this.renderCurrentState();

        const dayStart = new Date(cellData.date.getFullYear(), cellData.date.getMonth(), cellData.date.getDate());
        const dayEnd = new Date(cellData.date.getFullYear(), cellData.date.getMonth(), cellData.date.getDate() + 1);
        const filter = new AdvancedFilter(
            this.activeFilterTarget,
            "And",
            { operator: "GreaterThanOrEqual", value: dayStart },
            { operator: "LessThan", value: dayEnd }
        ).toJSON();

        this.visualHost.applyJsonFilter(filter, "general", "filter", powerbi.FilterAction.merge);
    }

    private handleMonthSelection(month: MonthData): void {
        if (!this.activeFilterTarget) {
            return;
        }

        if (this.activeMonthKey === month.key && !this.activeDayKey) {
            this.clearVisualFilter();
            return;
        }

        this.activeDayKey = null;
        this.activeMonthKey = month.key;
        this.renderCurrentState();

        const [yearText, monthText] = month.key.split("-");
        const year = Number.parseInt(yearText, 10);
        const monthIndex = Number.parseInt(monthText, 10) - 1;
        const monthStart = new Date(year, monthIndex, 1);
        const nextMonthStart = new Date(year, monthIndex + 1, 1);
        const filter = new AdvancedFilter(
            this.activeFilterTarget,
            "And",
            { operator: "GreaterThanOrEqual", value: monthStart },
            { operator: "LessThan", value: nextMonthStart }
        ).toJSON();

        this.visualHost.applyJsonFilter(filter, "general", "filter", powerbi.FilterAction.merge);
    }

    private clearVisualFilter(): void {
        this.activeDayKey = null;
        this.activeMonthKey = null;
        this.renderCurrentState();
        this.visualHost.applyJsonFilter(null, "general", "filter", powerbi.FilterAction.merge);
    }

    private syncActiveFilterState(
        filters: powerbi.IFilter[] | undefined,
        aggregatedValues: Map<string, AggregatedDayValue>,
        isDataFilterApplied: boolean | undefined
    ): void {
        this.activeDayKey = null;
        this.activeMonthKey = null;

        const matchingFilter = filters?.find(filter => this.isMatchingDateFilter(filter));
        if (matchingFilter) {
            const filterState = this.getFilterStateFromFilter(matchingFilter);
            this.activeDayKey = filterState.dayKey;
            this.activeMonthKey = filterState.monthKey;
            return;
        }

        if (!isDataFilterApplied) {
            return;
        }

        if (this.activeDayKey && aggregatedValues.has(this.activeDayKey)) {
            const selectedDay = aggregatedValues.get(this.activeDayKey);
            this.activeMonthKey = selectedDay ? this.getMonthKey(selectedDay.date) : this.activeMonthKey;
            return;
        }

        if (this.activeMonthKey) {
            const hasActiveMonth = Array.from(aggregatedValues.values()).some(item => this.getMonthKey(item.date) === this.activeMonthKey);
            if (hasActiveMonth) {
                return;
            }
        }

        const monthKeys = Array.from(new Set(Array.from(aggregatedValues.values()).map(item => this.getMonthKey(item.date))));
        if (monthKeys.length === 1) {
            this.activeMonthKey = monthKeys[0];
        }
        if (aggregatedValues.size === 1) {
            const onlyDate = Array.from(aggregatedValues.values())[0];
            this.activeDayKey = onlyDate.key;
            this.activeMonthKey = this.getMonthKey(onlyDate.date);
        }
    }

    private isMatchingDateFilter(filter: powerbi.IFilter): boolean {
        if (!this.activeFilterTarget) {
            return false;
        }

        const target = (filter as unknown as { target?: IFilterTarget }).target;
        if (!target || !("table" in target) || !("column" in target)) {
            return false;
        }

        return target.table === this.activeFilterTarget.table && target.column === this.activeFilterTarget.column;
    }

    private getFilterStateFromFilter(filter: powerbi.IFilter): { dayKey: string | null; monthKey: string | null } {
        if ((filter as IAdvancedFilter).conditions) {
            return this.getStateFromAdvancedFilter(filter as unknown as IAdvancedFilter);
        }

        if ((filter as IBasicFilter).values) {
            return this.getStateFromBasicFilter(filter as unknown as IBasicFilter);
        }

        return { dayKey: null, monthKey: null };
    }

    private getStateFromAdvancedFilter(filter: IAdvancedFilter): { dayKey: string | null; monthKey: string | null } {
        const lowerBound = filter.conditions.find(condition => condition.operator === "GreaterThanOrEqual" || condition.operator === "GreaterThan");
        const upperBound = filter.conditions.find(condition => condition.operator === "LessThan" || condition.operator === "LessThanOrEqual");
        const start = this.toDate(lowerBound?.value);
        const end = this.toDate(upperBound?.value);

        if (!start || !end) {
            return { dayKey: null, monthKey: null };
        }

        const normalizedStart = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const normalizedEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());
        const dayDifference = Math.round((normalizedEnd.getTime() - normalizedStart.getTime()) / 86400000);

        if (dayDifference === 1) {
            return {
                dayKey: this.getDateKey(normalizedStart),
                monthKey: this.getMonthKey(normalizedStart)
            };
        }

        if (
            normalizedStart.getDate() === 1 &&
            normalizedEnd.getDate() === 1 &&
            normalizedEnd.getFullYear() * 12 + normalizedEnd.getMonth() === normalizedStart.getFullYear() * 12 + normalizedStart.getMonth() + 1
        ) {
            return {
                dayKey: null,
                monthKey: this.getMonthKey(normalizedStart)
            };
        }

        return { dayKey: null, monthKey: null };
    }

    private getStateFromBasicFilter(filter: IBasicFilter): { dayKey: string | null; monthKey: string | null } {
        if (filter.operator !== "In" || filter.values.length !== 1) {
            return { dayKey: null, monthKey: null };
        }

        const date = this.toDate(filter.values[0]);
        if (!date) {
            return { dayKey: null, monthKey: null };
        }

        const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return {
            dayKey: this.getDateKey(normalizedDate),
            monthKey: this.getMonthKey(normalizedDate)
        };
    }

    private coerceDate(value: powerbi.PrimitiveValue): Date | null {
        if (value === null || value === undefined) {
            return null;
        }

        const date = value instanceof Date ? value : new Date(value as string | number);
        if (Number.isNaN(date.getTime())) {
            return null;
        }

        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    private getDateKey(date: Date): string {
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, "0");
        const day = `${date.getDate()}`.padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    private getMonthKey(date: Date): string {
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, "0");
        return `${year}-${month}`;
    }

    private getFilterTarget(column: powerbi.DataViewMetadataColumn): IFilterColumnTarget | null {
        const queryName = column.queryName;
        if (!queryName) {
            return null;
        }

        const separatorIndex = Math.max(queryName.lastIndexOf("."), queryName.lastIndexOf("/"));
        if (separatorIndex <= 0 || separatorIndex >= queryName.length - 1) {
            return null;
        }

        return {
            table: queryName.slice(0, separatorIndex),
            column: queryName.slice(separatorIndex + 1)
        };
    }

    private getCalendarColumn(date: Date, mondayFirst: boolean): number {
        const weekDay = date.getDay();
        return mondayFirst ? (weekDay + 6) % 7 : weekDay;
    }

    private getDefaultCellColor(value: number | null): string {
        if (this.visualHost.colorPalette.isHighContrast) {
            return value === null
                ? this.visualHost.colorPalette.background.value
                : this.visualHost.colorPalette.foreground.value;
        }

        if (value === null) {
            return "#f3f4f6";
        }

        return "#1d4ed8";
    }

    private getSelectionAccentColor(): string {
        if (this.visualHost.colorPalette.isHighContrast) {
            return this.visualHost.colorPalette.foreground.value;
        }

        return this.visualHost.colorPalette.selection?.value || "#f59e0b";
    }

    private getDominantColor(colorCounts: Map<string, number>): string | null {
        let dominantColor: string | null = null;
        let dominantCount = -1;

        colorCounts.forEach((count, color) => {
            if (count > dominantCount) {
                dominantColor = color;
                dominantCount = count;
            }
        });

        return dominantColor;
    }

    private getGlassSurface(color: string): string {
        if (this.visualHost.colorPalette.isHighContrast) {
            return this.visualHost.colorPalette.background.value;
        }

        const topTint = this.getColorWithAlpha(color, 0.24);
        const bottomTint = this.getColorWithAlpha(color, 0.14);
        return `linear-gradient(180deg, ${topTint} 0%, ${bottomTint} 100%), var(--surface-background-strong)`;
    }

    private hexToRgb(hex: string): { red: number; green: number; blue: number } {
        const cleanedHex = hex.replace("#", "").trim();
        const normalizedHex = cleanedHex.length === 3
            ? cleanedHex.split("").map(value => `${value}${value}`).join("")
            : cleanedHex;

        const parsedHex = Number.parseInt(normalizedHex, 16);
        return {
            red: (parsedHex >> 16) & 255,
            green: (parsedHex >> 8) & 255,
            blue: parsedHex & 255
        };
    }

    private colorToRgb(color: string): { red: number; green: number; blue: number } {
        return color.startsWith("#") ? this.hexToRgb(color) : this.rgbStringToObject(color);
    }

    private getReadableTextColor(backgroundColor: string): string {
        if (this.visualHost.colorPalette.isHighContrast) {
            return this.visualHost.colorPalette.background.value;
        }

        const rgb = this.colorToRgb(backgroundColor);
        const luminance = (rgb.red * 299 + rgb.green * 587 + rgb.blue * 114) / 1000;
        return luminance >= 150 ? "#1f2937" : "#ffffff";
    }

    private rgbStringToObject(color: string): { red: number; green: number; blue: number } {
        const matches = color.match(/\d+/g) ?? ["0", "0", "0"];
        return {
            red: Number.parseInt(matches[0], 10),
            green: Number.parseInt(matches[1], 10),
            blue: Number.parseInt(matches[2], 10)
        };
    }

    private hexToRgba(hex: string, alpha: number): string {
        const rgb = this.hexToRgb(hex);
        return `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${alpha})`;
    }

    private getColorWithAlpha(color: string, alpha: number): string {
        const rgb = this.colorToRgb(color);
        return `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${alpha})`;
    }

    private formatNumber(value: number): string {
        return new Intl.NumberFormat(undefined, {
            maximumFractionDigits: 2
        }).format(value);
    }

    private formatDataLabelValue(value: number): string {
        const dataLabels = this.formattingSettings.dataLabelsCard;
        const decimalPlaces = Math.max(0, Math.min(3, dataLabels.decimalPlaces.value));
        const selectedUnit = dataLabels.displayUnits.value?.value?.toString() ?? "auto";

        const resolvedUnit = selectedUnit === "auto" ? this.getAutoDisplayUnit(value) : selectedUnit;
        const unitConfig = this.getDisplayUnitConfig(resolvedUnit);
        const scaledValue = value / unitConfig.divisor;

        return `${new Intl.NumberFormat(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: decimalPlaces
        }).format(scaledValue)}${unitConfig.suffix}`;
    }

    private getAutoDisplayUnit(value: number): string {
        const absoluteValue = Math.abs(value);

        if (absoluteValue >= 1_000_000_000) {
            return "billions";
        }

        if (absoluteValue >= 1_000_000) {
            return "millions";
        }

        if (absoluteValue >= 1_000) {
            return "thousands";
        }

        return "none";
    }

    private getDisplayUnitConfig(unit: string): { divisor: number; suffix: string } {
        switch (unit) {
            case "billions":
                return { divisor: 1_000_000_000, suffix: "B" };
            case "millions":
                return { divisor: 1_000_000, suffix: "M" };
            case "thousands":
                return { divisor: 1_000, suffix: "K" };
            default:
                return { divisor: 1, suffix: "" };
        }
    }

    private shouldRenderDataLabel(cellData: MonthCellData): boolean {
        if (!this.formattingSettings.dataLabelsCard.showDataLabels.value || cellData.value === null) {
            return false;
        }

        const minimumCellSize = Math.max(30, Math.ceil(this.effectiveDataLabelSize * 2.7));
        return this.effectiveCellSize >= minimumCellSize;
    }

    private toDate(value: string | number | boolean | Date | undefined): Date | null {
        if (value === undefined || value === null || typeof value === "boolean") {
            return null;
        }

        const date = value instanceof Date ? value : new Date(value);
        return Number.isNaN(date.getTime()) ? null : date;
    }
}

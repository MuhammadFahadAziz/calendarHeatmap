/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";

import powerbi from "powerbi-visuals-api";
import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import { dataViewWildcard } from "powerbi-visuals-utils-dataviewutils";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;

class HeaderCardSettings extends FormattingSettingsCard {
    showHeader = new formattingSettings.ToggleSwitch({
        name: "showHeader",
        displayName: "Show header",
        value: true
    });

    titleText = new formattingSettings.TextInput({
        name: "titleText",
        displayName: "Title",
        value: "Calendar Heatmap",
        placeholder: "Calendar Heatmap"
    });

    subtitleText = new formattingSettings.TextArea({
        name: "subtitleText",
        displayName: "Subtitle",
        value: "",
        placeholder: "Leave blank to use the automatic subtitle"
    });

    titleSize = new formattingSettings.NumUpDown({
        name: "titleSize",
        displayName: "Title size",
        value: 22
    });

    titleColor = new formattingSettings.ColorPicker({
        name: "titleColor",
        displayName: "Title color",
        value: { value: "#111827" }
    });

    subtitleSize = new formattingSettings.NumUpDown({
        name: "subtitleSize",
        displayName: "Subtitle size",
        value: 13
    });

    subtitleColor = new formattingSettings.ColorPicker({
        name: "subtitleColor",
        displayName: "Subtitle color",
        value: { value: "#4b5563" }
    });

    name: string = "header";
    displayName: string = "Header";
    topLevelSlice = this.showHeader;
    slices: Array<FormattingSettingsSlice> = [
        this.titleText,
        this.subtitleText,
        this.titleSize,
        this.titleColor,
        this.subtitleSize,
        this.subtitleColor
    ];
}

class LayoutCardSettings extends FormattingSettingsCard {
    mondayFirst = new formattingSettings.ToggleSwitch({
        name: "mondayFirst",
        displayName: "Week starts on Monday",
        value: true
    });

    cellSize = new formattingSettings.NumUpDown({
        name: "cellSize",
        displayName: "Cell size",
        value: 26
    });

    cellGap = new formattingSettings.NumUpDown({
        name: "cellGap",
        displayName: "Cell gap",
        value: 4
    });

    fontSize = new formattingSettings.NumUpDown({
        name: "fontSize",
        displayName: "Label size",
        value: 11
    });

    monthTitleSize = new formattingSettings.NumUpDown({
        name: "monthTitleSize",
        displayName: "Month title size",
        value: 16,
        options: {
            minValue: {
                type: powerbi.visuals.ValidatorType.Min,
                value: 10
            },
            maxValue: {
                type: powerbi.visuals.ValidatorType.Max,
                value: 32
            }
        }
    });

    showWeekdayLabels = new formattingSettings.ToggleSwitch({
        name: "showWeekdayLabels",
        displayName: "Show weekday labels",
        value: true
    });

    showMonthSummary = new formattingSettings.ToggleSwitch({
        name: "showMonthSummary",
        displayName: "Show month summary",
        value: true
    });

    labelColor = new formattingSettings.ColorPicker({
        name: "labelColor",
        displayName: "Label color",
        value: { value: "#4b5563" }
    });

    borderColor = new formattingSettings.ColorPicker({
        name: "borderColor",
        displayName: "Border color",
        value: { value: "#d7dce3" }
    });

    name: string = "layout";
    displayName: string = "Layout";
    slices: Array<FormattingSettingsSlice> = [
        this.mondayFirst,
        this.cellSize,
        this.cellGap,
        this.fontSize,
        this.monthTitleSize,
        this.showWeekdayLabels,
        this.showMonthSummary,
        this.labelColor,
        this.borderColor
    ];
}

class ColorCardSettings extends FormattingSettingsCard {
    monthCardColor = new formattingSettings.ColorPicker({
        name: "monthCardColor",
        displayName: "Month card color",
        description: "Supports Power BI fx for month-card tinting. Best results come from returning one consistent color per month.",
        value: { value: "#dbeafe" },
        selector: dataViewWildcard.createDataViewWildcardSelector(dataViewWildcard.DataViewWildcardMatchingOption.InstancesAndTotals),
        instanceKind: powerbi.VisualEnumerationInstanceKinds.ConstantOrRule
    });

    dayColor = new formattingSettings.ColorPicker({
        name: "dayColor",
        displayName: "Day color",
        description: "Supports Power BI fx for gradient, rules, and field-value colors.",
        value: { value: "#1d4ed8" },
        selector: dataViewWildcard.createDataViewWildcardSelector(dataViewWildcard.DataViewWildcardMatchingOption.InstancesAndTotals),
        instanceKind: powerbi.VisualEnumerationInstanceKinds.ConstantOrRule
    });

    name: string = "colors";
    displayName: string = "Colors";
    slices: Array<FormattingSettingsSlice> = [this.monthCardColor, this.dayColor];
}

class LegendCardSettings extends FormattingSettingsCard {
    showLegend = new formattingSettings.ToggleSwitch({
        name: "showLegend",
        displayName: "Show legend",
        value: true
    });

    legendTitle = new formattingSettings.TextInput({
        name: "legendTitle",
        displayName: "Legend title",
        value: "",
        placeholder: "Leave blank to use the measure name"
    });

    showRange = new formattingSettings.ToggleSwitch({
        name: "showRange",
        displayName: "Show value range",
        value: true
    });

    fontSize = new formattingSettings.NumUpDown({
        name: "fontSize",
        displayName: "Text size",
        value: 12,
        options: {
            minValue: {
                type: powerbi.visuals.ValidatorType.Min,
                value: 8
            },
            maxValue: {
                type: powerbi.visuals.ValidatorType.Max,
                value: 24
            }
        }
    });

    textColor = new formattingSettings.ColorPicker({
        name: "textColor",
        displayName: "Text color",
        value: { value: "#4b5563" }
    });

    startColor = new formattingSettings.ColorPicker({
        name: "startColor",
        displayName: "Start color",
        value: { value: "#dbeafe" }
    });

    endColor = new formattingSettings.ColorPicker({
        name: "endColor",
        displayName: "End color",
        value: { value: "#1d4ed8" }
    });

    name: string = "legend";
    displayName: string = "Legend";
    topLevelSlice = this.showLegend;
    slices: Array<FormattingSettingsSlice> = [
        this.legendTitle,
        this.showRange,
        this.fontSize,
        this.textColor,
        this.startColor,
        this.endColor
    ];
}

class DataLabelsCardSettings extends FormattingSettingsCard {
    showDataLabels = new formattingSettings.ToggleSwitch({
        name: "showDataLabels",
        displayName: "Show data labels",
        value: false
    });

    dataLabelSize = new formattingSettings.NumUpDown({
        name: "dataLabelSize",
        displayName: "Data label size",
        value: 10,
        options: {
            minValue: {
                type: powerbi.visuals.ValidatorType.Min,
                value: 8
            },
            maxValue: {
                type: powerbi.visuals.ValidatorType.Max,
                value: 16
            }
        }
    });

    displayUnits = new formattingSettings.ItemDropdown({
        name: "displayUnits",
        displayName: "Display units",
        items: [
            { value: "auto", displayName: "Auto" },
            { value: "none", displayName: "None" },
            { value: "thousands", displayName: "Thousands (K)" },
            { value: "millions", displayName: "Millions (M)" },
            { value: "billions", displayName: "Billions (B)" }
        ],
        value: { value: "auto", displayName: "Auto" }
    });

    decimalPlaces = new formattingSettings.NumUpDown({
        name: "decimalPlaces",
        displayName: "Decimal places",
        value: 1,
        options: {
            minValue: {
                type: powerbi.visuals.ValidatorType.Min,
                value: 0
            },
            maxValue: {
                type: powerbi.visuals.ValidatorType.Max,
                value: 3
            }
        }
    });

    name: string = "dataLabels";
    displayName: string = "Data labels";
    topLevelSlice = this.showDataLabels;
    slices: Array<FormattingSettingsSlice> = [this.dataLabelSize, this.displayUnits, this.decimalPlaces];
}

/**
* visual settings model class
*
*/
export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    headerCard = new HeaderCardSettings();
    layoutCard = new LayoutCardSettings();
    colorCard = new ColorCardSettings();
    legendCard = new LegendCardSettings();
    dataLabelsCard = new DataLabelsCardSettings();

    cards = [this.headerCard, this.layoutCard, this.colorCard, this.legendCard, this.dataLabelsCard];
}

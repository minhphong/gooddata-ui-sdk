// (C) 2020-2023 GoodData Corporation

import { FeatureFlagsValues, ITigerFeatureFlags, TigerFeaturesNames } from "../uiFeatures";
import { convertState } from "./state";

export type FeatureDef = {
    id: string;
    key: string;
    l: boolean;
    version: string;
    type: "BOOLEAN" | "STRING" | "NUMBER" | "JSON";
    value: any;
};

export type FeaturesMap = Record<string, FeatureDef>;

export function mapFeatures(features: FeaturesMap): Partial<ITigerFeatureFlags> {
    return {
        ...loadFeature(
            features,
            TigerFeaturesNames.EnableKPIDashboardExportPDF,
            "enableKPIDashboardExportPDF",
            "BOOLEAN",
            FeatureFlagsValues.enableKPIDashboardExportPDF,
        ),
        ...loadFeature(
            features,
            TigerFeaturesNames.EnableSortingByTotalGroup,
            "enableSortingByTotalGroup",
            "BOOLEAN",
            FeatureFlagsValues.enableSortingByTotalGroup,
        ),
        ...loadFeature(
            features,
            TigerFeaturesNames.ADMeasureValueFilterNullAsZeroOption,
            "ADMeasureValueFilterNullAsZeroOption",
            "STRING",
            FeatureFlagsValues.ADMeasureValueFilterNullAsZeroOption,
        ),
        ...loadFeature(
            features,
            TigerFeaturesNames.EnableMultipleDates,
            "enableMultipleDates",
            "BOOLEAN",
            FeatureFlagsValues.enableMultipleDates,
        ),
        ...loadFeature(
            features,
            TigerFeaturesNames.EnableKPIDashboardDeleteFilterButton,
            "enableKPIDashboardDeleteFilterButton",
            "BOOLEAN",
            FeatureFlagsValues.enableKPIDashboardDeleteFilterButton,
        ),
        ...loadFeature(
            features,
            TigerFeaturesNames.DashboardEditModeDevRollout,
            "dashboardEditModeDevRollout",
            "BOOLEAN",
            FeatureFlagsValues.dashboardEditModeDevRollout,
        ),
        ...loadFeature(
            features,
            TigerFeaturesNames.EnableMetricSqlAndDataExplain,
            "enableMetricSqlAndDataExplain",
            "BOOLEAN",
            FeatureFlagsValues.enableMetricSqlAndDataExplain,
        ),
        ...loadFeature(
            features,
            TigerFeaturesNames.EnableLongitudeAndLatitudeLabels,
            "enableLongitudeAndLatitudeLabels",
            "BOOLEAN",
            FeatureFlagsValues.enableLongitudeAndLatitudeLabels,
        ),
        ...loadFeature(
            features,
            TigerFeaturesNames.EnableDescriptions,
            "enableDescriptions",
            "BOOLEAN",
            FeatureFlagsValues.enableDescriptions,
        ),
        ...loadFeature(
            features,
            TigerFeaturesNames.EnableAnalyticalDashboardPermissions,
            "enableAnalyticalDashboardPermissions",
            "BOOLEAN",
            FeatureFlagsValues.enableAnalyticalDashboardPermissions,
        ),
        ...loadFeature(
            features,
            TigerFeaturesNames.EnablePushpinGeoChart,
            "enablePushpinGeoChart",
            "BOOLEAN",
            FeatureFlagsValues.enablePushpinGeoChart,
        ),
        ...loadFeature(
            features,
            TigerFeaturesNames.EnableKPIAttributeFilterRenaming,
            "enableKPIAttributeFilterRenaming",
            "BOOLEAN",
            FeatureFlagsValues.enableKPIAttributeFilterRenaming,
        ),
        ...loadFeature(
            features,
            TigerFeaturesNames.EnableSqlDatasets,
            "enableSqlDatasets",
            "BOOLEAN",
            FeatureFlagsValues.enableSqlDatasets,
        ),
    };
}

function loadFeature(
    features: FeaturesMap,
    feature: TigerFeaturesNames,
    name: keyof ITigerFeatureFlags,
    outputType: "STRING" | "BOOLEAN",
    possibleValues: readonly any[],
) {
    const item = features[feature];

    if (!item) {
        return {};
    }

    const val = getValueByType(item.type, item.value, outputType, possibleValues);
    return val !== undefined ? { [name]: val } : {};
}

function getValueByType(
    inputType: FeatureDef["type"],
    value: FeatureDef["value"],
    outputType: "STRING" | "BOOLEAN",
    possibleValues: readonly any[],
) {
    switch (inputType) {
        case "BOOLEAN":
            if (value !== undefined) {
                return value;
            }
            break;
        case "STRING": {
            const state = convertState(outputType, possibleValues, value);
            if (state !== undefined) {
                return state;
            }
            break;
        }
        default:
            break;
    }
    return undefined;
}

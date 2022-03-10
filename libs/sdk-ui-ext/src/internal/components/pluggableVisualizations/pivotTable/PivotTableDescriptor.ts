// (C) 2021-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import {
    bucketAttributes,
    bucketMeasures,
    IInsight,
    IInsightDefinition,
    insightBucket,
    insightFilters,
    insightProperties,
    insightSanitize,
    insightSorts,
    insightTotals,
    VisualizationProperties,
} from "@gooddata/sdk-model";
import {
    IColumnSizing,
    IPivotTableConfig,
    IPivotTableProps,
    pivotTableMenuForCapabilities,
} from "@gooddata/sdk-ui-pivot";
import { BucketNames } from "@gooddata/sdk-ui";
import { ISettings } from "@gooddata/sdk-backend-spi";

import {
    IEmbeddingCodeContext,
    IVisualizationSizeInfo,
    PluggableVisualizationFactory,
} from "../../../interfaces/VisualizationDescriptor";
import { IFluidLayoutDescriptor } from "../../../interfaces/LayoutDescriptor";
import { PluggablePivotTable } from "./PluggablePivotTable";
import { BaseChartDescriptor } from "../baseChart/BaseChartDescriptor";
import { IDrillDownContext } from "../../../interfaces/Visualization";
import {
    addIntersectionFiltersToInsight,
    modifyBucketsAttributesForDrillDown,
    sanitizeTableProperties,
} from "../drillDownUtil";
import { getReactEmbeddingCodeGenerator } from "../../../utils/embeddingCodeGenerator";

export class PivotTableDescriptor extends BaseChartDescriptor {
    public getFactory(): PluggableVisualizationFactory {
        return (params) => new PluggablePivotTable(params);
    }

    public getSizeInfo(
        _insight: IInsightDefinition,
        layoutDescriptor: IFluidLayoutDescriptor,
        settings: ISettings,
    ): IVisualizationSizeInfo {
        return {
            width: {
                default: layoutDescriptor.gridColumnsCount,
                min: 3,
                max: layoutDescriptor.gridColumnsCount,
            },
            height: {
                default: this.getDefaultHeight(settings.enableKDWidgetCustomHeight),
                min: this.getMinHeight(settings.enableKDWidgetCustomHeight),
                max: this.getMaxHeight(settings.enableKDWidgetCustomHeight),
            },
        };
    }

    public applyDrillDown(insight: IInsight, drillDownContext: IDrillDownContext): IInsight {
        const drillDownInsight = modifyBucketsAttributesForDrillDown(
            insight,
            drillDownContext.drillDefinition,
        );
        const drillDownInsightWithFilters = addIntersectionFiltersToInsight(
            drillDownInsight,
            drillDownContext.event.drillContext.intersection,
        );
        return sanitizeTableProperties(insightSanitize(drillDownInsightWithFilters));
    }

    public getEmbeddingCode = getReactEmbeddingCodeGenerator(
        {
            importType: "named",
            name: "PivotTable",
            package: "@gooddata/sdk-ui-pivot",
        },
        (insight, ctx): IPivotTableProps => {
            const measureBucket = insightBucket(insight, BucketNames.MEASURES);
            const rowsBucket = insightBucket(insight, BucketNames.ATTRIBUTE);
            const columnsBucket = insightBucket(insight, BucketNames.COLUMNS);

            const measures = measureBucket && bucketMeasures(measureBucket);
            const rows = rowsBucket && bucketAttributes(rowsBucket);
            const columns = columnsBucket && bucketAttributes(columnsBucket);

            const filters = insightFilters(insight);
            const sortBy = insightSorts(insight);
            const totals = insightTotals(insight);

            const properties = insightProperties(insight);
            const config = getConfigFromProperties(properties, ctx);

            return {
                measures,
                rows,
                columns,
                filters,
                sortBy,
                totals,
                config,
            };
        },
    );
}

function getColumnSizingFromControls(
    controls: Record<string, any>,
    ctx: IEmbeddingCodeContext | undefined,
): IColumnSizing | undefined {
    const { columnWidths } = controls;
    const columnWidthsProp = !isEmpty(columnWidths) ? { columnWidths } : {};

    const growToFitConfig = ctx?.settings?.enableTableColumnsGrowToFit;
    const growToFitProp = !isNil(growToFitConfig) ? { growToFit: growToFitConfig } : {};

    return {
        ...columnWidthsProp,
        ...growToFitProp,
        // the user can fill the rest on their own later
    };
}

function getConfigFromProperties(
    properties: VisualizationProperties | undefined,
    ctx: IEmbeddingCodeContext | undefined,
): IPivotTableConfig {
    const controls = properties?.controls;
    const columnSizing = controls && getColumnSizingFromControls(controls, ctx);

    const menuConfig = ctx?.backend && pivotTableMenuForCapabilities(ctx.backend.capabilities);
    const menuProp = !isEmpty(menuConfig) ? { menu: menuConfig } : {};

    const separatorsConfig = ctx?.settings?.separators;
    const separatorsProp = !isEmpty(separatorsConfig) ? { separators: separatorsConfig } : {};

    return {
        columnSizing,
        ...menuProp,
        ...separatorsProp,
        // the user can fill the rest on their own later
    };
}

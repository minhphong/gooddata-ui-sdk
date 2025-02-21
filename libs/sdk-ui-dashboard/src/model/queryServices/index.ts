// (C) 2021-2023 GoodData Corporation
import { QueryDateDatasetsForInsightService } from "./queryInsightDateDatasets";
import { QueryInsightAttributesMetaService } from "./queryInsightAttributesMeta";
import { QueryWidgetFiltersService } from "./queryWidgetFilters";
import { QueryDateDatasetsForMeasureService } from "./queryMeasureDateDatasets";
import { QueryWidgetBrokenAlertService } from "./queryWidgetBrokenAlerts";
import { QueryWidgetAlertCountService } from "./queryWidgetAlertCount";
import { QueryConnectingAttributesService } from "./queryConnectingAttributes";
import { QueryAttributeByDisplayFormService } from "./queryAttributeByDisplayForm";
import { QueryAttributeDataSetService } from "./queryAttributeDataset";

export const AllQueryServices = [
    QueryDateDatasetsForInsightService,
    QueryInsightAttributesMetaService,
    QueryWidgetFiltersService,
    QueryDateDatasetsForMeasureService,
    QueryWidgetBrokenAlertService,
    QueryWidgetAlertCountService,
    QueryConnectingAttributesService,
    QueryAttributeByDisplayFormService,
    QueryAttributeDataSetService,
];

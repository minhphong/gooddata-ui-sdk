// (C) 2021-2023 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { ObjRef, FilterContextItem } from "@gooddata/sdk-model";

import { DashboardContext } from "../../types/commonTypes";
import { ExportDashboardToPdf } from "../../commands";
import {
    dashboardExportToPdfRequested,
    DashboardExportToPdfResolved,
    dashboardExportToPdfResolved,
} from "../../events/dashboard";
import { selectDashboardRef } from "../../store/meta/metaSelectors";
import { invalidArgumentsProvided } from "../../events/general";
import { selectFilterContextFilters } from "../../store/filterContext/filterContextSelectors";
import { ensureAllTimeFilterForExport } from "../../../_staging/exportUtils/filterUtils";
import { PromiseFnReturnType } from "../../types/sagas";
import { IExportBlobResult } from "@gooddata/sdk-backend-spi";

function exportDashboardToPdf(
    ctx: DashboardContext,
    dashboardRef: ObjRef,
    filters: FilterContextItem[] | undefined,
): Promise<IExportBlobResult> {
    const { backend, workspace } = ctx;
    return backend.workspace(workspace).dashboards().exportDashboardToPdfBlob(dashboardRef, filters);
}

export function* exportDashboardToPdfHandler(
    ctx: DashboardContext,
    cmd: ExportDashboardToPdf,
): SagaIterator<DashboardExportToPdfResolved> {
    yield put(dashboardExportToPdfRequested(ctx, cmd.correlationId));

    const dashboardRef = yield select(selectDashboardRef);
    if (!dashboardRef) {
        throw invalidArgumentsProvided(ctx, cmd, "Dashboard to export to PDF must have an ObjRef.");
    }

    const filterContextFilters: ReturnType<typeof selectFilterContextFilters> = yield select(
        selectFilterContextFilters,
    );

    const effectiveFilters = ensureAllTimeFilterForExport(filterContextFilters);

    const result: PromiseFnReturnType<typeof exportDashboardToPdf> = yield call(
        exportDashboardToPdf,
        ctx,
        dashboardRef,
        effectiveFilters,
    );

    // prepend hostname if provided so that the results are downloaded from there, not from where the app is hosted
    const fullUri = ctx.backend.config.hostname
        ? new URL(result.uri, ctx.backend.config.hostname).href
        : result.uri;

    const sanitizedResult: IExportBlobResult = {
        ...result,
        uri: fullUri,
    };

    return dashboardExportToPdfResolved(ctx, sanitizedResult, cmd.correlationId);
}

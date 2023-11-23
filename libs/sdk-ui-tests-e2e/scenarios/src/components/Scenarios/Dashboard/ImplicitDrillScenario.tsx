// (C) 2021-2023 GoodData Corporation
import React from "react";
import { Dashboard } from "@gooddata/sdk-ui-dashboard";
import { idRef } from "@gooddata/sdk-model";
import * as TigerMDObjects from "../../../../../reference_workspace/workspace_objects/goodsales/current_reference_workspace_objects_tiger";
import * as BearMDObjects from "../../../../../reference_workspace/workspace_objects/goodsales/current_reference_workspace_objects_bear";

type MDObjectsType = typeof TigerMDObjects & typeof BearMDObjects;

export const MDObject = (
    process.env.SDK_BACKEND === "TIGER" ? TigerMDObjects : BearMDObjects
) as MDObjectsType;

const dashboardRef = idRef(MDObject.Dashboards.ImplicitDrill);

export const ImplictDrill: React.FC = () => {
    return <Dashboard dashboard={dashboardRef} />;
};

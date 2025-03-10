// (C) 2021-2022 GoodData Corporation

import React from "react";
import { DefaultEditButton } from "./DefaultEditButton";
import { IEditButtonProps } from "./types";

/**
 * @internal
 */
export const EditButton = (props: IEditButtonProps): JSX.Element => {
    // No customization from useDashboardComponentsContext for now
    return <DefaultEditButton {...props} />;
};

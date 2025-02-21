// (C) 2022-2023 GoodData Corporation
import React, { useEffect, useMemo } from "react";
import { ConfigurationCategory } from "./ConfigurationCategory";
import { ConfigurationPanelHeader } from "./ConfigurationPanelHeader";

import {
    useDashboardSelector,
    selectOtherContextAttributeFilters,
    selectFilterContextAttributeFilters,
    selectSupportsElementsQueryParentFiltering,
    selectSettings,
} from "../../../../../model";
import { IDashboardAttributeFilter, ObjRef } from "@gooddata/sdk-model";
import { ParentFiltersList } from "./parentFilters/ParentFiltersList";

import invariant from "ts-invariant";
import { AttributeDisplayFormsDropdown } from "./displayForms/AttributeDisplayFormsDropdown";
import { useAttributeFilterParentFiltering } from "../../AttributeFilterParentFilteringContext";
import { useConnectingAttributes } from "./hooks/useConnectingAttributes";
import { LoadingSpinner } from "@gooddata/sdk-ui-kit";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import { useAttributes } from "../../../../../_staging/sharedHooks/useAttributes";
import { AttributeTitleRenaming } from "./title/AttributeTitleRenaming";

interface IAttributeFilterConfigurationProps {
    closeHandler: () => void;
    filterRef?: ObjRef;
    filterByText: string;
    displayValuesAsText: string;
    titleText: string;
    resetTitleText: string;
}

export const AttributeFilterConfiguration: React.FC<IAttributeFilterConfigurationProps> = (props) => {
    const { filterRef, filterByText, displayValuesAsText, titleText, resetTitleText, closeHandler } = props;
    const theme = useTheme();

    useEffect(() => {
        return () => {
            closeHandler();
        };
    }, [closeHandler]);

    const { enableKPIAttributeFilterRenaming } = useDashboardSelector(selectSettings);

    const neighborFilters: IDashboardAttributeFilter[] = useDashboardSelector(
        selectOtherContextAttributeFilters(filterRef),
    );
    const isDependentFiltersEnabled = useDashboardSelector(selectSupportsElementsQueryParentFiltering);

    const neighborFilterDisplayForms = useMemo(() => {
        return neighborFilters.map((filter) => filter.attributeFilter.displayForm);
    }, [neighborFilters]);

    const currentFilter = useDashboardSelector(selectFilterContextAttributeFilters).find((filter) =>
        neighborFilters.every(
            (neighborFilter) =>
                filter.attributeFilter.localIdentifier !== neighborFilter.attributeFilter.localIdentifier,
        ),
    );

    invariant(currentFilter, "Cannot find current filter in the filter context store.");

    const {
        title,
        defaultAttributeFilterTitle,
        parents,
        onParentSelect,
        onConnectingAttributeChanged,
        showDisplayFormPicker,
        filterDisplayForms,
        onDisplayFormSelect,
        showResetTitle,
        onTitleUpdate,
        onTitleReset,
    } = useAttributeFilterParentFiltering();

    const { connectingAttributesLoading, connectingAttributes } = useConnectingAttributes(
        currentFilter.attributeFilter.displayForm,
        neighborFilterDisplayForms,
    );

    const { attributes, attributesLoading } = useAttributes(neighborFilterDisplayForms);

    if (connectingAttributesLoading || attributesLoading) {
        return (
            <div className="gd-loading-equalizer-attribute-filter-config-wrap">
                <LoadingSpinner
                    className="large gd-loading-equalizer-spinner"
                    color={theme?.palette?.complementary?.c9}
                />
            </div>
        );
    }

    if (!filterRef || !connectingAttributes || !attributes) {
        return null;
    }

    return (
        <div className="s-attribute-filter-dropdown-configuration attribute-filter-dropdown-configuration sdk-edit-mode-on">
            <ConfigurationPanelHeader />
            {enableKPIAttributeFilterRenaming && (
                <AttributeTitleRenaming
                    categoryTitle={titleText}
                    resetTitleText={resetTitleText}
                    onClick={onTitleReset}
                    onChange={onTitleUpdate}
                    showResetTitle={showResetTitle}
                    attributeTitle={title ?? defaultAttributeFilterTitle}
                />
            )}
            {isDependentFiltersEnabled && parents.length > 0 ? (
                <ConfigurationCategory categoryTitle={filterByText} />
            ) : null}
            <ParentFiltersList
                currentFilterLocalId={currentFilter.attributeFilter.localIdentifier!}
                parents={parents}
                setParents={onParentSelect}
                onConnectingAttributeChanged={onConnectingAttributeChanged}
                connectingAttributes={connectingAttributes}
                attributes={attributes}
            />
            {showDisplayFormPicker ? (
                <div className="s-display-form-configuration">
                    <ConfigurationCategory categoryTitle={displayValuesAsText} />
                    <div className="configuration-panel-body">
                        <AttributeDisplayFormsDropdown
                            displayForms={filterDisplayForms.availableDisplayForms}
                            selectedDisplayForm={filterDisplayForms.selectedDisplayForm}
                            onChange={onDisplayFormSelect}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
};

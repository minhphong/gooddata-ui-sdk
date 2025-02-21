// (C) 2019-2023 GoodData Corporation
/* eslint-disable import/export */
/**
 * This is an all-in-one package that has all GoodData.UI packages as dependencies and re-exports their public API.
 *
 * @remarks
 * The primary purpose of this package is to simplify migration from previous versions of GoodData.UI
 * that were all delivered in a single `@gooddata/react-components` package.
 *
 * @packageDocumentation
 */

// NOTE: import/export disabled for some packages as we have to fiddle with stuff that we copied from one
// package to another.

export * from "@gooddata/sdk-model";
export * from "@gooddata/sdk-backend-spi";
export * from "@gooddata/sdk-ui";
// eslint-disable-next-line import/export
export * from "@gooddata/sdk-ui-charts";
// eslint-disable-next-line import/export
export * from "@gooddata/sdk-ui-geo";
export * from "@gooddata/sdk-ui-pivot";
export * from "@gooddata/sdk-ui-filters";
export * from "@gooddata/sdk-ui-ext";

import {
    // override getColorMappingPredicate, it is exported by both charts and geo, so use the chart version
    getColorMappingPredicate,
} from "@gooddata/sdk-ui-charts";

import {
    // User
    IUser,
    IWorkspaceUser,
    userFullName,
    // Date filter configs
    DateString,
    DateFilterGranularity,
    IDateFilterOption,
    IAbsoluteDateFilterPreset,
    IRelativeDateFilterPreset,
    IRelativeDateFilterPresetOfGranularity,
    IAbsoluteDateFilterForm,
    IRelativeDateFilterForm,
    IAllTimeDateFilterOption,
    IDateFilterConfig,
    isDateFilterGranularity,
    isAllTimeDateFilterOption,
    isAbsoluteDateFilterForm,
    isAbsoluteDateFilterPreset,
    isRelativeDateFilterForm,
    isRelativeDateFilterPreset,
    // Dashboard
    IDashboardObjectIdentity,
    // Dashboard Filter Context
    DateFilterType,
    FilterContextItem,
    IDashboardAttributeFilter,
    DashboardAttributeFilterSelectionMode,
    IDashboardAttributeFilterParent,
    IDashboardAttributeFilterReference,
    IDashboardDateFilter,
    IDashboardDateFilterReference,
    IDashboardFilterReference,
    IFilterContext,
    IFilterContextBase,
    IFilterContextDefinition,
    ITempFilterContext,
    dashboardFilterReferenceObjRef,
    isAllTimeDashboardDateFilter,
    isDashboardAttributeFilter,
    isDashboardAttributeFilterReference,
    isDashboardDateFilter,
    isDashboardDateFilterReference,
    isFilterContext,
    isFilterContextDefinition,
    isTempFilterContext,
    newAbsoluteDashboardDateFilter,
    newAllTimeDashboardDateFilter,
    newRelativeDashboardDateFilter,
    // Dashboard Alerts
    IWidgetAlert,
    IWidgetAlertBase,
    IWidgetAlertDefinition,
    isWidgetAlert,
    isWidgetAlertDefinition,
    // Dashboard Drills
    DrillDefinition,
    DrillOrigin,
    DrillOriginType,
    DrillTransition,
    DrillType,
    IDrill,
    IDrillFromAttribute,
    IDrillFromMeasure,
    IDrillOrigin,
    IDrillTarget,
    IDrillToAttributeUrl,
    IDrillToAttributeUrlTarget,
    IDrillToCustomUrl,
    IDrillToCustomUrlTarget,
    IDrillToDashboard,
    IDrillToInsight,
    IDrillToLegacyDashboard,
    InsightDrillDefinition,
    KpiDrillDefinition,
    isDrillFromAttribute,
    isDrillFromMeasure,
    isDrillToAttributeUrl,
    isDrillToCustomUrl,
    isDrillToDashboard,
    isDrillToInsight,
    isDrillToLegacyDashboard,
    // Dashboard Widgets
    BuiltInWidgetTypes,
    IBaseWidget,
    IDrillableWidget,
    IFilterableWidget,
    IWidgetDescription,
    //
    AnalyticalWidgetType,
    WidgetType,
    IAnalyticalWidget,
    IKpiWidget,
    IKpiWidgetBase,
    IKpiWidgetDefinition,
    IInsightWidget,
    IInsightWidgetBase,
    IInsightWidgetDefinition,
    IInsightWidgetConfiguration,
    // Catalog
    CatalogItemType,
    CatalogItem,
    ICatalogGroup,
    ICatalogAttribute,
    ICatalogFact,
    ICatalogMeasure,
    ICatalogDateDataset,
    ICatalogDateAttribute,
    isCatalogAttribute,
    isCatalogFact,
    isCatalogMeasure,
    isCatalogDateDataset,
    ICatalogItemBase,
    IGroupableCatalogItemBase,
    GroupableCatalogItem,
    catalogItemMetadataObject,
    // Metadata
    IAttributeDisplayFormMetadataObject,
    isAttributeDisplayFormMetadataObject,
    IAttributeMetadataObject,
    isAttributeMetadataObject,
    IDataSetMetadataObject,
    isDataSetMetadataObject,
    IVariableMetadataObject,
    isVariableMetadataObject,
    IFactMetadataObject,
    isFactMetadataObject,
    IMetadataObjectDefinition,
    IMeasureMetadataObject,
    IMeasureMetadataObjectBase,
    isMeasureMetadataObject,
    IMeasureMetadataObjectDefinition,
    isMeasureMetadataObjectDefinition,
    IMetadataObject,
    IMetadataObjectBase,
    IMetadataObjectIdentity,
    isMetadataObject,
    MetadataObject,
    metadataObjectId,
    IDashboardMetadataObject,
    isDashboardMetadataObject,
    // Csv Datasets
    DataColumnType,
    DatasetLoadStatus,
    IDataColumnBody,
    IDataColumn,
    IDataHeader,
    IDatasetLoadInfo,
    IDatasetUser,
    IDataset,
    IDatasetBody,
    // Attribute Elements
    IAttributeElement,
    // Widgets
    IWidget,
    IWidgetDefinition,
    isWidget,
    isWidgetDefinition,
    widgetUri,
    widgetId,
    widgetRef,
    widgetTitle,
    widgetType,
    isKpiWidgetDefinition,
    isKpiWidget,
    isInsightWidgetDefinition,
    isInsightWidget,
    // Scheduled Mail
    IDashboardAttachment,
    isDashboardAttachment,
    IWidgetAttachment,
    isWidgetAttachment,
    IExportOptions,
    IScheduledMail,
    IScheduledMailDefinition,
    ScheduledMailAttachment,
    IScheduledMailBase,
    // Dashboard Layout
    IDashboardLayout,
    IDashboardWidget,
    IDashboardLayoutSection,
    IDashboardLayoutSectionHeader,
    IDashboardLayoutSize,
    IDashboardLayoutSizeByScreenSize,
    IDashboardLayoutItem,
    ScreenSize,
    isDashboardLayout,
    isDashboardLayoutSection,
    isDashboardLayoutItem,
    isDashboardWidget,
    // Dashboard
    IDashboard,
    IDashboardDefinition,
    IListedDashboard,
    ListedDashboardAvailability,
    IDashboardBase,
    IDashboardDateFilterConfig,
    DashboardDateFilterConfigMode,
    IDashboardDateFilterAddedPresets,
    IDashboardPluginBase,
    IDashboardPlugin,
    IDashboardPluginDefinition,
    IDashboardPluginLink,
    isDashboard,
    isDashboardDefinition,
    IAccessControlAware,
    ShareStatus,
    // Settings
    ISettings,
    ISeparators,
    PlatformEdition,
    // User Groups
    IWorkspaceUserGroup,
    // Theme
    ThemeFontUri,
    ThemeColor,
    IThemeColorFamily,
    IThemeComplementaryPalette,
    IThemeWidgetTitle,
    IThemeTypography,
    IThemePalette,
    IThemeKpi,
    IThemeKpiValue,
    IThemeChart,
    IThemeTable,
    ITheme,
    IThemeAnalyticalDesigner,
    IThemeAnalyticalDesignerTitle,
    IThemeButton,
    IThemeDashboard,
    IThemeDashboardContent,
    IThemeDashboardContentKpi,
    IThemeDashboardContentWidget,
    IThemeDashboardEditPanel,
    IThemeDashboardFilterBar,
    IThemeDashboardFilterBarButton,
    IThemeDashboardNavigation,
    IThemeDashboardNavigationItem,
    IThemeDashboardNavigationTitle,
    IThemeDashboardSection,
    IThemeDashboardSectionDescription,
    IThemeDashboardSectionTitle,
    IThemeDashboardTitle,
    IThemeModal,
    IThemeModalTitle,
    IThemeTooltip,
    // Permissions
    IWorkspacePermissions,
    WorkspacePermission,
    // Execution Results
    DataValue,
    IMeasureDescriptor,
    IMeasureDescriptorObject,
    IMeasureDescriptorItem,
    IDimensionItemDescriptor,
    IDimensionDescriptor,
    IAttributeHeaderFormOf,
    IAttributeDescriptorBody,
    IAttributeDescriptor,
    IMeasureGroupDescriptor,
    IResultAttributeHeader,
    IResultHeader,
    IResultMeasureHeader,
    IResultAttributeHeaderItem,
    IResultMeasureHeaderItem,
    IResultTotalHeader,
    IResultTotalHeaderItem,
    ITotalDescriptor,
    ITotalDescriptorItem,
    IResultWarning,
    isAttributeDescriptor,
    isMeasureGroupDescriptor,
    isTotalDescriptor,
    isMeasureDescriptor,
    isResultAttributeHeader,
    isResultMeasureHeader,
    isResultTotalHeader,
    resultHeaderName,
    attributeDescriptorLocalId,
    attributeDescriptorName,
    // Access control
    AccessGranteeDetail,
    IAccessGrantee,
    IUserAccessGrantee,
    IUserGroupAccessGrantee,
    IUserAccess,
    IUserGroupAccess,
    isUserAccess,
    isUserGroupAccess,
    isUserGroupAccessGrantee,
    isUserAccessGrantee,
    // Organization
    IOrganizationDescriptor,
} from "@gooddata/sdk-model";
export {
    getColorMappingPredicate,
    // User
    IUser,
    IWorkspaceUser,
    userFullName,
    // Date filter configs
    DateString,
    DateFilterGranularity,
    IDateFilterOption,
    IAbsoluteDateFilterPreset,
    IRelativeDateFilterPreset,
    IRelativeDateFilterPresetOfGranularity,
    IAbsoluteDateFilterForm,
    IRelativeDateFilterForm,
    IAllTimeDateFilterOption,
    IDateFilterConfig,
    isDateFilterGranularity,
    isAllTimeDateFilterOption,
    isAbsoluteDateFilterForm,
    isAbsoluteDateFilterPreset,
    isRelativeDateFilterForm,
    isRelativeDateFilterPreset,
    // Dashboard
    IDashboardObjectIdentity,
    // Dashboard Filter Context
    DateFilterType,
    FilterContextItem,
    IDashboardAttributeFilter,
    DashboardAttributeFilterSelectionMode,
    IDashboardAttributeFilterParent,
    IDashboardAttributeFilterReference,
    IDashboardDateFilter,
    IDashboardDateFilterReference,
    IDashboardFilterReference,
    IFilterContext,
    IFilterContextBase,
    IFilterContextDefinition,
    ITempFilterContext,
    dashboardFilterReferenceObjRef,
    isAllTimeDashboardDateFilter,
    isDashboardAttributeFilter,
    isDashboardAttributeFilterReference,
    isDashboardDateFilter,
    isDashboardDateFilterReference,
    isFilterContext,
    isFilterContextDefinition,
    isTempFilterContext,
    newAbsoluteDashboardDateFilter,
    newAllTimeDashboardDateFilter,
    newRelativeDashboardDateFilter,
    //Dashboard Alerts
    IWidgetAlert,
    IWidgetAlertBase,
    IWidgetAlertDefinition,
    isWidgetAlert,
    isWidgetAlertDefinition,
    //Dashboard Drills
    DrillDefinition,
    DrillOrigin,
    DrillOriginType,
    DrillTransition,
    DrillType,
    IDrill,
    IDrillFromAttribute,
    IDrillFromMeasure,
    IDrillOrigin,
    IDrillTarget,
    IDrillToAttributeUrl,
    IDrillToAttributeUrlTarget,
    IDrillToCustomUrl,
    IDrillToCustomUrlTarget,
    IDrillToDashboard,
    IDrillToInsight,
    IDrillToLegacyDashboard,
    InsightDrillDefinition,
    KpiDrillDefinition,
    isDrillFromAttribute,
    isDrillFromMeasure,
    isDrillToAttributeUrl,
    isDrillToCustomUrl,
    isDrillToDashboard,
    isDrillToInsight,
    isDrillToLegacyDashboard,
    // Dashboard Widgets
    BuiltInWidgetTypes,
    IBaseWidget,
    IDrillableWidget,
    IFilterableWidget,
    IWidgetDescription,
    //
    AnalyticalWidgetType,
    WidgetType,
    IAnalyticalWidget,
    IKpiWidget,
    IKpiWidgetBase,
    IKpiWidgetDefinition,
    IInsightWidget,
    IInsightWidgetBase,
    IInsightWidgetDefinition,
    IInsightWidgetConfiguration,
    // Catalog
    CatalogItemType,
    CatalogItem,
    ICatalogGroup,
    ICatalogAttribute,
    ICatalogFact,
    ICatalogMeasure,
    ICatalogDateDataset,
    ICatalogDateAttribute,
    isCatalogAttribute,
    isCatalogFact,
    isCatalogMeasure,
    isCatalogDateDataset,
    ICatalogItemBase,
    IGroupableCatalogItemBase,
    GroupableCatalogItem,
    catalogItemMetadataObject,
    // Metadata
    IAttributeDisplayFormMetadataObject,
    isAttributeDisplayFormMetadataObject,
    IAttributeMetadataObject,
    isAttributeMetadataObject,
    IDataSetMetadataObject,
    isDataSetMetadataObject,
    IVariableMetadataObject,
    isVariableMetadataObject,
    IFactMetadataObject,
    isFactMetadataObject,
    IMetadataObjectDefinition,
    IMeasureMetadataObject,
    IMeasureMetadataObjectBase,
    isMeasureMetadataObject,
    IMeasureMetadataObjectDefinition,
    isMeasureMetadataObjectDefinition,
    IMetadataObject,
    IMetadataObjectBase,
    IMetadataObjectIdentity,
    isMetadataObject,
    MetadataObject,
    metadataObjectId,
    IDashboardMetadataObject,
    isDashboardMetadataObject,
    // Csv Datasets
    DataColumnType,
    DatasetLoadStatus,
    IDataColumnBody,
    IDataColumn,
    IDataHeader,
    IDatasetLoadInfo,
    IDatasetUser,
    IDataset,
    IDatasetBody,
    // Attribute Elements
    IAttributeElement,
    // Widgets
    IWidget,
    IWidgetDefinition,
    isWidget,
    isWidgetDefinition,
    widgetUri,
    widgetId,
    widgetRef,
    widgetTitle,
    widgetType,
    isKpiWidgetDefinition,
    isKpiWidget,
    isInsightWidgetDefinition,
    isInsightWidget,
    // Scheduled Mail
    IDashboardAttachment,
    isDashboardAttachment,
    IWidgetAttachment,
    isWidgetAttachment,
    IExportOptions,
    IScheduledMail,
    IScheduledMailDefinition,
    ScheduledMailAttachment,
    IScheduledMailBase,
    // Dashboard Layout
    IDashboardLayout,
    IDashboardWidget,
    IDashboardLayoutSection,
    IDashboardLayoutSectionHeader,
    IDashboardLayoutSize,
    IDashboardLayoutSizeByScreenSize,
    IDashboardLayoutItem,
    ScreenSize,
    isDashboardLayout,
    isDashboardLayoutSection,
    isDashboardLayoutItem,
    isDashboardWidget,
    // Dashboard
    IDashboard,
    IDashboardDefinition,
    IListedDashboard,
    ListedDashboardAvailability,
    IDashboardBase,
    IDashboardDateFilterConfig,
    DashboardDateFilterConfigMode,
    IDashboardDateFilterAddedPresets,
    IDashboardPluginBase,
    IDashboardPlugin,
    IDashboardPluginDefinition,
    IDashboardPluginLink,
    isDashboard,
    isDashboardDefinition,
    IAccessControlAware,
    ShareStatus,
    // Settings
    ISettings,
    ISeparators,
    PlatformEdition,
    // User Groups
    IWorkspaceUserGroup,
    // Theme
    ThemeFontUri,
    ThemeColor,
    IThemeColorFamily,
    IThemeComplementaryPalette,
    IThemeWidgetTitle,
    IThemeTypography,
    IThemePalette,
    IThemeKpi,
    IThemeKpiValue,
    IThemeChart,
    IThemeTable,
    ITheme,
    IThemeAnalyticalDesigner,
    IThemeAnalyticalDesignerTitle,
    IThemeButton,
    IThemeDashboard,
    IThemeDashboardContent,
    IThemeDashboardContentKpi,
    IThemeDashboardContentWidget,
    IThemeDashboardEditPanel,
    IThemeDashboardFilterBar,
    IThemeDashboardFilterBarButton,
    IThemeDashboardNavigation,
    IThemeDashboardNavigationItem,
    IThemeDashboardNavigationTitle,
    IThemeDashboardSection,
    IThemeDashboardSectionDescription,
    IThemeDashboardSectionTitle,
    IThemeDashboardTitle,
    IThemeModal,
    IThemeModalTitle,
    IThemeTooltip,
    // Permissions
    IWorkspacePermissions,
    WorkspacePermission,
    // Execution Results
    DataValue,
    IMeasureDescriptor,
    IMeasureDescriptorObject,
    IMeasureDescriptorItem,
    IDimensionItemDescriptor,
    IDimensionDescriptor,
    IAttributeHeaderFormOf,
    IAttributeDescriptorBody,
    IAttributeDescriptor,
    IMeasureGroupDescriptor,
    IResultAttributeHeader,
    IResultHeader,
    IResultMeasureHeader,
    IResultAttributeHeaderItem,
    IResultMeasureHeaderItem,
    IResultTotalHeader,
    IResultTotalHeaderItem,
    ITotalDescriptor,
    ITotalDescriptorItem,
    IResultWarning,
    isAttributeDescriptor,
    isMeasureGroupDescriptor,
    isTotalDescriptor,
    isMeasureDescriptor,
    isResultAttributeHeader,
    isResultMeasureHeader,
    isResultTotalHeader,
    resultHeaderName,
    attributeDescriptorLocalId,
    attributeDescriptorName,
    // Access control
    AccessGranteeDetail,
    IAccessGrantee,
    IUserAccessGrantee,
    IUserGroupAccessGrantee,
    IUserAccess,
    IUserGroupAccess,
    isUserAccess,
    isUserGroupAccess,
    isUserGroupAccessGrantee,
    isUserAccessGrantee,
    // Organization
    IOrganizationDescriptor,
};

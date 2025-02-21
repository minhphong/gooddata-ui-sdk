// (C) 2022 GoodData Corporation
import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { InternalIntlWrapper } from "@gooddata/sdk-ui-ext/dist/internal/utils/internalIntlProvider";
import { EmbedInsightDialogBase, IReactOptions, IWebComponentsOptions } from "@gooddata/sdk-ui-kit";

import { storiesOf } from "../../../_infra/storyRepository";
import { UiKit } from "../../../_infra/storyGroups";
import { wrapWithTheme } from "../../themeWrapper";

import { code } from "./CodeMock";

/**
 * @internal
 */
export const EmbedInsightDialogBaseExamples: React.VFC = () => {
    const [reactOptions, setReactOptions] = useState<IReactOptions>({
        type: "react",
        codeType: "ts",
        unit: "px",
        componentType: "reference",
        displayConfiguration: true,
        customHeight: true,
        height: "300",
    });

    const [webComponentOptions, setWebComponentOptions] = useState<IWebComponentsOptions>({
        type: "webComponents",
        displayTitle: true,
        customTitle: true,
        allowLocale: true,
        locale: "en-US",
        customHeight: true,
        height: "300",
        unit: "px",
    });
    return (
        <InternalIntlWrapper>
            <div className="screenshot-target" style={{ width: "100%", height: "100%" }}>
                <div className="library-component">
                    <h4>EmbedInsightDialogBase by React</h4>
                </div>

                <EmbedInsightDialogBase
                    code={code}
                    embedTab={"react"}
                    embedTypeOptions={reactOptions}
                    propertiesLink={
                        "https://sdk.gooddata.com/gooddata-ui/docs/area_chart_component.html#properties"
                    }
                    integrationDocLink={"https://sdk.gooddata.com/gooddata-ui/docs/platform_integration.html"}
                    onClose={action("onClose")}
                    onCopyCode={action("onCopyCode")}
                    onTabChange={action("onTabChange")}
                    onOptionsChange={(opts) => {
                        setReactOptions(opts as IReactOptions);
                        action("onOptionsChange");
                    }}
                    openSaveInsightDialog={action("openSaveInsightDialog")}
                />

                <div className="library-component">
                    <h4>EmbedInsightDialogBase by React for un-saved insight</h4>
                </div>

                <EmbedInsightDialogBase
                    code={""}
                    embedTab={"react"}
                    embedTypeOptions={reactOptions}
                    propertiesLink={
                        "https://sdk.gooddata.com/gooddata-ui/docs/area_chart_component.html#properties"
                    }
                    integrationDocLink={"https://sdk.gooddata.com/gooddata-ui/docs/platform_integration.html"}
                    onClose={action("onClose")}
                    onCopyCode={action("onCopyCode")}
                    onTabChange={action("onTabChange")}
                    onOptionsChange={(opts) => {
                        setReactOptions(opts as IReactOptions);
                        action("onOptionsChange");
                    }}
                    openSaveInsightDialog={action("openSaveInsightDialog")}
                />

                <div className="library-component">
                    <h4>EmbedInsightDialogBase by Web component</h4>
                </div>

                <EmbedInsightDialogBase
                    code={code}
                    embedTab={"webComponents"}
                    embedTypeOptions={webComponentOptions}
                    propertiesLink={
                        "https://sdk.gooddata.com/gooddata-ui/docs/area_chart_component.html#properties"
                    }
                    integrationDocLink={"https://sdk.gooddata.com/gooddata-ui/docs/platform_integration.html"}
                    onClose={action("onClose")}
                    onCopyCode={action("onCopyCode")}
                    onTabChange={action("onTabChange")}
                    onOptionsChange={(opts) => {
                        setWebComponentOptions(opts as IWebComponentsOptions);
                        action("onOptionChange");
                    }}
                    openSaveInsightDialog={action("openSaveInsightDialog")}
                />

                <div className="library-component">
                    <h4>EmbedInsightDialogBase by Web component for un-saved insight</h4>
                </div>

                <EmbedInsightDialogBase
                    code={""}
                    embedTab={"webComponents"}
                    embedTypeOptions={webComponentOptions}
                    propertiesLink={
                        "https://sdk.gooddata.com/gooddata-ui/docs/area_chart_component.html#properties"
                    }
                    integrationDocLink={"https://sdk.gooddata.com/gooddata-ui/docs/platform_integration.html"}
                    onClose={action("onClose")}
                    onCopyCode={action("onCopyCode")}
                    onTabChange={action("onTabChange")}
                    onOptionsChange={(opts) => {
                        setWebComponentOptions(opts as IWebComponentsOptions);
                        action("onOptionChange");
                    }}
                    openSaveInsightDialog={action("openSaveInsightDialog")}
                />
            </div>
        </InternalIntlWrapper>
    );
};

storiesOf(`${UiKit}/EmbedInsightDialog/EmbedInsightDialogBase`)
    .add("full-featured", () => <EmbedInsightDialogBaseExamples />, { screenshot: true })
    .add("themed", () => wrapWithTheme(<EmbedInsightDialogBaseExamples />), { screenshot: true });

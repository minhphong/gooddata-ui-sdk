// (C) 2023 GoodData Corporation
import { IInsight } from "@gooddata/sdk-model";
import { IWebComponentsOptions } from "@gooddata/sdk-ui-kit";

const HOST_NAME = "<hostName>";
const WORKSPACE_ID = "<workspaceId>";
const INSIGHT_TITLE = "<insightTitle>";
const INSIGHT_ID = "<insightId>";
const LOCALE = "<locale>";
const CUSTOM_HEIGHT = "<customHeight>";
const CUSTOM_TITLE = "Custom insight title";
const WEB_COMPONENTS_EMBED_CODE = `<!-- Load the library... -->
<script type="module" src="https://${HOST_NAME}/components/${WORKSPACE_ID}?auth=sso"></script>
<!-- ...and embed an insight -->

<gd-insight\n    insight="${INSIGHT_ID}"${INSIGHT_TITLE}${LOCALE}${CUSTOM_HEIGHT}
></gd-insight>`;

export const getWebComponentsCodeGenerator = (
    workspaceId: string,
    insight: IInsight,
    codeOption: IWebComponentsOptions,
) => {
    const { displayTitle, customTitle, customHeight, height, locale, allowLocale } = codeOption;
    return WEB_COMPONENTS_EMBED_CODE.replace(HOST_NAME, window.location.hostname)
        .replace(WORKSPACE_ID, workspaceId)
        .replace(INSIGHT_ID, insight.insight.identifier)
        .replace(
            INSIGHT_TITLE,
            displayTitle ? `\n    title="${customTitle ? CUSTOM_TITLE : insight.insight.title}"` : "",
        )
        .replace(LOCALE, allowLocale ? `\n    locale="${locale}"` : "")
        .replace(CUSTOM_HEIGHT, customHeight ? `\n    style="${height}"` : "");
};

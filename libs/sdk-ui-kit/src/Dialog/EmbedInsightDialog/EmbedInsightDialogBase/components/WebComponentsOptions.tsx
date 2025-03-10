// (C) 2023 GoodData Corporation
import React, { useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { IWebComponentsOptions } from "../types";
import { dialogChangeMessageLabels } from "../../../../locales";

import { HeightSetting } from "./HeightSetting";
import { ToggleSwitch } from "./ToggleSwitch";
import { LocaleSetting } from "./LocaleSetting";

/**
 * @internal
 */
interface IWebComponentsOptionsProps {
    option: IWebComponentsOptions;
    onChange: (option: IWebComponentsOptions) => void;
}

/**
 * @internal
 */
export const WebComponentsOptions = (props: IWebComponentsOptionsProps) => {
    const intl = useIntl();
    const { option, onChange } = props;

    const onDisplayTitleChange = useCallback(() => {
        const opt = { ...option, displayTitle: !option.displayTitle };
        onChange(opt);
    }, [option, onChange]);

    const onCustomTitleChange = useCallback(() => {
        const opt = { ...option, customTitle: !option.customTitle };
        onChange(opt);
    }, [option, onChange]);

    const onAllowLocaleChange = useCallback(() => {
        const opt = { ...option, allowLocale: !option.allowLocale };
        onChange(opt);
    }, [option, onChange]);

    const onLocaleValueChange = useCallback(
        (locale) => {
            const opt = { ...option, locale };
            onChange(opt);
        },
        [option, onChange],
    );

    const onCustomHeightChange = useCallback(() => {
        const opt = { ...option, customHeight: !option.customHeight };
        onChange(opt);
    }, [option, onChange]);

    const onCustomHeightValueChange = useCallback(
        (height, unit) => {
            const opt = { ...option, height, unit };
            onChange(opt);
        },
        [option, onChange],
    );

    return (
        <div className="embed-insight-dialog-lang-selector">
            <strong className="bottom-space">
                <FormattedMessage id="embedInsightDialog.webComponents.options" />
            </strong>

            <ToggleSwitch
                id={"display-title"}
                className="bottom-space"
                label={intl.formatMessage({
                    id: "embedInsightDialog.webComponents.options.displayTitle",
                })}
                checked={option.displayTitle}
                onChange={onDisplayTitleChange}
            />

            <ToggleSwitch
                id={"custom-title"}
                className="bottom-space"
                label={intl.formatMessage({
                    id: "embedInsightDialog.webComponents.options.customTitle",
                })}
                checked={option.customTitle}
                disabled={!option.displayTitle}
                onChange={onCustomTitleChange}
                questionMarkMessage={intl.formatMessage(
                    !option.displayTitle
                        ? dialogChangeMessageLabels.disabledCustomTitle
                        : dialogChangeMessageLabels.customTitle,
                )}
            />

            <LocaleSetting
                isChecked={option.allowLocale}
                selectedLocal={option.locale}
                onChecked={onAllowLocaleChange}
                onLocaleSelected={onLocaleValueChange}
            />

            <ToggleSwitch
                id={"custom-height"}
                label={intl.formatMessage({
                    id: "embedInsightDialog.code.options.custom.height",
                })}
                checked={option.customHeight}
                onChange={onCustomHeightChange}
            />

            {option.customHeight ? (
                <HeightSetting
                    value={option.height}
                    unit={option.unit}
                    onValueChange={onCustomHeightValueChange}
                />
            ) : null}
        </div>
    );
};

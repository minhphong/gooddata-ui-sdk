// (C) 2019-2022 GoodData Corporation
import React from "react";
import noop from "lodash/noop";
import { screen } from "@testing-library/react";
import { IUser, uriRef } from "@gooddata/sdk-model";

import { IRecipientsSelectRendererProps, RecipientsSelectRenderer } from "../RecipientsSelectRenderer";

import { IScheduleEmailRecipient } from "../../../interfaces";
import { IntlWrapper } from "../../../../../localization/IntlWrapper";
import { setupComponent } from "../../../../../../tests/testHelper";

const author: IScheduleEmailRecipient = {
    user: {
        login: "user@gooddata.com",
        ref: uriRef("/gdc/user"),
        email: "user@gooddata.com",
        fullName: "John Doe",
    },
};

const extraUser: IScheduleEmailRecipient = {
    user: {
        login: "extraUser@gooddata.com",
        ref: uriRef("/gdc/extraUser"),
        email: "extraUser@gooddata.com",
        fullName: "Adam Bradley",
    },
};

const currentUser: IUser = {
    login: "user@gooddata.com",
    ref: uriRef("/gdc/user"),
    email: "user@gooddata.com",
    fullName: "John Doe",
};

const options: IScheduleEmailRecipient[] = [
    {
        user: {
            login: "user2@gooddata.com",
            ref: uriRef("/gdc/user2"),
            email: "user2@gooddata.com",
            fullName: "Jack Sparrow",
        },
    },
    {
        email: "stephen.hawking@gooddata.com",
    },
];

describe("RecipientsSelect", () => {
    function renderComponent(customProps: Partial<IRecipientsSelectRendererProps> = {}) {
        const defaultProps = {
            options,
            value: [author],
            originalValue: [],
            currentUser,
            author,
            isMulti: false,
            onChange: noop,
            onLoad: noop,
            ...customProps,
        };

        return setupComponent(
            <IntlWrapper>
                <RecipientsSelectRenderer {...defaultProps} />
            </IntlWrapper>,
        );
    }

    it("should render single Select component", () => {
        renderComponent();

        expect(screen.getByText(`${author.user.fullName}`)).toBeInTheDocument();
    });

    it("should render multiple Select component", () => {
        renderComponent({ isMulti: true, value: [author, extraUser] });

        expect(screen.getByText(`${author.user.fullName}`)).toBeInTheDocument();
        expect(screen.getByText(`${extraUser.user.email}`)).toBeInTheDocument();
    });

    it("should render Owner user without icon remove", () => {
        renderComponent();
        expect(screen.queryByLabelText("remove-icon")).not.toBeInTheDocument();
    });

    it("should change input when adding new value", async () => {
        const { user } = renderComponent({ isMulti: true });
        await user.type(screen.getByRole("combobox"), "extraUser@gooddata.com");

        expect(screen.getByText(`${author.user.fullName}`)).toBeInTheDocument();
        expect(screen.getByDisplayValue(`${extraUser.user.email}`)).toBeInTheDocument();
    });
});

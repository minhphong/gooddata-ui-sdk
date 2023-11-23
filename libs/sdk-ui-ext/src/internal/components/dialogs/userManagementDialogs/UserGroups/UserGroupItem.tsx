// (C) 2023 GoodData Corporation

import { useIntl } from "react-intl";
import React from "react";
import cx from "classnames";
import { BubbleHoverTrigger, Bubble } from "@gooddata/sdk-ui-kit";

import { IGrantedUserGroup, ListMode } from "../types.js";
import { messages } from "../locales.js";

const GranteeGroupIcon: React.FC = () => {
    return (
        <div className="gd-grantee-item-icon-left-background">
            <span className="gd-grantee-item-icon gd-grantee-icon-group gd-grantee-item-icon-left" />
        </div>
    );
};

const alignPoints = [{ align: "cr cl" }];

interface IRemoveIconProps {
    mode: ListMode;
    onClick: () => void;
}

const RemoveIcon: React.FC<IRemoveIconProps> = ({ mode, onClick }) => {
    const intl = useIntl();
    return (
        <BubbleHoverTrigger showDelay={0} hideDelay={0} className="gd-grantee-item-delete">
            <span
                className="gd-grantee-item-icon gd-grantee-icon-trash gd-grantee-item-icon-right s-user-management-delete"
                onClick={onClick}
                aria-label="Share dialog grantee delete"
            />
            <Bubble className="bubble-primary" alignPoints={alignPoints}>
                {mode === "VIEW"
                    ? intl.formatMessage(messages.removeSavedUserGroupTooltip)
                    : intl.formatMessage(messages.removeUnsavedUserGroupTooltip)}
            </Bubble>
        </BubbleHoverTrigger>
    );
};

interface IUserGroupItemProps {
    userGroup: IGrantedUserGroup;
    mode: ListMode;
    onDelete: (grantee: IGrantedUserGroup) => void;
}

export const UserGroupItem: React.FC<IUserGroupItemProps> = ({ mode, onDelete, userGroup }) => {
    const itemClassName = cx("s-user-management-item", "gd-share-dialog-grantee-item");

    return (
        <div className={itemClassName}>
            <RemoveIcon mode={mode} onClick={() => onDelete(userGroup)} />
            <div className="gd-grantee-content">
                <div className="gd-grantee-content-label">{userGroup.title}</div>
            </div>
            <GranteeGroupIcon />
        </div>
    );
};
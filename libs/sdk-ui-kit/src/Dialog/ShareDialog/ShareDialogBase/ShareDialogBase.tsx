// (C) 2021-2023 GoodData Corporation
import React, { useCallback, useEffect } from "react";

import { Overlay } from "../../../Overlay";
import { IAlignPoint } from "../../../typings/positioning";

import { ShareGranteeBase } from "./ShareGranteeBase";
import { AddGranteeBase } from "./AddGranteeBase";
import { IShareDialogBaseProps } from "./types";
import { useShareDialogBase } from "./useShareDialogBase";
import { useShareDialogInteraction } from "./ComponentInteractionContext";

const alignPoints: IAlignPoint[] = [{ align: "cc cc" }];

/**
 * @internal
 */
export const ShareDialogBase: React.FC<IShareDialogBaseProps> = (props) => {
    const { onCancel, sharedObject, currentUser, currentUserPermissions, isCurrentUserWorkspaceManager } =
        props;
    const { openInteraction, closeInteraction } = useShareDialogInteraction();

    useEffect(() => {
        openInteraction();
    }, [openInteraction]);

    const handleCancel = useCallback(() => {
        onCancel();
        closeInteraction();
    }, [onCancel, closeInteraction]);

    const {
        onAddedGranteeDelete,
        onSharedGranteeDelete,
        onAddGranteeBackClick,
        onAddGranteeButtonClick,
        onGranteeAdd,
        onSubmitShareGrantee,
        onSubmitAddGrantee,
        granteesToAdd,
        dialogMode,
        isShareDialogDirty,
        isAddDialogDirty,
        sharedGrantees,
        appliedGranteesWithOwner,
        isGranteesLoading,
        isLockedNow,
        isUnderLenientControlNow,
        onLockChange,
        onUnderLenientControlChange,
        onGranularGranteeAddChange,
        onGranularGranteeShareChange,
    } = useShareDialogBase(props);

    return (
        <Overlay
            alignPoints={alignPoints}
            isModal={true}
            positionType="fixed"
            className="gd-share-dialog-overlay"
        >
            <div className="s-gd-share-dialog">
                {dialogMode === "ShareGrantee" ? (
                    <ShareGranteeBase
                        currentUserPermissions={currentUserPermissions}
                        currentUser={currentUser}
                        isLoading={isGranteesLoading}
                        isDirty={isShareDialogDirty}
                        isLockedNow={isLockedNow}
                        isUnderLenientControlNow={isUnderLenientControlNow}
                        sharedObject={sharedObject}
                        grantees={sharedGrantees}
                        onCancel={handleCancel}
                        onSubmit={onSubmitShareGrantee}
                        onAddGranteeButtonClick={onAddGranteeButtonClick}
                        onGranteeDelete={onSharedGranteeDelete}
                        onLockChange={onLockChange}
                        onUnderLenientControlChange={onUnderLenientControlChange}
                        onGranularGranteeChange={onGranularGranteeShareChange}
                        isCurrentUserWorkspaceManager={isCurrentUserWorkspaceManager}
                    />
                ) : (
                    <AddGranteeBase
                        currentUserPermissions={currentUserPermissions}
                        isDirty={isAddDialogDirty}
                        currentUser={currentUser}
                        appliedGrantees={appliedGranteesWithOwner}
                        addedGrantees={granteesToAdd}
                        sharedObject={sharedObject}
                        onAddUserOrGroups={onGranteeAdd}
                        onDelete={onAddedGranteeDelete}
                        onCancel={handleCancel}
                        onSubmit={onSubmitAddGrantee}
                        onBackClick={onAddGranteeBackClick}
                        onGranularGranteeChange={onGranularGranteeAddChange}
                    />
                )}
            </div>
        </Overlay>
    );
};

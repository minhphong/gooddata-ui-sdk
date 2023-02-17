// (C) 2020-2023 GoodData Corporation
import React, { useCallback } from "react";
import { CurrentUserPermissions, useToastMessage } from "@gooddata/sdk-ui-kit";
import {
    useDashboardSelector,
    selectIsShareDialogOpen,
    useDashboardDispatch,
    uiActions,
    selectPersistedDashboard,
    selectCurrentUserRef,
    useDashboardCommandProcessing,
    changeSharing,
    selectCanManageWorkspace,
    selectDashboardPermissions,
} from "../../../model";
import { ShareDialog, ISharingApplyPayload } from "../../shareDialog";
import { useBackendStrict, useWorkspaceStrict } from "@gooddata/sdk-ui";
import { messages } from "../../../locales";

const useShareDialogDashboardHeader = () => {
    const dispatch = useDashboardDispatch();
    const { addSuccess, addError } = useToastMessage();
    const isShareDialogOpen = useDashboardSelector(selectIsShareDialogOpen);
    const persistedDashboard = useDashboardSelector(selectPersistedDashboard);
    const currentUserRef = useDashboardSelector(selectCurrentUserRef);
    const isWorkspaceManager = useDashboardSelector(selectCanManageWorkspace);
    const dashboardPermissions = useDashboardSelector(selectDashboardPermissions);
    const backend = useBackendStrict();
    const workspace = useWorkspaceStrict();

    const { run: runChangeSharing } = useDashboardCommandProcessing({
        commandCreator: changeSharing,
        successEvent: "GDC.DASH/EVT.SHARING.CHANGED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        onSuccess: () => {
            addSuccess(messages.messagesSharingChangedSuccess);
        },
        onError: () => {
            addError(messages.messagesSharingChangedError);
        },
    });

    const closeShareDialog = useCallback(() => dispatch(uiActions.closeShareDialog()), [dispatch]);

    const onCloseShareDialog = useCallback(() => {
        closeShareDialog();
    }, [closeShareDialog]);

    const onApplyShareDialog = useCallback(
        (payload: ISharingApplyPayload) => {
            closeShareDialog();
            runChangeSharing(payload);
        },
        [closeShareDialog, runChangeSharing],
    );

    const onErrorShareDialog = useCallback(() => {
        dispatch(uiActions.closeShareDialog());
        addError(messages.messagesSharingDialogError);
    }, [dispatch, addError]);

    return {
        backend,
        workspace,
        isShareDialogOpen,
        persistedDashboard,
        currentUserRef,
        onCloseShareDialog,
        onApplyShareDialog,
        onErrorShareDialog,
        isLockingSupported: isWorkspaceManager,
        isCurrentUserWorkspaceManager: isWorkspaceManager,
        dashboardPermissions,
    };
};

/**
 * @internal
 */
export const ShareDialogDashboardHeader = (): JSX.Element | null => {
    const {
        backend,
        workspace,
        isShareDialogOpen,
        persistedDashboard,
        currentUserRef,
        onCloseShareDialog,
        onApplyShareDialog,
        onErrorShareDialog,
        isLockingSupported,
        isCurrentUserWorkspaceManager,
        dashboardPermissions,
    } = useShareDialogDashboardHeader();

    if (!isShareDialogOpen) {
        return null;
    }

    const currentUserPermissions: CurrentUserPermissions = {
        canEditAffectedObject: dashboardPermissions.canEditDashboard,
        canEditLockedAffectedObject: dashboardPermissions.canEditLockedDashboard,
        canShareAffectedObject: dashboardPermissions.canShareDashboard,
        canShareLockedAffectedObject: dashboardPermissions.canShareLockedDashboard,
        canViewAffectedObject: dashboardPermissions.canViewDashboard,
    };

    return (
        <ShareDialog
            backend={backend}
            workspace={workspace}
            isVisible={isShareDialogOpen}
            currentUserRef={currentUserRef}
            sharedObject={persistedDashboard!}
            onCancel={onCloseShareDialog}
            onApply={onApplyShareDialog}
            onError={onErrorShareDialog}
            isLockingSupported={isLockingSupported}
            isCurrentUserWorkspaceManager={isCurrentUserWorkspaceManager}
            currentUserPermissions={currentUserPermissions}
        />
    );
};

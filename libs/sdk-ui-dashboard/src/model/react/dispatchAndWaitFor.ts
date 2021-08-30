// (C) 2021 GoodData Corporation

import { commandEnvelopeWithPromise } from "../commandHandlers/rootCommandHandler";
import { DashboardCommands } from "../commands";
import { DashboardDispatch } from "../state/types";

/**
 * Dispatches a command and returns a promise to wait for it to get resolved.
 *
 * @param dispatch - dashboard dispatch to use
 * @param command - command to trigger and wait for resolution of
 * @returns Promise of the command resolution
 * @alpha
 */
export async function dispatchAndWaitFor<TCommand extends DashboardCommands>(
    dispatch: DashboardDispatch,
    command: TCommand,
): Promise<void> {
    const { promise, envelope } = commandEnvelopeWithPromise(command);

    dispatch(envelope);

    return promise;
}

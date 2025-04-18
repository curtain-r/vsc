import { ExtensionContext } from "vscode";
import { getDisposableTextEditorSelectionListener } from "./selection";

export const registerAllEvents = (context: ExtensionContext) => {
    context.subscriptions.push(getDisposableTextEditorSelectionListener(context));
};
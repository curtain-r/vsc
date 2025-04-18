import * as vscode from 'vscode';
import { registerAllEvents } from './events';
import { registerAllCommands } from './commands';

export function activate(context: vscode.ExtensionContext) {
	registerAllCommands(context);
	registerAllEvents(context);
}

export function deactivate() {}

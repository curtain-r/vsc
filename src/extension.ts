import * as vscode from 'vscode';
import { registerAllEvents } from './events';
import { registerAllCommands } from './commands';
import { Prediction } from './model';

export function activate(context: vscode.ExtensionContext) {
	new Prediction();
}

export function deactivate() {}

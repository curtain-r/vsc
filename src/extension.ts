import * as vscode from 'vscode';
import { ContextManager } from '@/base/ctx';

export function activate(context: vscode.ExtensionContext) {
	const ctx = new ContextManager(context);

}

export function deactivate() { }

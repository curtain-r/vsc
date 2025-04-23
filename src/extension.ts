import * as vscode from 'vscode';
import { ContextManager } from '@/base/ctx';
import { Webview } from './base/webview';

export function activate(context: vscode.ExtensionContext) {
	const ctx = new ContextManager(context);
	ctx.registryBase(Webview, new Webview(ctx));

}

export function deactivate() { }

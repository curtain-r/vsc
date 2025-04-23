import * as vscode from 'vscode';
import { ContextManager } from '@/base/ctx';
import { WebViewModule } from '@/base/webview';

export function activate(context: vscode.ExtensionContext) {
	const ctx = new ContextManager(context);
	ctx.registryBase(WebViewModule, new WebViewModule(ctx));

}

export function deactivate() { }

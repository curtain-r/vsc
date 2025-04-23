import { BaseModule } from "@/base";
import { ContextManager } from "@/base/ctx";
import * as vscode from "vscode";
import { getNonce } from "@/utils";

export class Webview extends BaseModule implements vscode.WebviewViewProvider {
    _view?: vscode.WebviewView;
    public provider?: vscode.Disposable;

    constructor(ext: ContextManager) {
        super(ext);
        this.registerWebview();
    }

    /**
     * 判断 webivew 是否初始化完成
     * @returns boolean
     */
    public isReady() {
        return !!this._view;
    }

    public resolveWebviewView(view: vscode.WebviewView) {
        this._view = view;
        view.onDidChangeVisibility(() => {
            this.emit("change-visiblity", view.visible);
        });
        view.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.context.extensionUri],
        };
        view.webview.html = this._getHtmlForWebview(
            view.webview,
            this.context.extensionUri,
        );
    }

    public revive(panel: vscode.WebviewView) {
        this._view = panel;
    }

    /**
     * 显示 webview
     */
    public show(v: boolean) {
        if (!this._view) {
            console.log("show webview 未初始化");
            return;
        }
        this._view.show(v);
    }

    /**
     * 显示并聚焦 webivew 页面
     * @returns Promise
     */
    public focus() {
        vscode.commands.executeCommand("vamWebView.focus");
    }

    private registerWebview() {
        this.provider = vscode.window.registerWebviewViewProvider(
            "vamWebView",
            this,
            { webviewOptions: { retainContextWhenHidden: true } },
        );
        this.context.subscriptions.push(this.provider);
    }

    /**
     * 获取webView视图
     * @param webview webView组件
     * @returns
     */
    private _getHtmlForWebview(
        webview: vscode.Webview,
        extensionUri: vscode.Uri,
    ) {
        const inDevelopmentMode
            = this.context.extensionMode === vscode.ExtensionMode.Development;

        const vscMediaUrl = webview
            .asWebviewUri(vscode.Uri.joinPath(extensionUri, "webview-ui/assets"))
            .toString();

        const jsUrl = webview
            .asWebviewUri(vscode.Uri.joinPath(extensionUri, "bridge/index.js"))
            .toString();

        let scriptUri: string;
        let styleMainUri: string;
        if (!inDevelopmentMode) {
            scriptUri = webview
                .asWebviewUri(
                    vscode.Uri.joinPath(extensionUri, "webview-ui/dist/assets/index.js"),
                )
                .toString();
            styleMainUri = webview
                .asWebviewUri(
                    vscode.Uri.joinPath(extensionUri, "webview-ui/dist/assets/index.css"),
                )
                .toString();
        }
        else {
            scriptUri = "http://localhost:5173/src/main.tsx";
            styleMainUri = "http://localhost:5173/src/App.css";
        }
        const nonce = getNonce();
        const currentTheme = vscode.window.activeColorTheme;
        const isLight = currentTheme?.kind === 1 || currentTheme?.kind === 4;

        return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${styleMainUri}" rel="stylesheet">
        <script>window.vscMediaUrl = "${vscMediaUrl}"</script>
        <script>window.ide = "vscode"</script>
        <script>window.colorThemeName = "dark"</script>
        <script nonce="${nonce}" src="${jsUrl}"></script>
        <title>Continue</title>
      </head>
      <body ${!isLight ? "class='dark'" : ""}>
        <div id="root"></div>
        ${inDevelopmentMode
                ? `<script type="module">
          import RefreshRuntime from "http://localhost:5173/@react-refresh"
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
          </script>
          <script type="module">
            import { createHotContext } from "http://localhost:5173/@vite/client"
            window.__vite_hot_context__ = createHotContext()
          </script>`
                : ""
            }
        <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
      </body>
    </html>`;
    }

}

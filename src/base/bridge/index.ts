import { BaseModule } from "@/base";
import { ContextManager } from "@/base/ctx";
import { WebViewModule } from "@/base/webview";

export class BridgeModule extends BaseModule {
    constructor(ctx: ContextManager) {
        super(ctx);
    }
    // 开始通信
    startupDataPipe() {
        this.webview._view?.webview.onDidReceiveMessage((message) => {
            console.log(message);
        });
    }

    /**
     * this.webview依赖webview初始化完成
     */
    private get webview() {
        return this.getBase(WebViewModule);
    }
}

import { BaseModule } from "@/base";
import { ContextManager } from "@/base/ctx";
import { Ctor } from "@/base/ctx/manager";

export class ServiceModule {
    constructor(readonly ext: ContextManager) { }

    protected getBase<T extends BaseModule>(key: Ctor<T>) {
        return this.ext.getBase(key);
    }

    protected getService<T extends ServiceModule>(key: Ctor<T>) {
        return this.ext.getService<T>(key);
    }

    protected get context() {
        return this.ext.context;
    }
}

import { EventEmitter } from "events";
import { Ctor } from "@/base/ctx/manager";
import { ContextManager } from "@/base/ctx";


export class BaseModule extends EventEmitter {
    constructor(private readonly ext: ContextManager) {
        super();
    }

    protected getBase<T extends BaseModule>(key: Ctor<T>) {
        return this.ext.getBase<T>(key);
    }

    protected get context() {
        return this.ext.context;
    }
}

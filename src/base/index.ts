import { ContextManager } from "@/base/ctx";

export class BaseModule {
    constructor(public readonly ctx: ContextManager) {
    }
}
import { ContextManager } from "@/base/ctx";

export class ServiceModule {
    constructor(public readonly ctx: ContextManager) {
    }
}
import { ExtensionContext } from "vscode";
import { Manager, type Ctor } from "./manager";
import { BaseModule } from "@/base";
import { ServiceModule } from "@/services";
import { EventEmitter } from "events";

export class ContextManager extends EventEmitter {
  private base = new Manager();
  private service = new Manager();

  constructor(public readonly context: ExtensionContext) {
    super();
  }

  registryBase<T extends BaseModule>(ctor: Ctor<T>, instance: T) {
    this.base.set(ctor, instance);
  }

  getBase<T extends BaseModule>(ctor: Ctor<T>): T {
    return this.base.get(ctor);
  }

  registryService<T extends ServiceModule>(ctor: Ctor<T>, instance: T) {
    this.service.set(ctor, instance);
  }

  getService<T extends ServiceModule>(ctor: Ctor<T>): T {
    return this.service.get(ctor);
  }
}

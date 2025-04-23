export type Ctor<T> = new (...args: any[]) => T;

export class Manager {
  private instances: Map<Ctor<any>, any>;

  constructor() {
    this.instances = new Map();
  }

  get<T>(ctor: Ctor<T>): T {
    const value = this.tryGet(ctor);
    if (value) {
        return value;
    };
    throw new Error(`No instance of ${ctor.name} has been registered.`);
  }

  tryGet<T>(ctor: Ctor<T>): T | undefined {
    const value = this.instances.get(ctor);
    if (value) {
        return value;
    };
    return undefined;
  }

  set<T>(ctor: Ctor<T>, instance: T): void {
    if (this.tryGet(ctor)) {
      throw new Error(
        `An instance of ${ctor.name} has already been registered. Use forceSet() if you're sure it's a good idea.`,
      );
    }
    this.assertIsInstance(ctor, instance);
    this.instances.set(ctor, instance);
  }

  forceSet<T>(ctor: Ctor<T>, instance: T): void {
    this.assertIsInstance(ctor, instance);
    this.instances.set(ctor, instance);
  }

  assertIsInstance<T>(ctor: Ctor<T>, instance: any): asserts instance is T {
    if (!(instance instanceof ctor)) {
      const inst = JSON.stringify(instance);
      throw new Error(
        `The instance you're trying to register for ${ctor.name} is not an instance of it (${inst}).`,
      );
    }
  }
}

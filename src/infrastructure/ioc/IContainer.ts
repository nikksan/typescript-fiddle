export interface IModule {
  isSingleton: boolean,
  name: string,
  definition: any,
  deps?: string[],
  instance?: any,
}

export default interface IContainer {
  register(name: string, definition: any): void;
  singleton(name: string, definition: any, deps?: string[]): void;
  resolve(name: string): any;
}

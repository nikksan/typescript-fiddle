export interface Module {
  // isSingleton: boolean,
  name: string,
  definition: any,
  // deps?: string[],
  // instance?: any,
}

export default interface Container {
  register(name: string, definition: any): void;
  // singleton(name: string, definition: any, deps?: string[]): void;
  resolve(name: string): any;
};

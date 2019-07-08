export interface Module {
  name: string,
  definition: any,
}

export default interface Container {
  register(name: string, definition: any): void;
  resolve(name: string): any;
}

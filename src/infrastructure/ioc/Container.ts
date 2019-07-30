import Provider from './providers/Provider';

export interface Module {
  name: string,
  definition: any,
}

type Newable<T> = { new (...args: any[]): T; };

export default interface Container {
  register(name: string, definition: any): void;
  resolve(name: string): any;
  bootstrapProvider(SomeProvider: Newable<Provider>): void;
};

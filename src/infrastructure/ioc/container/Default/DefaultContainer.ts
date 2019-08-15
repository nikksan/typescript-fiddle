import assert from 'assert';
import Container, { Module } from '../../Container';
import Provider from '../../providers/Provider';

type Newable<T> = { new (...args: any[]): T; };

export default class BaseContainer implements Container {
  private modules: Module[];

  constructor() {
    this.modules = [];
  }

  register(name: string, definition: any) {
    assert(!this.has(name));

    this.modules.push({
      name,
      definition,
    });
  }

  resolve(name: string) {
    assert(this.has(name));

    const component = this.modules.find(module => module.name === name);
    return component.definition;
  }

  bootstrapProvider(SomeProvider: Newable<Provider>) {
    const provider = new SomeProvider();
    provider.provide(this);
  };

  private has(name: string) {
    return this.modules.some(module => module.name === name);
  }
}



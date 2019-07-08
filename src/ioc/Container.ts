import assert from 'assert';
import Container, { Module } from 'contracts/ioc/Container';

export default class BaseContainer implements Container {
  private modules: Module[] = [];

  public register(name: string, definition: any) {
    assert(!this.resolve(name));

    this.modules.push({
      name,
      definition,
    });
  }

  public resolve(name: string) {
    const component = this.modules.find(module => module.name === name);

    return component ? component.definition : null;
  }
}

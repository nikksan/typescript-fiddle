import assert from 'assert';
import IContainer, { IModule } from './IContainer';

export default class BaseContainer implements IContainer {
  private modules: IModule[] = [];

  public register(name: string, definition: any) {
    assert(!this.has(name));

    this.modules.push({
      isSingleton: false,
      name,
      definition,
    });
  }

  public singleton(name: string, definition: any, deps?: string[]) {
    assert(!this.has(name));
    
    this.modules.push({
      isSingleton: true,
      name,
      definition,
      deps
    });
  }

  public resolve(name: string) {
    assert(this.has(name));

    const component = this.modules.find(module => module.name === name);
    if (component.isSingleton) {
      if (!component.instance) {
        const deps:any = {};
        if (component.deps) {
          for (const dep of component.deps) {
            deps[dep] = this.resolve(dep);
          }
        }
        component.instance = new component.definition(deps);
      }
      
      return component.instance;
    }

    return component.definition;
  }

  private has(name: string) {
    return this.modules.some(module => module.name === name);
  }
}

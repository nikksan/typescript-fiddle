import assert from 'assert';
import Container, { Module } from './Container';

export default class BaseContainer implements Container {
  private modules: Module[];

  constructor() {
    this.modules = [];
  }

  register(name: string, definition: any) {
    assert(!this.has(name));

    this.modules.push({
      // isSingleton: false,
      name,
      definition,
    });
  }

  // public singleton(name: string, definition: any, deps?: string[]) {
  //   assert(!this.has(name));

  //   this.modules.push({
  //     isSingleton: true,
  //     name,
  //     definition,
  //     deps
  //   });
  // }

  public resolve(name: string) {
    assert(this.has(name));

    const component = this.modules.find(module => module.name === name);
    // if (component.isSingleton) {
    //   if (!component.instance) {
    //      const args = component.deps && component.deps.length ?
    //        this.resolveDeps(component.deps) :
    //        false;


    //      component.instance = args ?
    //        new component.definition(...args) :
    //        new component.definition();
    //   }

    //   return component.instance;
    // }

    return component.definition;
  }

  // private resolveDeps(deps: string[]) {
  //   const depsArr: any = [];
  //   for (const dep of deps) {
  //     depsArr.push(this.resolve(dep));
  //   }

  //   return depsArr;
  // }

  private has(name: string) {
    return this.modules.some(module => module.name === name);
  }
}



export default class DependencyMap {
  private readonly dependencies: any;

  constructor() {
    this.dependencies = {};
  }

  public addDependency(className: any, instance: any): void {
    this.dependencies[className.toString()] = instance;
  }

  public getDependency<T>(className: any): T {
    return this.dependencies[className.toString()];
  }
}

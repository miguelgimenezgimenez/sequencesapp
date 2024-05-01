import DependenciesMap from './dependenciesMap';

export default class DIContainer {
  // eslint-disable-next-line no-use-before-define
  private static instance: DIContainer;

  private constructor(private readonly dependencies: DependenciesMap) { }

  /**
   * Initialize the DIContainer. This should be done only once.
   */
  public static initialize(): void {
    if (DIContainer.instance != null) {
      throw new Error(
        `Dependency Injection already initialized. You should call DIContainer.initialize only once.`
      );
    }
    DIContainer.instance = new DIContainer(new DependenciesMap());
  }


  public static bind<T>(typeName: any, instance: T): void {
    DIContainer.instance.dependencies.addDependency(typeName, instance);
  }

  public static get<T>(typeName: symbol): T {
    if (DIContainer.instance == null) {
      throw new Error(`Dependency Injection must be set up before.`);
    }
    const dependency: T = DIContainer.instance.dependencies.getDependency(typeName);
    if (!dependency) {
      throw new Error(
        `Dependency not set for ${typeName.description}. Make sure you configured it correctly when calling the DIContainer.intialize.
        Services should be started before routes.
        `
      );
    }
    return dependency;
  }

}

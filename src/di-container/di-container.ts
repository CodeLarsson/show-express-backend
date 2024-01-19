export class DiContainer {
  private dependencies: Map<string, any> = new Map();

  public register(key: string, dependency: any) {
    this.dependencies.set(key, dependency);
  }

  public resolve(key: string): any {
    const dependency = this.dependencies.get(key);

    if (!dependency) {
      throw new DependecyResolverError(
        `Dependency with key ${key} could not be found`,
      );
    }

    return dependency;
  }
}

const dependencyInjectionContainer = new DiContainer();

export const resolveInjected = <T>(key: string): T => {
  return dependencyInjectionContainer.resolve(key);
};

export const registerDependency = (key: string, dependency: any) => {
  dependencyInjectionContainer.register(key, dependency);
};

class DependecyResolverError extends Error {}

import DependenciesMap from '../dependenciesMap';

describe('DependenciesMap', () => {
  let dependenciesMap: DependenciesMap;

  beforeEach(() => {
    dependenciesMap = new DependenciesMap();
  });
  it('Should return the correct dependency when stored', () => {
    dependenciesMap.addDependency(String, 'abcdef');
    const retrieved = dependenciesMap.getDependency(String);
    expect(retrieved).toBe('abcdef');
  });
  it('Should return the last dependency when overriding', () => {
    dependenciesMap.addDependency(String, 'abcdef');
    dependenciesMap.addDependency(String, 'ghijkl');
    const retrieved = dependenciesMap.getDependency(String);
    expect(retrieved).toBe('ghijkl');
  });

  it('Should return nothing if the dependency has not been added before', () => {
    dependenciesMap.addDependency(String, 'abcdef');
    const retrieved = dependenciesMap.getDependency(Number);
    expect(retrieved).toBe(undefined);
  });
});

import { randomBytes } from 'crypto';

/**
 * In-memory object storage to mimic a database
 */

export type MockEntity = { id?: string };

export class MockDatabase<T extends MockEntity> {
  private store: T[] = [];

  public async add(entity: T): Promise<string> {
    entity.id = randomBytes(10).toString('hex');
    this.store.push(entity);
    return entity.id;
  }

  public async getBy(field: keyof T, value: any): Promise<T | undefined> {
    return this.store.find((entity) => entity[field] === value);
  }

  public async getAllBy(field: keyof T, value: any): Promise<T[] | undefined> {
    return this.store.filter((entity) => entity[field] === value);
  }

  public async get(): Promise<T[]> {
    return this.store;
  }

  public async update(id: string, value: any): Promise<T> {
    const entityIndex = this.store.findIndex((entity) => entity.id === id);
    this.store[entityIndex] = value;
    return this.store[entityIndex];
  }

  public async delete(field: keyof T, value: any): Promise<boolean> {
    const entityIndex = this.store.findIndex(
      (entity) => entity[field] === value,
    );
    if (entityIndex > -1) {
      this.store.splice(entityIndex, 1);
      return true;
    }
    return false;
  }
}

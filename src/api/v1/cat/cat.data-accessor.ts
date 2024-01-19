import { MockDatabase } from '../../../mock-database/mock-database';
import { Cat } from './cat.model';

export class CatDataAccessor {
  private CatsDb = new MockDatabase<Cat>();

  public async addCat(cat: Cat): Promise<string> {
    const id = await this.CatsDb.add(cat);
    return id;
  }

  public async getCatById(id: string): Promise<Cat | undefined> {
    return await this.CatsDb.getBy('id', id);
  }

  public async getAllCats(): Promise<Cat[]> {
    return await this.CatsDb.get();
  }

  public async deleteCatById(id: string): Promise<boolean> {
    return await this.CatsDb.delete('id', id);
  }

  public async updateCat(id: string, cat: Cat): Promise<Cat> {
    return await this.CatsDb.update(id, cat);
  }
}

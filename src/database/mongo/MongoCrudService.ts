import { FilterQuery, Model } from 'mongoose';
import ICrudService from '../interfaces/ICrudService';

class MongoCrudService<T> implements ICrudService<T> {
  constructor(public model: Model<T>) { }

  async createOne(data: any): Promise<T> {
    return this.model.create(data)

  }
  async deleteOne(filter: FilterQuery<T>): Promise<T | any> {
    return this.model.deleteOne(filter)
  }
  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter);
  }
  async findMany(filter: FilterQuery<T>, sort = '-dateAdded'): Promise<any[]> {

    return this.model.find(filter).sort(sort);
  }

}

export default MongoCrudService;

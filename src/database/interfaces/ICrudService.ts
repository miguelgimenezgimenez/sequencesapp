import { FilterQuery } from 'mongoose';

export default interface ICrudService<T> {
  createOne(data: object): Promise<T>;
  deleteOne(filter: FilterQuery<T>): Promise<T | any>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  findMany(filter: FilterQuery<T>, sort?: any, limit?: number): Promise<T[]>;
}

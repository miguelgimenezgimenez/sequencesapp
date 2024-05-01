import ICrudService from "./ICrudService";
import { IPost } from "../../models/post";
import { IUser } from "../../models/user";
import IDatabase from "./IDatabase";


export interface IDataService {
  database: IDatabase;
  post: ICrudService<IPost>;
  user: ICrudService<IUser>;
}

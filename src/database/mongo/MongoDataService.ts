import { Model } from "mongoose";
import MongoCrudService from "./MongoCrudService";
import { IPost } from '../../models/post';
import { IUser } from '../../models/user';
import { IDataService } from "../interfaces/IDataService";
import IDatabase from "../interfaces/IDatabase";
import availableModels from '../../models/index';


export default class MongoDataService implements IDataService {

  user: MongoCrudService<IUser>;
  constructor(public database: IDatabase) {

    const userModel = this.database.getModel<Model<IUser>>(availableModels.user);

    this.user = new MongoCrudService<IUser>(userModel);
  }
}

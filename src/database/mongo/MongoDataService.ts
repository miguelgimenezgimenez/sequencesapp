import { Model } from "mongoose";
import MongoCrudService from "./MongoCrudService";
import { ISequence } from '../../models/sequence';
import { IUser } from '../../models/user';
import { IDataService } from "../interfaces/IDataService";
import IDatabase from "../interfaces/IDatabase";
import availableModels from '../../models/index';


export default class MongoDataService implements IDataService {
  sequence: MongoCrudService<ISequence>;
  user: MongoCrudService<IUser>;
  constructor(public database: IDatabase) {
    const sequenceModel = this.database.getModel<Model<ISequence>>(availableModels.sequence);
    const userModel = this.database.getModel<Model<IUser>>(availableModels.user);
    this.sequence = new MongoCrudService<ISequence>(sequenceModel);
    this.user = new MongoCrudService<IUser>(userModel);
  }
}

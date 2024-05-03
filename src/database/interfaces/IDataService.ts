import ICrudService from './ICrudService'
import { ISequence } from '../../models/sequence'
import { IUser } from '../../models/user'
import IDatabase from './IDatabase'

export interface IDataService {
  database: IDatabase
  sequence: ICrudService<ISequence>
  user: ICrudService<IUser>
}

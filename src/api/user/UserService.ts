import { IUser } from '../../models/user';
import { comparePassword, encryptPassword } from './user.helpers';
import CustomError from '../../utils/errors/CustomError';
import IUserService from './interfaces/IUserService';
import { IDataService } from 'src/database/interfaces/IDataService';

export default class UserService implements IUserService {
  constructor(private dataService: IDataService) {}
  async authenticateUser(email: string, plaintextPassword: string) {
    const user = await this.dataService.user.findOne({ email });
    if (!user || !(await comparePassword(plaintextPassword, user.password))) {
      throw new CustomError('Invalid Credentials', 401);
    }
    return user;
  }

  createUser = async (email: string, password: string): Promise<IUser> => {
    const encryptedPassword = await encryptPassword(password);
    return this.dataService.user.createOne({
      email,
      password: encryptedPassword,
    });
  };
}

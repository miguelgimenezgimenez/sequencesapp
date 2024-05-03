
import { IUser } from '../../../models/user';

interface IUserService {
  createUser(email: string,
    password: string): Promise<IUser>;
  authenticateUser(email: string, plainTextPassword: string): Promise<IUser>;
}

export default IUserService;

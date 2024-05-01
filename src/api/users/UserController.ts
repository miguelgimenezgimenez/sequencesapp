import { Request, Response } from 'express';

import { shapeUser, signAccessToken } from './user.helpers';
import { accessDataSchema } from './user.schema';
import IUserController from './interfaces/IUserController';
import IUserService from './interfaces/IUserService';

export default class UserController implements IUserController {
  constructor(private userService: IUserService) { }

  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = accessDataSchema.parse(req.body)
    const user = await this.userService.authenticateUser(email, password);
    const accessToken = signAccessToken(user.id, user.role);
    res.status(200).json({
      accessToken, user: shapeUser(user)
    });
  }

  signup = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = accessDataSchema.parse(req.body)
    const user = await this.userService.createUser(email, password);
    const accessToken = signAccessToken(user.id, user.role);
    res.status(200).send({ accessToken, user: shapeUser(user) });
  }
}


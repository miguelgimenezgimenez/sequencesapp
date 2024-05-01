import { Request, Response } from 'express';

interface IUserController {
  login(req: Request, res: Response): Promise<void>;
  signup(req: Request, res: Response): Promise<void>;
}

export default IUserController;

import { Request, Response } from 'express';

interface ISequenceController {
  find(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
}

export default ISequenceController;

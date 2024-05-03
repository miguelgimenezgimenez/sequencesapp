import { Request, Response } from 'express';

import ISequenceController from './interfaces/ISequenceController';
import ISequenceService from './interfaces/ISequenceService';

import { addSequenceSchema } from './sequence.schema';

export default class SequenceController implements ISequenceController {
  constructor(private sequenceService: ISequenceService) {}

  find = async (req: Request, res: Response) => {
    const sequences = await this.sequenceService.find();
    res.json(sequences);
  };
  create = async (req: Request, res: Response) => {
    const { sequence } = addSequenceSchema.parse(req.body);
    await this.sequenceService.create(sequence);
    res.json(sequence);
  };
}

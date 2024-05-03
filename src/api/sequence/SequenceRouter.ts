import { Router } from 'express';

import SequenceController from './SequenceController';

import { BaseRouter } from '../BaseRouter';
import DIContainer from '../../di/diContainer';
import DI_TYPES from '../../di/DITypes';
import ISequenceService from './interfaces/ISequenceService';
import authenticate from '../../middlewares/authenticate';

export default class SequenceRouter extends BaseRouter {
  constructor() {
    // Create path from _dirname (sequence)
    super(__dirname);
  }
  createRouter(): Router {
    const router = Router();
    const sequenceController = new SequenceController(
      DIContainer.get<ISequenceService>(DI_TYPES.SequenceService),
    );
    router.get('/', authenticate(), sequenceController.find);
    router.post('/', authenticate(), sequenceController.create);
    return router;
  }
}

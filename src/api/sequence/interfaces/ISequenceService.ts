import { ISequence } from '../../../models/sequence';

interface ISequenceService {
  find(): Promise<ISequence[]>;
  create(sequence: number[]): Promise<ISequence>;
}

export default ISequenceService;

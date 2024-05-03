import ISequenceService from './interfaces/ISequenceService';
import { IDataService } from 'src/database/interfaces/IDataService';
import { generatesubSequencess } from './sequence.helpers';

export default class SequenceService implements ISequenceService {
  constructor(private dataService: IDataService) {}
  find = async () => {
    return this.dataService.sequence.findMany({}, null, 10);
  };

  create = async (sequence: number[]) => {
    const subSequences = generatesubSequencess(sequence);
    const result = await this.dataService.sequence.createOne({
      sequence,
      subSequences,
    });
    return result;
  };
}

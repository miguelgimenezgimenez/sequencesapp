import SequenceService from '../SequenceService';

const mockDataService = {
  sequence: {
    findMany: jest.fn(),
    createOne: jest.fn(),
  },
};

describe('SequenceService', () => {
  let sequenceService: SequenceService;

  beforeEach(() => {
    sequenceService = new SequenceService(mockDataService as any);
  });

  describe('createSequence ', () => {
    it('should create a sequence', async () => {
      const sequence = [1, 2, 3];
      const subSequences = [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]];
      await sequenceService.create(sequence);
      expect(mockDataService.sequence.createOne).toHaveBeenCalledWith({
        sequence,
        subSequences,
      });
    });
  });
});

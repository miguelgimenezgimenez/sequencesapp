import { generatesubSequencess } from '../sequence.helpers';

describe('generate subSequences ', () => {
  it('should create a length 2 sequence', async () => {
    const sequence = [1, 2];
    const expected = [[1], [2], [1, 2]];
    const result = generatesubSequencess(sequence);
    expect(result).toEqual(expected);
  });
  it('should create a length 3 sequence', async () => {
    const sequence = [1, 2, 3];
    const expected = [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]];
    const result = generatesubSequencess(sequence);
    console.log(result);

    expect(result).toEqual(expected);
  });
  it('should create a length 4 sequence', async () => {
    const sequence = [1, 2, 3, 4];
    const expected = [
      [1],
      [2],
      [3],
      [4],
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
      [3, 4],
      [1, 2, 3],
      [1, 2, 4],
      [1, 3, 4],
      [2, 3, 4],
      [1, 2, 3, 4],
    ];
    const result = generatesubSequencess(sequence);
    console.log(result);

    expect(result).toEqual(expected);
  });
});

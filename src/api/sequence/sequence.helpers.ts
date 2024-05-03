export function generatesubSequencess(seq: number[]): number[][] {
  seq.sort();
  const result: number[][] = [];

  function backtrack(start: number, path: number[]) {
    if (path.length) {
      result.push([...path]);
    }

    for (let i = start; i < seq.length; i++) {
      path.push(seq[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(0, []);
  result.sort((a, b) => {
    return a.length - b.length;
  });
  return result;
}

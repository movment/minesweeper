const size = 8;
export const length = size * size;
export const mineSize = 1;

const createArray = () => {
  // 2차원 배열 생성
  const arr = new Array(size)
    .fill(0)
    .map((cur) =>
      new Array(size)
        .fill(0)
        .map((item) => ({ value: 0, clicked: false, flag: false })),
    );

  // 지뢰 추가
  let i = 0;
  while (i < mineSize) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    // 중복된 위치인 경우 다시
    if (arr[x][y].value === -1) {
      continue;
    }
    arr[x][y].value = -1;

    // 추가된 지뢰 8방면에 지뢰 갯수+1
    for (let i = x - 1; i <= x + 1; ++i) {
      if (i < 0 || i >= size) {
        continue;
      }
      for (let j = y - 1; j <= y + 1; ++j) {
        if (j < 0 || j >= size) {
          continue;
        }
        if (arr[i][j].value !== -1) {
          arr[i][j].value += 1;
        }
      }
    }

    ++i;
  }

  return arr;
};

export default createArray;

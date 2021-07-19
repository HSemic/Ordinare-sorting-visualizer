import { swap } from './sortAnimate';

export const getBubbleSortAnimations = (arr: number[]) => {
  const animations = [];
  const array = arr.map((item, index) => {
    return Number.parseFloat(item as unknown as string);
  });
  let j = 0;
  for (let i = array.length - 1; i > -1; i--) {
    for (j = 0; j < i; j++) {
      animations.push([j, 'select', `select bar on index ${j}`]);
      if (array[j] > array[j + 1]) {
        animations.push([
          j,
          j + 1,
          'swap-highlight',
          `swap bar on index ${j} with bar on index ${j + 1}`
        ]);
        swap(array, j, j + 1);
        animations.push([
          j,
          j + 1,
          'swap-swap',
          `swap bar on index ${j} with bar on index ${j + 1}`
        ]);
        animations.push([
          j,
          j + 1,
          'restore',
          `swap bar on index ${j} with bar on index ${j + 1}`
        ]);
      } else animations.push([j, 'restore', `deselect bar on index ${j}`]);
    }
    animations.push([j, 'done', `bar on index ${j} in final position`]);
  }
  return animations;
};

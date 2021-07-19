import { swap } from './sortAnimate';

export const getBubbleSortAnimations = (arr: number[]) => {
  const animations = [];
  const array = arr.map((item, index) => {
    return Number.parseFloat(item as unknown as string);
  });
  let j = 0;
  for (let i = array.length - 1; i > -1; i--) {
    for (j = 0; j < i; j++) {
      animations.push([j, 'select']);
      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1, 'swap-highlight']);
        swap(array, j, j + 1);
        animations.push([j, j + 1, 'swap-swap']);
        animations.push([j, j + 1, 'restore']);
      } else animations.push([j, 'restore']);
    }
    animations.push([j, 'done']);
  }
  return animations;
};

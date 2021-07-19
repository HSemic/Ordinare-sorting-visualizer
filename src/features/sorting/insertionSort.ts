import { swap } from './sortAnimate';

export const getInsertionSortAnimations = (array: number[]) => {
  const animations = [];
  const arr = array.map((item, index) => {
    return Number.parseFloat(item as unknown as string);
  });

  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    let currValue = arr[i];
    animations.push([i, 'observe']);
    //   animations.push([i, 'restore']);
    while (j >= 0 && arr[j] > currValue) {
      animations.push([j, j + 1, 'swap-highlight']);
      swap(arr, j, j + 1);
      animations.push([j, j + 1, 'swap-swap']);
      animations.push([j, j + 1, 'observe-restore']);

      if (j > 0) j--;
    }
    animations.push([j, j + 1, 'restore']);
  }
  animations.push(['doneall']);
  return animations;
};

import { swap } from './sortAnimate';

export const getSelectionSortAnimations = (array: number[]) => {
  const animations = [];
  const arr = array.map((item, index) => {
    return Number.parseFloat(item as unknown as string);
  });
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    animations.push([i, 'observe']);
    for (let j = i + 1; j < arr.length; j++) {
      animations.push([j, 'select']);
      if (arr[j] < arr[min]) {
        if (min !== i) animations.push([min, j, 'restore-select']);
        min = j;
      } else {
        animations.push([j, 'restore']);
      }
    }
    if (i !== min) {
      animations.push([i, min, 'swap-highlight']);
      swap(arr, i, min);
      animations.push([i, min, 'swap-swap']);
      animations.push([i, min, 'restore']);
    } else {
      animations.push([min, 'restore']);
    }
  }
  animations.push(['doneall']);
  return animations;
};

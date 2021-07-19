import { swap } from './sortAnimate';

export const getSelectionSortAnimations = (array: number[]) => {
  const animations = [];
  const arr = array.map((item, index) => {
    return Number.parseFloat(item as unknown as string);
  });
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    animations.push([i, 'observe', `observe bar on index ${i}`]);
    for (let j = i + 1; j < arr.length; j++) {
      animations.push([j, 'select', `select bar on index ${j}`]);
      if (arr[j] < arr[min]) {
        if (min !== i)
          animations.push([
            min,
            j,
            'restore-select',
            `select bar on index ${j}`
          ]);
        min = j;
      } else {
        animations.push([j, 'restore', `deselect bar on index ${j}`]);
      }
    }
    if (i !== min) {
      animations.push([
        i,
        min,
        'swap-highlight',
        `swap bar on index ${i} with the observed bar`
      ]);
      swap(arr, i, min);
      animations.push([
        i,
        min,
        'swap-swap',
        `swap bar on index ${i} with the observed bar`
      ]);
      animations.push([
        i,
        min,
        'restore',
        `swap bar on index ${i} with the observed bar`
      ]);
    } else {
      animations.push([min, 'restore', `deselect the observed bar`]);
    }
  }
  animations.push(['doneall', 'all bars in final positions']);
  return animations;
};

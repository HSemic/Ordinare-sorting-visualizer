import { swap } from './sortAnimate';

export const getInsertionSortAnimations = (array: number[]) => {
  const animations = [];
  const arr = array.map((item, index) => {
    return Number.parseFloat(item as unknown as string);
  });

  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    let currValue = arr[i];
    animations.push([i, 'observe', `observe bar at index ${i}`]);
    //   animations.push([i, 'restore']);
    while (j >= 0 && arr[j] > currValue) {
      animations.push([
        j,
        j + 1,
        'swap-highlight',
        `swap bar on index ${j} with bar on index ${j + 1}`
      ]);
      swap(arr, j, j + 1);
      animations.push([
        j,
        j + 1,
        'swap-swap',
        `swap bar on index ${j} with bar on index ${j + 1}`
      ]);
      animations.push([
        j,
        j + 1,
        'observe-restore',
        `swap bar on index ${j} with bar on index ${j + 1}`
      ]);

      if (j > 0) j--;
    }
    animations.push([
      j,
      j + 1,
      'restore',
      `deselect bars on indices ${j} and ${j + 1}`
    ]);
  }
  animations.push(['doneall', 'all bars in final positions']);
  return animations;
};

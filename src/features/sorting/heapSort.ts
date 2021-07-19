export const getHeapSortAnimations = (arr: number[]) => {
  if (arr.length <= 1) return [];

  const array = arr.map((item, index) => {
    return Number.parseFloat(item as unknown as string);
  });
  const animations = [];

  let array_length: number;
  /* to create MAX  array */
  function heap_root(array: number[], i: number) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let max = i;

    if (left < array_length && array[left] > array[max]) {
      max = left;
    }

    if (right < array_length && array[right] > array[max]) {
      max = right;
    }

    if (max !== i) {
      swap(i, max);
      heap_root(array, max);
    }
  }

  function swap(i: number, j: number) {
    // const array = arr.map((item, index) => {
    //   return Number.parseFloat(item as unknown as string);
    // });
    let temp = array[i];

    animations.push([i, j, 'swap-highlight']);
    animations.push([i, j, 'swap-swap']);
    animations.push([i, j, 'restore']);

    array[i] = array[j];
    array[j] = temp;
  }

  function heapSort() {
    array_length = array.length;

    for (let i = Math.floor(array_length / 2); i >= 0; i -= 1) {
      heap_root(array, i);
    }

    for (let i = array.length - 1; i > 0; i--) {
      swap(0, i);
      array_length--;

      heap_root(array, 0);
    }
    return array;
  }

  heapSort();
  animations.push(['doneall']);
  return animations;
};

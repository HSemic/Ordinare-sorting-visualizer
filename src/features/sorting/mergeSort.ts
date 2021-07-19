export const getMergeSortAnimations = (arr: number[]) => {
  const animations = [];
  const array = arr.map((item, index) => {
    return Number.parseFloat(item as unknown as string);
  });
  if (array.length <= 1) return [];
  const auxiliaryArray = array.slice();

  const mergeSortHelper = function (
    mainArray: number[],
    auxiliaryArray: number[],
    startIndex: number,
    endIndex: number,
    level = 0
  ) {
    if (startIndex === endIndex) return;
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSortHelper(auxiliaryArray, mainArray, startIndex, midIndex, level + 1);
    mergeSortHelper(
      auxiliaryArray,
      mainArray,
      midIndex + 1,
      endIndex,
      level + 1
    );
    doMerge(mainArray, auxiliaryArray, startIndex, midIndex, endIndex, level);
  };

  //This function is tasked with merge phase of merge sort and filling the animations array. We iterate through both
  //halves of the current subarray in auxiliary array, and replace values in order, by value ascending (other orderings
  //can be defined) in the main array. We also push pair of indexes on which values are being compared, to change colors
  //of respective bars in the DOM.
  const doMerge = (
    mainArray: number[],
    auxiliaryArray: number[],
    startIndex: number,
    midIndex: number,
    endIndex: number,
    level: number
  ) => {
    let k = startIndex;
    let i = startIndex;
    let j = midIndex + 1;
    while (i <= midIndex && j <= endIndex) {
      //push once to change bar colors
      animations.push([i, j, 'select', `select bars on indices ${i} and ${j}`]);
      //push twice to change colors back
      animations.push([
        i,
        j,
        'restore',
        `deselect bars on indices ${i} and ${j}`
      ]);
      //compare values from two halves and push pair of indexes to animations array,
      //that indicates replacement
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([
          k,
          auxiliaryArray[i],
          'updateheight',
          `update height of bar on index ${i}`
        ]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([
          k,
          auxiliaryArray[j],
          'updateheight',
          `update height of bar on index ${j}`
        ]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    //next two while loops handle cases where one or both halves haven't been exhausted.
    while (i <= midIndex) {
      animations.push([i, i, 'select', `select bar on index ${i}`]);
      animations.push([i, i, 'restore', `deselect bar on index ${i}`]);
      animations.push([
        k,
        auxiliaryArray[i],
        'updateheight',
        `update height of bar on index ${i}`
      ]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIndex) {
      animations.push([j, j, 'select', `select bar on index ${j}`]);
      animations.push([j, j, 'restore', `deselect bar on index ${j}`]);
      animations.push([
        k,
        auxiliaryArray[j],
        'updateheight',
        `update height of bar on index ${j}`
      ]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  };
  mergeSortHelper(array, auxiliaryArray, 0, array.length - 1);
  animations.push(['doneall', 'all bars in final positions']);
  return animations;
};

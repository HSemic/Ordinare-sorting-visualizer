import React from 'react';

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomFloatNumber = (min: number, max: number) => {
  return (Math.random() * (max - min) + min).toFixed(1) as unknown as number;
};

export const generateArray = (size: number) => {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(generateRandomFloatNumber(5, 100));
  }
  return arr;
};

export const swap = (arr: number[], i: number, j: number) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

export const animats = (
  bars: JSX.Element[],
  anims: (string | number)[][]
): JSX.Element[][] => {
  if (anims.length === 0 || bars.length === 0) return [];

  const trace: JSX.Element[][] = [[...bars]];

  for (let i = 0; i < anims.length; i++) {
    const currentTrace: JSX.Element[] = trace[i].slice();

    switch (anims[i].length) {
      case 2:
        if (anims[i][0] === 'doneall') {
          for (let j = 0; j < currentTrace.length; j++) {
            currentTrace[j] = React.cloneElement(currentTrace[j], {
              className: 'barDone'
            });
          }
        }
        break;
      case 3:
        if (anims[i][1] === 'select') {
          currentTrace[anims[i][0] as number] = React.cloneElement(
            currentTrace[anims[i][0] as number],
            {
              className: 'barSelected'
            }
          );
        } else if (anims[i][1] === 'done') {
          currentTrace[anims[i][0] as number] = React.cloneElement(
            currentTrace[anims[i][0] as number],
            {
              className: 'barDone'
            }
          );
        } else if (anims[i][1] === 'restore') {
          currentTrace[anims[i][0] as number] = React.cloneElement(
            currentTrace[anims[i][0] as number],
            {
              className: 'barIdleLight'
            }
          );
        } else if (anims[i][1] === 'observe') {
          currentTrace[anims[i][0] as number] = React.cloneElement(
            currentTrace[anims[i][0] as number],
            {
              className: 'barObserved'
            }
          );
        } else if (anims[i][1] === 'moved') {
          currentTrace[anims[i][0] as number] = React.cloneElement(
            currentTrace[anims[i][0] as number],
            {
              className: 'barMoved'
            }
          );
        }
        break;
      case 4:
        if (anims[i][2] === 'select') {
          currentTrace[anims[i][0] as number] = React.cloneElement(
            currentTrace[anims[i][0] as number],
            {
              className: 'barSelected'
            }
          );
          currentTrace[anims[i][1] as number] = React.cloneElement(
            currentTrace[anims[i][1] as number],
            {
              className: 'barSelected'
            }
          );
        } else if (anims[i][2] === 'swap-highlight') {
          currentTrace[anims[i][0] as number] = React.cloneElement(
            currentTrace[anims[i][0] as number],
            {
              className: 'barSwapped'
            }
          );
          currentTrace[anims[i][1] as number] = React.cloneElement(
            currentTrace[anims[i][1] as number],
            {
              className: 'barSwapped'
            }
          );
        } else if (anims[i][2] === 'swap-swap') {
          [
            currentTrace[anims[i][0] as number],
            currentTrace[anims[i][1] as number]
          ] = [
            currentTrace[anims[i][1] as number],
            currentTrace[anims[i][0] as number]
          ];
        } else if (anims[i][2] === 'restore') {
          currentTrace[anims[i][0] as number] = React.cloneElement(
            currentTrace[anims[i][0] as number],
            {
              className: 'barIdleLight'
            }
          );
          currentTrace[anims[i][1] as number] = React.cloneElement(
            currentTrace[anims[i][1] as number],
            {
              className: 'barIdleLight'
            }
          );
        } else if (anims[i][2] === 'restore-select') {
          currentTrace[anims[i][0] as number] = React.cloneElement(
            currentTrace[anims[i][0] as number],
            {
              className: 'barIdleLight'
            }
          );
          currentTrace[anims[i][1] as number] = React.cloneElement(
            currentTrace[anims[i][1] as number],
            {
              className: 'barSelected'
            }
          );
        } else if (anims[i][2] === 'observe-restore') {
          currentTrace[anims[i][0] as number] = React.cloneElement(
            currentTrace[anims[i][0] as number],
            {
              className: 'barObserved'
            }
          );
          currentTrace[anims[i][1] as number] = React.cloneElement(
            currentTrace[anims[i][1] as number],
            {
              className: 'barIdleLight'
            }
          );
        } else if (anims[i][2] === 'updateheight') {
          currentTrace[anims[i][0] as number] = React.cloneElement(
            currentTrace[anims[i][0] as number],
            {
              style: {
                height: `${anims[i][1]}%`
              }
            }
          );
        }
        break;
    }
    trace.push(currentTrace);
  }

  return trace;
};

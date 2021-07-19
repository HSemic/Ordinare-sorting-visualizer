import React, { useState, useEffect, useRef } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';

import RepeatIcon from '@material-ui/icons/Repeat';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';

import DropDownMenu from './DropDownMenu';

import {
  switchAlgorithm,
  setArray,
  switchSpeed,
  switchSize,
  setPlaying
} from '../sorting/sortingSlice';

import {
  sortingAlgorithms,
  arraySizes,
  sortingSpeeds,
  defSpeedMs
} from '../../app/config';

import { generateArray, animats } from '../sorting/sortAnimate';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getBubbleSortAnimations } from '../sorting/bubbleSort';
import { getMergeSortAnimations } from '../sorting/mergeSort';
import { getQuickSortAnimations } from '../sorting/quickSort';
import { getSelectionSortAnimations } from '../sorting/selectionSort';
import { getInsertionSortAnimations } from '../sorting/insertionSort';
import { getHeapSortAnimations } from '../sorting/heapSort';

import { normalise } from '../../helpers/helpers';

import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sortContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      flexDirection: 'row',
      width: '100%',
      minWidth: '40rem',
      padding: '1rem',
      height: '25rem',
      backgroundColor:
        theme.palette.type === 'light'
          ? theme.palette.sortBackgroundColor.main
          : theme.palette.sortBackgroundColor.dark,
      '& > div': {
        position: 'relative',
        width: '100%',
        '&:not(:last-child)': {
          marginRight: '1px'
        }
      }
    },
    progressBar: {
      height: '1rem',
      width: '100%',
      minWidth: '40rem',
      marginTop: '1rem'
    }
  })
);

const SortingContainer = (): React.ReactElement => {
  const classes = useStyles();

  const [currentItem, setCurrentItem] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const [animations, setAnimations] = useState<(string | number)[][]>([]);

  const [trace, setTrace] = useState<JSX.Element[][]>([]);
  const [currentBars, setCurrentBars] = useState<JSX.Element[]>([]);
  const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);

  const { size, speed, sortingAlgorithm, array, playing } = useAppSelector(
    (state) => state.sorting
  );

  const dispatch = useAppDispatch();

  const createArray = (size: number) => {
    const arr = generateArray(size);
    dispatch(setArray(arr));
  };

  const createBars = (array: number[]) => {
    const localBars: JSX.Element[] = [];

    array.map((num, index) => {
      localBars.push(
        <div
          id={index as unknown as string}
          key={uuidv4()}
          className={'barIdleLight'}
          style={{
            height: `${num as number}%`
          }}
        ></div>
      );
    });

    return localBars;
  };

  const generateAnimations = (array: number[]) => {
    if (sortingAlgorithm === sortingAlgorithms.get('Bubble Sort')) {
      setAnimations(getBubbleSortAnimations(array));
    } else if (sortingAlgorithm === sortingAlgorithms.get('Merge Sort')) {
      setAnimations(getMergeSortAnimations(array));
    } else if (sortingAlgorithm === sortingAlgorithms.get('Quick Sort')) {
      setAnimations(getQuickSortAnimations(array));
    } else if (sortingAlgorithm === sortingAlgorithms.get('Selection Sort')) {
      setAnimations(getSelectionSortAnimations(array));
    } else if (sortingAlgorithm === sortingAlgorithms.get('Insertion Sort')) {
      setAnimations(getInsertionSortAnimations(array));
    } else if (sortingAlgorithm === sortingAlgorithms.get('Heap Sort')) {
      setAnimations(getHeapSortAnimations(array));
    } else return;
  };

  const createTimeouts = (currentItem: number) => {
    let j = 1;
    for (let i = currentItem; i < trace.length; i++) {
      const t = setTimeout(() => {
        setCurrentBars(trace[i]);
        setCurrentItem(i);
      }, (defSpeedMs / speed) * j);
      timeouts.push(t);
      j++;
    }
    setTimeouts(timeouts);
  };

  const run = (currentItem: number) => {
    pause();
    dispatch(setPlaying(true));
    createTimeouts(currentItem);
  };

  const pause = () => {
    dispatch(setPlaying(false));

    timeouts.forEach((timeout) => clearTimeout(timeout));
  };

  const restart = () => {
    timeouts.forEach((timeout) => clearTimeout(timeout));
    setCurrentItem(0);
    setCurrentBars(trace[0]);
  };

  const stepForward = () => {
    if (currentItem === timeouts.length - 1) return;

    setCurrentItem(currentItem + 1);
    setCurrentBars(trace[currentItem + 1]);
  };

  const stepBackwards = () => {
    if (currentItem === 0) return;

    setCurrentItem(currentItem - 1);
    setCurrentBars(trace[currentItem - 1]);
  };

  useEffect(() => {
    pause();
    createArray(size);
  }, [sortingAlgorithm, size]);

  useEffect(() => {
    setCurrentItem(0);
    generateAnimations(array);
  }, [array]);

  useEffect(() => {
    setCurrentBars(trace[0]);
  }, [trace]);

  useEffect(() => {
    const brs = createBars(array);
    setTrace(animats(brs, animations));
  }, [animations]);

  useEffect(() => {
    pause();
    if (playing === true) run(currentItem);
  }, [speed]);

  useEffect(() => {
    if (playing === true) run(currentItem);
  }, [currentItem]);

  return (
    <React.Fragment>
      {' '}
      <Grid item container xs={12} style={{ margin: 'auto' }} justify="center">
        <ButtonGroup style={{ margin: 'auto' }}>
          <DropDownMenu
            options={sortingAlgorithms}
            defaultOptionIndex={0}
            title="Algorithm"
            onOptionSwitch={switchAlgorithm}
          />
          <DropDownMenu
            options={arraySizes}
            defaultOptionIndex={2}
            title="Size"
            onOptionSwitch={switchSize}
          />
          <IconButton
            onClick={() => {
              // pause(0);
              pause();
              createArray(size);
            }}
          >
            <Typography>Randomize</Typography>
          </IconButton>
        </ButtonGroup>
      </Grid>
      <Grid item container xs={8} style={{ margin: 'auto' }} justify="center">
        <Paper
          ref={ref}
          id="sorting-container"
          className={classes.sortContainer}
        >
          {currentBars}
        </Paper>
      </Grid>
      <Grid item container xs={8} style={{ margin: 'auto' }} justify="center">
        <LinearProgress
          className={classes.progressBar}
          variant="determinate"
          value={normalise(currentItem, 0, trace.length - 1)}
        />
      </Grid>
      <Grid item container xs={12} style={{ margin: 'auto' }} justify="center">
        <ButtonGroup style={{ margin: 'auto', width: 'auto' }}>
          <IconButton onClick={restart}>
            <RepeatIcon />
          </IconButton>
          <IconButton onClick={stepBackwards}>
            <SkipPreviousIcon />
          </IconButton>
          {playing === false ? (
            <IconButton onClick={() => run(currentItem)}>
              <PlayArrowIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => pause()}>
              <PauseIcon />
            </IconButton>
          )}

          <IconButton onClick={stepForward}>
            <SkipNextIcon />
          </IconButton>
          <DropDownMenu
            options={sortingSpeeds}
            defaultOptionIndex={2}
            onOptionSwitch={switchSpeed}
          />
        </ButtonGroup>
      </Grid>
    </React.Fragment>
  );
};

export default SortingContainer;

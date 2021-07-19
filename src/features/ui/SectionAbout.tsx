import React, { RefObject, useEffect } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import welcomeSVG from '../../assets/img/svg/36.svg';
import htmltagSVG from '../../assets/img/svg/htmltag.svg';
import operationSVG from '../../assets/img/svg/operation.svg';

import AboutEntry from './AboutEntry';

import { useInView } from '../../app/hooks';

import { useAppDispatch } from '../../app/hooks';

import { switchValue } from './uiSlice';

import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    sectionAbout: {
      padding: theme.custom.sectionPadding,
      position: 'relative',
      '&::after': {
        content: "''",
        display: 'inline-block',
        position: 'absolute',
        bottom: '0',
        left: `calc((100% - ${theme.custom.contentWidth}) / 2)`,
        borderBottom: theme.custom.sectionBottomBorder,
        width: theme.custom.contentWidth
      }
    },
    intersector: {
      transition: 'all 1s'
    },
    faded: {
      transform: 'translateY(8rem)',
      opacity: 0
    }
  })
);

const config = {
  aboutEntries: [
    {
      title: 'Welcome to',
      specialText: 'Ordinare',
      subtitle: 'The visualizer of various sorting algorithms',
      text: `Pick your favorite sorting algorithm, set size and speed, and watch the sorting unfold!
      `,
      imgSrc: `${welcomeSVG}`,
      imgAlt: 'welcome icon'
    },
    {
      title: 'Supported',
      specialText: 'algorithms',
      subtitle: 'At the moment, six different algorithms are supported:',
      text: `Bubble sort, selection sort, insertion sort,
      quick sort, merge sort and heap sort. Sorting will be visible on all screen sizes.`,
      imgSrc: `${htmltagSVG}`,
      imgAlt: 'html tag icon'
    },
    {
      title: 'Additional',
      specialText: 'functionalities',
      subtitle: 'Theme switch and contact',
      text: `If you find the default colors too bright, feel free to switch the theme
      at any time by using the button on top right corner of the screen. You can contact
      me using the provided form for any questions and suggestions.`,
      imgSrc: `${operationSVG}`,
      imgAlt: 'gears icon'
    }
  ]
};

const SectionAbout = React.forwardRef<HTMLDivElement>(
  (_, ref): React.ReactElement => {
    const classes = useStyles();
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const isVisibleMenuSwitch = useInView(
      ref as RefObject<HTMLElement>,
      0.54,
      false
    );

    const isVisibleFadeUp = useInView(
      ref as React.RefObject<HTMLElement>,
      0.25,
      true
    );

    useEffect(() => {
      if (isVisibleMenuSwitch === true) {
        dispatch(switchValue(1));
      }
    }, [isVisibleMenuSwitch, dispatch]);

    return (
      <section
        id="sectionAbout"
        className={`${classes.sectionAbout} ${classes.intersector} ${
          isVisibleFadeUp ? '' : classes.faded
        }`}
        ref={ref}
      >
        <Grid
          container
          direction="column"
          style={{ width: theme.custom.contentWidth, margin: 'auto' }}
        >
          {config.aboutEntries.map((entry, index) => {
            const orientation = index % 2 === 0 ? 'left' : 'right';
            return (
              <AboutEntry key={uuidv4()} orientation={orientation} {...entry} />
            );
          })}
        </Grid>
      </section>
    );
  }
);

export default SectionAbout;

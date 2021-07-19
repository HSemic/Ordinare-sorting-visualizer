import React, { useEffect } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { useAppDispatch, useInView } from '../../app/hooks';
import { switchValue } from './uiSlice';

import SortingContainer from './SortingContainer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionSort: {
      // backgroundColor: "#8f94fb",
      padding: theme.custom.sectionPadding,
      height: 'auto',
      position: 'relative',
      [theme.breakpoints.down('md')]: {
        height: 'auto'
      },
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
    appContainer: {
      margin: 'auto',
      marginTop: theme.spacing(6),
      padding: '0 .5rem .5rem .5rem',
      width: '98%',
      borderLeft: '1px solid lightgrey',
      borderRight: '1px solid lightgrey',
      borderBottom: '1px solid lightgrey'
    },
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
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

// component
const SectionSort = React.forwardRef<HTMLDivElement>(
  (_, ref): React.ReactElement => {
    const classes = useStyles();
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const isVisibleMenuSwitch = useInView(
      ref as React.RefObject<HTMLElement>,
      0.51,
      false
    );

    const isVisibleFadeUp = useInView(
      ref as React.RefObject<HTMLElement>,
      0.25,
      true
    );

    useEffect(() => {
      if (isVisibleMenuSwitch === true) {
        dispatch(switchValue(2));
      }
    }, [isVisibleMenuSwitch, dispatch]);

    return (
      <section
        id="sectionSort"
        className={`${classes.sectionSort} ${classes.intersector} ${
          isVisibleFadeUp ? '' : classes.faded
        }`}
        ref={ref}
      >
        <Grid
          container
          direction="column"
          style={{ margin: 'auto', width: theme.custom.contentWidth }}
          justify="center"
          alignItems="center"
          alignContent="center"
        >
          <SortingContainer />
        </Grid>
      </section>
    );
  }
);

export default SectionSort;

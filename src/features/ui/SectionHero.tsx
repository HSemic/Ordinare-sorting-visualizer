import React, { useEffect } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AnimatedLogo from './AnimatedLogo';

import { useAppDispatch, useInView } from '../../app/hooks';

import { switchValue } from './uiSlice';

// JSS classes yea boi
// "theme" parameter not used so far
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hero: {
      height: '100vh',
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        // height: "90vh",
        paddingTop: '10rem'
      },
      [theme.breakpoints.down('md')]: {
        // height: "90vh",
        height: 'auto',
        paddingTop: '15rem'
      },
      '&::after': {
        content: "''",
        display: 'inline-block',
        position: 'absolute',
        bottom: '0',
        left: '5%',
        borderBottom: theme.custom.sectionBottomBorder,
        width: theme.custom.contentWidth
      }
    },
    center: {
      position: 'absolute',
      top: '18%',
      left: '50%',
      transform: 'translate(-50%, 50%)'
    },
    hero__text: {
      zIndex: 20
    },
    heroTextContainer: {
      minWidth: '21rem',
      marginLeft: '1rem',
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0
      }
    },
    hero__title: {
      fontFamily: 'Pacifico'
    },
    icon: {
      width: '30rem',
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0
      }
    },
    animation: {
      minWidth: '20rem',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '30',
        paddingBottom: '0'
      }
    }
  })
);

// Hero component yea
const SectionHero = React.forwardRef<HTMLDivElement>(
  (_, ref): React.ReactElement => {
    const classes = useStyles();
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const isVisibleMenuSwitch = useInView(
      ref as React.RefObject<HTMLElement>,
      0.51,
      false
    );

    useEffect(() => {
      if (isVisibleMenuSwitch === true) {
        dispatch(switchValue(0));
      }
    }, [isVisibleMenuSwitch, dispatch]);

    // return component JSX -- animated elements with animation going from bottom to top
    return (
      <section id="sectionHero" className={classes.hero}>
        <Grid
          style={{
            height: '100%',
            width: theme.custom.contentWidth,
            margin: 'auto',
            [theme.breakpoints.down('md')]: {
              margin: '20rem 0'
            }
          }}
          container
          spacing={8}
          direction="row"
          justify="flex-end"
          alignItems="center"
          ref={ref}
        >
          <Grid
            className={classes.heroTextContainer}
            md
            item
            container
            direction="column"
            justify="center"
            wrap="nowrap"
          >
            <Grid item>
              <Typography
                className={classes.hero__title}
                variant="h1"
                align="center"
                gutterBottom
              >
                Ordinare
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h2" align="center">
                Sorting visualizer
              </Typography>
            </Grid>
          </Grid>
          <Grid
            className={classes.animation}
            md
            item
            container
            justify="center"
            alignItems="center"
          >
            <AnimatedLogo />
          </Grid>
        </Grid>
      </section>
    );
  }
);

export default SectionHero;

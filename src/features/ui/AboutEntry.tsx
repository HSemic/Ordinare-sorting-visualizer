import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
    aboutContent: {
      width: '40rem',
      marginLeft: '10rem'
    },
    subtitle: {
      marginBottom: '1rem'
    },
    icon: {
      width: '30rem',
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0
      }
    },
    aboutItemContainer: {
      [theme.breakpoints.down('sm')]: {
        padding: 25
      }
    },
    aboutItemContainerMarginTop: {
      marginTop: '5rem',
      [theme.breakpoints.down('sm')]: {
        marginTop: 0
      }
    },
    specialText: {
      fontFamily: 'Pacifico'
    },
    textWidth: {
      maxWidth: '45rem'
    }
  })
);

interface AboutEntryProps {
  orientation: 'left' | 'right';
  title: string;
  specialText?: string;
  subtitle: string;
  text: string;
  imgSrc: string;
  imgAlt: string;
}

const AboutEntry = ({
  orientation,
  title,
  specialText,
  subtitle,
  text,
  imgSrc,
  imgAlt
}: AboutEntryProps): React.ReactElement => {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      className={classes.aboutItemContainer}
      item
      container
      direction="row"
      justify={
        matchesSM
          ? 'center'
          : orientation === 'left'
          ? 'flex-start'
          : 'flex-end'
      }
    >
      <Grid item>
        <Grid
          container
          direction="column"
          justify="center"
          style={{
            marginLeft: matchesSM ? 0 : '1rem',
            textAlign: matchesSM ? 'center' : undefined,
            display: 'inline-flex',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h4">
            {title}{' '}
            {specialText ? (
              <span className={classes.specialText}>{specialText}</span>
            ) : null}
          </Typography>
          <Typography className={classes.subtitle} variant="subtitle1">
            {subtitle}
          </Typography>
          <Typography variant="subtitle1" className={classes.textWidth}>
            {text}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <img
          className={classes.icon}
          alt={imgAlt}
          src={imgSrc}
          style={{
            marginLeft: matchesSM ? 0 : '2em'
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AboutEntry;

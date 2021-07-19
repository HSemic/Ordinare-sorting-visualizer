import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      padding: '2rem'
    }
  })
);

const Footer = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container justify="center" alignItems="center">
        <Typography variant="h6">Made by HSemic</Typography>
      </Grid>
    </footer>
  );
};

export default Footer;

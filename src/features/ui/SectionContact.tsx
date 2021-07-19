import React, { useState, useEffect } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid, { GridSize } from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SendIcon from '@material-ui/icons/Send';
import CheckIcon from '@material-ui/icons/Check';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import emailjs from 'emailjs-com';
import { emailConfig } from '../../app/emailConfig';

import { useAppDispatch, useInView } from '../../app/hooks';
import { switchValue } from './uiSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionContact: {
      height: 'auto',
      padding: theme.custom.sectionPadding,
      borderBottom: theme.custom.sectionBottomBorder
    },
    formContainer: {
      width: '100%',
      minWidth: '40rem',
      padding: '.5rem',
      height: '25rem'
    },
    root: {
      margin: 'auto',
      width: '80%',
      [theme.breakpoints.down('md')]: {
        width: '100%'
      },
      '& .MuiTextField-root': {
        margin: 0,
        width: '100%'
      }
    },
    submitButton: {
      width: '100%',
      height: '5rem'
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

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const config = {
  formFields: [
    {
      grid: {
        md: 6 as GridSize,
        xs: 12 as GridSize
      },
      field: {
        name: 'firstName',
        label: 'First Name'
      }
    },
    {
      grid: {
        md: 6 as GridSize,
        xs: 12 as GridSize
      },
      field: {
        name: 'lastName',
        label: 'Last Name'
      }
    },
    {
      grid: {
        xs: 12 as GridSize
      },
      field: {
        name: 'email',
        label: 'E-mail',
        type: 'email'
      }
    },
    {
      grid: {
        xs: 12 as GridSize
      },
      field: {
        name: 'subject',
        label: 'Subject'
      }
    },
    {
      grid: {
        xs: 12 as GridSize
      },
      field: {
        name: 'message',
        label: 'Message',
        multiline: true,
        rows: 6
      }
    }
  ]
};

const SectionContact = React.forwardRef<HTMLDivElement>(
  (_, ref): React.ReactElement => {
    const classes = useStyles();
    const theme = useTheme();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [sending, setSending] = useState(false);

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
        dispatch(switchValue(3));
      }
    }, [isVisibleMenuSwitch, dispatch]);

    const onSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpenSnackbar(false);
    };

    const [emailSuccess, setEmailSuccess] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    const sendEmail = (e: any) => {
      e.preventDefault();
      setSending(true);

      emailjs
        .sendForm(
          emailConfig.serviceId,
          emailConfig.templateId,
          e.target,
          emailConfig.userId
        )
        .then(
          (_) => {
            setEmailSuccess(true);
            setOpenSnackbar(true);
            setSending(false);
            e.target.reset();
          },
          (error) => {
            setEmailSuccess(false);
            setOpenSnackbar(true);
            setSending(false);
            setErrorMessage(error);
          }
        );
    };

    return (
      <section
        id="sectionContact"
        className={`${classes.sectionContact} ${classes.intersector} ${
          isVisibleFadeUp ? '' : classes.faded
        }`}
        ref={ref}
      >
        <Grid
          container
          style={{ margin: 'auto', width: theme.custom.contentWidth }}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid
            item
            container
            xs={6}
            style={{ margin: 'auto' }}
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Typography variant="h4" align="center" gutterBottom>
              Give me a shout
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
              Use the form below to drop me an e-mail
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={8}
            style={{ margin: 'auto', marginTop: '5rem' }}
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid
              item
              container
              xs={12}
              style={{ margin: 'auto' }}
              justify="center"
              alignItems="center"
              direction="column"
            >
              <form className={classes.root} onSubmit={sendEmail}>
                <Grid item container spacing={2}>
                  {config.formFields.map((field, index) => {
                    return (
                      <Grid item {...field.grid} key={index}>
                        <TextField
                          {...field.field}
                          variant="outlined"
                          required={true}
                        ></TextField>
                      </Grid>
                    );
                  })}
                  <Grid item xs={12}>
                    {sending ? (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submitButton}
                        disabled={true}
                      >
                        <CircularProgress />
                      </Button>
                    ) : emailSuccess ? (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submitButton}
                        endIcon={<CheckIcon />}
                        disabled
                      ></Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submitButton}
                        endIcon={<SendIcon />}
                      >
                        Send
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            onClose={onSnackbarClose}
          >
            {emailSuccess ? (
              <Alert onClose={onSnackbarClose} severity="success">
                Message successfully sent
              </Alert>
            ) : (
              <Alert onClose={onSnackbarClose} severity="error">
                Sending failed: {errorMessage}
              </Alert>
            )}
          </Snackbar>
        </Grid>
      </section>
    );
  }
);

export default SectionContact;

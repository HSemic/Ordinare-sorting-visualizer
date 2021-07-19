import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import { lighten } from '@material-ui/core';

import { useAppSelector } from '../../app/hooks';
import { sectionScrollOffset } from '../../app/config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginLeft: theme.spacing(0.1),
      letterSpacing: '1px',
      border: 'none',
      color: 'inherit',
      opacity: '.88',
      transition: 'transform .3s',
      '&:hover': {
        backgroundColor: 'transparent',
        opacity: '1',
        transform: 'scale(1.1)'
      }
    },
    menuButtonSelected: {
      color: lighten(theme.palette.primary.light, 0.3)
    },
    title: {
      flexGrow: 1,
      textTransform: 'capitalize',
      fontSize: '2rem'
    }
  })
);

interface Props {
  items: string[];
  iconButtons: JSX.Element[];
  refs: (React.RefObject<HTMLDivElement> | React.MutableRefObject<undefined>)[];
}

const NavButtons = ({
  items,
  iconButtons,
  refs
}: Props): React.ReactElement => {
  const classes = useStyles();

  const value = useAppSelector((state) => state.ui.value);

  const buttons = items.map((option: string, index) => {
    return (
      <Button
        key={index}
        className={
          value === index
            ? [classes.menuButton, classes.menuButtonSelected].join(' ')
            : classes.menuButton
        }
        onClick={() => {
          window.scrollTo({
            // @ts-ignore: Object is possibly 'null'.
            top: refs[index]?.current?.offsetTop - sectionScrollOffset,
            behavior: 'smooth'
          });
          // refs[index].current?.scrollIntoView({
          //   behavior: 'smooth'
          // });
        }}
      >
        <Typography variant="body1" classes={{ root: classes.title }}>
          {option}
        </Typography>
      </Button>
    );
  });

  return (
    <ButtonGroup
      component="div"
      style={{ marginLeft: 'auto' }}
      disableRipple
      disableFocusRipple
    >
      {buttons}
      {iconButtons}
    </ButtonGroup>
  );
};

export default NavButtons;

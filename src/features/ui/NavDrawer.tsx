import React, { useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { switchValue } from './uiSlice';
import { sectionScrollOffset } from '../../app/config';

import { darken } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbarMargin: {
      ...theme.mixins.toolbar,
      marginBottom: '2rem',
      [theme.breakpoints.down('md')]: {
        marginBottom: '1rem'
      },
      [theme.breakpoints.down('xs')]: {
        marginBottom: '1rem'
      }
    },
    drawerIcon: {
      fontSize: '4rem'
    },
    drawerIconContainer: {
      position: 'fixed',
      top: '1.5rem',
      right: '2.5rem',
      color: 'inherit',
      height: '4.5rem',
      width: '4.5rem',
      padding: '2.5rem',
      border: '1px solid grey',
      background: theme.palette.background.paper,
      zIndex: theme.zIndex.drawer,
      '&:hover': {
        background: darken(theme.palette.background.paper, 0.1)
      }
    },
    drawerItem: {
      opacity: '0.7',
      width: '15rem'
    },
    drawerItemSelected: {
      opacity: '1'
    }
  })
);

interface DrawerProps {
  items: string[];
  iconButtons: JSX.Element[];
  refs: (React.RefObject<HTMLDivElement> | React.MutableRefObject<undefined>)[];
  logoButton: JSX.Element;
}

const NavDrawer = ({
  items,
  iconButtons,
  refs,
  logoButton
}: DrawerProps): React.ReactElement => {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);

  const value = useAppSelector((state) => state.ui.value);

  const dispatch = useAppDispatch();

  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const list = (
    <List disablePadding dense>
      {logoButton}
      {items.map((item, index) => {
        return (
          <ListItem
            key={index}
            onClick={() => {
              setOpenDrawer(false);
              dispatch(switchValue(index));
              window.scrollTo({
                // @ts-ignore: Object is possibly 'null'.
                top: refs[index]?.current?.offsetTop - sectionScrollOffset,
                behavior: 'smooth'
              });
              // refs[index].current?.scrollIntoView({
              //   behavior: 'smooth'
              // });
            }}
            divider
            button
            selected={value === index}
          >
            <ListItemText
              className={
                value === index
                  ? [classes.drawerItem, classes.drawerItemSelected].join(' ')
                  : classes.drawerItem
              }
              disableTypography
            >
              {item}
            </ListItemText>
          </ListItem>
        );
      })}
      <ListItem>
        {iconButtons[0]} {iconButtons[1]}
      </ListItem>
    </List>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={!iOS}
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}
        onClose={() => setOpenDrawer(false)}
        variant="persistent"
      >
        {/* <div className={classes.toolbarMargin}></div> */}
        {list}
      </SwipeableDrawer>

      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return drawer;
};

export default NavDrawer;

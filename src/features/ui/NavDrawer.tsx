import React, { useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { switchValue } from './uiSlice';
import { sectionScrollOffset } from '../../app/config';

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
      color: 'inherit',
      marginLeft: 'auto',
      opacity: '.88',
      '&:hover': {
        opacity: '1'
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
}

const NavDrawer = ({
  items,
  iconButtons,
  refs
}: DrawerProps): React.ReactElement => {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);

  const value = useAppSelector((state) => state.ui.value);

  const dispatch = useAppDispatch();

  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const list = (
    <List disablePadding>
      {items.map((item: string, index) => {
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
        <div className={classes.toolbarMargin}></div>
        {list}
      </SwipeableDrawer>

      <ButtonGroup
        component="div"
        // style={{ right: "5rem", position: "absolute" }}
        disableRipple
        disableFocusRipple
      >
        {iconButtons[0]}
        {iconButtons[1]}

        <IconButton
          className={classes.drawerIconContainer}
          onClick={() => setOpenDrawer(!openDrawer)}
          disableRipple
        >
          <MenuIcon className={classes.drawerIcon} />
        </IconButton>
      </ButtonGroup>
    </React.Fragment>
  );

  return drawer;
};

export default NavDrawer;

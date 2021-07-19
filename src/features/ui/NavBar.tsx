import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import BrightnessLight from '@material-ui/icons/Brightness4';
import BrightnessDark from '@material-ui/icons/Brightness7';
import GitHub from '@material-ui/icons/GitHub';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Image from 'material-ui-image';

import logo from '../../assets/img/logo/logo1.png';

import Button from '@material-ui/core/Button';
import Buttons from './NavButtons';
import NavDrawer from './NavDrawer';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { switchTheme } from './uiSlice';
import Link from '@material-ui/core/Link';

// JSS classes
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'fixed',
      backgroundColor: 'transparent',
      transition: 'all .5s'
    },
    appBarScrolled: {
      // backgroundColor: fade(theme.palette.primary.dark, 0.96),
      // color: "#F7F2F6",
      position: 'fixed',
      transition: 'all .5s'
    },
    toolbarRoot: {
      justifyContent: 'space-between'
    },
    menuButton: {
      marginLeft: theme.spacing(0.1),
      letterSpacing: '1px',
      border: 'none',
      color: 'inherit',
      opacity: '0.85',
      transition: 'all .3s',
      '&:hover': {
        backgroundColor: 'transparent',
        opacity: '1',
        transform: 'scale(1.1)'
      }
    },
    logo: {
      flexGrow: 1
    },
    iconThemeSwitch: {
      fontSize: '3.1rem'
    },
    iconGitHub: {
      fontSize: '2.7rem'
    },
    logoButton: {
      display: 'inline-block',
      transition: 'transform .3s',
      '&:hover': {
        backgroundColor: 'transparent',
        opacity: '1',
        transform: 'scale(1.1)'
      }
    }
  })
);

const config = {
  menuItems: ['Home', 'About', 'Visualizer', 'Contact']
};

// Props interface
interface Props {
  children: React.ReactElement;
}

// navbar on scroll effect component
const ElevationScroll = (props: Props): React.ReactElement => {
  const { children } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    classes: trigger
      ? { root: `${classes.appBarScrolled}` }
      : { root: `${classes.appBar}` }
  });
};

interface NavBarProps {
  refs: React.RefObject<HTMLDivElement>[];
}

// NavBar component
const NavBar = ({ refs }: NavBarProps): React.ReactElement => {
  const classes = useStyles();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useAppDispatch();

  const darkThemeActive = useAppSelector((state) => state.ui.darkTheme);

  const gitHubButton = (
    <IconButton
      edge="start"
      className={classes.menuButton}
      aria-label="menu"
      key={0}
      href="https://github.com/HSemic/Ordinare-sorting-visualizer"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GitHub className={classes.iconGitHub} />
    </IconButton>
  );

  const lightDarkSwitch = (
    <IconButton
      className={classes.menuButton}
      aria-label="menu"
      onClick={() => dispatch(switchTheme())}
      key={1}
    >
      {darkThemeActive ? (
        <BrightnessDark className={classes.iconThemeSwitch} />
      ) : (
        <BrightnessLight className={classes.iconThemeSwitch} />
      )}
    </IconButton>
  );

  const renderedButtons = (
    <Buttons
      items={config.menuItems}
      iconButtons={[gitHubButton, lightDarkSwitch]}
      refs={refs}
    />
  );

  // NavBar return JSX

  const logoButtonJSX = (
    <Button
      classes={{ root: classes.logoButton }}
      disableFocusRipple={true}
      disableRipple={true}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    >
      <Image
        style={{
          backgroundColor: 'transparent',
          padding: 0,
          margin: '1.5rem 0 1.5rem 1.5rem',
          [theme.breakpoints.down('md')]: {
            height: '1rem'
          }
        }}
        imageStyle={{
          position: 'relative',
          [theme.breakpoints.down('md')]: {
            width: '3rem'
          }
        }}
        src={logo}
      />
    </Button>
  );

  const navBarJSX = (
    <ElevationScroll>
      <AppBar color="inherit" position="fixed">
        <Toolbar classes={{ root: classes.toolbarRoot }} disableGutters>
          {logoButtonJSX}
          {renderedButtons}
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );

  const renderedDrawer = (
    <NavDrawer
      items={config.menuItems}
      iconButtons={[gitHubButton, lightDarkSwitch]}
      refs={refs}
      logoButton={logoButtonJSX}
    />
  );

  return matches ? renderedDrawer : navBarJSX;
};

export default NavBar;

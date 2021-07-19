import React, { useRef, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider } from '@material-ui/core';
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import Navbar from './features/ui/NavBar';
import SectionHero from './features/ui/SectionHero';
import SectionAbout from './features/ui/SectionAbout';
import SectionSort from './features/ui/SectionSort';
import SectionContact from './features/ui/SectionContact';
import Footer from './features/ui/Footer';

import { Helmet } from 'react-helmet';

// import theme from "./styles/theme";

import { useAppSelector } from './app/hooks';

import logo from './assets/img/logo/logo1.png';

import ReactGA from 'react-ga';

ReactGA.initialize('UA-190519034-1');

const defFontSize = '3.1rem';

const App = (): React.ReactElement => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  const darkThemeActive = useAppSelector((state) => state.ui.darkTheme);

  const [sectionHeroRef, sectionAboutRef, sectionSortRef, sectionContactRef] = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];

  const theme = createTheme({
    typography: {
      htmlFontSize: 10,
      fontFamily: 'Lato, sans-serif',
      h1: {
        letterSpacing: '1.7rem',
        fontSize: '4rem',
        textTransform: 'uppercase'
      },
      h2: {
        letterSpacing: '1.1rem',
        fontSize: '2rem',
        textTransform: 'uppercase'
      },
      body1: {
        fontSize: '2rem'
      }
    },
    palette: {
      type: darkThemeActive ? 'dark' : 'light',
      primary: {
        main: '#5747FF'
      },
      sortBackgroundColor: {
        main: '#c7c7cc',
        dark: '#48484a'
      }
    },
    overrides: {
      MuiSvgIcon: {
        root: {
          fontSize: defFontSize
        }
      }
    },
    custom: {
      sectionHeight: 'calc(100vh - 68px)',
      sectionPadding: '5rem 0',
      contentWidth: '90%',
      sectionBottomBorder: '1px solid lightgrey'
    }
  });

  const content = (
    <React.Fragment>
      <Helmet>
        <title>Ordinare</title>
        <link rel="icon" type="image/png" href={logo}></link>
        <meta
          name="description"
          content="Visualizer of various sorting algorithms"
        />
        <meta
          name="keywords"
          content="sorting, visualizer, react, typescript, materialui"
        ></meta>
        <meta name="author" content="HSemic"></meta>
      </Helmet>

      <Paper style={{ transition: 'all .3s' }}>
        <CssBaseline />
        <Navbar
          refs={[
            sectionHeroRef,
            sectionAboutRef,
            sectionSortRef,
            sectionContactRef
          ]}
        />
        <SectionHero ref={sectionHeroRef} />
        <SectionAbout ref={sectionAboutRef} />
        <SectionSort ref={sectionSortRef} />
        <SectionContact ref={sectionContactRef} />
        <Footer />
      </Paper>
    </React.Fragment>
  );

  console.log(theme);

  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>{content}</ThemeProvider>
  );
};

export default App;

import React from 'react';

declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    custom: {
      sectionHeight: React.CSSProperties['height'];
      sectionPadding: React.CSSProperties['padding'];
      contentWidth: React.CSSProperties['width'];
      sectionBottomBorder: React.CSSProperties['borderBottom'];
    };
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    custom?: {
      sectionHeight?: React.CSSProperties['height'];
      sectionPadding?: React.CSSProperties['padding'];
      contentWidth: React.CSSProperties['width'];
      sectionBottomBorder?: React.CSSProperties['borderBottom'];
    };
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    sortBackgroundColor: Palette['primary'];
  }
  interface PaletteOptions {
    sortBackgroundColor: PaletteOptions['primary'];
  }
}

import { createMuiTheme } from '@material-ui/core/styles';
import chroma from 'chroma-js';

const BACKGROUND = '#F6F0EC';
export const PRIMARY = '#3A808A';
export const SECONDARY = '#FFA333';
export const FOOTER_BACKGROUND = '#284D5B';

export const GRAPH_COLORS = [PRIMARY, SECONDARY];

export const generateColors = (value: number): string[] => (
  chroma.scale([PRIMARY, SECONDARY, FOOTER_BACKGROUND]).mode('lch').colors(value)
);


const theme = createMuiTheme({
  palette: {
    background: {
      default: BACKGROUND,
    },
    primary: {
      main: PRIMARY,
      contrastText: BACKGROUND,
    },
    secondary: {
      main: SECONDARY,
      contrastText: BACKGROUND,
    },
  },
});

export default theme;
import { createMuiTheme } from '@material-ui/core/styles';

// Layout
export const DRAWER_WIDTH = 240;

// Colors

export const BACKGROUND = '#F6F0EC';
export const PRIMARY = '#3A808A';
export const SECONDARY = '#FFA333';
export const FOOTER_BACKGROUND = '#284D5B';
const SAND = '#E3DDCA';

export const GREEN = '113, 195, 60';
export const RED = '195, 74, 60';

export const GRAPH_COLORS = [PRIMARY, SECONDARY];
const DECISION_COLORS = [PRIMARY, SECONDARY, FOOTER_BACKGROUND, SAND];

function repeatFor(arr: Array<string>, size: number): Array<string> {
  const newArr = new Array(size);

  for(let i = 0; i < size; i++) {
    newArr[i] = arr[i % arr.length];
  }

  return newArr;
}

export const generateColors = (value: number): string[] => (
  repeatFor(DECISION_COLORS, value)
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
    info: {
      main: SECONDARY,
    }
  },
});

export default theme;
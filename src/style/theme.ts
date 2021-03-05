const space = [
  0,
  '0.25rem',
  '0.5rem',
  '1rem',
  '2rem',
  '4rem',
  '8rem',
  '16rem',
  '32rem',
] as const;

export type SpaceValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const fonts = {
  body: "'Open Sans', Calibri, sans-serif",
  code: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
} as const;

const fontSizes = ['1rem', '2rem'] as const;

const fontWeights = {
  normal: 400,
  bold: 600,
  heavy: 700,
} as const;

const lineHeights = [1.2, 1.4, 1.5] as const;

interface BreakPoints extends Array<string> {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

// @ts-expect-error ignore error, missing props are assigned after this line
const breakpoints: Breakpoints = ['26em', '48em', '60em', '75em', '100em'];

breakpoints.xs = breakpoints[0];
breakpoints.sm = breakpoints[1];
breakpoints.md = breakpoints[2];
breakpoints.lg = breakpoints[3];
breakpoints.xl = breakpoints[4];

const mediaQueries = {
  xs: `screen and (min-width: ${breakpoints[0]})`,
  sm: `screen and (min-width: ${breakpoints[1]})`,
  md: `screen and (min-width: ${breakpoints[2]})`,
  lg: `screen and (min-width: ${breakpoints[3]})`,
  xl: `screen and (min-width: ${breakpoints[4]})`,
} as const;

export const colors = {
  body: '#000000',
} as const;

const sizes = {
  maxWidth: 1400,
  contentWidth: 700,
  maxWidthText: 600,
} as const;

const theme = {
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  breakpoints,
  mediaQueries,
  space,
  colors,
  sizes,
} as const;

type Theme = typeof theme;

export default theme;

/**
 * Tell styled-components the shape of the theme
 */
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

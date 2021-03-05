import styled from 'styled-components';
import css from '@styled-system/css';
import {
  BorderProps,
  borders,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  grid,
  GridProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';
import { spacing, SpacingProps } from '@/style/functions/spacing';
import { styledShouldForwardProp } from '@/utils/styled-should-forward-prop';

export type BoxProps = SpaceProps &
  SpacingProps &
  LayoutProps &
  FlexboxProps &
  ColorProps &
  PositionProps &
  TypographyProps &
  BorderProps &
  ShadowProps &
  GridProps;

export const Box = styled.div.withConfig({
  shouldForwardProp: styledShouldForwardProp,
})<BoxProps>(
  css({
    boxSizing: 'border-box',
    minWidth: 0,
  }),
  space,
  spacing,
  layout,
  flexbox,
  color,
  position,
  typography,
  borders,
  shadow,
  grid
);

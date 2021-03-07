import React from 'react';
import css from '@styled-system/css';
import {
  color,
  ColorProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  typography,
  TypographyProps,
} from 'styled-system';
import styled from 'styled-components';
import { styledShouldForwardProp } from '@/utils/styled-should-forward-prop';
import theme from '@/style/theme';

type StyledHeadingProps = MarginProps &
  PaddingProps &
  TypographyProps &
  ColorProps;

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends StyledHeadingProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  level: HeadingLevel;
}

const levelStyles: Record<HeadingLevel, ReturnType<typeof css>> = {
  1: css({ fontSize: '5rem', mb: 4 }),
  2: css({ fontSize: '4rem', mb: 4 }),
  3: css({ fontSize: '3rem', mb: 3 }),
  4: css({ fontSize: '2rem', mb: 3 }),
  5: css({ fontSize: '1.75rem', mb: 3 }),
  6: css({ fontSize: '1.5rem', mb: 3 }),
};

export const Heading = styled.h1
  .withConfig({
    shouldForwardProp: styledShouldForwardProp,
  })
  .attrs<HeadingProps>((x) => ({
    as: x.as || `h${x.level}`,
  }))<HeadingProps>(
  (x) => levelStyles[x.level],
  css({ fontFamily: theme.fonts.body, lineHeight: 2, mt: 0 }),
  margin,
  padding,
  typography,
  color
);

import { ResponsiveValue, styleFn } from 'styled-system';
import { SpaceValue } from '@/style/theme';
import { asResponsiveArray } from '@/style/utils';
import css from '@styled-system/css';

export interface SpacingProps {
  spacing?: ResponsiveValue<SpaceValue>;
  spacingHorizontal?: boolean;
}

export const spacing: styleFn = (x: SpacingProps) => {
  if (x?.spacing) {
    const value = asResponsiveArray(x.spacing);

    return css({
      '& > *:not(:last-child)': {
        marginRight: x.spacingHorizontal ? value : null,
        marginBottom: !x.spacingHorizontal ? value : null,
      },
    });
  }
};

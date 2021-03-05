import styled from 'styled-components';
import { styledShouldForwardProp } from '@/utils/styled-should-forward-prop';
import { space, SpaceProps } from 'styled-system';

export const Spacer = styled.div.withConfig({
  shouldForwardProp: styledShouldForwardProp,
})<SpaceProps>(space);

import { CssFunctionReturnType } from '@styled-system/css';

declare module 'react' {
  import { DOMAttributes } from 'react';

  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CssFunctionReturnType;
  }
}

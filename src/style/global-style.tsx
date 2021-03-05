import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.15;
    scroll-behavior: smooth;
  }

  #__next {
    position: relative;
    overflow: hidden;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    color: ${({ theme }) => theme.colors.body};
    font-style: normal;
    font-weight: normal;
    font-size: ${({ theme }) => theme.fontSizes[0]};
    line-height: ${({ theme }) => theme.lineHeights[2]};
    margin: 0;
    background: #f3f3f3;
    overflow-anchor: none;
  }
  
  img, svg {
    max-width: 100%;
  }
  
  figure {
    margin: 0;
  }
  
  p {
    margin-top: 0;
  }
  
  button::-moz-focus-inner {
    border: 0;
  }
  
  [tabindex='-1'] {
    outline: none;
  }
  
  @media (prefers-reduced-motion) {
    * {
      transition: none !important;
      transition-duration: 0s !important;
    }
    
    html {
      scroll-behavior: auto;
    }
  }
`;

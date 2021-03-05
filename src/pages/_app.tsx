import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import theme from '@/style/theme';
import { GlobalStyle } from '@/style/global-style';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

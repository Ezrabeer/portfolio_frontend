import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/style/global-style';
import { useDarkMode } from '@/hooks/use-dark-mode';
import { darkTheme, lightTheme } from '@/style/theme';
import { useEffect, useState } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [themeMode, toggleTheme] = useDarkMode();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      {isMounted && <Component {...pageProps} toggleTheme={toggleTheme} />}
    </ThemeProvider>
  );
}

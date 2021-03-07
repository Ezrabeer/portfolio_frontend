import { AppProps } from 'next/app';
import { Provider, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/style/global-style';
import { useDarkMode } from '@/hooks/use-dark-mode';
import { darkTheme, lightTheme } from '@/style/theme';
import React, { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import { AuthGuard } from '@/services/auth-guard';
import store from '@/store';
import { loadUser } from '@/store/slices/authSlice';

require('@/config');

interface CustomAppProps extends AppProps {
  user: null | any;
}

function App(props) {
  const [themeMode, toggleTheme] = useDarkMode();
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();

  const { component: Component, pageProps, user } = props;

  useEffect(() => {
    setIsMounted(true);

    if (user) {
      dispatch(loadUser(user));
    }
  }, [dispatch, user]);

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      {isMounted && <Component {...pageProps} toggleTheme={toggleTheme} />}
    </ThemeProvider>
  );
}

function MyApp({ Component, pageProps, user }: CustomAppProps) {
  return (
    <Provider store={store}>
      <App component={Component} pageProps={pageProps} user={user} />
    </Provider>
  );
}

MyApp.getInitialProps = async ({ req, res, pathname }: NextPageContext) => {
  /**
   * Abort if one var is not present.
   * For example, the req obj will be undefined if we don't
   * have a page reload but a page switch via the Next Router.
   */
  if (!req || !pathname || !res) {
    return {};
  }

  const authenticator = new AuthGuard();
  return await authenticator.authenticateUser(req, res, pathname);
};

export default MyApp;

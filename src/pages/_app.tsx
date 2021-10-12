import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { ContextProvider } from '../hooks/contexts';
import { store } from '../store';

import { GlobalStyle } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <ContextProvider>
        <Component {...pageProps} />
        <GlobalStyle />
      </ContextProvider>
    </Provider>
  );
}
export default MyApp;

import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import { ContextProvider } from '../hooks/contexts';
import { store } from '../store';
import * as locales from '../content/locale';

import { GlobalStyle } from '../styles/global';

interface RouterType {
  locale: keyof typeof locales;
  defaultLocale: string;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale, defaultLocale } = router as RouterType;
  const messages = locales[locale];

  return (
    <Provider store={store}>
      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <ContextProvider>
          <Component {...pageProps} />
          <GlobalStyle />
        </ContextProvider>
      </IntlProvider>
    </Provider>
  );
}
export default MyApp;

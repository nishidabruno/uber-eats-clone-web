import Document, {
  DocumentInitialProps,
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ReactElement } from 'react';
import { ServerStyleSheet } from 'styled-components';

interface InitialProps extends DocumentInitialProps {
  styles: ReactElement;
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<InitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="alternate"
            hrefLang="en-US"
            href={process.env.NEXT_PUBLIC_APP_URL}
          />
          <link
            rel="alternate"
            hrefLang="ja"
            href={`${process.env.NEXT_PUBLIC_APP_URL}/ja`}
          />
          <meta
            name="description"
            content="Uber eats clone for educational purposes"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

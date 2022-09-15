import '../styles/Main.scss'
import React from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
require('@solana/wallet-adapter-react-ui/styles.css');
import dynamic from 'next/dynamic'
import '../styles/globals.css'
export default function MyApp({ Component, pageProps }) {
  const WalletConnectProvider = dynamic(
    () => import('../context/WalletConnectionProvider'),
    { ssr: false }
  );
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>MetaReview - OnChain Feedback program</title>
        <meta name="title" content="MetaReview - OnChain Feedback programm" />
        <meta name="description" content="Take part in range of surveys on the decentralised infrastructure. Developed by team MetaReview." />
        <meta name="keywords" content="solana, anchor, survey, dapp" />
        <meta name="robots" content="index,follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />

      <WalletConnectProvider>
        <Component {...pageProps} />
      </WalletConnectProvider>

    </React.Fragment>
  );
}


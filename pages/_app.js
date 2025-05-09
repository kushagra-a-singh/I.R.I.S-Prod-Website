import './_app.css';
import Header2 from '../src/components/Header2';
import Footer from '../src/components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import Head from 'next/head';
import Chatbot1 from '@/components/chatbot/Chatbot1';
import Script from 'next/script';

function App({ Component, pageProps }) {

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <div className="App" style={{
      width: '100%',
      margin: '0',
      padding: '0',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Head>
        <title>I.R.I.S - Innovation Research & Intelligence Support</title>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/logo-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo-16x16.png" /> */}
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-KCK2584ZLN"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KCK2584ZLN');
        `}
      </Script>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        main {
          padding-top: 60px;  /* Adjust this value based on your header height */
        }
      `}</style>
      <Header2 style={{ position: 'fixed', top: 0, left: 0, right: 0}} />
      <Component {...pageProps} />
      <Chatbot1 />
      <Footer />
    </div>
  );
}

export default App;

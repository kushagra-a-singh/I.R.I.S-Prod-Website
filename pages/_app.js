import './_app.css';
import Header2 from '../src/components/Header2';
import Footer from '../src/components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';
import Head from 'next/head';


function App({ Component, pageProps }) {

  useEffect(() => {
    // Import Bootstrap JS on the client side
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
        {/* Add favicon links here */}
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo-16x16.png" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        <meta name="theme-color" content="#ffffff" />
      </Head>
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
      <Footer />
    </div>
  );
}

export default App;

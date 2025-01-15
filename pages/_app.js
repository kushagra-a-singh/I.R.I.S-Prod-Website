//import '../styles/globals.css';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

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
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default App;

// pages/_app.js
//import '../styles/globals.css'; // Import any global styles you have
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

function App({ Component, pageProps }) {
  return (
    <div className="App">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default App;

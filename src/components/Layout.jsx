import Header from './Header';
import Footer from './Footer';
import AdSense from './AdSense';
import './Layout.css';

const Layout = ({ children, showAds = true }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      {showAds && (
        <div className="in-content-ads">
          <AdSense position="default" />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Layout;

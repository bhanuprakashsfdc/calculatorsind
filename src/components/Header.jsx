import { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Calculators', path: '/calculators.html' },
    { name: 'Health', path: '/category/health.html' },
    { name: 'Financial', path: '/category/financial.html' },
    { name: 'Math', path: '/category/math.html' },
    { name: 'Fitness', path: '/category/fitness.html' },
    { name: 'Blog', path: '/blog.html' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🧮</span>
            <span className="logo-text">Calculators.net</span>
          </Link>
          
          <button 
            className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger"></span>
          </button>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <Link to={item.path} className="nav-link" onClick={closeMenu}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="header-actions">
            <div className="search-action">
              {isSearchOpen ? (
                <div className="header-search">
                  <Search onClose={() => setIsSearchOpen(false)} />
                </div>
              ) : (
                <button 
                  className="search-btn" 
                  onClick={toggleSearch}
                  aria-label="Open search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Header;

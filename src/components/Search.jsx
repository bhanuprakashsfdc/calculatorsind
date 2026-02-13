import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { searchCalculators } from '../data/calculators';
import './Search.css';

const Search = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchCalculators(query);
      setResults(searchResults);
      setIsOpen(searchResults.length > 0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Click outside to close
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };

    // Escape key to close
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleResultClick = () => {
    setQuery('');
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search calculators..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button 
            className="search-clear"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="search-dropdown">
          {results.map((calc) => (
            <Link
              key={calc.id}
              to={`/${calc.slug}.html`}
              className="search-result"
              onClick={handleResultClick}
            >
              <div className="search-result-content">
                <span className="search-result-name">{calc.name}</span>
                <span className="search-result-category">{calc.categoryName}</span>
              </div>
              <svg className="search-result-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          ))}
        </div>
      )}

      {query.length >= 2 && !isOpen && (
        <div className="search-dropdown search-empty">
          <p>No calculators found for "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default Search;

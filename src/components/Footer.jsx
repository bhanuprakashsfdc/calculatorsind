import { Link } from 'react-router-dom';
import { calculatorCategories } from '../data/calculators';
import { getAllBlogCategories } from '../data/blogs';
import './Footer.css';

const Footer = () => {
  const blogCategories = getAllBlogCategories();
  
  return (
    <footer className="footer">
      {/* AdSense Placeholder - Top Footer */}
      <div className="adsense-container">
        <div className="adsense-placeholder">
          <span>Advertisement</span>
        </div>
      </div>
      
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Calculators</h3>
            <ul className="footer-links">
              {calculatorCategories.slice(0, 4).map((category) => (
                <li key={category.id}>
                  <Link to={`/category/${category.slug}.html`}>{category.name}</Link>
                </li>
              ))}
              <li><Link to="/calculators.html">All Calculators</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Popular Calculators</h3>
            <ul className="footer-links">
              <li><Link to="/bmi-calculator.html">BMI Calculator</Link></li>
              <li><Link to="/mortgage-calculator.html">Mortgage Calculator</Link></li>
              <li><Link to="/calorie-calculator.html">Calorie Calculator</Link></li>
              <li><Link to="/compound-interest-calculator.html">Compound Interest</Link></li>
              <li><Link to="/age-calculator.html">Age Calculator</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Blog Categories</h3>
            <ul className="footer-links">
              {blogCategories.map((category) => (
                <li key={category}>
                  <Link to={`/blog/category/${category.toLowerCase()}.html`}>{category}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Company</h3>
            <ul className="footer-links">
              <li><Link to="/about.html">About Us</Link></li>
              <li><Link to="/contact.html">Contact</Link></li>
              <li><Link to="/privacy.html">Privacy Policy</Link></li>
              <li><Link to="/terms.html">Terms of Service</Link></li>
              <li><Link to="/sitemap.html">Sitemap</Link></li>
            </ul>
          </div>
        </div>
        
        {/* AdSense Placeholder - Middle Footer */}
        <div className="adsense-container">
          <div className="adsense-placeholder">
            <span>Advertisement</span>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Calculators.net. All rights reserved.</p>
          <p>Free online calculators for all your needs.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

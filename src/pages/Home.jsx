import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AdSense from '../components/AdSense';
import { calculatorCategories } from '../data/calculators';
import { getRecentBlogs } from '../data/blogs';
import './Home.css';

const Home = () => {
  const recentBlogs = getRecentBlogs(3);

  return (
    <>
      <SEO 
        title="Free Online Calculators"
        description="Over 100 free online calculators for health, fitness, financial, math, and more. Calculate BMI, mortgage payments, compound interest, and more."
        keywords={['online calculators', 'free calculators', 'financial calculators', 'health calculators']}
      />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Free Online Calculators</h1>
          <p className="hero-subtitle">
            Over 100 free calculators for health, fitness, finance, math, and more
          </p>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search calculators..." 
              className="search-input"
            />
            <button className="search-button">Search</button>
          </div>
        </div>
      </section>

      {/* AdSense - Below Hero */}
      <div className="container">
        <AdSense position="leaderboard" />
      </div>

      {/* Calculator Categories */}
      <section className="section">
        <div className="container">
          <h2>Calculator Categories</h2>
          <div className="category-grid">
            {calculatorCategories.map((category) => (
              <Link 
                to={`/category/${category.slug}.html`} 
                key={category.id}
                className="category-card"
              >
                <span className="category-icon">{category.icon}</span>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span className="category-count">
                  {category.calculators.length} calculators
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense - Middle */}
      <div className="container">
        <AdSense position="default" />
      </div>

      {/* Popular Calculators */}
      <section className="section">
        <div className="container">
          <h2>Popular Calculators</h2>
          <div className="calculator-grid">
            {calculatorCategories.flatMap(cat => cat.calculators).slice(0, 12).map((calc) => (
              <Link 
                to={`/${calc.slug}.html`}
                key={calc.id}
                className="calculator-card"
              >
                <h3>{calc.name}</h3>
                <p>{calc.description}</p>
              </Link>
            ))}
          </div>
          <div className="view-all">
            <Link to="/calculators.html" className="btn-primary">
              View All Calculators
            </Link>
          </div>
        </div>
      </section>

      {/* AdSense - Before Blog */}
      <div className="container">
        <AdSense position="rectangle" />
      </div>

      {/* Recent Blog Posts */}
      <section className="section">
        <div className="container">
          <h2>Latest from Our Blog</h2>
          <div className="blog-grid">
            {recentBlogs.map((blog) => (
              <Link 
                to={`/blog/${blog.slug}.html`}
                key={blog.id}
                className="blog-card"
              >
                <span className="blog-category">{blog.category}</span>
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
                <div className="blog-meta">
                  <span>{blog.author}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="view-all">
            <Link to="/blog.html" className="btn-primary">
              View All Blog Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <h2>Why Use Our Calculators</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">✓</div>
              <h3>Free to Use</h3>
              <p>All our calculators are completely free with no hidden costs</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3>Instant Results</h3>
              <p>Get immediate answers with our fast calculation engine</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Access calculators from any device, anywhere</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <h3>Private & Secure</h3>
              <p>No data is stored or shared. Your calculations stay private</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

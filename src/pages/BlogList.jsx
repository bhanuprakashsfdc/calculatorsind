import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AdSense from '../components/AdSense';
import { blogs, getAllBlogCategories } from '../data/blogs';
import './BlogList.css';

const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = getAllBlogCategories();

  const filteredBlogs = selectedCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  return (
    <>
      <SEO 
        title="Blog"
        description="Read our latest articles on health, fitness, financial planning, math tips, and more. Expert advice and guides to help you make informed decisions."
        keywords={['blog', 'articles', 'health tips', 'financial advice', 'fitness guides']}
      />
      
      <div className="page-header">
        <div className="container">
          <h1>Our Blog</h1>
          <p>Expert advice, guides, and insights on calculators and more</p>
        </div>
      </div>

      <div className="container">
        <AdSense position="leaderboard" />
        
        <div className="blog-content">
          <aside className="blog-sidebar">
            <div className="category-filter">
              <h3>Categories</h3>
              <ul>
                <li>
                  <button 
                    className={selectedCategory === 'all' ? 'active' : ''}
                    onClick={() => setSelectedCategory('all')}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <button 
                      className={selectedCategory === category ? 'active' : ''}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <AdSense position="sidebar" />
          </aside>

          <main className="blog-main">
            <div className="blog-header">
              <h2>
                {selectedCategory === 'all' 
                  ? 'All Blog Posts' 
                  : `${selectedCategory} Articles`}
              </h2>
              <p>{filteredBlogs.length} articles</p>
            </div>

            <div className="blog-grid">
              {filteredBlogs.map((blog) => (
                <Link 
                  to={`/blog/${blog.slug}.html`}
                  key={blog.id}
                  className="blog-card"
                >
                  <div className="blog-card-content">
                    <span className="blog-category">{blog.category}</span>
                    <h3>{blog.title}</h3>
                    <p>{blog.excerpt}</p>
                    <div className="blog-meta">
                      <span>{blog.author}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>

        <AdSense position="rectangle" />
      </div>
    </>
  );
};

export default BlogList;

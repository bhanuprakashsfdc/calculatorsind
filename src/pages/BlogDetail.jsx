import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AdSense from '../components/AdSense';
import { getBlogBySlug, blogs, getBlogsByCategory } from '../data/blogs';
import './BlogDetail.css';

const BlogDetail = () => {
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return (
      <>
        <SEO title="Blog Post Not Found" />
        <div className="container">
          <div className="not-found">
            <h1>Blog Post Not Found</h1>
            <p>The article you're looking for doesn't exist.</p>
            <Link to="/blog.html" className="btn-primary">View All Articles</Link>
          </div>
        </div>
      </>
    );
  }

  const relatedBlogs = getBlogsByCategory(blog.category)
    .filter(b => b.id !== blog.id)
    .slice(0, 3);

  return (
    <>
      <SEO 
        title={blog.title}
        description={blog.excerpt}
        keywords={blog.keywords}
        ogTitle={blog.title}
        ogDescription={blog.excerpt}
        article={true}
        author={blog.author}
        publishedTime={blog.date}
      />
      
      <div className="page-header">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/blog.html">Blog</Link>
            <span>/</span>
            <span>{blog.title}</span>
          </nav>
          <span className="blog-category-tag">{blog.category}</span>
          <h1>{blog.title}</h1>
          <div className="blog-header-meta">
            <span>By {blog.author}</span>
            <span>•</span>
            <span>{blog.readTime}</span>
            <span>•</span>
            <span>{blog.date}</span>
          </div>
        </div>
      </div>

      <div className="container">
        <AdSense position="leaderboard" />
        
        <div className="article-content">
          <article className="article-main">
            <AdSense position="in-article" />
            
            <div className="article-body" dangerouslySetInnerHTML={{ __html: blog.content }} />
            
            <AdSense position="in-article" />
            
            <div className="article-tags">
              <h4>Tags</h4>
              <div className="tags">
                {blog.keywords.map((keyword, index) => (
                  <span key={index} className="tag">{keyword}</span>
                ))}
              </div>
            </div>

            <div className="share-buttons">
              <h4>Share This Article</h4>
              <div className="share-links">
                <button className="share-btn facebook">Facebook</button>
                <button className="share-btn twitter">Twitter</button>
                <button className="share-btn linkedin">LinkedIn</button>
              </div>
            </div>

            {relatedBlogs.length > 0 && (
              <div className="related-articles">
                <h3>Related Articles</h3>
                <div className="related-grid">
                  {relatedBlogs.map((relatedBlog) => (
                    <Link 
                      to={`/blog/${relatedBlog.slug}.html`}
                      key={relatedBlog.id}
                      className="related-card"
                    >
                      <span className="related-category">{relatedBlog.category}</span>
                      <h4>{relatedBlog.title}</h4>
                      <p>{relatedBlog.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="article-sidebar">
            <AdSense position="sidebar" />
            
            <div className="popular-posts">
              <h3>Popular Articles</h3>
              <ul>
                {blogs.slice(0, 5).map((b) => (
                  <li key={b.id}>
                    <Link to={`/blog/${b.slug}.html`}>
                      {b.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;

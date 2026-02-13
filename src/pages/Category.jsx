import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AdSense from '../components/AdSense';
import { getCategoryBySlug, calculatorCategories } from '../data/calculators';
import './Category.css';

const Category = () => {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);

  if (!category) {
    return (
      <>
        <SEO title="Category Not Found" />
        <div className="container">
          <div className="not-found">
            <h1>Category Not Found</h1>
            <p>The category you're looking for doesn't exist.</p>
            <Link to="/calculators.html" className="btn-primary">View All Calculators</Link>
          </div>
        </div>
      </>
    );
  }

  const otherCategories = calculatorCategories.filter(c => c.id !== category.id);

  return (
    <>
      <SEO 
        title={`${category.name} Calculators`}
        description={category.description}
        keywords={[`${category.name.toLowerCase()} calculators`, 'free online calculators']}
      />
      
      <div className="page-header">
        <div className="container">
          <span className="category-icon-large">{category.icon}</span>
          <h1>{category.name} Calculators</h1>
          <p>{category.description}</p>
        </div>
      </div>

      <div className="container">
        <AdSense position="leaderboard" />
        
        <div className="category-content">
          <div className="main-content">
            <h2>All {category.name} Calculators</h2>
            <div className="calculator-grid">
              {category.calculators.map((calc) => (
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
          </div>

          <aside className="sidebar">
            <AdSense position="sidebar" />
            
            <div className="other-categories">
              <h3>Other Categories</h3>
              <ul>
                {otherCategories.map((cat) => (
                  <li key={cat.id}>
                    <Link to={`/category/${cat.slug}.html`}>
                      <span>{cat.icon}</span> {cat.name}
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

export default Category;

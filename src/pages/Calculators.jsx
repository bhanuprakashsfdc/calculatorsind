import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AdSense from '../components/AdSense';
import { calculatorCategories } from '../data/calculators';
import './Calculators.css';

const Calculators = () => {
  const allCalculators = calculatorCategories.flatMap(cat => cat.calculators);

  return (
    <>
      <SEO 
        title="All Calculators"
        description="Browse all free online calculators. Find calculators for health, fitness, financial, math, time, and unit conversions."
        keywords={['all calculators', 'calculator list', 'free online calculators']}
      />
      
      <div className="page-header">
        <div className="container">
          <h1>All Calculators</h1>
          <p>Browse our collection of {allCalculators.length} free online calculators</p>
        </div>
      </div>

      <div className="container">
        <AdSense position="leaderboard" />
        
        <div className="calculator-categories">
          {calculatorCategories.map((category) => (
            <div key={category.id} className="category-section">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h2>{category.name} Calculators</h2>
              </div>
              <div className="calculator-list">
                {category.calculators.map((calc) => (
                  <Link 
                    to={`/${calc.slug}.html`}
                    key={calc.id}
                    className="calculator-item"
                  >
                    <h3>{calc.name}</h3>
                    <p>{calc.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <AdSense position="rectangle" />
      </div>
    </>
  );
};

export default Calculators;

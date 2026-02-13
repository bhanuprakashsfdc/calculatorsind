import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import Calculators from './pages/Calculators';
import Category from './pages/Category';
import Calculator from './pages/Calculator';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
            
            {/* All Calculators */}
            <Route path="/calculators.html" element={<Calculators />} />
            
            {/* Category Pages */}
            <Route path="/category/:slug.html" element={<Category />} />
            
            {/* Individual Calculator Pages */}
            <Route path="/:slug.html" element={<Calculator />} />
            
            {/* Blog Pages */}
            <Route path="/blog.html" element={<BlogList />} />
            <Route path="/blog/:slug.html" element={<BlogDetail />} />
            
            {/* Fallback 404 */}
            <Route path="*" element={
              <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
                <h1>Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
              </div>
            } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

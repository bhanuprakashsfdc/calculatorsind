import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords = [], 
  canonical, 
  ogTitle, 
  ogDescription, 
  ogImage,
  ogUrl,
  article = false,
  author,
  publishedTime,
  modifiedTime
}) => {
  const defaultTitle = 'Calculators.net - Free Online Calculators';
  const defaultDescription = 'Free online calculators for health, fitness, financial, math, and more. Calculate BMI, mortgage payments, compound interest, and thousands of other calculations.';
  const defaultKeywords = ['calculators', 'online calculator', 'free calculator', 'BMI calculator', 'mortgage calculator', 'math calculator'];
  const siteUrl = 'https://www.calculators.net';
  
  const fullTitle = title ? `${title} | Calculators.net` : defaultTitle;
  const fullDescription = description || defaultDescription;
  const fullKeywords = [...defaultKeywords, ...keywords].join(', ');
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullOgUrl = ogUrl ? `${siteUrl}${ogUrl}` : siteUrl;
  const defaultOgImage = `${siteUrl}/og-image.png`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      {canonical && <link rel="canonical" href={fullCanonical} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || fullDescription} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:url" content={fullOgUrl} />
      <meta property="og:site_name" content="Calculators.net" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || fullDescription} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />
      
      {/* Article Specific */}
      {article && author && <meta name="author" content={author} />}
      {article && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {article && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Calculators.net",
          "url": siteUrl,
          "description": defaultDescription,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${siteUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;

import { useState, useEffect } from 'react';
import './AdSense.css';

const AdSense = ({ position = 'default', adSlot, adClient }) => {
  const [adsenseId, setAdsenseId] = useState(null);
  
  useEffect(() => {
    // In production, this would load the actual AdSense script
    const savedAdSenseId = localStorage.getItem('adsense_pub_id');
    if (savedAdSenseId) {
      setAdsenseId(savedAdSenseId);
    }
  }, []);

  // Ad sizes based on position
  const adSizes = {
    'default': { width: 728, height: 90 },
    'sidebar': { width: 300, height: 250 },
    'in-article': { width: 300, height: 250 },
    'rectangle': { width: 336, height: 280 },
    'large-rectangle': { width: 320, height: 100 },
    'mobile-banner': { width: 320, height: 50 },
    'leaderboard': { width: 970, height: 90 },
  };

  const size = adSizes[position] || adSizes['default'];

  if (adsenseId) {
    // In production, render actual AdSense ad
    return (
      <div className={`adsense-wrapper adsense-${position}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: size.width, height: size.height }}
          data-ad-client={adClient || 'ca-pub-XXXXXXXXX'}
          data-ad-slot={adSlot || 'XXXXXXXXX'}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Development/placeholder mode
  return (
    <div className={`adsense-wrapper adsense-${position}`}>
      <div 
        className="adsense-placeholder-dev"
        style={{ width: size.width, height: size.height }}
      >
        <span>Advertisement</span>
        <p>AdSense Ad ({size.width}x{size.height})</p>
      </div>
    </div>
  );
};

export default AdSense;

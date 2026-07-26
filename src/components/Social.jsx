import React from 'react';

const socialImages = [
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509937528035-ad76254b0356?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

const Social = () => {
  return (
    <section className="social container">
      <div className="social-header">
        <div>
          <span className="section-label">03 / SIGHTINGS</span>
          <h2 className="section-title" style={{ marginBottom: 0 }}>FOLLOW THE NOISE</h2>
        </div>
        {/* Simple Instagram Icon SVG placeholder */}
        <div style={{ width: '32px', height: '32px', border: '2px solid white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ width: '12px', height: '12px', border: '2px solid white', borderRadius: '50%' }}></div>
        </div>
      </div>
      
      <div className="social-grid">
        {socialImages.map((img, index) => (
          <div key={index} className="social-item">
            <img src={img} alt={`Social ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Social;

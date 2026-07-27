import React from 'react';

import menInShirts from '../assets/images/men in shirts.png';
import glassesLifestyleMan from '../assets/images/glasses lifestyle man.png';
import shirtWoman from '../assets/images/shirt woman.png';
import glassesLifestyleWoman from '../assets/images/glasses lifestyle woman.png';

const socialImages = [
  menInShirts,
  glassesLifestyleMan,
  shirtWoman,
  glassesLifestyleWoman,
];

const Social = () => {
  return (
    <section className="social container">
      <div className="social-header">
        <div>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            JOIN THE MOVEMENT
          </h2>
        </div>
        <div
          style={{
            width: '32px',
            height: '32px',
            border: '2px solid white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              border: '2px solid white',
              borderRadius: '50%',
            }}
          ></div>
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

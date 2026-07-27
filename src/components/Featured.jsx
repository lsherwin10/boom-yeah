import React from 'react';

import glassesFront from '../assets/images/glasses front.png';
import glassesLeft from '../assets/images/glasses left.png';
import glassesRight from '../assets/images/glasses right.png';
import glassesStuff from '../assets/images/glasses stuff.png';

import shirt from '../assets/images/shirt.png';
import shirtMan from '../assets/images/shirt man.png';
import shirtWoman from '../assets/images/shirt woman.png';
import shirtTable from '../assets/images/shirt table.png';

const products = [
  {
    id: 1,
    title: 'BOOM-YEAH! Mirrored Sunglasses',
    category: 'Eyewear',
    price: '$9.99',
    images: [glassesFront, glassesLeft, glassesRight, glassesStuff],
  },
  {
    id: 2,
    title: 'BOOM-YEAH! Graphic Tee',
    category: 'Apparel',
    price: '$14.99',
    images: [shirt, shirtMan, shirtWoman, shirtTable],
  },
];

const Featured = ({ onProductClick }) => {
  return (
    <section className="featured container">
      <h2 className="section-title">FEATURED PRODUCTS</h2>
      <div className="featured-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => onProductClick(product)}
          >
            <div className="product-image">
              <img
                src={product.images && product.images[0]}
                alt={product.title}
              />
            </div>
            <div className="product-meta">
              <div>
                <h3 className="product-title">{product.title}</h3>
                <span className="product-category">{product.category}</span>
              </div>
              <span className="product-price">{product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;

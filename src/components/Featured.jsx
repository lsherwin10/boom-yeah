import React from 'react';

const products = [
  {
    id: 1,
    title: 'Chrome Shield / Silver',
    category: 'Eyewear',
    price: '$148.00',
    img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Chrome Shield / Black',
    category: 'Eyewear',
    price: '$148.00',
    img: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Boom-Yeah! Graphic Tee',
    category: 'Apparel',
    price: '$42.00',
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const Featured = () => {
  return (
    <section className="featured container">
      <span className="section-label">01 / THE DROP</span>
      <h2 className="section-title">FEATURED HARDWARE</h2>
      
      <div className="featured-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.img} alt={product.title} />
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

import React from 'react';

const products = [
  {
    id: 1,
    title: 'Boom-Yeah! Mirrored Sunglasses',
    category: 'Eyewear',
    price: '$9.99',
    img: 'src/assets/images/glasses front.png'
  },
  {
    id: 2,
    title: 'Boom-Yeah! Graphic Tee',
    category: 'Apparel',
    price: '$14.99',
    img: 'src/assets/images/shirt.png'
  }
];

const Featured = ({ onProductClick }) => {
  return (
    <section className="featured container">
      {/* <span className="section-label">01 / THE DROP</span> */}
      <h2 className="section-title">FEATURED PRODUCTS</h2>
      
      <div className="featured-grid">
        {products.map(product => (
          <div key={product.id} className="product-card" onClick={() => onProductClick(product)}>
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

import React, { useState } from 'react';

const ProductModal = ({ product, onClose, onAdd }) => {
  const [size, setSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const isApparel = product.category === 'Apparel';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-grid">
          <div className="modal-image">
            <img src={product.img} alt={product.title} />
          </div>
          <div className="modal-info">
            <span className="product-category">{product.category}</span>
            <h2 className="modal-title">{product.title}</h2>
            <p className="modal-price">{product.price}</p>
            
            {isApparel && (
              <div className="modal-section">
                <label>SIZE</label>
                <div className="size-selector">
                  {['S', 'M', 'L', 'XL'].map(s => (
                    <button 
                      key={s} 
                      className={`size-btn ${size === s ? 'active' : ''}`}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="modal-section">
              <label>QUANTITY</label>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
            
            <button className="add-to-cart-btn" onClick={() => onAdd(product, isApparel ? size : 'OS', quantity)}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

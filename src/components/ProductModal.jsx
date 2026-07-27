import React, { useState } from 'react';

const ProductModal = ({ product, onClose, onAdd }) => {
  const [size, setSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isApparel = product.category === 'Apparel';

  const images = product.images && product.images.length > 0
    ? product.images
    : [];

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-grid">
          <div className="modal-image" style={{ position: 'relative' }}>

            {/* Previous Arrow - Only show if there are multiple images */}
            {images.length > 1 && (
              <button
                className="carousel-btn prev-btn"
                onClick={handlePrevImage}
                style={carouselBtnStyleLeft}
              >
                &#10094;
              </button>
            )}

            <img
              src={images[currentImageIndex]}
              alt={`${product.title} - View ${currentImageIndex + 1}`}
            />

            {/* Next Arrow - Only show if there are multiple images */}
            {images.length > 1 && (
              <button
                className="carousel-btn next-btn"
                onClick={handleNextImage}
                style={carouselBtnStyleRight}
              >
                &#10095;
              </button>
            )}

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

// Simple inline styles to position the arrows vertically centered on the edges
const baseCarouselBtnStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  cursor: 'pointer',
  fontSize: '18px',
  borderRadius: '3px'
};

const carouselBtnStyleLeft = {
  ...baseCarouselBtnStyle,
  left: '10px'
};

const carouselBtnStyleRight = {
  ...baseCarouselBtnStyle,
  right: '10px'
};

export default ProductModal;

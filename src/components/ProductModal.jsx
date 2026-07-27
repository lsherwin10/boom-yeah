import React, { useState } from 'react';

const ProductModal = ({ product, onClose, onAdd }) => {
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isApparel = product.category === 'Apparel';

  const images =
    product.images && product.images.length > 0 ? product.images : [];

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

  // Allow the user to type the quantity
  const handleQuantityChange = (e) => {
    const val = e.target.value;

    // Allow empty string so the user can delete the number to type a new one
    if (val === '') {
      setQuantity('');
      return;
    }

    // Parse as an integer and update state if it's a valid number
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setQuantity(num);
    }
  };

  // If the user clicks away leaving the field empty or 0, reset it to 1
  const handleQuantityBlur = () => {
    if (quantity === '' || quantity < 1) {
      setQuantity(1);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <div className="modal-grid">
          <div className="modal-image" style={{ position: 'relative' }}>
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
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
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
                <button
                  onClick={() =>
                    setQuantity(Math.max(1, (Number(quantity) || 1) - 1))
                  }
                >
                  -
                </button>

                <input
                  type="text"
                  className="quantity-input"
                  value={quantity}
                  onChange={handleQuantityChange}
                  onBlur={handleQuantityBlur}
                />

                <button
                  onClick={() => setQuantity((Number(quantity) || 0) + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className={`add-to-cart-btn ${isApparel && !size ? 'disabled' : ''}`}
              disabled={isApparel && !size}
              onClick={() =>
                onAdd(
                  product,
                  isApparel ? size : 'OS',
                  quantity === '' ? 1 : quantity
                )
              }
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  borderRadius: '3px',
};

const carouselBtnStyleLeft = {
  ...baseCarouselBtnStyle,
  left: '10px',
};

const carouselBtnStyleRight = {
  ...baseCarouselBtnStyle,
  right: '10px',
};

export default ProductModal;

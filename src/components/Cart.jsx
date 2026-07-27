import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Cart = ({ items, onClose, onRemove, onUpdateQuantity, onClear }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  });
  // 1. Add a loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = items.reduce((acc, item) => {
    // Assuming price might sometimes just be a number or not have a $ sign, it's good to ensure it's a string before calling replace.
    const priceString = String(item.price);
    const priceNum = parseFloat(priceString.replace('$', ''));
    return acc + priceNum * item.quantity;
  }, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // 2. Set submitting to true right when the order process starts
    setIsSubmitting(true);

    const orderItems = items
      .map(
        (item) =>
          `${item.quantity}x ${item.title} (Size: ${item.size}) - ${item.price}`
      )
      .join('\n');

    const templateParams = {
      user_first_name: formData.firstName,
      user_last_name: formData.lastName,
      user_email: formData.email,
      user_address:
        formData.address1 +
        '\n' +
        (formData.address2 ? formData.address2 + '\n' : '') +
        formData.city +
        ', ' +
        formData.state +
        ' ' +
        formData.zip,
      order_details: orderItems,
      total_price: total.toFixed(2),
    };

    emailjs
      .send(
        'service_d3k2wfq',
        'template_029nx9k',
        templateParams,
        'CFYj7i0r3QSRYMdb0'
      )
      .then(() => {
        alert(
          'Order placed successfully! Please check your email for confirmation and to arrange payment.'
        );
        onClear();
        onClose();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert('Something went wrong with the email. Please try again.');
      })
      .finally(() => {
        // 3. Set submitting back to false regardless of success or failure
        setIsSubmitting(false);
      });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>YOUR CART</h2>
          <button
            className="modal-close"
            onClick={onClose}
            disabled={isSubmitting}
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {items.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.images && item.images[0]} alt={item.title} />
                  <div className="cart-item-info">
                    <h4>{item.title}</h4>
                    <div className="cart-item-meta">
                      {item.size && (
                        <span className="cart-item-size">
                          Size: {item.size}
                        </span>
                      )}

                      <div className="quantity-selector cart-quantity-selector">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(index, -1)}
                          onPointerUp={(e) => {
                            if (e.pointerType === 'mouse')
                              e.currentTarget.blur();
                          }}
                        >
                          −
                        </button>

                        <span className="cart-quantity-display">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(index, 1)}
                          onPointerUp={(e) => {
                            if (e.pointerType === 'mouse')
                              e.currentTarget.blur();
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="cart-item-price">{item.price}</p>
                  </div>
                  <button
                    className="remove-item-btn"
                    onClick={() => onRemove(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-total">
                <span>TOTAL</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <form onSubmit={handlePlaceOrder} className="checkout-form">
                <div className="form-row">
                  <input
                    required
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                  <input
                    required
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                <input
                  required
                  name="address1"
                  placeholder="Address Line 1"
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                <input
                  name="address2"
                  placeholder="Address Line 2 (Optional)"
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                <div className="form-row">
                  <input
                    required
                    name="city"
                    placeholder="City"
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                  <input
                    required
                    name="state"
                    placeholder="State"
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                  <input
                    required
                    name="zip"
                    placeholder="Zip Code"
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>

                {/* 4. Update the submit button to react to the loading state */}
                <button
                  type="submit"
                  className={`add-to-cart-btn checkout-btn ${isSubmitting ? 'disabled' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'PLACING ORDER...' : 'PLACE ORDER'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

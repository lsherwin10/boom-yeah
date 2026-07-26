import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Cart = ({ items, onClose, onRemove, onUpdateQuantity, onClear }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', address1: '', address2: '', city: '', state: '', zip: '' });

  const total = items.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace('$', ''));
    return acc + (priceNum * item.quantity);
  }, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Format cart items for email
    const orderItems = items.map(item =>
      `${item.quantity}x ${item.title} (Size: ${item.size}) - ${item.price}`
    ).join('\n');

    const templateParams = {
      user_first_name: formData.firstName,
      user_last_name: formData.lastName,
      user_email: formData.email,
      user_address: formData.address1 + '\n' + (formData.address2 ? formData.address2 + '\n' : '') + formData.city + ', ' + formData.state + ' ' + formData.zip,
      order_details: orderItems,
      total_price: total.toFixed(2)
    };

    emailjs.send(
      'service_d3k2wfq',
      'template_029nx9k',
      templateParams,
      'CFYj7i0r3QSRYMdb0'
    ).then(() => {
      alert("Order placed successfully! Check your email for a confirmation.");
      onClear();
      onClose();
    }).catch((error) => {
      console.error('EmailJS Error:', error);
      alert("Something went wrong with the email. Please try again.");
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>YOUR CART</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
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
                  <img src={item.img} alt={item.title} />
                  <div className="cart-item-info">
                    <h4>{item.title}</h4>
                    <p className="cart-item-meta">
                      Size: {item.size} | Qty:
                      <button onClick={() => onUpdateQuantity(index, -1)} style={{ background: 'transparent', color: 'white', border: 'none', cursor: 'pointer', margin: '0 4px' }}>-</button>
                      {item.quantity}
                      <button onClick={() => onUpdateQuantity(index, 1)} style={{ background: 'transparent', color: 'white', border: 'none', cursor: 'pointer', margin: '0 4px' }}>+</button>
                    </p>
                    <p className="cart-item-price">{item.price}</p>
                  </div>
                  <button className="remove-item-btn" onClick={() => onRemove(index)}>✕</button>
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
                  <input required name="firstName" placeholder="First Name" onChange={handleInputChange} />
                  <input required name="lastName" placeholder="Last Name" onChange={handleInputChange} />
                </div>
                <input required name="email" type="email" placeholder="Email Address" onChange={handleInputChange} />
                <input required name="address1" placeholder="Address Line 1" onChange={handleInputChange} />
                <input name="address2" placeholder="Address Line 2 (Optional)" onChange={handleInputChange} />
                <div className="form-row">
                  <input required name="city" placeholder="City" onChange={handleInputChange} />
                  <input required name="state" placeholder="State" onChange={handleInputChange} />
                  <input required name="zip" placeholder="Zip Code" onChange={handleInputChange} />
                </div>
                <button type="submit" className="add-to-cart-btn checkout-btn">PLACE ORDER</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

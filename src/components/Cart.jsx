import React, { useState } from 'react';

const Cart = ({ items, onClose, onRemove, onUpdateQuantity, onClear }) => {
  const [formData, setFormData] = useState({ name: '', email: '', address: '', city: '', zip: '' });

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
    ).join('%0D%0A');
    
    const subject = `New Order from ${formData.name}`;
    const body = `Order Details:%0D%0A${orderItems}%0D%0A%0D%0ATotal: $${total.toFixed(2)}%0D%0A%0D%0AShipping Address:%0D%0A${formData.name}%0D%0A${formData.address}%0D%0A${formData.city}, ${formData.zip}%0D%0A${formData.email}%0D%0A%0D%0APlease contact me to arrange payment.`;
    
    window.location.href = `mailto:orders@boom-yeah.com?subject=${subject}&body=${body}`;
    onClear();
    onClose();
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
                      <button onClick={() => onUpdateQuantity(index, -1)} style={{background:'transparent', color:'white', border:'none', cursor:'pointer', margin:'0 4px'}}>-</button>
                      {item.quantity}
                      <button onClick={() => onUpdateQuantity(index, 1)} style={{background:'transparent', color:'white', border:'none', cursor:'pointer', margin:'0 4px'}}>+</button>
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
                <input required name="name" placeholder="Full Name" onChange={handleInputChange} />
                <input required name="email" type="email" placeholder="Email Address" onChange={handleInputChange} />
                <input required name="address" placeholder="Shipping Address" onChange={handleInputChange} />
                <div className="form-row">
                  <input required name="city" placeholder="City" onChange={handleInputChange} />
                  <input required name="zip" placeholder="Zip Code" onChange={handleInputChange} />
                </div>
                <button type="submit" className="add-to-cart-btn checkout-btn">PLACE ORDER (EMAIL)</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

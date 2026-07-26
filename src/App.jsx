import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Featured from './components/Featured';
import Manifesto from './components/Manifesto';
import Social from './components/Social';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import './index.css'; // Make sure styles are loaded if they aren't in main.jsx

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('boomYeahCart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('boomYeahCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product, size, quantity) => {
    setCartItems(prev => {
      // Check if item with same id and size exists
      const existingIndex = prev.findIndex(item => item.id === product.id && item.size === size);
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }
      return [...prev, { ...product, size, quantity }];
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems(prev => prev.filter((_, i) => i !== indexToRemove));
  };

  const updateQuantity = (index, delta) => {
    setCartItems(prev => {
      const newCart = [...prev];
      newCart[index] = { ...newCart[index], quantity: newCart[index].quantity + delta };
      if (newCart[index].quantity <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      return newCart;
    });
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Hero />
      <Featured onProductClick={handleProductClick} />
      <Manifesto />
      <Social />

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={closeProductModal} 
          onAdd={addToCart} 
        />
      )}

      {isCartOpen && (
        <Cart 
          items={cartItems} 
          onClose={() => setIsCartOpen(false)} 
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onClear={() => setCartItems([])}
        />
      )}

      {/* Floating Cart Button */}
      <button 
        className="floating-cart-btn" 
        onClick={() => setIsCartOpen(true)}
      >
        CART ({totalItems})
      </button>
    </>
  );
}

export default App;

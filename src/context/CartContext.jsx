import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// Client-side only — nothing here ever hits the backend until checkout.
// The displayed total is for the user's convenience only; the backend
// always recalculates the real total from current product prices on submit.
const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Each line: { product, quantity, customization_notes }
  const [lines, setLines] = useState([]);

  const addItem = useCallback((product, quantity = 1, customization_notes = '') => {
    setLines((prev) => {
      const existing = prev.find(
        (line) => line.product.id === product.id && line.customization_notes === customization_notes
      );
      if (existing) {
        return prev.map((line) =>
          line === existing ? { ...line, quantity: line.quantity + quantity } : line
        );
      }
      return [...prev, { product, quantity, customization_notes }];
    });
  }, []);

  const removeItem = useCallback((index) => {
    setLines((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback((index, quantity) => {
    setLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, quantity: Math.max(1, quantity) } : line))
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const total = useMemo(
    () => lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    [lines]
  );

  const itemCount = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);

  const value = useMemo(
    () => ({ lines, addItem, removeItem, updateQuantity, clear, total, itemCount }),
    [lines, addItem, removeItem, updateQuantity, clear, total, itemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}

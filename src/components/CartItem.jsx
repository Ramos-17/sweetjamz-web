export default function CartItem({ line, index, onUpdateQuantity, onRemove }) {
  const { product, quantity, customization_notes } = line;

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <strong>{product.name}</strong>
        <span>${product.price.toFixed(2)} each</span>
        {customization_notes && <em className="cart-item-notes">"{customization_notes}"</em>}
      </div>
      <div className="cart-item-controls">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => onUpdateQuantity(index, Number(e.target.value))}
        />
        <span className="cart-item-subtotal">${(product.price * quantity).toFixed(2)}</span>
        <button type="button" onClick={() => onRemove(index)}>
          Remove
        </button>
      </div>
    </div>
  );
}

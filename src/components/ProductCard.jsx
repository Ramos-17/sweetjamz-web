export default function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      {product.image_url ? (
        <img className="product-card-image" src={product.image_url} alt={product.name} />
      ) : (
        <div className="product-card-image-placeholder" aria-hidden="true">
          🥐
        </div>
      )}
      <div className="product-card-body">
        <h3>{product.name}</h3>
        {product.description && <p className="product-description">{product.description}</p>}
        <p className="product-price">${product.price.toFixed(2)}</p>
        {onAdd && (
          <button type="button" onClick={() => onAdd(product)}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

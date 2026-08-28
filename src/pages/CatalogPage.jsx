import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const CATEGORIES = [
  { value: null, label: 'All' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'pastry', label: 'Pastry' },
];

export default function CatalogPage() {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchProducts({ category })
      .then((data) => {
        if (!cancelled) setProducts(data.data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [category]);

  return (
    <div className="page">
      <h1>Menu</h1>

      <div className="category-tabs">
        {CATEGORIES.map((c) => (
          <button
            key={c.label}
            type="button"
            className={category === c.value ? 'active' : ''}
            onClick={() => setCategory(c.value)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="form-error">{error}</p>}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addItem} />
        ))}
      </div>
    </div>
  );
}

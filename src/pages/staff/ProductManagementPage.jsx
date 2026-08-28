import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../api/products';
import ProductForm from '../../components/ProductForm';

export default function ProductManagementPage() {
  const { employee } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    // The backend returns the full catalog (including inactive products)
    // when the request carries a valid employee token.
    return fetchProducts({ token: employee.token })
      .then((data) => setProducts(data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [employee.token]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreate(values) {
    await createProduct(values, employee.token);
    setCreating(false);
    load();
  }

  async function handleUpdate(id, values) {
    await updateProduct(id, values, employee.token);
    setEditingId(null);
    load();
  }

  async function handleDeactivate(id) {
    await deleteProduct(id, employee.token);
    load();
  }

  return (
    <div className="page">
      <h1>Products</h1>

      {error && <p className="form-error">{error}</p>}

      {creating ? (
        <ProductForm
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
          submitLabel="Create product"
        />
      ) : (
        <button type="button" onClick={() => setCreating(true)}>
          New product
        </button>
      )}

      {loading && <p>Loading...</p>}

      <ul className="product-management-list">
        {products.map((product) =>
          editingId === product.id ? (
            <li key={product.id}>
              <ProductForm
                initialValues={product}
                onSubmit={(values) => handleUpdate(product.id, values)}
                onCancel={() => setEditingId(null)}
                submitLabel="Save changes"
              />
            </li>
          ) : (
            <li key={product.id} className="product-management-row">
              <div>
                <strong>{product.name}</strong> — ${product.price.toFixed(2)} ({product.category})
                {!product.is_active && <span className="badge">inactive</span>}
              </div>
              <div className="product-management-actions">
                <button type="button" onClick={() => setEditingId(product.id)}>
                  Edit
                </button>
                {product.is_active && (
                  <button type="button" className="danger" onClick={() => handleDeactivate(product.id)}>
                    Deactivate
                  </button>
                )}
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

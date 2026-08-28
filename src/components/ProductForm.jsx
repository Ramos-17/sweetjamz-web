import { useState } from 'react';

const emptyForm = {
  name: '',
  description: '',
  category: 'coffee',
  price: '',
  image_url: '',
  is_customizable: false,
  is_active: true,
};

export default function ProductForm({ initialValues, onSubmit, onCancel, submitLabel = 'Save' }) {
  const [form, setForm] = useState(() => ({ ...emptyForm, ...initialValues }));
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        price: Number(form.price),
      });
    } catch (err) {
      setError(err.body?.message || err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}

      <label>
        Name
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </label>

      <label>
        Description
        <textarea
          value={form.description ?? ''}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </label>

      <label>
        Category
        <select value={form.category} onChange={(e) => handleChange('category', e.target.value)}>
          <option value="coffee">Coffee</option>
          <option value="pastry">Pastry</option>
        </select>
      </label>

      <label>
        Price
        <input
          type="number"
          step="0.01"
          min="0"
          required
          value={form.price}
          onChange={(e) => handleChange('price', e.target.value)}
        />
      </label>

      <label>
        Image URL
        <input
          type="text"
          value={form.image_url ?? ''}
          onChange={(e) => handleChange('image_url', e.target.value)}
        />
      </label>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={form.is_customizable}
          onChange={(e) => handleChange('is_customizable', e.target.checked)}
        />
        Customizable
      </label>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) => handleChange('is_active', e.target.checked)}
        />
        Active
      </label>

      <div className="product-form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

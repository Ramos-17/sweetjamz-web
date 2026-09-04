import { useEffect, useState } from 'react';

/**
 * File input with a live preview. Shows the current image (if any) until a
 * new file is chosen, then previews the new file locally before it's ever
 * submitted anywhere.
 *
 * @param {{ currentImageUrl?: string|null, onChange: (file: File|null) => void }} props
 */
export default function ImageUploadField({ currentImageUrl, onChange }) {
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl ?? null);

  // Revoke the object URL when it's replaced/unmounted so we don't leak memory.
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleFileChange(e) {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : (currentImageUrl ?? null));
  }

  return (
    <div>
      {previewUrl ? (
        <img className="image-upload-preview" src={previewUrl} alt="Product preview" />
      ) : (
        <div className="image-upload-preview product-card-image-placeholder">🥐</div>
      )}
      <label>
        {currentImageUrl ? 'Replace image' : 'Product image'}
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} />
      </label>
    </div>
  );
}

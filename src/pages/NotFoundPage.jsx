import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>This page wandered off.</h2>
      <p className="product-description">
        We couldn't find what you were looking for. Maybe it's time for a pastry instead.
      </p>
      <Link to="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  );
}

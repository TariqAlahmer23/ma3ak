import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="premium-card rounded-3xl p-8 text-center">
      <h1 className="font-heading text-3xl text-text">Not found</h1>
      <p className="mt-2 text-sm text-muted">The route you requested does not exist in this demo.</p>
      <Link to="/home" className="premium-btn mt-4 inline-flex rounded-2xl px-4 py-2 text-sm">Go home</Link>
    </div>
  );
}

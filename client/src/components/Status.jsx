export function LoadingState({ label = 'Loading graph data…' }) {
  return <div className="state-card"><div className="spinner" /> <span>{label}</span></div>;
}

export function EmptyState({ title = 'Nothing found', message = 'Try another search or selection.' }) {
  return <div className="state-card"><strong>{title}</strong><span>{message}</span></div>;
}

export function ErrorState({ message = 'Something went wrong.' }) {
  return <div className="state-card error-state"><strong>Graph unavailable</strong><span>{message}</span></div>;
}

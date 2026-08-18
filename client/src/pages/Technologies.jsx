import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/api.js';
import { EmptyState, ErrorState, LoadingState } from '../components/Status.jsx';

export default function Technologies() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(null);
      api
        .technologies({ search, limit: 20 })
        .then(setData)
        .catch((e) => setError(e.response?.data?.error || e.message));
    }, 250);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <main className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Technology network</p>
          <h1>Technology Explorer</h1>
          <p className="hero-copy">
            Explore where technologies appear, what they connect to and which
            roles they support.
          </p>
        </div>
      </div>

      <div className="search-wrap">
        <input
          aria-label="Search technologies"
          placeholder="Search technologies or categories…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error ? (
        <ErrorState message={error} />
      ) : !data ? (
        <LoadingState />
      ) : data.items.length === 0 ? (
        <EmptyState title="No technologies found" />
      ) : (
        <section className="card-grid">
          {data.items.map((t) => (
            <Link
              className="entity-card tech-card"
              key={t.id}
              to={`/technologies/${t.id}`}
            >
              <div className="entity-icon">{t.name.slice(0, 1)}</div>
              <div>
                <strong>{t.name}</strong>
                <span>{t.category}</span>
                <p>{t.description}</p>
              </div>
              <b>{t.projectCount}</b>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}

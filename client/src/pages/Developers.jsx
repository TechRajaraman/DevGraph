import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/api.js';
import { EmptyState, ErrorState, LoadingState } from '../components/Status.jsx';

export default function Developers() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(null);
      setError('');
      api
        .developers({ search, limit: 12 })
        .then(setData)
        .catch((e) => setError(e.response?.data?.error || e.message));
    }, 250);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <main className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">People in the graph</p>
          <h1>Developer Explorer</h1>
          <p className="hero-copy">
            Search developers and inspect the skills, projects and technologies
            connected to them.
          </p>
        </div>
      </div>

      <div className="search-wrap">
        <input
          aria-label="Search developers"
          placeholder="Search by name, title or location…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error ? (
        <ErrorState message={error} />
      ) : !data ? (
        <LoadingState />
      ) : data.items.length === 0 ? (
        <EmptyState title="No developers found" />
      ) : (
        <section className="card-grid">
          {data.items.map((dev) => (
            <Link
              className="developer-card"
              to={`/developers/${dev.id}`}
              key={dev.id}
            >
              <div className="avatar">
                {dev.name
                  .split(' ')
                  .map((x) => x[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div className="developer-main">
                <strong>{dev.name}</strong>
                <span>{dev.title}</span>
                <small>
                  {dev.location} · {dev.experienceYears} yrs
                </small>
                <div className="chips">
                  {dev.skills.slice(0, 3).map((s) => (
                    <span key={s.name}>{s.name}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}

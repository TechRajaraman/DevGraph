import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api/api.js';
import { ErrorState, LoadingState } from '../components/Status.jsx';
import TechnologyGraph from '../components/TechnologyGraph.jsx';

export default function TechnologyDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .technology(id)
      .then(setData)
      .catch((e) => setError(e.response?.data?.error || e.message));
  }, [id]);

  if (error)
    return (
      <main className="page">
        <ErrorState message={error} />
      </main>
    );

  if (!data)
    return (
      <main className="page">
        <LoadingState />
      </main>
    );

  return (
    <main className="page">
      <Link className="back-link" to="/technologies">
        ← Technologies
      </Link>

      <section className="profile-hero">
        <div className="entity-icon hero-icon">{data.name.slice(0, 1)}</div>
        <div>
          <p className="eyebrow">Technology</p>
          <h1>{data.name}</h1>
          <p className="profile-title">{data.category}</p>
          <p className="muted">{data.description}</p>
        </div>
      </section>

      <div className="detail-grid">
        <section className="panel">
          <p className="eyebrow">Network</p>
          <h2>Connected technologies</h2>
          <TechnologyGraph
            center={{
              id: data.id,
              name: data.name,
              category: data.category,
            }}
            related={data.related}
          />
        </section>

        <section className="panel">
          <p className="eyebrow">Career relevance</p>
          <h2>Skills & roles</h2>

          <h3>Mapped skills</h3>
          <div className="chips large-chips">
            {data.mappedSkills.map((s) => (
              <span key={s.id}>{s.name}</span>
            ))}
          </div>

          <h3>Supported roles</h3>
          <div className="chips large-chips">
            {data.supportedRoles.map((r) => (
              <span key={r.id}>{r.name}</span>
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <p className="eyebrow">Projects</p>
        <h2>Where it is used</h2>
        <div className="card-grid compact">
          {data.projects.map((p) => (
            <div className="project-row" key={p.id}>
              <strong>{p.name}</strong>
              <span>
                {p.year} · {p.importance}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

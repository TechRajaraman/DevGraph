import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/api.js';
import { ErrorState, LoadingState } from '../components/Status.jsx';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .dashboard()
      .then(setData)
      .catch((e) => setError(e.response?.data?.error || e.message));
  }, []);

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

  const stats = [
    ['developers', 'Developers'],
    ['skills', 'Skills'],
    ['technologies', 'Technologies'],
    ['projects', 'Projects'],
    ['roles', 'Roles'],
    ['companies', 'Companies'],
  ];

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-copy-block">
          <p className="eyebrow">Developer knowledge graph</p>
          <h1>See how skills, projects and technologies connect.</h1>
          <p className="hero-copy">
            DevGraph turns developer data into an explorable network — from
            individual profiles to multi-hop career paths.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/career">
              Explore a career path →
            </Link>
            <Link className="button secondary" to="/technologies">
              Browse technologies
            </Link>
          </div>
        </div>
        <div className="hero-orbit">
          <span>Skills</span>
          <span>Projects</span>
          <span className="orbit-core">Graph</span>
          <span>Roles</span>
          <span>Tech</span>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map(([key, label]) => (
          <article className="stat-card" key={key}>
            <strong>{data.stats[key] ?? 0}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section className="section-heading">
        <div>
          <p className="eyebrow">Graph signals</p>
          <h2>Most connected technologies</h2>
        </div>
        <Link to="/technologies">View all →</Link>
      </section>

      <section className="card-grid technology-cards">
        {data.popularTechnologies.map((tech) => (
          <Link
            className="entity-card"
            key={tech.id}
            to={`/technologies/${tech.id}`}
          >
            <div className="entity-icon">{tech.name.slice(0, 1)}</div>
            <div>
              <strong>{tech.name}</strong>
              <span>{tech.category}</span>
            </div>
            <b>{tech.projectCount} projects</b>
          </Link>
        ))}
      </section>

      <section className="panel graph-panel">
        <div>
          <p className="eyebrow">Relationship view</p>
          <h2>Technology network</h2>
          <p className="muted">
            The production graph view will be driven by live RELATED_TO edges
            from CognoDB.
          </p>
        </div>
        <div className="mini-network">
          <div className="mini-node center">React</div>
          <div className="mini-node n1">TypeScript</div>
          <div className="mini-node n2">Next.js</div>
          <div className="mini-node n3">Node.js</div>
          <div className="mini-node n4">Jest</div>
        </div>
      </section>
    </main>
  );
}

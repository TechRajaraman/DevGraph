import { useEffect, useState } from 'react';
import { api } from '../api/api.js';
import { ErrorState, LoadingState, EmptyState } from '../components/Status.jsx';
import GraphPath from '../components/GraphPath.jsx';

export default function CareerExplorer() {
  const [options, setOptions] = useState(null);
  const [skillId, setSkillId] = useState('');
  const [roleId, setRoleId] = useState('');
  const [result, setResult] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .careerOptions()
      .then((o) => {
        setOptions(o);
        setSkillId(o.skills[0]?.id || '');
        setRoleId(o.roles[0]?.id || '');
      })
      .catch((e) => setError(e.response?.data?.error || e.message));
  }, []);

  useEffect(() => {
    if (skillId)
      api
        .careerRecommendations(skillId)
        .then(setRecommendations)
        .catch(() => {});
  }, [skillId]);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      setResult(await api.careerPath({ skillId, roleId }));
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  }

  if (error && !options)
    return (
      <main className="page">
        <ErrorState message={error} />
      </main>
    );

  if (!options)
    return (
      <main className="page">
        <LoadingState />
      </main>
    );

  return (
    <main className="page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Graph traversal</p>
          <h1>Career Explorer</h1>
          <p className="hero-copy">
            Pick a current skill and a target role. DevGraph finds a connected
            path through the knowledge graph.
          </p>
        </div>
      </section>

      <form className="career-form panel" onSubmit={submit}>
        <label>
          Current skill
          <select value={skillId} onChange={(e) => setSkillId(e.target.value)}>
            {options.skills.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {s.category}
              </option>
            ))}
          </select>
        </label>

        <div className="form-arrow">→</div>

        <label>
          Target role
          <select value={roleId} onChange={(e) => setRoleId(e.target.value)}>
            {options.roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} · {r.level}
              </option>
            ))}
          </select>
        </label>

        <button className="button primary" disabled={loading}>
          {loading ? 'Finding path…' : 'Find career path'}
        </button>
      </form>

      {error && <ErrorState message={error} />}

      {result ? (
        <section className="panel result-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Career path</p>
              <h2>
                From {result.nodes?.[0]?.name} to{' '}
                {result.nodes?.[result.nodes.length - 1]?.name}
              </h2>
            </div>
          </div>
          <GraphPath nodes={result.nodes} relationships={result.relationships} />
        </section>
      ) : null}

      {!loading && result === null && !error ? (
        <section className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Tips</p>
              <h2>Find your next role</h2>
            </div>
          </div>
          <p className="muted">
            Select a skill and target role above to explore a learning path
            through DevGraph's knowledge graph.
          </p>
          {recommendations.length > 0 ? (
            <div>
              <h3>
                Recommended transitions for{' '}
                {options.skills.find((s) => s.id === skillId)?.name}
              </h3>
              <div className="recommendations">
                {recommendations.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    className="rec-card"
                    onClick={() => setRoleId(role.id)}
                  >
                    <strong>{role.name}</strong>
                    <span>{role.level}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}
    </main>
  );
}

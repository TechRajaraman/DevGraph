function position(index, total) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return { x: 50 + Math.cos(angle) * 34, y: 50 + Math.sin(angle) * 34 };
}

export default function TechnologyGraph({ center, related = [] }) {
  const nodes = [{ ...center, center: true }, ...related.slice(0, 6)];
  if (!center) return null;
  const positions = nodes.map((_, index) => index === 0 ? { x: 50, y: 50 } : position(index - 1, Math.max(related.slice(0, 6).length, 1)));
  return (
    <div className="network-graph">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {positions.slice(1).map((p, index) => <line key={index} x1="50" y1="50" x2={p.x} y2={p.y} />)}
      </svg>
      {nodes.map((node, index) => {
        const p = positions[index];
        return <div key={node.id} className={`network-node ${node.center ? 'center' : ''}`} style={{ left: `${p.x}%`, top: `${p.y}%` }}><small>{node.category}</small><strong>{node.name}</strong></div>;
      })}
    </div>
  );
}

export default function GraphPath({ nodes = [], relationships = [] }) {
  if (!nodes.length) return null;
  return (
    <div className="path-rail" aria-label="Graph path">
      {nodes.map((node, index) => (
        <div className="path-step" key={`${node.id}-${index}`}>
          <div className={`node node-${node.type?.toLowerCase() || 'default'}`}>
            <span>{node.type}</span>
            <strong>{node.name}</strong>
            {node.category && <small>{node.category}</small>}
          </div>
          {index < nodes.length - 1 && <div className="path-edge"><span>{relationships[index] || 'CONNECTED_TO'}</span><i /></div>}
        </div>
      ))}
    </div>
  );
}

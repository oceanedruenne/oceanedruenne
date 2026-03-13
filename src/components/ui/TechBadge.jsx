export default function TechBadge({ tech, color }) {
  return (
    <span
      style={{
        fontSize: "11px",
        padding: "2px 8px",
        borderRadius: "4px",
        border: `1px solid ${color}55`,
        color,
        background: `${color}11`,
        whiteSpace: "nowrap",
      }}
    >
      {tech}
    </span>
  );
}

import { useTheme } from "../context/ThemeContext.jsx";
import FadeIn from "./ui/FadeIn";
import TechBadge from "./ui/TechBadge";
import { IconGitlab } from "./icons/Icons";

export default function Projects({ t, filter, setFilter, isMobile, isTablet, sectionWrap, sectionHeader }) {
  const { colors } = useTheme();

  const filtered = filter === 0 ? t.projects : t.projects.filter(p => p.category === t.categories[filter]);

  return (
    <section id="projects" style={sectionWrap}>
      {sectionHeader(t.sectionProj)}

      <FadeIn delay={0.1}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
          {t.categories.map((cat, i) => (
            <button key={cat} className="flt" onClick={() => setFilter(i)} style={{
              background: filter === i ? `${colors.purple}22` : "transparent",
              border: `1px solid ${filter === i ? colors.purple : colors.border}`,
              color: filter === i ? colors.text : colors.muted,
              padding: isMobile ? "5px 12px" : "6px 16px",
              borderRadius: "20px", fontSize: "12px", cursor: "pointer",
              fontFamily: "inherit", transition: "all 0.2s", letterSpacing: "0.04em",
            }}>
              {cat}
            </button>
          ))}
        </div>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(310px, 1fr))", gap: "14px" }}>
        {filtered.map((project, i) => (
          <FadeIn key={project.name} delay={i * 0.04}>
            <div className="card" style={{
              background: colors.surface, border: `1px solid ${colors.border}`,
              borderRadius: "10px", padding: isMobile ? "20px" : "24px",
              transition: "all 0.2s ease", display: "flex", flexDirection: "column", gap: "12px", height: "100%",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h4 style={{ fontSize: "15px", fontWeight: 600 }}>{project.name}</h4>
                <span style={{ fontSize: "10px", padding: "3px 7px", borderRadius: "3px", background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30`, letterSpacing: "0.05em", whiteSpace: "nowrap", flexShrink: 0, marginLeft: "8px" }}>
                  {project.category}
                </span>
              </div>
              <p style={{ fontSize: "13px", color: colors.muted, lineHeight: 1.65, flex: 1 }}>{project.desc}</p>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {project.tech.map(tech => <TechBadge key={tech} tech={tech} color={project.color} />)}
              </div>
              {project.gitlab && (
                <a href={project.gitlab} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: "12px", color: colors.muted, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  onMouseEnter={e => e.currentTarget.style.color = colors.text}
                  onMouseLeave={e => e.currentTarget.style.color = colors.muted}>
                  <IconGitlab />{t.gitlabLink}
                </a>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

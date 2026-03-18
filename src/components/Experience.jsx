import { useTheme } from "../context/ThemeContext.jsx";
import AccordionSection from "./ui/AccordionSection";

export default function Experience({ t, activeExp, setActiveExp, isMobile, sectionWrap, sectionHeader }) {
  const { colors } = useTheme();

  const renderContent = (exp) => (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px", flexWrap: "wrap", gap: "6px" }}>
        {!isMobile && <h3 style={{ fontSize: "20px", fontWeight: 600 }}>{exp.role}</h3>}
        <span style={{ fontSize: "12px", color: colors.muted }}>{exp.period}</span>
      </div>
      <p style={{ fontSize: "13px", color: colors.cyan, marginBottom: "16px" }}>{exp.location}</p>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
        {exp.tasks.map((task, i) => (
          <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", color: colors.subtle, fontSize: "14px", lineHeight: 1.6 }}>
            <span style={{ color: colors.purple, marginTop: "3px", flexShrink: 0 }}>▸</span>{task}
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <section id="experience" style={sectionWrap}>
      {sectionHeader(t.sectionExp)}
      <AccordionSection items={t.experience} activeIdx={activeExp} setActive={setActiveExp} accentColor={colors.purple} renderContent={renderContent} isMobile={isMobile} />
    </section>
  );
}

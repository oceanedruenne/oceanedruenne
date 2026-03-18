import { useTheme } from "../context/ThemeContext.jsx";
import AccordionSection from "./ui/AccordionSection";

export default function Education({ t, activeEdu, setActiveEdu, isMobile, sectionWrap, sectionHeader }) {
  const { colors } = useTheme();

  const renderContent = (edu) => (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px", flexWrap: "wrap", gap: "6px" }}>
        {!isMobile && <h3 style={{ fontSize: "20px", fontWeight: 600 }}>{edu.degree}</h3>}
        <span style={{ fontSize: "12px", color: colors.muted }}>{edu.period}</span>
      </div>
      <p style={{ fontSize: "13px", color: colors.cyan, marginBottom: "3px" }}>{edu.school}</p>
      <p style={{ fontSize: "12px", color: colors.muted, marginBottom: edu.details.length ? "16px" : 0 }}>{edu.location}</p>
      {edu.details.length > 0 && (
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
          {edu.details.map((d, i) => (
            <li key={i} style={{ display: "flex", gap: "10px", color: colors.subtle, fontSize: "14px", lineHeight: 1.6 }}>
              <span style={{ color: colors.cyan, flexShrink: 0 }}>▸</span>{d}
            </li>
          ))}
        </ul>
      )}
    </>
  );

  return (
    <section id="education" style={sectionWrap}>
      {sectionHeader(t.sectionEdu)}
      <AccordionSection items={t.education} activeIdx={activeEdu} setActive={setActiveEdu} accentColor={colors.cyan} renderContent={renderContent} isMobile={isMobile} />
    </section>
  );
}

import { COLORS } from "../constants/colors";
import FadeIn from "./ui/FadeIn";

export default function Contact({ t, isMobile, isTablet, sectionWrap }) {
  const btnStyle = (borderColor) => ({
    display: "inline-flex", alignItems: "center", gap: "8px",
    padding: isMobile ? "8px 16px" : "12px 22px",
    borderRadius: "6px", border: `1.5px solid ${borderColor}`,
    background: "transparent", color: COLORS.text,
    fontSize: "14px", cursor: "pointer",
    fontFamily: "inherit", transition: "background 0.2s, transform 0.15s",
  });

  const buttons = [
    { label: t.emailBtn,    color: COLORS.purple },
    { label: t.linkedinBtn, color: COLORS.cyan },
    { label: t.githubBtn,   color: COLORS.pink },
  ];

  return (
    <section id="contact" style={{ ...sectionWrap, paddingBottom: isMobile ? "80px" : "120px" }}>
      <div style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: "16px",
        padding: isMobile ? "36px 24px" : isTablet ? "48px" : "64px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px", height: "200px",
          background: "radial-gradient(ellipse, rgba(147,88,247,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <FadeIn>
          <p style={{ fontSize: "11px", letterSpacing: "0.15em", color: COLORS.muted, marginBottom: "14px", textTransform: "uppercase" }}>
            {t.contactEyebrow}
          </p>
          <h2 style={{ fontFamily: "'Cabin', sans-serif", fontSize: isMobile ? "clamp(24px, 8vw, 36px)" : "clamp(28px, 5vw, 52px)", fontWeight: 700, marginBottom: "18px" }}>
            {t.contactTitle}
          </h2>
          <p style={{ fontSize: isMobile ? "14px" : "16px", color: COLORS.muted, maxWidth: "400px", margin: "0 auto 36px", lineHeight: 1.7 }}>
            {t.contactDesc}
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {buttons.map(({ label, color }) => (
              <button key={label} className="btn" style={btnStyle(color)}>{label}</button>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

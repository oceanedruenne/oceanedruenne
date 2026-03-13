import { COLORS, GRADIENT } from "../constants/colors";
import { IconEmail, IconLinkedin, IconGithub } from "./icons/Icons";

export default function Hero({ t, isMobile, px }) {
  const btnStyle = (borderColor, small = false) => ({
    display: "inline-flex", alignItems: "center", gap: "8px",
    padding: small ? "8px 16px" : "12px 22px",
    borderRadius: "6px", border: `1.5px solid ${borderColor}`,
    background: "transparent", color: COLORS.text,
    fontSize: small ? "13px" : "14px",
    cursor: "pointer", fontFamily: "inherit",
    transition: "background 0.2s, transform 0.15s",
  });

  const ctaButtons = [
    { label: t.emailBtn,    color: COLORS.purple, icon: <IconEmail /> },
    { label: t.linkedinBtn, color: COLORS.cyan,   icon: <IconLinkedin /> },
    { label: t.githubBtn,   color: COLORS.pink,   icon: <IconGithub /> },
  ];

  return (
    <section
      id="hero"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}
    >
      {/* Background glows */}
      <div style={{ position: "absolute", top: "-20%", left: "-10%", width: isMobile ? "300px" : "600px", height: isMobile ? "300px" : "600px", background: "radial-gradient(circle, rgba(147,88,247,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "0", width: isMobile ? "200px" : "400px", height: isMobile ? "200px" : "400px", background: "radial-gradient(circle, rgba(51,210,255,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: `120px ${px} 80px`, width: "100%" }}>
        <p className="h-greet" style={{ fontSize: "14px", color: COLORS.muted, marginBottom: "12px", letterSpacing: "0.05em" }}>
          {t.greeting}
        </p>

        <h1
          className="h-name"
          style={{
            fontFamily: "'Cabin', sans-serif",
            fontSize: isMobile ? "clamp(38px, 11vw, 60px)" : "clamp(48px, 7vw, 96px)",
            fontWeight: 700, lineHeight: 1.05,
            background: GRADIENT, backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "gshift 6s ease infinite",
            marginBottom: "24px",
          }}
        >
          Océane Druenne
        </h1>

        <p
          className="h-desc"
          style={{ fontSize: isMobile ? "16px" : "18px", color: COLORS.subtle, lineHeight: 1.75, maxWidth: "560px", marginBottom: "40px" }}
        >
          {t.role} <span style={{ color: COLORS.text }}>ALE</span>.<br />
          {t.tagline}
          <span className="cursor" />
        </p>

        <div className="h-cta" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {ctaButtons.map(({ label, color, icon }) => (
            <button key={label} className="btn" style={btnStyle(color, isMobile)}>
              {icon}{label}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      {!isMobile && (
        <div style={{ position: "absolute", right: "48px", top: "50%", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "9px", letterSpacing: "0.14em", color: COLORS.muted, writingMode: "vertical-rl" }}>
            {t.scrollLabel}
          </span>
          <div style={{ width: "1px", height: "60px", background: `linear-gradient(${COLORS.purple}, transparent)` }} />
        </div>
      )}
    </section>
  );
}

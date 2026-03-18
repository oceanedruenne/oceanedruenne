import { GRADIENT } from "../constants/colors";
import { useTheme } from "../context/ThemeContext.jsx";
import { IconEmail, IconLinkedin, IconGithub } from "./icons/Icons";

export default function Hero({ t, isMobile, px }) {
  const { colors } = useTheme();

  const btnStyle = (borderColor, small = false) => ({
    display: "inline-flex", alignItems: "center", gap: "8px",
    padding: small ? "8px 16px" : "12px 22px",
    borderRadius: "6px", border: `1.5px solid ${borderColor}`,
    background: "transparent", color: colors.text,
    fontSize: small ? "13px" : "14px",
    cursor: "pointer", fontFamily: "inherit",
    transition: "background 0.2s, transform 0.15s",
    textDecoration: "none",
  });

  const ctaButtons = [
    { label: t.emailBtn,    color: colors.purple, icon: <IconEmail />, href: "mailto:druenneoceane@gmail.com" },
    { label: t.linkedinBtn, color: colors.cyan,   icon: <IconLinkedin />, href: "https://www.linkedin.com/in/oc%C3%A9ane-druenne-5933661ba/" },
    { label: t.githubBtn,   color: colors.pink,   icon: <IconGithub />, href: "https://github.com/oceanedruenne" },
  ];

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-20%", left: "-10%", width: isMobile ? "300px" : "600px", height: isMobile ? "300px" : "600px", background: "radial-gradient(circle, rgba(147,88,247,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "0", width: isMobile ? "200px" : "400px", height: isMobile ? "200px" : "400px", background: "radial-gradient(circle, rgba(51,210,255,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: `120px ${px} 80px`, width: "100%" }}>
        <p className="h-greet" style={{ fontSize: "14px", color: colors.muted, marginBottom: "12px", letterSpacing: "0.05em" }}>
          {t.greeting}
        </p>
        <h1 className="h-name" style={{
          fontFamily: "'Cabin', sans-serif",
          fontSize: isMobile ? "clamp(38px, 11vw, 60px)" : "clamp(48px, 7vw, 96px)",
          fontWeight: 700, lineHeight: 1.05,
          background: GRADIENT, backgroundSize: "200% 200%",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "gshift 6s ease infinite", marginBottom: "24px",
        }}>
          Océane Druenne
        </h1>
        <p className="h-desc" style={{ fontSize: isMobile ? "16px" : "18px", color: colors.subtle, lineHeight: 1.75, maxWidth: "560px", marginBottom: "40px" }}>
          {t.role} <span style={{ color: colors.text }}>ALE</span>.<br />
          {t.tagline}<span className="cursor" />
        </p>
        <div className="h-cta" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {ctaButtons.map(({ label, color, icon, href }) => (
            <a key={label} className="btn" href={href} target="_blank" rel="noopener noreferrer" style={btnStyle(color, isMobile)}>
              {icon}{label}
            </a>
          ))}
        </div>
      </div>

      {!isMobile && (
        <div style={{ position: "absolute", right: "48px", top: "50%", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "9px", letterSpacing: "0.14em", color: colors.muted, writingMode: "vertical-rl" }}>{t.scrollLabel}</span>
          <div style={{ width: "1px", height: "60px", background: `linear-gradient(${colors.purple}, transparent)` }} />
        </div>
      )}
    </section>
  );
}

import { COLORS, GRADIENT, LANG_FLAGS } from "../constants/colors";
import { T } from "../constants/translations";
import { IconMenu, IconClose } from "./icons/Icons";

export default function Navbar({
  t, lang, setLang,
  scrolled, menuOpen, setMenuOpen,
  langOpen, setLangOpen,
  isMobile, px,
  scrollTo, navIds,
}) {
  const btnStyle = {
    display: "inline-flex", alignItems: "center", gap: "8px",
    padding: "8px 18px", borderRadius: "6px",
    border: `1.5px solid ${COLORS.purple}`, background: "transparent",
    color: COLORS.text, fontSize: "13px",
    cursor: "pointer", fontFamily: "inherit", transition: "background 0.2s, transform 0.15s",
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: `0 ${px}`, height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled || menuOpen ? "rgba(13,13,13,0.96)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none",
        transition: "all 0.3s ease",
      }}>
        {/* Logo */}
        <span
          style={{ fontSize: "16px", fontWeight: 700, background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", cursor: "pointer" }}
          onClick={() => scrollTo("hero")}
        >
          OD
        </span>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            {t.nav.map((label, i) => (
              <button
                key={i}
                className="hvr"
                onClick={() => scrollTo(navIds[i])}
                style={{ fontSize: "14px", color: COLORS.muted, cursor: "pointer", background: "none", border: "none", padding: 0, fontFamily: "inherit", transition: "color 0.2s" }}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {/* Language switcher */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setLangOpen(o => !o)}
              style={{ background: "none", border: `1px solid ${COLORS.border}`, color: COLORS.muted, padding: "6px 10px", borderRadius: "6px", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", display: "flex", alignItems: "center", gap: "5px" }}
            >
              {LANG_FLAGS[lang]} {!isMobile && t.lang} <span style={{ fontSize: "9px" }}>▾</span>
            </button>

            {langOpen && (
              <div style={{ position: "absolute", right: 0, top: "calc(100% + 6px)", background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: "8px", overflow: "hidden", minWidth: "110px", zIndex: 200 }}>
                {Object.keys(T).map(k => (
                  <button
                    key={k}
                    className="lopt"
                    onClick={() => { setLang(k); setLangOpen(false); }}
                    style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", padding: "10px 14px", background: lang === k ? `${COLORS.purple}18` : "none", border: "none", color: lang === k ? COLORS.text : COLORS.muted, fontSize: "13px", cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s" }}
                  >
                    {LANG_FLAGS[k]} {T[k].lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop CTA */}
          {!isMobile && (
            <button className="btn" style={btnStyle} onClick={() => scrollTo("contact")}>
              {t.letsTalk}
            </button>
          )}

          {/* Hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{ background: "none", border: `1px solid ${COLORS.border}`, color: COLORS.text, padding: "6px 8px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div
          className="mobile-menu"
          style={{ position: "fixed", top: "64px", left: 0, right: 0, zIndex: 99, background: "rgba(13,13,13,0.98)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${COLORS.border}`, padding: "16px 20px 24px", display: "flex", flexDirection: "column", gap: "4px" }}
        >
          {t.nav.map((label, i) => (
            <button
              key={i}
              onClick={() => scrollTo(navIds[i])}
              style={{ background: "none", border: "none", borderBottom: `1px solid ${COLORS.border}`, color: COLORS.muted, fontSize: "16px", fontFamily: "inherit", cursor: "pointer", padding: "14px 4px", textAlign: "left", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = COLORS.text}
              onMouseLeave={e => e.currentTarget.style.color = COLORS.muted}
            >
              {label}
            </button>
          ))}
          <button
            className="btn"
            style={{ ...btnStyle, marginTop: "12px", justifyContent: "center" }}
            onClick={() => scrollTo("contact")}
          >
            {t.letsTalk}
          </button>
        </div>
      )}
    </>
  );
}

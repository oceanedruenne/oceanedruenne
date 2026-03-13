import { useState, useEffect } from "react";
import { COLORS } from "./constants/colors";
import { T } from "./constants/translations";
import { useWindowWidth } from "./hooks/useWindowWidth";
import FadeIn from "./components/ui/FadeIn";
import Navbar    from "./components/Navbar";
import Hero      from "./components/Hero";
import Experience from "./components/Experience";
import Education  from "./components/Education";
import Projects   from "./components/Projects";
import Contact    from "./components/Contact";
import Footer     from "./components/Footer";

const NAV_IDS = ["experience", "education", "projects", "contact"];

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  .hvr:hover  { color: #f0f0f0 !important; }
  .btn:hover  { background: rgba(255,255,255,0.05) !important; transform: translateY(-1px); }
  .card:hover { border-color: rgba(255,255,255,0.14) !important; transform: translateY(-3px); }
  .flt:hover  { background: rgba(255,255,255,0.06) !important; }
  .lopt:hover { background: rgba(255,255,255,0.06) !important; }

  @keyframes gshift {
    0%, 100% { background-position: 0% 50%; }
    50%       { background-position: 100% 50%; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .cursor      { display: inline-block; width: 2px; height: .85em; background: #9358f7; margin-left: 3px; animation: blink 1s ease infinite; vertical-align: middle; }
  .h-greet     { animation: fadeUp .7s ease .10s both; }
  .h-name      { animation: fadeUp .7s ease .25s both; }
  .h-desc      { animation: fadeUp .7s ease .40s both; }
  .h-cta       { animation: fadeUp .7s ease .55s both; }
  .mobile-menu { animation: slideDown 0.2s ease; }

  ::-webkit-scrollbar        { width: 4px; }
  ::-webkit-scrollbar-track  { background: #111; }
  ::-webkit-scrollbar-thumb  { background: #333; border-radius: 10px; }
`;

export default function Portfolio() {
  const [lang,      setLang]      = useState("en");
  const [activeExp, setActiveExp] = useState(0);
  const [activeEdu, setActiveEdu] = useState(0);
  const [filter,    setFilter]    = useState(0);
  const [scrolled,  setScrolled]  = useState(false);
  const [langOpen,  setLangOpen]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  const width    = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1024;
  const t        = T[lang];
  const px       = isMobile ? "20px" : isTablet ? "32px" : "48px";
  const sectionPY = isMobile ? "64px" : "96px";
  const sectionWrap = { maxWidth: "1100px", margin: "0 auto", padding: `${sectionPY} ${px}` };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Reset category filter when language changes (labels differ)
  useEffect(() => { setFilter(0); }, [lang]);

  // Close mobile menu when resizing to desktop
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const sectionHeader = (label) => (
    <FadeIn>
      <div style={{
        fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
        color: COLORS.muted, marginBottom: isMobile ? "32px" : "48px",
        display: "flex", alignItems: "center", gap: "12px",
      }}>
        <span>{label}</span>
        <div style={{ flex: 1, height: "1px", background: COLORS.border }} />
      </div>
    </FadeIn>
  );

  const sharedProps = { t, isMobile, isTablet, sectionWrap, sectionHeader };

  return (
    <div style={{ background: COLORS.bg, color: COLORS.text, fontFamily: "'Cabin', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{GLOBAL_STYLES}</style>

      <Navbar
        t={t} lang={lang} setLang={setLang}
        scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen}
        langOpen={langOpen} setLangOpen={setLangOpen}
        isMobile={isMobile} px={px}
        scrollTo={scrollTo} navIds={NAV_IDS}
      />

      <Hero {...sharedProps} px={px} />

      <Experience {...sharedProps} activeExp={activeExp} setActiveExp={setActiveExp} />

      <Education  {...sharedProps} activeEdu={activeEdu} setActiveEdu={setActiveEdu} />

      <Projects   {...sharedProps} filter={filter} setFilter={setFilter} />

      <Contact    {...sharedProps} />

      <Footer     t={t} isMobile={isMobile} />
    </div>
  );
}

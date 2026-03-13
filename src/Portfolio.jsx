import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0d0d0d", surface: "#161616", border: "#2a2a2a",
  text: "#f0f0f0", muted: "#888", subtle: "#c4c4c4",
  cyan: "#33d2ff", purple: "#9358f7", pink: "#dd5789",
};
const GRADIENT = "linear-gradient(90deg, #9845e8 0%, #33d2ff 54%, #dd5789 100%)";
const LangFlags = { en: "🇬🇧", fr: "🇫🇷", cr: "🇲🇶" };

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  en: {
    lang:"EN", greeting:"Hey, I'm", tagline:"I build things, break things, and learn along the way.",
    role:"Apprentice software engineer at", scrollLabel:"SCROLL",
    emailBtn:"Send an email", linkedinBtn:"LinkedIn", githubBtn:"GitHub", letsTalk:"Let's talk",
    nav:["Experience","Education","Projects","Contact"],
    sectionExp:"Experience", sectionEdu:"Education", sectionProj:"Projects",
    contactEyebrow:"Get in touch", contactTitle:"Let's build something",
    contactDesc:"Open to opportunities, collaborations or just a nice conversation about tech.",
    footer:"Designed & built by Océane Druenne", gitlabLink:"GitLab",
    categories:["All","Web","Mobile","Desktop","Game","AI / CLI"],
    experience:[
      { company:"Alcatel-Lucent Enterprise", role:"Software Engineer Apprentice", period:"Sept 2024 – Present", location:"Strasbourg, France", tasks:["Improvement of a P2P WebRTC call recording service.","Resolving tickets with YouTrack (Angular, WebRTC API)."] },
      { company:"IRCAD", role:"Full-Stack Developer Intern", period:"2023", location:"Strasbourg, France", tasks:["ChatBot for user queries (NextJS, SCSS, Levenshtein).","New WebSurg website & back-office (NextJS, TailwindCSS, Symfony).","AudioForm: video editing request management app.","WhiteBox: USB device analysis web app.","Gesture Navigator: interactive webcam app with MediaPipe.","Phishing awareness campaigns with Gophish."] },
    ],
    education:[
      { school:"CNAM – National Conservatory of Arts and Crafts", degree:"Engineer's Degree in Computer Science", period:"Sept 2024 – Present", location:"Strasbourg, France", details:["Angular & TypeScript","C++ GUI development","Game dev with Unity, C# and C"] },
      { school:"IUT", degree:"BUT Informatique", period:"2021 – 2024", location:"France", details:["Web development","Databases","Systems & Networks"] },
      { school:"UHA", degree:"Bachelor", period:"2020 – 2021", location:"Mulhouse, France", details:[] },
    ],
    projects:[
      { name:"Kibbles Store", desc:"Browse a kibble catalog, manage a basket, create accounts and register credit cards.", tech:["Angular","TypeScript","NestJS","Prisma","CSS"], category:"Web", color:"#9358f7" },
      { name:"IAstucieux", desc:"Python library to easily download, install and use Llama2 and Stable Diffusion.", tech:["Python"], category:"AI / CLI", color:"#33d2ff" },
      { name:"Games Collection", desc:"Tic-Tac-Toe, Connect Four, Othello and Checkers with graphical interface.", tech:["C++","Qt"], category:"Desktop", color:"#dd5789" },
      { name:"HabitsTracker", desc:"Mobile application for tracking personal habits.", tech:["React Native","CSS"], category:"Mobile", color:"#9358f7" },
      { name:"Épintérêt", desc:"A Pinterest-inspired image collection application.", tech:["React","CSS"], category:"Web", color:"#33d2ff" },
      { name:"Smart Cities Game", desc:"Platform game based on a PhD subject on smart cities and urban co-design.", tech:["C#","Unity"], category:"Game", color:"#dd5789" },
      { name:"Travel Zen", desc:"Generates a personalised packing list based on a travel form.", tech:["NextJS","TailwindCSS","NodeJS","Express","Sequelize"], category:"Web", color:"#9358f7" },
      { name:"Survey Results Website", desc:"Displays results of a study I carried out on fibromyalgia.", tech:["HTML","CSS","ECharts.js"], category:"Web", color:"#33d2ff" },
      { name:"Reverse Engineering Program", desc:"Auto-generates PlantUML source of UML class diagrams for Java types.", tech:["Java"], category:"Desktop", color:"#dd5789" },
      { name:"Doctor Simulation Game", desc:"Medical consultation simulation based on a doctoral research topic.", tech:["JavaScript","React","CSS"], category:"Game", color:"#9358f7" },
    ],
  },
  fr: {
    lang:"FR", greeting:"Salut, je suis", tagline:"Je construis des trucs, je les casse, et j'apprends en chemin.",
    role:"Ingénieure logiciel en apprentissage chez", scrollLabel:"DÉFILER",
    emailBtn:"Envoyer un email", linkedinBtn:"LinkedIn", githubBtn:"GitHub", letsTalk:"Discutons",
    nav:["Expérience","Formation","Projets","Contact"],
    sectionExp:"Expérience", sectionEdu:"Formation", sectionProj:"Projets",
    contactEyebrow:"Me contacter", contactTitle:"Construisons quelque chose",
    contactDesc:"Ouverte aux opportunités, collaborations ou simplement une bonne conversation tech.",
    footer:"Designé & développé par Océane Druenne", gitlabLink:"GitLab",
    categories:["Tous","Web","Mobile","Desktop","Jeu","IA / CLI"],
    experience:[
      { company:"Alcatel-Lucent Enterprise", role:"Ingénieure logiciel apprentie", period:"Sept 2024 – Aujourd'hui", location:"Strasbourg, France", tasks:["Amélioration d'un service d'enregistrement d'appels WebRTC P2P.","Résolution de tickets via YouTrack (Angular, WebRTC API)."] },
      { company:"IRCAD", role:"Développeuse Full-Stack (stage)", period:"2023", location:"Strasbourg, France", tasks:["ChatBot de réponse aux questions utilisateurs (NextJS, SCSS, Levenshtein).","Nouveau site WebSurg & back-office (NextJS, TailwindCSS, Symfony).","AudioForm : gestion des demandes de montage vidéo.","WhiteBox : analyse de périphériques USB.","Gesture Navigator : app web interactive avec webcam (MediaPipe).","Campagnes de phishing avec Gophish."] },
      { company:"Freelance", role:"Développeuse Web", period:"2021 – 2023", location:"Remote", tasks:["Diverses missions de développement web (FreeBeings, TDF, Upwork, Shoppy)."] },
    ],
    education:[
      { school:"CNAM – Conservatoire National des Arts et Métiers", degree:"Diplôme d'ingénieur en informatique", period:"Sept 2024 – Aujourd'hui", location:"Strasbourg, France", details:["Angular & TypeScript","Développement GUI en C++","Jeux vidéo avec Unity, C# et C"] },
      { school:"IUT", degree:"BUT Informatique", period:"2021 – 2024", location:"France", details:["Développement web","Bases de données","Systèmes & Réseaux"] },
      { school:"UHA", degree:"Licence", period:"2020 – 2021", location:"Mulhouse, France", details:[] },
    ],
    projects:[
      { name:"Kibbles Store", desc:"Parcourez un catalogue de croquettes, gérez un panier, créez un compte et enregistrez vos cartes bancaires.", tech:["Angular","TypeScript","NestJS","Prisma","CSS"], category:"Web", color:"#9358f7" },
      { name:"IAstucieux", desc:"Bibliothèque Python pour télécharger, installer et utiliser facilement Llama2 et Stable Diffusion.", tech:["Python"], category:"IA / CLI", color:"#33d2ff" },
      { name:"Games Collection", desc:"Morpion, Puissance 4, Othello et Dames avec interface graphique.", tech:["C++","Qt"], category:"Desktop", color:"#dd5789" },
      { name:"HabitsTracker", desc:"Application mobile de suivi d'habitudes personnelles.", tech:["React Native","CSS"], category:"Mobile", color:"#9358f7" },
      { name:"Épintérêt", desc:"Application de collection d'images inspirée de Pinterest.", tech:["React","CSS"], category:"Web", color:"#33d2ff" },
      { name:"Smart Cities Game", desc:"Jeu de plateforme basé sur un sujet de thèse sur les villes intelligentes.", tech:["C#","Unity"], category:"Jeu", color:"#dd5789" },
      { name:"Travel Zen", desc:"Génère une liste de bagages personnalisée à partir d'un formulaire de voyage.", tech:["NextJS","TailwindCSS","NodeJS","Express","Sequelize"], category:"Web", color:"#9358f7" },
      { name:"Survey Results Website", desc:"Affiche les résultats d'une étude que j'ai menée sur la fibromyalgie.", tech:["HTML","CSS","ECharts.js"], category:"Web", color:"#33d2ff" },
      { name:"Reverse Engineering Program", desc:"Génère automatiquement le source PlantUML de diagrammes de classes UML pour des types Java.", tech:["Java"], category:"Desktop", color:"#dd5789" },
      { name:"Doctor Simulation Game", desc:"Simulation de consultation médicale basée sur un sujet de thèse.", tech:["JavaScript","React","CSS"], category:"Jeu", color:"#9358f7" },
    ],
  },
  cr: {
    lang:"KR", greeting:"Ola, mwen sé", tagline:"Mwen ka konstwi bagay, krazé yo, épi aprann anlè chimen.",
    role:"Étidyan-travayè an jéni lojisyèl ka", scrollLabel:"DÉFILÉ",
    emailBtn:"Voyé on email", linkedinBtn:"LinkedIn", githubBtn:"GitHub", letsTalk:"An palé",
    nav:["Espéryans","Fòmasyon","Pwojé","Kontak"],
    sectionExp:"Espéryans", sectionEdu:"Fòmasyon", sectionProj:"Pwojé",
    contactEyebrow:"Kontakté mwen", contactTitle:"An konstwi kichòy ansanm",
    contactDesc:"Ouvè pou opòtinité, kolaborasyon, oubyen on ti pawòl sou latéknoloji.",
    footer:"Déziné épi konstwi pa Océane Druenne", gitlabLink:"GitLab",
    categories:["Tout","Web","Mobil","Desktop","Jwé","IA / CLI"],
    experience:[
      { company:"Alcatel-Lucent Enterprise", role:"Étidyan-travayè an jéni lojisyèl", period:"Sept 2024 – Jòdi", location:"Strasbourg, Frans", tasks:["Amélyorasyon on sèvis anrejistreman apèl WebRTC P2P.","Rézolusyon tiké épi YouTrack (Angular, WebRTC API)."] },
      { company:"IRCAD", role:"Devlopè Full-Stack (staj)", period:"2023", location:"Strasbourg, Frans", tasks:["ChatBot pou réponsé kèsyon itilizatè (NextJS, SCSS, Levenshtein).","Nouvo sit WebSurg épi back-office (NextJS, TailwindCSS, Symfony).","AudioForm : jésyon dèmand montaj vidéo.","WhiteBox : anliz aparèy USB.","Gesture Navigator : applikasyon web entèraktif épi webcam (MediaPipe).","Kanpay phishing épi Gophish."] },
      { company:"Fwéelans", role:"Devlopè Web", period:"2021 – 2023", location:"À distans", tasks:["Divès misyon devlopman web (FreeBeings, TDF, Upwork, Shoppy)."] },
    ],
    education:[
      { school:"CNAM – Konsérvàtwa Nasyon Zaz é Métié", degree:"Diplòm Jéniè an Enfòmatik", period:"Sept 2024 – Jòdi", location:"Strasbourg, Frans", details:["Angular & TypeScript","Devlopman GUI an C++","Jwé vidéo épi Unity, C# épi C"] },
      { school:"IUT", degree:"BUT Enfòmatik", period:"2021 – 2024", location:"Frans", details:["Devlopman web","Baz donné","Sistèm & Rézo"] },
      { school:"UHA", degree:"Lisans", period:"2020 – 2021", location:"Mulhouse, Frans", details:[] },
    ],
    projects:[
      { name:"Kibbles Store", desc:"Gad on katalòg kwòkèt, jéré on panié, kréyé on kont épi anregistré kart bankè-ou.", tech:["Angular","TypeScript","NestJS","Prisma","CSS"], category:"Web", color:"#9358f7" },
      { name:"IAstucieux", desc:"Bibliothèk Python pou téléchajé épi itilizé Llama2 épi Stable Diffusion fasil-fasil.", tech:["Python"], category:"IA / CLI", color:"#33d2ff" },
      { name:"Games Collection", desc:"Mòpion, Pwisans 4, Othello épi Dam épi entèfas grafik.", tech:["C++","Qt"], category:"Desktop", color:"#dd5789" },
      { name:"HabitsTracker", desc:"Applikasyon mobil pou swiv abitid pésonèl.", tech:["React Native","CSS"], category:"Mobil", color:"#9358f7" },
      { name:"Épintérêt", desc:"Applikasyon koleksyon imaj enspirée pa Pinterest.", tech:["React","CSS"], category:"Web", color:"#33d2ff" },
      { name:"Smart Cities Game", desc:"Jwé platfòm bézé sou on sijé tèz sou vil entèlijan épi ko-konsépsyon inbèn.", tech:["C#","Unity"], category:"Jwé", color:"#dd5789" },
      { name:"Travel Zen", desc:"Jénér on lis bagaj pésonalizé a pati on fòmilè vwayaj.", tech:["NextJS","TailwindCSS","NodeJS","Express","Sequelize"], category:"Web", color:"#9358f7" },
      { name:"Survey Results Website", desc:"Montwé rézilta on étid mwen té fè sou fibromyalgie.", tech:["HTML","CSS","ECharts.js"], category:"Web", color:"#33d2ff" },
      { name:"Reverse Engineering Program", desc:"Jénér otomatikman sours PlantUML pou dyagramm klas UML pou type Java.", tech:["Java"], category:"Desktop", color:"#dd5789" },
      { name:"Doctor Simulation Game", desc:"Similasyon konsiltasyon médikal bézé sou on sijé tèz.", tech:["JavaScript","React","CSS"], category:"Jwé", color:"#9358f7" },
    ],
  },
};

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return w;
}

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function TechBadge({ tech, color }) {
  return <span style={{ fontSize:"11px", padding:"2px 8px", borderRadius:"4px", border:`1px solid ${color}55`, color, background:`${color}11`, whiteSpace:"nowrap" }}>{tech}</span>;
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
const IconEmail = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IconLinkedin = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;
const IconGithub = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>;
const IconGitlab = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>;
const IconMenu = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IconClose = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconChevron = ({ open }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}><polyline points="6 9 12 15 18 9"/></svg>;

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [lang, setLang] = useState("en");
  const [activeExp, setActiveExp] = useState(0);
  const [activeEdu, setActiveEdu] = useState(0);
  const [filter, setFilter] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  const t = T[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setFilter(0); }, [lang]);

  // Close menu on resize to desktop
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  const filteredProjects = filter === 0 ? t.projects : t.projects.filter(p => p.category === t.categories[filter]);
  const navIds = ["experience", "education", "projects", "contact"];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const btnStyle = (borderColor, small = false) => ({
    display:"inline-flex", alignItems:"center", gap:"8px",
    padding: small ? "8px 16px" : "12px 22px",
    borderRadius:"6px", border:`1.5px solid ${borderColor}`,
    background:"transparent", color:COLORS.text,
    fontSize: small ? "13px" : "14px",
    cursor:"pointer", fontFamily:"inherit", transition:"background 0.2s, transform 0.15s",
  });

  const px = isMobile ? "20px" : isTablet ? "32px" : "48px";
  const sectionPY = isMobile ? "64px" : "96px";
  const sectionWrap = { maxWidth:"1100px", margin:"0 auto", padding:`${sectionPY} ${px}` };

  const sectionHeader = (label) => (
    <FadeIn>
      <div style={{ fontSize:"11px", letterSpacing:"0.15em", textTransform:"uppercase", color:COLORS.muted, marginBottom: isMobile ? "32px" : "48px", display:"flex", alignItems:"center", gap:"12px" }}>
        <span>{label}</span>
        <div style={{ flex:1, height:"1px", background:COLORS.border }} />
      </div>
    </FadeIn>
  );

  // Accordion-style tabs for mobile Experience/Education
  const AccordionSection = ({ items, activeIdx, setActive, accentColor, renderContent }) => {
    if (!isMobile) {
      return (
        <div style={{ display:"flex", gap:"48px", alignItems:"flex-start" }}>
          {/* Sidebar tabs */}
          <div style={{ display:"flex", flexDirection:"column", gap:"4px", minWidth:"180px", flexShrink:0 }}>
            {items.map((e, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <button className="hvr" onClick={() => setActive(i)} style={{ background:"none", border:"none", borderLeft:`2px solid ${activeIdx===i ? accentColor : COLORS.border}`, padding:"12px 16px", textAlign:"left", color: activeIdx===i ? COLORS.text : COLORS.muted, fontSize:"14px", cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"180px" }}>
                  {e.company ? e.company.split(" ")[0] : e.school.split("–")[0].trim().split(" ")[0]}
                </button>
              </FadeIn>
            ))}
          </div>
          {/* Content */}
          <div key={`content-${activeIdx}`} style={{ flex:1 }}>{renderContent(items[activeIdx])}</div>
        </div>
      );
    }

    // Mobile: accordion
    return (
      <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
        {items.map((item, i) => {
          const isOpen = activeIdx === i;
          return (
            <FadeIn key={i} delay={i * 0.06}>
              <div style={{ border:`1px solid ${isOpen ? accentColor + "60" : COLORS.border}`, borderRadius:"8px", overflow:"hidden", transition:"border-color 0.2s" }}>
                <button onClick={() => setActive(isOpen ? -1 : i)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px", background: isOpen ? `${accentColor}0d` : "transparent", border:"none", color:COLORS.text, fontFamily:"inherit", cursor:"pointer", gap:"8px" }}>
                  <div style={{ textAlign:"left" }}>
                    <div style={{ fontSize:"15px", fontWeight:600 }}>{item.company || item.school?.split("–")[0].trim()}</div>
                    <div style={{ fontSize:"12px", color:COLORS.muted, marginTop:"2px" }}>{item.role || item.degree}</div>
                  </div>
                  <IconChevron open={isOpen} />
                </button>
                {isOpen && (
                  <div style={{ padding:"0 16px 16px" }}>{renderContent(item)}</div>
                )}
              </div>
            </FadeIn>
          );
        })}
      </div>
    );
  };

  const renderExpContent = (exp) => (
    <>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"8px", flexWrap:"wrap", gap:"6px" }}>
        {!isMobile && <h3 style={{ fontSize:"20px", fontWeight:600 }}>{exp.role}</h3>}
        <span style={{ fontSize:"12px", color:COLORS.muted }}>{exp.period}</span>
      </div>
      <p style={{ fontSize:"13px", color:COLORS.cyan, marginBottom:"16px" }}>{exp.location}</p>
      <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px" }}>
        {exp.tasks.map((task, i) => (
          <li key={i} style={{ display:"flex", gap:"10px", alignItems:"flex-start", color:COLORS.subtle, fontSize:"14px", lineHeight:1.6 }}>
            <span style={{ color:COLORS.purple, marginTop:"3px", flexShrink:0 }}>▸</span>{task}
          </li>
        ))}
      </ul>
    </>
  );

  const renderEduContent = (edu) => (
    <>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"6px", flexWrap:"wrap", gap:"6px" }}>
        {!isMobile && <h3 style={{ fontSize:"20px", fontWeight:600 }}>{edu.degree}</h3>}
        <span style={{ fontSize:"12px", color:COLORS.muted }}>{edu.period}</span>
      </div>
      <p style={{ fontSize:"13px", color:COLORS.cyan, marginBottom:"3px" }}>{edu.school}</p>
      <p style={{ fontSize:"12px", color:COLORS.muted, marginBottom: edu.details.length ? "16px" : 0 }}>{edu.location}</p>
      {edu.details.length > 0 && (
        <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"8px" }}>
          {edu.details.map((d, i) => (
            <li key={i} style={{ display:"flex", gap:"10px", color:COLORS.subtle, fontSize:"14px", lineHeight:1.6 }}>
              <span style={{ color:COLORS.cyan, flexShrink:0 }}>▸</span>{d}
            </li>
          ))}
        </ul>
      )}
    </>
  );

  return (
    <div style={{ background:COLORS.bg, color:COLORS.text, fontFamily:"'Cabin',sans-serif", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        .hvr:hover { color:#f0f0f0 !important; }
        .btn:hover { background:rgba(255,255,255,0.05) !important; transform:translateY(-1px); }
        .card:hover { border-color:rgba(255,255,255,0.14) !important; transform:translateY(-3px); }
        .flt:hover { background:rgba(255,255,255,0.06) !important; }
        .lopt:hover { background:rgba(255,255,255,0.06) !important; }
        @keyframes gshift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor { display:inline-block;width:2px;height:.85em;background:#9358f7;margin-left:3px;animation:blink 1s ease infinite;vertical-align:middle; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .h-greet { animation:fadeUp .7s ease .1s both; }
        .h-name  { animation:fadeUp .7s ease .25s both; }
        .h-desc  { animation:fadeUp .7s ease .4s both; }
        .h-cta   { animation:fadeUp .7s ease .55s both; }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#111} ::-webkit-scrollbar-thumb{background:#333;border-radius:10px}
        @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .mobile-menu { animation:slideDown 0.2s ease; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:`0 ${px}`, height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between", background: scrolled || menuOpen ? "rgba(13,13,13,0.96)" : "transparent", backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none", borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none", transition:"all 0.3s ease" }}>
        <span style={{ fontSize:"16px", fontWeight:700, background:GRADIENT, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", cursor:"pointer" }} onClick={() => scrollTo("hero")}>OD</span>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display:"flex", gap:"28px", alignItems:"center" }}>
            {t.nav.map((label, i) => (
              <button key={i} className="hvr" style={{ fontSize:"14px", color:COLORS.muted, cursor:"pointer", background:"none", border:"none", padding:0, fontFamily:"inherit", transition:"color 0.2s" }} onClick={() => scrollTo(navIds[i])}>{label}</button>
            ))}
          </div>
        )}

        <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
          {/* Lang switcher */}
          <div style={{ position:"relative" }}>
            <button onClick={() => setLangOpen(o => !o)} style={{ background:"none", border:`1px solid ${COLORS.border}`, color:COLORS.muted, padding:"6px 10px", borderRadius:"6px", cursor:"pointer", fontFamily:"inherit", fontSize:"13px", display:"flex", alignItems:"center", gap:"5px" }}>
              {LangFlags[lang]} {!isMobile && t.lang} <span style={{ fontSize:"9px" }}>▾</span>
            </button>
            {langOpen && (
              <div style={{ position:"absolute", right:0, top:"calc(100% + 6px)", background:COLORS.surface, border:`1px solid ${COLORS.border}`, borderRadius:"8px", overflow:"hidden", minWidth:"110px", zIndex:200 }}>
                {Object.keys(T).map(k => (
                  <button key={k} className="lopt" onClick={() => { setLang(k); setLangOpen(false); }} style={{ display:"flex", alignItems:"center", gap:"8px", width:"100%", padding:"10px 14px", background: lang===k ? `${COLORS.purple}18` : "none", border:"none", color: lang===k ? COLORS.text : COLORS.muted, fontSize:"13px", cursor:"pointer", fontFamily:"inherit", transition:"background 0.15s" }}>
                    {LangFlags[k]} {T[k].lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!isMobile && (
            <button className="btn" style={{ ...btnStyle(COLORS.purple, true) }} onClick={() => scrollTo("contact")}>{t.letsTalk}</button>
          )}

          {/* Hamburger */}
          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)} style={{ background:"none", border:`1px solid ${COLORS.border}`, color:COLORS.text, padding:"6px 8px", borderRadius:"6px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
          )}
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {isMobile && menuOpen && (
        <div className="mobile-menu" style={{ position:"fixed", top:"64px", left:0, right:0, zIndex:99, background:"rgba(13,13,13,0.98)", backdropFilter:"blur(16px)", borderBottom:`1px solid ${COLORS.border}`, padding:"16px 20px 24px", display:"flex", flexDirection:"column", gap:"4px" }}>
          {t.nav.map((label, i) => (
            <button key={i} onClick={() => scrollTo(navIds[i])} style={{ background:"none", border:"none", borderBottom:`1px solid ${COLORS.border}`, color:COLORS.muted, fontSize:"16px", fontFamily:"inherit", cursor:"pointer", padding:"14px 4px", textAlign:"left", transition:"color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = COLORS.text}
              onMouseLeave={e => e.currentTarget.style.color = COLORS.muted}>
              {label}
            </button>
          ))}
          <button className="btn" style={{ ...btnStyle(COLORS.purple), marginTop:"12px", justifyContent:"center" }} onClick={() => scrollTo("contact")}>{t.letsTalk}</button>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-20%", left:"-10%", width: isMobile ? "300px" : "600px", height: isMobile ? "300px" : "600px", background:"radial-gradient(circle, rgba(147,88,247,0.12) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"10%", right:"0", width: isMobile ? "200px" : "400px", height: isMobile ? "200px" : "400px", background:"radial-gradient(circle, rgba(51,210,255,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />

        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:`120px ${px} 80px`, width:"100%" }}>
          <p className="h-greet" style={{ fontSize:"14px", color:COLORS.muted, marginBottom:"12px", letterSpacing:"0.05em" }}>{t.greeting}</p>
          <h1 className="h-name" style={{ fontFamily:"'Cabin',sans-serif", fontSize: isMobile ? "clamp(38px,11vw,60px)" : "clamp(48px,7vw,96px)", fontWeight:700, lineHeight:1.05, background:GRADIENT, backgroundSize:"200% 200%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"gshift 6s ease infinite", marginBottom:"24px" }}>
            Océane Druenne
          </h1>
          <p className="h-desc" style={{ fontSize: isMobile ? "16px" : "18px", color:COLORS.subtle, lineHeight:1.75, maxWidth:"560px", marginBottom:"40px" }}>
            {t.role} <span style={{ color:COLORS.text }}>ALE</span>.<br />{t.tagline}<span className="cursor" />
          </p>
          <div className="h-cta" style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
            {[
              { label:t.emailBtn, color:COLORS.purple, icon:<IconEmail /> },
              { label:t.linkedinBtn, color:COLORS.cyan, icon:<IconLinkedin /> },
              { label:t.githubBtn, color:COLORS.pink, icon:<IconGithub /> },
            ].map(({ label, color, icon }) => (
              <button key={label} className="btn" style={btnStyle(color, isMobile)}>{icon}{label}</button>
            ))}
          </div>
        </div>

        {/* Scroll indicator — hidden on mobile */}
        {!isMobile && (
          <div style={{ position:"absolute", right:"48px", top:"50%", display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}>
            <span style={{ fontSize:"9px", letterSpacing:"0.14em", color:COLORS.muted, writingMode:"vertical-rl" }}>{t.scrollLabel}</span>
            <div style={{ width:"1px", height:"60px", background:`linear-gradient(${COLORS.purple}, transparent)` }} />
          </div>
        )}
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={sectionWrap}>
        {sectionHeader(t.sectionExp)}
        <AccordionSection
          items={t.experience}
          activeIdx={activeExp}
          setActive={setActiveExp}
          accentColor={COLORS.purple}
          renderContent={renderExpContent}
        />
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" style={sectionWrap}>
        {sectionHeader(t.sectionEdu)}
        <AccordionSection
          items={t.education}
          activeIdx={activeEdu}
          setActive={setActiveEdu}
          accentColor={COLORS.cyan}
          renderContent={renderEduContent}
        />
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={sectionWrap}>
        {sectionHeader(t.sectionProj)}
        <FadeIn delay={0.1}>
          <div style={{ display:"flex", gap:"8px", marginBottom:"32px", flexWrap:"wrap" }}>
            {t.categories.map((cat, i) => (
              <button key={cat} className="flt" onClick={() => setFilter(i)} style={{ background: filter===i ? `${COLORS.purple}22` : "transparent", border:`1px solid ${filter===i ? COLORS.purple : COLORS.border}`, color: filter===i ? COLORS.text : COLORS.muted, padding: isMobile ? "5px 12px" : "6px 16px", borderRadius:"20px", fontSize:"12px", cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s", letterSpacing:"0.04em" }}>
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(310px, 1fr))", gap:"14px" }}>
          {filteredProjects.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.04}>
              <div className="card" style={{ background:COLORS.surface, border:`1px solid ${COLORS.border}`, borderRadius:"10px", padding: isMobile ? "20px" : "24px", transition:"all 0.2s ease", display:"flex", flexDirection:"column", gap:"12px", height:"100%" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <h4 style={{ fontSize:"15px", fontWeight:600 }}>{p.name}</h4>
                  <span style={{ fontSize:"10px", padding:"3px 7px", borderRadius:"3px", background:`${p.color}15`, color:p.color, border:`1px solid ${p.color}30`, letterSpacing:"0.05em", whiteSpace:"nowrap", flexShrink:0, marginLeft:"8px" }}>{p.category}</span>
                </div>
                <p style={{ fontSize:"13px", color:COLORS.muted, lineHeight:1.65, flex:1 }}>{p.desc}</p>
                <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                  {p.tech.map(tech => <TechBadge key={tech} tech={tech} color={p.color} />)}
                </div>
                <a href="#" style={{ fontSize:"12px", color:COLORS.muted, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"6px" }}
                  onMouseEnter={e => e.currentTarget.style.color = COLORS.text}
                  onMouseLeave={e => e.currentTarget.style.color = COLORS.muted}>
                  <IconGitlab />{t.gitlabLink}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ ...sectionWrap, paddingBottom: isMobile ? "80px" : "120px" }}>
        <div style={{ background:COLORS.surface, border:`1px solid ${COLORS.border}`, borderRadius:"16px", padding: isMobile ? "36px 24px" : isTablet ? "48px" : "64px", textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"400px", height:"200px", background:"radial-gradient(ellipse, rgba(147,88,247,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />
          <FadeIn>
            <p style={{ fontSize:"11px", letterSpacing:"0.15em", color:COLORS.muted, marginBottom:"14px", textTransform:"uppercase" }}>{t.contactEyebrow}</p>
            <h2 style={{ fontFamily:"'Cabin',sans-serif", fontSize: isMobile ? "clamp(24px,8vw,36px)" : "clamp(28px,5vw,52px)", fontWeight:700, marginBottom:"18px" }}>{t.contactTitle}</h2>
            <p style={{ fontSize: isMobile ? "14px" : "16px", color:COLORS.muted, maxWidth:"400px", margin:"0 auto 36px", lineHeight:1.7 }}>{t.contactDesc}</p>
            <div style={{ display:"flex", gap:"10px", justifyContent:"center", flexWrap:"wrap" }}>
              {[
                { label:t.emailBtn, color:COLORS.purple },
                { label:t.linkedinBtn, color:COLORS.cyan },
                { label:t.githubBtn, color:COLORS.pink },
              ].map(({ label, color }) => (
                <button key={label} className="btn" style={{ ...btnStyle(color, isMobile), fontSize:"14px" }}>{label}</button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:`1px solid ${COLORS.border}`, padding: isMobile ? "20px" : "24px 48px", display:"flex", flexDirection: isMobile ? "column" : "row", justifyContent:"space-between", alignItems:"center", gap: isMobile ? "6px" : "0", textAlign: isMobile ? "center" : "left" }}>
        <span style={{ fontSize:"13px", color:COLORS.muted }}>{t.footer}</span>
        <span style={{ fontSize:"13px", color:COLORS.muted }}>2025</span>
      </footer>
    </div>
  );
}

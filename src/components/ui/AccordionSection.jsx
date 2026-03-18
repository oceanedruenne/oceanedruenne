import FadeIn from "./FadeIn";
import { IconChevron } from "../icons/Icons";
import { useTheme } from "../../context/ThemeContext.jsx";

export default function AccordionSection({ items, activeIdx, setActive, accentColor, renderContent, isMobile }) {
  const { colors } = useTheme();

  if (!isMobile) {
    return (
      <div style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "180px", flexShrink: 0 }}>
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <button className="hvr" onClick={() => setActive(i)} style={{
                background: "none", border: "none",
                borderLeft: `2px solid ${activeIdx === i ? accentColor : colors.border}`,
                padding: "12px 16px", textAlign: "left",
                color: activeIdx === i ? colors.text : colors.muted,
                fontSize: "14px", cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.2s", whiteSpace: "nowrap", overflow: "hidden",
                textOverflow: "ellipsis", maxWidth: "180px",
              }}>
                {item.company ? item.company.split(" ")[0] : item.school.split("–")[0].trim().split(" ")[0]}
              </button>
            </FadeIn>
          ))}
        </div>
        <div key={`panel-${activeIdx}`} style={{ flex: 1 }}>{renderContent(items[activeIdx])}</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {items.map((item, i) => {
        const isOpen = activeIdx === i;
        return (
          <FadeIn key={i} delay={i * 0.06}>
            <div style={{ border: `1px solid ${isOpen ? accentColor + "60" : colors.border}`, borderRadius: "8px", overflow: "hidden", transition: "border-color 0.2s" }}>
              <button onClick={() => setActive(isOpen ? -1 : i)} style={{
                width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "16px", background: isOpen ? `${accentColor}0d` : "transparent",
                border: "none", color: colors.text, fontFamily: "inherit", cursor: "pointer", gap: "8px",
              }}>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "15px", fontWeight: 600 }}>{item.company || item.school?.split("–")[0].trim()}</div>
                  <div style={{ fontSize: "12px", color: colors.muted, marginTop: "2px" }}>{item.role || item.degree}</div>
                </div>
                <IconChevron open={isOpen} />
              </button>
              {isOpen && <div style={{ padding: "0 16px 16px" }}>{renderContent(item)}</div>}
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}

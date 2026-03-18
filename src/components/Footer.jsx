import { useTheme } from "../context/ThemeContext";

export default function Footer({ t, isMobile }) {
  const { colors } = useTheme();

  return (
    <footer style={{
      borderTop: `1px solid ${colors.border}`,
      padding: isMobile ? "20px" : "24px 48px",
      display: "flex", flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between", alignItems: "center",
      gap: isMobile ? "6px" : "0", textAlign: isMobile ? "center" : "left",
    }}>
      <span style={{ fontSize: "13px", color: colors.muted }}>{t.footer}</span>
      <span style={{ fontSize: "13px", color: colors.muted }}>2025</span>
    </footer>
  );
}

export const GRADIENT = "linear-gradient(90deg, #9845e8 0%, #33d2ff 54%, #dd5789 100%)";
export const LANG_FLAGS = { en: "🇬🇧", fr: "🇫🇷" };

export const THEMES = {
  dark: {
    bg:      "#0d0d0d",
    surface: "#161616",
    border:  "#2a2a2a",
    text:    "#f0f0f0",
    muted:   "#888",
    subtle:  "#c4c4c4",
    cyan:    "#33d2ff",
    purple:  "#9358f7",
    pink:    "#dd5789",
  },
  light: {
    bg:      "#f5f5f7",
    surface: "#ffffff",
    border:  "#e2e2e2",
    text:    "#111111",
    muted:   "#888",
    subtle:  "#444444",
    cyan:    "#0099cc",
    purple:  "#7c3aed",
    pink:    "#be185d",
  },
};

// Kept for backward compat — components should use useTheme() instead
export const COLORS = THEMES.dark;

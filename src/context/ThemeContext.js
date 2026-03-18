import { createContext, useContext, useState } from "react";
import { THEMES } from "../constants/colors";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("dark");
  const colors = THEMES[mode];
  const toggle = () => setMode(m => m === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ mode, colors, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

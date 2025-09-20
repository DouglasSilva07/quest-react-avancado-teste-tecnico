import { createContext} from "react";

type ThemeName = "light" | "dark";

interface ThemeContextType {
    theme: ThemeName;
    toggleTheme: ()=>void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme:"dark",
    toggleTheme() {}
});





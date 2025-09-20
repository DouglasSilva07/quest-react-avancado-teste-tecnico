import { useEffect, useState } from "react";
import { ThemeContext } from "../ThemeContext";

type ThemeName = "light" | "dark";

interface ThemeProviderProps {
    children: React.ReactNode;
}


export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<ThemeName>(() => {
        const savedTheme = localStorage.getItem('theme') as ThemeName;
        return savedTheme || 'dark';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};



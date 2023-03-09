import { createContext } from "react";

export const THEME = {
    light: {
        backGround: "#FFFFFF",
        font: "#000000",
        footerbackGround: "#0A185C"
    },
    dark: {
        backGround: "#000000",
        font: "#FFFFFF",
        footerbackGround: "#000000"
    }
} 

export const ThemeContext = createContext(THEME.light)
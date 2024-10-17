import { themeDark, themeLight } from "@/lib/theme";
import { SCREEN_MODE } from "@/utils/commonConstants";
import {  CssBaseline, Theme, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function ThemeScreen({ children }: { children: React.ReactNode }) {
    const [modeTheme, setModeTheme] = useState<Theme | null>(null);
    useEffect(() => {     
        const htmlElement = document.documentElement;
        const theme = htmlElement.getAttribute('dark-theme');
        if (theme === SCREEN_MODE.dark) {
            setModeTheme(themeDark);
        } else {
            setModeTheme(themeLight);
        }
    }, []);
    if (!modeTheme) return null; 

    return (
        <ThemeProvider theme={modeTheme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    );
}
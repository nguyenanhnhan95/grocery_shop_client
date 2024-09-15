import { useScreenMode } from "@/hooks/common/useScreenMode";
import { ThemeProvider } from "@mui/material";

export default function ScreenTheme({ children }: { children: React.ReactNode }) {
    const { screenMode } = useScreenMode()
    return (
        <ThemeProvider theme={screenMode}>
            <div className={`${screenMode}`}>
                {children}
            </div>
        </ThemeProvider>
    )
}
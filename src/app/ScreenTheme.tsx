


import { CssBaseline } from "@mui/material";

import { ThemeProvider, createTheme } from '@mui/material/styles';


interface ScreenThemeProps {
    children: React.ReactNode;
    screenMode: 'light' | 'dark'; // Thêm thuộc tính className tùy chọn
}
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#000000', // Màu nền cho chế độ tối
            paper: '#1a1a1a',   // Màu nền cho giấy (paper)
        },
        text: {
            primary: '#ffffff', // Màu chữ cho chế độ tối
        },
    },
});
export default function ScreenTheme({ children, screenMode = 'light' }: ScreenThemeProps) {




    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            {/* <div className={`${screenMode.toLocaleLowerCase()}`}> */}
            {children}
            {/* </div> */}
        </ThemeProvider>
    )
}
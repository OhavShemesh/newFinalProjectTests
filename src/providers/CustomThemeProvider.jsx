import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useCustomTheme = () => useContext(ThemeContext);

const CustomThemeProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                            black: "black",
                            white: "white",
                        }
                        : {
                            black: "white",
                            white: "black",
                        }),
                },
                typography: {
                    fontFamily: 'Poppins, Arial, sans-serif',
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default CustomThemeProvider;

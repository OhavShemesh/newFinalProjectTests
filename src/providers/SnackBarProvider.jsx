import { Alert, Snackbar, IconButton } from "@mui/material";
import React, { useContext, useCallback, useState, createContext, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import './SnackbarProvider.css';

const SnackbarContext = createContext();

export default function SnackbarProvider({ children }) {
    const [snackQueue, setSnackQueue] = useState([]);
    const [isSnackOpen, setOpenSnack] = useState(false);
    const [currentSnack, setCurrentSnack] = useState(null);

    const setSnack = useCallback((color, message, variant = "filled") => {
        setSnackQueue((prev) => [...prev, { color, message, variant }]);
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
        setCurrentSnack(null);
    };

    useEffect(() => {
        if (snackQueue.length > 0 && !isSnackOpen) {
            setCurrentSnack(snackQueue[0]);
            setSnackQueue((prev) => prev.slice(1));
            setOpenSnack(true);

            const timer = setTimeout(() => {
                handleClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [snackQueue, isSnackOpen]);

    return (
        <>
            <SnackbarContext.Provider value={setSnack}>
                {children}
            </SnackbarContext.Provider>

            <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 1300 }}>
                {currentSnack && (
                    <Snackbar
                        open={isSnackOpen}
                        onClose={handleClose}
                        autoHideDuration={3000}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        sx={{ marginTop: "40px" }}
                    >
                        <Alert
                            severity={currentSnack.color}
                            variant={currentSnack.variant}
                            action={
                                <IconButton
                                    size="small"
                                    aria-label="close"
                                    color="inherit"
                                    onClick={handleClose}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            }
                            className="fade-out"
                        >
                            {typeof currentSnack.message === "string" ? currentSnack.message : currentSnack.message}
                        </Alert>
                    </Snackbar>
                )}
            </div>
        </>
    );
}

export const useSnack = () => {
    const context = useContext(SnackbarContext);
    if (!context) throw Error("useSnack must be used within a SnackbarProvider");
    return context;
};

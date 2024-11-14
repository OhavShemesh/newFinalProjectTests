import React, { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

export default function SearchBar() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [filtered, setFiltered] = useState("");

    useEffect(() => {
        const url = new URL(window.location);
        url.searchParams.set("searchValue", filtered);
        navigate(url.pathname + url.search, { replace: true });
    }, [filtered, navigate]);

    return (
        <Toolbar>
            <Box
                sx={{
                    position: 'relative',
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: alpha(theme.palette.common.white, 0.15),
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.common.white, 0.25),
                    },
                    marginLeft: 0,
                    width: '100%',
                    [theme.breakpoints.up('sm')]: {
                        width: 'auto',
                    },

                }}
            >
                <Box
                    sx={{
                        padding: theme.spacing(0, 2),
                        height: '100%',
                        position: 'absolute',
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: { xs: "0", sm: 0, md: 'auto' }
                    }}
                >
                    <SearchIcon sx={{ fontSize: { xs: "18px", sm: "24px" } }} />
                </Box>
                <InputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={filtered}
                    onChange={(e) => setFiltered(e.target.value)}
                    sx={{
                        color: 'inherit',
                        width: '100%',
                        fontSize: { xs: "0.8rem", sm: "1rem" },
                        '& .MuiInputBase-input': {
                            padding: theme.spacing(1, 1, 1, 0),
                            paddingLeft: { xs: `calc(1em + ${theme.spacing(2)})`, sm: `calc(1em + ${theme.spacing(3.5)})`, md: `calc(1em + ${theme.spacing(4)})` },
                            transition: theme.transitions.create('width'),
                            [theme.breakpoints.up('sm')]: {
                                width: '12ch',
                                '&:focus': {
                                    width: '20ch',
                                },
                            },
                        },
                        '& .MuiInputBase-input::placeholder': {
                            fontSize: { xs: "0.8rem", sm: "1rem" },
                        },
                    }}
                />
            </Box>
        </Toolbar>
    );
}

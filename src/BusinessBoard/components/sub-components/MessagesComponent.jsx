import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, Collapse, IconButton, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';

export default function MessagesComponent({ allCustomersDetails = [], toTitleCase, handleDeleteMessage, handleCompleteMessage }) {
    const [expanded, setExpanded] = useState(null);

    const toggleExpandRow = (uniqueId) => {
        setExpanded(expanded === uniqueId ? null : uniqueId);
    };

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Table sx={{ width: "80%", margin: "auto" }}>
                <TableHead>
                    <TableRow>
                        <TableCell align='center' sx={{ fontWeight: "bold", color: 'black' }}>Customer's Id</TableCell>
                        <TableCell align='center' sx={{ fontWeight: "bold", color: 'black' }}>Customer's Name</TableCell>
                        <TableCell align='center' sx={{ fontWeight: "bold", color: 'black' }}>Customer's Phone</TableCell>
                        <TableCell align='center' sx={{ fontWeight: "bold", color: 'black' }}>Customer's Email</TableCell>
                        <TableCell align='center'></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allCustomersDetails.map((customerDetails) =>
                        customerDetails?.messages?.map((message, index) => {
                            const uniqueId = `${customerDetails._id}-${index}`;
                            return (
                                <React.Fragment key={uniqueId}>
                                    <TableRow sx={{ cursor: 'pointer' }} onClick={() => toggleExpandRow(uniqueId)}>
                                        <TableCell align='center' sx={{ color: "black" }}>{customerDetails?._id}</TableCell>
                                        <TableCell align='center' sx={{ color: "black" }}>
                                            {toTitleCase(`${customerDetails?.name.first} ${customerDetails?.name.middle} ${customerDetails?.name.last}`)}
                                        </TableCell>
                                        <TableCell align='center' sx={{ color: "black" }}>{customerDetails?.phone}</TableCell>
                                        <TableCell align='center' sx={{ color: "black" }}>{customerDetails?.email}</TableCell>
                                        <TableCell align="center">
                                            <IconButton size="small">
                                                {expanded === uniqueId ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={5} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                                            <Collapse in={expanded === uniqueId} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 2, display: 'flex', flexDirection: "column", gap: 1 }}>
                                                    <Typography variant="h6" gutterBottom component="div" sx={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>
                                                        Customer's Message
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                                                        {message?.message}
                                                    </Typography>
                                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <TextField
                                                            sx={{ width: "40%" }}
                                                            placeholder="Response"
                                                            multiline
                                                            minRows={2}
                                                            inputProps={{ style: { textAlign: 'center' } }}
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                        <IconButton sx={{ width: "50px", height: "50px" }}>
                                                            <SendIcon sx={{ color: "black", fontSize: "28px" }} />
                                                        </IconButton>
                                                    </Box>
                                                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1, paddingTop: 2 }}>
                                                        <Button onClick={() => handleDeleteMessage(message?.message, customerDetails?._id)} variant="contained" color="error">Delete</Button>
                                                        <Button onClick={() => handleCompleteMessage(message?.message, customerDetails?._id)} variant="contained" color="success">Completed</Button>
                                                    </Box>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </Box>
    );
}

import React, { useState } from "react";
import { Grid, TextField, Typography, Box, IconButton, InputAdornment, useTheme } from "@mui/material";
import { DreamRegisterDTO } from "../../dtos/DreamDTOs";
import DarkerStyledPaper from "../../components/common/StyledPaper";
import { Send as SendIcon } from '@mui/icons-material';
import theme from "../../theme";

export const RegisterDreamForm = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [formData, setFormData] = useState<DreamRegisterDTO>({
        title: "",
        description: "",
        date: ""
    });

    const usedInputBackground = isDarkMode ? theme.palette.grey[800] : 'initial';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        console.log("Form data:", formData);
    };

    return (
        <DarkerStyledPaper sx={{ padding: 3 }}>
            {/* <Typography variant="h4" gutterBottom>
                Registrar Novo Sonho
            </Typography> */}
            {/* <Grid item xs={12} margin={'auto'}> */}
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            label="Título"
                            name="title"
                            variant="standard"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            sx={{ height: '56px' }}
                            />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            sx={{ height: '56px' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ position: 'relative', width: '100%' }}>
                            <TextField
                                fullWidth
                                label="Descrição"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                multiline
                                maxRows={6}
                                required
                                sx={{ backgroundColor: usedInputBackground }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleSubmit}>
                                                <SendIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            {/* </Grid> */}
        </DarkerStyledPaper>
    );
};
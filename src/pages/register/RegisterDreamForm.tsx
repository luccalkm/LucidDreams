import React, { useState } from "react";
import { Grid, TextField, Typography, Box, IconButton, InputAdornment } from "@mui/material";
import { DreamRegisterDTO } from "../../dtos/DreamDTOs";
import DarkerStyledPaper from "../../components/common/StyledPaper";
import { Send as SendIcon } from '@mui/icons-material';

export const RegisterDreamForm = () => {

    const [formData, setFormData] = useState<DreamRegisterDTO>({
        title: "",
        description: "",
        date: "",
        image: "",
    });

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
            <Typography variant="h4" gutterBottom>
                Registrar Novo Sonho
            </Typography>
            <Grid item xs={8} margin={'auto'}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Título"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            sx={{ height: '56px' }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Data"
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
                </Grid></Grid>
        </DarkerStyledPaper>
    );
};
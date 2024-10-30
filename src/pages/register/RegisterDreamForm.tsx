import React, { useState } from "react";
import { Grid, TextField, Box, IconButton, InputAdornment } from "@mui/material";
import { Send as SendIcon } from '@mui/icons-material';
import DarkerStyledPaper from "../../components/common/StyledPaper";
import { DreamRegisterDTO } from "../../dtos/DreamDTOs";
import { useAI } from "../../context/AIContext";
import { getDatabase, ref, set } from "firebase/database";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createResponse } from "../../dtos/ResponseDTOs";
import { useSnackbar } from "../../context/SnackbarContext";

export const RegisterDreamForm = () => {
    const { generateImageBase64, collectDreamDataPrompt, getTextResponse, loading } = useAI();
    const {  getLoggedId } = useAuth();
    const [formData, setFormData] = useState<DreamRegisterDTO>({
        title: "",
        description: "",
        date: ""
    });
    const db = getDatabase();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    const [error, setError] = useState<string | null>(null);
    const isFormValid = formData.title.trim() !== "" && formData.description.trim() !== "" && formData.date.trim() !== "";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async () => {
        if (!isFormValid) return;
    debugger;
        let base64 = "";
    
        try {
            base64 = await generateImageBase64(formData.description);
        } catch (error) {
            
            showSnackbar("Não foi possível criar uma imagem para seu sonho no momento!", "error");
            base64 = "";
        }
    
        try {
            const newDreamRef = ref(db, `dreams/${getLoggedId()}/${crypto.randomUUID()}`);
            await set(newDreamRef, {
                title: formData.title,
                description: formData.description,
                date: formData.date,
                imageBase64: base64,
            });
            showSnackbar("Sonho criado com sucesso.", "success");
            navigate("/my/dream");
        } catch (error) {
            showSnackbar("Ocorreu um erro ao criar seu sonho... Tente novamente mais tarde!", "error");
        }
    };
    

    return (
        <DarkerStyledPaper sx={{ padding: 3 }}>
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
                            sx={{ backgroundColor: 'initial' }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleSubmit} disabled={!isFormValid || loading}>
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                </Grid>

                {error && (
                    <Grid item xs={12}>
                        <p style={{ color: 'red' }}>{error}</p>
                    </Grid>
                )}
            </Grid>
        </DarkerStyledPaper>
    );
};

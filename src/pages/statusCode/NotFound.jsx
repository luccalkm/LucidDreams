import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Box
            sx={{
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 2,
            }}
        >
            <img 
                src="/404-error-story.svg"
                alt="Erro 404 - Página Não Encontrada"
                width={500}    
            />
            <Typography variant="h3" gutterBottom>
                Página não encontrada.
            </Typography>
            <Typography variant="h6" gutterBottom>
                A página que você está procurando não existe.
            </Typography>
            <Button
                variant="contained"
                color="info"
                sx={{ mt: 3 }}
                onClick={handleGoBack}
            >
                VOLTAR
            </Button>
        </Box>
    );
};
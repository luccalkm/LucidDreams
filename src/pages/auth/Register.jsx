import React, { useState, ChangeEvent, FormEvent } from "react";
import {
    loginUser,
    registerUser,
    signInWithGoogle,
} from "../../controllers/AuthController";
import { Link, Typography, TextField, Box, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";

// Definir o tipo para o estado do formulário de registro
interface RegisterForm {
    nome: string;
    email: string;
    senha: string;
    dataNascimento: string;
}

const RegisterPage: React.FC = () => {
    const [registerForm, setRegisterForm] = useState < RegisterForm > ({
        nome: "",
        email: "",
        senha: "",
        dataNascimento: "",
    });

    const theme = useTheme();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { email, senha, nome, dataNascimento } = registerForm;
            await registerUser(email, senha, nome, dataNascimento);
        } catch (error) {
            console.error("Erro ao fazer cadastro:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setRegisterForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Erro ao fazer login com Google:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            sx={{ mt: theme.spacing(5) }}
        >
            <Grid item>
                <Typography
                    component="h1"
                    variant="h5"
                    fontWeight="bold"
                    sx={{ mb: theme.spacing(2) }}
                >
                    Crie uma nova conta
                </Typography>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
                <Box
                    component="form"
                    noValidate
                    sx={{
                        mt: theme.spacing(1),
                        width: "100%",
                    }}
                    onSubmit={handleSubmit}
                >
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="nome"
                            label="Nome"
                            type="text"
                            value={registerForm.nome}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: theme.shape.borderRadius,
                            }}
                        />
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                autoComplete="email"
                                value={registerForm.email}
                                onChange={handleChange}
                                sx={{
                                    backgroundColor: theme.palette.background.paper,
                                    borderRadius: theme.shape.borderRadius,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="senha"
                                label="Senha"
                                type="password"
                                value={registerForm.senha}
                                onChange={handleChange}
                                sx={{
                                    backgroundColor: theme.palette.background.paper,
                                    borderRadius: theme.shape.borderRadius,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="dataNascimento"
                                label="Data de Nascimento"
                                type="text"
                                value={registerForm.dataNascimento}
                                onChange={handleChange}
                                sx={{
                                    backgroundColor: theme.palette.background.paper,
                                    borderRadius: theme.shape.borderRadius,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            disabled={loading}
                            type="submit"
                            fullWidth
                            sx={{
                                my: theme.spacing(3),
                            }}
                        >
                            {loading ? "Carregando..." : "Criar conta"}
                        </Button>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link
                                href="/login"
                                variant="body1"
                                underline="none"
                                sx={{ color: "primary.main" }}
                            >
                                Já tenho conta
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justifyContent="center"
                        sx={{ mt: theme.spacing(2) }}
                    >
                        <Grid item>
                            <Button
                                variant="outlined"
                                onClick={handleGoogleLogin}
                                startIcon={<GoogleIcon />}
                                fullWidth
                                sx={{
                                    my: theme.spacing(1),
                                }}
                            >
                                Login com Google
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default RegisterPage;

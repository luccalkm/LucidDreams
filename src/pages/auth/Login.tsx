import React, { useState, ChangeEvent, FormEvent } from "react";
import { loginUser, registerUser, signInWithGoogle } from "../../controllers/AuthController";
import {
    Link,
    Typography,
    TextField,
    Box,
    Grid,
    Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage: React.FC = () => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });
    const theme = useTheme();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { email, password } = loginForm;
        setLoading(true);
        try {
            await loginUser(email, password);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({
            ...prev,
            [name]: value
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
        <Grid container direction="column" alignItems="center" sx={{ mt: theme.spacing(5) }}>
            <Grid item>
                <Typography
                    component="h1"
                    variant="h5"
                    fontWeight="bold"
                    sx={{ mb: theme.spacing(2) }}
                >
                    Faça login em sua conta
                </Typography>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
                <Box
                    component="form"
                    noValidate
                    sx={{
                        mt: theme.spacing(1),
                        width: '100%',
                    }}
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={2}>
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
                                autoFocus
                                value={loginForm.email}
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
                                name="password"
                                label="Senha"
                                type="password"
                                value={loginForm.password}
                                onChange={handleChange}
                                sx={{
                                    backgroundColor: theme.palette.background.paper,
                                    borderRadius: theme.shape.borderRadius,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                href="#"
                                variant="body2"
                                sx={{
                                    display: 'block',
                                    textAlign: 'right',
                                    mt: theme.spacing(1),
                                    color: theme.palette.primary.main,
                                }}
                            >
                                Esqueceu a senha?
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            disabled={loading}
                            type="submit"
                            fullWidth
                            sx={{
                                my: theme.spacing(3)
                            }}
                        >
                            {loading ? "Carregando..." : "Entrar"}
                        </Button>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link
                                href="/register"
                                variant="button"
                                underline="none"
                                sx={{ color: theme.palette.primary.main }}
                            >
                                Criar conta
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" sx={{ mt: theme.spacing(2) }}>
                        <Grid item>
                            <Button
                                color="secondary"
                                variant='contained'
                                onClick={handleGoogleLogin}
                                startIcon={<GoogleIcon />}
                                fullWidth
                                sx={{
                                    my: theme.spacing(1)
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

export default LoginPage;

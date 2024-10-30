import { useState } from "react";
import { loginUser, registerUser, signInWithGoogle } from "../../controllers/AuthController";
import {
    Link,
    Typography,
    TextField,
    Box,
    Grid2,
    Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage = () => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });
    const theme = useTheme();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
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

    const handleChange = (e) => {
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
        <Grid2 container direction="column" alignItems="center" sx={{ mt: theme.spacing(5) }}>
            <Grid2>
                <Typography
                    component="h1"
                    variant="h5"
                    fontWeight="bold"
                    sx={{ mb: theme.spacing(2) }}
                >
                    Faça login em sua conta
                </Typography>
            </Grid2>
            <Grid2 sx={{ width: '100%' }}>
                <Box
                    component="form"
                    noValidate
                    sx={{
                        mt: theme.spacing(1),
                        width: '100%',
                    }}
                >
                    <Grid2 container spacing={2}>
                        <Grid2 size={12}>
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
                        </Grid2>
                        <Grid2 size={12}>
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
                        </Grid2>
                    </Grid2>
                    <Grid2 container justifyContent="flex-end">
                        <Grid2>
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
                        </Grid2>
                    </Grid2>
                    <Grid2 size={12}>
                        <Button
                            variant='contained'
                            disabled={loading}
                            onClick={handleSubmit}
                            fullWidth
                            sx={{
                                my: theme.spacing(3)
                            }}
                        >
                            {loading ? "Carregando..." : "Entrar"}
                        </Button>
                    </Grid2>
                    <Grid2 container justifyContent="center">
                        <Grid2>
                            <Link
                                href="/register"
                                variant="button"
                                underline="none"
                                sx={{ color: theme.palette.primary.main }}
                            >
                                Criar conta
                            </Link>
                        </Grid2>
                    </Grid2>
                    <Grid2 container justifyContent="center" sx={{ mt: theme.spacing(2) }}>
                        <Grid2>
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
                        </Grid2>
                    </Grid2>
                </Box>
            </Grid2>
        </Grid2>
    );
};

export default LoginPage;
import { useState } from "react";
import {
    registerUser,
    signInWithGoogle,
} from "../../controllers/AuthController";
import { Link, Typography, TextField, Box, Grid2, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import { UserRegisterDTO } from "../../dtos/UserDTOs";
import { useSnackbar } from "../../context/SnackbarContext";
import { validateDateOfBirth, validateEmail } from "../../utils/validationsUtils";

const RegisterPage = () => {
    const [registerForm, setRegisterForm] = useState<UserRegisterDTO>({
        name: "",
        email: "",
        password: "",
        dateOfBirth: "",
    });

    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const { showSnackbar } = useSnackbar();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        
        let errorMessage = "";

        if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.dateOfBirth)
            errorMessage = "Todos os campos são obrigatórios.";
        
        if (errorMessage === "" && !validateEmail(registerForm.email))
            errorMessage = "O E-mail fornecido não é válido.";
    
        if (errorMessage === "" && !validateDateOfBirth(registerForm.dateOfBirth)) 
            errorMessage = "A data de nascimento deve ser uma data válida.";
    
        if (errorMessage) {
            showSnackbar(errorMessage, "error");
            setLoading(false);
            return;
        }
    
        try {
            const response = await registerUser(registerForm);
            if (!response.success)
                throw new Error(response?.message?.toString());
        } catch (error: any) {
            const errorMessage = error?.message || "Erro ao realizar registro. Verifique os dados e tente novamente.";
            showSnackbar(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: any) => {
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
            showSnackbar("Erro ao fazer login com Google.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid2
            container
            direction="column"
            alignItems="center"
            sx={{ mt: theme.spacing(5) }}
        >
            <Grid2>
                <Typography
                    component="h1"
                    variant="h5"
                    fontWeight="bold"
                    sx={{ mb: theme.spacing(2) }}
                >
                    Crie uma nova conta
                </Typography>
            </Grid2>
            <Grid2 sx={{ width: "100%" }}>
                <Box
                    component="form"
                    noValidate
                    sx={{
                        mt: theme.spacing(1),
                        width: "100%",
                    }}
                >
                    <Grid2 size={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="Nome"
                            type="text"
                            value={registerForm.name}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: theme.shape.borderRadius,
                            }}
                        />
                    </Grid2>
                    <Grid2 container spacing={1}>
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
                                value={registerForm.email}
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
                                value={registerForm.password}
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
                                name="dateOfBirth"
                                label="Data de Nascimento"
                                type="date"
                                value={registerForm.dateOfBirth || new Date()}
                                onChange={handleChange}
                                sx={{
                                    backgroundColor: theme.palette.background.paper,
                                    borderRadius: theme.shape.borderRadius,
                                }}
                            />
                        </Grid2>
                    </Grid2>
                    <Grid2 size={12}>
                        <Button
                            variant="contained"
                            disabled={loading}
                            onClick={handleSubmit}
                            fullWidth
                            sx={{
                                my: theme.spacing(3),
                            }}
                        >
                            {loading ? "Carregando..." : "Criar conta"}
                        </Button>
                    </Grid2>
                    <Grid2 container justifyContent="center">
                        <Grid2>
                            <Link
                                href="/login"
                                variant="body1"
                                underline="none"
                                sx={{ color: "primary.main" }}
                            >
                                Já tenho conta
                            </Link>
                        </Grid2>
                    </Grid2>
                    <Grid2
                        container
                        justifyContent="center"
                        sx={{ mt: theme.spacing(2) }}
                    >
                        <Grid2>
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
                        </Grid2>
                    </Grid2>
                </Box>
            </Grid2>
        </Grid2>
    );
};

export default RegisterPage;
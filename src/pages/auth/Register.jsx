import { useState } from "react";
import {
  loginUser,
  registerUser,
  signInWithGoogle,
} from "../../controllers/AuthController";
import { Link, Typography, TextField, Box, Grid2, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";

const RegisterPage = () => {
  const [registerForm, setRegisterForm] = useState({
    nome: "",
    email: "",
    senha: "",
    dataNascimento: "",
  });

  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, senha, nome, dataNascimento } = registerForm;
       await registerUser(email, senha, nome, dataNascimento);
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
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
                name="senha"
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
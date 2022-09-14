import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import LinearProgress from '@mui/material/LinearProgress';
import React from 'react';
import Api from "../../services/api";
import { Container, Button, Box, Link, Grid, Typography, TextField, Alert, AlertTitle } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { login } from "../../redux/slices/userSlices";

const validationSchema = yup.object({
    email: yup
        .string()
        .email()
        .required('Insira seu e-mail'),
    password: yup
        .string()
        .min(8, 'A senha deve ser no mínimo 8 caracteres')
        .required('Insira sua senha'),
});

const Login = () => {
    const [loading, setLoadinng] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (values) => {
        const { email, password } = values;
        setLoadinng(true)

        try {
            const response = await Api.login({ email, senha: password });

            console.log(response.usuario);
            if (response.status === 401) {
                setError(true)
                setErrorMessage(response.message)
                return
            }
            dispatch(login(response.usuario))

            navigate(`/`)
        } catch (error) {
            console.log(error);
            setError(true)
        } finally {
            setLoadinng(false)
        }
    }

    const theme = createTheme();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });
    return (
        <ThemeProvider theme={theme}>
            {loading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )}
            <Container component="main" maxWidth="xs">

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Entrar
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}

                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />



                        <Button
                            type="submit"
                            fullWidth
                            disabled={loading}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Entrar
                        </Button>
                        {error && (
                            <Alert severity="error">
                                <AlertTitle>Erro</AlertTitle>
                                {errorMessage ?? "Um erro ocorreu"}.   <strong>Tente novamente</strong>
                            </Alert>
                        )}
                        <Grid container>

                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    Ainda não possui uma conta?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );

}


export default Login;
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import React from 'react';
import Api from "../../services/api";
import { VisibilityOff, Visibility } from '@mui/icons-material/';
import {
    Container,
    Typography, Box, Button, TextField
    , LinearProgress, Grid, Link
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    nome: yup
        .string('Insira seu nome')
        .required('Nome is required'),
    email: yup
        .string('Insira seu email')
        .email('Enter a valid email')
        .required('Email is required'),
    confirmPassowrd: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});


const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nome, setNome] = useState("")
    const [confirmPassowrd, setConfirmPassword] = useState("")
    const [errorPassword, setErrorPassword] = useState(false)
    const [loading, setLoadinng] = useState(false)


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoadinng(true)
            await Api.signup({
                tipoUsuarioId: 1,
                nome, email, senha: password
            });
            setLoadinng(false)
            navigate("/login")

        } catch (error) {
            console.log(error);
        } finally {
            setLoadinng(false)
        }
    }

    const theme = createTheme();


    const formik = useFormik({
        initialValues: {
            nome: "",
            email: '',
            password: '',
            confirmPassowrd: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values, event) => { },
    });

    return (
        <ThemeProvider
            theme={theme}>
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
                        Cadastro
                    </Typography>
                    <Box component="form"
                        onSubmit={formik.handleSubmit} >
                        <TextField
                            autoFocus
                            required
                            fullWidth
                            name="nome"
                            label="Nome completo"
                            type="text"
                            id="nome"
                            value={formik.values.nome}
                            onChange={formik.handleChange}
                            error={formik.touched.nome && Boolean(formik.errors.nome)}
                            helperText={formik.touched.nome && formik.errors.nome}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                        />

                        <TextField
                            margin="normal"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            name="password"
                            label="Senha"
                            fullWidth
                            // endAdornment={
                            //     <InputAdornment position="end">
                            //         <IconButton
                            //             aria-label="toggle password visibility"
                            //             onClick={handleClickShowPassword}
                            //             onMouseDown={handleMouseDownPassword}
                            //         >
                            //             {showPassword ? <VisibilityOff /> : <Visibility />}
                            //         </IconButton>
                            //     </InputAdornment>
                            // }
                            type={"password"}
                        />

                        <TextField
                            margin="normal"
                            // value={confirmPassowrd}
                            // onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirmar senha"
                            type="password"
                            // error={errorPassword}
                            // helperText={errorPassword ? "As senhas não coincidem" : ""}
                            value={formik.values.confirmPassowrd}
                            onChange={(values) => {
                                console.log(values);
                                console.log("asdad");
                                formik.handleChange()
                            }}
                            error={formik.touched.confirmPassowrd && Boolean(formik.errors.confirmPassowrd)}
                            helperText={formik.touched.confirmPassowrd && formik.errors.confirmPassowrd}
                        />
                        <Box sx={{
                            marginTop: 2,
                        }}>
                        </Box>

                        <Button
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Cadastrar
                        </Button>
                        <Grid container>

                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Já possui uma conta?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>

                </Box>
            </Container>
        </ThemeProvider >
    );

}


export default Signup;

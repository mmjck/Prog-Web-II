import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LinearProgress from '@mui/material/LinearProgress';
import React from 'react';
import Api from "../../services/api";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {
    InputAdornment,
    Input,
    Typography, Box, Button, TextField, IconButton, FormControl,
    OutlinedInput,
    InputLabel

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


const AdicionarColaborador = () => {
    const [loading, setLoadinng] = useState(false)


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const navigate = useNavigate();







    const handleSubmit = async (values) => {
        try {
            setLoadinng(true)
            await Api.signup({
                tipoUsuarioId: 2,
                nome: values.nome, email: values.email, senha: values.password
            });
            setLoadinng(false)
            navigate("/colaboradores")

        } catch (error) {
            console.log(error);
        } finally {
            setLoadinng(false)
        }
    }

    const theme = createTheme();

    const formik = useFormik({
        initialValues: {
            nome: '',
            email: '',
            password: '',
            confirmPassowrd: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });


    return (
        <ThemeProvider
            theme={theme}>
            {loading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )}

            <Box sx={{ alignContent: "center", justifyContent: "center" }}>

                <Typography component="h1" variant="h5">
                    Adicionar colaborador
                </Typography>
                <Box component="form" sx={{ width: '80%' }} variant="outlined"
                    onSubmit={formik.handleSubmit}  >
                    <TextField
                        margin="normal"
                        value={formik.nome}
                        onChange={formik.handleChange}
                        fullWidth
                        name="password"
                        label="Nome completo"
                        type="text"
                        id="nome"
                        autoFocus
                        error={formik.touched.nome && Boolean(formik.errors.nome)}
                        helperText={formik.touched.nome && formik.errors.nome}
                    />
                    <TextField
                        fullWidth
                        value={formik.email}
                        onChange={formik.handleChange}
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <TextField
                        margin="normal"
                        value={formik.password}
                        onChange={formik.handleChange}
                        id="password"
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
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        type={showPassword ? "text" : "password"}
                    />
                    <TextField
                        margin="normal"
                        fullWidth

                        value={formik.confirPassword}
                        onChange={formik.handleChange}
                        name="confirPassword"
                        label="Confirmar senha"
                        type="password"
                        id="confirPassword"
                        autoComplete="current-password"
                        error={formik.touched.confirmPassowrd && Boolean(formik.errors.confirmPassowrd)}
                        helperText={formik.touched.confirmPassowrd && formik.errors.confirmPassowrd}
                    />
                    <Box sx={{ height: 40 }} />

                    <Button
                        disabled={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Cadastrar colaborador
                    </Button>

                </Box>
            </Box>
        </ThemeProvider >
    );

}


export default AdicionarColaborador;

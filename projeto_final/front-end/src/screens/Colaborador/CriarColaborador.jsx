import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LinearProgress from '@mui/material/LinearProgress';
import React from 'react';
import Api from "../../services/api";
import {
    Typography, Box, Button, TextField

} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    nome: yup
        .string()
        .required('Insira seu nome'),
    email: yup
        .string()
        .email()
        .required("Insira seu email"),
    confirmPassowrd: yup.string()
        .oneOf([yup.ref('password'), null], 'Senhas devem ser iguais'),
    password: yup
        .string('')
        .min(8, 'Senha deve ter no mínimo 8 caracteres')
        .required('Insira sua senha'),
});


const AdicionarColaborador = () => {
    const [loading, setLoadinng] = useState(false)


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
                        name="nome"
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


                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
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

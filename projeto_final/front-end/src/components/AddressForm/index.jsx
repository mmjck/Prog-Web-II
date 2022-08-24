import * as React from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import {
    TextField,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress,
    Box, Button,

} from '@mui/material';
import { useState } from 'react';

const validationSchema = yup.object({
    logradouro: yup
        .string('Insira o logradouro')
        .required('Email is required'),
    bairro: yup
        .string('Insita o bairro')
        .required('Password is required'),
});
const AddressFormDialog = ({ isOpen, onClose, title, message, data }) => {
    const [loading, setLoading] = useState(false)

    const handleSubmitCreate = async () => {
        setLoading(true)
        try {

        } catch (error) {

        } finally {
            setLoading(false)

        }
    }

    const handleSubmitEdit = async () => {
        setLoading(true)
        try {

        } catch (error) {

        } finally {
            setLoading(false)

        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            logradouro: data != null ? data?.logradouro ?? '' : '',
            bairro: data != null ? data?.bairro ?? '' : '',
            cidade: data != null ? data?.cidade ?? '' : '',
            uf: data != null ? data?.uf ?? '' : '',
            cep: data != null ? data?.cep ?? '' : '',
            numero: data != null ? data?.numero ?? '' : '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);

            // is edint address
            if (data != null) {
                return handleSubmitEdit(values)
            }
            handleSubmitCreate(values)
        },
    });

    console.log(formik, formik.values, data);
    return (
        <Dialog open={isOpen} onClose={onClose}>
            {loading && (
                <LinearProgress />
            )}
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        // autoFocus
                        margin="normal"
                        id="logradouro"
                        label={data != null ? "" : "Logradouro"}
                        value={formik.values.logradouro}
                        onChange={formik.handleChange}
                        error={formik.touched.logradouro && Boolean(formik.errors.logradouro)}
                        helperText={formik.touched.logradouro && formik.errors.logradouro}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        id="numero"
                        label={data != null ? "" : "Número"}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formik.values.numero}
                        onChange={formik.handleChange}
                        error={formik.touched.numero && Boolean(formik.errors.numero)}
                        helperText={formik.touched.numero && formik.errors.numero}
                    />
                    <TextField
                        margin="normal"
                        id="bairro"
                        label={data != null ? "" : "Bairro"}
                        type="text"
                        fullWidth
                        variant="standard"

                        value={formik.values.bairro}
                        onChange={formik.handleChange}
                        error={formik.touched.bairro && Boolean(formik.errors.bairro)}
                        helperText={formik.touched.bairro && formik.errors.bairro}
                    />
                    <TextField
                        margin="normal"
                        id="cidade"
                        label={data != null ? "" : "Cidade"}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formik.values.cidade}
                        onChange={formik.handleChange}
                        error={formik.touched.cidade && Boolean(formik.errors.cidade)}
                        helperText={formik.touched.cidade && formik.errors.cidade}
                    />
                    <TextField
                        margin="normal"
                        id="uf"
                        label={data != null ? "" : "UF"}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formik.values.uf}
                        onChange={formik.handleChange}
                        error={formik.touched.uf && Boolean(formik.errors.uf)}
                        helperText={formik.touched.uf && formik.errors.uf}
                    />
                    <Box sx={{
                        display: "flex", flexDirection: "row",
                        justifyContent: "space-between",
                        paddingX: 10,
                        paddingY: 5
                    }}>
                        <Button variant="contained" color="error" onClick={onClose}>Cancelar</Button>
                        <Button variant="contained" color="success" type='submit'>Adicionar</Button>
                    </Box>
                </Box>

            </DialogContent>

        </Dialog>
    );
}
export default AddressFormDialog;
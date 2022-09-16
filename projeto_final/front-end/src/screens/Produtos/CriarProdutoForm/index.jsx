import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Api from "../../../services/api";
import {
    Typography, Box, Button, TextField,
    LinearProgress, Input,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Contador from "../../../components/Contador";

const validationSchema = yup.object({
    nome: yup
        .string()
        .required('Insira o nome do Produto'),
    descricao: yup
        .string()
        .required("Insira uma descrição"),
    preco: yup
        .number()
        .required('Preço is required'),
    // file: yup.mixed().required(),
});

const CriarProdutoForm = () => {

    const [estoque, setEstoque] = useState(1)
    const [loading, setLoadinng] = useState(false)
    const [image, setImage] = useState(null)



    const navigate = useNavigate();
    const theme = createTheme();

    const handleSubmit = async (e) => {
        const produto = { ...e, estoque }
        console.log("e, ", e.file, image);
        setLoadinng(true)
        const formData = new FormData()
        formData.append('file', image.data)

        console.log("formdata", formData);
        try {
            const { path } = await Api.uploadImage(formData)

            console.log(path);
            // const response = await Api.createProdut({ ...produto, path });

            // navigate(`/produto/${response.id}`)
            // console.log(response);
        } catch (error) {
            console.log(error);

        }
        finally {
            setLoadinng(false)
        }
    }

    const handleFileChange = (e) => {
        console.log(e.target.files);
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }

    const formik = useFormik({
        initialValues: {
            nome: "",
            descricao: '',
            preco: 0,
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
            <Typography component="h3">
                Adição de produto
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                    margin="normal"
                    fullWidth
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                    error={formik.touched.nome && Boolean(formik.errors.nome)}
                    helperText={formik.touched.nome && formik.errors.nome}
                    id="nome"
                    label="Nome"
                    name="nome"
                />
                <TextField
                    margin="normal"
                    fullWidth
                    multiline
                    rows={4}
                    value={formik.values.descricao}
                    onChange={formik.handleChange}
                    error={formik.touched.descricao && Boolean(formik.errors.descricao)}
                    helperText={formik.touched.descricao && formik.errors.descricao}
                    id="descricao"
                    label="Descrição"
                    name="descricao"
                />
                <TextField
                    margin="normal"
                    fullWidth
                    value={formik.values.preco}
                    onChange={formik.handleChange}
                    error={formik.touched.preco && Boolean(formik.errors.preco)}
                    helperText={formik.touched.preco && formik.errors.preco}
                    id="preco"
                    label="Preço"
                    name="preco"
                    type="number"
                />


                <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />


                <Contador value={estoque} increment={() => {
                    setEstoque(estoque + 1)
                }}
                    decrement={() => {
                        setEstoque(estoque - 1)
                    }} />

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Cadastrar
                </Button>
            </Box>
        </ThemeProvider >
    )
}

export default CriarProdutoForm
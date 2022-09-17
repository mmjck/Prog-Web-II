import { useState, useCallback, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Api from "../../../services/api";


import {
    Typography, Box, Button, TextField,
    LinearProgress, Input
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Contador from "../../../components/Contador";


const validationSchema = yup.object({
    nome: yup
        .string('Insira seu nome')
        .required('Nome is required'),
    descricao: yup
        .string('Insira seu email')
        .required('Email is required'),
    preco: yup
        .number()
        .required('Preço is required'),
});


const EditarProduto = () => {

    const [estoque, setEstoque] = useState(10)
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState(null)
    const [image, setImage] = useState(null)
    const [hasImage, setHasImage] = useState(false);


    const navigate = useNavigate();
    const theme = createTheme();

    const { id } = useParams();

    const getProducts = useCallback(
        async () => {
            try {
                const response = await Api.getProductById(id);
                console.log(response);
                setProduct(response)

            } catch (error) {
                console.log(error);
            }
        },
        [id]
    );
    useEffect(() => {
        getProducts();

    }, [getProducts]);


    const handleSubmit = async (e) => {
        const produto = { ...e, estoque, preco: parseInt(e.preco) }
        setLoading(true)
        console.log("produto");

        console.log(produto);
        try {
            const response = await Api.updateProdut(produto, id);
            navigate(`/produto/${response.id}`)
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    }


    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
        setHasImage(true)
    }


    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            nome: product != null ? product.nome ?? '' : '',
            descricao: product != null ? product.descricao ?? '' : '',
            preco: product?.preco ?? 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values, event) => {
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
                Editar de produto
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

                {hasImage && (
                    <Box
                        component="img"
                        sx={{
                            height: 233,
                            width: 350,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                        }}
                        alt="The house from the offer."
                        src={image?.preview}
                    />
                )}

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
                    Atualizar
                </Button>

            </Box>



        </ThemeProvider>


    )
}

export default EditarProduto;
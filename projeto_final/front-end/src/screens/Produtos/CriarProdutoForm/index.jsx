import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Api from "../../../services/api";
import {
    Typography, Box, Button, TextField,
    LinearProgress, Input, Alert
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
        .required('Insira o preço'),
});

const CriarProdutoForm = () => {

    const [estoque, setEstoque] = useState(1)
    const [loading, setLoadinng] = useState(false)
    const [image, setImage] = useState(null)
    const [hasImage, setHasImage] = useState(false);


    const [noImage, setNoImage] = useState(false);

    console.log(image);
    const navigate = useNavigate();
    const theme = createTheme();

    const handleSubmit = async (e) => {
        const produto = { ...e, estoque }
        console.log("e, ", image);

        if (image == null) {
            setHasImage(false)
            setNoImage(true)

            return;
        }

        setNoImage(false)
        setLoadinng(true)
        const formData = new FormData()
        try {
            const { path } = await Api.uploadImage(formData)

            console.log(path);
            const response = await Api.createProdut({ ...produto, path });

            navigate(`/produto/${response.id}`)
        } catch (error) {
        }
        finally {
            setLoadinng(false)
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
            <Box sx={{ width: '400px' }} component="form" onSubmit={formik.handleSubmit}>
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
                <br /><br />
                {noImage && (<Alert severity="warning">Selecione uma imagem</Alert>)}

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
                    Cadastrar
                </Button>
            </Box>
        </ThemeProvider >
    )
}

export default CriarProdutoForm
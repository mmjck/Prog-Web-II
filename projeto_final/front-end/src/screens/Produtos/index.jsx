import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Api from "../../services/api";
import CardProduto from "../../components/Produto";


import {
    Typography, Box, Button,
    ButtonGroup,
    TextField,
    Snackbar, Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../redux/actions/cartActions";




const Products = () => {
    const [produtos, setProdutos] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [searchProdutos, setSearchProdutos] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const navigate = useNavigate();
    const theme = createTheme();

    const getProducts = useCallback(
        async () => {
            try {
                const response = await Api.getProducts();
                setProdutos(response);
                console.log({ response });
            } catch (error) {
                console.log(error);
            }
        },
        []
    );

    useEffect(() => {
        getProducts();

    }, [getProducts]);

    useEffect(() => {
        setSearchProdutos(produtos.filter(prod => prod.nome.toLowerCase().includes(searchString.toLowerCase())))
    }, [produtos, searchString])


    const dispatch = useDispatch();



    return (
        <ThemeProvider
            theme={theme}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}>
                <Typography variant="h3" >Listagem de Produtos</Typography>
                <ButtonGroup
                    variant="outlined"
                    aria-label="Disabled elevation buttons"
                >
                    <Button onClick={() => {
                        navigate("/produto/add")
                    }}
                    >

                        <Typography variant="p" >Adicionar Produtos</Typography>

                    </Button >
                    <Button onClick={() => {
                        navigate("/colaboradores/")
                    }}
                    >
                        <Typography variant="p" >Colaborador</Typography>
                    </Button>
                </ButtonGroup>

            </Box>


            <TextField
                label="Procure por um produto"

                fullWidth onChange={(e) => setSearchString(e.target.value)} type="text" value={searchString} />
            <div class="row row-cols-1 row-cols-md-5">

                {searchString === '' && produtos.map(produto => <div className="row" key={produto.id}>
                    <CardProduto produto={produto} addCart={(total) => {
                        if (total > 0) {
                            dispatch(addProductToCart(produto, total));
                            handleClick()

                            dispatch(addProductToCart(produto, total));
                            handleClick()
                        }
                    }} />

                </div>)}
            </div>
            <div class="card-group">

                {searchString !== '' && searchProdutos.map(produto => <div className="row" key={produto.id}>

                    <CardProduto produto={produto} addCart={(total) => {

                        if (total > 0) {
                            dispatch(addProductToCart(produto, total));
                            handleClick()
                        }
                    }} />
                </div>)}
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>

        </ThemeProvider >

    )
}
export default Products
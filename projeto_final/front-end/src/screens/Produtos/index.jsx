import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Api from "../../services/api";
import CardProduto from "../../components/Produto";


import {
    CardHeader, CardContent, CardActions, Card,
    LinearProgress,
    Typography, Box, Button,
    Divider,
    List, ListItem,
    ListItemText,
    Paper, ListItemAvatar,
    Avatar,
    IconButton,
    ButtonGroup,
    TextField,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom"


const Products = () => {
    const [produtos, setProdutos] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [searchProdutos, setSearchProdutos] = useState([]);

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
                    <CardProduto produto={produto} />

                </div>)}
            </div>
            <div class="card-group">

                {searchString !== '' && searchProdutos.map(produto => <div className="row" key={produto.id}>

                    <CardProduto produto={produto} />
                </div>)}
            </div>


        </ThemeProvider >

    )
}
export default Products
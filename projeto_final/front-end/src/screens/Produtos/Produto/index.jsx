import { useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../../services/api";
import {
    LinearProgress,
    Typography, Box, Button,
    Divider,
    ButtonGroup, Snackbar, Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux";
import { Delete, Edit, AddShoppingCart } from '@mui/icons-material'
import Contador from "../../../components/Contador";
import DialogDelete from "../../../components/DialogDelete";
import { Done } from '@mui/icons-material/';
import { addProductToCart } from "../../../redux/slices/cartSlices";
import Config from "../../../config/services";


const Produto = () => {
    const navigate = useNavigate();
    const theme = createTheme();

    const [produto, setProduto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ammount, setAmmount] = useState(1);
    const [totalValue, setTotalValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(false)

    const [addedCart, setAddedCart] = useState(false);
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { id } = useParams();


    const handleClickCart = () => {
        setAddedCart(true);
    };


    const handleCloseCart = () => {
        setAddedCart(false);
    };


    const cart = useSelector((state) => {
        return state?.shopingCart.cart
    });


    useEffect(() => {
        if (cart.length > 0) {
            const finded = cart.find(item => item.id === parseInt(id))
            if (finded) {
                setIsAdd(true)
            }
        }

    }, [produto?.id, cart, id])

    const getProduct = useCallback(
        async () => {
            setLoading(true)
            try {
                const response = await Api.getProductById(id);
                setProduto(response);
                console.log({ response });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)

            }
        },
        [id]
    );
    useEffect(() => {
        getProduct();


    }, [getProduct]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (produto) {
            let v = ammount * produto?.preco
            setTotalValue(v.toFixed(2))

        }
    }, [ammount, produto]);


    const handleEdit = () => {
        navigate(`/produto/${id}/edit`)
    }
    const handleDelete = async () => {
        try {
            await Api.deleteProdut(id)
            handleClose()
            navigate(`/`)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <ThemeProvider
            theme={theme}>
            {loading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )}
            <Box
                component="img"
                sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                }}
                alt="The house from the offer."
                src={`${Config.baseUrl}/files/${produto?.imageUrl}`}
            />
            {userData?.user?.tipoUsuarioId === 2 && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                }}>
                    <ButtonGroup
                        variant="text"
                        disableElevation
                        aria-label="Disabled elevation buttons"
                    >
                        <Button onClick={handleEdit}
                        >
                            <Edit />

                        </Button >
                        <Button onClick={handleClickOpen}>
                            <Delete color="red" />
                        </Button>
                    </ButtonGroup>

                </Box>
            )}
            <Box sx={{
                display: 'flex',
                flexDirection: "row",
                justifyContent: 'space-between',
                p: 1,
                m: 1,
                borderRadius: 1,
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: 'space-between',
                    height: 300,
                    p: 1,
                    m: 1,
                }}>

                    <Typography variant="h3" >{produto?.nome}</Typography>
                    <Typography variant="p" >{produto?.descricao}</Typography>
                    <Typography variant="h4" >Preço:  R$ {produto?.preco}</Typography>


                </Box>
                <Divider orientation="vertical" fullH />
                <Box sx={{
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: 'flex-end',
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                }}>
                    <Typography variant="p" >Valor: </Typography>
                    <Typography variant="h3" >R$ {totalValue}</Typography>
                    <Contador value={ammount} increment={() => {
                        setAmmount(ammount + 1)
                    }}
                        decrement={() => {
                            setAmmount(ammount - 1)
                        }} />
                </Box>
            </Box>
            {!isAdd ? (
                <Button
                    startIcon={<AddShoppingCart />}
                    variant="contained"
                    color="success"
                    onClick={() => {
                        if (ammount > 0) {
                            const quantity = ammount;
                            console.log(produto);
                            dispatch(addProductToCart(produto, quantity));
                            handleClickCart();
                        }
                    }}
                >
                    Adicionar item ao carrinho

                </Button>
            ) : (
                <Box sx={{
                    alignSelf: "center",
                    display: "flex", alignItems: "center",
                    flexDirection: "row",
                    color: "green", justifyContent: "center"
                }}>

                    <Done />
                    <Typography component="h4" sx={{ mx: 1, fontSize: 12, color: "green" }}  >
                        Produto adicinado ao carrinho
                    </Typography>
                </Box>
            )}

            {addedCart && (
                <Snackbar open={addedCart} autoHideDuration={6000} onClose={handleCloseCart}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Produto adicionado ao carrinho
                    </Alert>
                </Snackbar>
            )}
            <DialogDelete
                isOpen={open}
                onClose={handleClose}
                onConfirm={handleDelete}
                title="Deseja deletar este produto"
                message="Ao confirmar, não será possível reverter essa ação"
            />

        </ThemeProvider >
    )
}

export default Produto
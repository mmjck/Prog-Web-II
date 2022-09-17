import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
    Typography,
    Box,
    List,
    ListItem,
    Button,
    Paper, Divider, ListItemAvatar, Avatar
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { Delete, SentimentDissatisfied } from '@mui/icons-material'
import Config from "../../../config/services";
import { clearCart } from "../../../redux/slices/cartSlices";
import DialogDelete from "../../../components/DialogDelete";




const Carrinho = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = createTheme();


    const shopingCart = useSelector((state) => {
        return state?.shopingCart
    });


    const userData = useSelector((state) => {
        console.log(state);
        return state?.user
    });



    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)

    }

    const listProductsCart = () => {
        return (
            <List sx={{ bgcolor: 'background.paper' }}>
                {shopingCart.cart.map((element, index) => {
                    return (
                        <ListItem alignItems="flex-start" key={element.id.toString()}>
                            <Paper sx={{
                                flexDirection: "row",
                                display: "flex",
                                p: 2,
                                justifyContent: "space-between",
                                width: 700,
                            }}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={`${Config.baseUrl}/files/${element?.imageUrl}`} />
                                </ListItemAvatar>
                                <Box sx={{
                                    width: 400,
                                }}>
                                    <Typography > {element.nome}</Typography>
                                    <Typography> {element.descricao}</Typography>

                                </Box>

                                <Box sx={{
                                    flexDirection: "row",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>

                                    <Button variant="contained" color="error" onClick={() => {

                                    }}>
                                        -
                                    </Button >
                                    <Typography sx={{ px: 1 }}> {element.quantity}</Typography>

                                    <Button variant="contained" color="success">
                                        +
                                    </Button>

                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}>
                                    <Typography > R$ {element.preco}</Typography>

                                </Box>
                            </Paper>

                        </ListItem>
                    );
                })}
            </List>
        )
    }


    const handleClean = () => {
        dispatch(clearCart());
    }

    const emptyCart = () => {
        return (
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100%"
            }}>
                <Typography> Você não possui nada adicionado no carrinho</Typography>
                <SentimentDissatisfied />
            </Box>
        )
    }

    const handleSubmit = () => {
        if (userData) {
            if (userData.isLogged === false) {
                return navigate("/login")
            }
            return navigate("/cart/address")
        }
    }


    if (shopingCart.cart.length === 0) {
        return (
            <ThemeProvider
                theme={theme}>
                {emptyCart()}
            </ThemeProvider>
        )
    }


    return (
        <ThemeProvider
            theme={theme}>


            <Typography variant="h4" >MEU CARRINHO</Typography>
            <Divider sx={{ borderBottomWidth: 5 }} />


            <Box>
                <Button color="error" sx={{ display: "flex", alignSelf: "flex-end" }} onClick={handleOpen}>
                    <Box sx={{ flexDirection: "row", display: "flex" }}>
                        <Typography variant="p" >Limpar carrinho</Typography>
                        <Delete />
                    </Box>

                </Button >
            </Box>



            <Box sx={{ flexDirection: "row", display: "flex" }}>
                {listProductsCart()}

                <Divider sx={{ borderWidth: 5 }} orientation="vertical" flexItem />
                <Box sx={{ p: 1, display: "flex", flexDirection: "column" }}>
                    <Box>
                        <Typography variant="h5" >Resumo da compra</Typography>
                        <br /><br />
                        <Typography variant="h6">Total</Typography>
                        <Typography variant="h4">R$ {shopingCart.totalValue}</Typography>

                    </Box>
                    <br />
                    <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>
                        <Box sx={{ flexDirection: "row", display: "flex" }} >
                            <Typography variant="p" >Concluir Compra</Typography>
                        </Box>

                    </Button >
                </Box>
            </Box>
            <Divider sx={{ borderBottomWidth: 5 }} />

            <DialogDelete
                isOpen={open}
                onClose={handleClose}
                onConfirm={handleClean}
                title={"Deseja limpar o carrinho?"}
                message={"Ao confirmar, não será possível reverter essa ação"}
            />
        </ThemeProvider >
    )
}
export default Carrinho
import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"

import {
    Typography,
    Box,
    List,
    ListItem,
    Button,
    Paper, Divider
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { Delete, Add, SentimentDissatisfied } from '@mui/icons-material'
import AddressFormDialog from "../../../components/AddressForm";


const Carrinho = () => {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);


    const navigate = useNavigate();
    const theme = createTheme();


    const shopingCart = useSelector((state) => {
        return state?.shopingCart
    });


    const userData = useSelector((state) => {
        console.log(state);
        return state?.user
    });



    const updateCart = (produto) => {

    }

    const listProductsCart = () => {
        return (
            <List sx={{ bgcolor: 'background.paper' }}>
                {shopingCart.cart.map((element, index) => {
                    console.log(element);
                    return (
                        <ListItem alignItems="flex-start" key={element.id.toString()}>
                            <Paper sx={{
                                flexDirection: "row",
                                display: "flex",
                                p: 2,
                                justifyContent: "space-between",
                                width: 700,
                            }}>
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

                                    <Button variant="contained" color="error">
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
        console.log("entroiu");

        console.log(userData);
        if (userData) {
            if (userData.isLogged === false) {
                return navigate("/login")
            }


            return navigate("/cart/address", { f: {} })
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
                <Button color="error" sx={{ display: "flex", alignSelf: "flex-end" }}>
                    <Box sx={{ flexDirection: "row", display: "flex" }}>
                        <Typography variant="p" >Limpar carrinho</Typography>
                        <Delete />
                    </Box>

                </Button >
            </Box>



            <Box
                sx={{ flexDirection: "row", display: "flex" }}>

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

            {/* <Box
                sx={{ flexDirection: "row", display: "flex" }}>
                <Box sx={{ p: 1 }}>
                    <Typography variant="p" > Enviar para: </Typography>

                    <Box sx={{ p: 1 }}>
                        {shopingCart?.address != null ? (
                            dataAddress()
                        ) : (
                            <Button color="success" sx={{ display: "flex", alignSelf: "flex-end" }}
                                onClick={() => handleClickOpen()}>
                                <Box sx={{ flexDirection: "row", display: "flex" }}>
                                    <Typography variant="p" >Adicionar Endereço</Typography>
                                    <Add />
                                </Box>

                            </Button >
                        )}
                    </Box>
                </Box>
            </Box> */}
            {/* <AddressFormDialog
                isOpen={open}
                onClose={handleClose}
                title="Adicionar endereço"
                message="Insira os dados para adicionar um novo endereço"
                data={data}
                onConfirm={() => { }}
            /> */}


        </ThemeProvider>
    )
}
export default Carrinho
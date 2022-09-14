import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Api from "../../../services/api";
import {
    Typography,
    Box,
    List,
    ListItem,
    Button,
    Paper,
    Divider,
    ListItemAvatar,
    Avatar,
    Alert,
    AlertTitle
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { Add, SentimentDissatisfied, House } from '@mui/icons-material'
import AddressFormDialog from "../../../components/AddressForm";

const AddressCart = () => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const [selected, setSelected] = useState(null);


    const shopingCart = useSelector((state) => {
        return state?.shopingCart
    });


    const userData = useSelector((state) => {
        return state?.user
    });

    const handleChange = (value) => {
        setSelected(value);
    };



    const navigate = useNavigate();

    const theme = createTheme();

    console.log(shopingCart, userData);



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleAddAddress = async (values) => {
        setLoading(true)
        setError(false)


        try {
            const response = await Api.createAddress(userData.user.id, values)
            console.log("response", response.address);

            const newUserData = { ...userData.user, enderecos: [...userData.user.enderecos, response.address] }
            console.log("response", newUserData);

            handleClose()
        } catch (error) {
            console.log(error);
            setError(true)
            setErrorMessage("Tente novamente")
        } finally {
            setLoading(false)

        }
    }




    const handleSubmit = async () => {
        console.log(shopingCart);
        const { address, cart } = shopingCart

        setError(false)

        if (selected == null) {
            return
        }
        console.log(selected);
        const data = {
            products: [...cart],
            date_order: new Date(),
            address,

        }
        // try {
        //     await Api.createOrder(userData.user.id, data)
        //     navigate("/")
        // } catch (error) {

        //     if (error.statusCode) {
        //         console.log(error);
        //         setError(true)
        //         setErrorMessage("Tente novamente")
        //     }
        // } finally {
        //     setLoading(false)
        // }

    }

    const listAddress = () => {

        return <List sx={{ width: '100%', }}>
            {
                userData.user.enderecos?.map((element, index) => {
                    let styles = { marginTop: 1, width: "100%", };
                    if (selected && selected.id === element.id) {
                        styles.backgroundColor = "#6496c8"
                    }
                    return <Paper elevation={3} sx={styles} key={index}>
                        <Button fullWidth onClick={() => handleChange(element)}>

                            <ListItem alignItems="flex-start" key={index} sx={{ color: "black" }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <House />
                                    </Avatar>
                                </ListItemAvatar>
                                <Box >
                                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                                        <Typography sx={{ paddingRight: 1 }}>
                                            {element.logradouro} -
                                        </Typography>
                                        <Typography>
                                            {element.numero}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                                        <Typography sx={{ paddingRight: 1 }}>
                                            {element.cidade}
                                        </Typography>
                                        <Typography sx={{ paddingRight: 1 }}>
                                            {element.bairro}
                                        </Typography>
                                        <Typography >

                                            {element.uf}
                                        </Typography>

                                    </Box>

                                </Box>
                            </ListItem>
                        </Button>
                    </Paper>

                })
            }
        </List >
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
                <Typography> Você não possui endereço cadastrado</Typography>
                <SentimentDissatisfied />
            </Box>
        )
    }

    if (userData.user.enderecos == null || userData.user.enderecos.length === 0) {
        return (
            <ThemeProvider
                theme={theme}>
                {emptyCart()}
                <Box
                    sx={{ flexDirection: "row", display: "flex" }}>
                    <Box sx={{ p: 1 }}>

                        <Box sx={{ p: 1 }}>

                            <Button color="success" sx={{ display: "flex", alignSelf: "flex-end" }}
                                onClick={() => handleClickOpen()}>
                                <Box sx={{ flexDirection: "row", display: "flex" }}>
                                    <Typography variant="p" >Adicionar Endereço</Typography>
                                    <Add />
                                </Box>

                            </Button >
                        </Box>
                    </Box>
                </Box>
                <AddressFormDialog
                    isOpen={open}
                    onClose={handleClose}
                    title="Adicionar endereço"
                    message="Insira os dados para adicionar um novo endereço"
                    loading={loading}
                    onConfirm={(data) => handleAddAddress(data)}
                />
            </ThemeProvider>

        )
    }


    return (
        <ThemeProvider
            theme={theme}>
            <Typography variant="h5" >Selecione um endereço para entrega</Typography>
            <Divider sx={{ borderBottomWidth: 5 }} />
            {listAddress()}
            <Box
                sx={{ flexDirection: "row", display: "flex" }}>
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
            {error && (
                <Alert severity="error">
                    <AlertTitle>Erro</AlertTitle>
                    {errorMessage ?? "Um erro ocorreu"}.   <strong> Tente novamente</strong>
                </Alert>
            )}
            <Divider sx={{ borderBottomWidth: 5 }} />
        </ThemeProvider >
    )
}
export default AddressCart
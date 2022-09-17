import {
    CardHeader, CardContent, Card,
    Typography, Box, Button,
    Divider,
    CardMedia
} from '@mui/material';
import { Link } from "react-router-dom"
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useEffect } from 'react';

import { Done } from '@mui/icons-material/';
import Config from '../../config/services';
const styles = {
    root: {
        borderRadius: 5,
        textAlign: 'center',
        margin: 1,
    },
    header: {
        textAlign: 'center',
        spacing: 10,
    },

    button: {
        margin: 10,
    },
    action: {
        alignContent: "center",
        justifyContent: "center",
        display: 'flex',
    },
};


const CardProduto = ({ produto, addCart }) => {
    const { id, nome, descricao, preco, imageUrl } = produto;
    const [total, setTotal] = useState(1)
    const [isAdd, setIsAdd] = useState(false)

    const cart = useSelector((state) => {
        return state?.shopingCart.cart
    });

    useEffect(() => {
        const finded = cart.find(item => item.id === produto.id)
        if (finded) {
            setIsAdd(true)
        }
    }, [produto.id, cart])

    const contador = () => {
        return (
            <Box sx={{
                display: "flex", alignItems: "flex-start", flexDirection: "column"
            }}>
                {!isAdd && (

                    <Box sx={{
                        display: "flex", justifyContent: "center", flexDirection: "row"
                    }}>
                        <Button variant="contained" onClick={
                            () => {
                                if (total > 0) {
                                    setTotal(total - 1)
                                }
                            }}>
                            -
                        </Button>
                        <Typography sx={{ paddingX: 1, alignSelf: "center" }}>{total}</Typography>
                        <Button variant="contained"
                            onClick={
                                () => {
                                    setTotal(total + 1)
                                }}>
                            +
                        </Button>
                    </Box>

                )}
                {!isAdd ? (
                    <Button variant="outlined"
                        sx={{
                            marginTop: 2
                        }}
                        color="success"
                        onClick={() => addCart(total)}>
                        <Typography component="p" sx={{ fontSize: 12 }}  >
                            Adicionar ao carrinho
                        </Typography>
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
                )
                }
            </Box >
        )
    }

    return (
        <Card sx={styles.root} variant="outlined" >
            <CardContent>

                <CardHeader title={nome} sx={styles.header} />
                <CardMedia component="img" image={`${Config.baseUrl}/files/${imageUrl}`} />
                <Divider variant="middle" />
                <CardContent>
                    <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
                        R$ {preco}
                    </Typography>
                    <Box sx={{
                        marginTop: 5,
                        height: 50,
                        overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                        <Typography nowrap="true" variant="p" align="center" sx={{
                            overflow: "hidden", textOverflow: "ellipsis",
                            textAlign: "justify"
                        }}>
                            {descricao}
                        </Typography>
                    </Box>
                </CardContent>
                <Divider variant="middle" />
                <Button variant="text" color="primary" style={styles.button}>
                    <Link sx="btn btn-primary" to={`/produto/${id}`}>Ver mais</Link>
                </Button>
                {contador()}
            </CardContent>
        </Card >

    )

}

export default CardProduto;
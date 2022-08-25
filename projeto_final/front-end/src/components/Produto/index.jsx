import {
    CardHeader, CardContent, Card,
    Typography, Box, Button,
    Divider,
    CardActionArea
} from '@mui/material';
import { Link } from "react-router-dom"
import { useState } from 'react';

import { useNavigate } from "react-router-dom"


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


const CardProduto = ({ produto }) => {
    const { id, nome, descricao, preco } = produto;
    const [total, setTotal] = useState(0)


    const navigate = useNavigate();

    const contador = () => {
        return (
            <Box sx={{
                display: "flex", alignItems: "flex-start", flexDirection: "column"
            }}>
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


                <Button variant="outlined"
                    sx={{
                        marginTop: 2

                    }}
                    color="success"
                    onClick={() => { }}>
                    <Typography component="p" sx={{ fontSize: 12 }} >
                        Adicionar ao carrinho
                    </Typography>
                </Button>
            </Box >
        )
    }

    // onclick={() => {
    //     // navigate(`/produto/${id}`)
    // }}
    return (
        <Card sx={styles.root} >
            <CardContent>
                <CardHeader title={nome} sx={styles.header} />
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
                        <Typography nowrap variant="p" align="center" sx={{
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
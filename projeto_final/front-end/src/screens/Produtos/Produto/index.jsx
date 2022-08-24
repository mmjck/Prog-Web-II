import { useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../../services/api";
import {
    LinearProgress,
    Typography, Box, Button,
    Divider,

    ButtonGroup
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Delete, Edit, AddShoppingCart } from '@mui/icons-material'

import Contador from "../../../components/Contador";
import DialogDelete from "../../../components/DialogDelete";


const Produto = () => {
    const navigate = useNavigate();
    const theme = createTheme();

    const [produto, setProduto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ammount, setAmmount] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [open, setOpen] = useState(false);

    const { id } = useParams();
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
        console.log(id);
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
                    <Typography variant="h4" >R$ {produto?.preco}</Typography>


                </Box>
                <Divider orientation="vertical" />
                <Box sx={{
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: 'flex-end',
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                }}>                    <Typography variant="p" >Valor: </Typography>

                    <Typography variant="h3" >R$ {totalValue}</Typography>

                    <Contador value={ammount} increment={() => {
                        setAmmount(ammount + 1)
                    }}
                        decrement={() => {
                            setAmmount(ammount - 1)
                        }} />
                </Box>
            </Box>
            <Button
                startIcon={<AddShoppingCart />}
                variant="contained"
                color="success"
            >
                Adicionar item ao carrinho

            </Button>
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
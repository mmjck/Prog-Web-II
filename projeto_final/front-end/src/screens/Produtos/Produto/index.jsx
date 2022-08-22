import { useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../../services/api";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import {
    LinearProgress,
    Typography, Box, Button,
    Divider,
    List, ListItem,
    ListItemText,
    Paper, ListItemAvatar,
    Avatar,
    IconButton,
    ButtonGroup
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Container } from "@mui/system";


const Produto = () => {
    const navigate = useNavigate();
    const theme = createTheme();

    const [produto, setProduto] = useState({});
    const { id } = useParams();
    const getProducts = useCallback(
        async () => {
            try {
                const response = await Api.getProductById(id);
                setProduto(response);
                console.log({ response });
            } catch (error) {
                console.log(error);
            }
        },
        [id]
    );
    useEffect(() => {
        getProducts();

    }, [getProducts]);


    const handleEdit = () => {
        navigate(`/produto/${id}/edit`)
    }
    const handleDelete = async () => {
        try {
            await Api.deleteProdut(id)
            navigate(`/`)
        } catch (error) {
        }
    }
    return (
        <ThemeProvider
            theme={theme}>
            <Container>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}>
                    <Typography variant="h3" >{produto.nome}</Typography>
                    <ButtonGroup
                        variant="text"
                        disableElevation
                        aria-label="Disabled elevation buttons"
                    >
                        <Button onClick={handleEdit}
                        >
                            <EditIcon />

                        </Button >
                        <Button onClick={handleDelete}
                        >
                            <DeleteIcon color="red" />
                        </Button>
                    </ButtonGroup>

                </Box>
                <p>{produto.descricao}</p>
            </Container>
        </ThemeProvider >
    )
}

export default Produto
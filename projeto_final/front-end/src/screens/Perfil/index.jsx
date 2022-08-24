import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import React from 'react';
import Api from "../../services/api";

import {
    LinearProgress,
    Typography, Box, Button,
    List, ListItem,
    Paper, ListItemAvatar,
    Avatar,
    ButtonGroup
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCallback } from "react";
import ImageIcon from '@mui/icons-material/House';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DialogDelete from "../../components/DialogDelete";
import AddressFormDialog from "../../components/AddressForm";


const Perfil = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [data, setData] = React.useState(false);

    const [openAddress, setOpenAddress] = useState(false);

    const navigate = useNavigate();
    const theme = createTheme();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const handleClickOpenAddressDialog = (data) => {

        setData(data)
        console.log(data);
        setOpenAddress(true);
    };

    const handleCloseAddressDialog = () => {
        setOpenAddress(false);
    };




    const handleDelete = async () => {
        setLoading(true)
        try {

            handleClose()

        } catch (error) {

        }
        finally {
            setLoading(false)
        }
    }

    const getUser = useCallback(async () => {
        setLoading(true)
        try {
            const response = await Api.getUser(37)
            console.log(response);
            setUser(response)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getUser()
    }, [getUser])


    const listAddress = (address) => {
        return <List sx={{ width: '100%', }}>
            {
                address.map((element, index) => {
                    return <Paper elevation={2} sx={{ marginTop: 1 }} key={index}>
                        <ListItem alignItems="flex-start" key={index}

                            secondaryAction={
                                <ButtonGroup
                                    variant="text"
                                    disableElevation
                                    aria-label="Disabled elevation buttons"
                                >
                                    <Button>
                                        <EditIcon onClick={() => handleClickOpenAddressDialog(element)} />

                                    </Button>
                                    <Button onClick={handleClickOpen}>
                                        <DeleteIcon color="red" />
                                    </Button>
                                </ButtonGroup>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
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
                    </Paper>
                })
            }
        </List >
    }

    if (loading) {
        return (
            <ThemeProvider
                theme={theme}>
                {loading && (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                )}


            </ThemeProvider>);
    }

    return (
        <ThemeProvider
            theme={theme}>
            {loading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )}
            <Box sx={{ marginBottom: 5 }}>
                <Typography variant="h5">
                    Dados pessoais
                </Typography>
                <Typography>
                    Nome: {user.nome}
                </Typography>
                <Typography>
                    Email: {user.email}
                </Typography>
            </Box>

            <Box>
                <Typography variant="h5">
                    Endereços cadastrados
                </Typography>
                {listAddress
                    (user.Enderecos
                    )}
            </Box>


            <DialogDelete
                isOpen={open}
                close={handleClose}
                confirm={handleDelete}
                title={"Deseja deletar esse endereço"}
                message={"Ao confirmar, não será possível reverter essa ação"}
            />

            <AddressFormDialog
                isOpen={openAddress}
                onClose={handleCloseAddressDialog}
                title="Adicionar novo endereço"
                message="Insira os dados para adicionar um novo endereço"
                data={data}
            />


        </ThemeProvider>);
}

export default Perfil;
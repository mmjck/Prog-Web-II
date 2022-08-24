import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import React from 'react';
import Api from "../../services/api";

import {
    LinearProgress,
    Typography, Box, Button,
    Divider,
    List, ListItem,
    ListItemText,
    Paper, ListItemAvatar,
    Avatar,
    ButtonGroup
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCallback } from "react";
import ImageIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DialogDelete from "../../components/DialogDelete";


const Colaboradores = () => {
    const [loading, setLoading] = useState(false)
    const [listCollaborators, setListCollaborators] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);

    const navigate = useNavigate();

    const getCollaborators = useCallback(async () => {
        setLoading(true)
        try {
            const response = await Api.getCollaboratos(37)
            console.log(response);
            setListCollaborators(response)
            setLoading(true)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }, [])


    useEffect(() => {
        getCollaborators()
    }, [getCollaborators])

    const theme = createTheme();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = async () => {
        setLoading(true)
        try {

            await Api.deleteUser(id)
            setListCollaborators(listCollaborators.filter(element => element.id !== id))
            setId(null)
            handleClose()

        } catch (error) {

        }
        finally {
            setLoading(false)
        }
    }

    const handleListCollaborators = () => {
        return <List sx={{ width: '100%', }}>
            {
                listCollaborators.map((element, index) => {
                    return <Paper elevation={2} sx={{ marginTop: 1 }}>
                        <ListItem alignItems="flex-start" key={index}

                            secondaryAction={
                                <ButtonGroup
                                    variant="text"
                                    disableElevation
                                    aria-label="Disabled elevation buttons"
                                >
                                    <Button>
                                        <EditIcon />

                                    </Button>
                                    <Button onClick={() => {
                                        setId(element.id);
                                        handleClickOpen();
                                    }}>
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
                            <ListItemText

                                primary={`Nome: ${element.nome}`}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {`Email: ${element.email}`}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>

                    </Paper>
                })
            }

        </List >


    }

    return (
        <ThemeProvider
            theme={theme}>
            {loading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )}
            <Box sx={{ heigth: 40 }} />


            <Button variant="contained"
                onClick={() => {
                    navigate("/colaboradores/adicionar")
                }}
            >  Adicionar novo colaborador</Button>

            <Divider light />
            <Box sx={{ heigth: 40 }} />

            <Typography component="h1" variant="h5">
                Lista de colaboradores
            </Typography>
            <Box sx={{ heigth: 40 }} />

            {handleListCollaborators()}

            <DialogDelete
                isOpen={open}
                onClose={handleClose}
                onConfirm={handleDelete}
                title={"Deseja deletar esse colaborador"}
                message={"Ao confirmar, não será possível reverter essa ação"}
            />

        </ThemeProvider >
    );

}


export default Colaboradores;

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import {
    AppBar,
    Toolbar,
    Typography,
    Button, IconButton, Container, Box,
} from "@mui/material";
import ImageIcon from '@mui/icons-material/AccountCircle';
import AdbIcon from '@mui/icons-material/Adb';
import { logout } from '../../redux/slices/userSlices'


const Header = () => {
    const [logged, setLogged] = useState(false)

    const UserData = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        if (UserData) {
            setLogged(UserData.isLogged)

        }
    }, [UserData])


    const handleLogout = async () => {
        console.log('carai bou');
        dispatch(logout())
        navigate("/")
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Minha loja
                    </Typography>


                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Button
                            onClick={() => {
                                navigate("/sobre")

                            }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Sobre
                        </Button>
                        <Button
                            onClick={() => {
                                navigate("/cart")

                            }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Carrinho
                        </Button>
                        {!logged && <Button
                            onClick={() => {
                                navigate("/login")

                            }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Login
                        </Button>
                        }

                        {!logged && <Button
                            onClick={() => {
                                navigate("/signup")

                            }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Cadastro
                        </Button>
                        }
                        {logged && <Button
                            onClick={() => {
                                handleLogout()
                            }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Sair
                        </Button>
                        }
                    </Box>
                    <Box sx={{ display: 'block' }} />

                    {logged &&
                        <IconButton aria-label="delete" size="large"
                            {...{
                                color: "inherit",
                                to: "/perfil",
                                component: Link,
                            }}>
                            <ImageIcon fontSize="inherit" />
                        </IconButton>
                    }
                </Toolbar>
            </Container>
        </AppBar >
    );

}


export default Header;
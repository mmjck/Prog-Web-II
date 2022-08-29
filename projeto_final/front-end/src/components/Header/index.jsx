import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button, IconButton
} from "@mui/material";

import ImageIcon from '@mui/icons-material/AccountCircle';

const styles = {
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
};



const Header = () => {
    const [logged, setLogged] = useState(false)

    const user = useSelector((state) => state.userData);


    useEffect(() => {
        if (user) {
            setLogged(user.isLogged)

        }
    }, [user])


    const buttonHeader = (label, href) => {
        return (
            <Button
                style={styles.menuButton}
                {...{
                    key: label,
                    color: "inherit",
                    to: href,
                    component: Link,
                }}
            >
                {label}
            </Button>
        )

    }

    const getMenuButtons = () => {
        return (
            <div>
                {buttonHeader("Sobre", "/sobre")}
                {buttonHeader("Carrinho", "/cart")}
                {!logged && buttonHeader("Login", "/login")}
                {!logged && buttonHeader("Cadastro", "/signup")}
                {!logged && buttonHeader("Sair", "/logout")}

                {!logged && (
                    <IconButton aria-label="delete" size="large"
                        {...{
                            color: "inherit",
                            to: "/perfil",
                            component: Link,
                        }}>
                        <ImageIcon fontSize="inherit" />
                    </IconButton>
                )}
            </div>
        )
    }

    const { header } = styles;

    return (
        <AppBar style={header} position="relative">
            <Toolbar style={styles.toolbar}>
                <Typography
                    component="a"
                    href="/"
                    sx={{
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>
                    Minha loja
                </Typography>
                <div>{getMenuButtons()}</div>

            </Toolbar>
        </AppBar>);

}


export default Header;
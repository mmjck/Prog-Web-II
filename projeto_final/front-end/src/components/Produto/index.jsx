import {
    CardHeader, CardContent, CardActions, Card,
    LinearProgress,
    Typography, Box, Button,
    Divider,
    List, ListItem,
    ListItemText,
    Paper, ListItemAvatar,
    Avatar,
    IconButton,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom"



const styles = {
    root: {
        borderRadius: 5,
        textAlign: 'center',
        margin: 1,
        pading: 10
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
        //  justifyContent: 'space-around',
    },
};


const CardProduto = ({ produto }) => {
    const { id, nome, descricao, preco, estoque } = produto;
    return (
        <Card sx={styles.root}>
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
            <CardActions sx={styles.action}>
                <Button variant="text" color="primary" style={styles.button}>
                    <Link sx="btn btn-primary" to={`/produto/${id}`}>Ver mais</Link>
                </Button>

            </CardActions>
        </Card >
    )

}

export default CardProduto;
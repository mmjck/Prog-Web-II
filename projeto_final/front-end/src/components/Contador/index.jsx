
import {
    Typography, Button, Paper
} from '@mui/material';


const Contador = ({ increment, decrement, value }) => {
    return (

        <Paper sx={{
            justifyContent: "center",
            width: 300, display: "flex", flexDirection: "row", alignItems: "center"
        }}>
            <Button
                color="error"
                onClick={() => {
                    if (value > 1) {
                        decrement()

                    }
                }}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                -
            </Button>
            <Typography component="p" sx={{
                paddingX: 5,
            }}>
                {value}
            </Typography>
            <Button
                onClick={() => {
                    increment()

                }}
                color="success"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                +
            </Button>

        </Paper>
    )
}


export default Contador;
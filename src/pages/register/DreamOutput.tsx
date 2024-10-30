import { Box, Grid, Typography } from "@mui/material";
import DarkerStyledPaper from "../../components/common/StyledPaper";
import waitingGif from "../../../public/Creative writing.gif";

export const DreamOutput = () => {
    return (
        <Grid container spacing={4}>
            <Grid item xs={8}>
                <DarkerStyledPaper>
                    <Typography variant="h4">
                        Visualizar resultado
                    </Typography>
                </DarkerStyledPaper>
            </Grid>

            <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                    <img
                        src={waitingGif}
                        alt="Resultado"
                        width="500px"
                        style={{ borderRadius: 2 }}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}


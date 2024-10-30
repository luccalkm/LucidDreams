import { Grid, Typography } from '@mui/material';
import DreamsHomeCard from "./DreamsHomeCard";

export const Home = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h3">
                    Meus sonhos
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {[1, 2, 3, 4].map((item) => (
                        <DreamsHomeCard item={item} key={item} />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

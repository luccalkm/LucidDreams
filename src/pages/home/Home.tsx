import { Divider, Grid, Typography } from '@mui/material';
import DreamsHomeCard from "./DreamsHomeCard";
import { DreamHomeCardDTO } from "../../dtos/DreamHomeCardDTO";
import { dreamHomeCardData } from "../../context/seedData"

export const Home = () => {
    const sortedData = dreamHomeCardData
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">
                    Meus últimos registros
                </Typography>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {sortedData?.map((item: DreamHomeCardDTO) => (
                        <DreamsHomeCard 
                            item={item} 
                            key={item.id} 
                        />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

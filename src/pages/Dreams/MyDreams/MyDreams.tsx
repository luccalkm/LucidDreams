import React from "react";
import { Grid, Typography, Paper, CardMedia } from "@mui/material";
import { DreamHomeCardDTO } from "../../../dtos/DreamHomeCardDTO";
import { dreamHomeCardData } from "../../../context/seedData";

const defaultImage = "https://via.placeholder.com/150";

export const MyDreams = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                    Meus Sonhos
                </Typography>
            </Grid>

            {dreamHomeCardData.map((dream: DreamHomeCardDTO) => (
                <Grid item xs={12} sm={6} md={4} key={dream.id}>
                    <Paper
                        sx={{
                            padding: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="140"
                            image={dream.image || defaultImage}
                            alt={dream.title}
                            sx={{ marginBottom: 2 }}
                        />
                        <Typography variant="h5" gutterBottom>
                            {dream.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" paragraph>
                            {dream.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Data: {new Date(dream.date).toLocaleDateString()}
                        </Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

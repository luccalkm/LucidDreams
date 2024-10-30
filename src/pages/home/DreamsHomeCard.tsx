import { Button, ButtonGroup, Divider, Grid, Paper, Typography, useTheme } from "@mui/material";
import React from 'react';

type Props = {
    item: any;
};

export default function DreamsHomeCard({ item }: Props) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Grid item xs={3}>
            <Paper
                sx={{
                    backgroundColor: !isDarkMode ? "#fafafa" : "initial",
                    padding: 3
                }}
            >
                <Typography variant="h5">
                    title
                </Typography>
                <Divider variant="fullWidth" />
                <Typography
                    py={2}
                    variant="body2"
                    maxHeight={200}
                    sx={{ overflowY: 'auto' }}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita neque quaerat, perspiciatis itaque voluptate provident soluta voluptatum incidunt possimus ea!
                </Typography>
                <Grid container mt={2} gap={1.5} justifyContent={'flex-end'}>
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                    >
                        ESCONDER
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                    >
                        VER MAIS
                    </Button>
                </Grid>
            </Paper>
        </Grid>
    );
}

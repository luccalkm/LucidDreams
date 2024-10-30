import { Typography, Box, Link, Paper, Grid2, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import theme from '../../theme';

const Copyright = () => {
    return (
        <Box bgcolor={theme.palette.background.default} py={2} textAlign="center">
            <Typography variant="body2" color="white">
                {'Copyright © '}
                <Link color="inherit" href="#">
                    Lucid Dreams
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
};


const LoginLayout = () => {    
    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
            bgcolor={theme.palette.background.default}
        >
            <Grid2
                container
                flexDirection={'column'}
                margin={'auto'}
                sx={{minWidth: "30%", paddingBottom: 5, maxWidth: "40%"}}
                gap={3}
            >
                <Paper
                    elevation={1}
                    style={{padding: theme.spacing(4)}}
                >
                    <Outlet /> 
                </Paper>
            </Grid2>
            <Copyright />
        </Box>
    );
};

export default LoginLayout;

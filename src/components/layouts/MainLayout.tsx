import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, NavigationItem } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Box, Grid } from "@mui/material";
import theme from "../../theme";
import { AddAPhoto, CloudCircle } from "@mui/icons-material";
import { Outlet } from "react-router-dom";

const NAVIGATION: NavigationItem[] = [
    {
        segment: 'myDreams',
        title: 'Meus sonhos',
        icon: <DashboardIcon />,
    },
    // {
    //     segment: 'orders',
    //     title: 'Orders',
    //     icon: <ShoppingCartIcon />,
    // },
    // {
        // segment: 'reports',
        // title: 'Reports',
        // icon: <BarChartIcon />,
        // children: [
        //     {
        //         segment: 'sales',
        //         title: 'Sales',
        //         icon: <DescriptionIcon />,
        //     },
        //     {
        //         segment: 'traffic',
        //         title: 'Traffic',
        //         icon: <DescriptionIcon />,
        //     },
        // ],
    // },
    {
        segment: 'registerDream',
        title: 'Registrar novo sonho',
        icon: <LayersIcon />,
    },
];

const demoTheme = extendTheme({
    colorSchemeSelector: "class",
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});


const MainLayout: React.FC = () => {
    return (
        <AppProvider
            navigation={NAVIGATION}
            theme={demoTheme}
            branding={{
                logo: <></>,
                title: "Lucid Dreams",
            }}
        >
            <DashboardLayout>
                <Box 
                    sx={{
                        height: "100%",
                        padding: 6,
                        width: '100%'
                    }}
                >
                    <Outlet/>
                </Box>
            </DashboardLayout>
        </AppProvider>
    );
};

export default MainLayout;

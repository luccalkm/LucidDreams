import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, NavigationItem, Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { MyDreams } from "../../pages/Dreams/MyDreams/MyDreams";
import { useAuth } from "../../context/AuthContext";
import { getUserByUID } from "../../controllers/UserController";

const NAVIGATION: NavigationItem[] = [
    {
        segment: 'my/dream',
        title: 'Meus sonhos',
        icon: <AutoAwesomeIcon />,
    },
    {
        segment: 'register/dream',
        title: 'Registrar novo sonho',
        icon: <LayersIcon />,
    },
    /*
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
    */
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

const DEFAULT_SESSION = {
    name: '',
    email: '',
};

const MainLayout: React.FC = () => {
    const { logout, loginResponse } = useAuth();
    const navigate = useNavigate();

    const [session, setSession] = React.useState<Session | null>(null);
    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession({ user: DEFAULT_SESSION });
            },
            signOut: () => {
                handleLogout();
            },
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    React.useEffect(() => {
        const fetchUser = async () => {
            const response = await getUserByUID(loginResponse?.uid!);
            const data = {
                name: response.data?.name || "",
                email: response.data?.email || ""
            };
            setSession({user: data});
        };
        if (!session && loginResponse) fetchUser();
    }, [session, loginResponse]);

    return (
        <AppProvider
            navigation={NAVIGATION}
            theme={demoTheme}
            branding={{
                logo: <></>,
                title: "Lucid Dreams",
            }}
            authentication={authentication}
            session={session}
        >
            <DashboardLayout>
                <Box
                    sx={{
                        height: "100%",
                        padding: 6,
                        width: '100%'
                    }}
                >
                    <Outlet />
                </Box>
            </DashboardLayout>
        </AppProvider>
    );
};

export default MainLayout;

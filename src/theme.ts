import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles';
import { red, green, amber, blue as muiBlue } from '@mui/material/colors';

// Definir as cores primária e secundária
const primaryColor: string = '#8f69ff';
const secondaryColor: string = '#FF6B6B';

// Criação do tema tradicional do Material-UI
let theme: Theme = createTheme({
    palette: {
        primary: {
            main: primaryColor,
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: secondaryColor,
            contrastText: '#FFFFFF',
        },
        error: {
            main: red.A400,
        },
        success: {
            main: green.A400,
        },
        warning: {
            main: amber.A400,
        },
        info: {
            main: muiBlue.A400,
        },
        background: {
            default: '#2b3044',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1F2937',
            secondary: '#6B7280',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    backgroundColor: primaryColor,
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#7A55E6',
                    },
                },
                containedSecondary: {
                    backgroundColor: secondaryColor,
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#FF5656',
                    },
                },
            },
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;

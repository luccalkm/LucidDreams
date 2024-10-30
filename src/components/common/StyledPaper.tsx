import React from 'react';
import { Paper, useTheme } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : "#fafafa",
    padding: theme.spacing(3),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

type Props = {
    children: React.ReactNode;
    [key: string]: any;
};

const DarkerStyledPaper: React.FC<Props> = ({ children, ...props }) => {
    return (
        <StyledPaper {...props}>
            {children}
        </StyledPaper>
    );
};

export default DarkerStyledPaper;

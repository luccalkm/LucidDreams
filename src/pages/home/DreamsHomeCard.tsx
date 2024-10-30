import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Divider, Grid, Paper, Typography, useTheme, Tooltip } from "@mui/material";
import { DreamHomeCardDTO } from "../../dtos/DreamHomeCardDTO";
import DarkerStyledPaper from "../../components/common/StyledPaper";

type Props = {
    item: DreamHomeCardDTO;
};

export default function DreamsHomeCard({ item }: Props) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const titleRef = useRef<HTMLDivElement>(null);
    const [isOverflowed, setIsOverflowed] = useState(false);

    useEffect(() => {
        if (titleRef.current) {
            setIsOverflowed(titleRef.current.scrollWidth > titleRef.current.clientWidth);
        }
    }, [item.title]);

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <DarkerStyledPaper
                sx={{
                    backgroundColor: !isDarkMode ? "#fafafa" : theme.palette.background.paper,
                    padding: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Grid container direction="column">
                    <Grid item container justifyContent="space-between" alignItems="center">
                        <Tooltip title={isOverflowed ? item?.title : ''} disableHoverListener={!isOverflowed}>
                            <Typography 
                                variant="h5" 
                                gutterBottom
                                noWrap
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '14rem',
                                }}
                                ref={titleRef}
                            >
                                {item?.title}
                            </Typography>
                        </Tooltip>
                        <Grid item display="flex" alignItems="center" gap={0.5}>
                            <AccessTimeIcon sx={{ fontSize: 16, color: 'gray' }} />
                            <Typography variant="body2" color="textSecondary">
                                {new Date(item.date).toLocaleDateString()}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider />

                    <Grid item>
                        <Typography
                            variant="body2"
                            sx={{
                                maxHeight: 200,
                                overflowY: 'auto',
                                py: 2
                            }}
                        >
                            {item?.description}
                        </Typography>
                    </Grid>

                    <Grid container mt={2} justifyContent="flex-end" spacing={1}>
                        <Grid item>
                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                            >
                                ESCONDER
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                size="small"
                                variant="outlined"
                            >
                                VER MAIS
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </DarkerStyledPaper>
        </Grid>
    );
}
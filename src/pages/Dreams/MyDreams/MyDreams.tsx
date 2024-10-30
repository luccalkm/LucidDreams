import React, { useEffect, useRef, useState } from "react";
import { Grid, Typography, ButtonGroup, Button, CardMedia, Tooltip } from "@mui/material";
import { DreamHomeCardDTO } from "../../../dtos/DreamHomeCardDTO";
import { dreamHomeCardData } from "../../../context/seedData";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import DarkerStyledPaper from "../../../components/common/StyledPaper";

const defaultImage = "https://via.placeholder.com/150";

export const MyDreams = () => {
    const titleRef = useRef<HTMLDivElement>(null);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const [chooseFormatting, setChooseFormatting] = useState<number[]>([]);
    const [isSelectedLeft, setIsSelectedLeft] = useState(true);

    useEffect(() => {
        if (titleRef.current) {
            setIsOverflowed(titleRef.current.scrollWidth > titleRef.current.clientWidth);
        }
    }, []);

    const handleLeftButtonClick = () => {
        setIsSelectedLeft(true);
        setChooseFormatting(Array(dreamHomeCardData.length).fill(3));
    };

    const handleRightButtonClick = () => {
        setIsSelectedLeft(false);
        setChooseFormatting(Array(dreamHomeCardData.length).fill(6));
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Typography variant="h4" gutterBottom>
                    Meus Sonhos
                </Typography>
            </Grid>
            <Grid item xs={4} textAlign={'right'}>
                <ButtonGroup>
                    <Button
                        variant={isSelectedLeft ? "contained" : "outlined"}
                        onClick={handleLeftButtonClick}
                    >
                        <ViewCompactIcon />
                    </Button>
                    <Button
                        variant={!isSelectedLeft ? "contained" : "outlined"}
                        onClick={handleRightButtonClick}
                    >
                        <DashboardIcon />
                    </Button>
                </ButtonGroup>
            </Grid>
            {dreamHomeCardData.map((dream: DreamHomeCardDTO, index: number) => (
                <Grid item xs={12} sm={6} md={chooseFormatting[index] || 3} key={dream.id}>
                    <DarkerStyledPaper
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
                        <Tooltip title={isOverflowed ? dream?.title : ''} disableHoverListener={!isOverflowed}>
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
                                {dream?.title}
                            </Typography>
                        </Tooltip>
                        <Typography variant="body2" color="textSecondary" paragraph>
                            {dream.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Data: {new Date(dream.date).toLocaleDateString()}
                        </Typography>
                    </DarkerStyledPaper>
                </Grid>
            ))}
        </Grid>
    );
};

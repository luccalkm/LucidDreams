import React, { useEffect, useRef, useState } from "react";
import { Grid, Typography, ButtonGroup, Button, CardMedia, Tooltip } from "@mui/material";
import { DreamHomeCardDTO } from "../../../dtos/DreamHomeCardDTO";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import DarkerStyledPaper from "../../../components/common/StyledPaper";
import { get, getDatabase, ref } from "firebase/database";
import { useAuth } from "../../../context/AuthContext";

const defaultImage = "https://via.placeholder.com/150";

export const MyDreams = () => {
    const titleRef = useRef<HTMLDivElement>(null);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const [chooseFormatting, setChooseFormatting] = useState<number[]>([]);
    const [isSelectedLeft, setIsSelectedLeft] = useState(true);
    const [dreamsData, setDreamsData] = useState<DreamHomeCardDTO[]>([]);
    const { getLoggedId } = useAuth();
    const db = getDatabase();

    useEffect(() => {
        if (titleRef.current) {
            setIsOverflowed(titleRef.current.scrollWidth > titleRef.current.clientWidth);
        }
    }, []);

    useEffect(() => {
        const fetchDreamsData = async () => {
            const userId = getLoggedId();
            const dreamsRef = ref(db, `dreams/${userId}`);
            const snapshot = await get(dreamsRef);

            if (snapshot.exists()) {
                const data: DreamHomeCardDTO[] = Object.values(snapshot.val());
                const sortedData = data
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 6);
                setDreamsData(sortedData);
                console.log(sortedData)
            } else {
                setDreamsData([]);
            }
        };

        fetchDreamsData();
    }, []);

    const handleLeftButtonClick = () => {
        setIsSelectedLeft(true);
        setChooseFormatting(Array(dreamsData.length).fill(3));
    };

    const handleRightButtonClick = () => {
        setIsSelectedLeft(false);
        setChooseFormatting(Array(dreamsData.length).fill(6));
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
            {dreamsData.map((dream: DreamHomeCardDTO, index: number) => (
                <Grid item xs={12} sm={6} md={chooseFormatting[index] || 3} key={dream?.id}>
                    <DarkerStyledPaper
                        sx={{
                            padding: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <img
                            height="140"
                            src={dream?.imageBase64 || defaultImage}
                            alt={dream?.title}
                            style={{ marginBottom: 2 }}
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
                            {dream?.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Data: {new Date(dream?.date).toLocaleDateString()}
                        </Typography>
                    </DarkerStyledPaper>
                </Grid>
            ))}
        </Grid>
    );
};

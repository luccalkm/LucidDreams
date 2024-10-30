import { useEffect, useState } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { ref, get, getDatabase } from "firebase/database";
import DreamsHomeCard from "./DreamsHomeCard";
import { DreamHomeCardDTO } from "../../dtos/DreamHomeCardDTO";
import { useAuth } from '../../context/AuthContext';

export const Home = () => {
    const [dreamsData, setDreamsData] = useState<DreamHomeCardDTO[]>([]);
    const { getLoggedId } = useAuth();
    const db = getDatabase();
    
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
            } else {
                console.log("Nenhum sonho encontrado para este usuário.");
                setDreamsData([]);
            }
        };

        fetchDreamsData();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">
                    Meus últimos registros
                </Typography>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {dreamsData.map((item) => (
                        <DreamsHomeCard 
                            item={item} 
                            key={item.id} 
                        />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

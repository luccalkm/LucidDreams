import React from "react";
import { Grid } from "@mui/material";
import { RegisterDreamForm } from "./RegisterDreamForm";
import { DreamOutput } from "./DreamOutput";
import { AIProvider } from "../../context/AIContext";

export const RegisterDream = () => {
    return (
        <AIProvider>
            <Grid container justifyContent="center" spacing={6}>
                <Grid item xs={12}>
                    <RegisterDreamForm />
                </Grid>
                <Grid item xs={12}>
                    <DreamOutput />
                </Grid>
            </Grid>
        </AIProvider>
    );
};

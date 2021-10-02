import { Grid } from "@mui/material";
import React from "react";
import CampaignCard from "./CampaignCard";

export default function CampaignCardsGrid({ deployedCampaignsAddresses }) {
    const getCards = () => {
        return deployedCampaignsAddresses.map((elem, id) => (
            <Grid item xs={4} key={id}>
                <CampaignCard contractAddress={elem} />
            </Grid>
        ));
    };

    return (
        <Grid container rowSpacing={5} columnSpacing={5} justifyContent="space-evenly">
            {getCards()}
        </Grid>
    );
}

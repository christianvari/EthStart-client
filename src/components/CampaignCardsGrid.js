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
        <Grid sx={{ m: 1 }} container spacing={1}>
            {getCards()}
        </Grid>
    );
}

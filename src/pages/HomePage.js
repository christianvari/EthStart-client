import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEthers } from "@usedapp/core";
import React from "react";
import { defaultBackground } from "../components/Background";
import CampaignCardsGrid from "../components/CampaignCardsGrid";
import { useGetCampaigns } from "../utils/CampaignFactoryInterfaces";

function HomePage({ areRunning }) {
    document.body.style.background = defaultBackground;
    const { chainId } = useEthers();

    const campaignsAddresses = useGetCampaigns(chainId, 0, 5, areRunning);

    if (!campaignsAddresses) return null;

    return (
        <div className="HomePage">
            <Box sx={{ mt: 3, mb: 3, ml: 1, color: "white" }}>
                <Typography variant="h4" component="div" gutterBottom>
                    {`${areRunning ? "Running" : "Funded"} Campaigns`}
                </Typography>
            </Box>
            <Box sx={{ m: 3 }}>
                <CampaignCardsGrid
                    campaignsAddresses={campaignsAddresses?.campaigns || []}
                />
            </Box>
        </div>
    );
}

export default HomePage;

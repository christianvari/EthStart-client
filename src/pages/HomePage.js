import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEthers } from "@usedapp/core";
import React from "react";
import { defaultBackground } from "../components/Background";
import CampaignCardsGrid from "../components/CampaignCardsGrid";
import { useGetCampaigns } from "../utils/CampaignFactoryInterfaces";

function HomePage() {
    document.body.style.background = defaultBackground;
    const { chainId } = useEthers();

    const deployedCampaignsAddresses = useGetCampaigns(chainId, 0, 5, true);

    if (!deployedCampaignsAddresses) return null;

    return (
        <div className="HomePage">
            <Box sx={{ mt: 3, mb: 3, ml: 1, color: "white" }}>
                <Typography variant="h4" component="div" gutterBottom>
                    Deployed Campaigns
                </Typography>
            </Box>
            <Box sx={{ m: 3 }}>
                <CampaignCardsGrid
                    deployedCampaignsAddresses={deployedCampaignsAddresses?.campaigns}
                />
            </Box>
        </div>
    );
}

export default HomePage;

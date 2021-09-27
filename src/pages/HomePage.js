import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CampaignCardsGrid from "../components/CampaignCardsGrid";
import { useGetDeployedCampaigns } from "../utils/CampaignFactoryInterfaces";

function HomePage() {
    const deployedCampaignsAddresses = useGetDeployedCampaigns();

    if (!deployedCampaignsAddresses) return null;

    return (
        <div className="HomePage">
            <Box sx={{ mt: 3, mb: 3, ml: 1 }}>
                <Typography variant="h4" component="div" gutterBottom>
                    Deployed Campaigns
                </Typography>
            </Box>
            <CampaignCardsGrid deployedCampaignsAddresses={deployedCampaignsAddresses} />
        </div>
    );
}

export default HomePage;

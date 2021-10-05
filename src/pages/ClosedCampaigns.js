import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { defaultBackground } from "../components/Background";
import CampaignCardsGrid from "../components/CampaignCardsGrid";

function ClosedCampaigns() {
    document.body.style.background = defaultBackground;

    return (
        <div className="ClosedCampaigns">
            <Box sx={{ mt: 3, mb: 3, ml: 1, color: "white" }}>
                <Typography variant="h4" component="div" gutterBottom>
                    Closed Campaigns
                </Typography>
            </Box>
            <Box sx={{ m: 3 }}>
                <CampaignCardsGrid areRunning={false} />
            </Box>
        </div>
    );
}

export default ClosedCampaigns;

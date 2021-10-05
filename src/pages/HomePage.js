import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { defaultBackground } from "../components/Background";
import CampaignCardsGrid from "../components/CampaignCardsGrid";

function HomePage({ areRunning }) {
    document.body.style.background = defaultBackground;

    return (
        <div className="HomePage">
            <Box sx={{ mt: 3, mb: 3, ml: 1, color: "white" }}>
                <Typography variant="h4" component="div" gutterBottom>
                    {`${areRunning ? "Running" : "Funded"} Campaigns`}
                </Typography>
            </Box>
            <Box sx={{ m: 3 }}>
                <CampaignCardsGrid areRunning={areRunning} />
            </Box>
        </div>
    );
}

export default HomePage;

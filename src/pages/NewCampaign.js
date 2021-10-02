import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CreateCampaignForm from "../components/CreateCampaignForm";

function NewCampaign() {
    document.body.style.background = "unset";
    return (
        <div>
            <Box sx={{ mt: 3, mb: 3, ml: 1 }}>
                <Typography variant="h4" component="div" gutterBottom>
                    Create a new Campaign
                </Typography>
            </Box>
            <CreateCampaignForm />
        </div>
    );
}

export default NewCampaign;

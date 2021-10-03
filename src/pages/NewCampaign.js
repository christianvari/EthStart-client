import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { defaultBackground } from "../components/Background";
import CreateCampaignForm from "../components/CreateCampaignForm";

function NewCampaign() {
    document.body.style.background = defaultBackground;
    return (
        <Box
            sx={{
                bgcolor: "rgba(0,0,0,.3)",
                p: 3,
                borderRadius: 1,
                boxShadow: 5,
                color: "white",
            }}
        >
            <Box>
                <Typography variant="h4" component="div" gutterBottom>
                    Create a new Campaign
                </Typography>
            </Box>
            <CreateCampaignForm />
        </Box>
    );
}

export default NewCampaign;

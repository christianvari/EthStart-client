import React from "react";
import { useParams } from "react-router-dom";
import FundedCampaignInfoWidgets from "../components/FundedCampaignInfoWidgets";
import RunningCampaignInfoWidgets from "../components/RunningCampaignInfoWidgets";
import { useGetCampaignSummary } from "../utils/CampaignInterfaces";
import { utils } from "ethers";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

function CampaignInfoPage() {
    const { address } = useParams();

    const campaignSummary = useGetCampaignSummary(address);

    if (!campaignSummary) return null;

    const data = {
        manager: campaignSummary[0],
        title: campaignSummary[1].split("%%%%%")[0],
        imageURL: campaignSummary[3],
        description: campaignSummary[2],
        subTitle: campaignSummary[1].split("%%%%%")[1],
        isFunded: campaignSummary[4],
        tokenMaxSupply: campaignSummary[5],
    };

    return (
        <div>
            <Box sx={{ mt: 3, mb: 3, ml: 1 }}>
                <Typography variant="h4" component="div" gutterBottom>
                    {data.title}
                </Typography>
                <Typography variant="h6" component="div" gutterBottom>
                    {data.subTitle}
                </Typography>
            </Box>
            {data.isFunded ? (
                <FundedCampaignInfoWidgets address={address} data={data} />
            ) : (
                <RunningCampaignInfoWidgets address={address} data={data} />
            )}
        </div>
    );
}

export default CampaignInfoPage;

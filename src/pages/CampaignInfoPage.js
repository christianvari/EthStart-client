import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import FundedCampaignInfoWidgets from "../components/FundedCampaignInfoWidgets";
import RunningCampaignInfoWidgets from "../components/RunningCampaignInfoWidgets";
import { useGetCampaignSummary } from "../utils/CampaignInterfaces";
import { Box } from "@mui/system";
import { getIPFSURL } from "../utils/IPFSUtils";
import { prominent } from "color.js";

function CampaignInfoPage() {
    const { address } = useParams();
    const campaignSummary = useGetCampaignSummary(address);
    const isGradientSet = useRef(false);

    if (!campaignSummary) return null;

    const data = {
        manager: campaignSummary[0],
        title: campaignSummary[1].split("%%%%%")[0],
        imageURL: getIPFSURL(campaignSummary[3]),
        description: campaignSummary[2],
        subTitle: campaignSummary[1].split("%%%%%")[1],
        isFunded: campaignSummary[4],
        tokenMaxSupply: campaignSummary[5],
    };

    if (data?.imageURL && !isGradientSet.current) {
        prominent(data.imageURL, { amount: 3, format: "hex" }).then((color) => {
            document.body.style.background = `radial-gradient(circle, ${color[0]} 0%, ${color[1]} 50%,${color[2]} 100%)`;
            isGradientSet.current = true;
        });
    }

    return (
        <Box sx={{ bgcolor: "rgba(0,0,0,.25)", p: 3, borderRadius: 1, boxShadow: 5 }}>
            {data.isFunded ? (
                <FundedCampaignInfoWidgets address={address} data={data} />
            ) : (
                <RunningCampaignInfoWidgets address={address} data={data} />
            )}
        </Box>
    );
}

export default CampaignInfoPage;

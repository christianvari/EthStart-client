import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import RunningCampaignInfoWidgets from "../components/RunningCampaignInfoWidgets";
import { useGetImageUrl, useGetIsFunded } from "../utils/CampaignInterfaces";
import { Box } from "@mui/system";
import { prominent } from "color.js";

function CampaignInfoPage() {
    const { address } = useParams();
    const isGradientSet = useRef(false);
    const imageUrl = useGetImageUrl(address);
    const isFunded = useGetIsFunded(address);

    // const data = {
    //     manager: campaignSummary[0],
    //     title: campaignSummary[1].split("%%%%%")[0],
    //     imageURL: getIPFSURL(campaignSummary[3]),
    //     description: campaignSummary[2],
    //     subTitle: campaignSummary[1].split("%%%%%")[1],
    //     isFunded: campaignSummary[4],
    //     tokenMaxSupply: campaignSummary[5],
    // };

    if (imageUrl && !isGradientSet.current) {
        prominent(imageUrl, { amount: 3, format: "hex", group: 40 }).then((color) => {
            document.body.style.background = `radial-gradient(circle, ${color[0]} 0%, ${color[1]} 50%,${color[2]} 100%)`;
            isGradientSet.current = true;
        });
    }

    if (isFunded === undefined) return null;

    return (
        <Box
            sx={{
                bgcolor: "rgba(0,0,0,.3)",
                p: 3,
                borderRadius: 1,
                boxShadow: 5,
            }}
        >
            {isFunded ? (
                // <FundedCampaignInfoWidgets address={address} data={data} />
                <div></div>
            ) : (
                <RunningCampaignInfoWidgets
                    address={address}
                    imageUrl={imageUrl}
                    isFunded={false}
                />
            )}
        </Box>
    );
}

export default CampaignInfoPage;

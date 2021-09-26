import React from "react";
import CampaignCardsGrid from "../components/CampaignCardsGrid";
import { useGetDeployedCampaigns } from "../utils/CampaignFactoryInterfaces";

function HomePage() {
    const deployedCampaignsAddresses = useGetDeployedCampaigns();

    if (!deployedCampaignsAddresses) return null;

    return (
        <div className="HomePage">
            <CampaignCardsGrid deployedCampaignsAddresses={deployedCampaignsAddresses} />
        </div>
    );
}

export default HomePage;

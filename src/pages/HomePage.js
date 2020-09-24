import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import CampaignCardsGrid from "../components/CampaignCardsGrid";

function HomePage({ drizzleContext }) {
    const { drizzle, drizzleState, initialized } = drizzleContext;
    const [keys, setKeys] = useState({});
    useEffect(() => {
        if (!initialized) return;
        if (!keys.activeCampaigns) {
            const activeCampaigns = drizzle.contracts.CampaignFactory.methods.getDeployedCampaigns.cacheCall();
            console.log(activeCampaigns);
            setKeys({ activeCampaigns });
        }
    }, [initialized, keys, drizzle]);
    const displayData =
        initialized &&
        drizzleState.contracts.CampaignFactory &&
        drizzleState.contracts.CampaignFactory.getDeployedCampaigns[keys.activeCampaigns];
    return (
        <Layout title="Running campaigns">
            <CampaignCardsGrid
                drizzleContext={drizzleContext}
                addresses={displayData && displayData.value}
            />
        </Layout>
    );
}

export default HomePage;

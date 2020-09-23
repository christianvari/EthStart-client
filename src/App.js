import React, { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import { Container } from "@material-ui/core";
import CampaignCardsGrid from "./components/CampaignCardsGrid";

function App({ drizzleContext }) {
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
        drizzleState.contracts.CampaignFactory.getDeployedCampaigns[
            keys.activeCampaigns
        ];
    return (
        <Layout title="Running campaigns">
            <Container maxWidth="xl">
                <CampaignCardsGrid
                    drizzleContext={drizzleContext}
                    addresses={displayData && displayData.value}
                />
            </Container>
        </Layout>
    );
}

export default App;

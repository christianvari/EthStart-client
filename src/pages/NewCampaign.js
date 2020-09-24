import React from "react";
import Layout from "../components/Layout/Layout";
import CreateCampaignForm from "../components/CreateCampaignForm";
import { Container } from "react-bootstrap";
import MetamaskLockedPagePrototype from "./prototypes/MetamaskLockedPagePrototype";

function NewCampaign({ drizzleContext }) {
    const { drizzle, initialized } = drizzleContext;

    if (!initialized) return null;
    return (
        <Layout title="Create a new Campaign">
            <MetamaskLockedPagePrototype>
                <Container fluid>
                    <CreateCampaignForm drizzle={drizzle} />
                </Container>
            </MetamaskLockedPagePrototype>
        </Layout>
    );
}

export default NewCampaign;

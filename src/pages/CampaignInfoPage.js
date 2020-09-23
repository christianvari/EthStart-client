import React from "react";
import Layout from "../components/Layout/Layout";
import { Container, Paper } from "@material-ui/core";

function CampaignInfoPage({ drizzleContext }) {
    const { drizzle, drizzleState, initialized } = drizzleContext;
    if (!initialized) return null;
    return (
        <Layout title="Campaign informations">
            <Container maxWidth="xl">
                <Paper
                    style={{
                        backgroundColor: "#eee",
                        height: "85vh",
                        marginTop: "3vh",
                    }}
                >
                    <Container maxWidth="xl"></Container>
                </Paper>
            </Container>
        </Layout>
    );
}

export default CampaignInfoPage;

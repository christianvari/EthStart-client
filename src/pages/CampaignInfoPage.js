import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import FundedCampaignInfoWidgets from "../components/FundedCampaignInfoWidgets";
import addContract from "../drizzle/addContract";
import getData from "../drizzle/getData";
import RunningCampaignInfoWidgets from "../components/RunningCampaignInfoWidgets";

function CampaignInfoPage({ drizzleContext }) {
    const { drizzle } = drizzleContext;
    const { address } = useParams();

    if (!drizzle.contracts[address]) {
        addContract(address, drizzle, "Campaign");
    }

    let getSummaryData = getData(drizzle, address, "getCampaignSummary");

    let data = {};
    try {
        data = {
            tokenPrice: getSummaryData.value[0],
            manager: getSummaryData.value[2],
            title: getSummaryData.value[3].split("%%%%%")[0],
            imageURL: getSummaryData.value[5],
            description: getSummaryData.value[4],
            subTitle: getSummaryData.value[3].split("%%%%%")[1],
            isFunded: getSummaryData.value[6],
            tokenMaxSupply: getSummaryData.value[7],
        };
    } catch (e) {}
    return (
        <Layout title={data.title} desc={data.subTitle}>
            <Container fluid>
                {data.isFunded ? (
                    <FundedCampaignInfoWidgets
                        drizzle={drizzle}
                        address={address}
                        data={data}
                    />
                ) : (
                    <RunningCampaignInfoWidgets
                        drizzle={drizzle}
                        address={address}
                        data={data}
                    />
                )}
            </Container>
        </Layout>
    );
}

export default CampaignInfoPage;

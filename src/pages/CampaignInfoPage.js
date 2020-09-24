import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import addContract from "../drizzle/addContract";

function CampaignInfoPage({ drizzleContext }) {
    const { drizzle, drizzleState, initialized } = drizzleContext;
    const { address } = useParams();
    const key = useRef();

    if (!initialized) return null;
    if (!key.current) {
        try {
            key.current = drizzle.contracts[address].methods.getSummary.cacheCall();
        } catch {
            addContract(address, drizzle);
            return null;
        }
    }
    let data;
    try {
        const storeData = drizzleState.contracts[address].getSummary[key.current];
        console.log(storeData);
        data = {
            title: storeData.value[4],
            imageURL: storeData.value[6],
            description: storeData.value[5],
        };
    } catch {
        return null;
    }
    return (
        <Layout
            title={data.title}
            desc={data.description}
            jumbotronUrl={data.imageURL}
        ></Layout>
    );
}

export default CampaignInfoPage;

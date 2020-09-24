import React, { useRef } from "react";
import CampaignCard from "./CampaignCard";
import { CardColumns, Container } from "react-bootstrap";
import addContract from "../drizzle/addContract";

export default function CampaignCardsGrid({ drizzleContext, addresses }) {
    const { drizzle, drizzleState, initialized } = drizzleContext;
    let keys = useRef();

    if (!keys.current && initialized && addresses) {
        keys.current = addresses.map((address) => {
            addContract(address, drizzle);
            const key = drizzle.contracts[address].methods.getSummary.cacheCall();
            return {
                address,
                key,
            };
        });
    }
    if (!keys.current) return null;

    const getCards = () => {
        console.log("keys", keys.current);
        return (
            <CardColumns>
                {keys.current.map((elem, id) => (
                    <CampaignCard key={id} drizzleState={drizzleState} elem={elem} />
                ))}
            </CardColumns>
        );
    };

    return <Container fluid>{getCards()}</Container>;
}

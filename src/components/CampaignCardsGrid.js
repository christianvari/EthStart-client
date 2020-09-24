import React, { useEffect, useState } from "react";
import Campaign from "../contractsABI/Campaign.json";
import CampaignCard from "./CampaignCard";
import { CardColumns, Container } from "react-bootstrap";

export default function CampaignCardsGrid({ drizzleContext, addresses }) {
    const { drizzle, drizzleState, initialized } = drizzleContext;
    const [keys, setKeys] = useState(null);
    useEffect(() => {
        if (!initialized) return;
        if (!keys && addresses) {
            const currentMonitoredContracts = Object.keys(drizzle.contracts);
            console.log(currentMonitoredContracts, drizzle);
            const res = addresses.map((address) => {
                if (!currentMonitoredContracts.includes(address)) {
                    const contractConfig = {
                        contractName: address,
                        web3Contract: new drizzle.web3.eth.Contract(
                            Campaign.abi,
                            address,
                        ),
                    };
                    drizzle.addContract(contractConfig);
                }
                const key = drizzle.contracts[address].methods.getSummary.cacheCall();
                return {
                    address,
                    key,
                };
            });
            setKeys(res);
        }
    }, [initialized, keys, drizzle, addresses]);

    const getCards = () => {
        if (!keys) return;
        console.log("keys", keys);
        return (
            <CardColumns>
                {keys.map((elem, id) => (
                    <CampaignCard key={id} drizzleState={drizzleState} elem={elem} />
                ))}
            </CardColumns>
        );
    };

    return <Container fluid>{getCards()}</Container>;
}

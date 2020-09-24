import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Campaign from "../contractsABI/Campaign.json";
import CampaignCard from "./CampaignCard";
import { CardColumns, Container } from "react-bootstrap";

export default function CampaignCardsGrid({ drizzleContext, addresses }) {
    const { drizzle, drizzleState, initialized } = drizzleContext;
    const [keys, setKeys] = useState(null);
    useEffect(() => {
        if (!initialized) return;
        if (!keys && addresses) {
            const res = addresses.map((address) => {
                const contractConfig = {
                    contractName: address,
                    web3Contract: new drizzle.web3.eth.Contract(Campaign.abi, address),
                };
                drizzle.addContract(contractConfig);
                const key = drizzle.contracts[address].methods.getSummary.cacheCall();
                return {
                    address,
                    key,
                };
            });
            setKeys({ addresses: res });
        }
    }, [initialized, keys, drizzle, addresses]);

    const getCards = () => {
        if (!keys)
            return (
                <CardColumns>
                    {[0, 1, 2].map((value) => (
                        <Paper key={value} />
                    ))}
                </CardColumns>
            );
        console.log(keys);
        return (
            <CardColumns>
                {keys.addresses.map((elem, id) => (
                    <CampaignCard key={id} drizzleState={drizzleState} elem={elem} />
                ))}
            </CardColumns>
        );
    };

    return <Container fluid>{getCards()}</Container>;
}

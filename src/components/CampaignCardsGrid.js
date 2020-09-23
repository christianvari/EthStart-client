import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Campaign from "../contractsABI/Campaign.json";
import CampaignCard from "./CampaignCard";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: "30vh",
        width: "25vw",
    },
}));

export default function CampaignCardsGrid({ drizzleContext, addresses }) {
    const classes = useStyles();
    const { drizzle, drizzleState, initialized } = drizzleContext;
    const [keys, setKeys] = useState(null);
    useEffect(() => {
        if (!initialized) return;
        if (!keys && addresses) {
            const res = addresses.map((address) => {
                const contractConfig = {
                    contractName: address,
                    web3Contract: new drizzle.web3.eth.Contract(
                        Campaign.abi,
                        address
                    ),
                };
                drizzle.addContract(contractConfig);
                const key = drizzle.contracts[
                    address
                ].methods.getSummary.cacheCall();
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
            return [0, 1, 2].map((value) => (
                <Grid key={value} item>
                    <Paper className={classes.paper} />
                </Grid>
            ));
        console.log(keys);
        return keys.addresses.map((elem, id) => (
            <Grid key={id} item xs={4}>
                <CampaignCard drizzleState={drizzleState} elem={elem} />
            </Grid>
        ));
    };

    return (
        <Grid container className={classes.root} spacing={2}>
            {getCards()}
        </Grid>
    );
}

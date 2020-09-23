import React from "react";
import Layout from "../components/Layout/Layout";
import { Container, Paper, makeStyles } from "@material-ui/core";
import CreateCampaignForm from "../components/CreateCampaignForm";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        backgroundColor: "#eee",
        height: "85vh",
    },
}));

function NewCampaign({ drizzleContext }) {
    const { drizzle, initialized } = drizzleContext;
    const classes = useStyles();

    if (!initialized) return null;
    return (
        <Layout title="Create newcampaign">
            <Container maxWidth="xl">
                <Paper className={classes.root}>
                    <Container maxWidth="xl">
                        <CreateCampaignForm drizzle={drizzle} />
                    </Container>
                </Paper>
            </Container>
        </Layout>
    );
}

export default NewCampaign;

import React from "react";
import TimeoutCard from "./TimeoutCard";
import ContributeForm from "./ContributeForm";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";
import ReactMarkdown from "react-markdown";
import {
    useGetTitle,
    useGetDescription,
    useGetTokenSymbol,
} from "../utils/CampaignInterfaces";
import BalanceStatusBar from "./BalanceStatusBar";

const RunningCampaignInfoWidgets = ({ address, imageUrl, isFunded }) => {
    const title = useGetTitle(address);
    const description = useGetDescription(address);
    const tokenSymbol = useGetTokenSymbol(address);

    return (
        <div className="RunningCampaing">
            <Grid container columnSpacing={3}>
                <Grid item xs={12} md={6}>
                    <img
                        id="gradient-generator"
                        src={imageUrl}
                        alt={title?.title}
                        style={{
                            width: "100%",
                            maxHeight: "25rem",
                            objectFit: "cover",
                        }}
                    />
                    <Box sx={{ color: "white" }}>
                        <Typography gutterBottom variant="h3">
                            {title?.title}
                        </Typography>
                        <Typography gutterBottom variant="h4">
                            {title?.subtitle}
                        </Typography>
                        <BalanceStatusBar
                            contractAddress={address}
                            isFunded={isFunded}
                            tokenSymbol={tokenSymbol}
                            imageUrl={imageUrl}
                        />
                        <Typography gutterBottom variant="h5">
                            Description
                        </Typography>
                        <Typography>
                            <ReactMarkdown>{description}</ReactMarkdown>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TimeoutCard contractAddress={address} />
                    <Card sx={{ mt: 3 }}>
                        <CardContent>
                            <ContributeForm address={address} symbol={tokenSymbol} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default RunningCampaignInfoWidgets;

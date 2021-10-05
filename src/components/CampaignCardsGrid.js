import { Grid } from "@mui/material";
import React from "react";
import CampaignCard from "./CampaignCard";
import { useState } from "react";
import { useGetCampaigns } from "../utils/CampaignFactoryInterfaces";
import { useEthers } from "@usedapp/core";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";

const getCards = (addresses) => {
    return addresses.map((elem, id) => (
        <Grid item xs={4} key={id}>
            <CampaignCard contractAddress={elem} />
        </Grid>
    ));
};

const PAGE_SIZE = 9;

export default function CampaignCardsGrid({ areRunning }) {
    const [cursor, setCursor] = useState(0);
    const { chainId } = useEthers();
    const { campaigns, length } = useGetCampaigns(chainId, cursor, PAGE_SIZE, areRunning);
    console.log("CURSOR", cursor, length);

    if (!length) return null;

    return (
        <InfiniteScroll
            dataLength={length}
            next={() => {
                if (cursor + PAGE_SIZE < length) setCursor((p) => p + PAGE_SIZE);
            }}
            hasMore={cursor + PAGE_SIZE < length}
            loader={
                <Box
                    sx={{
                        bgcolor: "rgba(0,0,0,.3)",
                        mt: 5,
                        p: 3,
                        borderRadius: 1,
                        boxShadow: 5,
                        color: "white",
                        display: "flex",
                    }}
                >
                    <CircularProgress />
                </Box>
            }
        >
            <Grid
                container
                rowSpacing={5}
                columnSpacing={5}
                justifyContent="space-evenly"
            >
                {getCards(campaigns)}
            </Grid>
        </InfiniteScroll>
    );
}

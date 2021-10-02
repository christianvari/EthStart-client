import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { useBlockNumber } from "@usedapp/core";

const TimeoutCard = React.memo(({ timeout }) => {
    const blockNumber = useBlockNumber();

    const getTime = () => {
        const time = (timeout - blockNumber) * 13000;
        const seconds = Math.floor(time / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        return `${days} : ${hours % 24} : ${minutes % 60}`;
    };
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5">
                    Funding time left
                </Typography>
                <Typography variant="h2" style={{ textAlign: "center" }}>
                    {getTime()}
                </Typography>
            </CardContent>
        </Card>
    );
});

export default TimeoutCard;

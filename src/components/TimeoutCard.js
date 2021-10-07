import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useBlockNumber, useEthers } from "@usedapp/core";
import React from "react";
import { LoadingButton } from "@mui/lab";
import { useFinalizeCrowdfunding } from "../utils/CampaignFactoryInterfaces";

const TimeoutCard = ({ timeout, contractAddress }) => {
    const blockNumber = useBlockNumber();

    const getTime = () => {
        const time = (timeout - blockNumber) * 13000;
        const seconds = Math.floor(time / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        return `${days} Days ${hours % 24} Hours ${minutes % 60} Minutes`;
    };

    const percentage = timeout && blockNumber ? (blockNumber * 100) / timeout : 0;
    const isTerminated = blockNumber > timeout;

    return (
        <Box sx={{ p: 3, bgcolor: "rgba(0,0,0,.2)", color: "white" }}>
            {isTerminated ? (
                <Box>
                    <FinalizeButton contractAddress={contractAddress} />
                </Box>
            ) : (
                <Box>
                    <Box sx={{ display: "flex" }}>
                        <Typography gutterBottom variant="body1">
                            Time left:
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="body1"
                            sx={{ ml: "auto", mr: 2 }}
                        >
                            <strong>{getTime()}</strong>
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                        <Box sx={{ width: "100%", mr: 1 }}>
                            <LinearProgress
                                variant="buffer"
                                value={percentage}
                                valueBuffer={percentage}
                            />
                        </Box>
                        <Box sx={{ minWidth: 35, color: "white" }}>
                            <Typography variant="body2">{`${Math.round(
                                percentage,
                            )}%`}</Typography>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

const FinalizeButton = ({ contractAddress }) => {
    const { chainId } = useEthers();
    const { state, send } = useFinalizeCrowdfunding(chainId);

    return (
        <LoadingButton
            variant="contained"
            loading={state.status === "Mining"}
            onClick={() => {
                send(contractAddress);
            }}
        >
            Finalize campaign
        </LoadingButton>
    );
};

export default TimeoutCard;

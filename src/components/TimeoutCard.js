import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEthers } from "@usedapp/core";
import React from "react";
import { LoadingButton } from "@mui/lab";
import { useFinalizeCrowdfunding } from "../utils/CampaignFactoryInterfaces";
import Countdown from "react-countdown";
import { useGetCreationTimestamp, useGetTimeout } from "../utils/CampaignInterfaces";

const TimeoutCard = ({ contractAddress }) => {
    const creationTimestamp = useGetCreationTimestamp(contractAddress);
    const timeout = useGetTimeout(contractAddress);

    if (!timeout) return null;

    const percentage =
        timeout && creationTimestamp
            ? ((Date.now() - creationTimestamp.toNumber() * 1000) /
                  ((timeout.toNumber() - creationTimestamp.toNumber()) * 1000)) *
              100
            : 0;

    const isTerminated = Date.now() > timeout.toNumber() * 1000;

    return (
        <Box sx={{ p: 3, bgcolor: "rgba(0,0,0,.2)", color: "white" }}>
            {isTerminated ? (
                <Box>
                    <FinalizeButton contractAddress={contractAddress} />
                </Box>
            ) : (
                <Box>
                    <Box sx={{ display: "flex" }}>
                        <Typography gutterBottom variant="h6">
                            Remaining funding time:
                        </Typography>
                        <Typography gutterBottom variant="h6" sx={{ ml: "auto", mr: 2 }}>
                            <strong>
                                <Countdown date={timeout.toNumber() * 1000} />
                            </strong>
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

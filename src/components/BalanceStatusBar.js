import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEtherBalance, useEthers } from "@usedapp/core";
import React from "react";
import {
    useGetContributerBalanceOf,
    // useGetTokenAddress,
    useGetTokenMaxSupply,
} from "../utils/CampaignInterfaces";
import { utils } from "ethers";

const BalanceStatusBar = ({ contractAddress, isFunded, tokenSymbol, imageURL }) => {
    const { account } = useEthers();
    const balance = useGetContributerBalanceOf(contractAddress, account);
    const totalDeposit = useEtherBalance(contractAddress);
    // const tokenAddress = useGetTokenAddress(contractAddress);
    const tokenMaxSupply = useGetTokenMaxSupply(contractAddress);

    const percentage =
        balance && totalDeposit && balance > 0 ? (balance * 100) / totalDeposit : 0;
    const estimatedAllocation =
        balance && totalDeposit && tokenMaxSupply && balance > 0
            ? tokenMaxSupply.mul(balance).div(totalDeposit)
            : 0;

    return (
        <Box sx={{ mt: 3, mb: 3, p: 3, bgcolor: "rgba(0,0,0,.2)", color: "white" }}>
            <Box sx={{ display: "flex" }}>
                <Typography gutterBottom variant="body1">
                    Total deposit:
                </Typography>
                <Typography gutterBottom variant="body1" sx={{ ml: "auto", mr: 2 }}>
                    <strong>{`${
                        totalDeposit ? utils.formatEther(totalDeposit) : 0
                    } Ξ`}</strong>
                </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Typography gutterBottom variant="body1">
                    My deposit:
                </Typography>
                <Typography gutterBottom variant="body1" sx={{ ml: "auto", mr: 2 }}>
                    <strong>{`${balance ? utils.formatEther(balance) : 0} Ξ`}</strong>
                </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Typography gutterBottom variant="body1">
                    Token max supply:
                </Typography>
                <Typography gutterBottom variant="body1" sx={{ ml: "auto", mr: 2 }}>
                    <strong>
                        {`${
                            tokenMaxSupply ? utils.formatEther(tokenMaxSupply) : 0
                        } ${tokenSymbol}`}
                    </strong>
                </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Typography gutterBottom variant="body1">
                    My estimated allocation:
                </Typography>
                <Typography gutterBottom variant="body1" sx={{ ml: "auto", mr: 2 }}>
                    <strong>
                        {`${utils.formatEther(estimatedAllocation)} ${tokenSymbol}`}
                    </strong>
                </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress variant="determinate" value={percentage} />
                </Box>
                <Box sx={{ minWidth: 35, color: "white" }}>
                    <Typography variant="body2">{`${Math.round(
                        percentage,
                    )}%`}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default BalanceStatusBar;

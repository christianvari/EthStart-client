import React from "react";
import addTokenToMetamask from "../metamask/addTokenToMetamask";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActions, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import {
    useGetContributerBalanceOf,
    useGetTokenAddress,
    useGetTokenMaxSupply,
} from "../utils/CampaignInterfaces";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { utils } from "ethers";

export default function BalanceCard({
    contractAddress,
    isFunded,
    tokenSymbol,
    imageURL,
}) {
    const { account } = useEthers();
    const balance = useGetContributerBalanceOf(contractAddress, account);
    const totalDeposit = useEtherBalance(contractAddress);
    const tokenAddress = useGetTokenAddress(contractAddress);
    const tokenMaxSupply = useGetTokenMaxSupply(contractAddress);

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {isFunded ? "Your Balance" : "Your  Deposit"}
                </Typography>
                {isFunded ? (
                    <div>
                        <Typography variant="h2" style={{ textAlign: "center" }}>
                            {`${
                                balance
                                    ? utils.formatEther(
                                          utils.parseUnits(`${balance}`, "wei"),
                                      )
                                    : "0"
                            } Ξ`}
                        </Typography>
                    </div>
                ) : (
                    <div>
                        <Typography variant="h2" style={{ textAlign: "center" }}>
                            {`${
                                balance
                                    ? utils.formatEther(
                                          utils.parseUnits(`${balance}`, "wei"),
                                      )
                                    : "0"
                            } Ξ`}
                        </Typography>
                        <Typography gutterBottom variant="h5">
                            Estimated token reward
                        </Typography>
                        <Typography variant="h2" style={{ textAlign: "center" }}>
                            {`${
                                balance > 0
                                    ? utils.formatEther(
                                          tokenMaxSupply.mul(balance).div(totalDeposit),
                                      )
                                    : "0"
                            } ${tokenSymbol}`}
                        </Typography>
                    </div>
                )}
            </CardContent>
            {isFunded && (
                <CardActions>
                    <Button
                        size="small"
                        onClick={() => {
                            addTokenToMetamask(tokenAddress, tokenSymbol, imageURL);
                        }}
                    >
                        Add this token to Metamask
                    </Button>
                    <Button size="small">Redeem your tokens</Button>
                </CardActions>
            )}
        </Card>
    );
}

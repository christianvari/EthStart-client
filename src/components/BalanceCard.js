import React from "react";
import addTokenToMetamask from "../metamask/addTokenToMetamask";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActions, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useGetContributerBalanceOf } from "../utils/CampaignInterfaces";
import { useEthers } from "@usedapp/core";
import { utils } from "ethers";

export default function BalanceCard({ data, contractAddress }) {
    const { account } = useEthers();
    const balance = useGetContributerBalanceOf(contractAddress, account) || 0;

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {data.isFunded ? "Your Balance" : "Your  Deposit"}
                </Typography>
                {data.isFunded ? (
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
                                    ? utils.formatEther(balance / data.totalDeposit)
                                    : "0"
                            } ${data.tokenSymbol}`}
                        </Typography>
                    </div>
                )}
            </CardContent>
            {data.isFunded && (
                <CardActions>
                    <Button
                        size="small"
                        onClick={() => {
                            addTokenToMetamask(
                                data.tokenAddress,
                                data.tokenSymbol,
                                data.imageURL,
                            );
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

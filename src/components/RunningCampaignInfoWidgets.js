import React from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { PieChart } from "react-minimal-pie-chart";
import BalanceCard from "./BalanceCard";
import TimeoutCard from "./TimeoutCard";
import ContributeForm from "./ContributeForm";
import {
    useGetAllocationBalanceOf,
    useGetFundingSummary,
} from "../utils/CampaignInterfaces";
import { useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const RunningCampaignInfoWidgets = ({ address, data }) => {
    const { account } = useEthers();
    const fundingSummary = useGetFundingSummary(address);

    if (!fundingSummary) return null;

    data.totalDeposit = fundingSummary[0];
    data.tokenSymbol = fundingSummary[4];
    data.tokenName = fundingSummary[3];
    data.timeout = fundingSummary[1];

    data.pie = [
        {
            title: "Allocated Contributors",
            value: data.tokenMaxSupply - data.totalDeposit - data.tokenMaxSupply / 4,
            color: "#d9534f",
        },
        {
            title: "Allocated Creator",
            value: data.tokenMaxSupply / 4,
            color: "#d9534f",
        },
        {
            title: "Disponible",
            value: parseInt(data.totalDeposit),
            color: "#5cb85c",
        },
    ];

    console.log(data);

    return (
        <div className="RunningCampaing">
            <Grid container columnSpacing={3}>
                <Grid item xs={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            sx={{ height: "15rem" }}
                            image={data.imageURL}
                            alt={data.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4">
                                {data.title}
                            </Typography>
                            <Typography variant="body2">{data.description}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <TimeoutCard timeout={data.timeout} />
                    <Card>
                        <CardContent>
                            <ContributeForm
                                address={address}
                                symbol={data.tokenSymbol}
                                price={data.tokenPrice}
                            />
                        </CardContent>
                    </Card>

                    <Row style={{ marginTop: "2.5vh" }}>
                        <Col>
                            <Row>
                                <Col>
                                    {/* <Card border="secondary">
                                        <Card.Header>Token's info</Card.Header>
                                        <Card.Body>
                                            <h4>
                                                <Row>
                                                    <Col>Name:</Col>
                                                    <Col>
                                                        <Badge variant="secondary">
                                                            {data.tokenName}
                                                        </Badge>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>Symbol:</Col>
                                                    <Col>
                                                        <Badge variant="secondary">
                                                            {data.tokenSymbol}
                                                        </Badge>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <Badge variant="secondary">
                                                            {utils.formatUnits(
                                                                data.tokenPrice,
                                                                "ether",
                                                            )}
                                                        </Badge>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>Max supply:</Col>
                                                    <Col>
                                                        <Badge variant="secondary">
                                                            {utils.formatUnits(
                                                                data.tokenMaxSupply,
                                                                "ether",
                                                            )}
                                                        </Badge>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>Available:</Col>
                                                    <Col>
                                                        <Badge variant="secondary">
                                                            {utils.formatUnits(
                                                                data.totalDeposit,
                                                                "ether",
                                                            )}
                                                        </Badge>
                                                    </Col>
                                                </Row>
                                            </h4>
                                        </Card.Body>
                                    </Card> */}
                                </Col>
                            </Row>

                            <BalanceCard contractAddress={address} data={data} />
                        </Col>
                        <Col>
                            {/* <Card border="secondary">
                                <Card.Header>Tokens allocation</Card.Header>
                                <Card.Body>
                                    <PieChart
                                        data={data.pie}
                                        lineWidth={50}
                                        label={({ dataEntry }) => dataEntry.value}
                                        labelStyle={(index) => ({
                                            fill: "#fff",
                                            fontSize: "10px",
                                            fontFamily: "sans-serif",
                                        })}
                                        labelPosition={70}
                                    />
                                </Card.Body>
                            </Card> */}
                        </Col>
                    </Row>
                </Grid>
            </Grid>
        </div>
    );
};

export default RunningCampaignInfoWidgets;

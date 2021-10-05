import React from "react";
import { Col, Row } from "react-bootstrap";
import BalanceCard from "./BalanceCard";
import TimeoutCard from "./TimeoutCard";
import ContributeForm from "./ContributeForm";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";
import ReactMarkdown from "react-markdown";
import {
    useGetTitle,
    useGetEndBlock,
    useGetDescription,
    useGetTokenSymbol,
} from "../utils/CampaignInterfaces";

const RunningCampaignInfoWidgets = ({ address, imageUrl, isFunded }) => {
    const title = useGetTitle(address);
    const endBlock = useGetEndBlock(address);
    const description = useGetDescription(address);
    const tokenSymbol = useGetTokenSymbol(address);

    return (
        <div className="RunningCampaing">
            <Grid container columnSpacing={3}>
                <Grid item xs={12} xl={6}>
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
                        <Typography gutterBottom variant="h5">
                            Description
                        </Typography>
                        <Typography>
                            <ReactMarkdown>{description}</ReactMarkdown>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} xl={6}>
                    <TimeoutCard timeout={endBlock} />
                    <Card>
                        <CardContent>
                            <ContributeForm address={address} symbol={tokenSymbol} />
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

                            <BalanceCard
                                contractAddress={address}
                                isFunded={isFunded}
                                tokenSymbol={tokenSymbol}
                                imageUrl={imageUrl}
                            />
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

import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { PieChart } from "react-minimal-pie-chart";
import BalanceCard from "./BalanceCard";
import TimeoutCard from "./TimeoutCard";
import ContributeForm from "./ContributeForm";
import getData from "../drizzle/getData";
import isMetamaskInstalled from "../metamask/isMetamaskInstalled";
import BN from "bn.js";

const RunningCampaignInfoWidgets = ({ drizzle, address, data }) => {
    try {
        const getFundingSummary = getData(drizzle, address, "getFundingSummary");
        if (isMetamaskInstalled()) {
            const getBalance = getData(drizzle, address, "allocationBalanceOf");
            data.balance = drizzle.web3.utils.fromWei(
                new BN(getBalance.value)
                    .mul(new BN(drizzle.web3.utils.toWei("1", "ether")))
                    .div(new BN(data.tokenPrice)),
                "ether",
            );
        }

        data.tokenMaxSupply = drizzle.web3.utils.fromWei(
            String(data.tokenMaxSupply),
            "ether",
        );
        data.availableTokens = drizzle.web3.utils.fromWei(
            String(getFundingSummary.value[0]),
            "ether",
        );
        data.tokenSymbol = getFundingSummary.value[4];
        data.tokenName = getFundingSummary.value[3];
        data.timeout = getFundingSummary.value[1];

        data.pie = [
            {
                title: "Allocated Contributors",
                value:
                    data.tokenMaxSupply - data.availableTokens - data.tokenMaxSupply / 4,
                color: "#d9534f",
            },
            {
                title: "Allocated Creator",
                value: data.tokenMaxSupply / 4,
                color: "#d9534f",
            },
            {
                title: "Disponible",
                value: parseInt(data.availableTokens),
                color: "#5cb85c",
            },
        ];
    } catch {
        return null;
    }

    return (
        <>
            <Row>
                <Col>
                    <Card border="secondary">
                        <Card.Img
                            variant="top"
                            src={data.imageURL}
                            style={{
                                width: "100%",
                                height: "40vh",
                                objectFit: "cover",
                            }}
                        />
                        <Card.Body>
                            <Card.Title>{data.title}</Card.Title>
                            <Card.Text>{data.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <TimeoutCard timeout={data.timeout} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "2.5vh" }}>
                        <Col>
                            <Card border="secondary">
                                <Card.Header>Contribute</Card.Header>
                                <Card.Body>
                                    <ContributeForm
                                        drizzle={drizzle}
                                        address={address}
                                        data={{
                                            tokenSymbol: data.tokenSymbol,
                                            tokenPrice: drizzle.web3.utils.fromWei(
                                                new BN(data.tokenPrice),
                                                "ether",
                                            ),
                                        }}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "2.5vh" }}>
                        <Col>
                            <Row>
                                <Col>
                                    <Card border="secondary">
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
                                                            {drizzle.web3.utils.fromWei(
                                                                new BN(data.tokenPrice),
                                                                "ether",
                                                            )}
                                                        </Badge>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>Max supply:</Col>
                                                    <Col>
                                                        <Badge variant="secondary">
                                                            {data.tokenMaxSupply}
                                                        </Badge>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>Available:</Col>
                                                    <Col>
                                                        <Badge variant="secondary">
                                                            {data.availableTokens}
                                                        </Badge>
                                                    </Col>
                                                </Row>
                                            </h4>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "2.5vh" }}>
                                <Col>
                                    <BalanceCard data={data} />
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Card border="secondary">
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
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default RunningCampaignInfoWidgets;

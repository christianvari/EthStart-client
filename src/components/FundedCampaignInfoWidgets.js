import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import BalanceCard from "./BalanceCard";
import addContract from "../drizzle/addContract";
import getData from "../drizzle/getData";
import isMetamaskInstalled from "../metamask/isMetamaskInstalled";
import bigNumberParse from "../utils/bigNumberParse";

const FundedCampaignInfoWidgets = ({ drizzle, address, data }) => {
    try {
        const tokenAddressData = getData(drizzle, address, "tokenAddress");
        data.tokenAddress = tokenAddressData.value;
        if (data.tokenAddress && !drizzle.contracts[data.tokenAddress]) {
            addContract(data.tokenAddress, drizzle, "SToken");
        }
        const getSummaryData = getData(drizzle, data.tokenAddress, "getSummary");
        if (isMetamaskInstalled()) {
            const getBalance = getData(drizzle, data.tokenAddress, "getSummary");
            data.balance = bigNumberParse(parseInt(getBalance.value[0]), 18);
        }
        data.circulatingTokens = bigNumberParse(parseInt(getSummaryData.value[0]), 18);
        data.maxSupplyTokens = bigNumberParse(parseInt(getSummaryData.value[1]), 18);
        data.tokenSymbol = getSummaryData.value[3];
        data.tokenName = getSummaryData.value[2];
        console.log(data);

        data.pie = [
            {
                name: "Circulating",
                value: parseInt(data.circulatingTokens),
                color: "#0275d8",
            },
            {
                name: "Disponible",
                value: data.maxSupplyTokens - data.circulatingTokens,
                color: "#c7c7c7",
            },
        ];
    } catch {
        return null;
    }

    return (
        <div className="FundedCampaing">
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
                    <Row style={{ marginTop: "2.5vh" }}>
                        <Col>
                            <Row>
                                <Col>
                                    <Card border="secondary">
                                        <Card.Header>Token's info</Card.Header>
                                        <Card.Body>
                                            <h3>
                                                <Row>
                                                    <Col>Name:</Col>
                                                    <Col>
                                                        <Badge variant="secondary">
                                                            {data.tokenName}
                                                        </Badge>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>Symbol</Col>
                                                    <Col>
                                                        <Badge variant="secondary">
                                                            {data.tokenSymbol}
                                                        </Badge>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>Max supply:</Col>
                                                    <Col>
                                                        <Badge variant="secondary">
                                                            {data.maxSupplyTokens}
                                                        </Badge>
                                                    </Col>
                                                </Row>
                                            </h3>
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
                                <Card.Header>Tokens distribution</Card.Header>
                                <Card.Body>
                                    <div style={{ width: "100%", height: "30vh" }}>
                                        {data.pie && (
                                            <ResponsiveContainer>
                                                <PieChart>
                                                    <Pie
                                                        data={data.pie}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        innerRadius={40}
                                                        labelLine={false}
                                                        label
                                                    >
                                                        {data.pie.map((entry, index) => (
                                                            <Cell
                                                                key={index}
                                                                fill={entry.color}
                                                            />
                                                        ))}
                                                    </Pie>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default FundedCampaignInfoWidgets;

import React from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import BalanceCard from "../components/BalanceCard";
import ContributeForm from "../components/ContributeForm";
import Layout from "../components/Layout/Layout";
import addContract from "../drizzle/addContract";
import getData from "../drizzle/getData";
import isMetamaskInstalled from "../metamask/isMetamaskInstalled";
import bigNumberParse from "../utils/bigNumberParse";

function CampaignInfoPage({ drizzleContext }) {
    const { drizzle } = drizzleContext;
    const { address } = useParams();

    if (!drizzle.contracts[address]) {
        addContract(address, drizzle, "Campaign");
    }

    let getSummaryData = getData(drizzle, address, "getSummary");
    const tokenAddressData = getData(drizzle, address, "tokenAddress");

    let data = {};
    try {
        data = {
            title: getSummaryData.value[4],
            imageURL: getSummaryData.value[6],
            description: getSummaryData.value[5],
            subTitle: getSummaryData.value[7],
            tokenAddress: tokenAddressData.value,
        };
        if (data.tokenAddress && !drizzle.contracts[data.tokenAddress]) {
            addContract(data.tokenAddress, drizzle, "SToken");
        }
        getSummaryData = getData(drizzle, data.tokenAddress, "getSummary");
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
    } catch (e) {}
    return (
        <Layout title={data.title} desc={data.subTitle}>
            <Container fluid>
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
                                <Card border="secondary">
                                    <Card.Header>Contribute</Card.Header>
                                    <Card.Body>
                                        <ContributeForm
                                            drizzle={drizzle}
                                            address={address}
                                            data={{
                                                tokenAddress: data.tokenAddress,
                                                tokenSymbol: data.tokenSymbol,
                                                imageURL: data.imageURL,
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
                                                            {data.pie.map(
                                                                (entry, index) => (
                                                                    <Cell
                                                                        key={index}
                                                                        fill={entry.color}
                                                                    />
                                                                ),
                                                            )}
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
            </Container>
        </Layout>
    );
}

export default CampaignInfoPage;

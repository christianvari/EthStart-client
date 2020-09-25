import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import Layout from "../components/Layout/Layout";
import addContract from "../drizzle/addContract";
import getData from "../drizzle/getData";

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
        data.circulatingTokens = parseInt(getSummaryData.value[0]) / Math.pow(10, 18);
        data.maxSupplyTokens = parseInt(getSummaryData.value[1]) / Math.pow(10, 18);
        data.pie = [
            {
                name: "Circulating",
                value: data.circulatingTokens,
                color: "blue",
            },
            {
                name: "Disponible",
                value: data.maxSupplyTokens - data.circulatingTokens,
                color: "grey",
            },
        ];
    } catch (e) {}
    return (
        <Layout title={data.title} desc={data.subTitle}>
            <Container fluid>
                <Row>
                    <Col>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={data.imageURL}
                                style={{ width: "100%", height: "30vh" }}
                            />
                            <Card.Body>
                                <Card.Title>{data.title}</Card.Title>
                                <Card.Text>{data.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
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
            </Container>
        </Layout>
    );
}

export default CampaignInfoPage;

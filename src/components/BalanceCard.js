import React from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import addTokenToMetamask from "../metamask/addTokenToMetamask";

export default function BalanceCard({ data }) {
    return (
        <Card border="secondary">
            <Card.Header>
                {data.isFunded ? "Your Balance" : "Your allocated tokens"}
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Badge variant="primary">
                            <h1>{`${data.balance || "0"} ${data.tokenSymbol}`}</h1>
                        </Badge>
                    </Col>
                </Row>
                {data.isFunded && (
                    <Row>
                        <Col>
                            <Button
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
                        </Col>
                        <Col>
                            <Button>Redeem your tokens</Button>
                        </Col>
                    </Row>
                )}
            </Card.Body>
        </Card>
    );
}

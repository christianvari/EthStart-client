import React from "react";
import { Button, Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import addTokenToMetamask from "../metamask/addTokenToMetamask";

export default function BalanceCard({ data }) {
    const overlay = (
        <Tooltip id="tooltip-metamask">
            Click here to add {data.tokenSymbol} to Metamask.
        </Tooltip>
    );
    return (
        <Card border="secondary">
            <Card.Header>Your Balance</Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <div
                            style={{
                                margin: "auto",
                                width: "50%",
                            }}
                        >
                            <OverlayTrigger placement="top" overlay={overlay}>
                                <Button
                                    variant="primary"
                                    disabled={!data.balance}
                                    onClick={() => {
                                        addTokenToMetamask(
                                            data.tokenAddress,
                                            data.tokenSymbol,
                                            data.imageURL,
                                        );
                                    }}
                                >
                                    <h1>
                                        {`${data.balance || "0"} ${
                                            data.tokenSymbol || ""
                                        }`}
                                    </h1>
                                </Button>
                            </OverlayTrigger>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

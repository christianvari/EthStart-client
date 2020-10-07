import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

const TimeoutCard = React.memo(({ timeout }) => {
    useEffect(() => {
        const updateTime = setInterval(() => {
            setTime((old) => old - 1000);
        }, 1000);

        return () => clearInterval(updateTime);
    });
    const [time, setTime] = useState(timeout * 1000 - Date.now());
    const getTime = () => {
        const seconds = Math.floor(time / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        return `${days} : ${hours % 24} : ${minutes % 60} : ${seconds % 60}`;
    };
    return (
        <Card border="secondary">
            <Card.Header>Funding time left</Card.Header>
            <Card.Body>
                <Row>
                    <Col
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <h1>{getTime()}</h1>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
});

export default TimeoutCard;

import React from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";

export default () => {
    return (
        <Jumbotron fluid style={{ marginBottom: 0, marginTop: "2rem" }}>
            <Container fluid>
                <Row>
                    <Col>
                        <p>Copyright @ Christian Vari</p>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
};

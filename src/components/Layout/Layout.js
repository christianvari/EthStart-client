import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";

export default ({ children, title, desc, jumbotronUrl }) => {
    return (
        <div>
            <Row>
                <Col>
                    <Navigation />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Jumbotron
                        fluid
                        style={{
                            backgroundImage: `url(${jumbotronUrl})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                        }}
                    >
                        <Container fluid>
                            <Row>
                                <Col>
                                    <h1>{title}</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>{desc}</p>
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>
                </Col>
            </Row>
            <Row>
                <Col>{children}</Col>
            </Row>
            <Row>
                <Col>
                    <Footer />
                </Col>
            </Row>
        </div>
    );
};

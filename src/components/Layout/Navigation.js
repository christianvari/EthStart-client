import React from "react";

import { Button, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default () => {
    const history = useHistory();
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>EtherStart</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link
                        onClick={(e) => {
                            history.push("/");
                        }}
                    >
                        Home
                    </Nav.Link>
                </Nav>
                {window.location.pathname !== "/new" && (
                    <Button
                        variant="outline-success"
                        onClick={() => {
                            history.push("/new");
                        }}
                    >
                        New Campaign
                    </Button>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

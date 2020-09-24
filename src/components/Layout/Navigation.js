import React from "react";

import { Button, Nav, Navbar } from "react-bootstrap";

export default () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">EtherStart</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                {window.location.pathname !== "/new" && (
                    <Button variant="outline-success" href="/new">
                        New Campaign
                    </Button>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

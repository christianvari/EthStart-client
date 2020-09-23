import React from "react";
import { Paper, Container, Typography } from "@material-ui/core";

export default ({ children, title }) => {
    return (
        <>
            <Paper
                square
                style={{
                    backgroundColor: "#000",
                    height: "10vh",
                }}
            >
                <Container maxWidth="xl">
                    <Typography variant="h4" style={{ color: "#fff" }}>
                        {title}
                    </Typography>
                </Container>
            </Paper>
            <Paper square style={{ backgroundColor: "#fff", height: "90vh" }}>
                {children}
            </Paper>
        </>
    );
};

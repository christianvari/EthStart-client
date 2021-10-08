import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { defaultBackground } from "../components/Background";

function HomePage() {
    document.body.style.background = defaultBackground;

    return (
        <Box sx={{ color: "white" }}>
            <Grid
                container
                alignItems="center"
                sx={{ height: "calc(100vh - 110px)", bgcolor: "rgba(0,0,0,.1)" }}
            >
                <Grid element xs={12}>
                    <Typography align="center" variant="h1" component="div" gutterBottom>
                        CRYPTOSTARTER
                    </Typography>
                    <Typography align="center" variant="h3" component="div" gutterBottom>
                        Empowering investors and ideapreneurs
                    </Typography>
                    <Typography
                        sx={{
                            mt: 10,
                        }}
                        align="center"
                        variant="h5"
                        component="div"
                        gutterBottom
                    >
                        Running on:
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 5,
                            mt: 3,
                            justifyContent: "center",
                        }}
                    >
                        <img
                            alt="Ethereum logo"
                            width="2%"
                            src="/images/eth-logo.png"
                        ></img>
                        <img alt="Cronos logo" width="3%" src="/images/cronos.svg"></img>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default HomePage;

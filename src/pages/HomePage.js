import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { defaultBackground } from "../components/Background";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function HomePage() {
    document.body.style.background = defaultBackground;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box sx={{ color: "white" }}>
            <Grid
                container
                alignItems="self-end"
                sx={{ height: "calc(100vh - 110px)", bgcolor: "rgba(0,0,0,.1)" }}
            >
                <Grid item xs={12}>
                    <Typography
                        align="center"
                        variant={isMobile ? "h4" : "h1"}
                        component="div"
                        gutterBottom
                    >
                        CRYPTOSTARTER
                    </Typography>
                    <Typography
                        align="center"
                        variant={isMobile ? "h5" : "h3"}
                        component="div"
                        gutterBottom
                    >
                        Empowering investors and ideapreneurs
                    </Typography>
                    <Typography
                        sx={{
                            mt: 10,
                        }}
                        align="center"
                        variant={isMobile ? "h6" : "h5"}
                        component="div"
                        gutterBottom
                    >
                        Running on:
                    </Typography>
                </Grid>
                <Grid
                    item
                    md={2}
                    xs={3}
                    alignSelf="start"
                    sx={{ ml: "auto", mr: "auto" }}
                >
                    <ImageList cols={3} rowHeight={120}>
                        <ImageListItem>
                            <img
                                src="/images/eth-logo.png"
                                alt="Ethereum logo"
                                loading="lazy"
                                style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </ImageListItem>
                        <ImageListItem>
                            <img
                                alt="Cronos logo"
                                src="/images/cronos.svg"
                                loading="lazy"
                                style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </ImageListItem>
                        <ImageListItem>
                            <img
                                alt="Cronos logo"
                                src="/images/ipfs.png"
                                loading="lazy"
                                style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </ImageListItem>
                    </ImageList>
                </Grid>
            </Grid>
        </Box>
    );
}

export default HomePage;

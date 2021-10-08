import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router-dom";
import { ChainId, shortenAddress, useEthers } from "@usedapp/core";
import SideDrawer from "./SideDrawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";
import { MenuItem, Select } from "@mui/material";
import { chainSwitch } from "../../utils/WalletProviderUtils";

const Navigation = () => {
    const history = useHistory();
    const { activateBrowserWallet, account, deactivate, error, library, chainId } =
        useEthers();
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    if (error) {
        console.error("ERROR", error);
    }

    return (
        <div className="Navigation">
            {isMobile && (
                <SideDrawer isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
            )}
            <AppBar position="static" sx={{ bgcolor: "rgba(0,0,0,.25)" }}>
                <Toolbar sx={{ gap: 4 }}>
                    {isMobile && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => setDrawerOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h5">CRYPTOSTARTER</Typography>
                    {!isMobile && (
                        <>
                            <Box sx={{ flex: "flex", gap: 1 }}>
                                <Button
                                    color="inherit"
                                    onClick={() => {
                                        history.push("/");
                                    }}
                                >
                                    Home
                                </Button>
                                <Button
                                    color="inherit"
                                    onClick={() => {
                                        history.push("/running");
                                    }}
                                >
                                    Running
                                </Button>
                                <Button
                                    color="inherit"
                                    onClick={() => {
                                        history.push("/closed");
                                    }}
                                >
                                    Closed
                                </Button>
                                <Button
                                    color="inherit"
                                    onClick={() => {
                                        history.push("/new");
                                    }}
                                    disabled={!account}
                                >
                                    Create
                                </Button>
                            </Box>

                            <Box sx={{ ml: "auto" }}>
                                {account ? (
                                    <Box>
                                        <Button
                                            color="inherit"
                                            onClick={() => {
                                                deactivate();
                                            }}
                                        >
                                            {shortenAddress(account)}
                                        </Button>
                                        <Select
                                            sx={{
                                                color: "white",
                                                fontSize: "0.875rem",
                                                fontFamily: "Roboto, Helvetica",
                                            }}
                                            variant="standard"
                                            value={chainId}
                                            label="Chain"
                                            onChange={(e) => {
                                                const network = e.target.value;
                                                chainSwitch(network, library);
                                            }}
                                        >
                                            <MenuItem value={ChainId.Ropsten}>
                                                Ethereum Ropsten
                                            </MenuItem>
                                            <MenuItem
                                                value={parseInt(
                                                    process.env
                                                        .REACT_APP_NETWORKID_CRONOS,
                                                )}
                                            >
                                                Crypto.org Cronos
                                            </MenuItem>
                                        </Select>
                                    </Box>
                                ) : (
                                    <Button
                                        color="inherit"
                                        onClick={() => {
                                            activateBrowserWallet();
                                        }}
                                    >
                                        Connect wallet
                                    </Button>
                                )}
                            </Box>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navigation;

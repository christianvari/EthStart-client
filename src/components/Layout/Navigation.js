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

    console.log("chaaaa", chainId);
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
                <Toolbar>
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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        CryptoStarter
                    </Typography>
                    {!isMobile && (
                        <Box sx={{ display: "flex" }}>
                            <Box>
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
                                        history.push("/closed");
                                    }}
                                >
                                    Closed campaigns
                                </Button>
                                <Button
                                    color="inherit"
                                    onClick={() => {
                                        history.push("/new");
                                    }}
                                    disabled={!account}
                                >
                                    New Campaign
                                </Button>
                            </Box>
                            <Box>
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
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navigation;

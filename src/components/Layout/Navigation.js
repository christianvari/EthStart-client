import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router-dom";
import { shortenAddress, useEthers } from "@usedapp/core";
import SideDrawer from "./SideDrawer";

const Navigation = () => {
    const history = useHistory();
    const { activateBrowserWallet, account, deactivate, error } = useEthers();
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    if (error) {
        console.error("ERROR", error);
    }

    return (
        <div className="Navigation">
            <SideDrawer isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
            <AppBar position="static" sx={{ bgcolor: "rgba(0,0,0,.25)" }}>
                <Toolbar>
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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        EthStart
                    </Typography>
                    {account ? (
                        <Button
                            color="inherit"
                            onClick={() => {
                                deactivate();
                            }}
                        >
                            {shortenAddress(account)}
                        </Button>
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
                    <Button
                        color="inherit"
                        onClick={() => {
                            history.push("/new");
                        }}
                    >
                        New Campaign
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navigation;

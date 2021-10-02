import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router-dom";
import { shortenAddress, useEthers } from "@usedapp/core";
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const Navigation = () => {
    const history = useHistory();
    const { activateBrowserWallet, account, deactivate, error } = useEthers();
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    console.error(error);

    return (
        <div className="Navigation">
            <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => setDrawerOpen(false)}
                    onKeyDown={() => setDrawerOpen(false)}
                >
                    <List>
                        <ListItem
                            button
                            onClick={() => {
                                history.push("/");
                            }}
                        >
                            {/* <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon> */}
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                history.push("/new");
                            }}
                        >
                            {/* <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon> */}
                            <ListItemText primary="New Campaign" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {["All mail", "Trash", "Spam"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <AppBar position="static">
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

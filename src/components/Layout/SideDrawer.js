import React from "react";
import { useHistory } from "react-router-dom";
import { ChainId, useEthers } from "@usedapp/core";
import { Divider, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";

const chainSwitch = (id, library) => {
    library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [
            {
                chainId: `0x${id.toString(16)}`,
            },
        ],
    });
};

const SideDrawer = ({ isDrawerOpen, setDrawerOpen }) => {
    const history = useHistory();
    const { library } = useEthers();

    return (
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
                        <ListItemText primary="Running campaigns" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            history.push("/closed");
                        }}
                    >
                        {/* <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon> */}
                        <ListItemText primary="Closed campaigns" />
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
                    <ListItem
                        button
                        onClick={() => {
                            chainSwitch(ChainId.Ropsten, library);
                        }}
                    >
                        <ListItemText primary="Ethereum Ropsten" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            chainSwitch(
                                parseInt(process.env.REACT_APP_NETWORKID_CRONOS),
                                library,
                            );
                        }}
                    >
                        <ListItemText primary="Crypto.org Cronos" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default SideDrawer;

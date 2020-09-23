import React from "react";
import { Typography } from "@material-ui/core";

export default ({ children }) => {
    return (
        <Typography
            component="div"
            style={{ backgroundColor: "#cfe800", height: "25vh" }}
        >
            {children}
        </Typography>
    );
};

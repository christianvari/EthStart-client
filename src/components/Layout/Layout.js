import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Box } from "@mui/system";

const Layout = ({ children }) => {
    return (
        <Box className="Layout">
            <Navigation />
            <Box sx={{ m: 3 }}>{children}</Box>
            <Footer />
        </Box>
    );
};

export default Layout;

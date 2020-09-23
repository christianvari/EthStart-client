import React from "react";
import HeaderMenu from "./HeaderMenu";
import Footer from "./Footer";
import Body from "./Body";

export default ({ children, title }) => {
    return (
        <>
            <HeaderMenu />
            <Body title={title}>{children}</Body>
            <Footer />
        </>
    );
};

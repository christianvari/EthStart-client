import React from "react";
import isMetamaskInstalled from "../../metamask/isMetamaskInstalled";
import MetamaskOnboardingModal from "../../metamask/MetamaskOnboardingModal";

const MetamaskLockedPagePrototype = ({ children }) => {
    const isMetamask = isMetamaskInstalled();
    return (
        <>
            {children}
            <MetamaskOnboardingModal show={!isMetamask} />
        </>
    );
};

export default MetamaskLockedPagePrototype;

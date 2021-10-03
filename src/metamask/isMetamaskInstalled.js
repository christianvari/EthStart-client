import MetaMaskOnboarding from "@metamask/onboarding";

const metamaskOnboarding = new MetaMaskOnboarding();

const isMetamskInstalled = (onboarding) => {
    const isMetamask = MetaMaskOnboarding.isMetaMaskInstalled();
    if (!isMetamask && onboarding) {
        metamaskOnboarding.startOnboarding();
    }
    return isMetamask;
};

export default isMetamskInstalled;

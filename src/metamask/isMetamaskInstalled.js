import MetaMaskOnboarding from "@metamask/onboarding";

const metamaskOnboarding = new MetaMaskOnboarding();

export default (onboarding) => {
    const isMetamask = MetaMaskOnboarding.isMetaMaskInstalled();
    console.log("metamask", isMetamask);
    if (!isMetamask && onboarding) {
        metamaskOnboarding.startOnboarding();
    }
    return isMetamask;
};

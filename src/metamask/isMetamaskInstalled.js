import MetaMaskOnboarding from "@metamask/onboarding";

const metamaskOnboarding = new MetaMaskOnboarding();

export default (onboarding) => {
    const isMetamask = MetaMaskOnboarding.isMetaMaskInstalled();
    if (!isMetamask && onboarding) {
        metamaskOnboarding.startOnboarding();
    }
    return isMetamask;
};

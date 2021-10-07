export const chainSwitch = (id, library) => {
    library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [
            {
                chainId: `0x${id.toString(16)}`,
            },
        ],
    });
};

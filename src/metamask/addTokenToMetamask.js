const addTokenToMetamask = async (tokenAddress, tokenSymbol, imageURL, decimals = 18) => {
    await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
            type: "ERC20", // Initially only supports ERC20, but eventually more!
            options: {
                address: tokenAddress, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: decimals, // The number of decimals in the token
                image: imageURL, // A string url of the token logo
            },
        },
    });
};

export default addTokenToMetamask;

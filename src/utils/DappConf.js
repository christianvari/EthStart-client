import { ChainId } from "@usedapp/core";

const config = {
    supportedChains: [ChainId.Ropsten, parseInt(process.env.REACT_APP_NETWORKID_CRONOS)],
    readOnlyChainId: ChainId.Ropsten,
    readOnlyUrls: {
        [ChainId.Ropsten]: process.env.REACT_APP_RPC_ROPSTEN,
        [parseInt(process.env.REACT_APP_NETWORKID_CRONOS)]:
            process.env.REACT_APP_RPC_CRONOS,
    },
    multicallAddresses: {
        [parseInt(process.env.REACT_APP_NETWORKID_CRONOS)]:
            process.env.REACT_APP_MULTICALL_CRONOS,
    },
};

export default config;

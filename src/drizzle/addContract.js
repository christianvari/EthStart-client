import Campaign from "../contractsABI/Campaign.json";

export default (address, drizzle) => {
    const currentMonitoredContracts = Object.keys(drizzle.contracts);
    if (!currentMonitoredContracts.includes(address)) {
        const contractConfig = {
            contractName: address,
            web3Contract: new drizzle.web3.eth.Contract(Campaign.abi, address),
        };
        drizzle.addContract(contractConfig);
    }
};

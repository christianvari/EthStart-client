import Campaign from "../contractsABI/Campaign.json";
import SToken from "../contractsABI/Token.json";

export default (address, drizzle, ABI) => {
    const currentMonitoredContracts = Object.keys(drizzle.contracts);
    if (!currentMonitoredContracts.includes(address)) {
        let abi;
        switch (ABI) {
            case "Campaign":
                abi = Campaign.abi;
                break;
            case "SToken":
                abi = SToken.abi;
                break;
            default:
                console.error("Cant find the ABI");
                return null;
        }
        const contractConfig = {
            contractName: address,
            web3Contract: new drizzle.web3.eth.Contract(abi, address),
        };
        drizzle.addContract(contractConfig);
    }
};

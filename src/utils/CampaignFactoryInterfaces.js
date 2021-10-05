import { useContractCall, useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import CampaignFactory from "../contractsABI/CampaignFactory.json";
import { Contract } from "@ethersproject/contracts";
import { ChainId } from "@usedapp/core";
import DappConf from "./DappConf";

const campaignFactoryAddresses = {
    [ChainId.Ropsten]: process.env.REACT_APP_CAMPAIGNFACTORY_ADDRESS_ROPSTEN,
    [parseInt(process.env.REACT_APP_NETWORKID_CRONOS)]:
        process.env.REACT_APP_CAMPAIGNFACTORY_ADDRESS_CRONOS,
};

const ABI = new utils.Interface(CampaignFactory.abi);

export function useGetCampaigns(chainId, cursor, howMany, isRunning) {
    chainId = chainId ? chainId : DappConf.readOnlyChain;
    const res = useContractCall({
        abi: ABI,
        address: campaignFactoryAddresses[chainId],
        method: "getCampaigns",
        args: [cursor, howMany, isRunning],
    });
    console.log("getCampaigns", res, chainId);
    return res ? { campaigns: res[0], length: res[1] } : null;
}

export function useCreateCampaign(chainId) {
    chainId = chainId ? chainId : DappConf.readOnlyChain;
    return useContractFunction(
        new Contract(campaignFactoryAddresses[chainId], ABI),
        "createCampaign",
    );
}

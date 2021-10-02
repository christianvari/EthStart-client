import { useContractCall, useContractFunction } from "@usedapp/core";
import CampaingFactory from "../contractsABI/CampaignFactory.json";
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

export function useGetDeployedCampaigns(chainId) {
    const res = useContractCall({
        abi: new utils.Interface(CampaingFactory.abi),
        address: campaignFactoryAddresses[chainId],
        method: "getDeployedCampaigns",
        args: [],
    });
    console.log("getDeployedCampaigns", res, chainId);
    if (!res) return null;
    const [getDeployedCampaigns] = res;
    return getDeployedCampaigns;
}

export function useCreateCampaign(chainId) {
    return useContractFunction(
        new Contract(
            campaignFactoryAddresses[chainId ? chainId : DappConf.readOnlyChain],
            CampaignFactory.abi,
        ),
        "createCampaign",
    );
}

export function useGetDeployedCampaign(index, chainId) {
    const res = useContractCall({
        abi: new utils.Interface(CampaingFactory.abi),
        address: campaignFactoryAddresses[chainId],
        method: "deployedCampaigns",
        args: [index],
    });
    console.log("deployedCampaigns", res, chainId);
    return res;
}

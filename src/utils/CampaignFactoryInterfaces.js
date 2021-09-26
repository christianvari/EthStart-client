import { useContractCall, useContractFunction } from "@usedapp/core";
import CampaingFactory from "../contractsABI/CampaignFactory.json";
import { utils } from "ethers";
import CampaignFactory from "../contractsABI/CampaignFactory.json";
import { Contract } from "@ethersproject/contracts";

export function useGetDeployedCampaigns() {
    const res = useContractCall({
        abi: new utils.Interface(CampaingFactory.abi),
        address: CampaingFactory.networks[3].address,
        method: "getDeployedCampaigns",
        args: [],
    });
    console.log("getDeployedCampaigns", res);
    if (!res) return null;
    const [getDeployedCampaigns] = res;
    return getDeployedCampaigns;
}

export function useCreateCampaign() {
    return useContractFunction(
        new Contract(CampaignFactory.networks[3].address, CampaignFactory.abi),
        "createCampaign",
    );
}

export function useGetDeployedCampaign(index) {
    const res = useContractCall({
        abi: new utils.Interface(CampaingFactory.abi),
        address: CampaingFactory.networks[3].address,
        method: "deployedCampaigns",
        args: [index],
    });
    console.log("deployedCampaigns", res);
    return res;
}

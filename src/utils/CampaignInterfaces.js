import { useContractCall, useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import Campaign from "../contractsABI/Campaign.json";
import { Contract } from "@ethersproject/contracts";

export function useGetCampaignSummary(address) {
    const res = useContractCall({
        abi: new utils.Interface(Campaign.abi),
        address,
        method: "getCampaignSummary",
        args: [],
    });
    console.log("getCampaignSummary", res);
    return res;
}

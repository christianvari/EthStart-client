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

export function useGetFundingSummary(address) {
    const res = useContractCall({
        abi: new utils.Interface(Campaign.abi),
        address,
        method: "getFundingSummary",
        args: [],
    });
    console.log("getFundingSummary", res);
    return res;
}

export function useGetContributerBalanceOf(address, account) {
    const res = useContractCall({
        abi: new utils.Interface(Campaign.abi),
        address,
        method: "contributerBalanceOf",
        args: [account],
    });
    console.log("contributerBalanceOf", res);
    return res;
}

export function useContribute(address) {
    return useContractFunction(new Contract(address, Campaign.abi), "contribute");
}

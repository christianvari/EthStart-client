import { useContractCall, useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import Campaign from "../contractsABI/Campaign.json";
import { Contract } from "@ethersproject/contracts";
import { getIPFSURL } from "./IPFSUtils";

const ABI = new utils.Interface(Campaign.abi);

export function useGetCampaignSummary(address) {
    const res = useContractCall({
        abi: ABI,
        address,
        method: "getCampaignSummary",
        args: [],
    });
    console.log("getCampaignSummary", res);
    return res;
}

export function useGetFundingSummary(address) {
    const res = useContractCall({
        abi: ABI,
        address,
        method: "getFundingSummary",
        args: [],
    });
    console.log("getFundingSummary", res);
    return res;
}

export function useGetTitle(address) {
    const res = useContractCall({
        abi: ABI,
        address,
        method: "title",
        args: [],
    });
    console.log("title", res);
    return res
        ? { title: res[0].split("%%%%%")[0], subtitle: res[0].split("%%%%%")[1] }
        : null;
}
export function useGetImageUrl(address) {
    const res = useContractCall({
        abi: ABI,
        address,
        method: "imageURL",
        args: [],
    });
    console.log("imageURL", res);
    return res ? getIPFSURL(res) : null;
}

export function useGetContributerBalanceOf(address, account) {
    const res = useContractCall({
        abi: ABI,
        address,
        method: "contributerBalanceOf",
        args: [account],
    });
    console.log("contributerBalanceOf", res);
    return res;
}

export function useContribute(address) {
    return useContractFunction(new Contract(address, ABI), "contribute");
}

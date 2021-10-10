import { useContractCall, useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import Campaign from "../contractsABI/Campaign.json";
import { Contract } from "@ethersproject/contracts";
import { getIPFSURL, retrive } from "./IPFSUtils";
import { useEffect, useState } from "react";

const ABI = new utils.Interface(Campaign.abi);

export function useGetTitle(address) {
    const res = useContractCall({
        abi: ABI,
        address,
        method: "title",
        args: [],
    });
    console.info("title", res);
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
    console.info("imageURL", res);
    return res ? getIPFSURL(res[0]) : undefined;
}

export function useGetIsFunded(address) {
    const res = useContractCall({
        abi: ABI,
        address,
        method: "isCampaignFunded",
        args: [],
    });
    console.info("isCampaignFunded", res);
    return res ? res[0] : undefined;
}
export function useGetTimeout(address) {
    const res = useContractCall({
        abi: ABI,
        address,
        method: "timeout",
        args: [],
    });
    console.info("timeout", res);
    return res ? res[0] : undefined;
}
export function useGetDescription(address) {
    const [result, setResult] = useState();

    const res = useContractCall({
        abi: ABI,
        address,
        method: "description",
        args: [],
    });

    useEffect(() => {
        async function grtDataFromIPFS() {
            const response = await retrive(res[0]);
            setResult(response);
        }

        if (res && res[0]) {
            grtDataFromIPFS();
        }
    }, [res]);

    console.info("description", res, result);
    return result;
}
export function useGetTokenSymbol(address) {
    const res = useContractCall({
        abi: ABI,
        address,
        method: "tokenSymbol",
        args: [],
    });
    console.info("tokenSymbol", res);
    return res ? res[0] : undefined;
}

export function useGetTokenAddress(address) {
    const res = useContractCall({
        abi: ABI,
        address,
        method: "tokenAddress",
        args: [],
    });
    console.info("tokenAddress", res);
    return res ? res[0] : undefined;
}

export function useGetTokenMaxSupply(address) {
    const res = useContractCall({
        abi: ABI,
        address,
        method: "tokenMaxSupply",
        args: [],
    });
    console.info("tokenMaxSupply", res);
    return res ? res[0] : undefined;
}

export function useGetCreationTimestamp(address) {
    const res = useContractCall({
        abi: ABI,
        address,
        method: "creationTimestamp",
        args: [],
    });
    console.info("creationTimestamp", res);
    return res ? res[0] : undefined;
}

export function useGetContributerBalanceOf(address, account) {
    const res = useContractCall({
        abi: ABI,
        address,
        method: "contributerBalanceOf",
        args: [account],
    });
    console.info("contributerBalanceOf", res);
    return res ? res[0] : undefined;
}

export function useContribute(address) {
    return useContractFunction(new Contract(address, ABI), "contribute");
}

export function useRedeem(address) {
    return useContractFunction(new Contract(address, ABI), "contribute");
}

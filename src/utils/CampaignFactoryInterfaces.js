import { useContractCall, useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import CampaignFactory from "../contractsABI/CampaignFactory.json";
import { Contract } from "@ethersproject/contracts";
import { ChainId } from "@usedapp/core";
import DappConf from "./DappConf";
import { useRef } from "react";

const campaignFactoryAddresses = {
    [ChainId.Ropsten]: process.env.REACT_APP_CAMPAIGNFACTORY_ADDRESS_ROPSTEN,
    [parseInt(process.env.REACT_APP_NETWORKID_CRONOS)]:
        process.env.REACT_APP_CAMPAIGNFACTORY_ADDRESS_CRONOS,
};

const ABI = new utils.Interface(CampaignFactory.abi);

export function useGetCampaigns(chainId, cursor, howMany, isRunning) {
    const state = useRef({ list: [], prevCursor: null });
    chainId = chainId ? chainId : DappConf.readOnlyChain;
    const res = useContractCall({
        abi: ABI,
        address: campaignFactoryAddresses[chainId],
        method: "getCampaigns",
        args: [cursor, howMany, isRunning],
    });
    if (res && state.current.prevCursor !== cursor) {
        state.current.list = [...state.current.list, ...res[0]];
        state.current.prevCursor = cursor;
    }
    console.info("getCampaigns", res, cursor, howMany);
    return {
        campaigns: state.current.list,
        length: res ? res[1].toNumber() : state.current.list.length,
    };
}

export function useCreateCampaign(chainId) {
    chainId = chainId ? chainId : DappConf.readOnlyChain;
    return useContractFunction(
        new Contract(campaignFactoryAddresses[chainId], ABI),
        "createCampaign",
    );
}

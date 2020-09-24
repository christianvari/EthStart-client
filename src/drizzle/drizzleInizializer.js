import { Drizzle } from "@drizzle/store";
import CampaignFactory from "../contractsABI/CampaignFactory.json";

const drizzleOptions = {
    contracts: [CampaignFactory],
    web3: {
        fallback: {
            type: "ws",
            url: "wss://ropsten.infura.io/ws/v3/f162b78798ce41eb93bc46a3ead69794",
        },
    },
};

const drizzle = new Drizzle(drizzleOptions);

export default drizzle;

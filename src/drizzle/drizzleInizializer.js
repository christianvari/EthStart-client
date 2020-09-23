import { Drizzle } from "@drizzle/store";
import CampaignFactory from "../contractsABI/CampaignFactory.json";

const drizzleOptions = {
    contracts: [CampaignFactory],
};

const drizzle = new Drizzle(drizzleOptions);

export default drizzle;

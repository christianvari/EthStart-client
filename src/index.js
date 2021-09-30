import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewCampaign from "./pages/NewCampaign";
import CampaignInfoPage from "./pages/CampaignInfoPage";
import { ChainId, DAppProvider } from "@usedapp/core";
import Layout from "./components/Layout/Layout";

const config = {
    readOnlyChain: ChainId.Ropsten,
    readOnlyUrls: {
        [ChainId.Ropsten]:
            "https://ropsten.infura.io/v3/f162b78798ce41eb93bc46a3ead69794",
    },
};

ReactDOM.render(
    <React.StrictMode>
        <Router basename="/EthStart-client">
            <DAppProvider config={config}>
                <Layout>
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route path="/campaign/:address">
                            <CampaignInfoPage />
                        </Route>
                        <Route path="/new">
                            <NewCampaign />
                        </Route>
                        <Route path="*" />
                    </Switch>
                </Layout>
            </DAppProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

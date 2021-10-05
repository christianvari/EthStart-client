import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewCampaign from "./pages/NewCampaign";
import CampaignInfoPage from "./pages/CampaignInfoPage";
import { DAppProvider } from "@usedapp/core";
import Layout from "./components/Layout/Layout";
import DappConf from "./utils/DappConf";

import "./index.css";
import ClosedCampaigns from "./pages/ClosedCampaigns";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <DAppProvider config={DappConf}>
                <Layout>
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route exact path="/closed">
                            <ClosedCampaigns />
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

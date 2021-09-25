import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewCampaign from "./pages/NewCampaign";
import CampaignInfoPage from "./pages/CampaignInfoPage";

ReactDOM.render(
    <React.StrictMode>
        <Router basename="/EthStart-client">
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
        </Router>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

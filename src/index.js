import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DrizzleContext } from "@drizzle/react-plugin";
import drizzle from "./drizzle/drizzleInizializer";
import NewCampaign from "./pages/NewCampaign";
import CampaignInfoPage from "./pages/CampaignInfoPage";

ReactDOM.render(
    <React.StrictMode>
        <DrizzleContext.Provider drizzle={drizzle}>
            <Router basename="/EthStart-client">
                <Switch>
                    <Route exact path="/">
                        <DrizzleContext.Consumer>
                            {(drizzleContext) => (
                                <HomePage drizzleContext={drizzleContext} />
                            )}
                        </DrizzleContext.Consumer>
                    </Route>
                    <Route path="/campaign/:address">
                        <DrizzleContext.Consumer>
                            {(drizzleContext) =>
                                drizzleContext.initialized && (
                                    <CampaignInfoPage drizzleContext={drizzleContext} />
                                )
                            }
                        </DrizzleContext.Consumer>
                    </Route>
                    <Route path="/new">
                        <DrizzleContext.Consumer>
                            {(drizzleContext) => (
                                <NewCampaign drizzleContext={drizzleContext} />
                            )}
                        </DrizzleContext.Consumer>
                    </Route>
                    <Route path="*" />
                </Switch>
            </Router>
        </DrizzleContext.Provider>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

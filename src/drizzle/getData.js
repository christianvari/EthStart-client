const keys = {};

export default (drizzle, contract, method) => {
    const state = drizzle.store.getState();
    const isContractCached = keys[contract];
    if (!isContractCached) keys[contract] = {};
    let key = keys[contract][method];
    if (!key) {
        key = drizzle.contracts[contract].methods[method].cacheCall({
            from: state.accounts[0],
        });
        keys[contract][method] = key;
    }
    console.log("getData", method, state.contracts[contract][method][key], state);
    return state.contracts[contract][method][key];
};

const keys = {};

export default (drizzle, contract, method) => {
    const state = drizzle.store.getState();
    const isContractCached = keys[contract];
    if (!isContractCached) keys[contract] = {};
    let key = keys[contract][method];
    if (!key) {
        key = drizzle.contracts[contract].methods[method].cacheCall();
        keys[contract][method] = key;
    }
    console.log(state);
    return state.contracts[contract][method][key];
};

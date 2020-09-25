export default (number, decimals) => {
    const numberLiterals = number.toLocaleString("fullwide", { useGrouping: false });
    const numberLen = numberLiterals.length;
    if (numberLen < decimals) return numberLiterals;
    return `${numberLiterals.slice(0, numberLen - decimals)}.${numberLiterals.slice(
        numberLen - decimals,
        numberLen - decimals + 2,
    )}`;
};

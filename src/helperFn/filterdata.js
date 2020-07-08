import store from '../store.js';

export function filterdata(data) {
    const storeData = store.getState().filter;
    if(Object.keys(storeData).length == 0) {
        return data;
    }
    let isInclude;
    let filteredData = data.filter(function(val) {
        isInclude = true;
        for (let col of Object.keys(storeData)) {
            if(storeData[col]["val"].length == 0 ||
               (storeData[col]["val"].length == 2 &&
                storeData[col]["val"][1] == "")) {
                isInclude = isInclude && true;
            } else if(storeData[col]["val"].length == 1) {
                if(storeData[col]["val"][0] == val[col]) {
                    isInclude = isInclude && true;
                } else {
                    isInclude = isInclude && false;
                }
            } else if(storeData[col]["val"].length == 2) {
                if(storeData[col]["val"][0] <= val[col] && storeData[col]["val"][1] >= val[col]) {
                    isInclude = isInclude && true;
                } else {
                    isInclude = isInclude && false;
                }
            }
        }
        return isInclude;
    })
    return filteredData;
}
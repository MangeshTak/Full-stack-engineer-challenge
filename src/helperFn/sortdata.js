import store from '../store.js';

export function sortdata(data) {
    const stringVal = ["assetName", "type"];
    const intVal = ["id", "price", "lastUpdate"];
    const sortObj = store.getState().sort;
    if(stringVal.indexOf(sortObj.col) != -1) {
        if(sortObj.type == "asc") {
            data.sort((a,b) => (a[sortObj.col] > b[sortObj.col]) ? 1 : ((b[sortObj.col] > a[sortObj.col]) ? -1 : 0));
        } else if(sortObj.type == "dsc") {
            data.sort((a,b) => (a[sortObj.col] < b[sortObj.col]) ? 1 : ((b[sortObj.col] < a[sortObj.col]) ? -1 : 0));
        }
    } else if(intVal.indexOf(sortObj.col) != -1) {
        if(sortObj.type == "asc") {
            data.sort((a,b) => a[sortObj.col]-b[sortObj.col]);
        } else if(sortObj.type == "dsc") {
            data.sort((a,b) => b[sortObj.col]-a[sortObj.col]);
        }
    }
    return data;
}
import store from '../store.js';

export function favouritedata(data) {
    const favStore = store.getState().favourites.favIds;
    let favData = [];
    let restData = data.filter(function(val) {
        if(favStore.indexOf(val.id)!=-1) {
            val.check = true;
            favData.push(val);
            return false;
        } else {
            val.check = false;
            return true;
        }
    });
    return [...favData, ...restData];
}
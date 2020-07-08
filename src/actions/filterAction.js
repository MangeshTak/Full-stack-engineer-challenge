export function filterAction(col, actiontype, val) {
	return  function(dispatch){
        let obj = {};
        obj[col] = {};
        obj[col]["actiontype"] = actiontype;
        if(val[0] == "None") {
            obj[col]["val"] = [];
        } else {
            obj[col]["val"] = val;
        }
        dispatch({type : "filter", col: col, payload: obj[col]});
    }
}
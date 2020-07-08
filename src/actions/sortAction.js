export function sortAction(data) {
	return  function(dispatch){
        dispatch({type : "sort", payload: data });
    }
}
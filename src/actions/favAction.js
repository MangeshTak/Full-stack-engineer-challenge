export function favAction(id, actiontype) {
	return  function(dispatch){
        dispatch({type: "fav", operation: actiontype, id: id});
    }
}
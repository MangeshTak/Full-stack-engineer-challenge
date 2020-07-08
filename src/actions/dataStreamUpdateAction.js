export function dataStreamUpdateAction(data) {
	return  function(dispatch){
        dispatch({type : 'update' , payload : data });
    }
}
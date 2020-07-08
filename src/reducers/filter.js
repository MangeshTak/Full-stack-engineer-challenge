const initialState = {}

export default function(state=initialState , action )  {
	switch (action.type) {
		case "filter": {
            let newState = {...state};
            newState[action.col] = action.payload;
            return newState;
		}
		default :
			return state; 
	}
}
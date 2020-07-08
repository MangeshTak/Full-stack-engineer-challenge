const initialState = {
    col : "",
    type: ""
}

export default function(state=initialState , action )  {
	switch (action.type) {
		case "sort": {
			if(action.payload === state.col) {
				if(state.type === "asc") {
					return {...state, col: action.payload, type: "dsc"}    
				} else {
					return {...state, col: "", type: ""}
				}
			} else {
				return {...state, col: action.payload, type: "asc"}
			}
		}
		default :
			return state; 
	}
}
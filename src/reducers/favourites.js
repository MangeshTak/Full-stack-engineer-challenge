const initialState = {
    favIds : []
}

export default function(state=initialState , action )  {
	switch (action.type) {
		case "fav": {
            let ids = JSON.parse(localStorage.getItem("favIds"));
            if(action.operation == "add") {
                ids.push(action.id);
            } else if(action.operation == "remove") {
                const index = ids.indexOf(action.id);
                if (index > -1) {
                    ids.splice(index, 1);
                }
            }
            localStorage.setItem("favIds", JSON.stringify(ids));
            return {...state, favIds: ids};
		}
        default :
            if(localStorage.getItem("favIds")==null) {
                localStorage.setItem("favIds", "[]");
            }
            let ids = JSON.parse(localStorage.getItem("favIds"));
			return {...state, favIds: ids}; 
	}
}
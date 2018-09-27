import {CREATING_NOTE} from "../actions";
import {CREATED_NOTE} from "../actions";

const intialState = {
	creating:false,
	created:false,
	data:[]
};

export default function(state=intialState,action){
 	switch (action.type) {
 		case CREATING_NOTE:
 			return {...state,creating:true}
 			break;
 		case CREATED_NOTE:
 			return {...state,creating:false,created:true,data:action.payload}
 	}
 	return state;
}

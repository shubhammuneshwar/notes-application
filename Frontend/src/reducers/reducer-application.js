import {FETCHING_BLOGS} from "../actions";
import {FETCHED_BLOGS} from "../actions";
import {ERROR} from "../actions";
import {NOTE_DELETED} from "../actions";

const intialState = {
	isFetching:false,
	isFetched:false,
	error:null,
	notes:[]
}

export default function(state=intialState,action){
	switch(action.type){
		case FETCHING_BLOGS:
			return {...state,isFetching:true};
			break;
		case FETCHED_BLOGS:
			return {...state,isFetching:false,isFetched:true,notes:action.payload.data};
			break;
		case ERROR:
			return {...state,isFetching:false,isFetched:false,error:action.payload};
			break;
		case NOTE_DELETED:
			return {...state,notes:action.payload.data}
			break;
	}
	return state;
}

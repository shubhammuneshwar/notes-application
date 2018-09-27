import {
	FETCHING_NOTE,
	FETCHED_NOTE,
	DELETING_NOTE,
	DELETED_NOTE,
} from '../actions';

const intialState = {
	isFetching :false,
	isFetched:false,
	deleting:false,
	deleted:false,
	data:null
}

export default function(state=intialState,action){
	switch (action.type) {
			case FETCHING_NOTE:
				return {...state,isFetching:true}
				break;
			case FETCHED_NOTE:
				return {...state,isFetching:false,isFetched:true,data:action.payload}
				break;
			case DELETING_NOTE:
				return {...state,deleting:true}
				break;
			case DELETED_NOTE:
				return {...state,deleted:true}
				break;
		}
	return state;
}

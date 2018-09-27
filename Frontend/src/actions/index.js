import axios from "axios";

export const FETCHING_BLOGS = "FETCHING_BLOGS";
export const FETCHED_BLOGS = "FETCHED_BLOGS";
export const ERROR = "ERROR";

export const CREATING_NOTE = "CREATING_NOTE";
export const CREATED_NOTE = "CREATE_NOTE";

export const DELETING_NOTE = 'DELETING_NOTE';
export const DELETED_NOTE = 'DELETED_NOTE';

export const FETCHING_NOTE = 'FETCHING_NOTE';
export const FETCHED_NOTE = 'FETCHED_NOTE';

export const EDITING_NOTE = 'EDITING_NOTE';
export const EDITED_NOTE = 'EDITED_NOTE';

import {tokenHeader} from '../utils/headers';

const root_url = "http://localhost:8000/";

export function getApplications(){
	const sub_url = "application/api/";
	const url = `${root_url}${sub_url}`;

	const request = axios.get(url,tokenHeader());

	return (dispatch) =>{
		dispatch({type:FETCHING_BLOGS});
		request.then((response)=>{
			dispatch({type:FETCHED_BLOGS,payload:response});
		})
		.catch((err)=>{
			dispatch({type:ERROR,payload:err});
		})
	};

}

export function createNote(fromValue,callback){
	const sub_url = "application/api/create/";
	const url = `${root_url}${sub_url}`;
	//console.log(props);

	const request = axios
		.post(url,fromValue,tokenHeader())
		.then(() => callback());

	return {
		type:CREATED_NOTE,
		payload:request
	}
	/*return (dispatch) => {
		dispatch({type:CREATING_NOTE});
		request.then((response)=>{
			dispatch({type:CREATED_NOTE,payload:response.data});
		});
	}*/

}

export function deleteNote(id,callback){
	const sub_url = `application/api/delete/${id}`;
	const url = `${root_url}${sub_url}`;
	const request = axios.delete(url,tokenHeader());

	return (dispatch) => {
		dispatch({type:DELETING_NOTE});
		request.then(()=>{
			dispatch({type:DELETED_NOTE});
			callback();
		});
	}

}

export function viewNote(id){
	const sub_url = `application/api/detail/${id}`;
	const url = `${root_url}${sub_url}`;
	const request = axios.get(url,tokenHeader());
	return (dispatch) =>{
		dispatch({type:FETCHING_NOTE});
		request.then((response)=>{
			dispatch({type:FETCHED_NOTE,payload:response.data});
		});
	}
}

export function editNote(fromValue,id,callback){
	console.log(fromValue);
	const sub_url = `application/api/update/${id}/`;
	const url = `${root_url}${sub_url}`;
	const request = axios.put(url,fromValue,tokenHeader());
	return (dispatch) =>{
		dispatch({type:EDITING_NOTE});
		request.then((response)=>{
			dispatch({type:EDITED_NOTE});
			callback();
		});
	}
}

export function viewSharedNote(id){
	const sub_url = `application/api/sharednote/${id}`;
	const url = `${root_url}${sub_url}`;
	const request = axios.get(url);
	return (dispatch) =>{
		dispatch({type:FETCHING_NOTE});
		request.then((response)=>{
			dispatch({type:FETCHED_NOTE,payload:response.data});
		});
	}
}

import axios from 'axios';
import {
	AUTH_USER,
	UNAUTH_USER,
	SIGNUP_USER,
	AUTH_ERROR,
	SIGNUP_ERROR
} from '../types';

const ROOT_URL = 'http://localhost:8000/accounts/api/';

export function signup(formValue,callback){
	const URL = `${ROOT_URL}register/`;
	return (dispatch) =>{
		if(formValue['password'] != formValue['ConfirmPassword']){
			var errorMsg = {passwords: "Passwords do not match"}
			dispatch({type:SIGNUP_ERROR,payload:errorMsg});
			return
		}
		axios.post(URL,formValue)
		.then((response)=>{
			const{username}= response.data;
			dispatch({type:SIGNUP_USER});
			localStorage.setItem('token',response.data.token);
			localStorage.setItem('username',username);
			callback();
		})
		.catch((error)=>{
			var errorMsg = {}
			if(error.response.status == 500) errorMsg = {email: "Email Field Required"}
			else errorMsg = JSON.stringify(error.response.data)
			dispatch({type:SIGNUP_ERROR,payload:errorMsg});
		})
	}
}

export function signin(formValue,callback){
	const URL =`${ROOT_URL}home/login/token/`
	return (dispatch) => {
		axios.post(URL,formValue)
		.then((response)=>{
			const {username}=response.data.user;
			dispatch({type:AUTH_USER});
			localStorage.setItem('token',response.data.token);
			localStorage.setItem('username',username);
			callback();
		})
		.catch((err)=>{
			dispatch({type:AUTH_ERROR,payload:'Invalid username or password.'});
		})
	}
}

export function signout(callback){
	localStorage.removeItem('token');
	localStorage.removeItem('username');
	return (dispatch) =>{
		dispatch({type:UNAUTH_USER});
		callback();
	}
}

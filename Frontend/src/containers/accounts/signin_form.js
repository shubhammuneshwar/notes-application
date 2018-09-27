import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Field,reduxForm} from 'redux-form';
import {renderInput} from '../../utils/redux-form-fields';
import {signin} from '../../actions/Authentication';

import Signup from './signup_form';
import {Link,Route,withRouter} from 'react-router-dom'

import { ToastContainer, toast } from "react-toastify";
import ToastElement from '../../components/toastelement';
import 'react-toastify/dist/ReactToastify.css';

class Signin extends Component{

	loginErrorToast(loginError){
		if(loginError){
			let errorMSG = loginError
			toast.error(errorMSG, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true
			});
		}
	}

	formSubmit(formValue){
		this.props.signin(formValue,()=>{
			this.props.history.push("/");
		});
		const {loginError} = this.props.auth;
		this.loginErrorToast(loginError)
	}

	render(){
		const {handleSubmit} = this.props;
		const {loginError} = this.props.auth;
		this.loginErrorToast(loginError)

		return(
			<div id="LoginForm">
				<ToastElement/>
				<div id="logo"></div>
			  <div className="container">
				  <div className="login-form">
				    <div className="main-div">
				      <div className="panel">
				        <h2>Login</h2>
				        <p>Please enter your username and password</p>
				      </div>
				      <form id="Login" onSubmit={handleSubmit(this.formSubmit.bind(this))}>
								<div>
									<Field component={renderInput} label="Username" name="username" type="text" placeholder="Username"/>
									<Field component={renderInput} label="Password" name="password" type="password" placeholder="Password"/>
					        <div className="forgot">
					          <a href="#">Forgot password?</a>
					        </div>
					        <button type="submit" className="btn btn-primary">Login</button>
									<div className="newuser-signup">
					          <a href="/signup">New User? Sign up</a>
					        </div>
								</div>
				      </form>
				    </div>
				    <p className="botto-text"> Designed by Shubham Muneshwar</p>
				    </div>
				  </div>
					<Route path = "/signup" component ={Signup}/>
			  </div>
		);
	}
}

Signin = withRouter(Signin);

Signin = reduxForm({
	form:'SigninForm',
	fields:['username','password']
})(Signin);

function mapStateToProps(state){
	return{
		auth:state.auth
	}
}

export default connect(mapStateToProps,{signin})(Signin);

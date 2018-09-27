import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Field,reduxForm} from 'redux-form';
import {renderInput} from '../../utils/redux-form-fields';

import {signup} from '../../actions/Authentication';

import { ToastContainer, toast } from "react-toastify";
import ToastElement from '../../components/toastelement';
import 'react-toastify/dist/ReactToastify.css';

class Signup extends Component{

	signupErrorToast(signupError){
		if(signupError){
			let errors = (typeof signupError == 'string')?JSON.parse(signupError):signupError
			Object.keys(errors).forEach(function(key) {
				let errorMSG = key + ': ' + errors[key].toString()
				toast.error(errorMSG, {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				});
	    });
		}
	}

	formSubmit(formValue){
		this.props.signup(formValue,()=>{
			this.props.history.push('/signin');
		})
		const {signupError} = this.props.auth;
		this.signupErrorToast(signupError)
	}

	render(){
		const {handleSubmit} = this.props;
		const {signupError} = this.props.auth;
		this.signupErrorToast(signupError)

		return(
			<div id="LoginForm">
				<ToastElement/>
				<div id="logo"></div>
			  <div className="container">
				  <div className="login-form">
				    <div className="main-div">
				      <div className="panel">
				        <h2>New User</h2>
				      </div>
				      <form id="Login" onSubmit={handleSubmit(this.formSubmit.bind(this))}>
								<div>
									<Field component={renderInput} label="Email" name="email" type="Email" placeholder="Email Address"/>
									<Field component={renderInput} label="Username" name="username" type="text" placeholder="Username"/>
									<Field component={renderInput} label="Password" name="password" type="password" placeholder="Password"/>
									<Field component={renderInput} label="ConfirmPassword" name="ConfirmPassword" type="password" placeholder="Confirm Password"/>
					        <button type="submit" className="btn btn-primary">Sign up</button>
									<div className="newuser-signup">
					          <a href="/signin">Already have an account.</a>
					        </div>
								</div>
				      </form>
				    </div>
				    </div>
				  </div>
			  </div>
		);
	}
}

Signup = reduxForm({
	form:'SignupForm',
	fields:['email','username','password', 'ConfirmPassword'],
	error:[]
})(Signup);

Signup = withRouter(Signup);

function mapStateToProps(state){
	return{
		auth:state.auth
	}
}
export default connect(mapStateToProps,{signup})(Signup);

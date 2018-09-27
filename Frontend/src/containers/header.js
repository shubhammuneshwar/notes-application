import React,{Component} from 'react';
import {Link,Route,withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import Applications from "./note/note_index";
import NoteNew from "./note/note_new";
import ViewNote from './note/sharednote';
import EditNote from './note/edit_note';
import Signup from './accounts/signup_form';
import Signin from './accounts/signin_form';
import NotesHome from './note/notes_home';

import requireAuth from './HOC/authenticate';

import {signout} from '../actions/Authentication';
import 'bootstrap/dist/css/bootstrap.min.css';
import SplitterLayout from 'react-splitter-layout';

class Header extends Component{
	logoutUser(){
		this.props.signout(()=>{
			this.props.history.push('/signin');
		})
	}
	renderAuthMode(authenticated, props){
		if(authenticated && ((props.location.pathname != '/signin') && (props.location.pathname != '/signup'))){
			return(
				<div className="nav-header">
				 <Link to="/" className="btn btn-link"><div id='nav-logo'></div></Link>
				 <Link to="/create_note" className="btn btn-link" title="New Note"><i className="new-note fa fa-plus-circle" aria-hidden="true"></i></Link>
				 <button type="button" className="btn btn-primary btn-logout pull-right" onClick={this.logoutUser.bind(this)}>Sign out</button>
			</div>
			);
		}
		return(
			<div></div>
		);
	}

	renderMainContainer(authenticated, props){
		if(authenticated && ((props.location.pathname != '/signin') && (props.location.pathname != '/signup'))){
			return(
				<SplitterLayout>
					<div className="pane-left">
						<div>
							<Applications/>
						</div>
					</div>
					<div className="pane-right">
						<div>
							<Route path = "/" component= {requireAuth(NotesHome)}/>
							<Route path = "/create_note" component= {requireAuth(NoteNew)}/>
							<Route path = "/sharednote/:id" component = {requireAuth(ViewNote)}/>
							<Route path = "/edit_note/:id" component = {requireAuth(EditNote)}/>
						</div>
					</div>
				</SplitterLayout>
			);
		}
	}

	render(){
		const {authenticated} = this.props;
		return(
			<div className="contianer">
				{this.renderAuthMode(authenticated, this.props)}
				<Route path = "/signup" component ={Signup}/>
				<Route path = "/signin" component ={Signin}/>
				{this.renderMainContainer(authenticated, this.props)}
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		authenticated:state.auth.authenticated
	}
}

export default withRouter(connect(mapStateToProps,{signout})(Header));

import React,{Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getApplications} from "../../actions";

//contianers
import Notes from "./notes";
//dumb components
import Loading from "../../components/loading";
import Err from "../../components/error";

class Applications extends Component{
	componentDidMount() {
		this.props.getApplications();
	}
	render(){
		const isFetching = this.props.applications.isFetching;
		const isFetched = this.props.applications.isFetched;
		return(
			<div className="container">
				{isFetching?(<Loading/>):(isFetched?(<Notes notes={this.props.applications.notes}/>):(<Err/>))}
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		applications:state.applications,
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({getApplications},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Applications);

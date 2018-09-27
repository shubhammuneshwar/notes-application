import React,{Component} from 'react';
import {connect} from 'react-redux';
import {viewSharedNote} from '../../actions';

import Loading from "../../components/loading";
import NoteDetail from "./notedetail";

class ViewNote extends Component{
	componentWillMount() {
		const {id} = this.props.match.params;
		this.props.viewSharedNote(id);
	}
	render(){
		const {isFetching,isFetched} = this.props.note;
		return(
			<div className="container">
				{isFetching?<Loading/>:(isFetched?<NoteDetail data={this.props}/>:<Loading/>)}
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		note:state.note
	}
}

export default connect(mapStateToProps,{viewSharedNote})(ViewNote);

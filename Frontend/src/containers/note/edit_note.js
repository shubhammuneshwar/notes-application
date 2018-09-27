import React,{Component} from 'react';
import {connect} from 'react-redux';
import {viewNote} from '../../actions';
import Loading from '../../components/loading';
import EditNoteForm from './edit_form';

class EditNote extends Component{
	componentWillMount() {
		const {id} = this.props.match.params;
		this.props.viewNote(id);
	}
	render(){
		const {isFetching,isFetched} = this.props.note;
		return(
			<div className="container">
				{isFetching?<Loading/>:(isFetched?<EditNoteForm data={this.props.note}/>:<Loading/>)}
			</div>
		);
	}
}
function mapStateToPorps(state){
	return{
		note:state.note
	}
}


export default connect(mapStateToPorps,{viewNote})(EditNote);

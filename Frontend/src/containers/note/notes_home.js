import React,{Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getApplications} from "../../actions";

//contianers
import Notes from "./notes";
//dumb components
import Loading from "../../components/loading";
import Err from "../../components/error";

class NotesHome extends Component{
	componentDidMount() {
		this.props.getApplications();
	}

  renderIndexScreen(){
    if(this.props.location.pathname == '/'){
      const notes = this.props.applications.notes
      let notesCount = 0
      if(notes) notesCount = notes.length
      return(
        <div className="container notes-index-container">
          {(notesCount)?(<div>Click on the note for the details.</div>):(<div>Create your first note now.</div>)}
        </div>
      )
    }
  }


	render(){
		const isFetching = this.props.applications.isFetching;
		const isFetched = this.props.applications.isFetched;
		return(
      <div className="panel-body">
        {this.renderIndexScreen()}
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

export default connect(mapStateToProps,mapDispatchToProps)(NotesHome);

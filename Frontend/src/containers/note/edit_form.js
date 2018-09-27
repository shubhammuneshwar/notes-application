import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Field,reduxForm} from 'redux-form';
import {Link,withRouter} from 'react-router-dom';
import {renderInput, renderTextArea} from '../../utils/redux-form-fields';
import {editNote} from '../../actions';

import {deleteNote} from '../../actions';
import {changeMode} from '../../actions';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


class EditForm extends Component{

	shareNote = (key) => {
    let link = ""
    let noteurl = window.location.origin + '/sharenote/' + this.props.data.data.unique_id
    if(key=="facebook"){
      link = `https://www.facebook.com/sharer/sharer.php?u=${noteurl}`
    }
    else if(key=="mail"){
      link = `mailto:?subject=Note From NoteMaker&body=Check out My Note created using NoteMaker ${noteurl}.`
    }
    else if(key=="twitter"){
      link = `http://twitter.com/share?text=Check out My Note created using NoteMaker&url=${noteurl}`
    }
    else if(key=="linkedin"){
      link = `https://www.linkedin.com/shareArticle?mini=true&url=${noteurl}&source=LinkedIn`
    }
    window.open(link, "pop", "width=600, height=400, scrollbars=no");
  }

	confirmDelete(){
		const {data} = this.props.data;
		this.props.deleteNote(data.id,()=>{
			window.location.reload();
		});
	}

	delete = () => {
    confirmAlert({
      title: 'Confirm delete',
      message: 'Are you sure to do delete this note?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.confirmDelete()
        },
        {
          label: 'No'
        }
      ]
    })
  };

	formSubmit(formValue){
		const {data} = this.props.data;
		this.props.editNote(formValue,data.id,()=>{
			this.props.history.push(`/edit_note/${data.id}`);
		});
	}
	componentDidMount() {
		const {data} = this.props.data;
		this.props.initialize({
			title:data.title,
			content:data.content
		});
	}
	render(){
		const {handleSubmit} = this.props;
		const {data} = this.props.data;
		return(
			<form onSubmit={handleSubmit(this.formSubmit.bind(this))}>
				<div className="note-detail-container">
					<div className="note-detail-top-row">
					 	<button className="btn btn-primary save-note" type="submit">Save</button>
						<div className="icons pull-left">
							<i className="fa fa-trash" onClick={this.delete.bind(this)} aria-hidden="true"><a></a></i>
						</div>
						<div className="icons">
							<span className="text">Share: </span>
							<i className="fa fa-facebook" onClick={this.shareNote.bind(this, "facebook")} aria-hidden="true"><a></a></i>
		          <i className="fa fa-envelope-o" onClick={this.shareNote.bind(this, "mail")} aria-hidden="true"><a></a></i>
		          <i className="fa fa-twitter" onClick={this.shareNote.bind(this, "twitter")} aria-hidden="true"><a></a></i>
		          <i className="fa fa fa-linkedin" onClick={this.shareNote.bind(this, "linkedin")} aria-hidden="true"><a></a></i>
						</div>
					</div>
					<div className="note-title">
						<Field component={renderInput}
							label="Title"
							type = "text"
							name = "title"
						/>
					</div>
					<div className="note-content">
						<Field component={renderTextArea}
						label="Content"
						type = "text"
						name = "content"
						/>
					</div>
				</div>
		</form>
		);
	}
}

EditForm = withRouter(EditForm);
EditForm = reduxForm({
	form:'EditForm',
	fields:['title','content'],
})(EditForm);


export default connect(null,{editNote,deleteNote,changeMode})(EditForm);

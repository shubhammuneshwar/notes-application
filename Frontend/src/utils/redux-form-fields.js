import React from 'react';

export const renderInput = ({input,label,type,placeholder,meta:{touched,error},disabled}) =>{
	return(
		<div className="form-group">
		  <input className="form-control" type={type} placeholder={placeholder} {...input}/>
		</div>
	);
};

export const renderTextArea = ({input,label,type,placeholder,meta:{touched,error},disabled}) =>{
	return(
		<div className="form-group">
		  <textarea className="form-control" type={type} placeholder={placeholder} {...input}/>
		</div>
	);
};
